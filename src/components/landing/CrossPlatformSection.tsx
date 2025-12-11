import { Monitor, Smartphone } from "lucide-react";

export function CrossPlatformSection() {
  return (
    <section className="py-20 bg-primary/5 border-y border-border/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="text-left max-w-md">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Sincronización Neural
            </h3>
            <p className="text-muted-foreground mb-6">
              Carga tus temas pesados cómodamente desde el PC. Repásalos en el
              autobús desde el móvil. Tu progreso viaja contigo.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center px-4 py-2 bg-surface rounded border border-border">
                <Monitor className="w-5 h-5 text-foreground mr-2" />
                <span className="text-sm font-mono text-foreground">Windows/Mac</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-surface rounded border border-border">
                <Smartphone className="w-5 h-5 text-foreground mr-2" />
                <span className="text-sm font-mono text-foreground">iOS/Android</span>
              </div>
            </div>
          </div>
          {/* Visual divider */}
          <div className="h-px w-20 bg-border md:hidden" />
          <div className="text-left">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ideal para:</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full border border-primary text-primary text-sm font-medium">
                Bachillerato
              </span>
              <span className="px-3 py-1 rounded-full border border-primary text-primary text-sm font-medium">
                Selectividad
              </span>
              <span className="px-3 py-1 rounded-full border border-success text-success text-sm font-medium">
                Oposiciones
              </span>
              <span className="px-3 py-1 rounded-full border border-border text-muted-foreground text-sm font-medium">
                Medicina
              </span>
              <span className="px-3 py-1 rounded-full border border-border text-muted-foreground text-sm font-medium">
                Derecho
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
