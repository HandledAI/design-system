# Styling Reference

This document covers the design system's typography, color tokens, theming architecture, and visual conventions. All values are defined in `app/globals.css` and mapped to Tailwind utilities via the `@theme inline` block.

## Typography

### Font Family

The system uses **Inter** loaded via `next/font/google` and exposed as the `--font-inter` CSS variable. The full font stack is:

```
Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
```

OpenType features enabled: `cv02`, `cv03`, `cv04`, `cv11`.

### Base Font Size

The root font size is **14px** (`--font-size`). All `rem` values in the type scale are relative to this base.

### Type Scale

| Element | Size (rem) | Size (px) | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `h1` | 1.285 | 18 | 600 (semibold) | 1.4 | -0.01em |
| `h2` | 1.143 | 16 | 600 (semibold) | 1.4 | -0.01em |
| `h3` | 1.0 | 14 | 600 (semibold) | 1.4 | -0.005em |
| `h4` | 0.929 | 13 | 600 (semibold) | 1.4 | -0.005em |
| `p` (body) | 1.0 | 14 | 400 (normal) | 1.4 | — |
| `label`, `button` | 0.929 | 13 | 500 (medium) | 1.4 | — |
| `input`, `textarea` | 0.929 | 13 | 400 (normal) | 1.4 | — |
| `small`, `.text-small` | 0.857 | 12 | 400 (normal) | 1.3 | — |
| `.text-caption` | 0.786 | 11 | 400 (normal) | 1.3 | — |

Caption text (`.text-caption`) also applies `color: var(--muted-foreground)`.

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `--font-weight-normal` | 400 | Body text, inputs, captions |
| `--font-weight-medium` | 500 | Labels, buttons |
| `--font-weight-semibold` | 600 | Headings |

## Color Tokens

The design system uses semantic CSS variables for all colors. Components reference tokens like `bg-primary` or `text-muted-foreground` rather than raw color values, so consuming apps can retheme by overriding the variables.

### Core Semantic Tokens

| Token | Tailwind Class | Light | Dark |
|---|---|---|---|
| `--background` | `bg-background` | `#ffffff` | `#000000` |
| `--foreground` | `text-foreground` | `#000000` | `#ffffff` |
| `--card` | `bg-card` | `#ffffff` | `#111111` |
| `--card-foreground` | `text-card-foreground` | `#000000` | `#ffffff` |
| `--popover` | `bg-popover` | `#ffffff` | `#1a1a1a` |
| `--popover-foreground` | `text-popover-foreground` | `#000000` | `#ffffff` |
| `--primary` | `bg-primary` | `#000000` | `#ffffff` |
| `--primary-foreground` | `text-primary-foreground` | `#ffffff` | `#000000` |
| `--secondary` | `bg-secondary` | `#f5f5f5` | `#1f1f1f` |
| `--secondary-foreground` | `text-secondary-foreground` | `#000000` | `#ffffff` |
| `--muted` | `bg-muted` | `#f8f8f8` | `#2a2a2a` |
| `--muted-foreground` | `text-muted-foreground` | `#666666` | `#a3a3a3` |
| `--accent` | `bg-accent` | `#f0f0f0` | `#333333` |
| `--accent-foreground` | `text-accent-foreground` | `#000000` | `#ffffff` |
| `--destructive` | `bg-destructive` | `#000000` | `#ffffff` |
| `--destructive-foreground` | `text-destructive-foreground` | `#ffffff` | `#000000` |

### Input & Control Tokens

| Token | Tailwind Class | Light | Dark |
|---|---|---|---|
| `--border` | `border-border` | `#e5e5e5` | `#333333` |
| `--input` | `border-input` | `#e5e5e5` | `#333333` |
| `--input-background` | `bg-input-background` | `#f8f8f8` | `#1a1a1a` |
| `--switch-background` | `bg-switch-background` | `#e0e0e0` | `#404040` |
| `--ring` | `ring-ring` | `rgba(0,0,0,0.2)` | `rgba(255,255,255,0.2)` |

### Grayscale System

A 10-step grayscale ramp used for data visualization and fine-grained UI shading. In dark mode the values invert so `gray-900` is always the strongest contrast.

| Token | Light | Dark |
|---|---|---|
| `--gray-50` | `#fafafa` | `#0a0a0a` |
| `--gray-100` | `#f5f5f5` | `#171717` |
| `--gray-200` | `#e5e5e5` | `#262626` |
| `--gray-300` | `#d4d4d4` | `#404040` |
| `--gray-400` | `#a3a3a3` | `#525252` |
| `--gray-500` | `#737373` | `#737373` |
| `--gray-600` | `#525252` | `#a3a3a3` |
| `--gray-700` | `#404040` | `#d4d4d4` |
| `--gray-800` | `#262626` | `#e5e5e5` |
| `--gray-900` | `#171717` | `#f5f5f5` |

