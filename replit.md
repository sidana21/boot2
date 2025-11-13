# USDT Tap-to-Earn Application

## Overview

This is a gamified Arabic-language USDT earning platform built as a tap-to-earn application. Users earn USDT cryptocurrency by completing daily tapping tasks, referring friends, and participating in a lucky wheel game. The application features a deposit system where users can deposit USDT to unlock higher daily earning potential (up to 20% daily returns), with earnings paid out in both USDT and a custom RTC token.

The platform is designed with a mobile-first RTL (Right-to-Left) Arabic layout, inspired by modern crypto platforms like Binance and Coinbase, combined with gamification elements common in Telegram mini-apps.

## Recent Changes

### January 2025 - Production Deployment Fixes
- **Session Management Upgrade**: Migrated from MemoryStore to PostgreSQL-backed session storage using `connect-pg-simple`
  - Fixes session loss issues when deploying to Render or other cloud platforms
  - Sessions now persist across server restarts
  - Supports horizontal scaling with multiple server instances
- **Proxy Configuration**: Added trust proxy setting for production environments
  - Ensures secure cookies work correctly behind reverse proxies (Render, Heroku, etc.)
  - Required for HTTPS deployments

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as build tool and development server
- Wouter for client-side routing
- TanStack Query (React Query) for server state management
- Shadcn/ui component library built on Radix UI primitives

**Design System:**
- Tailwind CSS with custom configuration for RTL Arabic layout
- Custom CSS variables for theming (light/dark mode support)
- Cairo and Tajawal Google Fonts for Arabic typography
- Mobile-first responsive design with bottom navigation for mobile devices
- Component-based architecture with reusable UI primitives

**Key UI Components:**
- TappingButton: Core gamification component for daily earning tasks
- WalletBalanceCard: Displays user balances (USDT and RTC tokens)
- LuckyWheel: Gamified daily reward mechanism
- DepositWithdrawForm: Financial transaction management
- TransactionCard: Transaction history display
- ReferralCard: Referral program management with sharing capabilities

**State Management Pattern:**
- Server state managed via TanStack Query with configured query client
- Local component state using React hooks
- API requests abstracted through `apiRequest` utility function

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- Drizzle ORM for database operations
- Neon Serverless PostgreSQL via WebSocket connection
- Session-based authentication (infrastructure visible but not fully implemented)

**API Design:**
- RESTful endpoints under `/api` prefix
- CRUD operations for deposits, withdrawals, and system settings
- Admin-protected routes using middleware pattern
- JSON request/response format with Zod schema validation

**Key Endpoints:**
- `/api/settings` - System configuration management
- `/api/deposits` - Deposit tracking and confirmation
- `/api/withdrawals` - Withdrawal request management
- Admin middleware for protected operations

**Database Schema (Drizzle ORM):**
- `users` table: User accounts with USDT/RTC balances, referral codes, admin flags
- `deposits` table: Deposit transactions with status tracking and network information
- `withdrawals` table: Withdrawal requests with address and status management
- `systemSettings` table: Key-value configuration store

**Storage Abstraction:**
- IStorage interface defines data access contract
- MemStorage implementation for development/testing (in-memory)
- Designed to swap storage implementations without changing business logic

### External Dependencies

**Database:**
- Neon Serverless PostgreSQL (configured via `@neondatabase/serverless`)
- WebSocket-based connection for serverless environments
- Drizzle ORM for type-safe database queries and migrations

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components
- Shadcn/ui design system (New York variant)
- Lucide React for iconography

**Form Handling:**
- React Hook Form with Zod resolvers for validation
- Drizzle-Zod for automatic schema generation from database models

**Development Tools:**
- Replit-specific plugins for development (cartographer, dev banner, runtime error overlay)
- TypeScript for type safety across frontend and backend
- ESBuild for production builds

**Session Management:**
- Production-ready session storage using `connect-pg-simple` with PostgreSQL
- Sessions persist across server restarts and scale horizontally
- Automatic session table creation in database
- Secure cookie configuration with proxy trust for deployment platforms (Render, etc.)

**Planned Integrations (Not Yet Implemented):**
- Binance API for cryptocurrency operations (API key configuration visible in admin panel)
- USDT TRC20 network integration for deposits/withdrawals

**Key Architectural Decisions:**

1. **Monorepo Structure**: Shared TypeScript schemas between client and server via `@shared` path alias to ensure type consistency
2. **RTL-First Design**: Application defaults to Arabic RTL layout with proper font support for Arabic typography
3. **Gamification Layer**: Daily earning mechanics with randomized multipliers (15-25%) to maintain engagement
4. **Two-Token Economy**: USDT for real value, RTC as platform currency for additional gamification
5. **Admin Panel Integration**: Built-in admin functionality for managing deposits, withdrawals, and system settings
6. **Mobile-Optimized**: Bottom navigation bar for mobile, responsive design patterns throughout