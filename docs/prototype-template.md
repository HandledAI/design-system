# Prototype Template System

The design system exports a config-driven **PrototypeShell** component that renders a full application prototype. Consuming projects install `@handled-ai/design-system` via npm and provide a configuration object to get a working prototype with sidebar navigation, inbox, insights dashboard, accounts table, and work queue -- then customize from there.

---

## Quickstart: New Project from the Prototype

### 1. Scaffold a project

Vite + React + TypeScript is recommended for standalone prototypes:

```bash
npm create vite@latest my-prototype -- --template react-ts
cd my-prototype
```

### 2. Install the design system and peer dependencies

```bash
npm install @handled-ai/design-system

npm install react react-dom lucide-react recharts \
  @radix-ui/react-slot @radix-ui/react-label radix-ui \
  @tanstack/react-table class-variance-authority clsx \
  date-fns tailwind-merge zod @nivo/sankey @nivo/core
```

### 3. Set up Tailwind CSS

Install Tailwind and configure it:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

In `vite.config.ts`:

```ts
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

In your main CSS file (e.g. `src/index.css`), import Tailwind and define the semantic CSS variable tokens the design system expects. At minimum:

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
    --brand-purple: #6B5FCF;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}
```

### 4. Create the config file

Create `src/prototype-config.ts`:

```ts
import {
  Inbox, Search, FileText, Building, BarChart2, ListChecks,
} from "lucide-react"
import type { PrototypeConfig } from "@handled-ai/design-system"

export const config: PrototypeConfig = {
  brand: {
    name: "My Product",
    assistantName: "Assistant",
  },
  sidebar: [
    {
      items: [
        { id: "search", label: "Search", icon: Search },
        { id: "inbox", label: "Inbox", icon: Inbox },
        { id: "drafts", label: "Drafts", icon: FileText },
      ],
    },
    {
      title: "Views",
      items: [
        { id: "accounts", label: "Accounts", icon: Building },
        { id: "activity", label: "Work Queue", icon: ListChecks },
        { id: "dashboard", label: "Insights", icon: BarChart2 },
      ],
    },
  ],
  defaultView: "inbox",
  views: {
    inbox: {
      items: [
        {
          id: "ITEM-1",
          title: "Example inbox item",
          details: "A brief description of this item...",
          statusColor: "blue",
          time: "5m ago",
          company: "Acme Corp",
          tag1: "Follow-up",
        },
      ],
    },
    insights: {},
    accounts: {},
    workQueue: {},
  },
}
```

### 5. Render the shell

In `src/App.tsx`:

```tsx
import { PrototypeShell } from "@handled-ai/design-system"
import { config } from "./prototype-config"

export default function App() {
  return <PrototypeShell config={config} />
}
```

### 6. Run it

```bash
npm run dev
```

You now have a working prototype with sidebar, inbox, insights, accounts, and work queue views.

---

## Configuration Reference

### `PrototypeConfig`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `brand` | `PrototypeBrandConfig` | No | Product name, logo URL, AI assistant name. |
| `sidebar` | `SidebarNavSection[]` | **Yes** | Navigation sections. Reuses the `SidebarNavSection` type from `QuickActionSidebarNav`. |
| `views` | `object` | **Yes** | Which views to enable. Omit a key to exclude that view entirely. |
| `defaultView` | `string` | **Yes** | Sidebar item ID to show on load (e.g. `"inbox"`, `"dashboard"`). |
| `entityPanel` | `EntityPanelConfig` | No | Configures the slide-out entity detail panel. |
| `navigableViews` | `string[]` | No | Sidebar item IDs that trigger navigation. Defaults to all view keys. |

### `PrototypeBrandConfig`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | — | Product/company name. |
| `logo` | `string` | — | URL to a logo image. |
| `assistantName` | `string` | — | Name shown in "Talk to {name}" button on insights view. Omit to hide the button. |

---

## View-Specific Configuration

