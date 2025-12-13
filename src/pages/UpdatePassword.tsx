import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SynaptLogo } from "@/components/SynaptLogo";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Loader2, AlertCircle } from "lucide-react";

type SessionState = "verifying" | "ready" | "expired";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionState, setSessionState] = useState<SessionState>("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    let retryTimeout: ReturnType<typeof setTimeout> | undefined;

    const attemptTokenRecovery = async () => {
      // Try to recover session manually from URL hash (access_token)
      const rawHash = window.location.hash || "";
      const hash = rawHash.startsWith("#") ? rawHash.slice(1) : rawHash;

      if (!hash) {
        if (isMounted) setSessionState("expired");
        return;
      }

      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");

      if (!accessToken) {
        if (isMounted) setSessionState("expired");
        return;
      }

      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(accessToken);

        if (error || !data.session) {
          if (isMounted) setSessionState("expired");
        } else if (isMounted) {
          setSessionState("ready");
        }
      } catch {
        if (isMounted) setSessionState("expired");
      }
    };

    const verifySession = async () => {
      // First check: immediate session check
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        if (isMounted) setSessionState("ready");
        return;
      }

      // Second check: wait 2 seconds for Supabase to consume the hash token
      retryTimeout = setTimeout(async () => {
        const { data: { session: retrySession } } = await supabase.auth.getSession();

        if (retrySession) {
          if (isMounted) setSessionState("ready");
        } else {
          // Final attempt: manually recover session from URL
          await attemptTokenRecovery();
        }
      }, 2000);
    };

    // Listen for auth state changes (PASSWORD_RECOVERY event)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        if (isMounted) setSessionState("ready");
      }
    });

    verifySession();

    return () => {
      isMounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;
      
      toast.success("Contraseña actualizada correctamente");
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  // Verifying state - show loader
  if (sessionState === "verifying") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <div className="fixed inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.03] pointer-events-none" />
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-20 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-success/20 rounded-full blur-[120px] opacity-10 pointer-events-none" />
        
        <div className="w-full max-w-md mx-4 relative z-10">
          <div className="glass-panel p-8 rounded-2xl border border-border/50 text-center">
            <div className="flex justify-center mb-8">
              <SynaptLogo className="h-10" />
            </div>
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Verificando enlace de seguridad...</p>
          </div>
        </div>
      </div>
    );
  }

  // Expired state - show error with resend option
  if (sessionState === "expired") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <div className="fixed inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.03] pointer-events-none" />
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-20 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-success/20 rounded-full blur-[120px] opacity-10 pointer-events-none" />
        
        <div className="w-full max-w-md mx-4 relative z-10">
          <div className="glass-panel p-8 rounded-2xl border border-border/50 text-center">
            <div className="flex justify-center mb-8">
              <SynaptLogo className="h-10" />
            </div>
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-bold text-foreground mb-2">
              Enlace expirado o inválido
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              El enlace de recuperación ha expirado o ya fue utilizado. Por favor, solicita uno nuevo.
            </p>
            <Link to="/auth">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Solicitar nuevo enlace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Ready state - show password form
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.03] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-success/20 rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-md mx-4 relative z-10">
        <div className="glass-panel p-8 rounded-2xl border border-border/50">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <SynaptLogo className="h-10" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Nueva Contraseña
            </h1>
            <p className="text-muted-foreground text-sm">
              Ingresa tu nueva contraseña para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-foreground">
                Nueva Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={loading || sessionState !== "ready"}
            >
              {loading ? "Actualizando..." : "Actualizar Contraseña"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
