"use client"

import * as React from "react"
import {
  PieChart,
  Pie,
  Cell,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { cn } from "../../../lib/utils"
import { CHART_TOOLTIP_STYLE } from "./chart-tooltip"

export interface DonutSegment {
  name: string
  value: number
  color: string
}

export interface DonutChartProps {
  data: DonutSegment[]
  centerLabel?: string | number
  size?: number
  innerRadius?: number
  outerRadius?: number
  paddingAngle?: number
  showTooltip?: boolean
  showLegend?: boolean
  className?: string
}

export function DonutChart({
  data,
  centerLabel,
  size = 80,
  innerRadius,
  outerRadius,
  paddingAngle = 2,
  showTooltip = true,
  showLegend = false,
  className,
}: DonutChartProps) {
  const computedInner = innerRadius ?? Math.round(size * 0.325)
  const computedOuter = outerRadius ?? Math.round(size * 0.45)

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="shrink-0" style={{ height: size, width: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {showTooltip ? (
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                itemStyle={{ color: "#0f172a", fontWeight: 600 }}
                formatter={(value: unknown, name: unknown) => [
                  `${value}`,
                  String(name),
                ]}
              />
            ) : null}
            <Pie
              data={data}
              innerRadius={computedInner}
              outerRadius={computedOuter}
              paddingAngle={paddingAngle}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              {centerLabel != null ? (
                <Label
                  value={String(centerLabel)}
                  position="center"
                  className="fill-slate-900 text-lg font-bold"
                />
              ) : null}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {showLegend ? (
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 pl-1">
          {data.map((d) => (
            <div
              key={d.name}
              className="flex items-center justify-between text-[10px]"
            >
              <div className="flex min-w-0 items-center gap-1.5">
                <div
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span
                  className="truncate font-medium text-slate-600"
                  title={d.name}
                >
                  {d.name}
                </span>
              </div>
              <span className="ml-1.5 font-bold text-slate-900">{d.value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
