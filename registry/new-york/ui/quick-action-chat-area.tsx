"use client"

import * as React from "react"
import { ArrowUp, Paperclip } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

export type QuickActionPriority = "normal" | "high" | "urgent"

export interface QuickActionSubmitPayload {
  message: string
  priority: QuickActionPriority
}

interface QuickActionChatAreaProps
  extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  placeholder?: string
  submitLabel?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  priority?: QuickActionPriority
  defaultPriority?: QuickActionPriority
  onPriorityChange?: (priority: QuickActionPriority) => void
  onSubmit: (payload: QuickActionSubmitPayload) => void
  allowEmptySubmit?: boolean
  clearOnSubmit?: boolean
  showEnterHint?: boolean
}

export function QuickActionChatArea({
  className,
  placeholder = "How can I help you today?",
  submitLabel = "Create Task",
  value,
  defaultValue = "",
  onValueChange,
  priority,
  defaultPriority = "normal",
  onPriorityChange,
  onSubmit,
  allowEmptySubmit = false,
  clearOnSubmit = true,
  showEnterHint = true,
  ...props
}: QuickActionChatAreaProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalPriority, setInternalPriority] =
    React.useState<QuickActionPriority>(defaultPriority)

  const composerValue = value ?? internalValue
  const selectedPriority = priority ?? internalPriority

  const setComposerValue = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue)
      }

      onValueChange?.(nextValue)
    },
    [onValueChange, value]
  )

  const setPriorityValue = React.useCallback(
    (nextPriority: QuickActionPriority) => {
      if (priority === undefined) {
        setInternalPriority(nextPriority)
      }

      onPriorityChange?.(nextPriority)
    },
    [onPriorityChange, priority]
  )

  const canSubmit = allowEmptySubmit || composerValue.trim().length > 0

  const handleSubmit = React.useCallback(() => {
    if (!canSubmit) {
      return
    }

    onSubmit({
      message: composerValue,
      priority: selectedPriority,
    })

    if (clearOnSubmit) {
      setComposerValue("")
    }
  }, [canSubmit, clearOnSubmit, composerValue, onSubmit, selectedPriority, setComposerValue])

  return (
    <div
      className={cn("border-t border-slate-100 bg-white p-4", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition-all focus-within:border-[#1B4332] focus-within:ring-2 focus-within:ring-[#1B4332]/20">
        <textarea
          value={composerValue}
          onChange={(event) => setComposerValue(event.target.value)}
          placeholder={placeholder}
          className="min-h-[80px] w-full resize-none p-4 text-slate-900 outline-none placeholder:text-slate-400"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              handleSubmit()
            }
          }}
        />
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-3 py-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
              title="Attach file"
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <div className="mx-1 h-4 w-px bg-slate-200" />
            <select
              value={selectedPriority}
              onChange={(event) =>
                setPriorityValue(event.target.value as QuickActionPriority)
              }
              className="cursor-pointer rounded-md bg-transparent px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200"
              aria-label="Task priority"
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            {showEnterHint ? (
              <span className="hidden text-xs text-slate-400 sm:inline">
                Press ⏎ to create
              </span>
            ) : null}
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="gap-2 rounded-md bg-[#1B4332] text-white hover:bg-[#235742] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitLabel}
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
