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