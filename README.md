# Gustavo Colina — Portfolio

Personal portfolio and services site for Gustavo Colina (Suggus1899), Full-Stack Software Engineer. Built with Next.js 16 (App Router) and TypeScript.

Live at [gustavocolina.dev](https://gustavocolina.dev).

## Stack

- **Framework:** Next.js 16 (App Router, React Compiler enabled)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **i18n:** next-intl — `en`, `es`, `fr`, `it` (`es` default)
- **Theming:** next-themes (light/dark)
- **Animations:** Framer Motion
- **Contact form:** EmailJS (no backend)
- **Package manager:** pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build (also the verification step — no test runner) |
| `pnpm lint` | ESLint |

## Structure

- `src/app/[locale]/` — all pages, locale segment mandatory (`routing.ts`)
- `src/components/` — flat, one file per page section
- `src/data/` — static content (skills, experience, blog posts)
- `messages/{en,es,fr,it}.json` — i18n copy, keys must stay in sync across all four
- `src/config/constants.ts` — `SITE_URL`, `EMAIL`, `WHATSAPP_NUMBER`

## Deployment

Deployed on Vercel. `NEXT_PUBLIC_SITE_URL` controls canonical URLs and OG metadata.
