# GreenLedger Landing Page

Production-ready one-page landing website for GreenLedger, a fintech B2B startup connecting African SMEs with green finance.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  (marketing)/          # Landing pages, form routes
  api/                  # Future API routes (form handlers, webhooks)
  layout.tsx
  globals.css

components/
  landing/              # Section components (Hero, Problem, Solution, etc.)
  ui/                   # Reusable primitives (Button, Card, Modal, etc.)

lib/
  animations.ts         # Framer Motion variants
  content.ts            # Config-driven section content
  forms.ts              # Form submission placeholders (TODO: integrate backend)
```

## Future Extensions

To add dashboard, partner portal, or admin:

- **Dashboard**: `app/(dashboard)/layout.tsx` + `app/(dashboard)/page.tsx` — use a separate layout with auth/sidebar
- **Partner portal**: `app/(partner)/` — partner-specific routes
- **Admin**: `app/(admin)/` — admin backend routes

Form handlers in `lib/forms.ts` are placeholders. Wire to your backend, CRM, or email service when ready.

## Build

```bash
npm run build
npm start
```
