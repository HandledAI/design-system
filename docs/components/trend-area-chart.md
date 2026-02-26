# TrendAreaChart
> Multi-series area chart with grid, axis, and custom tooltip.
## Import
```tsx
import {
  TrendAreaChart,
  type TrendSeries,
  type TrendAreaChartProps,
} from "@handled-ai/design-system"
```
## Props
Prop | Type | Default | Description
data | Record&lt;string, unknown&gt;[] | — | Chart data rows
series | TrendSeries[] | — | Series config (dataKey, color, label?, fillOpacity?)
height | number | 250 | Chart height in px
xAxisKey | string | "date" | Key for x-axis
showGrid | boolean | true | Show horizontal grid lines
yDomain | [number, number] | — | Y-axis domain override
tooltipFormatter | (value: number \| string, name: string) => [string, string] | — | Custom tooltip format
className | string | — | Additional classes

### TrendSeries
Prop | Type | Description
dataKey | string | Key in data object
color | string | Stroke/fill color (hex)
label | string | Display name
fillOpacity | number | Fill opacity (default 0.15)

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { TrendAreaChart } from "@handled-ai/design-system"

const data = [
  { date: "Jan", revenue: 1200, cost: 800 },
  { date: "Feb", revenue: 1500, cost: 900 },
]

const series = [
  { dataKey: "revenue", color: "#10b981", label: "Revenue" },
  { dataKey: "cost", color: "#f97316", label: "Cost" },
]

<TrendAreaChart data={data} series={series} />
```
## Examples
### With Custom Tooltip
```tsx
<TrendAreaChart
  data={weeklyData}
  series={[{ dataKey: "value", color: "#6366f1" }]}
  tooltipFormatter={(val, name) => [`$${Number(val).toLocaleString()}`, name]}
  height={200}
/>
```
### With Y-Domain
```tsx
<TrendAreaChart
  data={data}
  series={series}
  yDomain={[0, 100]}
  showGrid={false}
/>
```
## Peer Dependencies
recharts
## Internal Dependencies
cn (lib/utils), chart-tooltip (CHART_TOOLTIP_STYLE, CHART_CURSOR_STYLE)
## Source
`registry/new-york/ui/trend-area-chart.tsx`

---
**Note:** Client-only. Uses `"use client"`. Requires recharts ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip.
