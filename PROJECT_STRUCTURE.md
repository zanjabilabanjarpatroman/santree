# 📁 Struktur Project Santree

Dokumentasi lengkap struktur folder dan file dalam project Santree.

## 🗂️ Root Directory

```
santree/
├── .next/                    # Build output Next.js (gitignore)
├── .supabase/                # Supabase local config (gitignore)
├── app/                      # Next.js 14 App Router
├── components/               # React components
├── lib/                      # Utility functions & configs
├── public/                   # Static files
├── templates/                # Template kartu quest, buku petualangan
├── supabase/                 # Database migrations & schemas
├── docs/                     # Dokumentasi tambahan
├── .env.local                # Environment variables (gitignore)
├── .gitignore
├── CONTRIBUTING.md
├── DATABASE_SCHEMA.md
├── LICENSE
├── README.md
├── PROJECT_STRUCTURE.md      # File ini
├── index.html                # Landing page standalone
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 📂 `/app` — Next.js App Router

```
app/
├── (auth)/                   # Auth routes group
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── layout.tsx
│
├── (dashboard)/              # Dashboard routes (protected)
│   ├── parent/               # Dashboard orang tua
│   │   ├── children/         # Manage anak
│   │   ├── quests/           # Quest library
│   │   └── page.tsx
│   │
│   ├── ustadz/               # Dashboard ustadz
│   │   ├── classes/          # Manage kelas
│   │   ├── students/         # Manage murid
│   │   └── page.tsx
│   │
│   └── layout.tsx            # Dashboard layout
│
├── api/                      # API routes
│   ├── quests/
│   │   ├── route.ts          # GET all quests
│   │   └── [id]/
│   │       └── route.ts      # GET/UPDATE/DELETE quest by ID
│   │
│   ├── children/
│   │   ├── route.ts
│   │   └── [id]/
│   │       ├── route.ts
│   │       └── progress/
│   │           └── route.ts
│   │
│   ├── verify/
│   │   └── route.ts          # Verify quest completion
│   │
│   └── webhooks/
│       └── stripe/
│           └── route.ts      # Stripe webhook (untuk subscription)
│
├── globals.css               # Global styles + Tailwind
├── layout.tsx                # Root layout
├── page.tsx                  # Homepage (landing)
└── not-found.tsx             # 404 page
```

---

## 🧩 `/components` — React Components

```
components/
├── ui/                       # Base UI components (shadcn/ui style)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Dialog.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   └── Toast.tsx
│
├── layout/                   # Layout components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   └── DashboardShell.tsx
│
├── quest/                    # Quest-related components
│   ├── QuestCard.tsx
│   ├── QuestList.tsx
│   ├── QuestDetail.tsx
│   ├── QuestVerificationModal.tsx
│   └── QuestCategoryFilter.tsx
│
├── child/                    # Child-related components
│   ├── ChildCard.tsx
│   ├── ChildProfileHeader.tsx
│   ├── ChildProgressChart.tsx
│   ├── ChildLevelBadge.tsx
│   └── ChildStreakCounter.tsx
│
├── tpq/                      # TPQ-related components
│   ├── ClassCard.tsx
│   ├── StudentList.tsx
│   ├── LeaderboardTable.tsx
│   └── TPQStats.tsx
│
└── shared/                   # Shared/common components
    ├── Avatar.tsx
    ├── LoadingSpinner.tsx
    ├── EmptyState.tsx
    ├── ErrorBoundary.tsx
    └── Pagination.tsx
