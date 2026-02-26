"use client"

import * as React from "react"
import {
  SuggestedActions,
  type SuggestedAction,
  type SuggestedContact,
} from "@/registry/new-york/ui/suggested-actions"
import { BRAND_ICONS } from "@/lib/icons"

const SHOWCASE_CONTACTS: SuggestedContact[] = [
  {
    name: "Sarah Chen",
    role: "VP Finance",
    email: "sarah.chen@cloudkitchen.com",
    emails: ["sarah.chen@cloudkitchen.com", "schen@cloudkitchen.io"],
    phone: "(415) 555-0142",
    phones: ["(415) 555-0142", "(415) 555-0199"],
    confirmed: false,
    salesforceUrl: "https://acme.my.salesforce.com/lightning/r/Contact/003000000000011AAA/view",
    lastActivity: { date: "Today", type: "Email thread" },
  },
  {
    name: "Marcus Webb",
    role: "CFO",
    email: "marcus.webb@cloudkitchen.com",
    phone: "(415) 555-0101",
    confirmed: false,
    salesforceUrl: "https://acme.my.salesforce.com/lightning/r/Contact/003000000000012AAA/view",
    lastActivity: { date: "3d ago", type: "Call note" },
  },
  {
    name: "Priya Shah",
    role: "Head of Ops",
    email: "priya.shah@cloudkitchen.com",
    emails: ["priya.shah@cloudkitchen.com", "pshah@cloudkitchen.io"],
    phone: "(415) 555-0177",
    confirmed: false,
    salesforceUrl: "https://acme.my.salesforce.com/lightning/r/Contact/003000000000013AAA/view",
  },
]

const SHOWCASE_SIGNATURE = `Jordan Rivera\nAccount Executive\nAcme Financial · (415) 555-0100\njordan.rivera@acmefinancial.com`

const threadReplyAction: SuggestedAction = {
  id: "showcase-thread-reply",
  type: "email",
  label: "Reply to Sarah Chen",
  status: "pending",
  followUp: { enabled: true, days: 3 },
  emailMeta: {
    from: "Jordan Rivera",
    fromEmail: "jordan.rivera@acmefinancial.com",
    to: {
      name: "Sarah Chen",
      role: "VP Finance",
      email: "sarah.chen@cloudkitchen.com",
      emails: ["sarah.chen@cloudkitchen.com", "schen@cloudkitchen.io"],
      confirmed: false,
    },
  },
  replyTo: {
    from: "Sarah Chen",
    time: "2 hours ago",
    content: "Hi Jordan, thanks for the treasury proposal. We had a few questions about the sweep account minimums before we can move forward.",
  },
  threadMessages: [
    {
      id: "t1",
      from: "Jordan Rivera",
      initials: "JR",
      time: "3 days ago",
      preview: "Hi Sarah, I wanted to share the treasury optimization proposal we discussed...",
      content: "Hi Sarah, I wanted to share the treasury optimization proposal we discussed. The attached deck covers sweep account options, yield projections, and implementation timeline.",
    },
    {
      id: "t2",
      from: "Sarah Chen",
      initials: "SC",
      time: "2 hours ago",
      preview: "Hi Jordan, thanks for the treasury proposal. We had a few questions about the sweep account minimums...",
      content: "Hi Jordan, thanks for the treasury proposal. We had a few questions about the sweep account minimums before we can move forward.",
    },
  ],
  content: "Hi Sarah,\n\nGreat question — the sweep account has a $500K minimum to activate, but we can often waive that for accounts with consistent inflows above $2M/month, which you comfortably meet.\n\nHappy to walk through the details on a quick call if that would help.\n\nBest,\nJordan",
}

const newEmailAction: SuggestedAction = {
  id: "showcase-new-email",
  type: "email",
  label: "Introduce treasury options to Marcus Webb",
  status: "pending",
  emailMeta: {
    from: "Jordan Rivera",
    fromEmail: "jordan.rivera@acmefinancial.com",
    to: {
      name: "Marcus Webb",
      role: "CFO",
      email: "marcus.webb@cloudkitchen.com",
      confirmed: false,
    },
    subject: "Treasury optimization for CloudKitchen",
  },
  content: "Hi Marcus,\n\nI work with your finance team at CloudKitchen and wanted to reach out directly about an opportunity to optimize your idle cash management.\n\nBased on recent account activity, there are some quick wins we could implement around sweep accounts and short-term yield optimization.\n\nWould you have 15 minutes this week for a brief overview?\n\nBest,\nJordan",
}

