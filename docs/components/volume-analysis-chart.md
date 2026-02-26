# VolumeAnalysisChart
> Stacked or grouped area chart for volume analysis with optional title and subtitle.
## Import
```tsx
import {
  VolumeAnalysisChart,
  type VolumeDataKey,
  type VolumeAnalysisChartProps,
} from "@handled-ai/design-system"
```
## Props
Prop | Type | Default | Description
data | Record&lt;string, unknown&gt;[] | — | Chart data rows
dataKeys | VolumeDataKey[] | — | Series config (key, color)
height | number | 250 | Chart height in px
xAxisKey | string | "date" | Key for x-axis
stacked | boolean | true | Stack areas (true) or overlay (false)
title | string | — | Chart title
subtitle | string | — | Chart subtitle
className | string | — | Additional classes

### VolumeDataKey
Prop | Type | Description
key | string | Key in data object
color | string | Fill/stroke color (hex)

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { VolumeAnalysisChart } from "@handled-ai/design-system"

const data = [
  { date: "Mon", inbound: 40, outbound: 25 },
  { date: "Tue", inbound: 55, outbound: 30 },
]

const dataKeys = [
  { key: "inbound", color: "#10b981" },
  { key: "outbound", color: "#6366f1" },
]

<VolumeAnalysisChart data={data} dataKeys={dataKeys} />
```
## Examples
### Stacked with Title
```tsx
<VolumeAnalysisChart
  data={volumeByWeek}
  dataKeys={[
    { key: "calls", color: "#0ea5e9" },
    { key: "emails", color: "#8b5cf6" },
    { key: "meetings", color: "#f59e0b" },
  ]}
  title="Activity Volume"
  subtitle="Calls, emails, and meetings by week"
  stacked
/>
```
### Overlaid (Non-Stacked)
```tsx
<VolumeAnalysisChart
  data={data}
  dataKeys={[
    { key: "seriesA", color: "#ef4444" },
    { key: "seriesB", color: "#22c55e" },
  ]}
  stacked={false}
/>
```
## Peer Dependencies
recharts
## Internal Dependencies
cn (lib/utils), chart-tooltip (CHART_TOOLTIP_STYLE)
## Source
`registry/new-york/ui/volume-analysis-chart.tsx`

---
**Note:** Client-only. Uses `"use client"`. Uses Recharts AreaChart. Tooltip styling from chart-tooltip.
