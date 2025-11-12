import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MotivationalNotifications from "@/components/MotivationalNotifications";
import Home from "@/pages/Home";
import Transactions from "@/pages/Transactions";
import Referrals from "@/pages/Referrals";
import Wallet from "@/pages/Wallet";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/referrals" component={Referrals} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [balance] = useState(25.50);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MotivationalNotifications />
        <div className="min-h-screen bg-background pb-20 md:pb-6">
          <AppHeader 
            onMenuClick={() => console.log('Menu clicked')}
            notificationCount={3}
            balance={balance}
          />
          <main className="container max-w-4xl mx-auto px-4 py-6">
            <Router />
          </main>
          <BottomNav />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
