"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { cn } from "@/lib/utils"
import { CHART_TOOLTIP_STYLE, CHART_CURSOR_STYLE } from "./chart-tooltip"

export interface TrendSeries {
  dataKey: string
  color: string
  label?: string
  fillOpacity?: number
}

export interface TrendAreaChartProps {
  data: Record<string, unknown>[]
  series: TrendSeries[]
  height?: number
  xAxisKey?: string
  showGrid?: boolean
  yDomain?: [number, number]
  tooltipFormatter?: (value: number | string, name: string) => [string, string]
  className?: string
}

export function TrendAreaChart({
  data,
  series,
  height = 250,
  xAxisKey = "date",
  showGrid = true,
  yDomain,
  tooltipFormatter,
  className,
}: TrendAreaChartProps) {
  const chartId = React.useId().replace(/:/g, "")

  const CustomTooltip = React.useCallback(
    ({ active, payload, label }: any) => {
      if (!active || !payload || !payload.length) return null

      return (
        <div
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md"
          style={{ fontSize: "12px" }}
        >
          {label ? (
            <p className="mb-1 text-xs font-medium text-slate-600">{label}</p>
          ) : null}
          {payload.map((entry: any, i: number) => {
            const val = entry.value
            const name = entry.name || entry.dataKey
            const [displayValue, displayName] = tooltipFormatter
              ? tooltipFormatter(val, name)
              : [String(val), name]
            return (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: entry.color || entry.stroke }}
                />
                <span className="text-xs font-medium text-slate-900">
                  {displayName}: {displayValue}
                </span>
              </div>
            )
          })}
        </div>
      )
    },
    [tooltipFormatter],
  )

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            {series.map((s, i) => (
              <linearGradient
                key={s.dataKey}
                id={`trend-${chartId}-${i}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={s.color}
                  stopOpacity={s.fillOpacity ?? 0.15}
                />
                <stop offset="95%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          {showGrid ? (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
          ) : null}
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#64748b" }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#64748b" }}
            domain={yDomain}
          />
          <Tooltip
            content={tooltipFormatter ? <CustomTooltip /> : undefined}
            contentStyle={tooltipFormatter ? undefined : CHART_TOOLTIP_STYLE}
            cursor={CHART_CURSOR_STYLE}
          />
          {series.map((s, i) => (
            <Area
              key={s.dataKey}
              type="linear"
              dataKey={s.dataKey}
              stroke={s.color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#trend-${chartId}-${i})`}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
