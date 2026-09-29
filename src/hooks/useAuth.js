
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useAuth = () => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const initializeAuth = async () => {
            try {
                const {
                    data: { session },
                    error: sessionError,
                } = await supabase.auth.getSession();

                if (sessionError) {
                    throw sessionError;
                }

                if (!session) {
                    if (mounted) {
                        setSession(null);
                        setUser(null);
                        setLoading(false);
                    }

                    return;
                }

                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError || !user) {
                    console.log("Stale session found. Clearing local session.");

                    await supabase.auth.signOut({
                        scope: "local",
                    });

                    if (mounted) {
                        setSession(null);
                        setUser(null);
                        setLoading(false);
                    }

                    return;
                }

                if (mounted) {
                    setSession(session);
                    setUser(user);
                    setLoading(false);
                }
            } catch (error) {
                console.log("AUTH INITIALIZATION ERROR:", error);

                try {
                    await supabase.auth.signOut({
                        scope: "local",
                    });
                } catch (signOutError) {
                    console.log(
                        "AUTH SIGNOUT ERROR:",
                        signOutError
                    );
                }

                if (mounted) {
                    setSession(null);
                    setUser(null);
                    setLoading(false);
                }
            }
        };

        initializeAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                if (!mounted) return;

                setSession(newSession);
                setUser(newSession?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return {
        session,
        user,
        loading,
    };
};

