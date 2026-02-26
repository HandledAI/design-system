# Consumer Setup Guide

Complete guide for building an app with `@handled-ai/design-system`.

## 1. Install the Package

```bash
npm install @handled-ai/design-system
```

## 2. Install Required Peer Dependencies

The design system externalizes several packages that **must** be installed in your app:

```bash
npm install @tanstack/react-table class-variance-authority clsx tailwind-merge date-fns zod lucide-react radix-ui @radix-ui/react-slot @radix-ui/react-label
```

Optional (only install if using charting or 3D components):

```bash
# Charts (PrototypeInsightsView analytics tab)
npm install recharts

# Sankey diagrams
npm install @nivo/sankey @nivo/core

# 3D AgentOrb component
npm install three @react-three/fiber @react-three/drei
```

## 3. Install Tailwind CSS v4

The design system uses Tailwind CSS v4 with CSS-first configuration. You need the Tailwind build tooling:

**Vite projects:**

```bash
npm install -D @tailwindcss/vite tailwindcss tw-animate-css
```

Then add the plugin to `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Non-Vite projects (Next.js, PostCSS):**

```bash
npm install -D @tailwindcss/postcss tailwindcss tw-animate-css
```

Add to `postcss.config.mjs`:

```javascript
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

## 4. CSS Setup (Critical)

Replace or create your main CSS file (e.g. `src/index.css`) with the following template. This is the **most important step** -- without it, all components will render without proper styling, animations, or theme tokens.

**Do NOT use pre-compiled Tailwind output.** The file must be a Tailwind source file processed at build time.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

@custom-variant dark (&:is(.dark *));

/* ----------------------------------------------------------------
   CSS Variables -- customize these to theme your app.
   The values below match the design system's default theme.
   ---------------------------------------------------------------- */

:root {
  --font-size: 14px;
  --background: #ffffff;
  --foreground: #000000;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --primary: #000000;
  --primary-foreground: #ffffff;
  --secondary: #f5f5f5;
  --secondary-foreground: #000000;
  --muted: #f8f8f8;
  --muted-foreground: #666666;
  --accent: #f0f0f0;
  --accent-foreground: #000000;
  --destructive: #000000;
  --destructive-foreground: #ffffff;
  --border: #e5e5e5;
  --input: #e5e5e5;
  --input-background: #f8f8f8;
  --switch-background: #e0e0e0;
  --font-weight-semibold: 600;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: rgba(0, 0, 0, 0.2);

  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #e5e5e5;
  --gray-300: #d4d4d4;
  --gray-400: #a3a3a3;
  --gray-500: #737373;
  --gray-600: #525252;
  --gray-700: #404040;
  --gray-800: #262626;
  --gray-900: #171717;

  --priority-low: var(--gray-300);
  --priority-medium: var(--gray-600);
  --priority-high: var(--gray-900);
  --score-low: var(--gray-400);
  --score-medium: var(--gray-700);
  --score-high: var(--gray-900);

  --brand-purple: #6b5fcf;

  --chart-1: var(--gray-900);
  --chart-2: var(--gray-700);
  --chart-3: var(--gray-500);
  --chart-4: var(--gray-400);
  --chart-5: var(--gray-300);

  --radius: 0.625rem;

  --sidebar: #fafafa;
  --sidebar-foreground: #000000;
  --sidebar-primary: #000000;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f5f5f5;
  --sidebar-accent-foreground: #000000;
  --sidebar-border: #f0f0f0;
  --sidebar-ring: rgba(0, 0, 0, 0.2);
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
  --card: #111111;
  --card-foreground: #ffffff;
  --popover: #1a1a1a;
  --popover-foreground: #ffffff;
  --primary: #ffffff;
  --primary-foreground: #000000;
  --secondary: #1f1f1f;
  --secondary-foreground: #ffffff;
  --muted: #2a2a2a;
  --muted-foreground: #a3a3a3;
  --accent: #333333;
  --accent-foreground: #ffffff;
  --destructive: #ffffff;
  --destructive-foreground: #000000;
  --border: #333333;
  --input: #333333;
  --input-background: #1a1a1a;
  --switch-background: #404040;
  --ring: rgba(255, 255, 255, 0.2);

  --gray-50: #0a0a0a;
  --gray-100: #171717;
  --gray-200: #262626;
  --gray-300: #404040;
  --gray-400: #525252;
  --gray-500: #737373;
  --gray-600: #a3a3a3;
  --gray-700: #d4d4d4;
  --gray-800: #e5e5e5;
  --gray-900: #f5f5f5;

  --priority-low: var(--gray-400);
  --priority-medium: var(--gray-600);
  --priority-high: var(--gray-900);
  --score-low: var(--gray-500);
  --score-medium: var(--gray-700);
  --score-high: var(--gray-900);

  --brand-purple: #6b5fcf;

  --chart-1: var(--gray-900);
  --chart-2: var(--gray-700);
  --chart-3: var(--gray-600);
  --chart-4: var(--gray-500);
  --chart-5: var(--gray-400);

  --sidebar: #0f0f0f;
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #ffffff;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #262626;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #262626;
  --sidebar-ring: rgba(255, 255, 255, 0.2);
}

