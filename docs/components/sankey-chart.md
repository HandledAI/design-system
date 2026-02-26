# SankeyChart

> A flow diagram for visualizing stage-based funnels with hover cards showing metrics and drop-off reasons. Uses @nivo/sankey. Client-only.

## Import

```tsx
import {
  SankeyChart,
  type SankeyData,
  type SankeyNode,
  type SankeyLink,
  type SankeyHoverCardData,
} from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | SankeyData | — | Nodes and links for the chart |
| height | number | 400 | Chart height in pixels |
| nodeOpacity | number | 1 | Node opacity |
| nodeThickness | number | 18 | Node thickness |
| nodeBorderWidth | number | 0 | Node border width |
| linkOpacity | number | 0.25 | Link opacity |
| linkHoverOpacity | number | 0.5 | Link opacity on hover |
| enableLabels | boolean | true | Show node labels |
| labelTextColor | string | "#334155" | Label color |
| stageMetrics | Record<string, { metrics: SankeyStageMetrics; dropOffs: SankeyDropOff[] }> | — | Per-stage metrics for hover card |
| onDropOffClick | (reason: string) => void | — | Called when user clicks a drop-off reason |
| onViewDetails | (nodeId: string) => void | — | Called when user clicks "View Details" |
| className | string | — | Additional CSS classes |

**SankeyNode:** `{ id: string; nodeColor?: string }`  
**SankeyLink:** `{ source: string; target: string; value: number }`  
**SankeyData:** `{ nodes: SankeyNode[]; links: SankeyLink[] }`  
**SankeyStageMetrics:** `{ conversion: string; medianTime: string; avgTime: string }`  
**SankeyDropOff:** `{ reason: string; count: number; pct?: string }`

## Variants

N/A

## Basic Usage

```tsx
import { SankeyChart } from "@handled-ai/design-system"

const data = {
  nodes: [
    { id: "Applied" },
    { id: "Screened" },
    { id: "Interviewed" },
    { id: "Offer" },
    { id: "Hired" },
  ],
  links: [
    { source: "Applied", target: "Screened", value: 100 },
    { source: "Screened", target: "Interviewed", value: 60 },
    { source: "Interviewed", target: "Offer", value: 25 },
    { source: "Offer", target: "Hired", value: 20 },
  ],
}
<SankeyChart data={data} height={400} />
```

## Examples

### With stage metrics and drop-off handlers

```tsx
import { SankeyChart } from "@handled-ai/design-system"

<SankeyChart
  data={data}
  height={500}
  stageMetrics={{
    screened: {
      metrics: { conversion: "60%", medianTime: "2d", avgTime: "2.5d" },
      dropOffs: [
        { reason: "No response", count: 25, pct: "63%" },
        { reason: "Not qualified", count: 15, pct: "37%" },
      ],
    },
  }}
  onDropOffClick={(reason) => filterByReason(reason)}
  onViewDetails={(nodeId) => openDetails(nodeId)}
/>
```

### Custom styling

```tsx
import { SankeyChart } from "@handled-ai/design-system"

<SankeyChart
  data={data}
  nodeOpacity={0.9}
  nodeThickness={24}
  linkOpacity={0.3}
  enableLabels={true}
  className="rounded-lg border"
/>
```

## Peer Dependencies

- `@nivo/sankey` (>=0.80.0)
- `@nivo/core` (>=0.80.0)
- `tailwind-merge` (via cn utility)

## Internal Dependencies

- `cn` utility

## Source

`registry/new-york/ui/sankey-chart.tsx`

**Note:** Client-only component. Requires @nivo/sankey and @nivo/core as peer dependencies.
