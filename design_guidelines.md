# Design Guidelines - USDT Tap-to-Earn Application

## Design Approach

**Selected Approach:** Reference-Based, inspired by modern crypto platforms (Binance, Coinbase) combined with gamification apps (Telegram mini-apps, earning platforms)

**Key Principles:**
- Trust and credibility through clean, professional design
- Clear financial data presentation
- Gamification for engagement
- Mobile-first RTL (Right-to-Left) Arabic layout

## Typography System

**Font Family:** 
- Primary: 'Cairo', 'Tajawal' via Google Fonts (excellent Arabic support)
- Fallback: system-ui, sans-serif

**Hierarchy:**
- Hero/Display: 4xl to 6xl, font-weight-800
- Section Headers: 2xl to 3xl, font-weight-700
- Card Titles: xl, font-weight-600
- Body Text: base to lg, font-weight-400
- Numbers/Stats: 3xl to 5xl, font-weight-700 (tabular numbers)
- Small Labels: sm, font-weight-500

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16
- Card gaps: gap-4, gap-6
- Button padding: px-6, py-3

**Container Strategy:**
- Max width: max-w-7xl for dashboard
- Full width: Cards and sections use w-full with inner padding
- Mobile: px-4, Tablet: px-6, Desktop: px-8

## Core Components

### Authentication Screens
- Centered card layout (max-w-md)
- Large logo/icon at top
- Form fields with right-aligned labels
- Primary CTA button full-width
- Social proof text below form

### Dashboard Layout
- Top: Wallet balance card (prominent, full-width)
- Stats grid: 2x2 on mobile, 4 columns on desktop
- Quick actions row: تكبيس, سحب, إيداع, دعوة buttons
- Tabs navigation: نظرة عامة, المعاملات, الإحالات
- Content area below tabs

### Tapping Interface
- Full-screen engaging view
- Large circular tap button (w-64 h-64 on desktop, w-48 h-48 mobile)
- Progress ring around button
- Counter display above: "XX / 100 تكبيسة"
- Earnings display below: "+10 USDT اليوم"
- Daily streak indicator
- Pulsing animation on tap (scale-95 to scale-100)

### Wallet Card
- Large balance display (5xl numbers)
- USDT symbol prominently shown
- Breakdown: رصيد متاح, أرباح اليوم, إجمالي الأرباح
- Quick action buttons inline

### Transaction Cards
- List layout with alternating subtle backgrounds
- Icon left (RTL: right), amount and type center, timestamp right (RTL: left)
- Transaction type badges (إيداع, سحب, أرباح, إحالة)
- Status indicators with icons

### Referral Section
- Share link card with copy button
- Referral code display (monospace font)
- Grid of referred users (avatars + earnings contribution)
- Total referral earnings prominently displayed
- Commission percentage badge (20%)

### Deposit/Withdrawal Forms
- Two-step process indicators at top
- USDT amount input with large numbers
- Wallet address field (monospace for addresses)
- QR code display area for deposits
- Fee breakdown table
- Minimum amount notices
- Confirmation modal before submission

## Navigation

**Top Bar:**
- Logo/brand right (RTL)
- Main nav center: الرئيسية, المحفظة, الإحالات, الملف الشخصي
- Notifications icon left (RTL: right)
- Mobile: Hamburger menu

**Bottom Navigation (Mobile):**
- Fixed bottom bar
- 4-5 icons: الرئيسية, تكبيس, المحفظة, الإحالات, المزيد
- Active state with indicator

## Data Visualization

- Progress bars for daily goals
- Circular progress for tap completion
- Line chart for earnings history (7-day view)
- Bar chart for referral performance
- Stat cards with icons and trend indicators (↑↓)

## Cards & Containers

- Consistent rounded corners: rounded-xl
- Subtle shadows: shadow-md for elevation
- Border treatment: border border-transparent (styled via color later)
- Padding: p-6 standard, p-8 for important cards
- Hover states: slight lift (translate-y-1) and shadow increase

## Buttons

**Primary Actions:**
- Large: px-8 py-4, text-lg
- Standard: px-6 py-3, text-base
- Full-width on mobile for major CTAs

**Secondary Actions:**
- Outlined style with border-2
- Same padding as primary

**Icon Buttons:**
- Circular: w-12 h-12, rounded-full
- Square: w-10 h-10, rounded-lg

## Icons

**Library:** Heroicons via CDN (clean, modern, crypto-friendly)

**Usage:**
- Financial: currency-dollar, banknotes, wallet
- Actions: cursor-arrow-rays (tap), arrow-up-tray (withdraw), arrow-down-tray (deposit)
- Social: share, user-group, link
- Status: check-circle, clock, x-circle

## Forms

- Input fields: p-4, rounded-lg, text-lg for numbers
- Labels: text-sm, font-medium, above inputs
- Error states: border treatment + error text below
- Helper text: text-sm below inputs
- RTL-aware placeholder alignment

## Images

**Hero Section (Login/Landing):**
- Abstract crypto/digital money illustration or geometric pattern
- Positioned as full-width background with overlay
- Height: 60vh on desktop, 40vh mobile

**Dashboard:**
- No large hero image
- Small illustrative icons in empty states
- Profile avatars: rounded-full, w-10 h-10 standard

**Crypto Visual Elements:**
- USDT logo displayed consistently
- Blockchain/network icons for transaction types
- Trust badges if applicable

## Accessibility

- High contrast for financial numbers
- Clear focus states on all interactive elements
- Sufficient touch targets (min 44x44px)
- Screen reader labels in Arabic
- Keyboard navigation support
- RTL-optimized throughout

## Mobile Optimization

- Touch-friendly tap button (minimum 200px diameter)
- Sticky wallet balance at top on scroll
- Bottom sheet modals for actions
- Swipe gestures for tab navigation
- Pull-to-refresh for transaction updates
- Single column layout for all content

## Trust & Security Indicators

- SSL/security badges near financial actions
- Transaction confirmations with details
- Address verification displays (show first/last characters)
- Timestamp for all transactions
- Clear fee breakdowns
- Withdrawal limit indicators

**Critical Note:** All layouts must be RTL-optimized for Arabic. Text alignment defaults to right, icon positions reversed, navigation flows right-to-left.