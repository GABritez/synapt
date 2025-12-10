import { Sparkles, ArrowRight, Clock, Target } from "lucide-react";
import { Button } from "./ui/button";

interface TopicRecommendationProps {
  topic: {
    title: string;
    subject: string;
    reason: string;
    estimatedTime: string;
    difficulty: 'fácil' | 'medio' | 'difícil';
    accuracy: number;
  };
  onStartStudy: () => void;
}

export function TopicRecommendation({ topic, onStartStudy }: TopicRecommendationProps) {
  const difficultyColors = {
    'fácil': 'bg-success/10 text-success',
    'medio': 'bg-warning/10 text-warning',
    'difícil': 'bg-destructive/10 text-destructive'
  };

  return (
    <div className="card-neural relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Recomendación IA</h3>
        </div>

        <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {topic.subject}
              </span>
              <h4 className="text-xl font-bold text-foreground mt-1">{topic.title}</h4>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[topic.difficulty]}`}>
              {topic.difficulty}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{topic.reason}</p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{topic.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Target className="w-4 h-4" />
              <span className="font-mono">{topic.accuracy}% precisión previa</span>
            </div>
          </div>
        </div>

        <Button onClick={onStartStudy} className="w-full" variant="hero" size="lg">
          Empezar a estudiar
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