```

---

## 🛠️ `/lib` — Utilities & Configs

```
lib/
├── supabase/
│   ├── client.ts             # Supabase client (browser)
│   ├── server.ts             # Supabase client (server)
│   ├── middleware.ts         # Auth middleware
│   └── types.ts              # Generated types dari Supabase
│
├── utils/
│   ├── cn.ts                 # classNames merger (tailwind-merge)
│   ├── date.ts               # Date formatting utils
│   ├── exp.ts                # EXP calculation logic
│   ├── level.ts              # Level & tier calculation
│   └── validation.ts         # Form validation schemas (zod)
│
├── hooks/
│   ├── useAuth.ts            # Auth hook
│   ├── useChildren.ts        # Fetch children data
│   ├── useQuests.ts          # Fetch quests data
│   ├── useVerification.ts    # Quest verification logic
│   └── useMediaUpload.ts     # Upload foto/voice memo
│
├── constants/
│   ├── levels.ts             # Level tiers & requirements
│   ├── categories.ts         # Quest categories
│   └── routes.ts             # App routes constants
│
└── stripe/
    └── client.ts             # Stripe client config (untuk subscription)
```

---

## 🎨 `/public` — Static Assets

```
public/
├── images/
│   ├── logo.svg
│   ├── tree-illustration.svg
│   ├── levels/               # Ilustrasi untuk setiap tier
│   │   ├── batu.png
│   │   ├── bronze.png
│   │   ├── silver.png
│   │   └── ...
│   │
│   └── badges/               # Badge icons
│       ├── streak-7.png
│       ├── first-quest.png
│       └── ...
│
├── sounds/                   # Sound effects (opsional)
│   ├── level-up.mp3
│   ├── quest-complete.mp3
│   └── notification.mp3
│
└── fonts/                    # Custom fonts jika ada
```

---

## 🗃️ `/supabase` — Database

```
supabase/
├── migrations/               # Database migrations
│   ├── 00001_create_profiles.sql
│   ├── 00002_create_children.sql
│   ├── 00003_create_quests.sql
│   ├── 00004_create_child_quests.sql
│   ├── 00005_create_tpq_tables.sql
│   └── ...
│
├── seed_data.sql             # Initial data (quest library, categories)
├── policies.sql              # Row Level Security policies
└── functions/                # Database functions
    ├── calculate_level.sql
    └── update_streak.sql
```

---

## 📄 `/templates` — Print Templates

```
templates/
├── quest-card-template.html  # Template kartu quest
├── quest-book-template.html  # Template buku petualangan
├── certificate-template.html # Template sertifikat (level 10)
└── sticker-sheet.html        # Template lembaran stiker
```

---

## 📚 `/docs` — Dokumentasi Tambahan

```
docs/
├── API.md                    # API documentation
├── DEPLOYMENT.md             # Deployment guide
├── DEVELOPMENT.md            # Setup development environment
├── MONETIZATION.md           # Business model & pricing
└── ROADMAP.md                # Product roadmap
```

---

## 📦 Config Files

### `package.json`
```json
{
  "name": "santree",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "supabase gen types typescript --local > lib/supabase/types.ts",
    "db:reset": "supabase db reset",
    "db:seed": "psql $DATABASE_URL -f supabase/seed_data.sql"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.38.0",
    "@supabase/auth-helpers-nextjs": "^0.8.0",
    "tailwindcss": "^3.3.0",
    "zod": "^3.22.0",
    "date-fns": "^2.30.0",
    "recharts": "^2.10.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "supabase": "^1.120.0"
  }
}
```

### `next.config.js`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['YOUR_SUPABASE_PROJECT.supabase.co'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
```

### `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-deep': '#1a4d2e',
        'green': '#25a355',
        'green-mid': '#3dc971',
        'green-light': '#e8f7ef',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
```

### `.env.local` (example)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe (untuk subscription)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Development Workflow

### 1. Install dependencies
```bash
npm install
```

### 2. Setup Supabase local
```bash
npx supabase init
npx supabase start
```

### 3. Run migrations
```bash
npx supabase db reset
```

### 4. Generate types
```bash
npm run db:generate
```

### 5. Run dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📤 Deployment

### Vercel (Recommended)
1. Push ke GitHub
2. Import repo di Vercel
3. Set environment variables
4. Deploy!

### Supabase
1. Create project di Supabase
2. Run migrations via Supabase CLI
3. Update `.env.local` dengan production keys

---

**Struktur ini siap untuk MVP dan scalable untuk fitur-fitur berikutnya!** 🌳
