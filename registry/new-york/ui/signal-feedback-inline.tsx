"use client"

import * as React from "react"
import { Check, CirclePlus, Lock, XCircle } from "lucide-react"

const dismissReasons = [
  "Bad timing",
  "Inaccurate data",
  "Wrong account",
  "Already handled",
  "Not actionable",
  "Other",
]

type ApprovalState = "pending" | "confirming" | "dismissing" | "approved" | "dismissed"

interface SignalApprovalContextValue {
  approvalState: ApprovalState
  companyName: string
  approve: () => void
  dismiss: (reasons: string[], detail: string) => void
  requestApproval: () => void
  requestDismiss: () => void
  cancel: () => void
}

const SignalApprovalCtx = React.createContext<SignalApprovalContextValue | null>(null)

export function useSignalApproval() {
  const ctx = React.useContext(SignalApprovalCtx)
  if (!ctx) throw new Error("SignalApproval components must be used within SignalApproval.Root")
  return ctx
}

interface RootProps {
  children: React.ReactNode
  companyName: string
  onApprove?: () => void
  onDismiss?: (reasons: string[], detail: string) => void
}

function Root({ children, companyName, onApprove, onDismiss }: RootProps) {
  const [approvalState, setApprovalState] = React.useState<ApprovalState>("pending")

  const requestApproval = React.useCallback(() => {
    setApprovalState("confirming")
  }, [])

  const requestDismiss = React.useCallback(() => {
    setApprovalState("dismissing")
  }, [])

  const cancel = React.useCallback(() => {
    setApprovalState("pending")
  }, [])

  const approve = React.useCallback(() => {
    setApprovalState("approved")
    onApprove?.()
  }, [onApprove])

  const dismiss = React.useCallback(
    (reasons: string[], detail: string) => {
      setApprovalState("dismissed")
      onDismiss?.(reasons, detail)
    },
    [onDismiss]
  )

  return (
    <SignalApprovalCtx.Provider
      value={{ approvalState, companyName, approve, dismiss, requestApproval, requestDismiss, cancel }}
    >
      {children}
    </SignalApprovalCtx.Provider>
  )
}

function Actions() {
  const { approvalState, companyName, approve, dismiss, requestApproval, requestDismiss, cancel } =
    useSignalApproval()
  const [selectedReasons, setSelectedReasons] = React.useState<string[]>([])
  const [detailText, setDetailText] = React.useState("")

  const otherSelected = selectedReasons.includes("Other")
  const canSubmitDismiss = selectedReasons.length > 0 && (!otherSelected || detailText.trim().length > 0)

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    )
  }

  const handleDismissSubmit = () => {
    if (!canSubmitDismiss) return
    dismiss(selectedReasons, detailText.trim())
    setSelectedReasons([])
    setDetailText("")
  }

  const handleCancel = () => {
    cancel()
    setSelectedReasons([])
    setDetailText("")
  }

  if (approvalState === "approved") {
    return (
      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
        <Check className="h-3.5 w-3.5" />
        <span>Opportunity Created</span>
      </div>
    )
  }

  if (approvalState === "dismissed") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <XCircle className="h-3.5 w-3.5" />
        <span>Signal Dismissed</span>
      </div>
    )
  }

  if (approvalState === "confirming") {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-3">
        <p className="text-sm text-foreground">
          This will create an Opportunity in Salesforce for <strong>{companyName}</strong>. Confirm?
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={approve}
            className="inline-flex h-7 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-semibold text-background transition-colors hover:bg-foreground/90"
          >
            <Check className="h-3 w-3" />
            Confirm
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex h-7 items-center rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  if (approvalState === "dismissing") {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-3">
        <p className="text-xs font-medium text-muted-foreground">Why are you dismissing this signal?</p>
        <div className="flex flex-wrap gap-1.5">
          {dismissReasons.map((reason) => {
            const selected = selectedReasons.includes(reason)
            return (
              <button
                key={reason}
                type="button"
                onClick={() => toggleReason(reason)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  selected
                    ? "border-red-200 bg-red-100 text-red-700"
                    : "border-border bg-background text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {reason}
              </button>
            )
          })}
        </div>

        {(selectedReasons.length > 0 || otherSelected) && (
          <input
            type="text"
            value={detailText}
            onChange={(e) => setDetailText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canSubmitDismiss) handleDismissSubmit()
            }}
            placeholder={otherSelected ? "Please describe (required)" : "Optional details"}
            className="h-8 w-full rounded-md border border-border bg-background px-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
          />
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDismissSubmit}
            disabled={!canSubmitDismiss}
            className={`inline-flex h-7 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${
              canSubmitDismiss
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "cursor-not-allowed bg-muted text-muted-foreground"
            }`}
          >
            Dismiss Signal
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex h-7 items-center rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={requestApproval}
        className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-semibold text-background transition-colors hover:bg-foreground/90"
      >
        <CirclePlus className="h-3.5 w-3.5" />
        Create Opportunity
      </button>
      <button
        type="button"
        onClick={requestDismiss}
        className="inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <XCircle className="h-3.5 w-3.5" />
        Dismiss Signal
      </button>
    </div>
  )
}

function Gate({ children }: { children: React.ReactNode }) {
  const { approvalState } = useSignalApproval()
  const isLocked =
    approvalState === "pending" || approvalState === "confirming" || approvalState === "dismissing"

  return (
    <div className="relative">
      {isLocked && (
        <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center">
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
            <Lock className="h-3 w-3" />
            Approve or dismiss the signal above to unlock
          </div>
        </div>
      )}
      <div
        className={`transition-opacity duration-300 ${isLocked ? "pointer-events-none select-none opacity-40" : "opacity-100"}`}
      >
        {children}
      </div>
    </div>
  )
}

export const SignalApproval = { Root, Actions, Gate }
