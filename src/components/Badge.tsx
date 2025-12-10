import { cn } from "@/lib/utils";
import { LucideIcon, Lock } from "lucide-react";

interface BadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  progress?: number;
  className?: string;
}

const rarityStyles = {
  common: {
    bg: 'from-slate-500 to-slate-600',
    border: 'border-slate-500/30',
    glow: 'shadow-[0_0_20px_hsl(217_14%_43%_/_0.3)]',
    text: 'text-slate-400'
  },
  rare: {
    bg: 'from-blue-500 to-blue-600',
    border: 'border-blue-500/30',
    glow: 'shadow-[0_0_20px_hsl(217_91%_60%_/_0.3)]',
    text: 'text-blue-400'
  },
  epic: {
    bg: 'from-primary to-purple-500',
    border: 'border-primary/30',
    glow: 'shadow-[0_0_30px_hsl(239_84%_67%_/_0.4)]',
    text: 'text-primary'
  },
  legendary: {
    bg: 'from-amber-400 to-orange-500',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_40px_hsl(38_92%_50%_/_0.5)]',
    text: 'text-amber-400'
  }
};

export function Badge({ 
  icon: Icon, 
  title, 
  description, 
  unlocked, 
  rarity,
  unlockedAt,
  progress,
  className 
}: BadgeProps) {
  const styles = rarityStyles[rarity];

  return (
    <div 
      className={cn(
        "relative p-5 rounded-2xl border transition-all duration-300 group",
        unlocked 
          ? `bg-card ${styles.border} ${styles.glow} hover:scale-105` 
          : "bg-secondary/50 border-border/30 opacity-60",
        className
      )}
    >
      {/* Rarity indicator */}
      <div className={cn(
        "absolute top-3 right-3 text-xs font-mono uppercase tracking-wider",
        unlocked ? styles.text : "text-muted-foreground"
      )}>
        {rarity}
      </div>

      {/* Badge Icon */}
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all",
        unlocked 
          ? `bg-gradient-to-br ${styles.bg}` 
          : "bg-secondary"
      )}>
        {unlocked ? (
          <Icon className="w-8 h-8 text-foreground" />
        ) : (
          <Lock className="w-6 h-6 text-muted-foreground" />
        )}
      </div>

      {/* Badge Info */}
      <h4 className={cn(
        "font-bold text-lg mb-1",
        unlocked ? "text-foreground" : "text-muted-foreground"
      )}>
        {title}
      </h4>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>

      {/* Progress or Unlock Date */}
      {unlocked && unlockedAt ? (
        <span className="text-xs font-mono text-muted-foreground">
          Desbloqueado: {unlockedAt}
        </span>
      ) : progress !== undefined ? (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progreso</span>
            <span className="font-mono text-muted-foreground">{progress}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-muted-foreground/50 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
