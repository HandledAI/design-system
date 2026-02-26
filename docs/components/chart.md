# Chart
> Recharts-based chart primitives: ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent.
## Import
```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@handled-ai/design-system"
```
## Props

### ChartContainer
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | — | Optional chart id for theming |
| config | ChartConfig | — | Color/label config for series |
| children | ResponsiveContainer children | — | Recharts content |
| ...props | ComponentProps\<"div"\> | — | Div props |

### ChartConfig
```ts
{ [key: string]: { label?: React.ReactNode; icon?: ComponentType } & ({ color?: string } | { theme?: Record<'light'|'dark', string> }) }
```

### ChartTooltipContent
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | boolean | — | From Recharts Tooltip |
| payload | TooltipPayloadItem[] | — | Tooltip data |
| label | string | — | Label override |
| labelFormatter | (value, payload) => ReactNode | — | Custom label formatter |
| formatter | (value, name, item, index, payload) => ReactNode | — | Custom value formatter |
| hideLabel | boolean | false | Hide label |
| hideIndicator | boolean | false | Hide color indicator |
| indicator | "line" \| "dot" \| "dashed" | "dot" | Indicator style |
| nameKey | string | — | Key for name lookup |
| labelKey | string | — | Key for label lookup |
| labelClassName | string | — | Label class |
| color | string | — | Override indicator color |

### ChartLegendContent
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| payload | LegendPayloadItem[] | — | From Recharts Legend |
| verticalAlign | "top" \| "bottom" | "bottom" | Position |
| hideIcon | boolean | false | Hide legend icon |
| nameKey | string | — | Key for name lookup |

## Variants
N/A
## Basic Usage
```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@handled-ai/design-system"

const config = { revenue: { label: "Revenue", color: "#3b82f6" } }

<ChartContainer config={config}>
  {/* BarChart, Bar, XAxis, YAxis from recharts */}
  <ChartTooltip content={<ChartTooltipContent />} />
</ChartContainer>
```

## Examples

### With legend
```tsx
import { ChartContainer, ChartLegend, ChartLegendContent } from "@handled-ai/design-system"

<ChartContainer config={config}>
  <AreaChart data={data}>
    <ChartLegend content={<ChartLegendContent />} />
    ...
  </AreaChart>
</ChartContainer>
```

### Themed config
```tsx
const config = {
  value: {
    label: "Revenue",
    theme: { light: "#3b82f6", dark: "#60a5fa" },
  },
}
```

## Peer Dependencies
- recharts

## Internal Dependencies
None

## Source
`registry/new-york/ui/chart.tsx`

**Client-only:** Yes (`"use client"`)
