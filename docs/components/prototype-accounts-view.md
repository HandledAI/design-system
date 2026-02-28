# PrototypeAccountsView

Accounts view with configurable filter tabs and a full DataTable with sorting, filtering, display options, and row click to open entity panel.

## Import

```tsx
import { PrototypeAccountsView } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `filterTabs` | `AccountFilterTab[]` | Filter tabs above the table. Defaults to All Accounts / Needs Attention / Recent. |
| `headerActions` | `ReactNode` | Extra content in the view header. |
| `onRowClick` | `() => void` | Called when a table row is clicked (typically opens entity panel). |
| `rows` | `DataRow[]` | Custom row data (passed through to DataTable). |
| `filterCategories` | `DataTableFilterCategory[]` | Custom filter dimensions (passed through to DataTable). |
| `quickViews` | `string[]` | Quick view preset names (passed through to DataTable). |
| `moreQuickViews` | `string[]` | Additional quick view presets shown in overflow (passed through to DataTable). |
| `quickViewFilters` | `Record<string, (row: DataRow) => boolean>` | Filter functions keyed by quick view name (passed through to DataTable). |
| `iconMap` | `{ salesforce?: string }` | Icon URLs for external service links (passed through to DataTable). |
| `entityUrlBuilder` | `(row: DataRow) => string` | Callback to build deep-link URLs for entities (passed through to DataTable). |
| `onScoreFactorFeedback` | `(account, scoreType, factorKey, type, detail?) => void` | Callback for score factor feedback (passed through to DataTable). |
| `onScoreApproveFeedback` | `(account, scoreType, reasons, detail) => void` | Callback for score approval feedback (passed through to DataTable). |
| `onScoreDismissFeedback` | `(account, scoreType, reasons, detail) => void` | Callback for score dismiss feedback (passed through to DataTable). |

## `AccountFilterTab`

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Tab label text. |
| `count` | `number` | Badge count. |
| `variant` | `"default" \| "attention" \| "ghost"` | Visual style. `attention` renders green, `ghost` renders outlined. |

## Dependencies

- `Button`, `Badge`, `DataTable`
