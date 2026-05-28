# ⚡ AI Cost Tracker

> **Stop overpaying for AI tools your team doesn't fully use.**  
> AI Cost Tracker is a free, open-source audit tool that analyzes your company's AI SaaS subscriptions and surfaces concrete, actionable savings recommendations — powered by a rule-based audit engine and Anthropic Claude AI summaries.

---

## 🚀 Live Demo

Try it at → **[ai-cost-tracker.vercel.app](https://ai-cost-tracker.vercel.app)**  
_(No sign-up required. Your data never leaves your browser until you opt in.)_

---

## 🧠 What It Does

Most startups and engineering teams are unknowingly throwing money at redundant AI subscriptions. AI Cost Tracker finds exactly where:

| Scenario | Example | Savings |
|---|---|---|
| **LLM Redundancy** | Paying for both ChatGPT & Claude | Up to 100% of one |
| **Tier Mismatch** | Enterprise plan for a 3-person team | 15–75% reduction |
| **Code Assistant Overlap** | Cursor + GitHub Copilot simultaneously | Eliminate one entirely |
| **Zombie Seats** | Inactive users on paid seats | Per-seat cost × dead seats |
| **Startup Credits** | High API spend not offset by cloud credits | Up to 20% via AWS/GCP programs |

The audit takes **under 2 minutes**, produces a personalized PDF-ready report, and generates a shareable link you can drop directly into a board meeting.

---

## ✨ Features

- 🔍 **Rule-based Audit Engine** — 10+ providers, 30+ cross-tool overlap rules
- 🤖 **AI-Powered Summaries** — Claude 3.5 Haiku writes a personalized analyst-grade summary for your specific stack
- 📊 **Benchmark Mode** — See how your AI spend per developer compares to industry averages (Seed / Growth / Enterprise stage)
- 🔗 **Shareable Reports** — Public `/report/[id]` page with dynamic Open Graph metadata for stakeholder sharing
- 📧 **Email Confirmation** — Transactional email via Resend with your full report on submit
- 💾 **Persistent Audits** — Supabase stores your audit result; reopen your report link anytime
- 🎭 **Demo Walkthrough** — Floating widget auto-fills a sample stack so you can explore instantly
- 🌗 **Dark / Light Mode** — System-aware, toggleable
- 📱 **Fully Responsive** — Mobile to 4K, works everywhere
- 🛡️ **Privacy First** — Results computed client-side; DB write is opt-in at form submission

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx                  # Landing page (Hero → Features → Audit Form → FAQ)
│   ├── dashboard/
│   │   └── page.tsx              # Post-audit results dashboard (reads from localStorage)
│   ├── report/
│   │   └── [id]/
│   │       ├── page.tsx          # SSR wrapper — fetches OG metadata from Supabase
│   │       └── ReportClient.tsx  # Client component — renders shared report
│   └── api/
│       ├── summary/route.ts      # POST — calls Anthropic Claude for AI summary
│       ├── leads/route.ts        # POST — saves lead + audit to Supabase
│       └── email/route.ts        # POST — sends confirmation email via Resend
│
├── components/
│   ├── AuditForm.tsx             # Multi-tool input form with dynamic rows
│   ├── BenchmarkCard.tsx         # Industry comparison widget
│   ├── DemoWalkthrough.tsx       # Floating demo auto-fill widget
│   ├── ToolBreakdown.tsx         # Savings table with per-tool recommendations
│   ├── HeroSection.tsx           # Landing hero + stats bar
│   ├── FeaturesGrid.tsx          # Feature cards grid
│   ├── AnimatedCountUp.tsx       # Smooth number animation for KPI cards
│   ├── FAQ.tsx                   # Accordion FAQ section
│   ├── Navbar.tsx                # Top nav with theme toggle
│   └── Footer.tsx                # Footer with links
│
└── lib/
    ├── auditEngine.ts            # 🔑 Core logic — all savings rules live here
    ├── benchmarkData.ts          # Industry benchmark data by company stage
    ├── supabase.ts               # Supabase client (anon key, client-safe)
    └── utils.ts                  # cn() helper, formatters
```

### Data Flow

```
User fills AuditForm
        │
        ▼
auditEngine.ts (client-side, instant)
        │  Computes savings per tool, cross-tool overlaps, benchmark percentile
        ▼
Results saved to localStorage
        │
        ▼
Redirect → /dashboard  (reads localStorage)
        │
        ├──► POST /api/summary  →  Anthropic Claude 3.5 Haiku
        │                          (fallback: template summary if API unavailable)
        │
        └──► On email submit:
             POST /api/leads    →  Supabase (leads + audits tables)
             POST /api/email    →  Resend (confirmation email)
             Returns shareable  →  /report/[id]
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **UI Primitives** | Radix UI |
| **Icons** | Lucide React |
| **AI Summaries** | Anthropic Claude 3.5 Haiku |
| **Database** | Supabase (PostgreSQL + RLS) |
| **Email** | Resend |
| **Testing** | Vitest |
| **Deployment** | Vercel |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- An [Anthropic](https://console.anthropic.com) API key
- A [Resend](https://resend.com) API key

### 1. Clone & Install

```bash
git clone https://github.com/your-org/ai-cost-tracker.git
cd ai-cost-tracker
npm install
```

### 2. Configure Environment Variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env
```

```env
# .env

# Anthropic — AI-generated personalized summaries
# Get yours at: https://console.anthropic.com/
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Supabase — lead capture and audit persistence
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJI...

# Resend — transactional confirmation emails
RESEND_API_KEY=re_xxxxx

# Base URL — used for shareable links and Open Graph tags
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note:** The audit engine runs entirely client-side. The app is **fully functional without any API keys** — you just won't get AI summaries, email confirmations, or persisted shareable links.

### 3. Set Up the Database

Run the SQL migration in your Supabase project's SQL editor:

```bash
# The migration file is at:
supabase/migrations/001_init.sql
```

This creates:
- **`leads`** table — email, company name, team size
- **`audits`** table — full JSON audit payload linked to a lead
- **Row Level Security (RLS)** policies — anon key can only INSERT; service role has full access; public can read audits by ID (for share links)

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the full app runs locally with hot reload.

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Tests live in `tests/` and use [Vitest](https://vitest.dev/).

---

## 🚀 Deploying to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env` in the Vercel dashboard
4. Set **Framework Preset** → `Next.js`
5. Deploy ✅

The `vercel.json` is pre-configured with correct routing rules.

---

## 🔑 Core Logic — The Audit Engine

The heart of the app lives in [`src/lib/auditEngine.ts`](src/lib/auditEngine.ts).

It processes a list of tools and applies a decision tree of rules:

```typescript
runAudit(tools: AuditTool[], teamSize: number): AuditResult
```

**Recommendation types:**

| Type | Description |
|---|---|
| `downgrade` | Cheaper tier covers your actual usage |
| `consolidation` | Two tools do the same job — drop one |
| `credits` | High spend qualifies for startup cloud credits |
| `optimal` | No action needed — spending is efficient |

**Cross-tool overlap rules** (examples):
- `ChatGPT` + `Claude` → flag LLM redundancy → eliminate one
- `Cursor` + `GitHub Copilot` → flag code assistant overlap → eliminate one  
- `Gemini` + `Cursor/Copilot` for engineering → flag → consolidate

### Adding a New Provider

1. Add the provider name and its plans to `AuditForm.tsx`
2. Add pricing data and logic to `auditEngine.ts` under the correct `else if` block
3. Add a benchmark entry to `benchmarkData.ts` if relevant

---

## 🗄️ Database Schema

```sql
-- Leads: one row per email submitted
CREATE TABLE leads (
  id          TEXT PRIMARY KEY,   -- nanoid
  email       TEXT NOT NULL,
  company     TEXT,
  team_size   INT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Audits: full audit payload, linked to a lead
CREATE TABLE audits (
  id                    TEXT PRIMARY KEY,   -- same as leads.id
  lead_email            TEXT NOT NULL,
  tools                 JSONB NOT NULL,
  total_current_spend   NUMERIC,
  total_monthly_savings NUMERIC,
  total_annual_savings  NUMERIC,
  ai_summary            TEXT,              -- cached Claude summary
  created_at            TIMESTAMPTZ DEFAULT now()
);
```

RLS is enabled. The anon key can only `INSERT` (form submission). Shareable `/report/[id]` pages use a public `SELECT` policy scoped to the audit's own ID.

---

## 🤝 Contributing

Pull requests are welcome!

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Lint: `npm run lint`
5. Test: `npm test`
6. Open a PR against `main`

Please keep the audit engine logic defensible with real pricing sources. If you update a price, note the source URL and date in a comment.

---

## 📄 License

MIT — free to use, modify, and self-host.

---

## 🙏 Acknowledgements

Built with [Next.js](https://nextjs.org/), [Supabase](https://supabase.com/), [Anthropic](https://anthropic.com/), [Resend](https://resend.com/), [Framer Motion](https://www.framer.com/motion/), and [Radix UI](https://www.radix-ui.com/).

---

<p align="center">
  Made with ☕ and a stubborn belief that startups shouldn't pay for AI seats nobody uses.
</p>
