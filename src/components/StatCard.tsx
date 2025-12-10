import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subValue?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'destructive';
  className?: string;
}

const colorStyles = {
  primary: {
    icon: 'bg-primary/20 text-primary',
    glow: 'shadow-[0_0_20px_hsl(239_84%_67%_/_0.2)]'
  },
  success: {
    icon: 'bg-success/20 text-success',
    glow: 'shadow-[0_0_20px_hsl(160_84%_39%_/_0.2)]'
  },
  warning: {
    icon: 'bg-warning/20 text-warning',
    glow: 'shadow-[0_0_20px_hsl(38_92%_50%_/_0.2)]'
  },
  destructive: {
    icon: 'bg-destructive/20 text-destructive',
    glow: 'shadow-[0_0_20px_hsl(350_89%_60%_/_0.2)]'
  }
};

export function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  subValue, 
  trend, 
  color = 'primary',
  className 
}: StatCardProps) {
  const styles = colorStyles[color];

  return (
    <div className={cn(
      "stat-card group hover:scale-[1.02] transition-all duration-300",
      styles.glow,
      className
    )}>
      <div className="flex items-start justify-between">
        <div className={cn("p-3 rounded-xl transition-all group-hover:scale-110", styles.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-mono px-2 py-1 rounded-full",
            trend.isPositive 
              ? "bg-success/10 text-success" 
              : "bg-destructive/10 text-destructive"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
        <p className="text-3xl font-bold text-foreground mt-1 font-mono">{value}</p>
        {subValue && (
          <p className="text-sm text-muted-foreground mt-1">{subValue}</p>
        )}
      </div>
    </div>
  );
}
