# 🍽 SmartCaf — Frontend

The web frontend for **SmartCaf** (اسمارت کف), a smart university cafeteria reservation system.

Built with [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript, Tailwind CSS 4, and [shadcn/ui](https://ui.shadcn.com).

## ✨ Features

### Student Panel (`/student`)

- **Dashboard** — Welcome view, daily stats, today's menu, reservations, AI suggestion, notifications, support contact, and a rating & comment section with average ratings
- **Reserve** (`/student/reserve`) — Meal-type dropdown filter (صبحانه / ناهار / شام), interactive Farsi (Jalali) calendar sidebar, food cards grid with portion selection dialog, and meal summary
- **AI Reserve** (`/student/ai-reserve`) — AI-powered meal recommendation
- **History** (`/student/history`) — Order history table/cards with status badges, detail dialog including rating & review for delivered orders
- **Payment** (`/student/payment`) — Wallet & payment management
- **Support** (`/student/support`) — Ticket-based support system with contact info
- **Help** (`/student/help`) — FAQ accordion (5 categories, ~14 questions), searchable error code reference (12 codes with severity badges), and quick-contact section

### Admin Panel (`/admin`)

- **Dashboard** — Stats overview, inventory alerts, support queue
- **Menu** (`/admin/menu`) — Food menu schedule management
- **Stats** (`/admin/stats`) — Analytics & reporting
- **Inventory** (`/admin/inventory`) — Stock tracking & alerts
- **Accounting** (`/admin/accounting`) — Financial overview
- **Rules** (`/admin/rules`) — System rules & constraints
- **Support** (`/admin/support`) — Support ticket management

### Other Pages

- **Landing** (`/`) — Hero, feature grid, call-to-action
- **Login** (`/login`) — Authentication with mock credentials, forgot-password dialog

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 + tw-animate-css |
| Components | shadcn/ui (Radix UI primitives) |
| Charts | Recharts |
| Calendar | react-day-picker 9 + date-fns 4 (faIR locale) |
| Icons | Lucide React |
| Font | Vazirmatn (Persian) |
| Toasts | Sonner |
| Theme | next-themes (light/dark) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm / bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Mock Credentials

| Role | Username | Password |
| --- | --- | --- |
| Admin | `admin` | `admin` |
| Student | any 5+ char username | any password |

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📂 Project Structure

```text
src/
├── public/                  # Static assets
└── src/
    ├── app/
    │   ├── layout.tsx       # Root layout (RTL, Vazirmatn font, theme)
    │   ├── page.tsx         # Landing page
    │   ├── globals.css      # Global styles
    │   ├── login/           # Login page + forgot password
    │   ├── admin/           # Admin panel (layout + 6 sub-pages)
    │   └── student/         # Student panel (layout + 6 sub-pages)
    ├── components/
    │   ├── ui/              # shadcn/ui components (20+)
    │   ├── theme-provider.tsx
    │   └── theme-toggle.tsx
    ├── hooks/
    │   └── use-mobile.ts    # Mobile detection hook
    └── lib/
        ├── mock-data.ts     # Mock data & helpers
        └── utils.ts         # Utility functions (cn)
```

## 🌐 Internationalization

The app is fully **RTL** with `lang="fa"` and `dir="rtl"`. The calendar uses the `faIR` locale from date-fns with Persian digit formatting and Jalali month captions.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.
