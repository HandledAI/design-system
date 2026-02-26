"use client"

import * as React from "react"
import { ResponsiveSankey } from "@nivo/sankey"

import { cn } from "../../../lib/utils"

export interface SankeyNode {
  id: string
  nodeColor?: string
}

export interface SankeyLink {
  source: string
  target: string
  value: number
}

export interface SankeyData {
  nodes: SankeyNode[]
  links: SankeyLink[]
}

export interface SankeyDropOff {
  reason: string
  count: number
  pct?: string
}

export interface SankeyStageMetrics {
  conversion: string
  medianTime: string
  avgTime: string
}

export interface SankeyHoverCardData {
  title: string
  count: number | string
  metrics?: SankeyStageMetrics
  dropOffs?: SankeyDropOff[]
}

interface HoveredNodeState {
  id: string
  x: number
  y: number
  data: SankeyHoverCardData
  pinned?: boolean
}

interface SankeyChartProps {
  data: SankeyData
  height?: number
  nodeOpacity?: number
  nodeThickness?: number
  nodeBorderWidth?: number
  linkOpacity?: number
  linkHoverOpacity?: number
  enableLabels?: boolean
  labelTextColor?: string
  stageMetrics?: Record<string, { metrics: SankeyStageMetrics; dropOffs: SankeyDropOff[] }>
  onDropOffClick?: (reason: string) => void
  onViewDetails?: (nodeId: string) => void
  className?: string
}

function HoverCard({
  data,
  position,
  onDropOffClick,
  onViewDetails,
}: {
  data: SankeyHoverCardData
  position: { x: number; y: number }
  onDropOffClick?: (reason: string) => void
  onViewDetails?: () => void
}) {
  return (
    <div
      className="pointer-events-auto absolute z-50 w-[260px] overflow-hidden rounded-lg border border-slate-100 bg-white font-sans text-left shadow-xl"
      style={{ left: position.x + 10, top: position.y - 40 }}
    >
      <div className="border-b border-slate-50 p-3">
        <div className="mb-0.5 text-xs font-medium text-slate-500">
          {data.title}
        </div>
        <div className="text-2xl font-bold text-slate-900">{data.count}</div>
      </div>

      {data.metrics ? (
        <div className="grid grid-cols-3 gap-2 border-b border-slate-50 bg-slate-50/30 px-3 py-2">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
              Conversion
            </div>
            <div className="text-xs font-bold text-emerald-600">
              {data.metrics.conversion}
            </div>
          </div>
          <div className="border-l border-slate-100 pl-2">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
              Median
            </div>
            <div className="text-xs font-bold text-slate-700">
              {data.metrics.medianTime}
            </div>
          </div>
          <div className="border-l border-slate-100 pl-2">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
              Average
            </div>
            <div className="text-xs font-bold text-slate-700">
              {data.metrics.avgTime}
            </div>
          </div>
        </div>
      ) : null}

      {data.dropOffs && data.dropOffs.length > 0 ? (
        <div className="p-2">
          <div className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Drop-off Reasons
          </div>
          <div className="space-y-0.5">
            {data.dropOffs.map((drop, i) => (
              <div
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  onDropOffClick?.(drop.reason)
                }}
                className="group flex cursor-pointer items-center justify-between rounded p-1.5 text-xs transition-colors hover:bg-slate-50"
              >
                <span className="truncate pr-2 text-slate-600 group-hover:text-slate-900">
                  {drop.reason}
                </span>
                <div className="flex items-center gap-1.5">
                  {drop.pct ? (
                    <span className="text-[10px] text-slate-400">
                      {drop.pct}
                    </span>
                  ) : null}
                  <span className="inline-flex h-4 min-w-[20px] items-center justify-center rounded border border-slate-200 bg-slate-100 px-1 text-[9px] font-semibold text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700">
                    {drop.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {onViewDetails ? (
        <div
          onClick={(e) => {
            e.stopPropagation()
            onViewDetails()
          }}
          className="flex cursor-pointer items-center justify-between border-t border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-slate-100 hover:text-blue-700"
        >
          View Details
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      ) : null}
    </div>
  )
}

export function SankeyChart({
  data,
  height = 400,
  nodeOpacity = 1,
  nodeThickness = 18,
  nodeBorderWidth = 0,
  linkOpacity = 0.25,
  linkHoverOpacity = 0.5,
  enableLabels = true,
  labelTextColor = "#334155",
  stageMetrics,
  onDropOffClick,
  onViewDetails,
  className,
}: SankeyChartProps) {
  const [hoveredNode, setHoveredNode] = React.useState<HoveredNodeState | null>(
    null,
  )
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleNodeHover = React.useCallback(
    (node: any, event: React.MouseEvent) => {
      if (hoveredNode?.pinned) return

      const containerRect = containerRef.current?.getBoundingClientRect()
      if (!containerRect) return

      const nodeId = node.id as string
      const stageKey = nodeId.toLowerCase().replace(/[^a-z]/g, "")
      const meta = stageMetrics?.[stageKey] || stageMetrics?.[nodeId]

      const hoverData: SankeyHoverCardData = {
        title: nodeId,
        count: node.value ?? 0,
        metrics: meta?.metrics,
        dropOffs: meta?.dropOffs,
      }

      setHoveredNode({
        id: nodeId,
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
        data: hoverData,
      })
    },
    [hoveredNode?.pinned, stageMetrics],
  )

  const handleNodeLeave = React.useCallback(() => {
    if (!hoveredNode?.pinned) {
      setHoveredNode(null)
    }
  }, [hoveredNode?.pinned])

  const handleClick = React.useCallback(() => {
    if (hoveredNode?.pinned) {
      setHoveredNode(null)
    } else if (hoveredNode) {
      setHoveredNode((prev) => (prev ? { ...prev, pinned: true } : null))
    }
  }, [hoveredNode])

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height }}
      onClick={handleClick}
    >
      <ResponsiveSankey
        data={data}
        margin={{ top: 20, right: 160, bottom: 20, left: 20 }}
        align="justify"
        colors={(node: any) => node.nodeColor || "#94a3b8"}
        nodeOpacity={nodeOpacity}
        nodeHoverOpacity={1}
        nodeThickness={nodeThickness}
        nodeSpacing={24}
        nodeBorderWidth={nodeBorderWidth}
        nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
        nodeBorderRadius={3}
        linkOpacity={linkOpacity}
        linkHoverOpacity={linkHoverOpacity}
        linkHoverOthersOpacity={0.1}
        linkContract={3}
        enableLinkGradient
        labelPosition="outside"
        labelOrientation="horizontal"
        labelPadding={16}
        labelTextColor={labelTextColor}
        enableLabels={enableLabels}
        animate
        {...({ onNodeMouseEnter: handleNodeHover, onNodeMouseLeave: handleNodeLeave } as any)}
      />

      {hoveredNode ? (
        <HoverCard
          data={hoveredNode.data}
          position={{ x: hoveredNode.x, y: hoveredNode.y }}
          onDropOffClick={onDropOffClick}
          onViewDetails={
            onViewDetails
              ? () => onViewDetails(hoveredNode.id)
              : undefined
          }
        />
      ) : null}
    </div>
  )
}
