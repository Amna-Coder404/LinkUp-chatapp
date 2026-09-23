import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useAuth = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const initializeAuth = async () => {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (!session) {
                    if (mounted) {
                        setSession(null);
                        setLoading(false);
                    }

                    return;
                }

                // Verify that the user in the stored session
                // still exists in Supabase Auth.
                const { data: { user }, error, } = await supabase.auth.getUser();

                if (error || !user) {
                    console.log("Stale session found. Clearing local session.");

                    await supabase.auth.signOut({
                        scope: "local",
                    });

                    if (mounted) {
                        setSession(null);
                        setLoading(false);
                    }

                    return;
                }

                if (mounted) {
                    setSession(session);
                    setLoading(false);
                }
            } catch (error) {
                console.log("AUTH INITIALIZATION ERROR:", error);

                await supabase.auth.signOut({
                    scope: "local",
                });

                if (mounted) {
                    setSession(null);
                    setLoading(false);
                }
            }
        };

        initializeAuth();

        const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, newSession) => {
            if (mounted) {
                setSession(newSession);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return {
        session,
        loading,
    };
};