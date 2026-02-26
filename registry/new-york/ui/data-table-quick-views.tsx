"use client"

import { ChevronDown, X } from "lucide-react"

import { cn } from "../../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export type DataTableQuickViewValue = string | null

interface DataTableQuickViewsProps {
  quickViews: string[]
  moreViews: string[]
  activeView: DataTableQuickViewValue
  onViewChange: (next: DataTableQuickViewValue) => void
  className?: string
}

export function DataTableQuickViews({
  quickViews,
  moreViews,
  activeView,
  onViewChange,
  className,
}: DataTableQuickViewsProps) {
  const isMoreActive = Boolean(activeView && moreViews.includes(activeView))

  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto border-b border-border px-4 pb-3 pt-2",
        className
      )}
    >
      <span className="mr-1 shrink-0 text-xs font-medium text-muted-foreground/80">
        Quick views:
      </span>

      {quickViews.map((view) => {
        const isActive = activeView === view
        return (
          <button
            key={view}
            onClick={() => onViewChange(isActive ? null : view)}
            className={cn(
              "whitespace-nowrap rounded-full border px-3 py-1 text-xs transition-colors",
              isActive
                ? "border-brand-purple/30 bg-brand-purple/10 font-medium text-brand-purple"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {view}
          </button>
        )
      })}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1 text-xs transition-colors",
              isMoreActive
                ? "border-brand-purple/30 bg-brand-purple/10 font-medium text-brand-purple"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {isMoreActive ? activeView : "More..."}
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {moreViews.map((view) => (
            <DropdownMenuItem
              key={view}
              className={cn(
                "cursor-pointer text-xs",
                activeView === view && "bg-brand-purple/5 font-medium text-brand-purple"
              )}
              onSelect={() => onViewChange(view)}
            >
              {view}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {activeView ? (
        <button
          onClick={() => onViewChange(null)}
          className="ml-auto flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      ) : null}
    </div>
  )
}
