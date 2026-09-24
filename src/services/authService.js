import { streamClient } from "../lib/stream";
import { supabase } from "../lib/supabase";



const DEFAULT_AVATAR_URL = "https://qilovxyzvwoumckbwwna.supabase.co/storage/v1/object/public/avatars/default-avatar.png";


export const signUpUser = async ({ email, password, fullName }) => {

    const { data, error } = await supabase.auth.signUp({ email, password });


    if (error) {
        throw error;
    }

    const user = data.user;

    if (!user) {
        throw new Error("User could not be created.");
    }


    // Now create Linkup id
    const linkupId = `LU${Math.floor(100000 + Math.random() * 900000)}`;


    const { error: profileError } = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            full_name: fullName,
            linkup_id: linkupId,
            avatar_url: DEFAULT_AVATAR_URL
        });


    if (profileError) {
        throw profileError;
    }

    return {
        user,
        linkupId,
    };
}


// signOut
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    await streamClient.disconnectUser();
    if (error) {
        throw error;
    }
    return true
}


// Sign In 

export const signin = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw error;
    }

    const user = data.user;

    if (!user) {
        throw new Error("User could not be signed in.");
    }

    return data

}
