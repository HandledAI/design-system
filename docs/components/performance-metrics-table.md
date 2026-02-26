# PerformanceMetricsTable

> Table for performance metrics: entity column, primary goal with progress bar, rate, and metric columns. Includes view/sort/role filters and pagination.

## Import

```tsx
import {
  PerformanceMetricsTable,
  type PerformanceMetricsTableRow,
  type PerformanceMetricsTableSortOption,
} from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "Performance Table" | Table title |
| entityColumnLabel | string | "Entity" | Entity column header |
| primaryMetricColumnLabel | string | "Primary Goal" | Primary metric header |
| rateColumnLabel | string | "Rate" | Rate column header |
| metricOneColumnLabel | string | "Metric One" | — |
| metricTwoColumnLabel | string | "Metric Two" | — |
| metricThreeColumnLabel | string | "Metric Three" | — |
| metricFourColumnLabel | string | "Metric Four" | — |
| viewOptions | string[] | ["By Entity"] | View dropdown options |
| roleOptions | string[] | — | Role filter options |
| sortOptions | PerformanceMetricsTableSortOption[] | — | Sort dropdown options |
| rows | PerformanceMetricsTableRow[] | DEFAULT_ROWS | Table data |
| pageSize | number | 6 | Rows per page |
| searchPlaceholder | string | "Search rows..." | Search input placeholder |

### PerformanceMetricsTableRow

```ts
{
  id: string
  label: string
  avatarFallback: string
  role?: string
  primaryValue: number
  primaryTarget: number
  ratePercent: number
  metricOne: number
  metricTwo: string
  metricThree: number
  metricFour: number
}
```

### PerformanceMetricsTableSortOption

```ts
{ id: "primary-desc" | "primary-asc" | "rate-desc" | "metric-four-desc"; label: string }
```

## Variants (if applicable)

Progress bar color by primary/target ratio: emerald (≥80%), amber (≥65%), red (<65%).

## Basic Usage

```tsx
<PerformanceMetricsTable
  title="Team Performance"
  rows={rows}
  pageSize={10}
/>
```

## Examples

**Custom column labels**

```tsx
<PerformanceMetricsTable
  title="SDR Metrics"
  entityColumnLabel="Rep"
  primaryMetricColumnLabel="Calls"
  rateColumnLabel="Hit Rate"
  metricOneColumnLabel="Meetings"
  metricTwoColumnLabel="Avg Talk"
  metricThreeColumnLabel="Follow-ups"
  metricFourColumnLabel="Deals"
  rows={repRows}
/>
```

**Filtered by role**

```tsx
<PerformanceMetricsTable
  roleOptions={["All", "Senior Coordinator", "Coordinator", "Junior Coordinator"]}
  rows={teamRows}
  searchPlaceholder="Search reps..."
/>
```

**Horizontal scroll**

Table uses ScrollArea with horizontal ScrollBar for narrow viewports.

## Peer Dependencies

- `lucide-react`
- `@handled-ai/design-system` (Avatar, Button, DropdownMenu, Input, ScrollArea, Table)

## Internal Dependencies

- Avatar, Button, DropdownMenu, Input
- ScrollArea, ScrollBar
- Table, TableBody, TableCell, TableHead, TableHeader, TableRow

## Source

`registry/new-york/ui/performance-metrics-table.tsx`

**Client-only:** Uses `"use client"`.
