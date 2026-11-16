# Savannah Precision Loan System

**Live site:** https://wanjikuk60.github.io/savannah-dignity-forge/

An interactive demo of a fairer loan-decision framework for a fictional SACCO, Ujima SACCO, serving informal market vendors in East Africa. Legacy credit models deny market vendors far more often than salaried workers, because they expect monthly payslips. Savannah recalculates loans around harvests and mobile-money activity, and adds bias audits, dignity checks and human review.

> All applicants, feeds and figures are **sample data** for demonstration. Nothing here is a real person, lender or live system.

## What's inside

| Page                           | What it shows                                                                            |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| **Home**                       | The problem: a bias snapshot of the legacy model, and links to each phase                |
| **Applicants**                 | Run sample vendor profiles through the legacy model and the Savannah model side by side  |
| **Phase 1 · Diagnostic**       | Bias audit, OCEAN checks, and the MAP harvest-aware repayment engine                     |
| **Phase 2 · Tsavo Fluency**    | 4D Delegation Matrix, prompt-engineering hub, and a sample Agricultural Observatory card |
| **Phase 3 · Ethical Savannah** | ETHOS transforms, TRACK forensic audit, OASIS data sovereignty, and the Kill Switch      |
| **Phase 4 · Agent Savannah**   | Scout, Guardian and Hunter agents with a simulated GUARD/CYCLE oversight feed            |
| **About**                      | How the framework fits together                                                          |

## Tech stack

React 19 · TypeScript · TanStack Start and Router · Tailwind CSS 4 · Radix UI (via shadcn/ui) · Recharts. Built with [Lovable](https://lovable.dev).

## Run it locally

This project uses [Bun](https://bun.sh); its lockfile (`bun.lock`) pins the exact versions.

```bash
git clone https://github.com/WanjikuK60/savannah-dignity-forge.git
cd savannah-dignity-forge
bun install
bun run dev
```

Then open http://localhost:8080.

| Command                        | What it does                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------- |
| `bun run dev`                  | Start the dev server                                                            |
| `bun run build`                | Production build with the Nitro (Cloudflare) server bundle that Lovable deploys |
| `GITHUB_PAGES=1 bun run build` | Static build: every page pre-rendered to HTML under `/savannah-dignity-forge/`  |
| `bun run lint`                 | ESLint and Prettier checks                                                      |
| `bun run format`               | Format all files with Prettier                                                  |

## Deployment

Every push to `main` runs [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). It builds the static version and publishes it to GitHub Pages.

## Project structure

```
src/
  routes/                 One file per page (TanStack Router file-based routes)
  components/savannah/    The Savannah screens: phases, applicants, header
  components/ui/          shadcn/ui building blocks used by those screens
  lib/savannah-data.ts    Sample applicants, feeds and figures
  styles.css              Theme and Tailwind setup
```
