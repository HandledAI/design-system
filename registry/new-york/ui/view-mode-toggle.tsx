"use client"

import * as React from "react"
import { cn } from "../../../lib/utils"

export interface ViewMode {
  id: string
  icon: React.ReactNode
  label: string
}

export interface ViewModeToggleProps {
  modes: ViewMode[]
  activeMode: string
  onModeChange: (modeId: string) => void
  className?: string
}

export function ViewModeToggle({ modes, activeMode, onModeChange, className }: ViewModeToggleProps) {
  return (
    <div className={cn("flex items-center rounded-lg bg-muted p-0.5 gap-0.5", className)}>
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          title={mode.label}
          className={cn(
            "h-7 w-8 flex items-center justify-center rounded-md transition-all",
            activeMode === mode.id
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
          )}
        >
          {mode.icon}
        </button>
      ))}
    </div>
  )
}