/* ----------------------------------------------------------------
   Tailwind theme bridge -- maps CSS variables to Tailwind utilities.
   This block MUST be processed by Tailwind (requires @import "tailwindcss" above).
   ---------------------------------------------------------------- */

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);

  --color-gray-50: var(--gray-50);
  --color-gray-100: var(--gray-100);
  --color-gray-200: var(--gray-200);
  --color-gray-300: var(--gray-300);
  --color-gray-400: var(--gray-400);
  --color-gray-500: var(--gray-500);
  --color-gray-600: var(--gray-600);
  --color-gray-700: var(--gray-700);
  --color-gray-800: var(--gray-800);
  --color-gray-900: var(--gray-900);

  --color-priority-low: var(--priority-low);
  --color-priority-medium: var(--priority-medium);
  --color-priority-high: var(--priority-high);
  --color-score-low: var(--score-low);
  --color-score-medium: var(--score-medium);
  --color-score-high: var(--score-high);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --color-brand-purple: var(--brand-purple);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}

/* ----------------------------------------------------------------
   Base styles
   ---------------------------------------------------------------- */

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    font-variation-settings: normal;
  }

  html {
    font-size: var(--font-size);
  }

  h1 {
    font-size: 1.285rem;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.01em;
  }

  h2 {
    font-size: 1.143rem;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.01em;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.005em;
  }

  h4 {
    font-size: 0.929rem;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.005em;
  }

  p {
    font-size: 1rem;
    font-weight: var(--font-weight-normal);
    line-height: 1.4;
  }

  label {
    font-size: 0.929rem;
    font-weight: 500;
    line-height: 1.4;
  }

  button {
    font-size: 0.929rem;
    font-weight: 500;
    line-height: 1.4;
  }

  input,
  textarea {
    font-size: 0.929rem;
    font-weight: var(--font-weight-normal);
    line-height: 1.4;
    color: var(--foreground);
  }

  small,
  .text-small {
    font-size: 0.857rem;
    font-weight: var(--font-weight-normal);
    line-height: 1.3;
  }

  .text-caption {
    font-size: 0.786rem;
    font-weight: var(--font-weight-normal);
    line-height: 1.3;
    color: var(--muted-foreground);
  }
}
```

Import it in your entry point (`src/main.tsx`):

```typescript
import "./index.css";
```

## 5. Minimal App Example (PrototypeShell)

```tsx
import { useState } from "react";
import { PrototypeShell } from "@handled-ai/design-system";
import type { PrototypeConfig } from "@handled-ai/design-system";
import { Inbox, Database, BarChart3, Settings } from "lucide-react";

