import * as React from "react"
import { ArrowUp, ArrowDown, Info, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MetricDataPoint {
  label: string
  value: number | string
  color?: string
}

export interface MetricCardProps {
  title: string
  value?: string | number
  unit?: string
  subtitle?: string
  change?: { 
    value: string
    direction: "up" | "down" | "neutral"
    isGood?: boolean // if true, up is green. if false, up is red (e.g. churn).
  }
  footerText?: string
  dataPoints?: MetricDataPoint[]
  showExternalLink?: boolean
  showInfo?: boolean
}

export function MetricCard({
  title,
  value,
  unit,
  subtitle,
  change,
  footerText,
  dataPoints,
  showExternalLink,
  showInfo = true,
}: MetricCardProps) {
  // SVG Donut Chart logic for variants with dataPoints
  const renderDonut = () => {
    if (!dataPoints || dataPoints.length === 0 || value === undefined) return null

    // Simple pseudo-donut chart logic assuming specific colors from the image
    // In a real prod environment we'd use recharts/visx, but for this standalone component
    // we can draw an SVG circle with stroke-dasharray based on the data
    const size = 80
    const strokeWidth = 12
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    
    // Calculate total to distribute the circle
    const total = dataPoints.reduce((sum, dp) => sum + (typeof dp.value === 'number' ? dp.value : 0), 0)
    let currentOffset = 0

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {dataPoints.map((dp, i) => {
            const val = typeof dp.value === 'number' ? dp.value : 0
            const percentage = val / total
            const strokeLength = percentage * circumference
            const offset = currentOffset
            currentOffset += strokeLength

            // Fallback colors matching the image's teal/green palette
            const colors = ["#166534", "#22c55e", "#6ee7b7", "#ccfbf1", "#f1f5f9"]
            const color = dp.color || colors[i % colors.length]

            return (
              <circle
                key={dp.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${Math.max(strokeLength - 2, 0)} ${circumference}`}
                strokeDashoffset={-offset}
                className="transition-all duration-300"
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl font-bold text-foreground leading-none">{value}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm h-full w-full">
      <div className={cn("flex justify-between items-start", title ? "mb-4" : "mb-4")}>
        {title ? (
          <h3 className="font-semibold text-sm text-foreground/80">{title}</h3>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
              {unit && <span className="text-2xl font-bold tracking-tight text-foreground">{unit}</span>}
            </div>
            {subtitle && (
              <p className="text-sm font-medium text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-muted-foreground shrink-0 mt-0.5">
          {showExternalLink && <ExternalLink className="w-3.5 h-3.5 cursor-pointer hover:text-foreground transition-colors" />}
          {showInfo && <Info className="w-3.5 h-3.5 cursor-pointer hover:text-foreground transition-colors" />}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {dataPoints && dataPoints.length > 0 ? (
          // Donut Chart Variant
          <div className="flex items-center gap-4 mt-2 mb-6">
            <div className="shrink-0">
              {renderDonut()}
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              {dataPoints.slice(0, 5).map((dp, i) => {
                const colors = ["bg-[#166534]", "bg-[#22c55e]", "bg-[#6ee7b7]", "bg-[#ccfbf1]", "bg-[#f1f5f9]"]
                return (
                  <div key={dp.label} className="flex items-center justify-between gap-2 text-[11px] font-medium min-w-0">
                    <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", dp.color ? "" : colors[i % colors.length])} style={dp.color ? { backgroundColor: dp.color } : {}} />
                      <span className="truncate">{dp.label}</span>
                    </div>
                    <span className="text-foreground font-semibold shrink-0">{dp.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : title && (
          // Standard Big Number Variant (only if title exists)
          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-foreground">{value}</span>
              {unit && <span className="text-2xl font-bold tracking-tight text-foreground">{unit}</span>}
            </div>
            {subtitle && (
              <p className="text-sm font-medium text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        )}

        {/* Footer section (Change indicator & extra text) */}
        <div className="mt-auto flex flex-col gap-1.5">
          {change && (
            <div className="flex items-center gap-1">
              {(() => {
                // Determine color based on isGood property
                // By default, up is green (good), down is red (bad)
                const isGoodDirection = change.isGood !== undefined 
                  ? change.isGood 
                  : change.direction === "up";
                
                const colorClass = isGoodDirection ? "text-emerald-600" : "text-red-600";
                const Icon = change.direction === "down" ? ArrowDown : ArrowUp;
                
                return (
                  <span className={cn("text-xs font-semibold flex items-center gap-0.5", colorClass)}>
                    <Icon className="w-3 h-3 stroke-[3]" />
                    {change.value}
                  </span>
                )
              })()}
            </div>
          )}
          {footerText && (
            <span className="text-[11px] text-muted-foreground font-medium">{footerText}</span>
          )}
        </div>
      </div>
    </div>
  )
}
