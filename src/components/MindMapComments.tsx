import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { 
  MessageSquare, 
  ThumbsUp, 
  Reply, 
  MoreHorizontal,
  Send,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface MindMapCommentsProps {
  mapId: string;
  mapTitle: string;
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    author: { name: 'Dr. Martínez', avatar: 'DM', isVerified: true },
    content: 'Excelente mapa mental. Solo agregaría una conexión entre "Fotosíntesis" y "Respiración celular" para mostrar el ciclo completo del carbono.',
    createdAt: '2024-02-15T10:30:00',
    likes: 24,
    isLiked: false,
    replies: [
      {
        id: '1-1',
        author: { name: 'Ana García', avatar: 'AG' },
        content: '¡Gracias por la sugerencia! Ya lo actualicé.',
        createdAt: '2024-02-15T11:00:00',
        likes: 8,
        isLiked: true,
      }
    ]
  },
  {
    id: '2',
    author: { name: 'Carlos López', avatar: 'CL' },
    content: '¿Podrían explicar mejor la diferencia entre la fase luminosa y la fase oscura? El diagrama me confunde un poco.',
    createdAt: '2024-02-14T15:20:00',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: '2-1',
        author: { name: 'María Sánchez', avatar: 'MS', isVerified: true },
        content: 'La fase luminosa ocurre en los tilacoides y requiere luz directa. La fase oscura (Ciclo de Calvin) ocurre en el estroma y no necesita luz directamente, pero usa los productos de la fase luminosa.',
        createdAt: '2024-02-14T16:00:00',
        likes: 18,
        isLiked: true,
      }
    ]
  },
  {
    id: '3',
    author: { name: 'Pedro Ramírez', avatar: 'PR' },
    content: 'Muy útil para el examen de mañana. Los colores ayudan mucho a recordar las diferentes partes del proceso.',
    createdAt: '2024-02-13T09:45:00',
    likes: 31,
    isLiked: false,
  },
];

function CommentItem({ 
  comment, 
  isReply = false,
  onLike,
  onReply 
}: { 
  comment: Comment; 
  isReply?: boolean;
  onLike: (id: string) => void;
  onReply: (id: string) => void;
}) {
  const [showReplies, setShowReplies] = useState(true);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className={`${isReply ? 'ml-10 mt-3' : ''}`}>
      <div className={`p-4 rounded-xl ${isReply ? 'bg-secondary/20' : 'bg-secondary/30'} transition-colors`}>
        {/* Author */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-xs">
              {comment.author.avatar}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground text-sm">{comment.author.name}</span>
              {comment.author.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-primary" />
              )}
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-secondary rounded transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Reportar</DropdownMenuItem>
              <DropdownMenuItem>Copiar enlace</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content */}
        <p className="text-foreground text-sm leading-relaxed mb-3">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onLike(comment.id)}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              comment.isLiked 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
            {comment.likes}
          </button>
          
          {!isReply && (
            <button 
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Reply className="w-4 h-4" />
              Responder
            </button>
          )}

          {hasReplies && (
            <button 
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              {showReplies ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {comment.replies!.length} {comment.replies!.length === 1 ? 'respuesta' : 'respuestas'}
            </button>
          )}
        </div>
      </div>

      {/* Replies */}
      {hasReplies && showReplies && (
        <div className="space-y-2">
          {comment.replies!.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isReply 
              onLike={onLike}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'hace un momento';
  if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `hace ${Math.floor(diffInSeconds / 86400)}d`;
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

export function MindMapComments({ mapId, mapTitle }: MindMapCommentsProps) {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleLike = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId 
              ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
              : reply
          ),
        };
      }
      return comment;
    }));
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent("");
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `new-${Date.now()}`,
      author: { name: 'Tú', avatar: 'TU' },
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    setComments(prev => [comment, ...prev]);
    setNewComment("");
    toast({
      title: "Comentario publicado",
      description: "Tu comentario ha sido añadido al mapa mental.",
    });
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `reply-${Date.now()}`,
      author: { name: 'Tú', avatar: 'TU' },
      content: replyContent.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    }));

    setReplyingTo(null);
    setReplyContent("");
    toast({
      title: "Respuesta publicada",
      description: "Tu respuesta ha sido añadida.",
    });
  };

  return (
    <Card className="neural-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Comentarios</h2>
          <p className="text-sm text-muted-foreground">{comments.length} comentarios en &quot;{mapTitle}&quot;</p>
        </div>
      </div>

      {/* New Comment Input */}
      <div className="mb-6 space-y-3">
        <Textarea
          placeholder="Escribe un comentario, pregunta o sugerencia..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px] bg-secondary/30 border-border/50 focus:border-primary resize-none"
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Publicar
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentItem 
              comment={comment} 
              onLike={handleLike}
              onReply={handleReply}
            />
            
            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="ml-10 mt-3 space-y-2">
                <Textarea
                  placeholder="Escribe tu respuesta..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[60px] bg-secondary/20 border-border/50 focus:border-primary resize-none text-sm"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim()}
                    className="gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    Responder
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}