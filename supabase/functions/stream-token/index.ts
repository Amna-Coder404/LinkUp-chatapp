// iska asal kaam ek user ke liye Stream API ka JWT Token generate karna hai 


function base64UrlEncode(data: string | Uint8Array) {
  let binary: string;

  if (typeof data === "string") {
    binary = btoa(data);
  }
  else {
    binary = String.fromCharCode(...data);
    binary = btoa(binary);
  }

  return binary
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function createStreamToken(
  userId: string,
  secret: string
) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = { user_id: userId, };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey("raw",
    new TextEncoder().encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false, ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key,
    new TextEncoder().encode(unsignedToken)
  );

  const encodedSignature = base64UrlEncode(
    new Uint8Array(signature)
  );

  return `${unsignedToken}.${encodedSignature}`;
}


Deno.serve(async (req) => {
  try {
    const authHeader = req.headers.get("Authorization");


    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error: "Authorization header missing",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // Supabase has already verified this JWT
    // before invoking the Edge Function.
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    const userId = payload.sub;


    if (!userId) {
      return new Response(
        JSON.stringify({
          error: "User ID missing from JWT",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const streamSecret = Deno.env.get("STREAM_API_SECRET");

    const streamKey = Deno.env.get("STREAM_API_KEY");


    if (!streamSecret || !streamKey) {
      return new Response(
        JSON.stringify({
          error: "Stream environment variables missing",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const streamToken = await createStreamToken(userId, streamSecret);

    console.log("Stream token created successfully");

    return new Response(
      JSON.stringify({
        token: streamToken,
        user_id: userId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("FUNCTION ERROR:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
});