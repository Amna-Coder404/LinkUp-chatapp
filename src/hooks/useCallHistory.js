import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { useAuth } from "./useAuth";

import {
    getCachedCallHistory,
    syncCallHistory,
} from "../services/callHistoryService";

export const useCallHistory = () => {
    const { user } = useAuth();

    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] =
        useState(false);
    const [error, setError] = useState(null);

    // =====================================================
    // LOAD CALL HISTORY
    // =====================================================

    const loadCalls = useCallback(async () => {
        if (!user?.id) {
            setCalls([]);
            setLoading(false);
            return;
        }

        try {
            setError(null);

            // Show cached history first
            const cachedCalls =
                await getCachedCallHistory();

            setCalls(cachedCalls);

            // Sync fresh history from Supabase
            const freshCalls =
                await syncCallHistory(user.id);

            setCalls(freshCalls);
        } catch (error) {
            setError(error);
        }
    }, [user?.id]);

    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);

            await loadCalls();

            setLoading(false);
        };

        initialize();
    }, [loadCalls]);

    // =====================================================
    // REFRESH
    // =====================================================

    const refresh = useCallback(async () => {
        setRefreshing(true);

        try {
            await loadCalls();
        } finally {
            setRefreshing(false);
        }
    }, [loadCalls]);

    return {
        calls,
        loading,
        refreshing,
        error,
        refresh,
    };
};