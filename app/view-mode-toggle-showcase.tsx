"use client"

import * as React from "react"
import { LayoutList, Columns2, LayoutGrid, Table2, KanbanSquare } from "lucide-react"
import { ViewModeToggle } from "@/registry/new-york/ui/view-mode-toggle"

export function ViewModeToggleShowcase() {
  const [mode1, setMode1] = React.useState("inbox")
  const [mode2, setMode2] = React.useState("list")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Inbox / List toggle (2 modes)</p>
        <div className="flex items-center gap-4">
          <ViewModeToggle
            modes={[
              { id: "inbox", icon: <Columns2 className="h-3.5 w-3.5" />, label: "Inbox View" },
              { id: "list", icon: <LayoutList className="h-3.5 w-3.5" />, label: "List View" },
            ]}
            activeMode={mode1}
            onModeChange={setMode1}
          />
          <span className="text-sm text-muted-foreground">
            Active: <span className="font-medium text-foreground">{mode1}</span>
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Multi-mode toggle (4 modes)</p>
        <div className="flex items-center gap-4">
          <ViewModeToggle
            modes={[
              { id: "list", icon: <LayoutList className="h-3.5 w-3.5" />, label: "List" },
              { id: "grid", icon: <LayoutGrid className="h-3.5 w-3.5" />, label: "Grid" },
              { id: "table", icon: <Table2 className="h-3.5 w-3.5" />, label: "Table" },
              { id: "kanban", icon: <KanbanSquare className="h-3.5 w-3.5" />, label: "Kanban" },
            ]}
            activeMode={mode2}
            onModeChange={setMode2}
          />
          <span className="text-sm text-muted-foreground">
            Active: <span className="font-medium text-foreground">{mode2}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
