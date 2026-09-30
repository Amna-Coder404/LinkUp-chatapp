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
                    error,
                } = await supabase.auth.getSession();

                if (error) {
                    throw error;
                }

                if (!session) {
                    if (mounted) {
                        setSession(null);
                        setUser(null);
                        setLoading(false);
                    }

                    return;
                }

                /*
                 * getSession() gives us the persisted
                 * local session.
                 *
                 * Do not call getUser() here because
                 * it requires a network request.
                 */

                if (mounted) {
                    setSession(session);
                    setUser(session.user);
                    setLoading(false);
                }

            } catch (error) {
                console.log(
                    "AUTH INITIALIZATION ERROR:",
                    error
                );

                /*
                 * Do NOT signOut here.
                 *
                 * A network error should not delete
                 * the locally persisted session.
                 */

                if (mounted) {
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