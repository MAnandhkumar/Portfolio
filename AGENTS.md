# Portfolio Development Guidelines & Standards

This document establishes the architecture rules, coding standards, and internationalization principles for this repository. All development tools and coding agents must follow these guidelines.

---

## 1. Technical Stack & Run Context

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS (v4)
- **Dev Compiler**: Forced to **Webpack** (`next dev --webpack`). **DO NOT** use Turbopack in development, as the repository path containing whitespaces (`DARK WORLD`) causes Rust compilation cache errors (`Unable to write SST file / os error 3`).
- **ESLint/Prettier**: Prettier is configured in [.prettierrc](file:///c:/DARK%20WORLD/Portfolio/.prettierrc) and must be run before commits. ESLint checks are enabled.

---

## 2. Directory & Architecture Conventions

- **Aliases**: Use `@/*` alias for imports mapping to `src/*`.
- **Locale Routing**:
  - Main routes are placed inside the dynamic directory `src/app/[locale]/`.
  - The base landing page is `src/app/[locale]/page.tsx` (a **Server Component** that fetches dynamic translations).
  - Component layouts and state (including scroll-spy and Navbar links) are handled by the client-side [PortfolioWrapper.tsx](file:///c:/DARK%20WORLD/Portfolio/src/components/PortfolioWrapper.tsx).
- **Component Placement**:
  - Reusable layout components go to `src/components/layout/`.
  - Portfolio section page components go to `src/components/sections/`.
  - Custom data interfaces go to [portfolio.ts](file:///c:/DARK%20WORLD/Portfolio/src/types/portfolio.ts).

---

## 3. Boundary Routing (Next.js 16)

- **Proxy Spec**: Next.js 16 deprecates the `middleware.ts` naming convention. All request boundary redirections must be implemented in [proxy.ts](file:///c:/DARK%20WORLD/Portfolio/src/proxy.ts) using the export naming:
  ```typescript
  export function proxy(request: NextRequest) { ... }
  ```

---

## 4. Internationalization (i18n) Rules

- **Locales**: Supported languages are English (`en`) and Tamil (`ta`).
- **TAMIL TRANSLATION STANDARD**:
  - **Rule**: All Tamil translations in [ta.json](file:///c:/DARK%20WORLD/Portfolio/src/dictionaries/ta.json) **MUST be written in local normal/spoken Tamil (colloquial Tamil)**.
  - **Strictly Prohibited**: **DO NOT** use formal, grammatical, or academic/literary Tamil (e.g., avoid pure formal words that sound unnatural on a technical developer profile).
  - **Developer Transliterations**: Use transliterated colloquial words for tech and workspace jargon (e.g., ஹாய், எக்ஸ்பீரியன்ஸ், பிராஜெக்ட், இஷ்யூ, பிசினஸ், சொல்யூஷன்ஸ், ப்ரொஃபைல், டீம்).

---

## 5. Git & Verification Standards

- **Husky Git Hooks**:
  - **Pre-commit**: Runs `lint-staged` to auto-format staged files with Prettier and execute ESLint auto-fixes before committing.
  - **Pre-push**: Executes `npm run typecheck && npm run test run` to guarantee that no broken typescript types or failed unit tests are pushed to the remote branch.

---

## 6. Testing & Quality Assurance Standards

- **Frameworks**: Jest and React Testing Library (`@testing-library/react`).
- **Test File Location**: Co-locate test files with the components/utils they test (e.g., `Component.test.tsx` next to `Component.tsx`).
- **Coverage Threshold Targets**:
  - Line and Statement Coverage must be kept **> 95%**.
  - Branch and Function Coverage must be kept **> 90%**.
- **Test Command Discipline**:
  - To avoid polluting the terminal with enormous text tables, agents should primarily use `npm run test:cov` (which is configured via `jest.config.ts` to use `"text-summary"` reporter). 
  - For detailed missing-branch traces, run `npx jest --coverage --coverageReporters="text"`.
- **Edge Cases & Branch Coverage**: All complex UI logic (e.g., dark mode toggles, internationalized language switches, conditional classes, fallback defaults) MUST be tested with explicit DOM interaction and mock configurations.
