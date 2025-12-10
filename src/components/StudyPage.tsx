import { useState } from "react";
import { Button } from "./ui/button";
import { Play, BookOpen, Brain, Puzzle, ArrowRight, Clock, Star } from "lucide-react";

interface StudyMode {
  id: string;
  title: string;
  description: string;
  icon: typeof Play;
  color: 'primary' | 'success' | 'warning';
  estimatedTime: string;
}

const studyModes: StudyMode[] = [
  {
    id: 'recall',
    title: 'Active Recall',
    description: 'Memoriza y recrea textos completos palabra por palabra',
    icon: Brain,
    color: 'primary',
    estimatedTime: '10-20 min'
  },
  {
    id: 'puzzle',
    title: 'Mapa Rompecabezas',
    description: 'Reconstruye mapas mentales arrastrando conceptos',
    icon: Puzzle,
    color: 'success',
    estimatedTime: '15-25 min'
  },
  {
    id: 'review',
    title: 'Repaso Rápido',
    description: 'Sesión corta de conceptos que necesitas reforzar',
    icon: BookOpen,
    color: 'warning',
    estimatedTime: '5-10 min'
  }
];

const recentTopics = [
  { id: '1', title: 'La Constitución de 1812', lastStudied: 'Hace 2 horas', accuracy: 92 },
  { id: '2', title: 'El Sexenio Democrático', lastStudied: 'Ayer', accuracy: 68 },
  { id: '3', title: 'Guerra de Independencia', lastStudied: 'Hace 3 días', accuracy: 85 },
];

export function StudyPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Elige tu <span className="gradient-text">modo de estudio</span>
        </h1>
        <p className="text-muted-foreground mt-1">Selecciona cómo quieres practicar hoy</p>
      </div>

      {/* Study Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {studyModes.map((mode) => {
          const colorStyles = {
            primary: 'border-primary/30 hover:border-primary/50 bg-primary/5',
            success: 'border-success/30 hover:border-success/50 bg-success/5',
            warning: 'border-warning/30 hover:border-warning/50 bg-warning/5'
          };
          const iconStyles = {
            primary: 'bg-primary/20 text-primary',
            success: 'bg-success/20 text-success',
            warning: 'bg-warning/20 text-warning'
          };

          return (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`card-neural text-left transition-all duration-300 hover:scale-[1.02] ${
                selectedMode === mode.id 
                  ? colorStyles[mode.color] 
                  : 'border-border/50 hover:border-border'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${iconStyles[mode.color]}`}>
                <mode.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{mode.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {mode.estimatedTime}
              </div>
            </button>
          );
        })}
      </div>

      {/* Start Button */}
      {selectedMode && (
        <div className="flex justify-center animate-fade-in">
          <Button variant="hero" size="xl" className="min-w-[200px]">
            <Play className="w-5 h-5 mr-2" />
            Comenzar Sesión
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Recent Topics */}
      <div className="card-neural">
        <h3 className="text-lg font-semibold text-foreground mb-6">Temas Recientes</h3>
        <div className="space-y-3">
          {recentTopics.map((topic) => (
            <div 
              key={topic.id}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/30 hover:border-border/50 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{topic.title}</h4>
                  <span className="text-xs text-muted-foreground">{topic.lastStudied}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning" />
                  <span className="font-mono text-sm text-foreground">{topic.accuracy}%</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
