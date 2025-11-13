import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MotivationalNotifications from "@/components/MotivationalNotifications";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Transactions from "@/pages/Transactions";
import Referrals from "@/pages/Referrals";
import Wallet from "@/pages/Wallet";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/referrals" component={Referrals} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const { user } = useAuth();
  const isAuthPage = location === "/login" || location === "/register";
  const isLandingPage = location === "/";
  const showNav = !isLandingPage && !isAuthPage;

  const balance = parseFloat(user?.usdtBalance || "0");

  return (
    <>
      {showNav && <MotivationalNotifications />}
      <div className="min-h-screen bg-background pb-20 md:pb-6">
        {showNav && (
          <AppHeader 
            onMenuClick={() => console.log('Menu clicked')}
            notificationCount={0}
            balance={balance}
          />
        )}
        <main className={showNav ? "container max-w-4xl mx-auto px-4 py-6" : ""}>
          <Router />
        </main>
        {showNav && <BottomNav />}
      </div>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
