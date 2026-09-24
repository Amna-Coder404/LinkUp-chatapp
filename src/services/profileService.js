import { supabase } from "../lib/supabase";

export const getProfileByLinkUpId = async (linkupId) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, linkup_id")
        .eq("linkup_id", linkupId.trim().toUpperCase())
        .single();

    if (error) {
        throw error;
    }

    return data;
};


// Get Other User Profile 

export const getOtherUserProfile = async (otherUserId) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, linkup_id, avatar_url")
        .eq("id", otherUserId)
        .single();

    if (error) {
        throw error;
    }

    return data;
};


// Get Current USer 
export const getCurrentUserProfile = async (id) => {
    const { data, error, } = await supabase
        .from("profiles")
        .select(
            "full_name, linkup_id, avatar_url"
        )
        .eq("id", id)
        .single();

    if (error) {
        throw error;
    }

    return data;
}