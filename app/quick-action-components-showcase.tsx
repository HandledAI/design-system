"use client"

import * as React from "react"
import { Zap } from "lucide-react"

import { Button } from "@/registry/new-york/ui/button"
import {
  QuickActionModal,
  type QuickActionTaskDraft,
} from "@/registry/new-york/ui/quick-action-modal"
import {
  QuickActionChatArea,
  type QuickActionSubmitPayload,
} from "@/registry/new-york/ui/quick-action-chat-area"

export function QuickActionComponentsShowcase() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [lastCreatedTask, setLastCreatedTask] =
    React.useState<QuickActionTaskDraft | null>(null)
  const [lastChatSubmit, setLastChatSubmit] =
    React.useState<QuickActionSubmitPayload | null>(null)

  return (
    <>
      <div
        id="custom-quick-action-modal"
        className="scroll-m-20 space-y-4 rounded-xl border p-6"
      >
        <h3 className="text-lg font-semibold">Quick Action Modal</h3>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Standalone modal preview with the template grid and embedded chat area.
        </p>
        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1B4332] text-white hover:bg-[#245240]"
        >
          <Zap className="h-4 w-4" />
          Open Quick Action Modal
        </Button>

        {lastCreatedTask ? (
          <div className="rounded-lg border border-dashed bg-muted/20 p-3 text-xs text-muted-foreground">
            Last task:{" "}
            <span className="font-medium text-foreground">
              {lastCreatedTask.templateId ?? "manual"} ({lastCreatedTask.priority})
            </span>
            {lastCreatedTask.message.trim() ? ` - ${lastCreatedTask.message}` : ""}
          </div>
        ) : null}

        <QuickActionModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onCreateTask={(draft) => setLastCreatedTask(draft)}
        />
      </div>

      <div
        id="custom-quick-action-chat-area"
        className="scroll-m-20 space-y-4 rounded-xl border p-6"
      >
        <h3 className="text-lg font-semibold">Quick Action Chat Area</h3>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Standalone composer used by the quick action modal footer.
        </p>
        <div className="rounded-lg border bg-card">
          <QuickActionChatArea
            placeholder="How can I help you today?"
            submitLabel="Create Task"
            onSubmit={(payload) => setLastChatSubmit(payload)}
          />
        </div>

        {lastChatSubmit ? (
          <div className="rounded-lg border border-dashed bg-muted/20 p-3 text-xs text-muted-foreground">
            Last composer submit:{" "}
            <span className="font-medium text-foreground">
              {lastChatSubmit.priority}
            </span>
            {lastChatSubmit.message.trim()
              ? ` - ${lastChatSubmit.message}`
              : ""}
          </div>
        ) : null}
      </div>
    </>
  )
}
