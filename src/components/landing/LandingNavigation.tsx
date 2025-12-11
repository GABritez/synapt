import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SynaptLogo } from "@/components/SynaptLogo";

export function LandingNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 glass-panel border-b border-border/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <SynaptLogo className="h-8" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Características
            </button>
            <button
              onClick={() => scrollToSection("method")}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              El Método
            </button>
            <button
              onClick={() => scrollToSection("community")}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Comunidad
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Planes
            </button>
            <Link
              to="/auth"
              className="text-primary font-mono text-sm hover:text-primary/80"
            >
              Login
            </Link>
            <Link
              to="/auth"
              className="bg-foreground text-background hover:bg-foreground/90 px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105"
            >
              Empezar Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border/5 p-4 space-y-4">
          <button
            onClick={() => scrollToSection("features")}
            className="block text-muted-foreground hover:text-foreground font-medium w-full text-left"
          >
            Características
          </button>
          <button
            onClick={() => scrollToSection("method")}
            className="block text-muted-foreground hover:text-foreground font-medium w-full text-left"
          >
            El Método
          </button>
          <button
            onClick={() => scrollToSection("community")}
            className="block text-muted-foreground hover:text-foreground font-medium w-full text-left"
          >
            Comunidad
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="block text-muted-foreground hover:text-foreground font-medium w-full text-left"
          >
            Planes
          </button>
          <Link
            to="/auth"
            className="block text-primary font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Empezar Gratis
          </Link>
        </div>
      )}
    </nav>
  );
}
