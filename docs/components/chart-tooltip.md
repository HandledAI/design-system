# SimpleChartTooltip
> Standalone chart tooltip for Recharts (SimpleChartTooltip) plus style constants.
## Import
```tsx
import { SimpleChartTooltip, CHART_TOOLTIP_STYLE, CHART_CURSOR_STYLE } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | boolean | — | Whether tooltip is active |
| payload | ChartTooltipEntry[] | — | Tooltip entries from Recharts |
| label | string | — | Optional label |
| formatter | (value, name) => [string, string] | — | Custom display formatter; returns [displayValue, displayName] |
| className | string | — | Additional classes |

### ChartTooltipEntry
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | — | Series name |
| value | number \| string | — | Value |
| dataKey | string | — | Data key |
| color | string | — | Color |
| stroke | string | — | Stroke color |
| fill | string | — | Fill color |

## Variants
N/A
## Basic Usage
```tsx
import { SimpleChartTooltip } from "@handled-ai/design-system"

// Use inside recharts BarChart with Tooltip:
// <BarChart data={data}>
//   <Tooltip content={<SimpleChartTooltip />} />
//   <Bar dataKey="value" fill="#3b82f6" />
// </BarChart>
```

## Examples

### With formatter
```tsx
import { SimpleChartTooltip } from "@handled-ai/design-system"

<Tooltip
  content={
    <SimpleChartTooltip
      formatter={(value, name) => [`$${value}`, name === "revenue" ? "Revenue" : name]}
    />
  }
/>
```

### Style constants
```tsx
import { CHART_TOOLTIP_STYLE, CHART_CURSOR_STYLE } from "@handled-ai/design-system"

// Use for custom tooltip/cursor styling
<Tooltip contentStyle={CHART_TOOLTIP_STYLE} cursor={CHART_CURSOR_STYLE} />
```

## Peer Dependencies
None beyond base peer dependencies.

## Internal Dependencies
None

## Source
`registry/new-york/ui/chart-tooltip.tsx`

**Client-only:** Yes (`"use client"`)
