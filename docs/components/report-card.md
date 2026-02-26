# ReportCard

> A card layout for reports with title, subtitle, filter pills, toggle options, optional header extra slot, and content area.

## Import

```tsx
import { ReportCard } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Card title |
| subtitle | string | — | Optional subtitle below title |
| filterOptions | ReportCardFilterOption[] | — | Filter pill group (top-right) |
| selectedFilter | string | — | Selected filter value |
| onFilterChange | (value: string) => void | — | Filter change handler |
| toggleOptions | string[] | — | Secondary toggle options (e.g. metric selector) |
| selectedToggle | string | — | Selected toggle value |
| onToggleChange | (value: string) => void | — | Toggle change handler |
| headerExtra | React.ReactNode | — | Slot between header and content |
| children | React.ReactNode | — | Main content |
| className | string | — | Additional CSS for root |
| contentClassName | string | — | Additional CSS for content area |

**ReportCardFilterOption:** `{ label: string; value: string }`

Client-only: Yes (`"use client"`).

## Variants

N/A

## Basic Usage

```tsx
import { ReportCard } from "@handled-ai/design-system"

<ReportCard title="Pipeline Overview" subtitle="Last 30 days">
  <div>Chart or table content</div>
</ReportCard>
```

## Examples

### With filters and toggle

```tsx
import { ReportCard } from "@handled-ai/design-system"

<ReportCard
  title="Revenue"
  subtitle="By region"
  filterOptions={[
    { label: "This month", value: "month" },
    { label: "This quarter", value: "quarter" },
  ]}
  selectedFilter={filter}
  onFilterChange={setFilter}
  toggleOptions={["Revenue", "Units"]}
  selectedToggle={metric}
  onToggleChange={setMetric}
>
  <RevenueChart data={data} />
</ReportCard>
```

### With header extra slot

```tsx
import { ReportCard } from "@handled-ai/design-system"

<ReportCard
  title="Conversion Report"
  headerExtra={<Badge>Live</Badge>}
>
  <ConversionTable />
</ReportCard>
```

## Peer Dependencies

None beyond base peer dependencies.

## Internal Dependencies

None

## Source

`registry/new-york/ui/report-card.tsx`
