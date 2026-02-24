"use client"

import * as React from "react"

import { QuickActionSidebarNav } from "@/registry/new-york/ui/quick-action-sidebar-nav"
import type { QuickActionTaskDraft } from "@/registry/new-york/ui/quick-action-modal"

export function QuickActionSidebarShowcase() {
  const [lastCreatedTask, setLastCreatedTask] =
    React.useState<QuickActionTaskDraft | null>(null)

  return (
    <div
      id="custom-quick-action-sidebar"
      className="scroll-m-20 space-y-4 rounded-xl border p-6"
    >
      <h3 className="text-lg font-semibold">Quick Action Sidebar + Modal</h3>
      <p className="max-w-2xl text-sm text-muted-foreground">
        The sidebar nav and quick action trigger are showcased together. Use the
        bottom quick action button to open the modal.
      </p>

      <div className="rounded-lg border bg-[#eef2f8] p-4">
        <QuickActionSidebarNav
          className="mx-auto"
          onCreateTask={(draft) => setLastCreatedTask(draft)}
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
