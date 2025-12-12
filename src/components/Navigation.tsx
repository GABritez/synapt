import { useState } from "react";
import { SynaptLogo } from "./SynaptLogo";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "./ui/skeleton";

type TabType = 'dashboard' | 'badges' | 'study' | 'mindmaps' | 'referrals';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut, getUserInitial, loading } = useAuth();

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard' },
    { id: 'badges' as const, label: 'Logros' },
    { id: 'study' as const, label: 'Estudiar' },
    { id: 'mindmaps' as const, label: 'Mapas' },
    { id: 'referrals' as const, label: 'Referidos' },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="fixed w-full z-50 glass-panel border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('dashboard')}>
            <SynaptLogo size={32} />
            <span className="font-bold text-xl tracking-tight text-foreground">Synapt</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                  {loading ? (
                    <Skeleton className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {getUserInitial()}
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-border/50 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-lg font-medium text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="inline-block mr-2 h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}
