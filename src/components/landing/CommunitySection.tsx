import { Users, Share2, Trophy, LockOpen, ListOrdered } from "lucide-react";

export function CommunitySection() {
  return (
    <section id="community" className="py-24 bg-background relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content: Value Proposition */}
          <div className="order-2 md:order-1">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
              <Users className="text-primary w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Conocimiento Compartido y Retos
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              La memorización es mejor en equipo. Accede a las herramientas
              sociales que impulsan tu competitividad y reducen el tiempo de
              preparación.
            </p>

            <ul className="space-y-6 mb-10">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4 mt-1 border border-primary/20">
                  <Share2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-base mb-1">
                    Comunidad de Contenido Curado
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Accede a mapas y resúmenes validados por otros opositores y
                    estudiantes de tu nivel.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4 mt-1 border border-primary/20">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-base mb-1 flex items-center">
                    Salas de Estudio y Ranking
                    <span className="ml-2 text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                      Premium
                    </span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Compite por precisión y velocidad en la replicación de
                    textos específicos con tu grupo.
                  </p>
                </div>
              </li>
            </ul>

            <a
              href="#pricing"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center w-full sm:w-fit shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1"
            >
              Desbloquear Retos Grupales
              <LockOpen className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </div>

          {/* Right Visual: Leaderboard Mockup */}
          <div className="order-1 md:order-2 w-full">
            <div className="p-6 rounded-xl bg-surface border border-border shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-foreground flex items-center">
                  <ListOrdered className="w-5 h-5 mr-2 text-success" />
                  Ranking de Precisión (Grupo EBAU 2024)
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  Actualizado: Ahora
                </span>
              </div>

              <div className="space-y-3">
                {/* 1st Place (User) */}
                <div className="flex items-center p-3 rounded-lg bg-primary/20 border border-primary">
                  <span className="text-primary font-extrabold w-6 text-lg">1</span>
                  <span className="ml-4 font-bold text-foreground flex-1">
                    Tú (User_128)
                  </span>
                  <span className="text-success font-mono">98.5%</span>
                </div>
                {/* 2nd Place */}
                <div className="flex items-center p-3 rounded-lg bg-background border border-border">
                  <span className="text-muted-foreground font-bold w-6 text-lg">2</span>
                  <span className="ml-4 text-muted-foreground flex-1">
                    Carlos_Opositor
                  </span>
                  <span className="text-muted-foreground font-mono">96.1%</span>
                </div>
                {/* 3rd Place */}
                <div className="flex items-center p-3 rounded-lg bg-background border border-border">
                  <span className="text-muted-foreground font-bold w-6 text-lg">3</span>
                  <span className="ml-4 text-muted-foreground flex-1">
                    Ana_Derecho
                  </span>
                  <span className="text-muted-foreground font-mono">93.9%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Precisión en el reto: "Constitución de 1812" (Últimas 24h)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
