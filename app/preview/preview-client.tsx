"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Inbox,
  ArrowLeft,
  Search,
  FileText,
  Plus,
  MessageSquare,
  BarChart2,
  Users,
  Building,
  Activity,
  MoreHorizontal,
  Mail,
  CheckSquare,
  Phone,
  Settings,
  Link as LinkIcon,
  Shield,
} from "lucide-react"
import { BRAND_ICONS } from "@/lib/icons"

import { Button } from "@/registry/new-york/ui/button"
import { PrototypeShell } from "@/registry/new-york/ui/prototype-shell"
import type { PrototypeConfig, QueueItem, SignalScoreData, AdminTab } from "@/registry/new-york/ui/prototype-config"
import type { SidebarNavSection } from "@/registry/new-york/ui/quick-action-sidebar-nav"
import type { SuggestedAction, SuggestedContact } from "@/registry/new-york/ui/suggested-actions"
import type { SourceDef } from "@/registry/new-york/ui/detail-view"
import type { ScoreFactor } from "@/registry/new-york/ui/score-breakdown"
import type {
  PipelineStage,
  PipelineStageMetrics,
  PipelineStageTiming,
} from "@/registry/new-york/ui/pipeline-overview"
import type { TimelineEvent } from "@/registry/new-york/ui/timeline-activity"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_QUEUE: QueueItem[] = [
  {
    id: "REF-1894",
    title: "Balance flight watch",
    details: "Lunchclub is moving money out much faster than us...",
    statusColor: "red",
    time: "5m ago",
    company: "Lunchclub",
    tag1: "Churn Mitigation",
  },
  {
    id: "REF-1903",
    title: "Outbound opportunity",
    details: "Jackie Lee joined CloudKitchen as VP Finance. New...",
    statusColor: "blue",
    time: "12m ago",
    company: "CloudKitchen",
    tag1: "Outbound",
  },
  {
    id: "REF-1910",
    title: "New CFO welcome",
    details: "Key finance leader joined Loom. Early relationship = l...",
    statusColor: "blue",
    time: "6m ago",
    company: "Loom",
    tag1: "Relationship",
  },
  {
    id: "REF-1911",
    title: "Key contact departed",
    details: "Your primary signer or champion at Remote left the c...",
    statusColor: "blue",
    time: "8m ago",
    company: "Remote",
    tag1: "Retention",
  },
  {
    id: "REF-1912",
    title: "Card program ramp (headcount up, active card...",
    details: "Tandem is hiring but not issuing cards to new teams...",
    statusColor: "blue",
    time: "30m ago",
    company: "Tandem",
    tag1: "Expansion",
  },
]

const ACCOUNT_CONTACTS_BY_COMPANY: Record<string, SuggestedContact[]> = {
  Lunchclub: [
    {
      name: "Scott Mitchell",
      role: "CFO",
      email: "scott.mitchell@lunchclub.com",
      emails: ["scott.mitchell@lunchclub.com", "smitchell@lunchclub.io"],
      phone: "(415) 555-0188",
      confirmed: false,
      salesforceUrl: "https://acme.my.salesforce.com/lightning/r/Contact/003000000000004AAA/view",
      lastActivity: { date: "2h ago", type: "Email thread" },
    },
    {
      name: "Lena Park",
      role: "VP Finance",
      email: "lena.park@lunchclub.com",
      confirmed: false,
      lastActivity: { date: "1d ago", type: "Gong meeting" },
    },
    {
      name: "James Lin",
      role: "Controller",
      email: "james.lin@lunchclub.com",
      confirmed: false,
    },
  ],
  CloudKitchen: [
    {
      name: "Jackie Lee",
      role: "VP Finance",
      email: "jackie.lee@cloudkitchen.com",
      emails: ["jackie.lee@cloudkitchen.com", "jlee@cloudkitchen.io"],
      phone: "(415) 555-0142",
      phones: ["(415) 555-0142", "(415) 555-0199"],
      confirmed: false,
      salesforceUrl: "https://acme.my.salesforce.com/lightning/r/Contact/003000000000001AAA/view",
      lastActivity: { date: "1d ago", type: "Email thread" },
    },
    {
      name: "Marcus Webb",
      role: "CEO",
      email: "marcus.webb@cloudkitchen.com",
      phone: "(415) 555-0101",
      confirmed: false,
      salesforceUrl: "https://acme.my.salesforce.com/lightning/r/Contact/003000000000002AAA/view",
      lastActivity: { date: "2d ago", type: "Gong meeting" },
    },
    {
      name: "Priya Shah",
      role: "Head of Ops",
      email: "priya.shah@cloudkitchen.com",
      emails: ["priya.shah@cloudkitchen.com", "pshah@cloudkitchen.io"],
      phone: "(415) 555-0177",
      confirmed: false,
      salesforceUrl: "https://acme.my.salesforce.com/lightning/r/Contact/003000000000003AAA/view",
    },
  ],
}

