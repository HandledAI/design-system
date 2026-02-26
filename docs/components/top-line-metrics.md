# TopLineMetrics
> Primary metric display with trend badge and optional area chart.
## Import
```tsx
import {
  TopLineMetrics,
  type MetricCardData,
  type TopLineMetricsProps,
} from "@handled-ai/design-system"
```
## Props
Prop | Type | Default | Description
metrics | MetricCardData[] | — | Primary metrics (first is emphasized)
chartData | { date: string; value: number; secondary?: number }[] | — | Chart data (generates default if omitted)
filters | string[] | — | Filter pills (e.g. ["All", "7d", "30d"])
activeFilter | string | — | Controlled active filter
onFilterChange | (filter: string) => void | — | Filter change handler
className | string | — | Additional classes

### MetricCardData
Prop | Type | Description
label | string | Metric label
value | string \| number | Display value
trend | { value: number; direction: "up" \| "down" \| "neutral" } | Optional trend badge
alert | boolean | Alert styling (red pulse)

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { TopLineMetrics } from "@handled-ai/design-system"

const metrics = [
  { label: "Active Tasks", value: 142, trend: { value: 12, direction: "up" } },
  { label: "Completed", value: 89 },
]

<TopLineMetrics metrics={metrics} />
```
## Examples
### With Filters and Chart Data
```tsx
<TopLineMetrics
  metrics={[
    { label: "Work Queue", value: 156, trend: { value: 8, direction: "up" } },
  ]}
  filters={["All", "7d", "30d"]}
  activeFilter="7d"
  onFilterChange={setFilter}
  chartData={[
    { date: "01/15", value: 120, secondary: 48 },
    { date: "01/16", value: 145, secondary: 58 },
  ]}
/>
```
### With Alert Metric
```tsx
<TopLineMetrics
  metrics={[
    { label: "Overdue", value: 5, alert: true },
  ]}
/>
```
## Peer Dependencies

- `recharts`
- `lucide-react`
## Internal Dependencies
Button, cn (lib/utils)
## Source
`registry/new-york/ui/top-line-metrics.tsx`

---
**Note:** Client-only. Uses `"use client"`. Chart uses Recharts AreaChart. Generates sample data when chartData is omitted.
