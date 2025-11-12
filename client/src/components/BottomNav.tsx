import { Home, History, Users, Wallet } from "lucide-react";
import { Link, useLocation } from "wouter";

const navItems = [
  { icon: Home, label: "الرئيسية", path: "/home" },
  { icon: History, label: "المعاملات", path: "/transactions" },
  { icon: Users, label: "الإحالات", path: "/referrals" },
  { icon: Wallet, label: "المحفظة", path: "/wallet" },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location === path;
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
