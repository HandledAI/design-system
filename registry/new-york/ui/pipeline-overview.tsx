"use client"

import * as React from "react"
import { TrendingUp, Info, ArrowRight } from "lucide-react"
import { ResponsiveSankey } from "@nivo/sankey"

import { cn } from "../../../lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

export interface PipelineStage {
  id: string
  label: string
  count: number
  trend: string
  nextConversion: string | null
}

export interface PipelineStageMetrics {
  medianTime: string
  avgTime: string
  dropOffs: { reason: string; count: number; pct: string }[]
}

export interface PipelineStageTiming {
  median: string
  avg: string
}

export interface PipelineFilterBreakdown {
  [stageId: string]: Record<string, number>
}

interface SegmentColors {
  [key: string]: string
}

const SEGMENT_PALETTE = [
  "#0F4C3A",
  "#15803d",
  "#0ea5e9",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
]

const DROP_OFF_NODES = [
  { id: "Lost/Other", nodeColor: "#CBD5E1" },
  { id: "Coverage", nodeColor: "#F59E0B" },
  { id: "Unqualified", nodeColor: "#F59E0B" },
  { id: "No Contact", nodeColor: "#F59E0B" },
  { id: "Intake Drop", nodeColor: "#F59E0B" },
  { id: "No Show/Cancel", nodeColor: "#F59E0B" },
]

