import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground">
            Invierte en tu futuro
          </h2>
          <p className="text-muted-foreground mt-4">
            Precios diseñados para estudiantes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col">
            <h3 className="text-xl font-bold text-foreground mb-2">Plan Estudiante</h3>
            <div className="text-4xl font-bold text-foreground mb-6">
              €0{" "}
              <span className="text-sm font-normal text-muted-foreground">/mes</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center text-muted-foreground text-sm">
                <Check className="w-4 h-4 mr-3 text-muted-foreground" />
                Hasta 5 documentos
              </li>
              <li className="flex items-center text-muted-foreground text-sm">
                <Check className="w-4 h-4 mr-3 text-muted-foreground" />
                Feedback básico de errores
              </li>
              <li className="flex items-center text-muted-foreground text-sm">
                <Check className="w-4 h-4 mr-3 text-muted-foreground" />
                Acceso Web y Móvil
              </li>
            </ul>
            <Link
              to="/auth"
              className="block w-full py-3 px-6 bg-surface hover:bg-surface/80 text-foreground text-center rounded-lg font-medium transition-colors border border-border"
            >
              Crear Cuenta Gratis
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 rounded-2xl bg-surface border border-primary shadow-2xl shadow-primary/20 flex flex-col">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl">
              RECOMENDADO
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Plan Opositor / Pro
            </h3>
            <div className="text-4xl font-bold text-foreground mb-6">
              €4.99{" "}
              <span className="text-sm font-normal text-muted-foreground">/mes</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center text-foreground text-sm">
                <Check className="w-4 h-4 mr-3 text-primary" />
                Documentos ilimitados
              </li>
              <li className="flex items-center text-foreground text-sm">
                <Check className="w-4 h-4 mr-3 text-primary" />
                Repetición Espaciada (Algoritmo)
              </li>
              <li className="flex items-center text-foreground text-sm">
                <Check className="w-4 h-4 mr-3 text-primary" />
                Salas de Estudio y Retos Grupales
              </li>
              <li className="flex items-center text-foreground text-sm">
                <Check className="w-4 h-4 mr-3 text-primary" />
                Estadísticas avanzadas
              </li>
            </ul>
            <Link
              to="/auth"
              className="block w-full py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-center rounded-lg font-bold transition-colors"
            >
              Prueba Gratis 7 Días
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