function buildAccountContacts(item: QueueItem): SuggestedContact[] {
  return ACCOUNT_CONTACTS_BY_COMPANY[item.company] ?? ACCOUNT_CONTACTS_BY_COMPANY.CloudKitchen
}

const EMAIL_SIGNATURE = `Sarah Johnson\nSenior Account Executive\nAcme Financial · (415) 555-0100\nsarah.johnson@acmefinancial.com`

function buildSuggestedActions(item: QueueItem): SuggestedAction[] {
  const [recommended, secondary] = buildAccountContacts(item)
  return [
    {
      id: `${item.id}-email`,
      type: "email",
      label: `Reply to ${item.company}`,
      status: "pending",
      followUp: { enabled: true, days: 3 },
      emailMeta: {
        from: "Sarah Johnson",
        fromEmail: "sarah.johnson@acmefinancial.com",
        to: recommended,
      },
      replyTo: {
        from: "Scott Mitchell",
        time: "2 hours ago",
        content: "Hey Sarah, thanks for checking in. We did move some funds around for a specific vendor payment cycle coming up.",
      },
      threadMessages: [
        {
          id: "msg1",
          from: "Sarah Johnson",
          initials: "SJ",
          time: "4 days ago",
          preview: "Hi Scott, just wanted to check in on how things are going with Lunchclub. I noticed your balance...",
          content: "Hi Scott, just wanted to check in on how things are going with Lunchclub. I noticed your balance has been growing nicely over the past quarter. As you scale, happy to discuss treasury optimization strategies that could help maximize your idle cash. Let me know if you would like to chat!",
        },
        {
          id: "msg2",
          from: "Scott Mitchell",
          initials: "SM",
          time: "3 days ago",
          preview: "Hey Sarah, thanks for reaching out. Things are going well - we have been growing faster than expected...",
          content: "Hey Sarah, thanks for reaching out. Things are going well - we have been growing faster than expected which has been exciting. I would actually love to learn more about treasury options.",
        },
        {
          id: "msg3",
          from: "Sarah Johnson",
          initials: "SJ",
          time: "3 days ago",
          preview: "That is great to hear! I will send over some information on our Treasury product and we can set up...",
          content: "That is great to hear! I will send over some information on our Treasury product and we can set up a time to walk through it.",
        },
        {
          id: "msg4",
          from: "Scott Mitchell",
          initials: "SM",
          time: "2 hours ago",
          preview: "Hey Sarah, thanks for checking in. We did move some funds around for a specific vendor payment...",
          content: "Hey Sarah, thanks for checking in. We did move some funds around for a specific vendor payment cycle coming up.",
        },
      ],
      content: `Hi Scott,\n\nI noticed ~$4.2M moved out over the past week, which is higher than your normal pattern. Totally fine if this is expected, but if anything felt off or you are exploring other options, I would love to help.\n\nBest,\nSarah`,
    },
    {
      id: `${item.id}-new-email`,
      type: "email",
      label: `Introduce treasury options to Jackie Lee`,
      status: "pending",
      emailMeta: {
        from: "Sarah Johnson",
        fromEmail: "sarah.johnson@acmefinancial.com",
        to: secondary ?? recommended,
        subject: `Treasury optimization for ${item.company}`,
      },
      content: `Hi Jackie,\n\nI am reaching out because ${item.company} may benefit from our treasury management solutions. Based on recent account activity, there is an opportunity to optimize how idle cash is managed.\n\nWould you be available for a 15-minute call this week to explore options?\n\nBest,\nSarah`,
    },
    {
      id: `${item.id}-call`,
      type: "call",
      label: "Call Scott Mitchell",
      status: "pending",
      callMeta: {
        contact: {
          name: "Scott Mitchell",
          role: "CFO",
          phone: "(415) 555-0188",
          phones: ["(415) 555-0188", "(415) 555-0190"],
          email: "scott.mitchell@cloudkitchen.com",
          confirmed: false,
        },
        talkTrack: `Opening:\n"Hi Scott, this is Sarah from Acme Financial. Thanks for taking my call."\n\nContext:\n"I noticed some significant balance movements recently and wanted to check in directly to make sure everything is running smoothly on your end."\n\nKey points to cover:\n• Ask about the recent $4.2M outflow — expected vendor cycle or exploring alternatives?\n• Mention treasury optimization options that could earn yield on idle balances\n• Offer to schedule a deeper technical review with the team\n\nClose:\n"Would it make sense to set up a 30-minute walkthrough of our treasury tools next week? I can bring our solutions engineer."`,
        allowDispatchAgent: true,
      },
    },
    {
      id: `${item.id}-ticket`,
      type: "ticket",
      label: "Create Zendesk ticket",
      status: "pending",
      followUp: { enabled: false, days: 1 },
      ticket: {
        system: "Zendesk",
        priority: "High",
        type: "Churn Risk",
        subject: `${item.company} - Unusual balance activity detected`,
        description: "Large sustained outflows detected ($4.2M over past week, 3.2x typical activity). Customer mentioned exploring alternatives in Slack. Recommend proactive outreach to discuss treasury optimization options.",
        assignee: "Sarah Johnson",
        tags: ["churn-risk", "high-value", "treasury"],
      },
    },
    {
      id: `${item.id}-slack`,
      type: "slack",
      label: "Message Scott on Slack",
      status: "pending",
      followUp: { enabled: true, days: 1 },
      replyTo: {
        from: "Scott Mitchell",
        channel: "#treasury-questions",
        time: "Yesterday",
        content: "Hey team, we're looking at a few options for treasury management. Any recommendations?",
      },
      content: "Hey Scott - saw your question in #treasury-questions. Happy to walk through some options that might work well given your recent growth. Want to hop on a quick call this week?",
    },
  ]
}

