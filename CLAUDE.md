# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React-based live streaming platform for church services ("Holy Week Live"), generated from a Figma design. The application features live video streaming, event scheduling, prayer requests, donations, and community engagement features.

## Development Commands

- `npm i` - Install dependencies
- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production

## Architecture

### Routing
Uses **React Router v7** with `createBrowserRouter`. Routes are defined in `src/app/routes.tsx`:
- `/` - Home page (live stream)
- `/schedule` - Event schedule
- `/services` - Past services archive
- `/about` - About page

The `Layout` component wraps all pages with a header (navigation) and footer.

### Component Structure
- **Pages**: `src/app/pages/` - Route-level components (Home, Schedule, Services, About, NotFound)
- **Feature Components**: `src/app/components/` - Domain-specific components like VideoPlayer, LiveChat, EventCard, CountdownTimer, PrayerRequest, DonationCard, etc.
- **UI Components**: `src/app/components/ui/` - Reusable shadcn/ui components based on Radix UI primitives

### Styling
- **Tailwind CSS v4** with the new Vite plugin (`@tailwindcss/vite`)
- **Custom theme**: Defined in `src/styles/theme.css` using CSS custom properties (light/dark mode support)
- **Utilities**: `cn()` function in `src/app/components/ui/utils.ts` combines clsx and tailwind-merge for conditional classes
- **Animations**: Uses `motion` (Framer Motion) for component animations

### UI Component Pattern
The `ui/` components follow the **shadcn/ui** pattern:
- Built on Radix UI primitives for accessibility
- Use `class-variance-authority` (cva) for variant-based styling
- Support `asChild` prop for composition via Radix's `Slot` component
- Example: Button supports variants like `default`, `ghost`, `outline`, and sizes `sm`, `default`, `lg`, `icon`

### Path Aliases
The `@` alias maps to `./src` directory (configured in `vite.config.ts`).

## Key Technologies
- **React 18.3.1** with Vite
- **React Router v7** - Data-first routing with createBrowserRouter
- **Radix UI** - Headless component primitives
- **Tailwind CSS v4** - Utility-first CSS
- **motion** - Animation library
- **Material UI (@mui)** - Some icon components and styled components

## Specialized Subagents

This project includes specialized subagents in `.claude/subagents/` for focused tasks:

| Subagent | Purpose |
|----------|---------|
| `component-builder.md` | Creates reusable feature components following shadcn/ui + Motion patterns |
| `page-creator.md` | Generates new route pages with consistent layouts and navigation integration |
| `animation-polisher.md` | Enhances components with polished motion animations |
| `form-interaction.md` | Builds forms, modals, and interactive components with validation |
| `ui-component-extender.md` | Creates/extends shadcn/ui components with CVA + Radix UI patterns |

Reference these subagents when working on related tasks to maintain consistency with existing patterns.
