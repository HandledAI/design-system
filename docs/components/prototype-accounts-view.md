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

## `AccountFilterTab`

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Tab label text. |
| `count` | `number` | Badge count. |
| `variant` | `"default" \| "attention" \| "ghost"` | Visual style. `attention` renders green, `ghost` renders outlined. |

## Dependencies

- `Button`, `Badge`, `DataTable`
