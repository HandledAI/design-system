"use client"

import * as React from "react"

import { cn } from "../../../lib/utils"

export interface StyledBarItem {
  name: string
  value: number
  href?: string
  subtitle?: string
}

export interface StyledBarListProps {
  data: StyledBarItem[]
  valueFormatter?: (value: number) => string
  className?: string
  showAnimation?: boolean
  showSubtitle?: boolean
  barColor?: string
}

export function StyledBarList({
  data,
  valueFormatter = (value) => value.toString(),
  className,
  showAnimation = true,
  showSubtitle = false,
  barColor = "bg-emerald-500/30",
}: StyledBarListProps) {
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className={cn("space-y-2", className)}>
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100

        return (
          <div key={index} className={showSubtitle ? "space-y-1" : ""}>
            <div className="relative h-9 overflow-hidden rounded-md">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-md",
                  barColor,
                  showAnimation && "transition-all duration-300",
                )}
                style={{ width: `${percentage}%` }}
              />
              <div className="relative flex h-full items-center justify-between px-3">
                <span className="truncate pr-2 text-sm font-medium text-slate-900">
                  {item.name}
                </span>
                <span className="ml-auto shrink-0 text-sm font-semibold text-slate-900">
                  {valueFormatter(item.value)}
                </span>
              </div>
            </div>
            {showSubtitle && item.subtitle ? (
              <div className="pl-3 text-xs text-slate-500">
                {item.subtitle}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
