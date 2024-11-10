import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Verify the session is valid
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          toast({
            title: "Welcome back!",
            description: "Successfully signed in.",
          });
          navigate("/dashboard");
        } else {
          toast({
            title: "Error",
            description: "Profile not found. Please try again.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
        }
      }
      if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You have been signed out.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2">
            Maven<span className="text-secondary">.</span>
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-white/60">
            New user?{" "}
            <Link to="/signup" className="font-medium text-secondary hover:text-secondary/90">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-xl ring-1 ring-white/10 sm:rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0EA5E9',
                    brandAccent: '#0284C7',
                    inputBackground: 'white',
                    inputText: 'black',
                    inputBorder: '#E2E8F0',
                    inputBorderFocus: '#0EA5E9',
                    inputBorderHover: '#94A3B8',
                  },
                },
              },
            }}
            theme="dark"
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
            onlyThirdPartyProviders={false}
            magicLink={false}
            view="sign_in"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;