const callAction: SuggestedAction = {
  id: "showcase-call",
  type: "call",
  label: "Call Sarah Chen",
  status: "pending",
  callMeta: {
    contact: {
      name: "Sarah Chen",
      role: "VP Finance",
      phone: "(415) 555-0142",
      phones: ["(415) 555-0142", "(415) 555-0199"],
      email: "sarah.chen@cloudkitchen.com",
      confirmed: false,
    },
    talkTrack: `Opening:\n"Hi Sarah, this is Jordan from Acme Financial. Do you have a few minutes?"\n\nContext:\n"I saw your note about the sweep account minimums and wanted to address that directly — I think we can make this work."\n\nKey points:\n• Confirm the $500K minimum can be waived given their inflow volume\n• Walk through the projected yield: ~$180K annually on idle balances\n• Ask about their timeline for implementation\n• Mention the API integration takes ~2 weeks with their existing ERP\n\nClose:\n"Would it be helpful to set up a session with our solutions team to map out the integration? I can have something on your calendar by end of day."`,
    allowDispatchAgent: true,
  },
}

const ticketAction: SuggestedAction = {
  id: "showcase-ticket-2",
  type: "ticket",
  label: "Create Zendesk ticket",
  status: "pending",
  ticket: {
    system: "Zendesk",
    priority: "High",
    type: "Churn Risk",
    subject: "CloudKitchen - Sweep account setup follow-up",
    description: "Customer expressed interest in treasury optimization but has open questions about minimums. Need to follow up within 24 hours to maintain momentum.",
    assignee: "Jordan Rivera",
    tags: ["high-value", "treasury", "follow-up"],
  },
}

type TabKey = "thread-reply" | "new-email" | "call" | "ticket"

const tabs: { key: TabKey; label: string }[] = [
  { key: "thread-reply", label: "Thread Reply" },
  { key: "new-email", label: "New Email" },
  { key: "call", label: "Call Talk Track" },
  { key: "ticket", label: "Zendesk Ticket" },
]

const actionMap: Record<TabKey, SuggestedAction> = {
  "thread-reply": threadReplyAction,
  "new-email": newEmailAction,
  call: callAction,
  ticket: ticketAction,
}

export function SuggestedActionsShowcase() {
  const [activeTab, setActiveTab] = React.useState<TabKey>("thread-reply")
  const [extraActions, setExtraActions] = React.useState<SuggestedAction[]>([])

  const handleDuplicate = React.useCallback((id: number | string) => {
    const base = [actionMap[activeTab], ...extraActions].find((a) => a.id === id)
    if (!base || base.type !== "email") return
    const clone: SuggestedAction = {
      ...base,
      id: `${base.id}-dup-${Date.now()}`,
      emailMeta: base.emailMeta ? { ...base.emailMeta, to: undefined } : undefined,
    }
    setExtraActions((prev) => [...prev, clone])
  }, [activeTab, extraActions])

  const actions = [actionMap[activeTab], ...extraActions.filter((a) => a.type === actionMap[activeTab].type)]

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setActiveTab(t.key); setExtraActions([]) }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
              activeTab === t.key
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="border rounded-lg overflow-hidden bg-card">
        <SuggestedActions
          key={activeTab}
          actions={actions}
          accountContacts={SHOWCASE_CONTACTS}
          signature={SHOWCASE_SIGNATURE}
          iconMap={{
            gmail: BRAND_ICONS.gmail.icon,
            slack: BRAND_ICONS.slack,
            zendesk: BRAND_ICONS.zendesk,
            salesforce: BRAND_ICONS.salesforce,
          }}
          onDismiss={(id) => console.log("Dismiss:", id)}
          onSend={(id) => console.log("Send:", id)}
          onSaveDraft={(id) => console.log("Draft:", id)}
          onDuplicate={handleDuplicate}
          onOpenAccountDetails={() => console.log("Open account details")}
          onOpenRecentActivity={() => console.log("Open recent activity in entity panel")}
          onMarkComplete={(id) => console.log("Mark complete:", id)}
          onDispatchAgent={(id) => console.log("Dispatch agent:", id)}
        />
      </div>
    </div>
  )
}
