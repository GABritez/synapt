import { Flame, Calendar } from "lucide-react";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  weekData: { day: string; active: boolean; date: string; isFuture?: boolean }[];
}

export function StreakDisplay({ currentStreak, longestStreak, weekData }: StreakDisplayProps) {
  return (
    <div className="card-neural">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Racha de Estudio</h3>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Mejor: {longestStreak} días</span>
        </div>
      </div>

      {/* Streak Counter with Flame */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative mb-3">
          {/* Glow effect behind flame */}
          <div className="absolute inset-0 blur-xl bg-streak/30 rounded-full scale-150" />
          
          {/* Animated flame icon */}
          <div className="relative animate-pulse-slow">
            <Flame 
              className="w-16 h-16 text-streak drop-shadow-[0_0_15px_hsl(25_95%_53%_/_0.6)]" 
              fill="hsl(25 95% 53%)"
              strokeWidth={1.5}
            />
          </div>
        </div>
        
        {/* Streak count below the flame */}
        <div className="text-center">
          <span className="text-3xl font-bold text-foreground">{currentStreak}</span>
          <span className="text-lg font-medium text-muted-foreground ml-1">días</span>
        </div>
      </div>

      {/* Weekly Day Indicators */}
      <div className="grid grid-cols-7 gap-2">
        {weekData.map((day, i) => {
          const isActive = day.active;
          const isFuture = day.isFuture ?? false;
          const isMissed = !isActive && !isFuture;

          return (
            <div key={i} className="text-center">
              {/* Day label - using sans-serif font-medium */}
              <span className="text-xs text-muted-foreground font-medium block mb-2">
                {day.day}
              </span>
              
              {/* Day indicator */}
              <div 
                className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-gradient-to-br from-streak to-streak/70 shadow-[0_0_15px_hsl(25_95%_53%_/_0.4)]' 
                    : isFuture
                    ? 'border-2 border-dashed border-border bg-transparent'
                    : 'bg-secondary/50 border border-border/50'
                }`}
              >
                {isActive && <Flame className="w-5 h-5 text-streak-foreground" />}
              </div>
              
              {/* Date - using sans-serif font-medium */}
              <span className="text-xs text-muted-foreground mt-1 block font-medium">
                {day.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
