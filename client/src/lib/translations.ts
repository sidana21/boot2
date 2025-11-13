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
    
    // Common messages
    error: 'خطأ',
    success: 'نجح',
    copied: 'تم النسخ!',
    copiedSuccessfully: 'تم نسخ الرسالة بنجاح',
    loading: 'جاري التحميل...',
    processing: 'جاري المعالجة...',
    
    // Wallet page
    walletTitle: 'المحفظة',
    manageBalance: 'إدارة رصيدك',
    usdtBalanceLabel: 'رصيد USDT',
    rtcBalanceLabel: 'رصيد RTC',
    totalDeposits: 'إجمالي الإيداعات',
    totalWithdrawals: 'إجمالي السحوبات',
    whatIsRTC: 'ما هي عملة RTC؟',
    rtcDescription: 'هي عملة التكبيس الخاصة بك!',
    rtcEarnRate: 'تكسب 10 RTC مع كل تكبيسة',
    rtcRewards: 'يمكن استبدال RTC بمكافآت ومزايا خاصة قريباً',
    rtcSaveCoins: 'احفظ عملاتك لفرص قادمة مميزة!',
    
    // Deposit & Withdraw
    depositAmountLabel: 'المبلغ المودع (USDT)',
    enterDepositAmount: 'أدخل المبلغ الذي أرسلته',
    minimumAmount: 'الحد الأدنى: {min} USDT',
    minimumDeposit: 'الحد الأدنى للإيداع {min} USDT',
    minimumWithdraw: 'الحد الأدنى للسحب {min} USDT',
    insufficientBalance: 'رصيدك غير كافٍ',
    enterWalletAddress: 'يرجى إدخال عنوان المحفظة',
    walletAddressLabel: 'عنوان محفظتك (TRC20)',
    amountLabel: 'المبلغ (USDT)',
    iSentVerify: 'قمت بالإرسال - تحقق من الإيداع',
    verificationStarted: 'بدء التحقق',
    verificationAutomatic: 'سيتم التحقق من إيداعك تلقائياً',
    verificationFailed: 'فشل في بدء عملية التحقق',
    depositRequest: 'طلب الإيداع',
    depositRequestSent: 'تم إرسال طلب إيداع {amount} USDT',
    withdrawRequest: 'طلب السحب',
    withdrawRequestSent: 'تم إرسال طلب سحب {amount} USDT',
    verificationComplete: 'تم التأكيد',
    balanceAdded: 'تمت إضافة الرصيد إلى محفظتك',
    
    // Transactions page
    transactionsTitle: 'المعاملات',
    allTransactionsHistory: 'سجل جميع المعاملات',
    allTransactions: 'الكل',
    noTransactions: 'لا توجد معاملات',
    
    // Trading Bot
    automaticTradingDesc: 'تداول آلي على أشهر المنصات العالمية',
    cyclesDone: 'دورة مكتملة',
    
    // Referrals page
    premiumReferralProgram: 'برنامج الإحالات المميز',
    inviteFriendsEarn: 'ادعُ أصدقائك واربح حتى 25%',
    firstReferralBonus: 'مكافأة الإحالة الأولى!',
    firstReferralReward: 'احصل على 5 USDT فوراً عند أول إحالة',
    noReferralsYet: 'لم تقم بإحالة أحد بعد! ابدأ الآن واحصل على 5 USDT مباشرة 🎁',
    yourCurrentLevel: 'مستواك الحالي',
    yourReferrals: 'إحالاتك',
    progressTowards: 'التقدم نحو {tier} {icon}',
    needMoreReferrals: 'تحتاج {count} إحالة للوصول إلى {tier} (+{rate}% عمولة)',
    referralsRequired: '{min}+ إحالات',
    readyMessages: 'رسائل جاهزة للمشاركة',
    simpleMessage: 'رسالة بسيطة',
    motivationalMessage: 'رسالة تحفيزية',
    professionalMessage: 'رسالة احترافية',
    whatsapp: 'واتساب',
    monthlyContest: 'مسابقة الشهر',
    top10Referrers: 'أفضل 10 محيلين - جوائز حتى 500 USDT',
    firstPlace: 'المركز الأول',
    secondPlace: 'المركز الثاني',
    thirdPlace: 'المركز الثالث',
    contestEnds: 'المسابقة تنتهي في {days} يوم • ادعُ المزيد من الأصدقاء لتصعد في الترتيب!',
    yourFriends: 'أصدقائك ({count})',
    totalCommissions: 'إجمالي العمولات: {amount} USDT',
    theirEarnings: 'أرباحه: {amount} USDT',
    yourCommission: 'عمولتك',
    noReferralsTitle: 'لا توجد إحالات بعد',
    noReferralsDesc: 'ابدأ بدعوة أصدقائك واربح عمولات من أرباحهم!',
    startSharing: 'ابدأ المشاركة',
    
    // No Deposit Message
    welcomeToTradingPlatform: 'مرحباً بك في منصة التداول',
    needDepositToStart: 'للبدء في الربح اليومي، تحتاج أولاً لعمل إيداع',
    depositUSDTMin: 'قم بإيداع USDT (الحد الأدنى {min} دولار)',
    runBotToTrade: 'شغّل البوت ليتداول تلقائياً على أشهر المنصات',
    earnDailyPercent: 'اربح من {min}% إلى {max}% يومياً من رصيد إيداعك',
    withdrawAnytimeMin: 'اسحب أرباحك في أي وقت (الحد الأدنى {min} دولار)',
    highProfitRate: 'نسبة ربح عالية',
    dailyGuaranteedReturn: 'عائد يومي مضمون',
    easyStart: 'بداية سهلة',
    minDepositLabel: 'الحد الأدنى للإيداع',
    firstDepositBonusLabel: 'مكافأة الإيداع الأول',
    getFirstDepositBonus: 'احصل على {percent}% بونص على أول إيداع لك البونص قابل للسحب بعد إتمام حجم تداول يعادل {multiplier} أضعاف الإيداع',
    startDepositNow: 'ابدأ الإيداع الآن',
    afterDepositCanStart: 'بعد الإيداع، ستتمكن من تشغيل البوت والبدء في الربح فوراً',
    
    // Login & Register
    loginTitle: 'تسجيل الدخول',
    loginDesc: 'أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك',
    emailLabel: 'البريد الإلكتروني',
    passwordLabel: 'كلمة المرور',
    loggingIn: 'جاري تسجيل الدخول...',
    loginButton: 'تسجيل الدخول',
    loginSuccess: 'نجح تسجيل الدخول',
    welcome: 'مرحباً بك!',
    loginFailed: 'فشل تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    createNewAccount: 'إنشاء حساب جديد',
    invalidEmail: 'البريد الإلكتروني غير صالح',
    passwordMinLength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    loadUserDataFailed: 'فشل تحميل بيانات المستخدم',
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
    
    // Common messages
    error: 'Error',
    success: 'Success',
    copied: 'Copied!',
    copiedSuccessfully: 'Message copied successfully',
    loading: 'Loading...',
    processing: 'Processing...',
    
    // Wallet page
    walletTitle: 'Wallet',
    manageBalance: 'Manage your balance',
    usdtBalanceLabel: 'USDT Balance',
    rtcBalanceLabel: 'RTC Balance',
    totalDeposits: 'Total Deposits',
    totalWithdrawals: 'Total Withdrawals',
    whatIsRTC: 'What is RTC?',
    rtcDescription: 'is your tap coin!',
    rtcEarnRate: 'Earn 10 RTC with each tap',
    rtcRewards: 'RTC can be redeemed for rewards and special benefits soon',
    rtcSaveCoins: 'Save your coins for upcoming special opportunities!',
    
    // Deposit & Withdraw
    depositAmountLabel: 'Deposit Amount (USDT)',
    enterDepositAmount: 'Enter the amount you sent',
    minimumAmount: 'Minimum: {min} USDT',
    minimumDeposit: 'Minimum deposit {min} USDT',
    minimumWithdraw: 'Minimum withdrawal {min} USDT',
    insufficientBalance: 'Insufficient balance',
    enterWalletAddress: 'Please enter wallet address',
    walletAddressLabel: 'Your Wallet Address (TRC20)',
    amountLabel: 'Amount (USDT)',
    iSentVerify: 'I Sent - Verify Deposit',
    verificationStarted: 'Verification Started',
    verificationAutomatic: 'Your deposit will be verified automatically',
    verificationFailed: 'Failed to start verification process',
    depositRequest: 'Deposit Request',
    depositRequestSent: 'Deposit request of {amount} USDT sent',
    withdrawRequest: 'Withdrawal Request',
    withdrawRequestSent: 'Withdrawal request of {amount} USDT sent',
    verificationComplete: 'Confirmed',
    balanceAdded: 'Balance added to your wallet',
    
    // Transactions page
    transactionsTitle: 'Transactions',
    allTransactionsHistory: 'All transactions history',
    allTransactions: 'All',
    noTransactions: 'No transactions',
    
    // Trading Bot
    automaticTradingDesc: 'Automated trading on top global platforms',
    cyclesDone: 'cycle completed',
    
    // Referrals page
    premiumReferralProgram: 'Premium Referral Program',
    inviteFriendsEarn: 'Invite your friends and earn up to 25%',
    firstReferralBonus: 'First Referral Bonus!',
    firstReferralReward: 'Get 5 USDT instantly on your first referral',
    noReferralsYet: "You haven't referred anyone yet! Start now and get 5 USDT instantly 🎁",
    yourCurrentLevel: 'Your Current Level',
    yourReferrals: 'Your Referrals',
    progressTowards: 'Progress towards {tier} {icon}',
    needMoreReferrals: 'Need {count} referral(s) to reach {tier} (+{rate}% commission)',
    referralsRequired: '{min}+ referrals',
    readyMessages: 'Ready-to-Share Messages',
    simpleMessage: 'Simple Message',
    motivationalMessage: 'Motivational Message',
    professionalMessage: 'Professional Message',
    whatsapp: 'WhatsApp',
    monthlyContest: 'Monthly Contest',
    top10Referrers: 'Top 10 Referrers - Prizes up to 500 USDT',
    firstPlace: 'First Place',
    secondPlace: 'Second Place',
    thirdPlace: 'Third Place',
    contestEnds: 'Contest ends in {days} days • Invite more friends to climb the ranks!',
    yourFriends: 'Your Friends ({count})',
    totalCommissions: 'Total Commissions: {amount} USDT',
    theirEarnings: 'Their earnings: {amount} USDT',
    yourCommission: 'Your commission',
    noReferralsTitle: 'No Referrals Yet',
    noReferralsDesc: 'Start inviting your friends and earn commissions from their earnings!',
    startSharing: 'Start Sharing',
    
    // No Deposit Message
    welcomeToTradingPlatform: 'Welcome to the Trading Platform',
    needDepositToStart: 'To start earning daily profits, you first need to make a deposit',
    depositUSDTMin: 'Deposit USDT (minimum {min} USD)',
    runBotToTrade: 'Run the bot to trade automatically on top platforms',
    earnDailyPercent: 'Earn {min}% to {max}% daily from your deposit balance',
    withdrawAnytimeMin: 'Withdraw your earnings anytime (minimum {min} USD)',
    highProfitRate: 'High Profit Rate',
    dailyGuaranteedReturn: 'Guaranteed daily return',
    easyStart: 'Easy Start',
    minDepositLabel: 'Minimum Deposit',
    firstDepositBonusLabel: 'First Deposit Bonus',
    getFirstDepositBonus: 'Get {percent}% bonus on your first deposit The bonus is withdrawable after completing trading volume equal to {multiplier} times the deposit',
    startDepositNow: 'Start Depositing Now',
    afterDepositCanStart: 'After depositing, you can run the bot and start earning immediately',
    
    // Login & Register
    loginTitle: 'Login',
    loginDesc: 'Enter your email and password to access your account',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    loggingIn: 'Logging in...',
    loginButton: 'Login',
    loginSuccess: 'Login Successful',
    welcome: 'Welcome!',
    loginFailed: 'Login Failed',
    noAccount: "Don't have an account?",
    createNewAccount: 'Create New Account',
    invalidEmail: 'Invalid email address',
    passwordMinLength: 'Password must be at least 6 characters',
    loadUserDataFailed: 'Failed to load user data',
  }
};

export type TranslationKey = keyof typeof translations.ar;
