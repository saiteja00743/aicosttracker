# Credex AI Spend Audit Platform

Credex AI is a premium B2B SaaS landing page and dashboard designed to help startup founders, CFOs, and engineering managers identify and eliminate wasted spend on enterprise AI tools (like ChatGPT Plus, Anthropic API, GitHub Copilot, etc.). 

This application functions as a highly-polished lead generation engine, utilizing an interactive "AI Spend Audit" form to immediately calculate and display ROI to prospective clients.

## Features
- **Dynamic Spend Audit Engine:** A rule-based engine that evaluates user inputs (Tools, Seats, Spend) against real-world pricing data to recommend downgrades, consolidations, or infrastructure credit utilization.
- **Premium UI/UX:** Built with a "Silicon Valley" startup aesthetic. Features dark mode, glassmorphism, glowing radial gradients, and scroll-triggered micro-animations.
- **Real-time Form Persistence:** Form state is automatically synced to `localStorage`, ensuring users never lose their data before receiving their audit.
- **Dynamic Results Dashboard:** A comprehensive, screenshot-worthy results page that dynamically generates savings metrics, visual utilization bars, and a contextual AI summary based on the exact input stack.
- **Tailwind CSS v4 Integration:** Built using the bleeding-edge Tailwind v4 architecture (using `@theme` directly in CSS) for minimal configuration and maximum performance.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Documentation
To understand the business rationale and architectural decisions behind this product, please review the following documents:
- `ARCHITECTURE.md`: Details the codebase structure and future migration path.
- `ECONOMICS.md`: Explains the unit economics, ROI, and path to $1M ARR.
- `GTM.md`: Outlines the Go-To-Market strategy and PLG motion.
- `USER_INTERVIEWS.md`: Contains insights from target buyer validation calls.
- `PRICING_DATA.md`: The single source of truth for the audit engine's logic.
