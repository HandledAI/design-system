"use client"

import * as React from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { AgentOrb } from "@/registry/new-york/ui/agent-orb"
import {
  AgentPopover,
  AgentPopoverBranding,
  AgentPopoverStepContent,
  AgentPopoverForm,
  AgentPopoverOverview,
  AgentPopoverChat,
} from "@/registry/new-york/ui/agent-popover"
import { AgentWidget, type AgentWidgetMessage } from "@/registry/new-york/ui/agent-widget"
import { Message, MessageContent, MessageAvatar } from "@/registry/new-york/ui/message"
import { StatusBadge } from "@/registry/new-york/ui/status-badge"
import { SimpleDataTable } from "@/registry/new-york/ui/simple-data-table"
import { Button } from "@/registry/new-york/ui/button"

/* ===== Agent Orb Showcase ===== */

export function AgentOrbShowcase() {
  const [orbState, setOrbState] = React.useState<"listening" | "talking" | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <Button variant={orbState === null ? "default" : "outline"} size="sm" onClick={() => setOrbState(null)}>Idle</Button>
        <Button variant={orbState === "listening" ? "default" : "outline"} size="sm" onClick={() => setOrbState("listening")}>Listening</Button>
        <Button variant={orbState === "talking" ? "default" : "outline"} size="sm" onClick={() => setOrbState("talking")}>Talking</Button>
      </div>
      <div className="flex items-center justify-center bg-muted/30 rounded-xl p-8">
        <div className="w-[220px] h-[220px]">
          <AgentOrb state={orbState} showGlow seed={42} />
        </div>
      </div>
    </div>
  )
}

/* ===== Agent Popover Showcase ===== */

export function AgentPopoverShowcase() {
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState("details")
  const [messages, setMessages] = React.useState<AgentWidgetMessage[]>([
    { from: "assistant", text: "Hi! I'm the AI interviewer. Tell me about your experience in critical care nursing." },
  ])

  return (
    <div className="space-y-4">
      <Button onClick={() => { setOpen(true); setStep("details") }}>Open Agent Popover</Button>
      <p className="text-sm text-muted-foreground">Split-panel modal with multi-step flow: details form → overview → live chat.</p>
      <AgentPopover open={open} onOpenChange={setOpen} step={step} onStepChange={setStep}>
        <AgentPopoverBranding
          title="ICU Registered Nurse"
          subtitle="AI Recruiter - CommonSpirit Health"
          badge="Intro Interview"
          visualSlot={<AgentOrb state={step === "interview" ? "listening" : null} showGlow seed={7} />}
          statusIndicator={step === "interview" ? "listening" : "ready"}
        />
        <AgentPopoverStepContent step="details">
          <AgentPopoverForm
            fields={[
              { name: "name", label: "Full Name", required: true, placeholder: "Jane Doe" },
              { name: "email", label: "Email", type: "email", required: true, placeholder: "jane@example.com" },
              { name: "phone", label: "Phone", type: "tel", placeholder: "(555) 123-4567" },
            ]}
            onSubmit={() => setStep("overview")}
          />
        </AgentPopoverStepContent>
        <AgentPopoverStepContent step="overview">
          <AgentPopoverOverview
            userSummary={{ name: "Jane Doe", email: "jane@example.com" }}
            discussionPoints={[
              "Role responsibilities and expectations",
              "Schedule flexibility and shift preferences",
              "Experience with critical care protocols",
            ]}
            actions={
              <Button className="w-full rounded-full" onClick={() => setStep("interview")}>
                Start Interview
              </Button>
            }
          />
        </AgentPopoverStepContent>
        <AgentPopoverStepContent step="interview">
          <AgentPopoverChat
            messages={messages}
            onSendMessage={(text) => {
              setMessages((prev) => [
                ...prev,
                { from: "user", text },
                { from: "assistant", text: "That's great experience! Can you tell me more about your certifications?" },
              ])
            }}
            onEndSession={() => setOpen(false)}
            status="connected"
            mode="listening"
          />
        </AgentPopoverStepContent>
      </AgentPopover>
    </div>
  )
}