function buildSourceItems(item: QueueItem): SourceDef[] {
  return [
    {
      id: 1,
      summary: `${item.company} balance outflow increased ~34% week-over-week with no matching inbound trend.`,
      meta: "Product telemetry · 2h ago",
    },
    {
      id: 2,
      summary: "Login frequency for finance and treasury users dropped over the last 10 days.",
      meta: "Workspace activity · 6h ago",
    },
    {
      id: 3,
      summary: "In #treasury-questions, the team asked about alternatives for short-term cash management.",
      meta: "Slack signal · 1d ago",
    },
    {
      id: 4,
      summary: "Latest outbound optimization email remains unread with no follow-up response.",
      meta: "Email thread signal · 2d ago",
    },
  ]
}

const SIGNAL_SCORE_DATA: Record<string, SignalScoreData> = {
  Lunchclub: {
    score: 78,
    factors: [
      { key: "trigger", label: "Trigger strength", score: 85, why: "Large balance outflow pattern — strong churn signal for banking infrastructure" },
      { key: "fit", label: "Company fit", score: 72, why: "Series B, 150+ employees — matches retention ICP" },
      { key: "timing", label: "Timing", score: 82, why: "Outflow detected within critical 30-day window" },
      { key: "signals", label: "Market signals", score: 68, why: "Competitor mentions in Slack channel suggest active evaluation" },
      { key: "competitive", label: "Competitive risk", score: null, risk: "High", why: "Active competitor evaluation detected in #treasury-questions" },
    ] as ScoreFactor[],
    whyNow: "Large sustained outflows and competitor evaluation signals suggest immediate churn risk requiring proactive intervention.",
    evidence: [
      "Balance outflow of $4.2M over past week (3.2x normal activity)",
      "Login frequency dropped 34% for finance users",
      "Competitor mentions detected in Slack channel",
    ],
    confidence: 87,
  },
  CloudKitchen: {
    score: 84,
    factors: [
      { key: "trigger", label: "Trigger strength", score: 92, why: "New VP Finance hire — strong buying signal for banking infrastructure" },
      { key: "fit", label: "Company fit", score: 88, why: "Series B, 200+ employees, high-growth — matches our ICP" },
      { key: "timing", label: "Timing", score: 78, why: "12 days into role — within the 90-day evaluation window" },
      { key: "signals", label: "Market signals", score: 72, why: "3 finance/treasury job postings suggest active buildout" },
      { key: "competitive", label: "Competitive risk", score: null, risk: "Low", why: "No existing platform account detected — net new prospect" },
    ] as ScoreFactor[],
    whyNow: "New VP Finance hire at a high-growth Series B company creates a strong buying window for banking infrastructure.",
    evidence: [
      "Jackie Lee joined as VP Finance 12 days ago",
      "3 open finance/treasury roles indicate team buildout",
      "No existing banking platform detected — greenfield opportunity",
    ],
    confidence: 91,
  },
}

