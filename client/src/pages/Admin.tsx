import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Shield, 
  Settings, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  CheckCircle, 
  XCircle,
  Clock,
  Copy
} from "lucide-react";
import type { Deposit, Withdrawal, SystemSetting } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const [depositAddress, setDepositAddress] = useState("");
  const [binanceApiKey, setBinanceApiKey] = useState("");
  const [binanceApiSecret, setBinanceApiSecret] = useState("");

  const { data: deposits = [] } = useQuery<Deposit[]>({
    queryKey: ["/api/deposits"],
  });

  const { data: withdrawals = [] } = useQuery<Withdrawal[]>({
    queryKey: ["/api/withdrawals"],
  });

  const { data: settings = [] } = useQuery<SystemSetting[]>({
    queryKey: ["/api/settings"],
    enabled: true,
  });

  const updateDepositMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/deposits/${id}`, { status, confirmedAt: new Date() });
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/deposits"] });
      queryClient.invalidateQueries({ queryKey: ["/api/deposits", variables.id] });
      toast({
        title: "تم التحديث",
        description: "تم تحديث حالة الإيداع بنجاح",
      });
    },
  });

  const updateWithdrawalMutation = useMutation({
    mutationFn: async ({ id, status, txHash }: { id: string; status: string; txHash?: string }) => {
      return apiRequest("PATCH", `/api/withdrawals/${id}`, { 
        status, 
        txHash,
        processedAt: new Date() 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/withdrawals"] });
      toast({
        title: "تم التحديث",
        description: "تم تحديث حالة السحب بنجاح",
      });
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      return apiRequest("POST", "/api/settings", { key, value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "تم الحفظ",
        description: "تم حفظ الإعدادات بنجاح",
      });
    },
  });

  const handleSaveSettings = () => {
    if (depositAddress) {
      updateSettingMutation.mutate({ key: "deposit_address", value: depositAddress });
    }
    if (binanceApiKey) {
      updateSettingMutation.mutate({ key: "binance_api_key", value: binanceApiKey });
    }
    if (binanceApiSecret) {
      updateSettingMutation.mutate({ key: "binance_api_secret", value: binanceApiSecret });
    }
  };

  const pendingDeposits = deposits.filter(d => d.status === "pending");
  const pendingWithdrawals = withdrawals.filter(w => w.status === "pending");
  const completedDeposits = deposits.filter(d => d.status === "confirmed");
  const completedWithdrawals = withdrawals.filter(w => w.status === "completed");

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-primary/10 pulse-soft">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">لوحة تحكم الإدارة</h1>
          <p className="text-sm text-muted-foreground">إدارة الطلبات والإعدادات</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-accent/10 to-background">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownToLine className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground">طلبات إيداع معلقة</p>
          </div>
          <p className="text-3xl font-bold text-accent tabular-nums">{pendingDeposits.length}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-destructive/10 to-background">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpFromLine className="w-4 h-4 text-destructive" />
            <p className="text-sm text-muted-foreground">طلبات سحب معلقة</p>
          </div>
          <p className="text-3xl font-bold text-destructive tabular-nums">{pendingWithdrawals.length}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-primary/10 to-background">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">إيداعات مكتملة</p>
          </div>
          <p className="text-3xl font-bold text-primary tabular-nums">{completedDeposits.length}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-background">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <p className="text-sm text-muted-foreground">سحوبات مكتملة</p>
          </div>
          <p className="text-3xl font-bold text-secondary tabular-nums">{completedWithdrawals.length}</p>
        </Card>
      </div>

      <Tabs defaultValue="deposits" dir="rtl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deposits" data-testid="tab-admin-deposits">
            <ArrowDownToLine className="w-4 h-4 ml-2" />
            الإيداعات
          </TabsTrigger>
          <TabsTrigger value="withdrawals" data-testid="tab-admin-withdrawals">
            <ArrowUpFromLine className="w-4 h-4 ml-2" />
            السحوبات
          </TabsTrigger>
          <TabsTrigger value="settings" data-testid="tab-admin-settings">
            <Settings className="w-4 h-4 ml-2" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposits" className="space-y-4">
          <h3 className="text-lg font-bold">طلبات الإيداع</h3>
          
          {pendingDeposits.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground">معلقة</h4>
              {pendingDeposits.map((deposit) => (
                <Card key={deposit.id} className="p-4" data-testid={`deposit-${deposit.id}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-accent/20 text-accent">
                          {deposit.amount} USDT
                        </Badge>
                        <Badge variant="outline">{deposit.network}</Badge>
                        <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                          <Clock className="w-3 h-3 ml-1" />
                          معلق
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        المستخدم: {deposit.userId.substring(0, 8)}...
                      </p>
                      {deposit.txHash && (
                        <p className="text-xs text-muted-foreground mt-1">
                          TX: {deposit.txHash.substring(0, 12)}...
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(deposit.createdAt).toLocaleString('ar-SA')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateDepositMutation.mutate({ id: deposit.id, status: "confirmed" })}
                        disabled={updateDepositMutation.isPending}
                        data-testid={`button-confirm-deposit-${deposit.id}`}
                      >
                        <CheckCircle className="w-4 h-4 ml-1" />
                        تأكيد
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateDepositMutation.mutate({ id: deposit.id, status: "rejected" })}
                        disabled={updateDepositMutation.isPending}
                        data-testid={`button-reject-deposit-${deposit.id}`}
                      >
                        <XCircle className="w-4 h-4 ml-1" />
                        رفض
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {completedDeposits.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground">مكتملة</h4>
              {completedDeposits.slice(0, 5).map((deposit) => (
                <Card key={deposit.id} className="p-4 opacity-75">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-primary/20 text-primary">
                          {deposit.amount} USDT
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-3 h-3 ml-1" />
                          مؤكد
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(deposit.createdAt).toLocaleString('ar-SA')}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="withdrawals" className="space-y-4">
          <h3 className="text-lg font-bold">طلبات السحب</h3>
          
          {pendingWithdrawals.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground">معلقة</h4>
              {pendingWithdrawals.map((withdrawal) => (
                <Card key={withdrawal.id} className="p-4" data-testid={`withdrawal-${withdrawal.id}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-destructive/20 text-destructive">
                          {withdrawal.amount} USDT
                        </Badge>
                        <Badge variant="outline">{withdrawal.network}</Badge>
                        <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                          <Clock className="w-3 h-3 ml-1" />
                          معلق
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        المستخدم: {withdrawal.userId.substring(0, 8)}...
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">
                          العنوان: {withdrawal.address.substring(0, 10)}...{withdrawal.address.substring(withdrawal.address.length - 8)}
                        </p>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => {
                            navigator.clipboard.writeText(withdrawal.address);
                            toast({ title: "تم النسخ", description: "تم نسخ العنوان" });
                          }}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        الرسوم: {withdrawal.fee} USDT
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(withdrawal.createdAt).toLocaleString('ar-SA')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          const txHash = prompt("أدخل TX Hash:");
                          if (txHash) {
                            updateWithdrawalMutation.mutate({ 
                              id: withdrawal.id, 
                              status: "completed",
                              txHash 
                            });
                          }
                        }}
                        disabled={updateWithdrawalMutation.isPending}
                        data-testid={`button-complete-withdrawal-${withdrawal.id}`}
                      >
                        <CheckCircle className="w-4 h-4 ml-1" />
                        إكمال
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateWithdrawalMutation.mutate({ 
                          id: withdrawal.id, 
                          status: "rejected" 
                        })}
                        disabled={updateWithdrawalMutation.isPending}
                        data-testid={`button-reject-withdrawal-${withdrawal.id}`}
                      >
                        <XCircle className="w-4 h-4 ml-1" />
                        رفض
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {completedWithdrawals.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground">مكتملة</h4>
              {completedWithdrawals.slice(0, 5).map((withdrawal) => (
                <Card key={withdrawal.id} className="p-4 opacity-75">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-primary/20 text-primary">
                          {withdrawal.amount} USDT
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-3 h-3 ml-1" />
                          مكتمل
                        </Badge>
                      </div>
                      {withdrawal.txHash && (
                        <p className="text-xs text-muted-foreground">
                          TX: {withdrawal.txHash.substring(0, 12)}...
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(withdrawal.createdAt).toLocaleString('ar-SA')}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              إعدادات النظام
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="deposit-address">عنوان إيداع USDT (TRC20)</Label>
                <Input
                  id="deposit-address"
                  type="text"
                  value={depositAddress || settings.find(s => s.key === "deposit_address")?.value || ""}
                  onChange={(e) => setDepositAddress(e.target.value)}
                  placeholder="TXYZexampleAddress..."
                  className="mt-2"
                  data-testid="input-deposit-address"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  سيتم عرض هذا العنوان للمستخدمين عند طلب الإيداع
                </p>
              </div>

              <div>
                <Label htmlFor="binance-api-key">Binance API Key</Label>
                <Input
                  id="binance-api-key"
                  type="text"
                  value={binanceApiKey || settings.find(s => s.key === "binance_api_key")?.value || ""}
                  onChange={(e) => setBinanceApiKey(e.target.value)}
                  placeholder="أدخل Binance API Key"
                  className="mt-2"
                  data-testid="input-binance-api-key"
                />
              </div>

              <div>
                <Label htmlFor="binance-api-secret">Binance API Secret</Label>
                <Input
                  id="binance-api-secret"
                  type="password"
                  value={binanceApiSecret || settings.find(s => s.key === "binance_api_secret")?.value || ""}
                  onChange={(e) => setBinanceApiSecret(e.target.value)}
                  placeholder="أدخل Binance API Secret"
                  className="mt-2"
                  data-testid="input-binance-api-secret"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  للتحقق التلقائي من الإيداعات عبر Binance
                </p>
              </div>

              <Button
                onClick={handleSaveSettings}
                disabled={updateSettingMutation.isPending}
                className="w-full"
                data-testid="button-save-settings"
              >
                {updateSettingMutation.isPending ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-background border-accent/30">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              ملاحظات مهمة
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• تأكد من صحة عنوان USDT قبل حفظه</li>
              <li>• احتفظ بـ API Keys في مكان آمن</li>
              <li>• راجع جميع الطلبات قبل تأكيدها</li>
              <li>• تحقق من TX Hash قبل إكمال السحوبات</li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
