# BarChartComponent
> Responsive bar chart built with Recharts, with optional grid, legend, and custom tooltip.
## Import
```tsx
import { BarChartComponent } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | Record\<string, unknown\>[] | — | Chart data rows |
| bars | BarSeries[] | — | Bar series config |
| height | number | 280 | Chart height in px |
| xAxisKey | string | "date" | Data key for x-axis |
| showGrid | boolean | true | Show Cartesian grid |
| showLegend | boolean | true | Show legend |
| barGap | number | 2 | Gap between bars |
| className | string | — | Wrapper class |

### BarSeries
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| dataKey | string | — | Key in data for values |
| color | string | — | Bar fill color |
| name | string | — | Display name in tooltip/legend |
| icon | React.ComponentType\<{ className?: string }\> | — | Optional icon for legend |
| barSize | number | — | Bar width (default ~12) |

## Variants
N/A
## Basic Usage
```tsx
import { BarChartComponent } from "@handled-ai/design-system"

<BarChartComponent
  data={[
    { date: "Jan", revenue: 100, cost: 60 },
    { date: "Feb", revenue: 120, cost: 70 },
  ]}
  bars={[
    { dataKey: "revenue", color: "#3b82f6", name: "Revenue" },
    { dataKey: "cost", color: "#94a3b8", name: "Cost" },
  ]}
/>
```

## Examples

### Multiple bars with custom height
```tsx
import { BarChartComponent } from "@handled-ai/design-system"

<BarChartComponent
  data={chartData}
  bars={[
    { dataKey: "a", color: "#10b981", name: "Series A", barSize: 16 },
    { dataKey: "b", color: "#6366f1", name: "Series B" },
  ]}
  height={320}
  showGrid={false}
/>
```

### With icon in legend
```tsx
import { BarChartComponent } from "@handled-ai/design-system"

const GrowthIcon = () => <span className="size-4" aria-hidden>↑</span>
<BarChartComponent
  data={data}
  bars={[
    { dataKey: "value", color: "#3b82f6", name: "Growth", icon: GrowthIcon },
  ]}
/>
```

## Peer Dependencies
- recharts

## Internal Dependencies
None

## Source
`registry/new-york/ui/bar-chart-component.tsx`

**Client-only:** Yes (`"use client"`)