### Priority & Score Colors

Derived from the grayscale ramp so they adapt automatically to dark mode.

| Token | Light Maps To | Dark Maps To |
|---|---|---|
| `--priority-low` | `--gray-300` | `--gray-400` |
| `--priority-medium` | `--gray-600` | `--gray-600` |
| `--priority-high` | `--gray-900` | `--gray-900` |
| `--score-low` | `--gray-400` | `--gray-500` |
| `--score-medium` | `--gray-700` | `--gray-700` |
| `--score-high` | `--gray-900` | `--gray-900` |

### Chart Colors

Five sequential chart slots mapped to grayscale steps (strongest to weakest).

| Token | Light Maps To | Dark Maps To |
|---|---|---|
| `--chart-1` | `--gray-900` | `--gray-900` |
| `--chart-2` | `--gray-700` | `--gray-700` |
| `--chart-3` | `--gray-500` | `--gray-600` |
| `--chart-4` | `--gray-400` | `--gray-500` |
| `--chart-5` | `--gray-300` | `--gray-400` |

### Brand Colors

| Token | Value |
|---|---|
| `--brand-purple` | `#6B5FCF` |

### Sidebar Tokens

Dedicated tokens for the sidebar layout component.

| Token | Light | Dark |
|---|---|---|
| `--sidebar` | `#fafafa` | `#0f0f0f` |
| `--sidebar-foreground` | `#000000` | `#ffffff` |
| `--sidebar-primary` | `#000000` | `#ffffff` |
| `--sidebar-primary-foreground` | `#ffffff` | `#000000` |
| `--sidebar-accent` | `#f5f5f5` | `#262626` |
| `--sidebar-accent-foreground` | `#000000` | `#ffffff` |
| `--sidebar-border` | `#f0f0f0` | `#262626` |
| `--sidebar-ring` | `rgba(0,0,0,0.2)` | `rgba(255,255,255,0.2)` |

## Border Radius

A base radius with computed size variants:

| Token | Value |
|---|---|
| `--radius` (base) | `0.625rem` (10px) |
| `--radius-sm` | `calc(var(--radius) - 4px)` (6px) |
| `--radius-md` | `calc(var(--radius) - 2px)` (8px) |
| `--radius-lg` | `var(--radius)` (10px) |
| `--radius-xl` | `calc(var(--radius) + 4px)` (14px) |

## Theming

### How It Works

1. CSS variables are declared in `:root` (light) and `.dark` (dark) in `app/globals.css`.
2. A `@theme inline` block maps each variable to a Tailwind v4 color/radius token (e.g. `--color-primary: var(--primary)`).
3. Components use Tailwind classes (`bg-primary`, `text-muted-foreground`, `border-border`) which resolve to the CSS variables at runtime.
4. Consuming apps override the CSS variables in their own `globals.css` to retheme without touching component code.

### Overriding Tokens in a Consuming App

Define the same CSS variables in your app's stylesheet:

```css
:root {
  --primary: #1a73e8;
  --primary-foreground: #ffffff;
  /* ...override whichever tokens you need */
}

.dark {
  --primary: #8ab4f8;
  --primary-foreground: #000000;
}
```

Components will pick up the new values automatically.

### Dark Mode

Dark mode is activated by adding the `dark` class to any ancestor element. The `.dark` selector in `globals.css` redefines every token with dark-appropriate values. The grayscale ramp inverts (gray-50 becomes near-black, gray-900 becomes near-white) so contrast relationships hold in both modes.

### Theme Presets

Three example presets live in `app/themes/` to validate the theming contract:

| Preset | File | Description |
|---|---|---|
| Neutral | `app/themes/neutral.css` | Black/white, grayscale accents (default) |
| Forest | `app/themes/forest.css` | Dark green primary, earthy tones |
| Ocean | `app/themes/ocean.css` | Deep blue primary, cool tones |

Each preset defines the same set of CSS variables using `oklch` color values and includes both light and dark variants. Copy any preset as a starting point for a custom theme.

## Tailwind Integration

This design system uses Tailwind CSS v4 with CSS-first configuration (no `tailwind.config.js`). The `@theme inline` block in `globals.css` is the sole bridge between CSS variables and Tailwind utilities. When using components, always prefer semantic Tailwind classes over raw CSS values:

| Do | Don't |
|---|---|
| `bg-primary` | `bg-[#000000]` |
| `text-muted-foreground` | `text-[#666666]` |
| `border-border` | `border-[#e5e5e5]` |
| `rounded-lg` | `rounded-[10px]` |
