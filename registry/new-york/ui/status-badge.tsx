"use client"

import * as React from "react"
import { cn } from "../../../lib/utils"

export type StatusType = "success" | "warning" | "error" | "neutral"

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: string
  statusMap?: Record<string, StatusType>
}

const DEFAULT_STATUS_MAP: Record<string, StatusType> = {}

const STATUS_KEYWORDS: Record<StatusType, string[]> = {
  success: ["active", "hired", "completed", "success", "shortlist", "approved", "resolved", "done"],
  warning: ["pending", "new", "scheduled", "screening", "draft", "paused", "in_progress", "review"],
  error: ["rejected", "failed", "cancelled", "error", "no_answer", "dropped", "blocked"],
  neutral: [],
}

function inferStatusType(status: string, statusMap: Record<string, StatusType>): StatusType {
  const lower = status.toLowerCase()
  if (statusMap[lower]) return statusMap[lower]

  for (const [type, keywords] of Object.entries(STATUS_KEYWORDS) as [StatusType, string[]][]) {
    if (keywords.some((kw) => lower.includes(kw))) return type
  }

  return "neutral"
}

const STATUS_STYLES: Record<StatusType, string> = {
  success: "bg-green-100 text-green-950 dark:bg-green-950 dark:text-green-100",
  warning: "bg-yellow-100 text-yellow-950 dark:bg-yellow-950 dark:text-yellow-100",
  error: "bg-red-100 text-red-950 dark:bg-red-950 dark:text-red-100",
  neutral: "bg-muted text-foreground",
}

function formatStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function StatusBadge({ status, statusMap = DEFAULT_STATUS_MAP, className, ...props }: StatusBadgeProps) {
  const type = inferStatusType(status, statusMap)
  return (
    <div
      data-slot="status-badge"
      data-status={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2.5 h-6 text-xs font-medium transition-colors",
        STATUS_STYLES[type],
        className
      )}
      {...props}
    >
      {formatStatus(status)}
    </div>
  )
}
