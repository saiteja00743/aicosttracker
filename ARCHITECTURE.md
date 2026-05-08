# Credex AI Architecture

## Tech Stack
- **Framework:** Next.js 16.2.5 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Using `@theme` architecture)
- **UI Components:** Framer Motion (animations), Radix UI (accessible primitives), Lucide React (icons).

## Directory Structure
```
src/
├── app/
│   ├── globals.css         # Tailwind v4 configuration and global variables
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Landing Page (Hero, Stats, Features, Form)
│   └── dashboard/
│       └── page.tsx        # Dynamic Audit Results Dashboard
├── components/
│   ├── Navbar.tsx          # Main navigation
│   ├── HeroSection.tsx     # Hero with animated AuditPreviewCard
│   ├── FeaturesGrid.tsx    # Responsive features showcase
│   ├── AuditForm.tsx       # Dynamic multi-step input form (stores to LocalStorage)
│   ├── ToolBreakdown.tsx   # Results table for the dashboard
│   └── AnimatedCountUp.tsx # Number animation utility
└── lib/
    ├── utils.ts            # Tailwind merge and utility functions
    ├── auditEngine.ts      # Core business logic for spend optimization
    └── pricing.ts          # Centralized pricing data source
```

## State Management & Data Flow
Due to the MVP constraints, we are currently utilizing a localized data flow:
1. User inputs AI stack details into `AuditForm.tsx`.
2. Form validates inputs and stores the JSON payload in `localStorage` (`credex_audit_form`).
3. User is redirected to `/dashboard`.
4. `dashboard/page.tsx` reads from `localStorage` and passes the payload to `auditEngine.ts`.
5. The rule-based engine generates personalized recommendations, categorizing them by type (`downgrade`, `consolidation`, `credits`, `optimal`).
6. The dashboard renders dynamic metrics, an AI summary, and the tool breakdown table.

## Future Production Evolution
To transition this from a local MVP to a fully scalable product:
1. **Database:** Integrate Supabase/PostgreSQL to persist audit records uniquely.
2. **Backend API:** Migrate the `auditEngine.ts` logic to a Next.js API Route (`/api/audit`) to ensure proprietary logic is not exposed to the client.
3. **AI Generation:** Integrate Anthropic API (`claude-3-haiku`) inside the API route to generate truly dynamic contextual summaries based on the user's specific stack.
4. **Emails:** Integrate Resend to shoot the generated unique public URL to the user's provided work email.
