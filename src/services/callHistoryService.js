
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../lib/supabase";

// For Give Id to every call
const CALL_HISTORY_KEY = "@linkup_call_history";

// Save to local cache 
const saveToCache = async (calls) => {
    await AsyncStorage.setItem(
        CALL_HISTORY_KEY,
        JSON.stringify(calls)
    );
};


// GET FROM LOCAL CACHE

export const getCachedCallHistory = async () => {
    try {
        const stored = await AsyncStorage.getItem(CALL_HISTORY_KEY);
        if (!stored) {
            return [];
        }

        const history = JSON.parse(stored);

        return Array.isArray(history) ? history : [];
    } catch (error) {
        console.log("GET CACHED CALL HISTORY ERROR:", error);
        return [];
    }
};


// Create Call History
export const createCallHistory = async ({ streamCallId,
    callerId,
    receiverId,
    callType,
    startedAt = null,
    endedAt = null,
    status = "completed",
}) => {
    const { data: existingCall } = await supabase
        .from("call_history")
        .select("*")
        .eq("stream_call_id", streamCallId)
        .maybeSingle();

    if (existingCall) {
        return existingCall;
    }

    const { data, error } = await supabase.from("call_history")
        .insert({
            stream_call_id: streamCallId,
            caller_id: callerId,
            receiver_id: receiverId,
            call_type: callType,
            started_at: startedAt,
            ended_at: endedAt,
            status: status,
        })
        .select()
        .single();

    if (error) {
        throw error;
    }
    try {
        const cachedCalls = await getCachedCallHistory();

        const updatedCalls = [data, ...cachedCalls.filter(
            (call) => call.id !== data.id
        ),
        ];

        await saveToCache(updatedCalls);
    } catch (cacheError) {
        console.log("CALL HISTORY CACHE SAVE ERROR:", cacheError
        );
    }

    return data;
};


// UPDATE CALL HISTORY

export const updateCallHistoryStatus = async ({
    streamCallId,
    status,
    startedAt = undefined,
    endedAt = undefined,
}) => {
    if (!streamCallId) {
        throw new Error("streamCallId is required.");
    }

    const updates = { status, };

    if (startedAt !== undefined) {
        updates.started_at = startedAt;
    }

    if (endedAt !== undefined) {
        updates.ended_at = endedAt;
    }

    const { data, error } =
        await supabase
            .from("call_history")
            .update(updates)
            .eq("stream_call_id", streamCallId)
            .select()
            .single();

    if (error) {
        throw error;
    }

    try {
        const cachedCalls = await getCachedCallHistory();

        const updatedCalls = [data, ...cachedCalls.filter(
            (call) => call.id !== data.id
        ),
        ];

        await saveToCache(
            updatedCalls
        );
    } catch (cacheError) {
        console.log("CALL HISTORY CACHE UPDATE ERROR:", cacheError);
    }

    return data;
};


// Get Call History from Supabase
export const getCallHistory = async (userId) => {
    const { data, error } = await supabase
        .from("call_history")
        .select(`
                    id,
                    stream_call_id,
                    caller_id,
                    receiver_id,
                    call_type,
                    started_at,
                    ended_at,
                    status,
                    created_at
                `)
        .or(`caller_id.eq.${userId},receiver_id.eq.${userId}`)
        .order("created_at",
            { ascending: false, }
        );

    if (error) {
        throw error;
    }

    return data || [];
};


// SYNC SUPABASE → ASYNC STORAGE
export const syncCallHistory = async (userId) => {
    const calls = await getCallHistory(userId);
    await saveToCache(calls);
    return calls;
};


//Delete On Call
export const deleteCallHistory = async (callId) => {
    const { error } = await supabase
        .from("call_history")
        .delete()
        .eq("id", callId);

    if (error) {
        throw error;
    }

    try {
        const cachedCalls = await getCachedCallHistory();

        const updatedCalls = cachedCalls.filter(
            (call) => call.id !== callId
        );

        await saveToCache(updatedCalls);
    } catch (cacheError) {
        console.log("CALL HISTORY CACHE DELETE ERROR:", cacheError);
    }
};


// Clear Local Cache
export const clearCallHistoryCache = async () => {
    await AsyncStorage.removeItem(CALL_HISTORY_KEY);
};

