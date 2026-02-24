"use client"

import * as React from "react"
import {
  Building2,
  CheckSquare,
  ChevronLeft,
  ClipboardList,
  CreditCard,
  FileText,
  Phone,
  Search,
  User,
  X,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"
import {
  QuickActionChatArea,
  QuickActionPriority,
  QuickActionSubmitPayload,
} from "./quick-action-chat-area"

type TemplateIcon = React.ComponentType<{ className?: string }>
type QuickActionStep = "selection" | "details"

export interface QuickActionTemplate {
  id: string
  label: string
  description: string
  icon: TemplateIcon
  category?: "communication" | "admin" | "clinical" | string
}

export interface QuickActionTaskDraft {
  templateId: string | null
  message: string
  priority: QuickActionPriority
  provider: string
  patient: string
}

interface QuickActionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templates?: QuickActionTemplate[]
  title?: string
  description?: string
  className?: string
  onCreateTask?: (draft: QuickActionTaskDraft) => void
}

const DEFAULT_TEMPLATES: QuickActionTemplate[] = [
  {
    id: "call_patient",
    label: "Call Patient",
    icon: Phone,
    description: "Schedule or log a call",
    category: "communication",
  },
  {
    id: "call_provider",
    label: "Call Provider",
    icon: Building2,
    description: "Contact referring office",
    category: "communication",
  },
  {
    id: "call_payer",
    label: "Call Payer",
    icon: CreditCard,
    description: "Verify benefits or status",
    category: "admin",
  },
  {
    id: "send_fax",
    label: "Send Fax",
    icon: FileText,
    description: "Request records or auth",
    category: "communication",
  },
  {
    id: "verify_benefits",
    label: "Verify Benefits",
    icon: CheckSquare,
    description: "Check eligibility status",
    category: "admin",
  },
  {
    id: "create_referral",
    label: "New Referral",
    icon: ClipboardList,
    description: "Process incoming referral",
    category: "clinical",
  },
  {
    id: "manual_task",
    label: "Manual Task",
    icon: CheckSquare,
    description: "Create a custom to-do",
    category: "admin",
  },
]

export function QuickActionModal({
  open,
  onOpenChange,
  templates = DEFAULT_TEMPLATES,
  title = "Quick Action",
  description = "Choose a template or describe your task below.",
  className,
  onCreateTask,
}: QuickActionModalProps) {
  const [step, setStep] = React.useState<QuickActionStep>("selection")
  const [selectedTemplateId, setSelectedTemplateId] = React.useState<string | null>(null)
  const [provider, setProvider] = React.useState("")
  const [patient, setPatient] = React.useState("")

  const selectedTemplate = React.useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? null,
    [selectedTemplateId, templates]
  )

  React.useEffect(() => {
    if (!open) {
      return
    }

    setStep("selection")
    setSelectedTemplateId(null)
    setProvider("")
    setPatient("")
  }, [open])

  const handleSubmit = React.useCallback(
    (payload: QuickActionSubmitPayload) => {
      const canCreate = Boolean(selectedTemplateId) || payload.message.trim().length > 0
      if (!canCreate) {
        return
      }

      onCreateTask?.({
        templateId: selectedTemplateId,
        message: payload.message,
        priority: payload.priority,
        provider,
        patient,
      })

      onOpenChange(false)
    },
    [onCreateTask, onOpenChange, patient, provider, selectedTemplateId]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-h-[90vh] gap-0 overflow-hidden rounded-lg border-0 bg-[#FDFDFD] p-0 shadow-2xl sm:max-w-4xl",
          className
        )}
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-white px-6 py-4 text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#1B4332]/10 text-[#1B4332]">
              <Zap className="h-3.5 w-3.5" />
            </div>
            <DialogTitle className="text-base font-semibold text-slate-700">
              {title}
            </DialogTitle>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close quick action modal"
          >
            <X className="h-5 w-5" />
          </button>
          <DialogDescription className="sr-only">{description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-[#FAFAF9] p-2">
          <div className="mx-auto max-w-2xl px-4 py-8">
            {step === "selection" ? (
              <div className="space-y-8">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-serif text-slate-800">
                    Let&apos;s knock something off your list
                  </h2>
                  <p className="text-slate-500">{description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => {
                        setSelectedTemplateId(template.id)
                        setStep("details")
                      }}
                      className="group flex flex-col items-start rounded-md border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:border-[#1B4332]/50 hover:shadow-md"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-slate-50 text-slate-500 transition-colors group-hover:bg-[#1B4332]/10 group-hover:text-[#1B4332]">
                        <template.icon className="h-5 w-5" />
                      </div>
                      <span className="mb-1 font-semibold text-slate-900">
                        {template.label}
                      </span>
                      <span className="text-xs text-slate-500">
                        {template.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mb-6 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep("selection")}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                  <span className="text-slate-300">/</span>
                  <span className="text-sm font-medium text-slate-900">
                    {selectedTemplate?.label}
                  </span>
                </div>

                <div className="space-y-4 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 font-medium text-slate-900">
                    <User className="h-4 w-4 text-[#1B4332]" />
                    Who is this for?
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase text-slate-500">
                        Provider
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={provider}
                          onChange={(event) => setProvider(event.target.value)}
                          placeholder="Search provider..."
                          className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm transition-all focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase text-slate-500">
                        Patient
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={patient}
                          onChange={(event) => setPatient(event.target.value)}
                          placeholder="Search patient..."
                          className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm transition-all focus:border-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <QuickActionChatArea
          placeholder={
            step === "details"
              ? "Add any additional details about this task..."
              : "How can I help you today?"
          }
          submitLabel={step === "details" ? "Confirm Task" : "Create Task"}
          allowEmptySubmit={Boolean(selectedTemplateId)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
