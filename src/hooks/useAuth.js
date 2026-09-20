import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";



export const useAuth = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (!mounted) return;
            if (error) {
                console.log("Session error:", error.message);
            }

            setSession(data.session);
            setLoading(false);
        };

        getSession();

        const { data: { subscription }, } =
            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
                setLoading(false);
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
}