function StageHoverCard({
  title,
  count,
  metrics,
}: {
  title: string
  count: number | string
  metrics?: PipelineStageMetrics
}) {
  return (
    <div className="w-[260px] overflow-hidden rounded-lg border border-slate-100 bg-white font-sans text-left shadow-xl">
      <div className="border-b border-slate-50 p-3">
        <div className="mb-0.5 text-xs font-medium text-slate-500">{title}</div>
        <div className="text-2xl font-bold text-slate-900">{count}</div>
      </div>

      {metrics && (
        <div className="grid grid-cols-2 gap-2 border-b border-slate-50 bg-slate-50/30 px-3 py-2">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
              Median
            </div>
            <div className="text-xs font-bold text-slate-700">
              {metrics.medianTime}
            </div>
          </div>
          <div className="border-l border-slate-100 pl-2">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
              Average
            </div>
            <div className="text-xs font-bold text-slate-700">
              {metrics.avgTime}
            </div>
          </div>
        </div>
      )}

      {metrics?.dropOffs && metrics.dropOffs.length > 0 && (
        <div className="p-2">
          <div className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Drop-off Reasons
          </div>
          <div className="space-y-0.5">
            {metrics.dropOffs.map((drop, i) => (
              <div
                key={i}
                className="group flex cursor-pointer items-center justify-between rounded p-1.5 text-xs transition-colors hover:bg-slate-50"
              >
                <span className="truncate pr-2 text-slate-600 group-hover:text-slate-900">
                  {drop.reason}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">{drop.pct}</span>
                  <span className="inline-flex h-4 min-w-[20px] items-center justify-center rounded border border-slate-200 bg-slate-100 px-1 text-[9px] font-semibold text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700">
                    {drop.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex cursor-pointer items-center justify-between border-t border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-slate-100 hover:text-blue-700">
        View in Work Queue <ArrowRight className="h-3 w-3" />
      </div>
    </div>
  )
}

export interface PipelineOverviewProps {
  title?: string
  stages: PipelineStage[]
  stageMetrics: Record<string, PipelineStageMetrics>
  stageTimings: (PipelineStageTiming | null)[]
  filterOptions?: string[]
  filterBreakdowns?: Record<string, PipelineFilterBreakdown>
  countingModes?: string[]
  countingModeTooltip?: string
  /** Main pipeline flow nodes (after the first stage) */
  flowNodes?: { id: string; nodeColor: string }[]
  /** Drop-off distribution from initial stage: { "Lost/Other": 56, "Coverage": 40, ... } */
  dropOffDistribution?: Record<string, number>
  /** Flow links after the first stage (middle of pipeline onward) */
  flowLinks?: { source: string; target: string; value: number }[]
  totalReceived?: number
  onViewInWorkQueue?: (stageId: string) => void
  className?: string
}

export function PipelineOverview({
  title = "Pipeline Overview",
  stages,
  stageMetrics,
  stageTimings,
  filterOptions = ["Facility", "Source", "Lead Source", "Payer", "Channel"],
  filterBreakdowns,
  countingModes = ["Unique Patients", "All Referrals"],
  countingModeTooltip = "Patients may be referred through multiple channels. 'All Referrals' shows total volume; 'Unique Patients' deduplicates to show distinct patient counts.",
  flowNodes = [
    { id: "Contacted", nodeColor: "#2A8F7A" },
    { id: "Intake Sent", nodeColor: "#3DB4A0" },
    { id: "Intake Done", nodeColor: "#4CC9B0" },
    { id: "Scheduled", nodeColor: "#5FCFBC" },
    { id: "Completed", nodeColor: "#79E2C9" },
  ],
  dropOffDistribution = {
    "Lost/Other": 56,
    Coverage: 40,
    Unqualified: 30,
  },
  flowLinks = [
    { source: "Contacted", target: "Intake Sent", value: 660 },
    { source: "Contacted", target: "No Contact", value: 60 },
    { source: "Intake Sent", target: "Intake Done", value: 612 },
    { source: "Intake Sent", target: "Intake Drop", value: 48 },
    { source: "Intake Done", target: "Scheduled", value: 612 },
    { source: "Scheduled", target: "Completed", value: 520 },
    { source: "Scheduled", target: "No Show/Cancel", value: 92 },
  ],
  totalReceived = 847,
  onViewInWorkQueue,
  className,
}: PipelineOverviewProps) {
  const [selectedFilter, setSelectedFilter] = React.useState(filterOptions[0])
  const [countingMode, setCountingMode] = React.useState(countingModes[0])

  const sankeyData = React.useMemo(() => {
    const breakdown =
      filterBreakdowns?.[selectedFilter]?.received ??
      ({ [stages[0]?.label ?? "Received"]: totalReceived } as Record<
        string,
        number
      >)

    const segments = Object.entries(breakdown).map(([name, value], index) => ({
      id: name,
      nodeColor: SEGMENT_PALETTE[index % SEGMENT_PALETTE.length],
      value,
    }))

    const nodes = [
      ...segments,
      ...flowNodes,
      ...DROP_OFF_NODES,
    ]

    const links: { source: string; target: string; value: number }[] = []

    const totalDrops = Object.values(dropOffDistribution).reduce(
      (a, b) => a + b,
      0,
    )

    segments.forEach((segment) => {
      const ratio = segment.value / totalReceived

      const segDrops: Record<string, number> = {}
      let segTotalDrop = 0
      for (const [reason, count] of Object.entries(dropOffDistribution)) {
        const v = Math.round(count * ratio)
        segDrops[reason] = v
        segTotalDrop += v
      }

      const contacted = Math.max(0, segment.value - segTotalDrop)

      if (contacted > 0) {
        const firstFlowNode = flowNodes[0]?.id ?? "Contacted"
        links.push({
          source: segment.id,
          target: firstFlowNode,
          value: contacted,
        })
      }

      for (const [reason, v] of Object.entries(segDrops)) {
        if (v > 0) links.push({ source: segment.id, target: reason, value: v })
      }
    })

    flowLinks.forEach((link) => links.push({ ...link }))

    return { nodes, links }
  }, [
    selectedFilter,
    filterBreakdowns,
    stages,
    totalReceived,
    flowNodes,
    dropOffDistribution,
    flowLinks,
  ])

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

            {/* Counting Mode Toggle */}
            {countingModes.length > 1 && (
              <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 p-1">
                {countingModes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setCountingMode(mode)}
                    className={cn(
                      "rounded-md px-3 py-1 text-xs font-medium transition-all",
                      countingMode === mode
                        ? "border border-slate-100 bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700",
                    )}
                  >
                    {mode}
                  </button>
                ))}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-3.5 w-3.5 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px] text-xs">
                      {countingModeTooltip}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>

          {/* Filter Tabs */}
          {filterOptions.length > 1 && (
            <div className="flex items-center gap-1 self-start rounded-lg bg-slate-100 p-1 md:self-auto">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedFilter(option)}
                  className={cn(
                    "h-7 rounded-md border-none bg-transparent px-3 text-xs font-medium shadow-none transition-all hover:bg-white",
                    selectedFilter === option &&
                      "bg-white text-slate-900 shadow-sm",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stage Metrics Row */}
      <div className="mb-2 grid gap-4" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
        {stages.map((stage, index) => {
          const details = stageMetrics[stage.id]
          const timing = stageTimings[index] ?? null

          return (
            <TooltipProvider key={stage.id} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group relative flex cursor-pointer flex-col items-center rounded-lg p-2 text-center transition-colors hover:bg-slate-50">
                    <div
                      className="mb-1 w-full truncate text-xs font-medium text-slate-500"
                      title={stage.label}
                    >
                      {stage.label}
                    </div>
                    <div className="mb-1 text-2xl font-bold text-slate-900">
                      {stage.count.toLocaleString()}
                    </div>
                    <div className="mb-1 flex items-center justify-center gap-1 text-xs font-medium text-emerald-600">
                      {stage.trend} <TrendingUp className="h-3 w-3" />
                    </div>

                    {/* Conversion badge + timing between stages */}
                    {index < stages.length - 1 && stage.nextConversion && (
                      <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 flex-col items-center xl:flex">
                        <span className="z-10 whitespace-nowrap rounded-full border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 shadow-sm">
                          {stage.nextConversion}
                        </span>
                        {timing && (
                          <div className="mt-1 flex flex-col items-center">
                            <div className="h-2 w-px bg-slate-200" />
                            <div className="whitespace-nowrap rounded bg-white/80 px-1 py-0.5 text-[9px] font-medium leading-3 text-slate-400 backdrop-blur-[2px]">
                              <span className="mr-1 font-semibold text-slate-500">
                                Med: {timing.median}
                              </span>
                              <span className="text-slate-400">
                                Avg: {timing.avg}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Connector line down to Sankey */}
                    <div className="mx-auto mb-1 mt-2 h-4 w-px bg-slate-100" />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  className="border-none bg-transparent p-0 shadow-none"
                  sideOffset={8}
                >
                  <StageHoverCard
                    title={stage.label}
                    count={stage.count}
                    metrics={details}
                  />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>

      {/* Sankey Chart */}
      <div
        className="relative mt-4 w-full"
        style={{ height: 400, minWidth: 0 }}
      >
        <ResponsiveSankey
          data={sankeyData}
          margin={{ top: 20, right: 120, bottom: 20, left: 140 }}
          align="justify"
          colors={(node: any) => node.nodeColor || "#94a3b8"}
          nodeOpacity={1}
          nodeHoverOthersOpacity={0.35}
          nodeThickness={18}
          nodeSpacing={16}
          nodeBorderWidth={0}
          nodeBorderRadius={3}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          linkContract={3}
          enableLinkGradient
          labelPosition="outside"
          labelOrientation="horizontal"
          labelPadding={16}
          labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
          nodeTooltip={({ node }: any) => (
            <div className="rounded-md border border-slate-200 bg-white p-2 text-xs shadow-lg">
              <span className="mb-1 block font-bold">{node.id}</span>
              <span>{node.value} patients</span>
            </div>
          )}
          linkTooltip={({ link }: any) => (
            <div className="rounded-md border border-slate-200 bg-white p-2 text-xs shadow-lg">
              <span className="mb-1 block font-bold">
                {link.source.id} → {link.target.id}
              </span>
              <span>{link.value} patients</span>
            </div>
          )}
        />
      </div>
    </div>
  )
}
