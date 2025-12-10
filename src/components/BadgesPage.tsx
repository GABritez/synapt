import { useState } from "react";
import { BadgesGrid } from "./BadgesGrid";
import { Trophy, Lock, Unlock, Flame, Target, Users, TrendingUp } from "lucide-react";

type StatusFilter = 'all' | 'unlocked' | 'locked';
type CategoryFilter = 'all' | 'progreso' | 'racha' | 'precision' | 'comunidad';

export function BadgesPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const statusFilters: { id: StatusFilter; label: string; icon: typeof Trophy }[] = [
    { id: 'all', label: 'Todos', icon: Trophy },
    { id: 'unlocked', label: 'Desbloqueados', icon: Unlock },
    { id: 'locked', label: 'Bloqueados', icon: Lock },
  ];

  const categoryFilters: { id: CategoryFilter; label: string; icon: typeof TrendingUp }[] = [
    { id: 'all', label: 'Todas', icon: Trophy },
    { id: 'progreso', label: 'Progreso', icon: TrendingUp },
    { id: 'racha', label: 'Racha', icon: Flame },
    { id: 'precision', label: 'Precisión', icon: Target },
    { id: 'comunidad', label: 'Comunidad', icon: Users },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Tus <span className="gradient-text">Logros</span>
          </h1>
          <p className="text-muted-foreground mt-1">Desbloquea badges completando retos y objetivos</p>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl glass-panel">
          <Trophy className="w-8 h-8 text-warning" />
          <div>
            <p className="text-2xl font-bold text-foreground font-mono">4/12</p>
            <p className="text-xs text-muted-foreground">Logros desbloqueados</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === filter.id
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(239_84%_67%_/_0.3)]'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setCategoryFilter(filter.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                categoryFilter === filter.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground border border-transparent'
              }`}
            >
              <filter.icon className="w-3 h-3" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <BadgesGrid filter={statusFilter} categoryFilter={categoryFilter} />

      {/* Achievement Tips */}
      <div className="card-neural">
        <h3 className="text-lg font-semibold text-foreground mb-4">💡 Consejos para desbloquear más logros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
            <Flame className="w-6 h-6 text-warning mb-2" />
            <h4 className="font-medium text-foreground mb-1">Mantén tu racha</h4>
            <p className="text-sm text-muted-foreground">Estudia al menos 10 minutos cada día para no perder tu racha</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
            <Target className="w-6 h-6 text-success mb-2" />
            <h4 className="font-medium text-foreground mb-1">Practica la precisión</h4>
            <p className="text-sm text-muted-foreground">Repite los retos difíciles hasta dominarlos completamente</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
            <Users className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-medium text-foreground mb-1">Ayuda a otros</h4>
            <p className="text-sm text-muted-foreground">Valida mapas mentales de la comunidad para ganar badges especiales</p>
          </div>
        </div>
      </div>
    </div>
  );
}
