"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"

export interface MetricCardData {
  label: string
  value: string | number
  trend?: {
    value: number
    direction: "up" | "down" | "neutral"
  }
  alert?: boolean
}

export interface TopLineMetricsProps {
  metrics: MetricCardData[]
  chartData?: { date: string; value: number; secondary?: number }[]
  filters?: string[]
  activeFilter?: string
  onFilterChange?: (filter: string) => void
  className?: string
}

function generateDefaultData() {
  const data = []
  const base = 150
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const dayFactor = Math.sin(i * 0.8) * 40
    const value = Math.floor(base + dayFactor + Math.random() * 30)
    const secondary = Math.floor(value * 0.4)
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      }),
      value,
      secondary,
    })
  }
  return data
}

const DEFAULT_DATA = generateDefaultData()

export function TopLineMetrics({
  metrics,
  chartData,
  filters,
  activeFilter,
  onFilterChange,
  className,
}: TopLineMetricsProps) {
  const [internalFilter, setInternalFilter] = React.useState(
    activeFilter ?? filters?.[0] ?? "All",
  )
  const currentFilter = activeFilter ?? internalFilter
  const data = chartData ?? DEFAULT_DATA
  const primaryMetric = metrics[0]

  const handleFilterClick = (f: string) => {
    setInternalFilter(f)
    onFilterChange?.(f)
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-4 flex items-center gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Work Queue Activity
                </h3>
                {filters && filters.length > 0 ? (
                  <>
                    <div className="h-4 w-px bg-slate-200" />
                    <div className="flex gap-1">
                      {filters.map((f) => (
                        <button
                          key={f}
                          onClick={() => handleFilterClick(f)}
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
                            currentFilter === f
                              ? "bg-slate-100 text-slate-900"
                              : "text-slate-500 hover:text-slate-700",
                          )}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold tracking-tight text-slate-900">
                  {primaryMetric.value}
                </span>
                <span className="text-lg font-medium text-slate-600">
                  {primaryMetric.label}
                </span>
                {primaryMetric.trend ? (
                  <span
                    className={cn(
                      "ml-2 flex items-center rounded-full px-2 py-0.5 text-sm font-bold",
                      primaryMetric.trend.direction === "up"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700",
                    )}
                  >
                    {primaryMetric.trend.direction === "up" ? (
                      <ArrowUp className="mr-1 h-3.5 w-3.5" />
                    ) : (
                      <ArrowDown className="mr-1 h-3.5 w-3.5" />
                    )}
                    {primaryMetric.trend.value}%
                  </span>
                ) : null}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="group relative h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="tlm-primary"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="tlm-secondary"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="min-w-[200px] animate-in fade-in zoom-in-95 rounded-lg border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm duration-200">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Metrics Snapshot
                      </div>
                      <div className="space-y-3">
                        {metrics.map((m, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-4"
                          >
                            <span
                              className={cn(
                                "text-sm font-medium",
                                i === 0
                                  ? "font-bold text-slate-900"
                                  : "text-slate-600",
                              )}
                            >
                              {m.label}
                            </span>
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "font-mono text-sm",
                                  m.alert
                                    ? "font-bold text-red-600"
                                    : "text-slate-900",
                                )}
                              >
                                {m.value}
                              </span>
                              {m.alert ? (
                                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }}
                cursor={{
                  stroke: "#94a3b8",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#tlm-primary)"
              />
              {data[0]?.secondary != null ? (
                <Area
                  type="monotone"
                  dataKey="secondary"
                  stroke="#f97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#tlm-secondary)"
                  style={{ opacity: 0.6 }}
                />
              ) : null}
            </AreaChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-between px-8 text-xs font-medium text-slate-400">
            {data.map((d, i) => (
              <span key={i}>{d.date}</span>
            ))}
          </div>

          <div className="pointer-events-none absolute right-4 top-4 rounded bg-white/50 px-2 py-1 text-[10px] text-slate-500 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            Hover for details
          </div>
        </div>
      </div>
    </div>
  )
}
