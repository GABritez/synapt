import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { 
  Copy, 
  Check, 
  Gift, 
  Users, 
  Coins, 
  Share2, 
  Trophy,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  pendingReferrals: number;
  creditsEarned: number;
  creditsAvailable: number;
}

interface ReferredFriend {
  id: string;
  name: string;
  avatar: string;
  joinedAt: string;
  status: 'active' | 'pending';
  creditsEarned: number;
}

// Mock data
const mockStats: ReferralStats = {
  referralCode: "SYNAPT-MX2024",
  totalReferrals: 7,
  pendingReferrals: 2,
  creditsEarned: 350,
  creditsAvailable: 200,
};

const mockFriends: ReferredFriend[] = [
  { id: '1', name: 'Ana García', avatar: 'A', joinedAt: '2024-01-15', status: 'active', creditsEarned: 50 },
  { id: '2', name: 'Carlos López', avatar: 'C', joinedAt: '2024-01-20', status: 'active', creditsEarned: 50 },
  { id: '3', name: 'María Sánchez', avatar: 'M', joinedAt: '2024-02-01', status: 'active', creditsEarned: 50 },
  { id: '4', name: 'Pedro Ramírez', avatar: 'P', joinedAt: '2024-02-10', status: 'pending', creditsEarned: 0 },
  { id: '5', name: 'Laura Torres', avatar: 'L', joinedAt: '2024-02-15', status: 'active', creditsEarned: 50 },
];

const rewards = [
  { credits: 100, reward: "1 semana Premium", icon: Gift },
  { credits: 250, reward: "1 mes Premium", icon: Trophy },
  { credits: 500, reward: "3 meses Premium + Badge exclusivo", icon: Sparkles },
];

export function ReferralsPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [stats] = useState<ReferralStats>(mockStats);
  const [friends] = useState<ReferredFriend[]>(mockFriends);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(stats.referralCode);
      setCopied(true);
      toast({
        title: "¡Código copiado!",
        description: "Compártelo con tus amigos para ganar créditos.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error al copiar",
        description: "Intenta copiar el código manualmente.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Únete a Synapt',
      text: `¡Estudia de forma más efectiva con Synapt! Usa mi código ${stats.referralCode} para obtener créditos gratis.`,
      url: `https://synapt.app/invite/${stats.referralCode}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        handleCopyCode();
      }
    } else {
      handleCopyCode();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Programa de Referidos
        </h1>
        <p className="text-muted-foreground">
          Invita amigos y gana créditos canjeables por beneficios premium
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="neural-card p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Referidos</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalReferrals}</p>
            </div>
          </div>
        </Card>

        <Card className="neural-card p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-warning/10">
              <Users className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendientes</p>
              <p className="text-2xl font-bold text-foreground">{stats.pendingReferrals}</p>
            </div>
          </div>
        </Card>

        <Card className="neural-card p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-success/10">
              <Coins className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Créditos Ganados</p>
              <p className="text-2xl font-bold text-foreground">{stats.creditsEarned}</p>
            </div>
          </div>
        </Card>

        <Card className="neural-card p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/10">
              <Gift className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Disponibles</p>
              <p className="text-2xl font-bold text-foreground">{stats.creditsAvailable}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Referral Code Section */}
      <Card className="neural-card p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Tu Código de Referido</h2>
          <p className="text-muted-foreground text-sm">
            Comparte este código con tus amigos. Cada vez que alguien se registre y complete su primer reto, 
            ambos recibirán <span className="text-primary font-medium">50 créditos</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center justify-between bg-secondary/50 border border-border rounded-xl px-4 py-3">
              <code className="text-lg font-mono font-bold text-primary tracking-wider">
                {stats.referralCode}
              </code>
              <button 
                onClick={handleCopyCode}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-success" />
                ) : (
                  <Copy className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>
            
            <Button onClick={handleShare} className="gap-2">
              <Share2 className="w-4 h-4" />
              Compartir
            </Button>
          </div>
        </div>
      </Card>

      {/* Rewards Section */}
      <Card className="neural-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Canjea tus Créditos</h2>
        
        <div className="space-y-3">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            const canRedeem = stats.creditsAvailable >= reward.credits;
            
            return (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  canRedeem 
                    ? 'bg-secondary/30 border-primary/30 hover:border-primary/50' 
                    : 'bg-secondary/10 border-border/50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${canRedeem ? 'bg-primary/10' : 'bg-secondary'}`}>
                    <Icon className={`w-5 h-5 ${canRedeem ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{reward.reward}</p>
                    <p className="text-sm text-muted-foreground">{reward.credits} créditos</p>
                  </div>
                </div>
                
                <Button 
                  variant={canRedeem ? "default" : "outline"} 
                  size="sm"
                  disabled={!canRedeem}
                >
                  Canjear
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Friends List */}
      <Card className="neural-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Amigos Referidos</h2>
          <span className="text-sm text-muted-foreground">{friends.length} amigos</span>
        </div>
        
        <div className="space-y-3">
          {friends.map((friend) => (
            <div 
              key={friend.id}
              className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  friend.status === 'active' 
                    ? 'bg-gradient-to-br from-primary to-primary/60 text-primary-foreground' 
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {friend.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {friend.status === 'active' ? 'Activo' : 'Pendiente'} · {new Date(friend.joinedAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {friend.status === 'active' && (
                  <span className="text-sm font-medium text-success">+{friend.creditsEarned}</span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}