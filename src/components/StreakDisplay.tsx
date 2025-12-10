import { Flame, Calendar } from "lucide-react";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  weekData: { day: string; active: boolean; date: string }[];
}

export function StreakDisplay({ currentStreak, longestStreak, weekData }: StreakDisplayProps) {
  return (
    <div className="card-neural">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Racha de Estudio</h3>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-mono">Mejor: {longestStreak} días</span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="streak-flame text-6xl">🔥</div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-bold font-mono">
            {currentStreak} días
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekData.map((day, i) => (
          <div key={i} className="text-center">
            <span className="text-xs text-muted-foreground font-medium block mb-2">
              {day.day}
            </span>
            <div 
              className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center transition-all ${
                day.active 
                  ? 'bg-gradient-to-br from-primary to-primary/60 shadow-[0_0_15px_hsl(239_84%_67%_/_0.4)]' 
                  : 'bg-secondary border border-border'
              }`}
            >
              {day.active && <Flame className="w-5 h-5 text-primary-foreground" />}
            </div>
            <span className="text-xs text-muted-foreground mt-1 block font-mono">
              {day.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
