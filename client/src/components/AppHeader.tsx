import { Bell, Menu, Wallet, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "wouter";

interface AppHeaderProps {
  onMenuClick?: () => void;
  notificationCount?: number;
  balance: number;
  isAdmin?: boolean;
}

export default function AppHeader({ onMenuClick, notificationCount = 0, balance, isAdmin = true }: AppHeaderProps) {
  const { t } = useLanguage();
  const { logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onMenuClick}
            data-testid="button-menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center pulse-soft">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">{t('appName')}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
            <Wallet className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold tabular-nums">{balance.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground">{t('usdt')}</span>
          </div>
          
          {isAdmin && (
            <Link href="/admin">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-primary"
                data-testid="button-admin"
              >
                <Shield className="w-5 h-5" />
              </Button>
            </Link>
          )}
          
          <LanguageToggle />
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -left-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={logout}
            data-testid="button-logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
