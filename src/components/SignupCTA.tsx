import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, User, X, Mail, Lock } from "lucide-react";

const SignupCTA = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const showSignup = searchParams.get('signup') === 'true';
  const applied = searchParams.get('applied') === '1';

  const handleSignup = async () => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/search-jobs`
        }
      });

      if (error) throw error;

      toast({
        title: "Account created! 🎉",
        description: "Check your email to verify your account. You can now track your applications!",
      });

      // Remove signup parameter but keep applied=1
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('signup');
      setSearchParams(newParams);

    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message || "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const dismissSignup = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('signup');
    setSearchParams(newParams);
  };

  if (!showSignup || !applied) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-xl">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissSignup}
            className="absolute right-0 top-0 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="bg-green-50 p-3 rounded-full w-fit mx-auto mb-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <CardTitle className="text-xl text-green-700">
            ✅ Application Sent!
          </CardTitle>
          
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-xs">
              Track your applications
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!showForm ? (
            <>
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Want to track your application and get instant updates when employers respond?
                </p>
                
                <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Get notified when employers view your application
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Save jobs and apply faster next time
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Access your application history
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowForm(true)}
                  className="flex-1"
                  size="lg"
                >
                  <User className="h-4 w-4 mr-2" />
                  Create Free Account
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={dismissSignup}
                  size="lg"
                >
                  Later
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                <p className="text-sm font-medium">Create your free account</p>
                <p className="text-xs text-muted-foreground">Takes 30 seconds</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSignup}
                  disabled={loading || !email || !password}
                  className="flex-1"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 mr-2" />
                      Sign Up
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={loading}
                  size="lg"
                >
                  Back
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                By signing up, you agree to receive job updates and application notifications.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupCTA;
