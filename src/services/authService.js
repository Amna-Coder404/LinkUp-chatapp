import { supabase } from "../lib/supabase";




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

    if (error) {
        throw error;
    }
    return true
}