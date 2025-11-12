export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Header
    appName: 'بوت التداول',
    
    // Navigation
    home: 'الرئيسية',
    wallet: 'المحفظة',
    transactions: 'المعاملات',
    referrals: 'الإحالات',
    admin: 'الإدارة',
    
    // Wallet Balance Card
    myWallet: 'محفظتي',
    active: 'نشط',
    usdtBalance: 'رصيد USDT',
    rtcCurrency: 'عملة RTC',
    todayEarnings: 'أرباح اليوم',
    totalEarnings: 'إجمالي الأرباح',
    dailyPotential: 'إمكانية الربح اليومي',
    daily20: '20% يومياً',
    
    // Buttons
    deposit: 'إيداع',
    withdraw: 'سحب',
    invite: 'دعوة',
    
    // Trading Bot
    smartTradingBot: 'بوت التداول الذكي',
    automaticTradingOnPlatforms: 'تداول آلي على أشهر المنصات العالمية',
    dailyProgress: 'التقدم اليومي',
    remaining: 'متبقي',
    completedToday: '🎉 تم إكمال هدف اليوم!',
    botRunning: 'البوت يعمل الآن',
    completedCycles: 'دورات مكتملة',
    stopBot: 'إيقاف البوت',
    startBotNow: 'تشغيل البوت الآن',
    completedForDay: 'مكتمل لليوم',
    activeTrades: 'الصفقات النشطة',
    tradeResults: 'نتائج الصفقات',
    completedTrades: 'صفقات مكتملة',
    executing: 'جارٍ التنفيذ',
    totalProfit: 'إجمالي الأرباح',
    executingTrades: 'جارٍ تنفيذ {count} صفقات...',
    
    // How Bot Works
    howBotWorks: 'كيف يعمل البوت؟',
    botStep1: '• يفتح عدة صفقات في نفس الوقت على منصات مختلفة',
    botStep2: '• كل دورة تستغرق دقيقة واحدة فقط',
    botStep3: '• الأرباح تضاف تلقائياً بعد كل دورة',
    botStep4: '• البوت يتوقف عند الوصول للهدف اليومي',
    
    // Countdown Timer
    countdownToNextSession: 'العد التنازلي للجلسة القادمة',
    nextSessionStarts: 'ستبدأ الجلسة القادمة تلقائياً بعد انتهاء العد التنازلي',
    hour: 'ساعة',
    minute: 'دقيقة',
    second: 'ثانية',
    
    // Lucky Wheel
    luckyWheel: 'عجلة الحظ',
    spinWheel: 'تدوير العجلة',
    dailyChance: 'فرصة يومية واحدة',
    alreadySpunToday: 'لقد قمت بالتدوير اليوم',
    youWon: 'لقد ربحت',
    
    // Stats Grid
    referralsCount: 'الإحالات',
    referralEarnings: 'أرباح الإحالات',
    weeklyEarnings: 'أرباح الأسبوع',
    daysActive: 'أيام النشاط',
    
    // Referrals Page
    referralProgram: 'برنامج الإحالات',
    commission: 'عمولة',
    totalReferrals: 'إجمالي الإحالات',
    referralCode: 'كود الإحالة',
    referralLink: 'رابط الإحالة',
    copy: 'نسخ',
    share: 'مشاركة',
    shareViaWhatsApp: 'مشاركة عبر واتساب',
    howItWorks: 'كيف تعمل؟',
    shareReferralDescription: 'شارك رابط الإحالة مع أصدقائك واحصل على {rate}% من أرباحهم اليومية!',
    
    // Tier System
    tierBonuses: 'مستويات العمولة',
    bronze: 'برونزي',
    silver: 'فضي',
    gold: 'ذهبي',
    diamond: 'ماسي',
    tierReferrals: 'إحالات',
    commissionRate: 'نسبة العمولة',
    currentTier: 'مستواك الحالي',
    
    // General
    usdt: 'USDT',
    rtc: 'RTC',
    profitPercentageToday: 'نسبة الربح اليوم:',
    profitChangesDaily: 'الربح يتغير عشوائياً كل يوم (15-25%)',
    fromYourDeposit: 'من إيداعك',
  },
  
  en: {
    // Header
    appName: 'Trading Bot',
    
    // Navigation
    home: 'Home',
    wallet: 'Wallet',
    transactions: 'Transactions',
    referrals: 'Referrals',
    admin: 'Admin',
    
    // Wallet Balance Card
    myWallet: 'My Wallet',
    active: 'Active',
    usdtBalance: 'USDT Balance',
    rtcCurrency: 'RTC Currency',
    todayEarnings: "Today's Earnings",
    totalEarnings: 'Total Earnings',
    dailyPotential: 'Daily Earning Potential',
    daily20: '20% Daily',
    
    // Buttons
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    invite: 'Invite',
    
    // Trading Bot
    smartTradingBot: 'Smart Trading Bot',
    automaticTradingOnPlatforms: 'Automated trading on top global platforms',
    dailyProgress: 'Daily Progress',
    remaining: 'remaining',
    completedToday: '🎉 Daily target completed!',
    botRunning: 'Bot is running',
    completedCycles: 'completed cycles',
    stopBot: 'Stop Bot',
    startBotNow: 'Start Bot Now',
    completedForDay: 'Completed for today',
    activeTrades: 'Active Trades',
    tradeResults: 'Trade Results',
    completedTrades: 'Completed Trades',
    executing: 'Executing',
    totalProfit: 'Total Profit',
    executingTrades: 'Executing {count} trades...',
    
    // How Bot Works
    howBotWorks: 'How does the bot work?',
    botStep1: '• Opens multiple trades simultaneously on different platforms',
    botStep2: '• Each cycle takes only one minute',
    botStep3: '• Profits are added automatically after each cycle',
    botStep4: '• Bot stops when daily target is reached',
    
    // Countdown Timer
    countdownToNextSession: 'Countdown to Next Session',
    nextSessionStarts: 'Next session will start automatically after countdown',
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second',
    
    // Lucky Wheel
    luckyWheel: 'Lucky Wheel',
    spinWheel: 'Spin the Wheel',
    dailyChance: 'One daily chance',
    alreadySpunToday: 'Already spun today',
    youWon: 'You won',
    
    // Stats Grid
    referralsCount: 'Referrals',
    referralEarnings: 'Referral Earnings',
    weeklyEarnings: 'Weekly Earnings',
    daysActive: 'Active Days',
    
    // Referrals Page
    referralProgram: 'Referral Program',
    commission: 'Commission',
    totalReferrals: 'Total Referrals',
    referralCode: 'Referral Code',
    referralLink: 'Referral Link',
    copy: 'Copy',
    share: 'Share',
    shareViaWhatsApp: 'Share via WhatsApp',
    howItWorks: 'How does it work?',
    shareReferralDescription: 'Share your referral link with friends and earn {rate}% of their daily earnings!',
    
    // Tier System
    tierBonuses: 'Commission Tiers',
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    diamond: 'Diamond',
    tierReferrals: 'Referrals',
    commissionRate: 'Commission Rate',
    currentTier: 'Your Current Tier',
    
    // General
    usdt: 'USDT',
    rtc: 'RTC',
    profitPercentageToday: 'Profit rate today:',
    profitChangesDaily: 'Profit changes randomly each day (15-25%)',
    fromYourDeposit: 'from your deposit',
  }
};

export type TranslationKey = keyof typeof translations.ar;
