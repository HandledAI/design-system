# DonutChart

> Recharts-based donut/pie chart for segment data. Client-only (uses ResponsiveContainer).

## Import

```tsx
import { DonutChart, DonutSegment } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | DonutSegment[] | — | Segments: `{ name, value, color }` |
| centerLabel | string \| number | — | Center text (e.g. total) |
| size | number | 80 | Chart diameter in px |
| innerRadius | number | size * 0.325 | Inner radius |
| outerRadius | number | size * 0.45 | Outer radius |
| paddingAngle | number | 2 | Gap between segments |
| showTooltip | boolean | true | Show hover tooltip |
| showLegend | boolean | false | Inline legend beside chart |
| className | string | — | Wrapper classes |

### DonutSegment

```ts
{ name: string; value: number; color: string }
```

## Variants (if applicable)

- **Compact** (default): Chart only, optional center label.
- **With legend**: `showLegend={true}` — legend shown to the right. Legend labels use `whitespace-nowrap` for better readability of long names.

## Basic Usage

```tsx
const data = [
  { name: "Active", value: 65, color: "#22c55e" },
  { name: "Pending", value: 25, color: "#f59e0b" },
  { name: "Churned", value: 10, color: "#ef4444" },
]
<DonutChart data={data} centerLabel="100" />
```

## Examples

**Status breakdown**

```tsx
<DonutChart
  data={[
    { name: "Completed", value: 520, color: "#22c55e" },
    { name: "In Progress", value: 92, color: "#f59e0b" },
    { name: "No Show", value: 48, color: "#94a3b8" },
  ]}
  centerLabel={660}
  size={100}
  showLegend
/>
```

**Small inline metric**

```tsx
<DonutChart
  data={[
    { name: "A", value: 40, color: "#0ea5e9" },
    { name: "B", value: 60, color: "#8b5cf6" },
  ]}
  centerLabel="%"
  size={60}
  showTooltip={false}
/>
```

## Peer Dependencies

- `recharts`

## Internal Dependencies

- `chart-tooltip` (CHART_TOOLTIP_STYLE)

## Source

`registry/new-york/ui/donut-chart.tsx`

**Client-only:** Uses `"use client"`; render in client components only.
