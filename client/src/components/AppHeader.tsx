import { Bell, Menu, Wallet, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface AppHeaderProps {
  onMenuClick?: () => void;
  notificationCount?: number;
  balance: number;
}

export default function AppHeader({ onMenuClick, notificationCount = 0, balance }: AppHeaderProps) {
  const { t } = useLanguage();
  const { logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-3 md:px-4">
        <div className="flex items-center gap-1.5 md:gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onMenuClick}
            className="h-8 w-8 md:h-9 md:w-9 md:flex"
            data-testid="button-menu"
          >
            <Menu className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center pulse-soft">
              <Wallet className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
            </div>
            <h1 className="text-base md:text-xl font-bold">{t('appName')}</h1>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-muted rounded-full">
            <Wallet className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
            <span className="text-xs md:text-sm font-semibold tabular-nums">{balance.toFixed(2)}</span>
            <span className="text-[10px] md:text-xs text-muted-foreground">{t('usdt')}</span>
          </div>
          
          <LanguageToggle />
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon"
            className="relative h-8 w-8 md:h-9 md:w-9"
            data-testid="button-notifications"
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -left-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-[10px] md:text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={logout}
            className="h-8 w-8 md:h-9 md:w-9"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
