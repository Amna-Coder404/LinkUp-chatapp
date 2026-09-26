import { supabase } from "../lib/supabase";

export const getProfileByLinkUpId = async (linkupId) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, linkup_id")
        .eq("linkup_id", linkupId.trim().toUpperCase())
        .single();

    if (error) throw error;

    return data;
};

// Get Other User Profile
export const getOtherUserProfile = async (otherUserId) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, linkup_id, avatar_url")
        .eq("id", otherUserId)
        .single();

    if (error) throw error;

    return data;
};

// Get Current User
export const getCurrentUserProfile = async (id) => {
    const { data, error } = await supabase
        .from("profiles")
        .select(
            "full_name, linkup_id, avatar_url, linkup_id_changed_at"
        )
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
};

export const updateProfile = async (
    userId,
    { fullName, linkUpId }
) => {
    const name = fullName.trim();
    const newLinkUpId = linkUpId.trim().toUpperCase();

    if (!name) {
        throw new Error("Name is required.");
    }

    if (!/^LU\d{6}$/.test(newLinkUpId)) {
        throw new Error(
            "LinkUp ID must be like LU352385."
        );
    }

    const { data: currentProfile, error: currentError } =
        await supabase
            .from("profiles")
            .select(
                "full_name, linkup_id, linkup_id_changed_at"
            )
            .eq("id", userId)
            .single();

    if (currentError) throw currentError;

    const idChanged =
        newLinkUpId !== currentProfile.linkup_id;

    if (idChanged) {
        const sevenDays = 7 * 24 * 60 * 60 * 1000;

        if (currentProfile.linkup_id_changed_at) {
            const elapsed =
                Date.now() -
                new Date(currentProfile.linkup_id_changed_at).getTime();

            if (elapsed < sevenDays) {
                const remainingDays = Math.ceil(
                    (sevenDays - elapsed) /
                    (24 * 60 * 60 * 1000)
                );

                throw new Error(
                    `You can change your LinkUp ID again in ${remainingDays} day${remainingDays === 1 ? "" : "s"
                    }.`
                );
            }
        }

        const { data: existingUser, error: checkError } =
            await supabase
                .from("profiles")
                .select("id")
                .eq("linkup_id", newLinkUpId)
                .neq("id", userId)
                .maybeSingle();

        if (checkError) throw checkError;

        if (existingUser) {
            throw new Error(
                "This LinkUp ID is already taken. Please try another."
            );
        }
    }

    const updates = {
        full_name: name,
    };

    if (idChanged) {
        updates.linkup_id = newLinkUpId;
        updates.linkup_id_changed_at =
            new Date().toISOString();
    }

    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select(
            "full_name, linkup_id, avatar_url, linkup_id_changed_at"
        )
        .single();

    if (error) {
        if (error.code === "23505") {
            throw new Error(
                "This LinkUp ID is already taken. Please try another."
            );
        }

        throw error;
    }

    return data;
};


// Upload / Update Profile Pic
export const updateProfileAvatar = async (userId, image) => {
    const extension =
        image.mimeType?.split("/")[1] ||
        image.uri.split(".").pop() ||
        "jpg";

    const filePath = `${userId}/${Date.now()}.${extension}`;

    const arrayBuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
    );

    const { error: uploadError } = await supabase.storage
        .from("profileImages")
        .upload(filePath, arrayBuffer, {
            contentType: image.mimeType || "image/jpeg",
            cacheControl: "3600",
            upsert: false,
        });

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from("profileImages")
        .getPublicUrl(filePath);

    const { error: profileError } = await supabase
        .from("profiles")
        .update({
            avatar_url: data.publicUrl,
        })
        .eq("id", userId);

    if (profileError) {
        throw profileError;
    }

    return await getCurrentUserProfile(userId);
};
// Delete Profile Pic
export const deleteProfileAvatar = async (userId, avatarUrl) => {
    if (!avatarUrl) return;

    const marker = "/storage/v1/object/public/profileImages/";

    const filePath = avatarUrl.split(marker)[1];

    if (filePath) {
        const { error: storageError } = await supabase.storage
            .from("profileImages")
            .remove([filePath]);

        if (storageError) throw storageError;
    }

    const { error: profileError } = await supabase
        .from("profiles")
        .update({
            avatar_url: null,
        })
        .eq("id", userId);

    if (profileError) throw profileError;

    return true;
};