### Inbox (`views.inbox`: `InboxViewConfig`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `QueueItem[]` | **Required** | The inbox queue items to display. |
| `filterCategories` | `InboxFilterCategory[]` | Auto-derived from items | Category/account filter dropdowns in the toolbar. |
| `detailSections` | `InboxDetailSections` | All enabled | Toggle `signalBrief`, `suggestedActions`, `timeline` on/off. |
| `accountContacts` | `SuggestedContact[]` | `[]` | Contacts shown in the suggested actions contact picker. |
| `emailSignature` | `string` | `""` | Default email signature for draft emails. |
| `buildSuggestedActions` | `(item) => SuggestedAction[]` | No-op | Generates suggested actions for each queue item. |
| `buildSourceItems` | `(item) => SourceDef[]` | No-op | Generates citation sources for the signal brief. |
| `getSignalScore` | `(company) => SignalScoreData` | Default 65 score | Returns signal score data for a company. |
| `getTimelineEvents` | `(item) => TimelineEvent[]` | — | Returns timeline events for each queue item. |
| `iconMap` | `Record<string, string>` | `{}` | Integration icon URLs (keys: `gmail`, `slack`, `zendesk`, `salesforce`). |

**`InboxDetailSections`** toggles (all default to `true`):

- `signalBrief` -- Signal score bar, evidence citations, score breakdown, approve/dismiss actions.
- `suggestedActions` -- Email drafts, call talk tracks, ticket creation, Slack messages.
- `timeline` -- Expandable activity timeline with events.

### Insights (`views.insights`: `InsightsViewConfig`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tabs.overview` | `boolean` | `true` | Show the Overview tab. |
| `tabs.analytics` | `boolean` | `true` | Show the Analytics tab. |
| `coaching` | `{ enabled, message }` | Enabled with default message | Coaching insight banner. Set `enabled: false` to hide. |
| `metrics` | `MetricCardProps[]` | Default 4 metrics | Primary metric cards on the overview tab. |
| `expandedMetrics` | `MetricCardProps[]` | Default 4 extra metrics | Additional metrics shown via "Show more" toggle. |
| `dashboardCards` | `object` | All enabled | Toggle `topTasks`, `upcomingMeetings`, `recentlyCompleted`, `checkIns`. |
| `analytics.pipeline` | `object` | — | Pipeline stages, metrics, timings, filter breakdowns. |
| `analytics.volumeChart` | `object` | — | Volume chart data, keys, filter options. |
| `analytics.donutChart` | `object` | — | Risk breakdown donut chart data. |
| `analytics.trendChart` | `object` | — | Trend area chart data and series. |
| `analytics.barChart` | `object` | — | Bar chart data and bar definitions. |
| `analytics.barList` | `object` | — | Styled bar list data. |

### Accounts (`views.accounts`: `AccountsViewConfig`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `filterTabs` | `AccountFilterTab[]` | 3 default tabs | Filter tabs above the data table. Each has `label`, `count`, `variant`. |

The `variant` field controls styling: `"default"` (muted), `"attention"` (green), `"ghost"` (outlined).

### Work Queue (`views.workQueue`: `WorkQueueViewConfig`)

Currently renders the `ItemList` component with its built-in data and interactions. Pass an empty object `{}` to enable the view.

---

## Feature Toggle Checklist

Quick reference for enabling/disabling features:

| Feature | How to toggle |
|---------|---------------|
| **Inbox view** | Include/omit `views.inbox` |
| **Insights view** | Include/omit `views.insights` |
| **Accounts view** | Include/omit `views.accounts` |
| **Work Queue view** | Include/omit `views.workQueue` |
| **Chat in sidebar** | Include/omit chat items from `sidebar` sections |
| **Teams in sidebar** | Include/omit team items from `sidebar` sections |
| **Signal brief** | `views.inbox.detailSections.signalBrief: false` |
| **Suggested actions** | `views.inbox.detailSections.suggestedActions: false` |
| **Activity timeline** | `views.inbox.detailSections.timeline: false` |
| **Coaching banner** | `views.insights.coaching.enabled: false` |
| **Overview tab** | `views.insights.tabs.overview: false` |
| **Analytics tab** | `views.insights.tabs.analytics: false` |
| **Pipeline overview** | Omit `views.insights.analytics.pipeline` |
| **Volume chart** | Omit `views.insights.analytics.volumeChart` |
| **Risk donut chart** | Omit `views.insights.analytics.donutChart` |
| **Trend area chart** | Omit `views.insights.analytics.trendChart` |
| **Outreach bar chart** | Omit `views.insights.analytics.barChart` |
| **Activity bar list** | Omit `views.insights.analytics.barList` |
| **Top tasks card** | `views.insights.dashboardCards.topTasks: false` |
| **Meetings cards** | `views.insights.dashboardCards.upcomingMeetings: false` |
| **Check-ins card** | `views.insights.dashboardCards.checkIns: false` |
| **Account filter tabs** | Provide custom `views.accounts.filterTabs` |
| **Assistant button** | Set/omit `brand.assistantName` |
| **Entity panel** | Configure `entityPanel.sections` or pass `entityPanelChildren` |

