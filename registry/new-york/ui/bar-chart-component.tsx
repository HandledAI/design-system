"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { cn } from "../../../lib/utils"

export interface BarSeries {
  dataKey: string
  color: string
  name?: string
  icon?: React.ComponentType<{ className?: string }>
  barSize?: number
}

export interface BarChartComponentProps {
  data: Record<string, unknown>[]
  bars: BarSeries[]
  height?: number
  xAxisKey?: string
  showGrid?: boolean
  showLegend?: boolean
  barGap?: number
  className?: string
}

function CustomBarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md">
      {label ? (
        <p className="mb-1.5 text-xs font-medium text-slate-600">{label}</p>
      ) : null}
      <div className="space-y-1">
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.fill || entry.color }}
            />
            <span className="font-medium text-slate-700">
              {entry.name}:
            </span>
            <span className="font-semibold text-slate-900">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomLegend({ bars }: { bars: BarSeries[] }) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
      {bars.map((bar) => (
        <div key={bar.dataKey} className="flex items-center gap-1.5 text-xs">
          {bar.icon ? (
            <bar.icon className="h-3.5 w-3.5 text-slate-500" />
          ) : (
            <div
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: bar.color }}
            />
          )}
          <span className="font-medium text-slate-600">
            {bar.name || bar.dataKey}
          </span>
        </div>
      ))}
    </div>
  )
}

export function BarChartComponent({
  data,
  bars,
  height = 280,
  xAxisKey = "date",
  showGrid = true,
  showLegend = true,
  barGap = 2,
  className,
}: BarChartComponentProps) {
  return (
    <div className={cn("w-full", className)}>
      <div style={{ height }}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          debounce={1}
          minWidth={1}
          minHeight={1}
        >
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={barGap}
          >
            {showGrid ? (
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
            ) : null}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <Tooltip content={<CustomBarTooltip />} cursor={false} />
            {bars.map((bar) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                fill={bar.color}
                name={bar.name || bar.dataKey}
                barSize={bar.barSize ?? 12}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      {showLegend ? <CustomLegend bars={bars} /> : null}
    </div>
  )
}
