"use client"

import * as React from "react"

import { cn } from "../../../lib/utils"

export interface ChartTooltipEntry {
  name?: string
  value?: number | string
  dataKey?: string
  color?: string
  stroke?: string
  fill?: string
}

export interface SimpleChartTooltipProps {
  active?: boolean
  payload?: ChartTooltipEntry[]
  label?: string
  formatter?: (value: number | string, name: string) => [string, string]
  className?: string
}

export function SimpleChartTooltip({
  active,
  payload,
  label,
  formatter,
  className,
}: SimpleChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md",
        className,
      )}
      style={{ fontSize: "12px" }}
    >
      {label ? (
        <p className="mb-1 text-xs font-medium text-slate-600">{label}</p>
      ) : null}
      {payload.map((entry, index) => {
        const value = entry.value ?? ""
        const name = entry.name || entry.dataKey || ""
        const color = entry.color || entry.stroke || entry.fill

        const [displayValue, displayName] = formatter
          ? formatter(value as number | string, name)
          : [String(value), name]

        return (
          <div key={index} className="flex items-center gap-2">
            {color ? (
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
            ) : null}
            <span className="text-xs font-medium text-slate-900">
              {displayName}: {displayValue}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export const CHART_TOOLTIP_STYLE: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  fontSize: "12px",
  padding: "8px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
}

export const CHART_CURSOR_STYLE = {
  stroke: "#94a3b8",
  strokeWidth: 1,
  strokeDasharray: "4 4",
}
