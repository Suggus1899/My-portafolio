# AGENTS.md

## Project Overview

Portfolio site built with Next.js (App Router) + TypeScript, managed with pnpm.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Package Manager:** pnpm
- **i18n:** next-intl
- **Theming:** next-themes
- **Styling:** Tailwind CSS v4
- **Animations:** framer-motion
- **Icons:** lucide-react, react-icons
- **Compiler:** babel-plugin-react-compiler (reactCompiler enabled in next.config.ts)

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Testing

No test runner detected. There is no `test` script in `package.json` and no test framework installed.

> SDD note: Strict TDD Mode will be OFF. Verification phases will rely on `pnpm build` and `pnpm lint` until a test framework is added.

## Key files

- **Constants:** `src/config/constants.ts` — `SITE_URL`, `EMAIL`, `WHATSAPP_NUMBER`. Use these, never hardcode.
- **i18n copy:** `messages/{en,es,fr,it}.json`. Always update all four locales when changing copy.
- **SEO:** Each page defines `generateMetadata` inline. `src/lib/seo.ts` is intentionally empty. `SchemaOrg.tsx` is a plain server component.
- **pnpm workspace:** `pnpm-workspace.yaml` has `allowBuilds: true` for `@parcel/watcher`, `@swc/core`, `sharp`, `unrs-resolver` — required for the build to run.

## Conventions

- **Commits:** Conventional Commits format (e.g. `feat:`, `fix:`, `chore:`, `docs:`).
- **No AI attribution:** Never add `Co-Authored-By` or AI-generated-by trailers to commit messages.
- **Next.js config:** `next.config.ts` (TypeScript). App Router with `src/` directory layout.
- **i18n:** next-intl configured via `./src/i18n/request.ts`.

## SDD (Spec-Driven Development)

Run `/sdd-init` with cwd set to this repository.

- **Stack:** Next.js (App Router) + pnpm + TypeScript
- **Testing:** none detected
- **Strict TDD Mode:** off (no test runner)