---

## Customization Beyond Config

### Custom header actions

Pass a `headerActions` ReactNode to `PrototypeShell` to render custom buttons in each view's header (e.g. an exit button, settings link):

```tsx
<PrototypeShell
  config={config}
  headerActions={<button onClick={...}>Settings</button>}
/>
```

### Custom entity panel content

Override the default entity panel by passing `entityPanelChildren`:

```tsx
<PrototypeShell
  config={config}
  entityPanelChildren={({ onClose }) => (
    <div>
      <button onClick={onClose}>Close</button>
      <p>Custom panel content here.</p>
    </div>
  )}
/>
```

### Using individual views without the shell

Each view is exported independently for manual composition:

```tsx
import {
  PrototypeInboxView,
  PrototypeInsightsView,
  PrototypeAccountsView,
  PrototypeWorkQueueView,
} from "@handled-ai/design-system"
```

### Theme overrides

The design system uses semantic CSS variables (defined in the Tailwind setup above). Override any variable to change the look:

```css
:root {
  --brand-purple: #e11d48;  /* change accent color */
  --radius: 0.75rem;        /* rounder corners */
}
```

---

## Example: Minimal Inbox-Only Prototype

A stripped-down config that shows only the inbox with email draft actions -- no charts, no chat, no work queue:

```ts
import { Inbox, Search, Building, BarChart2 } from "lucide-react"
import type { PrototypeConfig, QueueItem, SuggestedAction } from "@handled-ai/design-system"

function buildActions(item: QueueItem): SuggestedAction[] {
  return [
    {
      id: `${item.id}-email`,
      type: "email",
      label: `Draft email to ${item.company}`,
      status: "pending",
      emailMeta: {
        from: "You",
        fromEmail: "you@company.com",
        to: { name: "Contact", role: "Role", email: "contact@example.com", confirmed: false },
        subject: `Re: ${item.title}`,
      },
      content: `Hi,\n\nFollowing up on ${item.title}.\n\nBest,\nYou`,
    },
  ]
}

export const config: PrototypeConfig = {
  brand: { name: "My Product" },
  sidebar: [
    {
      items: [
        { id: "search", label: "Search", icon: Search },
        { id: "inbox", label: "Inbox", icon: Inbox },
      ],
    },
    {
      title: "Views",
      items: [
        { id: "accounts", label: "Accounts", icon: Building },
        { id: "dashboard", label: "Insights", icon: BarChart2 },
      ],
    },
  ],
  defaultView: "inbox",
  views: {
    inbox: {
      items: [
        {
          id: "TASK-1",
          title: "Follow up on proposal",
          details: "The proposal was sent 3 days ago with no reply...",
          statusColor: "red",
          time: "3d ago",
          company: "Acme Corp",
          tag1: "Follow-up",
        },
        {
          id: "TASK-2",
          title: "New lead from website",
          details: "Inbound form submission requesting a demo...",
          statusColor: "blue",
          time: "1h ago",
          company: "Beta Inc",
          tag1: "Inbound",
        },
      ],
      detailSections: {
        signalBrief: false,
        suggestedActions: true,
        timeline: false,
      },
      buildSuggestedActions: buildActions,
    },
    insights: {
      tabs: { overview: true, analytics: false },
      coaching: { enabled: false },
    },
    accounts: {},
  },
}
```

This produces a prototype with: sidebar nav, inbox with split/list/detail views and email drafts, a simplified insights overview (no analytics charts), and an accounts table. No chat, no work queue, no signal brief, no timeline.
