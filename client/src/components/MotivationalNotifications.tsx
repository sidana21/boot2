import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import rtcLogo from "@assets/1762901598272_1762903589759.jpg";

const arabicNames = [
  "محمد أحمد",
  "فاطمة علي",
  "عبدالله حسن",
  "سارة محمود",
  "أحمد خالد",
  "نورة سعد",
  "خالد عمر",
  "مريم يوسف",
  "عمر إبراهيم",
  "ليلى حسين",
  "يوسف عادل",
  "هدى سالم",
  "سعد منصور",
  "زينب كمال",
  "طارق فهد",
  "رنا وليد",
  "فهد راشد",
  "نور الدين",
  "جواهر عبدالعزيز",
  "ماجد سليمان"
];

const getRandomName = () => {
  return arabicNames[Math.floor(Math.random() * arabicNames.length)];
};

const getRandomAmount = () => {
  const amounts = [50, 75, 100, 150, 200, 250, 300, 500, 750, 1000, 1500, 2000];
  return amounts[Math.floor(Math.random() * amounts.length)];
};

const getRandomInterval = () => {
  return Math.floor(Math.random() * (45000 - 20000 + 1)) + 20000;
};

export default function MotivationalNotifications() {
  const { toast } = useToast();

  useEffect(() => {
    const showNotification = () => {
      const name = getRandomName();
      const amount = getRandomAmount();
      
      toast({
        title: "🎉 سحب ناجح!",
        description: `${name} قام بسحب ${amount} USDT - منذ لحظات! ابدأ الآن واربح مثله 💰`,
        duration: 5000,
      });
    };

    showNotification();

    const scheduleNext = () => {
      const interval = getRandomInterval();
      return setTimeout(() => {
        showNotification();
        scheduleNext();
      }, interval);
    };

    const timeoutId = scheduleNext();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toast]);

  return null;
}
