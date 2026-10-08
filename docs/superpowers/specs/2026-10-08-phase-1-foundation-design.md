# Phase 1: Foundation & Design System

## Overview
This document specifies Phase 1 of the Travel Booking project. The goal is to initialize a Next.js App Router project in the root directory, configure the baseline theme to visually match the existing half-cooked frontend, and port the core UI components using `shadcn/ui` as the accessible foundation.

## 1. Architecture & Setup
- **Framework**: Next.js App Router (latest).
- **Language**: TypeScript.
- **Styling**: Tailwind CSS.
- **Package Manager**: `bun` (and `bunx` for CLI tools).
- **Directory**: The Next.js project will be initialized at the root: `/projects/travel-booking-red`. The old code is in `/projects/travel-booking-red/frontend` and will be used purely as a reference.

### 1.1 Theme Configuration
- `shadcn/ui` will be initialized.
- Global CSS variables and Tailwind configuration from the old project will be extracted and injected into the new project's configuration to ensure identical visual styling (colors, fonts, radii).

## 2. Component Porting Strategy

The core UI components from the old project will be ported to the new `src/components/ui` directory. 

### 2.1 Shadcn/ui Replacements
For standard components, we will install the `shadcn/ui` version to guarantee accessibility, focus management, and responsive behavior, then style them to match the old UI.
- `Accordion`
- `Badge`
- `Breadcrumb`
- `Button`
- `Form` (using `react-hook-form` + `zod` as is standard with shadcn)
- `Modal` (using shadcn `Dialog`)
- `Pagination`
- `Table`

**Styling Process:** The visual Tailwind classes from the old custom components will be mapped onto the new `shadcn` components.

### 2.2 Manual Porting
Custom UI elements that do not have a direct `shadcn` equivalent will be ported manually.
- `EmptyState`
- `ImageGallery`
- `QuoteSummary`

**Responsive Verification:** During the manual port, each component will be reviewed and updated to ensure proper mobile, tablet, and desktop scaling using Tailwind breakpoints.
