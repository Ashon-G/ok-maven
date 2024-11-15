import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LoadingAnimation } from "@/components/ui/loading-animation";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function initAuth() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);

        if (!initialSession && location.pathname.startsWith('/dashboard')) {
          navigate("/login", { replace: true });
        } else if (initialSession && location.pathname === '/login') {
          const userType = initialSession.user.user_metadata.user_type;
          const defaultPath = userType === 'founder' ? '/dashboard/marketplace' : '/dashboard/tasks';
          navigate(defaultPath, { replace: true });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    }

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      if (!session && location.pathname.startsWith('/dashboard')) {
        navigate("/login", { replace: true });
      } else if (session && location.pathname === '/login') {
        const userType = session.user.user_metadata.user_type;
        const defaultPath = userType === 'founder' ? '/dashboard/marketplace' : '/dashboard/tasks';
        navigate(defaultPath, { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  const value = {
    session,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}