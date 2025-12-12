import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle sign out - redirect to landing
        if (event === 'SIGNED_OUT') {
          navigate('/', { replace: true });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Sesión cerrada correctamente");
      navigate('/', { replace: true });
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  const getUserDisplayName = () => {
    if (!user) return null;
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario';
  };

  const getUserInitial = () => {
    const name = getUserDisplayName();
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return {
    user,
    session,
    loading,
    signOut,
    getUserDisplayName,
    getUserInitial,
  };
}
