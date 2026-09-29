import { streamClient } from "../lib/stream";
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const signUpUser = async ({ email, password, fullName }) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    const user = data.user;

    if (!user) {
        throw new Error("User could not be created.");
    }

    const linkupId = `LU${Math.floor(100000 + Math.random() * 900000)}`;

    const { error: profileError } = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            full_name: fullName,
            linkup_id: linkupId,
            avatar_url: null,
        });

    if (profileError) {
        throw profileError;
    }
    await AsyncStorage.setItem(
        "@userId",
        user.id
    );

    await AsyncStorage.setItem(
        "@userName",
        fullName
    );
    return {
        user,
        linkupId,
    };
};


// Sign Out
// Sign Out
export const signOut = async () => {
    try {
        // 1. Disconnect Stream Chat first
        if (streamClient.userID) {
            console.log("STREAM CHAT: disconnecting user...");
            await streamClient.disconnectUser();
            console.log("STREAM CHAT: disconnected");
        }

        // 2. Then sign out from Supabase
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }

        console.log("AUTH: signed out");

        return true;
    } catch (error) {
        console.log("SIGN OUT ERROR:", error);
        throw error;
    }
};


// Sign In
export const signin = async ({ email, password }) => {
    const {
        data,
        error,
    } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    const user = data.user;

    if (!user) {
        throw new Error("User could not be signed in.");
    }

    // Save user identity for background incoming calls
    await AsyncStorage.setItem(
        "@userId",
        user.id
    );

    const {
        data: profile,
        error: profileError,
    } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

    if (profileError) {
        console.log(
            "PROFILE FETCH ERROR:",
            profileError
        );
    }

    await AsyncStorage.setItem(
        "@userName",
        profile?.full_name || "LinkUp User"
    );

    console.log(
        "AUTH: user saved for push:",
        user.id
    );

    return data;
};