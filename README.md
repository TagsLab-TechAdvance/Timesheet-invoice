# Novara HR — Phase 1 MVP (Core HR)

A UI-only, click-through prototype of the **Phase 1 Core HR** module for the
Belgian HR/payroll platform project. Built with **React + TypeScript + Vite**,
using mock JSON data — no backend, database or authentication is wired up yet.

## What this demonstrates

**Phase 1 scope: Core HR foundation only.** Time & leave, payroll and Belgian
compliance are intentionally out of scope — they are Phases 2–6.

Screens included:

- **Login** — company sign-in screen (any credentials work, it's a prototype)
- **Dashboard** — headcount stats, recent employees, activity feed
- **Employees** — searchable, filterable employee directory
- **Employee profile** — tabs for Personal, Employment, Documents, Emergency Contact
- **Add employee** — multi-step wizard: Personal → Employment → Documents → Review
- **Departments** — department cards with manager and member avatars
- **Onboarding** — progress tracking for employees currently being onboarded
- **Documents** — company-wide document register with verification status
- **Settings** — company profile, users & roles, permissions

All data lives in `src/data/mockData.ts` — edit it to change names, departments
or onboarding cases used throughout the demo.

## Added: Timesheets and automatic invoicing

Flow: **Employee fills timesheet -> manager approves -> invoice is created automatically.**

- **Timesheets**: monthly hour entry per employee (flags weeks above the 38-hour Belgian standard week)
- **Approvals**: manager approves or rejects; approving creates the invoice instantly
- **Invoices**: list with totals, and a Belgian-style invoice (hours x rate, 21% VAT, due date, IBAN, structured communication +++XXX/XXXX/XXXXX+++)
- **Settings > Clients & billing**: clients, VAT numbers, payment terms, hourly rates

Example: 20 hours x EUR 50 = EUR 1.000,00 + 21% VAT (EUR 210,00) = EUR 1.210,00.
Demo data lives in `src/data/billingData.ts`; state lives in `src/store/TimeBillingContext.tsx` and is replaced by API calls once the backend exists.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a static production bundle:

```bash
npm run build
npm run preview
```

## Suggested demo flow

Login → Dashboard → Employees → open an employee → Documents tab → Add employee
(walk through all 4 steps) → Onboarding.

Frame it to stakeholders as:

> "This is Phase 1 Core HR. We are not implementing payroll yet. The goal is to
> establish company, employee, department, document and onboarding management —
> the foundation that Time, Payroll, Employee Self-Service and Belgian
> compliance will be built on in later phases."

## Next steps (not in this build)

- Wire up a real backend (Node.js/Express + PostgreSQL is a natural fit given
  the stack already used here)
- Add authentication (JWT) and role-based access (Super Admin / HR Admin / Manager)
- Replace `src/data/mockData.ts` with real API calls
- Phase 2+: Time & attendance, leave management, payroll, Belgian compliance,
  SAP/Workday integrations, AI assistant features
