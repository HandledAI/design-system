# PipelineOverview
> Displays stage-based pipeline counts, transitions, and conversion context in a single overview panel.

## Import
```tsx
import { PipelineOverview } from "@handled-ai/design-system"
```

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"Pipeline Overview"` | Section title shown above the pipeline. |
| `stages` | `PipelineStage[]` | Required | Stage columns with counts and trend values. |
| `stageMetrics` | `Record<string, PipelineStageMetrics>` | Required | Per-stage conversion and timing metrics. |
| `stageTimings` | `Record<string, PipelineStageTiming>` | Required | Median and average timing by stage. |
| `filterOptions` | `string[]` | Source-defined defaults | Optional filters for stage breakdown controls. |
| `filterBreakdowns` | `PipelineFilterBreakdown` | `{}` | Optional stage-specific breakdown data. |
| `countingModes` | `string[]` | Source-defined defaults | Available counting mode labels. |
| `countingModeTooltip` | `string` | Source-defined default | Help text shown for counting mode behavior. |
| `flowNodes` | `string[]` | Source-defined defaults | Labels for flow node visualization. |
| `dropOffDistribution` | `number[]` | Source-defined defaults | Optional distribution values for drop-off charting. |
| `flowLinks` | `{ source: number; target: number; value: number }[]` | Source-defined defaults | Link definitions between flow nodes. |
| `totalReceived` | `number` | Source-defined default | Total incoming volume used in top-level summary. |
| `nodeAmounts` | `Record<string, string>` | `undefined` | Dollar amounts to display on terminal node labels and tooltips (e.g. `{ "Retained": "$18.2M" }`). |
| `unitLabel` | `string` | `"items"` | Unit noun for standard node/link tooltips (e.g. `"signals"`, `"accounts"`). |
| `terminalUnitLabel` | `string` | Same as `unitLabel` | Unit noun for terminal/drop-off node tooltips (e.g. `"opportunities"`). |
| `terminalNodeIds` | `string[]` | Keys of `dropOffDistribution` | Node IDs that should use `terminalUnitLabel` instead of `unitLabel`. |
| `sankeyMargin` | `{ top?: number; right?: number; bottom?: number; left?: number }` | `{ top: 20, right: 120, bottom: 20, left: 140 }` | Sankey chart margins. Merged with defaults so consumers can override individual sides. |
| `sankeyLabelPadding` | `number` | `16` | Gap between Sankey node bar and its outside label. |
| `alwaysShowConversionBadges` | `boolean` | `false` | When `true`, conversion badges between stages use `flex`. When `false`, use `hidden xl:flex`. |
| `dropOffNodeColor` | `string` | `"#F59E0B"` | Color for dynamically generated drop-off nodes from `dropOffDistribution` keys. |
| `onViewInWorkQueue` | `(stageId: string) => void` | `undefined` | Callback for "view in work queue" action. |
| `className` | `string` | `undefined` | Additional class names for wrapper styling. |

Client-only: Yes (`"use client"`).

## Variants (if applicable)
This component does not expose CVA variants.

## Basic Usage
```tsx
import {
  PipelineOverview,
  type PipelineStage,
  type PipelineStageMetrics,
  type PipelineStageTiming,
} from "@handled-ai/design-system"

const stages: PipelineStage[] = [
  { id: "new", label: "New", count: 120, trend: "+12%" },
  { id: "review", label: "In Review", count: 64, trend: "+3%", nextConversion: 0.53 },
  { id: "won", label: "Closed Won", count: 22, trend: "+5%" },
]

const stageMetrics: Record<string, PipelineStageMetrics> = {
  new: { conversion: 0.53, medianTime: "1.2d", avgTime: "1.8d", dropOffs: [] },
  review: { conversion: 0.34, medianTime: "2.1d", avgTime: "2.9d", dropOffs: [] },
  won: { conversion: 1, medianTime: "0.6d", avgTime: "0.8d", dropOffs: [] },
}

const stageTimings: Record<string, PipelineStageTiming> = {
  new: { median: "1.2d", avg: "1.8d" },
  review: { median: "2.1d", avg: "2.9d" },
  won: { median: "0.6d", avg: "0.8d" },
}

<PipelineOverview stages={stages} stageMetrics={stageMetrics} stageTimings={stageTimings} />
```

## Examples
```tsx
import { PipelineOverview } from "@handled-ai/design-system"

<PipelineOverview
  title="Referrals Pipeline"
  stages={[
    { id: "received", label: "Received", count: 230, trend: "+9%" },
    { id: "scheduled", label: "Scheduled", count: 98, trend: "+4%", nextConversion: 0.42 },
  ]}
  stageMetrics={{
    received: { conversion: 0.42, medianTime: "8h", avgTime: "11h", dropOffs: [] },
    scheduled: { conversion: 1, medianTime: "2h", avgTime: "3h", dropOffs: [] },
  }}
  stageTimings={{
    received: { median: "8h", avg: "11h" },
    scheduled: { median: "2h", avg: "3h" },
  }}
  onViewInWorkQueue={() => console.log("open queue")}
/>
```

```tsx
import { PipelineOverview } from "@handled-ai/design-system"

<PipelineOverview
  stages={[
    { id: "lead", label: "Lead", count: 300, trend: "+15%" },
    { id: "qualified", label: "Qualified", count: 144, trend: "+7%", nextConversion: 0.48 },
    { id: "proposal", label: "Proposal", count: 58, trend: "+2%", nextConversion: 0.4 },
  ]}
  stageMetrics={{
    lead: { conversion: 0.48, medianTime: "1.1d", avgTime: "1.6d", dropOffs: [] },
    qualified: { conversion: 0.4, medianTime: "2.4d", avgTime: "2.9d", dropOffs: [] },
    proposal: { conversion: 1, medianTime: "1.7d", avgTime: "2.1d", dropOffs: [] },
  }}
  stageTimings={{
    lead: { median: "1.1d", avg: "1.6d" },
    qualified: { median: "2.4d", avg: "2.9d" },
    proposal: { median: "1.7d", avg: "2.1d" },
  }}
  countingModes={["Current", "Trailing 30d"]}
/>
```

### With custom unit labels and Sankey configuration
```tsx
import { PipelineOverview } from "@handled-ai/design-system"

<PipelineOverview
  stages={stages}
  stageMetrics={stageMetrics}
  stageTimings={stageTimings}
  unitLabel="signals"
  terminalUnitLabel="opportunities"
  terminalNodeIds={["Won", "Lost"]}
  nodeAmounts={{ Won: "$4.2M", Lost: "$1.1M" }}
  sankeyMargin={{ left: 160 }}
  sankeyLabelPadding={20}
  alwaysShowConversionBadges
  dropOffNodeColor="#EF4444"
/>
```

## Peer Dependencies
- `@nivo/sankey`
- `lucide-react`

## Internal Dependencies
- `tooltip`

## Source
- `registry/new-york/ui/pipeline-overview.tsx`
