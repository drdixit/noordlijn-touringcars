# Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the Next.js project, configure the identical theme, and port the foundational UI components.

**Architecture:** Create a Next.js App Router workspace, initialize shadcn/ui, merge in the old `globals.css` theme variables, and recreate each UI component (either via shadcn or manual port) to match the reference frontend exactly.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, bun

**Spec:** docs/superpowers/specs/2026-10-08-phase-1-foundation-design.md

## Global Constraints
- **Package Manager:** ALWAYS use `bun` (and `bunx`).
- **Commits:** Always commit after each task, do NOT push.
- **State:** Update `/docs/STATE.md` after significant edits.
- **Execution:** NEVER run the application server yourself; ask the user.

## Review Focus
- **Mobile scaling on custom components:** `QuoteSummary` breaking on narrow screens.
- **Theme mismatch:** CSS variables applied incorrectly causing wrong brand colors.
- **Hydration mismatches:** Caused by improperly ported dynamic components.

---

### Task 1: Next.js Initialization & Cleanup

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `src/app/page.tsx`
- Modify: `docs/STATE.md`

**Interfaces:**
- Produces: Clean, runnable Next.js foundation in the root directory.

- [ ] **Step 1: Initialize Next.js**
Run `bunx create-next-app@latest temp-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-bun`.
Move all files from `temp-app` to the root directory (including dotfiles) and remove `temp-app`.

- [ ] **Step 2: Clean up boilerplate**
Replace `src/app/page.tsx` with a simple functional component returning `<main><h1>Home</h1></main>`.
Delete `src/app/globals.css` default content (keep the file empty for the next task).

- [ ] **Step 3: Update STATE and Commit**
Update `docs/STATE.md` to reflect Next.js initialization.
```bash
git add .
git commit -m "chore: initialize Next.js app in root"
```

### Task 2: Theme & Shadcn Configuration

**Files:**
- Modify: `src/app/globals.css`, `tailwind.config.ts`, `components.json`

**Interfaces:**
- Consumes: Reference styles from `/frontend/src/globals.css` and `/frontend/tailwind.config.js`
- Produces: The exact identical design system variables in the new project.

- [ ] **Step 1: Initialize shadcn/ui**
Run `bunx --bun shadcn-ui@latest init` (Select Default style, Slate color, css variables: yes).

- [ ] **Step 2: Port CSS Variables**
Copy the `:root` and `.dark` variables from `/frontend/src/globals.css` into `src/app/globals.css`. Keep the Tailwind directives `@tailwind base; @tailwind components; @tailwind utilities;`.

- [ ] **Step 3: Port Tailwind Config**
Merge the `theme.extend.colors` and `theme.extend.fontFamily` from `/frontend/tailwind.config.js` into `tailwind.config.ts`. 

- [ ] **Step 4: Commit**
```bash
git add src/app/globals.css tailwind.config.ts components.json
git commit -m "style: configure global theme and shadcn"
```

### Task 3: Port Standard UI Components (Shadcn Base)

**Files:**
- Create: `src/components/ui/button.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/dialog.tsx` (Modal), `src/components/ui/accordion.tsx`, `src/components/ui/breadcrumb.tsx`, `src/components/ui/pagination.tsx`, `src/components/ui/table.tsx`, `src/components/ui/form.tsx`, `src/components/ui/label.tsx`, `src/components/ui/input.tsx`

**Interfaces:**
- Produces: Fully accessible UI primitives ready for use in features.

- [ ] **Step 1: Add Shadcn Components**
Run `bunx --bun shadcn-ui@latest add button badge dialog accordion breadcrumb pagination table form label input`

- [ ] **Step 2: Apply Custom Styling (Button & Badge)**
Read `/frontend/src/components/ui/Button.tsx` and `/frontend/src/components/ui/Badge.tsx`. Update the `cva` variants in `src/components/ui/button.tsx` and `src/components/ui/badge.tsx` to include the exact padding, rounding, and color classes used in the old components.

- [ ] **Step 3: Rename Dialog to Modal (Optional Alias)**
Create `src/components/ui/modal.tsx` that wraps the Shadcn `Dialog` components to provide the exact same prop interface as the old `/frontend/src/components/ui/Modal.tsx` (e.g., `isOpen`, `onClose`, `title`, `children`).

- [ ] **Step 4: Commit**
```bash
git add src/components/ui/
git commit -m "feat: port standard UI components via shadcn"
```

### Task 4: Port Custom UI Components (Manual)

**Files:**
- Create: `src/components/ui/empty-state.tsx`, `src/components/ui/image-gallery.tsx`, `src/components/ui/quote-summary.tsx`

**Interfaces:**
- Produces: The custom components that shadcn doesn't provide.

- [ ] **Step 1: Port EmptyState**
Copy the logic and Tailwind classes from `/frontend/src/components/ui/EmptyState.tsx` to `src/components/ui/empty-state.tsx`. Ensure responsive breakpoints (`sm:`, `md:`) are preserved.

- [ ] **Step 2: Port ImageGallery**
Copy the logic from `/frontend/src/components/ui/ImageGallery.tsx`. If it uses `next/image`, ensure `next.config.mjs` allows the necessary domains.

- [ ] **Step 3: Port QuoteSummary**
Copy the logic from `/frontend/src/components/ui/QuoteSummary.tsx`. Verify the grid layout scales down properly on mobile.

- [ ] **Step 4: Update STATE and Commit**
Update `docs/STATE.md` to mark Phase 1 as complete.
```bash
git add src/components/ui/ docs/STATE.md
git commit -m "feat: port custom UI components"
```
