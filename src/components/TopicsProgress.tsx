import { Check, Lock } from "lucide-react";
import { Progress } from "./ui/progress";

interface Topic {
  id: string;
  title: string;
  subject: string;
  progress: number;
  completed: boolean;
  locked: boolean;
}

interface TopicsProgressProps {
  topics: Topic[];
}

export function TopicsProgress({ topics }: TopicsProgressProps) {
  return (
    <div className="card-neural">
      <h3 className="text-lg font-semibold text-foreground mb-6">Temas Completados</h3>
      
      <div className="space-y-4">
        {topics.map((topic) => (
          <div 
            key={topic.id}
            className={`p-4 rounded-xl border transition-all ${
              topic.locked 
                ? 'bg-secondary/30 border-border/30 opacity-60' 
                : topic.completed 
                  ? 'bg-success/5 border-success/20' 
                  : 'bg-secondary/50 border-border/50 hover:border-primary/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  topic.locked 
                    ? 'bg-secondary' 
                    : topic.completed 
                      ? 'bg-success/20' 
                      : 'bg-primary/20'
                }`}>
                  {topic.locked ? (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  ) : topic.completed ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <span className="text-xs font-bold text-primary font-mono">{topic.progress}%</span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{topic.title}</h4>
                  <span className="text-xs text-muted-foreground font-mono">{topic.subject}</span>
                </div>
              </div>
            </div>
            
            {!topic.locked && !topic.completed && (
              <Progress value={topic.progress} className="h-1.5 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
