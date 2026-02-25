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
import { CHART_TOOLTIP_STYLE } from "./chart-tooltip"

export interface VolumeDataKey {
  key: string
  color: string
}

export interface VolumeAnalysisChartProps {
  data: Record<string, unknown>[]
  dataKeys: VolumeDataKey[]
  height?: number
  xAxisKey?: string
  stacked?: boolean
  title?: string
  subtitle?: string
  className?: string
}

export function VolumeAnalysisChart({
  data,
  dataKeys,
  height = 250,
  xAxisKey = "date",
  stacked = true,
  title,
  subtitle,
  className,
}: VolumeAnalysisChartProps) {
  const chartId = React.useId().replace(/:/g, "")

  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) ? (
        <div className="mb-4">
          {title ? (
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          ) : null}
          {subtitle ? (
            <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>
      ) : null}

      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              {dataKeys.map((item, i) => (
                <linearGradient
                  key={item.key}
                  id={`vol-${chartId}-${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={item.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={item.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              itemStyle={{ fontSize: "12px", fontWeight: 600 }}
            />
            {dataKeys.map((item, i) => (
              <Area
                key={item.key}
                type="linear"
                dataKey={item.key}
                stackId={stacked ? "1" : undefined}
                stroke={item.color}
                fill={`url(#vol-${chartId}-${i})`}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
