import { Target, BookOpen, Zap, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";
import { ProgressRing } from "./ProgressRing";
import { StreakDisplay } from "./StreakDisplay";
import { ProgressChart } from "./ProgressChart";
import { TopicRecommendation } from "./TopicRecommendation";
import { TopicsProgress } from "./TopicsProgress";

// Mock data
const progressData = [
  { date: 'Lun', accuracy: 72, speed: 65 },
  { date: 'Mar', accuracy: 78, speed: 70 },
  { date: 'Mie', accuracy: 85, speed: 75 },
  { date: 'Jue', accuracy: 82, speed: 80 },
  { date: 'Vie', accuracy: 90, speed: 82 },
  { date: 'Sab', accuracy: 88, speed: 85 },
  { date: 'Hoy', accuracy: 92, speed: 88 },
];

const weekData = [
  { day: 'L', active: true, date: '4' },
  { day: 'M', active: true, date: '5' },
  { day: 'X', active: true, date: '6' },
  { day: 'J', active: true, date: '7' },
  { day: 'V', active: true, date: '8' },
  { day: 'S', active: true, date: '9' },
  { day: 'D', active: true, date: '10' },
];

const topics = [
  { id: '1', title: 'La Constitución de 1812', subject: 'Historia', progress: 100, completed: true, locked: false },
  { id: '2', title: 'Guerra de Independencia', subject: 'Historia', progress: 100, completed: true, locked: false },
  { id: '3', title: 'El Sexenio Democrático', subject: 'Historia', progress: 75, completed: false, locked: false },
  { id: '4', title: 'La Restauración Borbónica', subject: 'Historia', progress: 30, completed: false, locked: false },
  { id: '5', title: 'La Segunda República', subject: 'Historia', progress: 0, completed: false, locked: true },
];

const recommendedTopic = {
  title: 'El Sexenio Democrático',
  subject: 'Historia de España',
  reason: 'Basado en tu rendimiento, este tema necesita refuerzo. Tienes un 75% de progreso pero la precisión bajó en los últimos intentos.',
  estimatedTime: '15 min',
  difficulty: 'medio' as const,
  accuracy: 68
};

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            ¡Hola, <span className="gradient-text">María</span>!
          </h1>
          <p className="text-muted-foreground mt-1">Tu progreso de hoy está siendo increíble</p>
        </div>
        <div className="flex items-center gap-3">
          <ProgressRing progress={78} size={80} strokeWidth={6}>
            <div className="text-center">
              <span className="text-lg font-bold text-foreground">78%</span>
              <p className="text-[10px] text-muted-foreground">Semanal</p>
            </div>
          </ProgressRing>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Target}
          label="Precisión Media"
          value="92%"
          subValue="Últimos 7 días"
          trend={{ value: 8, isPositive: true }}
          color="primary"
        />
        <StatCard
          icon={Zap}
          label="Velocidad"
          value="1.2s"
          subValue="Por concepto"
          trend={{ value: 15, isPositive: true }}
          color="success"
        />
        <StatCard
          icon={BookOpen}
          label="Temas Completados"
          value="12"
          subValue="De 24 totales"
          color="warning"
        />
        <StatCard
          icon={TrendingUp}
          label="Retos Hoy"
          value="8"
          subValue="Meta: 10 retos"
          trend={{ value: 3, isPositive: true }}
          color="primary"
        />
      </div>

      {/* Charts and Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart data={progressData} title="Evolución de la Semana" />
        </div>
        <div>
          <TopicRecommendation 
            topic={recommendedTopic} 
            onStartStudy={() => console.log('Starting study...')} 
          />
        </div>
      </div>

      {/* Streak and Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakDisplay 
          currentStreak={12} 
          longestStreak={21} 
          weekData={weekData} 
        />
        <TopicsProgress topics={topics} />
      </div>
    </div>
  );
}
