# @handled Design System

A shared design system built on [shadcn/ui](https://ui.shadcn.com). Components are customized shadcn primitives distributed as an npm package (`@handled-ai/design-system`) and hosted as a custom shadcn registry for showcase/discovery.

## Documentation

| Document | Description |
|---|---|
| [Component Reference](docs/COMPONENTS.md) | Full API reference for all 62+ components, organized by category (primitives, overlays, cards, charts, data tables, activity, detail views, actions, utilities) |
| [Styling Reference](docs/STYLING.md) | Typography scale, color tokens, grayscale system, theming architecture, dark mode, border radius, and Tailwind integration |
| [Publishing Guide](docs/PUBLISHING.md) | Version bumping (semver), publishing steps, post-publish verification, safe update workflow for consuming apps, peer dependencies, and rollback procedures |
| [Consuming App Rule Template](docs/CONSUMING_APP_RULE_TEMPLATE.mdc) | Cursor rule template to drop into consuming projects for design system contract enforcement |
| **Per-component docs** | `docs/components/{name}.md` — individual prop tables, usage examples, and dependency notes for each component |

## Architecture

- **Primary distribution:** npm package `@handled-ai/design-system`, built with `npm run build:lib` (tsup)
- **Secondary distribution:** shadcn registry at `/r/{name}.json`, deployed on Vercel for showcase/discovery
- **Component source:** `registry/new-york/ui/` — customized shadcn primitives and custom UX blocks
- **Package entry point:** root `index.ts`
- **Theming:** Semantic CSS variable tokens — consuming projects define their own palette (see [Styling Reference](docs/STYLING.md))
- **Build tool:** `shadcn build` generates distributable registry JSON from source

## Cursor Rules

This repo includes Cursor rules that provide AI-assisted development context.

| Rule | File | Scope |
|---|---|---|
| Architecture | `.cursor/rules/architecture.mdc` | Always active — project structure, conventions, distribution channels, documentation locations |
| Component Editing | `.cursor/rules/component-editing.mdc` | Auto-applied when editing `registry/new-york/ui/*.tsx` — checklist for exports, docs, versioning, and dependencies |

Consuming apps can adopt their own design system rule using the [template](docs/CONSUMING_APP_RULE_TEMPLATE.mdc).

## Components

The design system includes 62+ components across these categories:

- **Primitives & Foundation** — Button, Input, Label, Textarea, Select, Badge, Avatar, Separator, Skeleton, Progress, ScrollArea, Table
- **Overlays & Navigation** — Dialog, DropdownMenu, Tooltip, Sheet, Tabs, Sidebar, ViewModeToggle, QuickActionSidebarNav
- **Cards & Metrics** — Card, MetricCard, ReportCard, DashboardCards, TopLineMetrics, PerformanceMetricsTable, ScoreRing, ScoreFeedback, ScoreBreakdown, ScoreAnalysisModal
- **Charts** — Chart, ChartTooltip, DonutChart, TrendAreaChart, BarChartComponent, StyledBarList, SankeyChart, VolumeAnalysisChart, PipelineOverview
- **Data Table** — DataTable, DataTableFilter, DataTableDisplay, DataTableQuickViews, DataTableToolbar
- **Item List** — ItemList, ItemListFilter, ItemListDisplay, ItemListToolbar
- **Activity & Timeline** — ActivityLog, ActivityDetail, TimelineActivity
- **Detail & Entity Views** — DetailView, EntityPanel, InboxRow, InboxToolbar, ContactList, PreviewList
- **Actions & Feedback** — SignalFeedbackInline, RecommendedActionsSection, SuggestedActions, QuickActionChatArea, QuickActionModal

See the [Component Reference](docs/COMPONENTS.md) for full API documentation including props, variants, and usage examples.

## Usage in a Consuming Project

### Install via npm (primary)

```bash
pnpm add @handled-ai/design-system
```

```tsx
import { Button, Card, Input } from "@handled-ai/design-system"
```

### Install via shadcn registry (alternative)

Add the registry namespace to your project's `components.json`:

```json
{
  "registries": {
    "@handled": "https://handled-design-system.vercel.app/r/{name}.json"
  }
}
```

Then install individual components:

```bash
npx shadcn@latest add @handled/button @handled/card @handled/input
```

### Set your theme

Override CSS variables in your `globals.css` to apply your own palette. See the [Styling Reference](docs/STYLING.md) for the full list of tokens and theming instructions.

## Development

```bash
pnpm install
pnpm run dev            # Start local app (component gallery + prototype)
pnpm run build:lib      # Build npm package
pnpm run registry:build # Build registry JSON files
pnpm run typecheck      # Type-check the codebase
pnpm run lint           # Run linter
```

### Local URLs

- `http://localhost:3000/` — Component gallery
- `http://localhost:3000/preview` — Full product prototype (sidebar, inbox, detail view, dashboard)
- `http://localhost:3000/r/registry.json` — Built registry index

If port 3000 is taken, Next.js will auto-pick the next available port.

## Publishing

See the [Publishing Guide](docs/PUBLISHING.md) for the full workflow. Quick summary:

1. Make component changes in `registry/new-york/ui/`.
2. Export new components from `index.ts`.
3. Update `docs/components/{name}.md` and `docs/COMPONENTS.md`.
4. Bump the version in `package.json` (semver: patch / minor / major).
5. Run `npm publish` (build runs automatically via `prepublishOnly`).
6. Optionally run `pnpm run registry:build` and push to deploy the showcase site.

## Theme Presets

Three example presets in `app/themes/` validate the theming contract:

| Preset | Description |
|---|---|
| **Neutral** (default) | Black/white, grayscale accents |
| **Forest** | Dark green primary, earthy tones |
| **Ocean** | Deep blue primary, cool tones |

See the [Styling Reference](docs/STYLING.md) for detailed token tables and instructions on creating custom themes.
