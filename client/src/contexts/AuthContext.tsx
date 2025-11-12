import { createContext, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";

interface User {
  id: string;
  email: string;
  username: string | null;
  isAdmin: boolean;
  usdtBalance: string;
  rtcBalance: string;
  referralCode: string | null;
  depositAmount: string;
  depositBonus: string;
  tradingVolume: string;
  bonusWithdrawable: string;
  firstDepositBonusUsed: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("فشل تسجيل الخروج");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setLocation("/login");
    },
  });

  useEffect(() => {
    const publicPaths = ["/", "/login", "/register"];
    if (!isLoading && !user && !publicPaths.includes(location)) {
      setLocation("/login");
    }
  }, [user, isLoading, location, setLocation]);

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        logout: () => logoutMutation.mutate(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
