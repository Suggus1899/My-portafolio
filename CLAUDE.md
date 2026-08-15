# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # dev server on localhost:3000
pnpm build    # production build (use as verification — no test runner)
pnpm lint     # ESLint
```

No test framework is installed. Verification = `pnpm lint && pnpm build`.

## Architecture

Next.js 16 App Router, `src/` layout, React Compiler enabled.

**Routing:** All pages live under `src/app/[locale]/`. The locale segment is mandatory — `routing.ts` defines `["en", "es", "fr", "it"]` with `es` as default. The middleware at `src/middleware.ts` handles locale redirection.

**i18n:** next-intl. Translation files are in `messages/{en,es,fr,it}.json`. On the server use `getTranslations()`; on the client use `useTranslations()`. When adding new copy, add the key to **all four** locale files.

**Components:** Flat in `src/components/`. Each file is a single section component (e.g. `HeroSection.tsx`, `ProjectsSection.tsx`). The page at `src/app/[locale]/page.tsx` composes them in order.

**Data:** Static data lives in `src/data/` (skills, experience, blog posts, stats). `src/repos.json` holds GitHub repo data fetched at build time.

**Static pages:** `/blog`, `/blog/[slug]`, `/projects`, `/services`, `/now` — all under `[locale]/`.

**SEO:** Each page defines its own `generateMetadata` inline (OG + Twitter tags included). `src/lib/seo.ts` is empty — helpers were removed. `SchemaOrg.tsx` injects JSON-LD as a plain server component (no `next/script`). `NEXT_PUBLIC_SITE_URL` env var controls canonical URLs; fallback is `https://gustavocolina.dev` via `SITE_URL` in `src/config/constants.ts`.

**Constants:** `src/config/constants.ts` exports `SITE_URL`, `EMAIL`, and `WHATSAPP_NUMBER`. Use these instead of hardcoding.

**Theming:** `next-themes` with `attribute="class"`. Dark mode uses `dark:` Tailwind variants. `ThemeProvider` wraps the app in the root layout.

**Contact form:** Uses `@emailjs/browser` — no backend required.

**Fonts:** Inter (`--font-inter`) + Space Grotesk (`--font-space`) loaded via `next/font/google`, applied on `<body>`.
