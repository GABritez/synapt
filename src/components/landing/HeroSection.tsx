import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Check, BrainCircuit } from "lucide-react";

export function HeroSection() {
  return (
    <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.05]" />
      {/* Gradient Mesh */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-0 left-0 -mt-20 -ml-20 w-72 h-72 bg-success rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            v2.0 Disponible para PC & Móvil
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-foreground">
            Deja de leer.
            <br />
            <span className="gradient-text glow-text">Empieza a conectar.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 font-light">
            La primera app de{" "}
            <strong className="text-foreground">Inteligencia Estructural</strong>{" "}
            diseñada para Bachillerato, Universidad y Oposiciones. Memoriza
            textos y reconstruye mapas mentales con precisión quirúrgica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/auth"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_hsl(var(--primary)/0.3)] flex items-center justify-center"
            >
              Probar Synapt Web
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="glass-panel hover:bg-foreground/5 text-foreground px-8 py-4 rounded-lg font-medium text-lg transition-all flex items-center justify-center">
              <PlayCircle className="mr-2 w-5 h-5 text-muted-foreground" />
              Ver Demo
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-muted-foreground text-sm font-mono">
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-success" />
              Cross-Platform
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-success" />
              Modo Offline
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-success" />
              EBAU Ready
            </div>
          </div>
        </div>

        {/* Right Visual (Abstract Interface) */}
        <div className="w-full lg:w-1/2 mt-16 lg:mt-0 relative">
          <div className="relative rounded-xl bg-surface border border-border shadow-2xl p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* Fake Browser Header */}
            <div className="h-8 bg-background rounded-t-lg flex items-center px-4 space-x-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-error" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
              <div className="ml-4 text-[10px] text-muted-foreground font-mono">
                synapt.app/study-session/history-01
              </div>
            </div>
            {/* App Interface Mockup */}
            <div className="p-6 bg-background rounded-b-lg font-mono text-sm leading-relaxed min-h-[300px]">
              <div className="text-muted-foreground mb-4">
                // Modo: Active Recall | Precisión actual: 92%
              </div>
              <p className="text-muted-foreground">
                La Constitución de 1812 estableció la soberanía{" "}
                <span className="bg-success/20 text-success border-b border-success px-1">
                  nacional
                </span>
                , la división de{" "}
                <span className="bg-error/20 text-error border-b border-error px-1 line-through decoration-error">
                  podres
                </span>
                <span className="text-success ml-1">poderes</span> y el sufragio
                universal{" "}
                <span className="bg-warning/20 text-warning border-b border-warning px-1">
                  masculino
                </span>
                .
              </p>
              <div className="mt-8 p-4 bg-background/50 rounded border border-border flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary">Analizando sintaxis...</span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -bottom-10 -left-10 bg-surface p-4 rounded-lg border border-border shadow-xl z-20 hidden md:block">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <BrainCircuit className="text-primary w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Retención
                </div>
                <div className="text-xl font-bold text-foreground">+400%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
