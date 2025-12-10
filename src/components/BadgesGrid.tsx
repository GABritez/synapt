import { Badge } from "./Badge";
import { 
  Trophy, 
  Zap, 
  Target, 
  Flame, 
  BookOpen, 
  Star, 
  Crown, 
  Shield,
  Users,
  Brain,
  Rocket,
  Award
} from "lucide-react";

interface BadgeData {
  id: string;
  icon: typeof Trophy;
  title: string;
  description: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  progress?: number;
  category: 'progreso' | 'racha' | 'precision' | 'comunidad';
}

const badges: BadgeData[] = [
  {
    id: '1',
    icon: Trophy,
    title: 'Primer Reto',
    description: 'Completa tu primer reto de memorización',
    unlocked: true,
    rarity: 'common',
    unlockedAt: '12 Dic 2024',
    category: 'progreso'
  },
  {
    id: '2',
    icon: Flame,
    title: 'Racha de 7 días',
    description: 'Estudia durante 7 días consecutivos',
    unlocked: true,
    rarity: 'rare',
    unlockedAt: '10 Dic 2024',
    category: 'racha'
  },
  {
    id: '3',
    icon: Target,
    title: 'Precisión Perfecta',
    description: 'Consigue 100% de precisión en un reto',
    unlocked: true,
    rarity: 'epic',
    unlockedAt: '8 Dic 2024',
    category: 'precision'
  },
  {
    id: '4',
    icon: Users,
    title: 'Ayudante Comunidad',
    description: 'Valida 10 mapas mentales de otros usuarios',
    unlocked: true,
    rarity: 'rare',
    unlockedAt: '5 Dic 2024',
    category: 'comunidad'
  },
  {
    id: '5',
    icon: Zap,
    title: 'Velocidad Luz',
    description: 'Completa un reto en menos de 30 segundos',
    unlocked: false,
    rarity: 'epic',
    progress: 75,
    category: 'progreso'
  },
  {
    id: '6',
    icon: Crown,
    title: 'Rey de la Racha',
    description: 'Mantén una racha de 30 días consecutivos',
    unlocked: false,
    rarity: 'legendary',
    progress: 40,
    category: 'racha'
  },
  {
    id: '7',
    icon: Brain,
    title: 'Mente Brillante',
    description: 'Completa 50 retos con más del 90% de precisión',
    unlocked: false,
    rarity: 'epic',
    progress: 62,
    category: 'precision'
  },
  {
    id: '8',
    icon: BookOpen,
    title: 'Erudito',
    description: 'Completa todos los temas de una asignatura',
    unlocked: false,
    rarity: 'rare',
    progress: 45,
    category: 'progreso'
  },
  {
    id: '9',
    icon: Star,
    title: 'Estrella Naciente',
    description: 'Alcanza el top 10 en la clasificación semanal',
    unlocked: false,
    rarity: 'epic',
    progress: 20,
    category: 'comunidad'
  },
  {
    id: '10',
    icon: Shield,
    title: 'Invencible',
    description: 'Completa 10 retos seguidos sin errores',
    unlocked: false,
    rarity: 'legendary',
    progress: 30,
    category: 'precision'
  },
  {
    id: '11',
    icon: Rocket,
    title: 'Imparable',
    description: 'Completa 100 retos en total',
    unlocked: false,
    rarity: 'rare',
    progress: 54,
    category: 'progreso'
  },
  {
    id: '12',
    icon: Award,
    title: 'Leyenda Synapt',
    description: 'Desbloquea todos los demás logros',
    unlocked: false,
    rarity: 'legendary',
    progress: 8,
    category: 'progreso'
  }
];

interface BadgesGridProps {
  filter: 'all' | 'unlocked' | 'locked';
  categoryFilter: 'all' | 'progreso' | 'racha' | 'precision' | 'comunidad';
}

export function BadgesGrid({ filter, categoryFilter }: BadgesGridProps) {
  const filteredBadges = badges.filter(badge => {
    const matchesStatus = 
      filter === 'all' || 
      (filter === 'unlocked' && badge.unlocked) || 
      (filter === 'locked' && !badge.unlocked);
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      badge.category === categoryFilter;
    
    return matchesStatus && matchesCategory;
  });

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {filter === 'all' ? 'Todos los Logros' : filter === 'unlocked' ? 'Desbloqueados' : 'Por Desbloquear'}
        </h3>
        <span className="text-sm font-mono text-muted-foreground">
          {unlockedCount}/{badges.length} desbloqueados
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => (
          <Badge
            key={badge.id}
            icon={badge.icon}
            title={badge.title}
            description={badge.description}
            unlocked={badge.unlocked}
            rarity={badge.rarity}
            unlockedAt={badge.unlockedAt}
            progress={badge.progress}
          />
        ))}
      </div>

      {filteredBadges.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No hay logros que mostrar con estos filtros</p>
        </div>
      )}
    </div>
  );
}