function getSignalScore(company: string): SignalScoreData {
  return SIGNAL_SCORE_DATA[company] ?? {
    score: 65,
    factors: [
      { key: "trigger", label: "Trigger strength", score: 70, why: "Moderate signal detected based on account activity" },
      { key: "fit", label: "Company fit", score: 65, why: "Reasonable fit based on company profile" },
      { key: "timing", label: "Timing", score: 58, why: "Within general evaluation window" },
    ],
    whyNow: "Moderate signals detected that warrant review and potential outreach.",
    evidence: [
      "Activity patterns suggest potential opportunity",
      "Company profile aligns with target segment",
    ],
    confidence: 72,
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTimelineEvents(_item: QueueItem): TimelineEvent[] {
  return [
    {
      id: "e1",
      icon: <MessageSquare className="h-3 w-3" />,
      title: <>Contact record updated for <span className="font-medium text-foreground">Robert Choi</span></>,
      time: "1d ago",
    },
    {
      id: "e2",
      icon: <MessageSquare className="h-3 w-3" />,
      title: <>Contact name standardized to <span className="font-medium text-foreground">Robert Choi</span></>,
      time: "1d ago",
    },
    {
      id: "e3",
      icon: <MessageSquare className="h-3 w-3" />,
      title: <>New contact created: <span className="font-medium text-foreground">Robert Choi</span></>,
      time: "1d ago",
    },
    {
      id: "e4",
      icon: <CheckSquare className="h-3 w-3" />,
      title: <>Task added: <span className="font-medium text-foreground">Schedule introductory call and prepare service overview</span></>,
      time: "1d ago",
    },
    {
      id: "e5",
      icon: <Mail className="h-3 w-3" />,
      title: <>Email thread with <span className="font-medium text-foreground">Robert Choi</span></>,
      preview: "Hi Robert, thanks for confirming. 11:00 PM works well for me...",
      time: "1d ago",
      isInteractive: true,
      email: {
        from: "Sam Lee",
        fromEmail: "samlee@mobbin.com",
        to: "itsrobertchoi@gmail.com",
        cc: "clark@getdelve.com, jess@getdelve.com",
        bcc: "notes+acme@handled.ai",
        date: "1d ago",
        subject: "Re: Interested in Your Documenting Flows Service",
        body: (
          <>
            Hi Robert,{"\n\n"}
            Thanks for confirming.{"\n\n"}
            11:00 PM works well for me. I&apos;ve just sent the meeting invitation link - please let me know if
            you don&apos;t see it or have any trouble accessing it.{"\n\n"}
            Looking forward to speaking with you later today and walking through the service in more detail.{"\n\n"}
            Best regards,{"\n"}
            Sam
          </>
        ),
      },
    },
    {
      id: "e6",
      icon: <Image src={BRAND_ICONS.gong} alt="Gong" width={12} height={12} className="h-3 w-3 object-contain" />,
      title: <>Meeting recorded: <span className="font-medium text-foreground">Discovery Call</span></>,
      preview: "Duration: 45m · 3 participants",
      time: "2d ago",
      isInteractive: true,
      source: { label: "Gong", url: "https://app.gong.io/call/1234567890" },
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-md bg-purple-100 px-1.5 py-0.5 font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Discovery</span>
            <span>&middot;</span>
            <span>45m duration</span>
            <span>&middot;</span>
            <span>Attendees: You, Robert Choi, Sarah Jones</span>
          </div>
          <p className="text-sm">
            Discussed current workflow challenges and integration requirements. Robert is keen on the API documentation but concerned about implementation timeline.
          </p>
          <div className="rounded-md border border-border/50 bg-background p-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Next Steps</p>
            <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
              <li>Send API documentation (Completed)</li>
              <li>Schedule technical deep dive with Sarah</li>
              <li>Share pricing tiered options</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "e7",
      icon: <Image src={BRAND_ICONS.zendesk} alt="Zendesk" width={12} height={12} className="h-3 w-3 object-contain" />,
      title: <>Ticket updated: <span className="font-medium text-foreground">#1024 - API Rate Limiting</span></>,
      preview: "Status: Open · Priority: High",
      time: "3d ago",
      isInteractive: true,
      source: { label: "Zendesk", url: "https://acme.zendesk.com/agent/tickets/1024" },
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-md bg-yellow-100 px-1.5 py-0.5 font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">Open</span>
            <span className="rounded-md bg-red-100 px-1.5 py-0.5 font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">High Priority</span>
            <span className="text-muted-foreground">&middot;</span>
            <span className="text-muted-foreground">Assignee: Support Team</span>
          </div>
          <p className="text-sm">
            Engineering is investigating the 429 errors reported during peak load testing. Preliminary findings suggest a misconfiguration in the sandbox environment quota.
          </p>
          <div className="text-xs text-muted-foreground">
            Latest comment by <span className="font-medium text-foreground">Alex Chen</span> &middot; 2h ago
          </div>
        </div>
      ),
    },
  ]
}

// ---------------------------------------------------------------------------
// Analytics data
// ---------------------------------------------------------------------------

const ANALYTICS_PIPELINE_STAGES: PipelineStage[] = [
  { id: "received", label: "Referrals Received", count: 847, trend: "+12%", nextConversion: "85%" },
  { id: "contacted", label: "Successfully Contacted", count: 720, trend: "+4%", nextConversion: "92%" },
  { id: "intake_sent", label: "Intake Sent", count: 661, trend: "+6%", nextConversion: "93%" },
  { id: "intake_done", label: "Intake Completed", count: 613, trend: "+6%", nextConversion: "99%" },
  { id: "scheduled", label: "Scheduled", count: 612, trend: "+5%", nextConversion: "85%" },
  { id: "completed", label: "Completed", count: 520, trend: "+4%", nextConversion: null },
]

const ANALYTICS_STAGE_METRICS: Record<string, PipelineStageMetrics> = {
  received: { medianTime: "6h", avgTime: "10h", dropOffs: [{ reason: "Lost/Other", count: 56, pct: "7%" }, { reason: "Coverage", count: 40, pct: "5%" }, { reason: "Unqualified", count: 30, pct: "4%" }] },
  contacted: { medianTime: "1.1d", avgTime: "1.8d", dropOffs: [{ reason: "No Contact", count: 60, pct: "8%" }] },
  intake_sent: { medianTime: "0.5d", avgTime: "1.2d", dropOffs: [{ reason: "Intake Drop", count: 48, pct: "7%" }] },
  intake_done: { medianTime: "1.5d", avgTime: "2.1d", dropOffs: [{ reason: "Unqualified", count: 1, pct: "<1%" }] },
  scheduled: { medianTime: "1.2d", avgTime: "1.6d", dropOffs: [{ reason: "No Show/Cancel", count: 92, pct: "15%" }] },
  completed: { medianTime: "1h", avgTime: "1.5h", dropOffs: [] },
}

const ANALYTICS_TIMINGS: (PipelineStageTiming | null)[] = [
  null, { median: "1.1d", avg: "1.8d" }, { median: "0.5d", avg: "1.2d" },
  { median: "1.5d", avg: "2.1d" }, { median: "1.2d", avg: "1.6d" }, { median: "1h", avg: "1.5h" },
]

const ANALYTICS_FILTER_BREAKDOWNS = {
  Facility: { received: { Gilbert: 280, Tucson: 200, "North Phoenix": 180, Avondale: 110, Glendale: 77 } },
  Channel: { received: { eFax: 508, Webform: 170, Phone: 169 } },
  Source: { received: { "Dr. Smith": 220, "Dr. Johnson": 180, "Dr. Williams": 150, "Dr. Martinez": 140, "Other PCPs": 157 } },
  "Lead Source": { received: { PCP: 400, School: 250, "Social (Instagram)": 100, "Social (Facebook)": 97 } },
  Payer: { received: { "Blue Cross Blue Shield": 280, Aetna: 180, UnitedHealthcare: 150, Cigna: 120, Medicare: 70, Medicaid: 30, Other: 17 } },
}

const ANALYTICS_VOLUME_DATES = ["Jan 13", "Jan 14", "Jan 15", "Jan 16", "Jan 17", "Jan 18", "Jan 19"]
function genAnalyticsVolumeData(keys: string[]) {
  return ANALYTICS_VOLUME_DATES.map((date) => {
    const point: Record<string, unknown> = { date }
    keys.forEach((key) => { point[key] = Math.floor(Math.random() * 30) + 5 })
    return point
  })
}
const ANALYTICS_VOLUME_DATA = genAnalyticsVolumeData(["Gilbert", "North Phoenix", "Tucson", "Avondale", "Glendale"])
const ANALYTICS_VOLUME_KEYS = [
  { key: "Gilbert", color: "#10b981" },
  { key: "North Phoenix", color: "#3b82f6" },
  { key: "Tucson", color: "#8b5cf6" },
  { key: "Avondale", color: "#f59e0b" },
  { key: "Glendale", color: "#ec4899" },
]

// ---------------------------------------------------------------------------
// Admin tabs (sample)
// ---------------------------------------------------------------------------

const ADMIN_TABS: AdminTab[] = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    content: (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">General</h2>
          <p className="text-sm text-muted-foreground">Manage workspace settings and preferences.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Workspace name</p>
                <p className="text-xs text-muted-foreground">Acme Financial</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Timezone</p>
                <p className="text-xs text-muted-foreground">Pacific Time (US & Canada)</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Default currency</p>
                <p className="text-xs text-muted-foreground">USD ($)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: LinkIcon,
    content: (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Integrations</h2>
          <p className="text-sm text-muted-foreground">Connect to your data sources and tools.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Salesforce", connected: true },
            { name: "Slack", connected: true },
            { name: "Gmail", connected: true },
            { name: "HubSpot", connected: false },
            { name: "Outlook", connected: false },
          ].map((item) => (
            <div key={item.name} className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{item.name}</p>
                {item.connected && <div className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.connected ? "Connected" : "Not connected"}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    content: (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Team</h2>
          <p className="text-sm text-muted-foreground">Manage workspace members and roles.</p>
        </div>
        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="px-6 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">User</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Sarah Johnson", role: "Admin", status: "Active" },
                { name: "Mike Chen", role: "Editor", status: "Active" },
                { name: "Emily Davis", role: "Viewer", status: "Invited" },
              ].map((member) => (
                <tr key={member.name} className="border-b border-border/40 last:border-0">
                  <td className="px-6 py-3 font-medium">{member.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{member.role}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${member.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    content: (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Security</h2>
          <p className="text-sm text-muted-foreground">Authentication and access controls.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Two-factor authentication</p>
                <p className="text-xs text-muted-foreground">Require 2FA for all workspace members</p>
              </div>
              <span className="text-xs font-medium text-emerald-600">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">SSO provider</p>
                <p className="text-xs text-muted-foreground">Okta — connected</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Session timeout</p>
                <p className="text-xs text-muted-foreground">24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SIDEBAR_SECTIONS: SidebarNavSection[] = [
  {
    items: [
      { id: "search", label: "Search", icon: Search },
      { id: "inbox", label: "Unibox", icon: Inbox },
      { id: "drafts", label: "Drafts", icon: FileText },
    ],
  },
  {
    title: "Book",
    items: [
      { id: "accounts", label: "My Accounts", icon: Building },
      { id: "activity", label: "Activity", icon: Activity },
      { id: "dashboard", label: "Insights", icon: BarChart2 },
    ],
  },
  {
    title: "Acme Co Assistant",
    items: [
      { id: "new-chat", label: "New chat", icon: Plus },
      { id: "chats", label: "Chats", icon: MessageSquare },
    ],
  },
  {
    title: "Your Teams",
    items: [
      { id: "account-dev", label: "Account Development", icon: Users },
      { id: "rel-mgmt", label: "Relationship Management", icon: Users },
    ],
    moreItems: [
      { id: "more-teams", label: "More", icon: MoreHorizontal },
    ],
  },
  {
    title: "Settings",
    items: [
      { id: "admin", label: "Admin", icon: Settings },
    ],
  },
]

const PREVIEW_CONFIG: PrototypeConfig = {
  brand: {
    name: "Acme Financial",
    assistantName: "El",
  },
  sidebar: SIDEBAR_SECTIONS,
  defaultView: "inbox",
  views: {
    inbox: {
      items: MOCK_QUEUE,
      accountContacts: ACCOUNT_CONTACTS_BY_COMPANY.CloudKitchen,
      buildAccountContacts,
      emailSignature: EMAIL_SIGNATURE,
      buildSuggestedActions,
      buildSourceItems,
      getSignalScore,
      getTimelineEvents,
      iconMap: {
        gmail: BRAND_ICONS.gmail.icon,
        slack: BRAND_ICONS.slack,
        zendesk: BRAND_ICONS.zendesk,
        salesforce: BRAND_ICONS.salesforce,
      },
    },
    insights: {
      analytics: {
        pipeline: {
          stages: ANALYTICS_PIPELINE_STAGES,
          stageMetrics: ANALYTICS_STAGE_METRICS,
          stageTimings: ANALYTICS_TIMINGS,
          filterBreakdowns: ANALYTICS_FILTER_BREAKDOWNS,
        },
        volumeChart: {
          data: ANALYTICS_VOLUME_DATA,
          dataKeys: ANALYTICS_VOLUME_KEYS,
          filterOptions: [
            { label: "Facility", value: "facility" },
            { label: "Channel", value: "channel" },
            { label: "Source", value: "source" },
            { label: "Payer", value: "payer" },
          ],
        },
        donutChart: {
          data: [
            { name: "No Contact", value: 6, color: "#0F4C3A" },
            { name: "Stalled", value: 4, color: "#15803d" },
            { name: "Needs Attn", value: 8, color: "#3DB4A0" },
            { name: "Auth Delay", value: 5, color: "#5FCFBC" },
            { name: "DCS Hold", value: 3, color: "#86EFAC" },
            { name: "Expired", value: 2, color: "#A7F3D0" },
          ],
          centerLabel: 28,
        },
        trendChart: {
          data: [
            { name: "3 Weeks Ago", Scheduled: 12, Administered: 10, Canceled: 2 },
            { name: "2 Weeks Ago", Scheduled: 18, Administered: 14, Canceled: 3 },
            { name: "Last Week", Scheduled: 15, Administered: 13, Canceled: 1 },
            { name: "This Week", Scheduled: 22, Administered: 18, Canceled: 4 },
          ],
          series: [
            { dataKey: "Scheduled", color: "#10b981" },
            { dataKey: "Administered", color: "#3b82f6" },
            { dataKey: "Canceled", color: "#ef4444" },
          ],
          toggleOptions: ["Scheduled", "Administered", "Canceled"],
        },
        barChart: {
          data: [
            { date: "Jan 13", phone: 120, text: 95, email: 25 },
            { date: "Jan 14", phone: 145, text: 88, email: 30 },
            { date: "Jan 15", phone: 132, text: 110, email: 28 },
            { date: "Jan 16", phone: 160, text: 105, email: 35 },
            { date: "Jan 17", phone: 148, text: 92, email: 22 },
            { date: "Jan 18", phone: 155, text: 98, email: 32 },
            { date: "Jan 19", phone: 138, text: 102, email: 27 },
          ],
          bars: [
            { dataKey: "phone", color: "#059669", name: "Phone Calls", icon: Phone },
            { dataKey: "text", color: "#10b981", name: "Text Messages", icon: MessageSquare },
            { dataKey: "email", color: "#34d399", name: "Emails", icon: Mail },
          ],
        },
        barList: {
          data: [
            { name: "Outreach", value: 42 },
            { name: "Follow-up", value: 28 },
            { name: "Scheduling", value: 18 },
            { name: "Verification", value: 12 },
          ],
          valueFormatter: (v: number) => `${v}%`,
        },
      },
    },
    accounts: {},
    workQueue: {},
    admin: {
      title: "Admin",
      icon: Settings,
      tabs: ADMIN_TABS,
    },
  },
  entityPanel: {
    icons: {
      linkedin: BRAND_ICONS.linkedin,
      gmail: BRAND_ICONS.gmail.icon,
      slack: BRAND_ICONS.slack,
      gdoc: BRAND_ICONS.gdoc,
    },
  },
}

// ---------------------------------------------------------------------------
// Entity panel content (uses Next.js Image, specific to this preview)
// ---------------------------------------------------------------------------

function PreviewEntityPanelContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <EntityDetails onClose={onClose} />
      <PotentialContacts
        icons={{
          linkedin: BRAND_ICONS.linkedin,
          gmail: BRAND_ICONS.gmail.icon,
        }}
      />
      <RecentActivity
        items={[
          {
            id: "1",
            icon: <Image src={BRAND_ICONS.gong} alt="Gong" width={16} height={16} className="w-4 h-4 object-contain" />,
            title: <>Call summary logged for <span className="font-medium text-foreground">Sarah Chen</span></>,
            time: "335d ago",
            preview: "Treasury strategy discussion and technical review planning.",
            source: { label: "Gong", url: "https://app.gong.io/call/0987654321" },
            content: (
              <div className="space-y-2">
                <p className="font-medium text-foreground">Strong interest in yield optimization and cash management.</p>
                <p>Sarah discussed their current treasury setup managing $12M across 4 accounts. Key pain point is manual reconciliation taking 2+ hours daily. Decision timeline tied to Q2 board meeting in 6 weeks.</p>
              </div>
            ),
            isInteractive: true,
          },
          {
            id: "2",
            icon: <Users className="w-4 h-4 text-orange-500" />,
            title: <>Leadership update: <span className="font-medium text-foreground">Mike Rodriguez</span> joined as VP Engineering</>,
            time: "344d ago",
            content: "Mike Rodriguez joined as VP Engineering 2 weeks ago. Previously at Stripe where he led payments infrastructure. His hiring signals a shift toward building custom integrations, which could accelerate or complicate our API-first pitch.",
            isInteractive: false,
          },
          {
            id: "3",
            icon: <Image src={BRAND_ICONS.gmail.icon} alt="Gmail" width={16} height={16} className="w-4 h-4 object-contain" />,
            title: <>Email thread: <span className="font-medium text-foreground">Q2 Treasury Review - Next Steps</span></>,
            time: "Today",
            preview: "Latest reply confirms Tuesday at 2 PM with CFO included.",
            email: {
              from: "Jordan Park",
              fromEmail: "jordan@handled.ai",
              to: "sarah.chen@cloudkitchen.com",
              cc: "marcus.webb@cloudkitchen.com, alex.rivera@handled.ai",
              bcc: "deal-notes@handled.ai",
              date: "Today, 9:15 AM",
              subject: "Re: Q2 Treasury Review - Next Steps",
              body: (
                <>
                  Hi Sarah,{"\n\n"}
                  Perfect - Tuesday at 2 PM is confirmed. I&apos;ll send a calendar invite shortly.{"\n\n"}
                  I&apos;ve attached our API documentation and a sample integration guide. Happy to set up a sandbox
                  environment for Mike&apos;s team.{"\n\n"}
                  Best,{"\n"}
                  Jordan
                </>
              ),
            },
            isInteractive: true,
          },
          {
            id: "4",
            icon: <Image src={BRAND_ICONS.zendesk} alt="Zendesk" width={16} height={16} className="w-4 h-4 object-contain" />,
            title: <>Ticket updated: <span className="font-medium text-foreground">#1024 - API Rate Limiting</span></>,
            time: "343d ago",
            preview: "Status: Open · Priority: High",
            source: { label: "Zendesk", url: "https://acme.zendesk.com/agent/tickets/1024" },
            content: (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-md bg-yellow-100 px-1.5 py-0.5 font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">Open</span>
                  <span className="rounded-md bg-red-100 px-1.5 py-0.5 font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">High Priority</span>
                  <span className="text-muted-foreground">&middot;</span>
                  <span className="text-muted-foreground">Assignee: Support Team</span>
                </div>
                <p className="text-sm">
                  Engineering is investigating the 429 errors reported during peak load testing. Preliminary findings suggest a sandbox quota configuration issue.
                </p>
                <div className="text-xs text-muted-foreground">
                  Latest comment by <span className="font-medium text-foreground">Alex Chen</span> &middot; 2h ago
                </div>
              </div>
            ),
            isInteractive: true,
          },
        ]}
      />
      <ConnectedApps
        icons={{
          slack: BRAND_ICONS.slack,
          gdoc: BRAND_ICONS.gdoc,
        }}
      />
      <SystemActivity />
    </>
  )
}

// Need these imports for the entity panel content
import {
  EntityDetails,
  PotentialContacts,
  RecentActivity,
  ConnectedApps,
  SystemActivity,
} from "@/registry/new-york/ui/entity-panel"

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PreviewClientPage() {
  const exitButton = (
    <Link href="/">
      <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" />
        Exit Preview
      </Button>
    </Link>
  )

  return (
    <PrototypeShell
      config={PREVIEW_CONFIG}
      headerActions={exitButton}
      entityPanelChildren={({ onClose }) => <PreviewEntityPanelContent onClose={onClose} />}
    />
  )
}