/* ===== Agent Widget Showcase ===== */

export function AgentWidgetShowcase() {
  const [messages, setMessages] = React.useState<AgentWidgetMessage[]>([
    { from: "assistant", text: "Hello! How can I help you today?" },
    { from: "user", text: "I'd like to learn about the ICU nurse position." },
    { from: "assistant", text: "Great choice! The ICU Registered Nurse position involves providing critical care to patients in our intensive care unit. Would you like to hear about the requirements?" },
  ])

  return (
    <div className="border rounded-2xl overflow-hidden h-[500px] max-w-md">
      <AgentWidget
        status="connected"
        mode={null}
        messages={messages}
        onSendMessage={(text) => {
          setMessages((prev) => [
            ...prev,
            { from: "user", text },
            { from: "assistant", text: "Thanks for your interest! Let me tell you more about that." },
          ])
        }}
        onEndSession={() => setMessages([])}
        inputMode="voice+text"
      />
    </div>
  )
}

/* ===== Message Primitives Showcase ===== */

export function MessageShowcase() {
  return (
    <div className="space-y-2 max-w-lg p-4 bg-muted/20 rounded-xl">
      <Message from="assistant">
        <MessageAvatar name="AI" />
        <MessageContent>Hello! I'm your AI assistant. How can I help you today?</MessageContent>
      </Message>
      <Message from="user">
        <MessageContent>I have a question about the nursing position.</MessageContent>
      </Message>
      <Message from="assistant">
        <MessageAvatar name="AI" />
        <MessageContent>Of course! I'd be happy to tell you about the ICU Registered Nurse role. What would you like to know?</MessageContent>
      </Message>
      <Message from="user">
        <MessageContent>What are the shift requirements?</MessageContent>
      </Message>
    </div>
  )
}

/* ===== Status Badge Showcase ===== */

export function StatusBadgeShowcase() {
  return (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="active" />
      <StatusBadge status="pending" />
      <StatusBadge status="screening" />
      <StatusBadge status="hired" />
      <StatusBadge status="rejected" />
      <StatusBadge status="scheduled" />
      <StatusBadge status="completed" />
      <StatusBadge status="no_answer" />
      <StatusBadge status="draft" />
      <StatusBadge status="in_progress" />
    </div>
  )
}

/* ===== Simple Data Table Showcase ===== */

type FlowRow = {
  name: string
  status: string
  enrolled: number
  active: number
  completed: number
}

const flowColumnHelper = createColumnHelper<FlowRow>()

const flowColumns = [
  flowColumnHelper.accessor("name", {
    header: "Flow Name",
    cell: (info) => <span className="font-medium text-foreground">{info.getValue()}</span>,
  }),
  flowColumnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  flowColumnHelper.accessor("enrolled", { header: "Enrolled" }),
  flowColumnHelper.accessor("active", {
    header: "Active",
    cell: (info) => <span className="text-blue-600 font-medium">{info.getValue()}</span>,
  }),
  flowColumnHelper.accessor("completed", {
    header: "Completed",
    cell: (info) => <span className="text-green-600 font-medium">{info.getValue()}</span>,
  }),
]

const flowData: FlowRow[] = [
  { name: "Invite to Apply for Alternative Role", status: "active", enrolled: 2, active: 1, completed: 1 },
  { name: "Invite to Schedule", status: "active", enrolled: 1, active: 1, completed: 0 },
  { name: "Notify of New Opening With Potential Fit", status: "active", enrolled: 0, active: 0, completed: 0 },
  { name: "Auto Outreach for Screening Version 1", status: "active", enrolled: 0, active: 0, completed: 0 },
  { name: "Auto Outreach for Screening Version 2", status: "pending", enrolled: 0, active: 0, completed: 0 },
]

export function SimpleDataTableShowcase() {
  return (
    <SimpleDataTable
      columns={flowColumns}
      data={flowData}
      onRowClick={(row) => console.log("Clicked:", row.name)}
    />
  )
}
