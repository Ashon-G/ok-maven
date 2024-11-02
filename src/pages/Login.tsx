import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Session } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>("");

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
    } = supabase.auth.onAuthStateChange(async (event: 'INITIAL_SESSION' | 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_DELETED' | 'USER_UPDATED' | 'PASSWORD_RECOVERY' | 'TOKEN_REFRESHED' | 'SIGNED_UP', session: Session | null) => {
      if (event === 'SIGNED_UP' && userType) {
        await supabase.auth.updateUser({
          data: { user_type: userType }
        });
        toast.success('Welcome! You have successfully signed up.');
        navigate("/dashboard");
      } else if (event === 'SIGNED_IN') {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, userType]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Welcome to <span className="gradient-text">Maven</span>
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a...
            </label>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="founder">Founder</SelectItem>
                <SelectItem value="maven">Maven</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;