
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { track } from "../utils/analytics";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Track page view when component mounts
  useState(() => {
    track('page_view', { page: 'login' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Track login attempt
    track('login_attempt', { 
      email_provider: email.split('@')[1] || 'unknown',
      password_length: password.length
    });

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // This is a test site without real auth
      toast({
        title: "Login successful",
        description: "Welcome to TodoTrack!",
      });

      // Track successful login
      track('login_success', { 
        user_id: btoa(email).slice(0, 10), // Basic encoding for demo purposes
        email_provider: email.split('@')[1] || 'unknown',
      });

      navigate("/dashboard");
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Track forgot password click
    track('forgot_password_click');
    
    toast({
      title: "Password Reset",
      description: "Password reset link would be sent in a real app",
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Track email input changes (throttled)
    if (e.target.value.includes('@')) {
      track('email_input', { 
        has_domain: true,
        domain: e.target.value.split('@')[1] || 'unknown' 
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to TodoTrack</h1>
          <p className="text-gray-600 mt-2">Login to manage your tasks</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="mt-1"
                onFocus={() => track('field_focus', { field: 'email' })}
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                onFocus={() => track('field_focus', { field: 'password' })}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => {
                  track('signup_click');
                  toast({
                    title: "Sign Up",
                    description: "Account creation would be implemented in a real app",
                  });
                }}
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
