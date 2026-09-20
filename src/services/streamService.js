import { supabase } from "../lib/supabase";

export const getStreamToken = async () => {
    const { data: { session }, error: sessionError, } = await supabase.auth.getSession();

    if (sessionError) {
        console.log("Session error:", sessionError);
        throw sessionError;
    }

    if (!session?.access_token) {
        throw new Error("No Supabase access token found");
    }


    const { data, error } = await supabase.functions.invoke("stream-token", {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    if (error) {
        throw error;
    }

    return data;
};