const config: PrototypeConfig = {
  brand: { name: "My App" },
  sidebar: [
    { items: [{ id: "inbox", label: "Inbox", icon: Inbox }] },
    {
      title: "Data",
      items: [
        { id: "accounts", label: "Accounts", icon: Database },
        { id: "insights", label: "Insights", icon: BarChart3 },
      ],
    },
  ],
  views: {
    inbox: {
      items: [],
      detailSections: { suggestedActions: true, timeline: true },
      buildSuggestedActions: () => [],
      getSignalScore: () => ({
        score: 0,
        factors: [],
        whyNow: "",
        evidence: [],
        confidence: 0,
      }),
      getTimelineEvents: () => [],
    },
    insights: {
      tabs: { overview: true, analytics: false },
      metrics: [],
      dashboardCards: { topTasks: true, upcomingMeetings: true },
    },
    accounts: {
      filterTabs: [{ label: "All", count: 0 }],
    },
  },
  defaultView: "inbox",
  navigableViews: ["inbox", "accounts", "insights"],
};

export default function App() {
  return <PrototypeShell config={config} />;
}
```

## 6. PrototypeConfig Reference

### `brand`

| Field           | Type     | Description                          |
| --------------- | -------- | ------------------------------------ |
| `name`          | `string` | Displayed in the sidebar header      |
| `logo`          | `string` | URL to logo image (optional)         |
| `assistantName` | `string` | AI assistant name in insights banner |

### `views.inbox` (InboxViewConfig)

| Field                  | Type                                       | Required | Description                                     |
| ---------------------- | ------------------------------------------ | -------- | ----------------------------------------------- |
| `items`                | `QueueItem[]`                              | Yes      | Inbox items to display                          |
| `filterCategories`     | `InboxFilterCategory[]`                    | No       | Filter chip categories                          |
| `detailSections`       | `InboxDetailSections`                      | No       | Which detail sections to show                   |
| `buildSuggestedActions`| `(item: QueueItem) => SuggestedAction[]`   | No       | Builds suggested actions for a selected item    |
| `buildSourceItems`     | `(item: QueueItem) => SourceDef[]`         | No       | Builds source context cards for the detail view |
| `getSignalScore`       | `(company: string) => SignalScoreData`     | No       | Returns signal score for the detail view        |
| `getTimelineEvents`    | `(item: QueueItem) => TimelineEvent[]`     | No       | Returns timeline events for the detail view     |
| `accountContacts`      | `SuggestedContact[]`                       | No       | Contacts for email To/Cc/Bcc suggestions        |
| `emailSignature`       | `string`                                   | No       | Default email signature                         |
| `iconMap`              | `Record<string, string>`                   | No       | Icon URLs for suggested action types            |

### `views.insights` (InsightsViewConfig)

| Field            | Type                | Required | Description                          |
| ---------------- | ------------------- | -------- | ------------------------------------ |
| `tabs`           | `{ overview, analytics }` | No | Which tabs to show                   |
| `coaching`       | `{ enabled, message }`    | No | Coaching banner configuration        |
| `metrics`        | `MetricCardProps[]`       | No | Metric cards for the overview        |
| `dashboardCards` | `{ topTasks, ... }`       | No | Which dashboard cards to show        |

### `views.accounts` (AccountsViewConfig)

| Field        | Type                  | Required | Description           |
| ------------ | --------------------- | -------- | --------------------- |
| `filterTabs` | `AccountFilterTab[]`  | No       | Filter tab bar items  |

## 7. Common Pitfalls

1. **Pre-compiled CSS**: If your `index.css` contains thousands of lines of compiled Tailwind output, it is NOT a source file. Replace it with the template above. Tailwind v4 processes the source at build time.

2. **Missing `@import "tailwindcss"`**: Without this import, `@theme inline` and `@layer base` directives are ignored. Your CSS variables will be defined but Tailwind utility classes like `bg-background` won't resolve them.

3. **Missing `tw-animate-css`**: Many design system components use animation utilities (`animate-in`, `fade-in`, `slide-in-from-*`). Without this import, transitions and modals look broken.

4. **Missing peer dependencies**: If you see runtime errors about modules not found, check that all required peer deps from step 2 are installed. The most common missing one is `@tanstack/react-table` (causes accounts view to crash).

5. **Missing inbox callbacks**: If `detailSections.timeline` is `true` but `getTimelineEvents` is not provided, the timeline section renders empty. Same for `getSignalScore` and `buildSourceItems`. Always provide all callbacks referenced by your `detailSections` config.

6. **Sidebar section format**: Sidebar groups use `title` (not `label`) for the section heading.
