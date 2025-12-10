import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Brain, 
  Users, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Search,
  Filter,
  ChevronRight,
  Star,
  CheckCircle2
} from "lucide-react";
import { Input } from "./ui/input";
import { MindMapComments } from "./MindMapComments";

interface MindMap {
  id: string;
  title: string;
  subject: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  isValidated: boolean;
  rating: number;
  createdAt: string;
}

const mockMindMaps: MindMap[] = [
  {
    id: '1',
    title: 'Fotosíntesis: Proceso Completo',
    subject: 'Biología',
    author: { name: 'Ana García', avatar: 'AG', isVerified: true },
    thumbnail: '🌿',
    views: 1250,
    likes: 89,
    comments: 24,
    isValidated: true,
    rating: 4.8,
    createdAt: '2024-02-10',
  },
  {
    id: '2',
    title: 'Leyes de Newton',
    subject: 'Física',
    author: { name: 'Carlos López', avatar: 'CL' },
    thumbnail: '⚡',
    views: 890,
    likes: 67,
    comments: 15,
    isValidated: true,
    rating: 4.5,
    createdAt: '2024-02-08',
  },
  {
    id: '3',
    title: 'Revolución Francesa',
    subject: 'Historia',
    author: { name: 'María Sánchez', avatar: 'MS', isVerified: true },
    thumbnail: '🏰',
    views: 2100,
    likes: 156,
    comments: 42,
    isValidated: true,
    rating: 4.9,
    createdAt: '2024-02-05',
  },
  {
    id: '4',
    title: 'Sistema Circulatorio',
    subject: 'Biología',
    author: { name: 'Pedro Ramírez', avatar: 'PR' },
    thumbnail: '❤️',
    views: 750,
    likes: 45,
    comments: 8,
    isValidated: false,
    rating: 4.2,
    createdAt: '2024-02-12',
  },
  {
    id: '5',
    title: 'Ecuaciones Cuadráticas',
    subject: 'Matemáticas',
    author: { name: 'Laura Torres', avatar: 'LT' },
    thumbnail: '📐',
    views: 560,
    likes: 34,
    comments: 12,
    isValidated: true,
    rating: 4.6,
    createdAt: '2024-02-14',
  },
];

const subjects = ['Todos', 'Biología', 'Física', 'Historia', 'Matemáticas', 'Química'];

export function MindMapsPage() {
  const [selectedMap, setSelectedMap] = useState<MindMap | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Todos");

  const filteredMaps = mockMindMaps.filter(map => {
    const matchesSearch = map.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         map.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "Todos" || map.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  if (selectedMap) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedMap(null)}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          ← Volver a mapas
        </Button>

        {/* Map Detail Header */}
        <Card className="neural-card p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-secondary/50 flex items-center justify-center text-3xl">
              {selectedMap.thumbnail}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-foreground">{selectedMap.title}</h1>
                {selectedMap.isValidated && (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                )}
              </div>
              <p className="text-muted-foreground mb-3">{selectedMap.subject}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-xs">
                    {selectedMap.author.avatar}
                  </div>
                  <span>{selectedMap.author.name}</span>
                  {selectedMap.author.isVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {selectedMap.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" /> {selectedMap.likes}
                </span>
                <span className="flex items-center gap-1 text-warning">
                  <Star className="w-4 h-4 fill-current" /> {selectedMap.rating}
                </span>
              </div>
            </div>

            <Button className="gap-2">
              <Brain className="w-4 h-4" />
              Estudiar este mapa
            </Button>
          </div>
        </Card>

        {/* Map Visualization Placeholder */}
        <Card className="neural-card p-8 min-h-[300px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl">{selectedMap.thumbnail}</div>
            <p className="text-muted-foreground">Visualización del mapa mental</p>
            <p className="text-sm text-muted-foreground/60">(El mapa interactivo se mostraría aquí)</p>
          </div>
        </Card>

        {/* Comments Section */}
        <MindMapComments mapId={selectedMap.id} mapTitle={selectedMap.title} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mapas Mentales</h1>
          <p className="text-muted-foreground">Explora y estudia mapas creados por la comunidad</p>
        </div>
        <Button className="gap-2 w-fit">
          <Brain className="w-4 h-4" />
          Crear Mapa
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar mapas mentales..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/30 border-border/50"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedSubject === subject
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Maps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaps.map((map) => (
          <Card 
            key={map.id}
            className="neural-card p-5 cursor-pointer hover:border-primary/30 transition-all group"
            onClick={() => setSelectedMap(map)}
          >
            {/* Thumbnail */}
            <div className="w-full h-32 rounded-xl bg-secondary/30 flex items-center justify-center text-5xl mb-4 group-hover:bg-secondary/50 transition-colors">
              {map.thumbnail}
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {map.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{map.subject}</p>
                </div>
                {map.isValidated && (
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                )}
              </div>

              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-[10px]">
                  {map.author.avatar}
                </div>
                <span className="text-sm text-muted-foreground">{map.author.name}</span>
                {map.author.isVerified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> {map.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" /> {map.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> {map.comments}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-warning">
                  <Star className="w-3.5 h-3.5 fill-current" /> {map.rating}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMaps.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No se encontraron mapas mentales</p>
        </div>
      )}
    </div>
  );
}