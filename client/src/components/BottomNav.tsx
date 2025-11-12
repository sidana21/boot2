import { Home, History, Users, Wallet } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/lib/translations";

const navItems: Array<{ icon: typeof Home; labelKey: TranslationKey; path: string }> = [
  { icon: Home, labelKey: "home", path: "/home" },
  { icon: History, labelKey: "transactions", path: "/transactions" },
  { icon: Users, labelKey: "referrals", path: "/referrals" },
  { icon: Wallet, labelKey: "wallet", path: "/wallet" },
];

export default function BottomNav() {
  const [location] = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navItems.map(({ icon: Icon, labelKey, path }) => {
          const isActive = location === path;
          const label = t(labelKey);
          return (
            <Link key={path} href={path}>
              <div
                className={`flex flex-col items-center justify-center gap-1 h-full hover-elevate cursor-pointer ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                data-testid={`nav-${label}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
