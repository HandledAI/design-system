"use client"

import * as React from "react"

import { QuickActionSidebarNav } from "@/registry/new-york/ui/quick-action-sidebar-nav"
import type { QuickActionTaskDraft } from "@/registry/new-york/ui/quick-action-modal"

export function QuickActionSidebarShowcase() {
  const [lastCreatedTask, setLastCreatedTask] =
    React.useState<QuickActionTaskDraft | null>(null)
  const [activeItem, setActiveItem] = React.useState("inbox")

  return (
    <div
      id="custom-quick-action-sidebar"
      className="scroll-m-20 space-y-4 rounded-xl border p-6"
    >
      <h3 className="text-lg font-semibold">Quick Action Sidebar + Modal</h3>
      <p className="max-w-2xl text-sm text-muted-foreground">
        The sidebar nav and quick action trigger are showcased together. Use the
        bottom quick action button to open the modal. Includes collapsible
        sections, user profile with dropdown menu, and Barb-style nav items.
      </p>

      <div className="rounded-lg border bg-muted/30 p-4 flex justify-center">
        <QuickActionSidebarNav
          className="h-[700px] rounded-lg border shadow-sm"
          activeItemId={activeItem}
          onNavigate={(id) => setActiveItem(id)}
          onCreateTask={(draft) => setLastCreatedTask(draft)}
          onUserMenuAction={(id) => console.log("User menu:", id)}
        />
      </div>

      {lastCreatedTask ? (
        <div className="rounded-lg border border-dashed bg-muted/20 p-3 text-xs text-muted-foreground">
          Last created task:{" "}
          <span className="font-medium text-foreground">
            {lastCreatedTask.templateId ?? "manual"}
          </span>
          {lastCreatedTask.message.trim() ? (
            <>
              {" "}
              - {lastCreatedTask.message}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
