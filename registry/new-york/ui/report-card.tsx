"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ReportCardFilterOption {
  label: string
  value: string
}

export interface ReportCardProps {
  title: string
  subtitle?: string
  /** Filter pill group rendered top-right */
  filterOptions?: ReportCardFilterOption[]
  selectedFilter?: string
  onFilterChange?: (value: string) => void
  /** Secondary toggle (e.g. metric selector) */
  toggleOptions?: string[]
  selectedToggle?: string
  onToggleChange?: (value: string) => void
  /** Render slot between header and content */
  headerExtra?: React.ReactNode
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export function ReportCard({
  title,
  subtitle,
  filterOptions,
  selectedFilter,
  onFilterChange,
  toggleOptions,
  selectedToggle,
  onToggleChange,
  headerExtra,
  children,
  className,
  contentClassName,
}: ReportCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {toggleOptions && toggleOptions.length > 1 && (
            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              {toggleOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onToggleChange?.(opt)}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-medium transition-all",
                    selectedToggle === opt
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {filterOptions && filterOptions.length > 1 && (
            <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onFilterChange?.(opt.value)}
                  className={cn(
                    "h-7 rounded-md border-none bg-transparent px-3 text-xs font-medium shadow-none transition-all hover:bg-white",
                    selectedFilter === opt.value &&
                      "bg-white text-slate-900 shadow-sm",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {headerExtra && (
        <div className="border-b border-slate-50 px-6 py-3">{headerExtra}</div>
      )}

      <div className={cn("p-6", contentClassName)}>{children}</div>
    </div>
  )
}
