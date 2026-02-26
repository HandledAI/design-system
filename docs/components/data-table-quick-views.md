# DataTableQuickViews
> Horizontal pill row for preset quick-view filters plus "More" dropdown.
## Import
```tsx
import { DataTableQuickViews, type DataTableQuickViewValue } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| quickViews | string[] | — | Primary quick view labels |
| moreViews | string[] | — | Secondary views in "More" dropdown |
| activeView | DataTableQuickViewValue | — | Currently active view (string or null) |
| onViewChange | (next: DataTableQuickViewValue) => void | — | View change handler |
| className | string | — | Wrapper class |

### DataTableQuickViewValue
`string | null`

## Variants
N/A
## Basic Usage
```tsx
import { DataTableQuickViews } from "@handled-ai/design-system"

<DataTableQuickViews
  quickViews={["Balance Flight Detected", "Growth Signal Detected"]}
  moreViews={["Missed meeting this week", "High churn risk score"]}
  activeView={activeQuickView}
  onViewChange={setActiveQuickView}
/>
```

## Examples

### With clear
When `activeView` is set, a "Clear" button appears. Clearing sets view to `null`.

```tsx
<DataTableQuickViews
  quickViews={["Active", "At Risk"]}
  moreViews={["Overdue", "On hold"]}
  activeView={activeView}
  onViewChange={setActiveView}
/>
```

### Full integration
Used inside DataTable; quick views filter rows based on custom predicates (e.g. `riskScore >= 60`).

## Peer Dependencies

None beyond base peer dependencies.

## Internal Dependencies
- DropdownMenu

## Source
`registry/new-york/ui/data-table-quick-views.tsx`

**Client-only:** Yes (`"use client"`)
