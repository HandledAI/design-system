# InsightsFilterBar
> Configuration-driven filter bar for insights dashboards with pill-style dropdown buttons, optional icons, and a "Clear All" reset.
## Import
```tsx
import { InsightsFilterBar, type FilterDefinition, type InsightsFilterBarProps } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| filters | FilterDefinition[] | — | Array of filter definitions |
| values | Record\<string, string\> | — | Current filter values keyed by filter id |
| onChange | (filterId: string, value: string) => void | — | Called when a filter selection changes |
| onClearAll | () => void | undefined | Called when "Clear All" is clicked; button only shows when a non-default value is active |
| className | string | undefined | Additional class names for the container |

### FilterDefinition
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | — | Unique filter identifier |
| label | string | — | Display label shown on the trigger button |
| options | string[] | — | Available values to choose from |
| defaultValue | string | first option | Value considered "default" for clear-all logic |
| icon | "calendar" \| React.ComponentType\<{ className?: string }\> | undefined | Icon shown before the label; `"calendar"` renders CalendarIcon |

## Variants
N/A
## Basic Usage
```tsx
import { InsightsFilterBar } from "@handled-ai/design-system"

const FILTERS = [
  { id: "rep", label: "Rep", options: ["All", "Alice", "Bob"] },
  { id: "segment", label: "Segment", options: ["All", "Enterprise", "SMB"] },
  { id: "time", label: "Time", options: ["Last 7 days", "Last 30 days"], defaultValue: "Last 30 days", icon: "calendar" as const },
]

function MyDashboard() {
  const [values, setValues] = React.useState({ rep: "All", segment: "All", time: "Last 30 days" })
  return (
    <InsightsFilterBar
      filters={FILTERS}
      values={values}
      onChange={(id, val) => setValues((prev) => ({ ...prev, [id]: val }))}
      onClearAll={() => setValues({ rep: "All", segment: "All", time: "Last 30 days" })}
    />
  )
}
```

## Examples

### Healthcare context
```tsx
const HEALTHCARE_FILTERS = [
  { id: "facility", label: "Facility", options: ["All", "Gilbert", "Tucson", "North Phoenix"] },
  { id: "payer", label: "Payer", options: ["All", "BCBS", "Aetna", "UHC", "Cigna", "Medicare"] },
  { id: "source", label: "Source", options: ["All", "Webform", "Phone", "Email", "Fax"] },
  { id: "time", label: "Time", options: ["Last 7 Days", "Last 30 Days", "Last Quarter"], defaultValue: "Last 30 Days", icon: "calendar" as const },
]
```

### Fintech context
```tsx
const FINTECH_FILTERS = [
  { id: "signalType", label: "Signal Type", options: ["All", "Balance Movement", "Micro Deposit"] },
  { id: "rep", label: "Rep", options: ["All", "Will Trevino", "Sarah Chen"] },
  { id: "segment", label: "Account Segment", options: ["All", "Enterprise", "Mid-Market", "SMB"] },
  { id: "time", label: "Time", options: ["Last 7 days", "Last 30 days", "Last 90 days", "All time"], defaultValue: "Last 30 days", icon: "calendar" as const },
]
```

## Peer Dependencies
None beyond base peer dependencies.

## Internal Dependencies
- Button
- DropdownMenu

## Source
`registry/new-york/ui/insights-filter-bar.tsx`

**Client-only:** Yes (`"use client"`)
