"use client"

import * as React from "react"
import Link from "next/link"
import {
  Inbox,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  FileText,
  Clock,
  CheckSquare,
  Eye,
  Plus,
  MessageSquare,
  BarChart2,
  Users,
  Building,
  Activity,
  MoreHorizontal,
  Mail,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  X,
  LayoutList,
  Columns2,
  Square,
  Tag,
  Phone,
  TrendingUp,
} from "lucide-react"
import { BRAND_ICONS } from "@/lib/icons"

import {
  QuickActionSidebarNav,
  type SidebarNavSection,
} from "@/registry/new-york/ui/quick-action-sidebar-nav"

import { MetricCard } from "@/registry/new-york/ui/metric-card"
import {
  Citation,
  type SourceDef,
} from "@/registry/new-york/ui/detail-view"
import { Button } from "@/registry/new-york/ui/button"
import { Badge } from "@/registry/new-york/ui/badge"
import { Input } from "@/registry/new-york/ui/input"
import {
  TopTasksCard,
  UpcomingMeetingsCard,
  RecentlyCompletedCard,
  CheckInsCard
} from "@/registry/new-york/ui/dashboard-cards"
import {
  EntityPanel,
  EntityDetails,
  PotentialContacts,
  RecentActivity,
  ConnectedApps,
  SystemActivity,
} from "@/registry/new-york/ui/entity-panel"
import { SignalApproval } from "@/registry/new-york/ui/signal-feedback-inline"
import { ScoreBreakdown, type ScoreFactor } from "@/registry/new-york/ui/score-breakdown"
import {
  SuggestedActions,
  type SuggestedAction,
  type SuggestedContact,
} from "@/registry/new-york/ui/suggested-actions"
import { DataTable } from "@/registry/new-york/ui/data-table"
import { ItemList, GroupedListView, type GroupedListGroup } from "@/registry/new-york/ui/item-list"
import { ViewModeToggle } from "@/registry/new-york/ui/view-mode-toggle"
import { TimelineActivity } from "@/registry/new-york/ui/timeline-activity"
import { VolumeAnalysisChart } from "@/registry/new-york/ui/volume-analysis-chart"
import { DonutChart } from "@/registry/new-york/ui/donut-chart"
import { TrendAreaChart } from "@/registry/new-york/ui/trend-area-chart"
import { BarChartComponent } from "@/registry/new-york/ui/bar-chart-component"
import { StyledBarList } from "@/registry/new-york/ui/styled-bar-list"
import { PipelineOverview, type PipelineStage, type PipelineStageMetrics, type PipelineStageTiming } from "@/registry/new-york/ui/pipeline-overview"
import { ReportCard } from "@/registry/new-york/ui/report-card"
import {
  InboxToolbar,
  type AssigneeFilter,
  type InboxFilterCategory,
} from "@/registry/new-york/ui/inbox-toolbar"

const MOCK_QUEUE = [
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

type QueueItem = (typeof MOCK_QUEUE)[number]

const ACCOUNT_CONTACTS: SuggestedContact[] = [
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
]

const EMAIL_SIGNATURE = `Sarah Johnson\nSenior Account Executive\nAcme Financial · (415) 555-0100\nsarah.johnson@acmefinancial.com`

const buildSuggestedActions = (item: QueueItem): SuggestedAction[] => [
  {
    id: `${item.id}-email`,
    type: "email",
    label: `Reply to ${item.company}`,
    status: "pending",
    followUp: { enabled: true, days: 3 },
    emailMeta: {
      from: "Sarah Johnson",
      fromEmail: "sarah.johnson@acmefinancial.com",
      to: {
        name: "Scott Mitchell",
        role: "CFO",
        email: "scott.mitchell@cloudkitchen.com",
        emails: ["scott.mitchell@cloudkitchen.com", "smitchell@cloudkitchen.io"],
        confirmed: false,
      },
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
      to: {
        name: "Jackie Lee",
        role: "VP Finance",
        email: "jackie.lee@cloudkitchen.com",
        emails: ["jackie.lee@cloudkitchen.com", "jlee@cloudkitchen.io"],
        confirmed: false,
      },
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

const buildSourceItems = (item: QueueItem): SourceDef[] => [
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

const SIGNAL_SCORE_DATA: Record<string, {
  score: number
  factors: ScoreFactor[]
  whyNow: string
  evidence: string[]
  confidence: number
}> = {
  Lunchclub: {
    score: 78,
    factors: [
      { key: "trigger", label: "Trigger strength", score: 85, why: "Large balance outflow pattern — strong churn signal for banking infrastructure" },
      { key: "fit", label: "Company fit", score: 72, why: "Series B, 150+ employees — matches retention ICP" },
      { key: "timing", label: "Timing", score: 82, why: "Outflow detected within critical 30-day window" },
      { key: "signals", label: "Market signals", score: 68, why: "Competitor mentions in Slack channel suggest active evaluation" },
      { key: "competitive", label: "Competitive risk", score: null, risk: "High", why: "Active competitor evaluation detected in #treasury-questions" },
    ],
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
    ],
    whyNow: "New VP Finance hire at a high-growth Series B company creates a strong buying window for banking infrastructure.",
    evidence: [
      "Jackie Lee joined as VP Finance 12 days ago",
      "3 open finance/treasury roles indicate team buildout",
      "No existing banking platform detected — greenfield opportunity",
    ],
    confidence: 91,
  },
}

const getSignalScore = (company: string) => {
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

const ANALYTICS_DONUT_DATA = [
  { name: "No Contact", value: 6, color: "#0F4C3A" },
  { name: "Stalled", value: 4, color: "#15803d" },
  { name: "Needs Attn", value: 8, color: "#3DB4A0" },
  { name: "Auth Delay", value: 5, color: "#5FCFBC" },
  { name: "DCS Hold", value: 3, color: "#86EFAC" },
  { name: "Expired", value: 2, color: "#A7F3D0" },
]

const ANALYTICS_TREND_DATA = [
  { name: "3 Weeks Ago", Scheduled: 12, Administered: 10, Canceled: 2 },
  { name: "2 Weeks Ago", Scheduled: 18, Administered: 14, Canceled: 3 },
  { name: "Last Week", Scheduled: 15, Administered: 13, Canceled: 1 },
  { name: "This Week", Scheduled: 22, Administered: 18, Canceled: 4 },
]

const ANALYTICS_BAR_DATA = [
  { date: "Jan 13", phone: 120, text: 95, email: 25 },
  { date: "Jan 14", phone: 145, text: 88, email: 30 },
  { date: "Jan 15", phone: 132, text: 110, email: 28 },
  { date: "Jan 16", phone: 160, text: 105, email: 35 },
  { date: "Jan 17", phone: 148, text: 92, email: 22 },
  { date: "Jan 18", phone: 155, text: 98, email: 32 },
  { date: "Jan 19", phone: 138, text: 102, email: 27 },
]

const ANALYTICS_BAR_LIST_DATA = [
  { name: "Outreach", value: 42 },
  { name: "Follow-up", value: 28 },
  { name: "Scheduling", value: 18 },
  { name: "Verification", value: 12 },
]

export default function PreviewClientPage() {
  const [currentView, setCurrentView] = React.useState("inbox")
  const [inboxViewMode, setInboxViewMode] = React.useState<"inbox" | "list" | "detail">("inbox")
  const [previousViewMode, setPreviousViewMode] = React.useState<"inbox" | "list">("inbox")
  const [selectedTask, setSelectedTask] = React.useState(MOCK_QUEUE[0])
  const [showAllMetrics, setShowAllMetrics] = React.useState(false)
  const [showCoaching, setShowCoaching] = React.useState(true)
  const [isEntityPanelOpen, setIsEntityPanelOpen] = React.useState(false)
  const [showRecentActivity, setShowRecentActivity] = React.useState(false)
  const [extraActions, setExtraActions] = React.useState<SuggestedAction[]>([])
  const [inboxAssignee, setInboxAssignee] = React.useState<AssigneeFilter>("me")
  const [inboxFilters, setInboxFilters] = React.useState<Record<string, string>>({})
  const [evidenceExpanded, setEvidenceExpanded] = React.useState(false)
  const [insightsTab, setInsightsTab] = React.useState<"overview" | "analytics">("overview")

  const INBOX_FILTER_CATEGORIES: InboxFilterCategory[] = React.useMemo(
    () => [
      {
        id: "category",
        label: "Category",
        icon: <Tag className="h-3.5 w-3.5 text-muted-foreground" />,
        options: [...new Set(MOCK_QUEUE.map((i) => i.tag1))],
      },
      {
        id: "account",
        label: "Account",
        icon: <Building className="h-3.5 w-3.5 text-muted-foreground" />,
        options: [...new Set(MOCK_QUEUE.map((i) => i.company))],
      },
    ],
    []
  )

  const handleInboxItemSelect = React.useCallback(
    (item: (typeof MOCK_QUEUE)[number]) => {
      setSelectedTask(item)
      if (inboxViewMode === "list") {
        setPreviousViewMode("list")
        setInboxViewMode("detail")
      }
    },
    [inboxViewMode]
  )

  const inboxGroups = React.useMemo<GroupedListGroup<QueueItem>[]>(() => {
    const urgent = MOCK_QUEUE.filter((i) => i.statusColor === "red")
    const active = MOCK_QUEUE.filter((i) => i.statusColor !== "red")
    return [
      { key: "urgent", label: "Urgent", items: urgent },
      { key: "active", label: "Active", items: active },
    ].filter((g) => g.items.length > 0)
  }, [])

  const renderInboxRow = React.useCallback((item: QueueItem) => (
    <>
      <span className={`h-2 w-2 shrink-0 rounded-full ${item.statusColor === "red" ? "bg-[#f43f5e]" : "bg-[#3b82f6]"}`} />
      <span className="w-[80px] shrink-0 font-mono text-xs text-muted-foreground/80">{item.id}</span>
      <span className="w-[110px] shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground truncate">{item.tag1}</span>
      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{item.title}</span>
      <span className="w-[120px] shrink-0 truncate text-xs font-medium text-foreground">{item.company}</span>
      <span className="w-[80px] shrink-0 text-right text-xs text-muted-foreground">{item.time}</span>
    </>
  ), [])

  const handleBackFromDetail = React.useCallback(() => {
    setInboxViewMode(previousViewMode)
  }, [previousViewMode])

  const handleViewModeChange = React.useCallback(
    (id: string) => {
      const mode = id as "inbox" | "list" | "detail"
      if (mode !== "detail") {
        setPreviousViewMode(mode)
      }
      setInboxViewMode(mode)
    },
    []
  )

  // Responsive: auto-collapse to detail on narrow viewports
  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)")

    function handleChange(e: MediaQueryListEvent | MediaQueryList) {
      if (e.matches && inboxViewMode === "inbox") {
        setPreviousViewMode("inbox")
        setInboxViewMode("detail")
      }
    }

    handleChange(mql)
    mql.addEventListener("change", handleChange)
    return () => mql.removeEventListener("change", handleChange)
  }, [inboxViewMode])

  React.useEffect(() => {
    setShowRecentActivity(false)
    setEvidenceExpanded(false)
  }, [selectedTask.id])

  const handleDuplicate = React.useCallback((id: number | string) => {
    const base = [...buildSuggestedActions(selectedTask), ...extraActions].find((a) => a.id === id)
    if (!base || base.type !== "email") return
    const clone: SuggestedAction = {
      ...base,
      id: `${base.id}-dup-${Date.now()}`,
      emailMeta: base.emailMeta ? { ...base.emailMeta, to: undefined } : undefined,
    }
    setExtraActions((prev) => [...prev, clone])
  }, [selectedTask, extraActions])

  const renderDetailView = (item: QueueItem) => {
    const suggestedActions = [...buildSuggestedActions(item), ...extraActions]
    const sourceItems = buildSourceItems(item)

    return (
      <SignalApproval.Root
        companyName={item.company}
        opportunityUrl={`https://acme.lightning.force.com/lightning/r/Opportunity/006${item.id}/view`}
        onApprove={() => {
          console.log("Approved signal — creating Salesforce opportunity:", { taskId: item.id, company: item.company })
        }}
        onApproveFeedback={(reasons, detail) => {
          console.log("Approval feedback:", { taskId: item.id, company: item.company, reasons, detail })
        }}
        onDismiss={(reasons, detail) => {
          console.log("Dismissed signal:", { taskId: item.id, reasons, detail })
        }}
      >
      <div className="mx-auto w-full max-w-3xl p-6 pb-12 md:p-8">
        <div className="pb-8">
          <div className="mb-4 flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <span className="text-muted-foreground/40">&middot;</span>
            <span className="text-xs text-muted-foreground">{item.company}</span>
          </div>

          <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground">{item.title}</h1>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            {item.statusColor === "red" && (
              <div className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                <span className="text-[10px] font-bold">!</span> Urgent
              </div>
            )}
            <div className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {item.tag1}
            </div>
            <button
              type="button"
              onClick={() => setIsEntityPanelOpen(true)}
              className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/30 px-2 py-1 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded bg-muted-foreground/10 text-[9px] font-semibold text-muted-foreground">
                {item.company.substring(0, 1)}
              </div>
              <span className="text-xs font-medium text-foreground">{item.company}</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            </button>
          </div>

            <div className="mb-8">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Signal brief</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  We detected signals that suggest a potential opportunity with {item.company}.
                </p>

                {/* Why Now -- pulled from score analysis */}
                {(() => {
                  const signalData = getSignalScore(item.company)
                  return (
                    <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                      {signalData.whyNow}
                    </p>
                  )
                })()}

                {/* Signal Score */}
                {(() => {
                  const signalData = getSignalScore(item.company)
                  const pct = signalData.score
                  const scoreColor = pct >= 70 ? "text-emerald-600" : pct >= 40 ? "text-amber-600" : "text-red-600"
                  const barColor = pct >= 70 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-500" : "bg-red-500"
                  const scoreLabel = pct >= 70 ? "HIGH" : pct >= 40 ? "MEDIUM" : "LOW"

                  const evidenceWithCitations: React.ReactNode[] = [
                    <>
                      There are <span className="font-medium text-foreground">3 unusual signals</span> including a large balance
                      outflow and reduced login frequency
                      <Citation number={1} source={sourceItems[0]} />
                      <Citation number={2} source={sourceItems[1]} />
                      <Citation number={3} source={sourceItems[2]} />
                    </>,
                    <>
                      Scott mentioned in <span className="font-medium text-foreground">#treasury-questions</span> that they are actively
                      looking for treasury management options
                      <Citation number={4} source={sourceItems[2]} />
                    </>,
                    <>
                      You have a recent email thread regarding optimization options that hasn&apos;t been replied to
                      <Citation number={5} source={sourceItems[3]} />
                    </>,
                  ]

                  return (
                    <div className="mb-5 rounded-md border border-border bg-muted/20 p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Signal Score</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{signalData.score}/100</span>
                          <span className={`text-[10px] font-bold uppercase ${scoreColor}`}>{scoreLabel}</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${signalData.score}%` }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setEvidenceExpanded((prev) => !prev)}
                        className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${evidenceExpanded ? "rotate-180" : ""}`} />
                        View more
                      </button>

                      {evidenceExpanded && (
                        <div className="mt-3 space-y-3">
                          <ul className="space-y-2">
                            {evidenceWithCitations.map((item_ev, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground leading-relaxed">{item_ev}</span>
                              </li>
                            ))}
                          </ul>

                          <ScoreBreakdown
                            factors={signalData.factors}
                            onFactorFeedback={(key, type, detail) =>
                              console.log("Signal factor feedback:", { company: item.company, factor: key, type, detail })
                            }
                          />

                          <SignalApproval.Actions />
                        </div>
                      )}
                    </div>
                  )
                })()}

                {!evidenceExpanded && <SignalApproval.Actions />}
            </div>

          <div className="mb-8">
                  <button
                    type="button"
                    onClick={() => setShowRecentActivity((prev) => !prev)}
                    className="group/timeline flex w-full items-center justify-between gap-2 py-2 rounded-md transition-colors hover:bg-muted/40 -mx-2 px-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider group-hover/timeline:text-foreground transition-colors">Activity timeline</h3>
                      {!showRecentActivity && (
                        <span className="text-[11px] text-muted-foreground/60">&middot; 1d ago</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-medium text-muted-foreground">{showRecentActivity ? "7 events" : "7 events"}</span>
                      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${showRecentActivity ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {showRecentActivity ? (
                    <div className="mt-3">
                      <TimelineActivity
                        events={[
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
                            icon: <img src={BRAND_ICONS.gong} alt="Gong" className="h-3 w-3 object-contain" />,
                            title: <>Meeting recorded: <span className="font-medium text-foreground">Discovery Call</span></>,
                            preview: "Duration: 45m · 3 participants",
                            time: "2d ago",
                            isInteractive: true,
                            source: {
                              label: "Gong",
                              url: "https://app.gong.io/call/1234567890",
                            },
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
                            icon: <img src={BRAND_ICONS.zendesk} alt="Zendesk" className="h-3 w-3 object-contain" />,
                            title: <>Ticket updated: <span className="font-medium text-foreground">#1024 - API Rate Limiting</span></>,
                            preview: "Status: Open · Priority: High",
                            time: "3d ago",
                            isInteractive: true,
                            source: {
                              label: "Zendesk",
                              url: "https://acme.zendesk.com/agent/tickets/1024",
                            },
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
                        ]}
                      />
                    </div>
                  ) : null}
          </div>
        </div>

        <SignalApproval.Gate>
          <SuggestedActions
            actions={suggestedActions}
            accountContacts={ACCOUNT_CONTACTS}
            signature={EMAIL_SIGNATURE}
            onDismiss={(id) => console.log("Dismiss action:", id)}
            onSend={(id) => console.log("Send action:", id)}
            onSaveDraft={(id) => console.log("Save draft:", id)}
            onDuplicate={handleDuplicate}
            onOpenAccountDetails={() => setIsEntityPanelOpen(true)}
            onOpenRecentActivity={() => {
              setIsEntityPanelOpen(true)
              setTimeout(() => {
                document.getElementById("entity-recent-activity")?.scrollIntoView({ behavior: "smooth", block: "start" })
              }, 150)
            }}
            onMarkComplete={(id) => console.log("Mark complete:", id)}
            onDispatchAgent={(id) => console.log("Dispatch agent:", id)}
          />
        </SignalApproval.Gate>
      </div>
      </SignalApproval.Root>
    )
  }

  const previewNavSections: SidebarNavSection[] = React.useMemo(
    () => [
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
    ],
    [],
  )

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans">
      <QuickActionSidebarNav
        className="z-20 h-screen shrink-0"
        navSections={previewNavSections}
        activeItemId={currentView}
        onNavigate={(id) => {
          if (["inbox", "accounts", "activity", "dashboard"].includes(id)) {
            setCurrentView(id)
          }
        }}
        onCreateTask={(draft) => {
          console.log("Quick action created:", draft)
        }}
      />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
          <div className="relative h-full flex-1 overflow-auto">
            {currentView === "dashboard" ? (
              <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">Insights & Overview</h2>
                    <p className="text-sm text-muted-foreground">Monitor your key performance indicators and daily tasks.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-semibold rounded-full px-4 border-foreground text-foreground hover:bg-muted/50">
                      <MessageCircle className="w-3.5 h-3.5" />
                      Talk to El
                    </Button>
                    <Link href="/">
                      <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-medium">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Exit Preview
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-1 border-b border-border">
                  <button
                    type="button"
                    onClick={() => setInsightsTab("overview")}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      insightsTab === "overview"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BarChart2 className="h-3.5 w-3.5" />
                      Overview
                    </span>
                    {insightsTab === "overview" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setInsightsTab("analytics")}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      insightsTab === "analytics"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Analytics
                    </span>
                    {insightsTab === "analytics" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
                    )}
                  </button>
                </div>
                
                {insightsTab === "overview" && <>
                {/* Coaching Banner */}
                {showCoaching && (
                  <div className="border border-border rounded-xl p-6 relative bg-card shadow-sm">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-4 right-4 h-6 w-6 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowCoaching(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-foreground text-sm">Daily Coaching Insight</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-4xl">
                      We analyze your pipeline activity, recent communications, and account health to provide personalized recommendations for your day.
                    </p>
                    <div className="bg-brand-purple/10 rounded-lg p-5 text-[13px] text-foreground font-medium italic border border-brand-purple/20 relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-brand-purple rounded-l-lg" />
                      &ldquo;Great job catching the churn risk on Lunchclub yesterday. Today, focus on pushing the stalled
                      intake pipeline. Try making 2 more touches on accounts that have gone dark this week.&rdquo;
                    </div>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground shadow-none">
                        <ThumbsUp className="w-3.5 h-3.5 mr-1.5" /> Helpful
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground shadow-none">
                        <ThumbsDown className="w-3.5 h-3.5 mr-1.5" /> Not Helpful
                      </Button>
                      <div className="relative max-w-sm ml-2 flex-1">
                        <Input placeholder="Provide additional feedback..." className="h-7 text-xs shadow-none border-border bg-muted/20 w-full" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Metrics Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Key Metrics</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => setShowAllMetrics(!showAllMetrics)}
                    >
                      {showAllMetrics ? "Hide additional metrics" : "Show more metrics"}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                      title="Referrals at Risk"
                      value={28}
                      change={{ value: "2 vs last week", direction: "up", isGood: false }}
                      showExternalLink
                      showInfo
                      dataPoints={[
                        { label: "No Contact", value: 6, color: "#166534" },
                        { label: "Stalled", value: 4, color: "#22c55e" },
                        { label: "Needs Attn", value: 8, color: "#6ee7b7" },
                        { label: "Auth Delay", value: 5, color: "#ccfbf1" },
                        { label: "DCS Hold", value: 3, color: "#99f6e4" },
                        { label: "Expired Referral", value: 2, color: "#f1f5f9" },
                      ]}
                    />
                    
                    <MetricCard
                      title="Dropped from Pipeline"
                      value={47}
                      change={{ value: "12 vs last week", direction: "down", isGood: true }}
                      showExternalLink
                      showInfo
                      dataPoints={[
                        { label: "No Contact", value: 12, color: "#166534" },
                        { label: "Ins. Denied", value: 15, color: "#22c55e" },
                        { label: "Refused", value: 6, color: "#6ee7b7" },
                        { label: "Intake Stalled", value: 8, color: "#ccfbf1" },
                        { label: "Other", value: 6, color: "#f1f5f9" },
                      ]}
                    />

                    <MetricCard
                      title="Time to Schedule"
                      value="4.2 days"
                      subtitle="median, referrals → scheduled"
                      change={{ value: "0.8d vs last week", direction: "down", isGood: true }}
                      footerText="Slowest stage: Contact → Intake (1.5d)"
                      showInfo
                    />

                    <MetricCard
                      title="Conversion Rate"
                      value="53%"
                      subtitle="referrals → scheduled"
                      change={{ value: "3% vs last week", direction: "up", isGood: true }}
                      footerText="Largest drop-off: No Contact (22%)"
                      showInfo
                    />

                    {showAllMetrics && (
                      <>
                        <MetricCard
                          title="Avg Handle Time"
                          value="1.2"
                          unit="days"
                          change={{ value: "0.3d vs last week", direction: "down", isGood: true }}
                          footerText="Fastest stage: Verification (0.2d)"
                          showInfo
                        />
                        <MetricCard
                          title="Conversion Rate"
                          value="78%"
                          change={{ value: "2% vs last week", direction: "up", isGood: true }}
                          footerText="Top source: Internal Referrals (85%)"
                          showInfo
                        />
                        <MetricCard
                          title="Pending Intakes"
                          value="124"
                          change={{ value: "15 vs last week", direction: "up", isGood: false }}
                          footerText="Requires immediate attention: 32"
                          showInfo
                        />
                        <MetricCard
                          title="Patient Satisfaction"
                          value="4.8"
                          unit="/ 5"
                          change={{ value: "0.1 vs last month", direction: "up", isGood: true }}
                          footerText="Based on 450 recent surveys"
                          showInfo
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                  {/* Left Column (2 spans): Tasks and Meetings */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Top Tasks */}
                    <TopTasksCard onViewAll={() => setCurrentView("inbox")} />

                    {/* Meetings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <UpcomingMeetingsCard />
                      <RecentlyCompletedCard />
                    </div>
                  </div>

                  {/* Right Column: Check-ins and Coaching */}
                  <div className="space-y-6">
                    {/* Check-ins */}
                    <CheckInsCard />
                  </div>
                </div>
                </>}

                {insightsTab === "analytics" && (
                  <div className="space-y-6">
                    {/* Pipeline Overview - Full Report Card */}
                    <PipelineOverview
                      stages={ANALYTICS_PIPELINE_STAGES}
                      stageMetrics={ANALYTICS_STAGE_METRICS}
                      stageTimings={ANALYTICS_TIMINGS}
                      filterBreakdowns={ANALYTICS_FILTER_BREAKDOWNS}
                    />

                    {/* Volume Analysis - Report Card */}
                    <ReportCard
                      title="Volume Analysis"
                      subtitle="Referral volume broken down by facility over time"
                      filterOptions={[
                        { label: "Facility", value: "facility" },
                        { label: "Channel", value: "channel" },
                        { label: "Source", value: "source" },
                        { label: "Payer", value: "payer" },
                      ]}
                      selectedFilter="facility"
                    >
                      <VolumeAnalysisChart
                        data={ANALYTICS_VOLUME_DATA}
                        dataKeys={ANALYTICS_VOLUME_KEYS}
                      />
                    </ReportCard>

                    {/* Two Column: Risk Breakdown + Trend */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ReportCard
                        title="Risk Breakdown"
                        subtitle="Referrals at risk by category"
                      >
                        <div className="flex items-center justify-center">
                          <DonutChart data={ANALYTICS_DONUT_DATA} centerLabel={28} showLegend />
                        </div>
                      </ReportCard>

                      <ReportCard
                        title="Referrals Over Time"
                        subtitle="Weekly appointment trends"
                        toggleOptions={["Scheduled", "Administered", "Canceled"]}
                        selectedToggle="Scheduled"
                      >
                        <TrendAreaChart
                          data={ANALYTICS_TREND_DATA}
                          series={[
                            { dataKey: "Scheduled", color: "#10b981" },
                            { dataKey: "Administered", color: "#3b82f6" },
                            { dataKey: "Canceled", color: "#ef4444" },
                          ]}
                          xAxisKey="name"
                          height={220}
                        />
                      </ReportCard>
                    </div>

                    {/* Outreach Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <ReportCard
                        title="Outreach Activity"
                        subtitle="Daily outreach by channel"
                        className="lg:col-span-2"
                      >
                        <BarChartComponent
                          data={ANALYTICS_BAR_DATA}
                          bars={[
                            { dataKey: "phone", color: "#059669", name: "Phone Calls", icon: Phone },
                            { dataKey: "text", color: "#10b981", name: "Text Messages", icon: MessageSquare },
                            { dataKey: "email", color: "#34d399", name: "Emails", icon: Mail },
                          ]}
                        />
                      </ReportCard>

                      <ReportCard
                        title="Top Activity Types"
                        subtitle="By completion percentage"
                      >
                        <StyledBarList
                          data={ANALYTICS_BAR_LIST_DATA}
                          valueFormatter={(v) => `${v}%`}
                        />
                      </ReportCard>
                    </div>
                  </div>
                )}
              </div>
            ) : currentView === "inbox" ? (
              <div className="flex h-full w-full flex-col">
                <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3 shrink-0">
                  <div className="flex items-center gap-3">
                    {inboxViewMode === "detail" ? (
                      <button
                        type="button"
                        onClick={handleBackFromDetail}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    ) : null}
                    <h2 className="text-lg font-semibold text-foreground">Inbox</h2>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted font-medium text-[11px] px-2 py-0.5 rounded-md">
                      {MOCK_QUEUE.length}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <ViewModeToggle
                      modes={[
                        { id: "inbox", icon: <Columns2 className="h-3.5 w-3.5" />, label: "Split View" },
                        { id: "list", icon: <LayoutList className="h-3.5 w-3.5" />, label: "List View" },
                        { id: "detail", icon: <Square className="h-3.5 w-3.5" />, label: "Detail View" },
                      ]}
                      activeMode={inboxViewMode}
                      onModeChange={handleViewModeChange}
                    />
                    <Link href="/">
                      <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Exit Preview
                      </Button>
                    </Link>
                  </div>
                </div>

                {inboxViewMode === "detail" ? (
                  <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
                    <div className="flex-1 overflow-y-auto">{renderDetailView(selectedTask)}</div>
                  </div>
                ) : inboxViewMode === "list" ? (
                  <div className="flex-1 overflow-y-auto bg-background">
                    <InboxToolbar
                      assignee={inboxAssignee}
                      onAssigneeChange={setInboxAssignee}
                      filterCategories={INBOX_FILTER_CATEGORIES}
                      selectedFilters={inboxFilters}
                      onFilterChange={(catId, val) =>
                        setInboxFilters((prev) => ({ ...prev, [catId]: val }))
                      }
                      onClearFilters={() => setInboxFilters({})}
                    />
                    <GroupedListView<QueueItem>
                      groups={inboxGroups}
                      renderRow={renderInboxRow}
                      getItemKey={(item) => item.id}
                      selectedKey={selectedTask.id}
                      onItemClick={handleInboxItemSelect}
                      emptyMessage="No inbox items"
                    />
                  </div>
                ) : (
                  <div className="flex h-full min-h-0 w-full flex-1">
                    <div className="flex h-full min-w-[380px] w-[380px] flex-col border-r border-border bg-background shadow-sm z-10">
                      <div className="flex flex-col gap-4 border-b border-border p-4 shrink-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground"><Eye className="w-4 h-4" /></Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground"><FileText className="w-4 h-4" /></Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground"><Clock className="w-4 h-4" /></Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground"><CheckSquare className="w-4 h-4" /></Button>
                          </div>
                          <Button size="sm" className="h-8 px-4 bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold gap-1.5 rounded-md">
                            <Plus className="w-4 h-4" /> Add Task
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <Filter className="absolute left-2.5 top-1.5 w-4 h-4 text-muted-foreground" />
                            <Input className="h-8 pl-8 text-xs bg-background border-border rounded-md shadow-none" placeholder="Categories" />
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-xs font-medium rounded-md shadow-none">
                            <Building className="w-3.5 h-3.5 mr-1.5" /> Accounts
                          </Button>
                        </div>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-1 scrollbar-hide">
                          <Button size="sm" className="h-7 rounded-full px-3.5 text-[11px] font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-none">All</Button>
                          <Button variant="outline" size="sm" className="h-7 rounded-full px-3.5 text-[11px] font-medium bg-transparent border-border text-muted-foreground hover:text-foreground shadow-none">Outbound (10)</Button>
                          <Button variant="outline" size="sm" className="h-7 rounded-full px-3.5 text-[11px] font-medium bg-transparent border-border text-muted-foreground hover:text-foreground shadow-none">Retention (12)</Button>
                          <Button variant="outline" size="sm" className="h-7 rounded-full px-3.5 text-[11px] font-medium bg-transparent border-border text-muted-foreground hover:text-foreground shadow-none">Relationship (9)</Button>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        {MOCK_QUEUE.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedTask(item)}
                            className={`cursor-pointer border-b border-border p-4 transition-colors group relative border-l-2 ${
                              selectedTask.id === item.id
                                ? "bg-muted/30 border-l-brand-purple"
                                : "bg-transparent border-l-transparent hover:bg-muted/10"
                            }`}
                          >
                            <div className="mb-1.5 flex items-center gap-2">
                              <span className="min-w-0 truncate text-[13px] font-semibold text-foreground leading-tight">{item.title}</span>
                              {selectedTask.id !== item.id && item.tag1 && (
                                <span className="shrink-0 rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                  {item.tag1}
                                </span>
                              )}
                              <span className="ml-auto shrink-0 text-[10px] font-medium text-muted-foreground/80">{item.time}</span>
                            </div>
                            <div className="flex items-start gap-2 mt-2">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${item.statusColor === 'red' ? 'bg-[#f43f5e]' : 'bg-[#3b82f6]'}`} />
                              <span className="text-xs text-muted-foreground leading-tight">{item.details}</span>
                            </div>

                            <div className={`absolute right-4 bottom-4 flex items-center gap-1.5 bg-background shadow-sm rounded-md px-1 py-0.5 border border-border ${
                              selectedTask.id === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"
                            }`}>
                               <Button variant="ghost" size="icon" className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"><CheckSquare className="w-3.5 h-3.5" /></Button>
                               <Button variant="ghost" size="icon" className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"><Clock className="w-3.5 h-3.5" /></Button>
                            </div>
                          </div>
                        ))}
                        <div className="p-4">
                           <Button variant="outline" size="sm" className="h-8 text-xs font-semibold rounded-md shadow-none">See more</Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
                      <div className="flex-1 overflow-y-auto">{renderDetailView(selectedTask)}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : currentView === "accounts" ? (
              <div className="flex flex-col h-full w-full bg-background relative">
                <div className="absolute top-4 right-4 z-10">
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground bg-background/50 backdrop-blur-sm">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Exit Preview
                    </Button>
                  </Link>
                </div>

                <div className="px-4 py-3 border-b border-border flex items-center gap-2 overflow-x-auto shrink-0 mt-2">
                  <Button variant="secondary" size="sm" className="h-7 text-xs rounded-md bg-muted font-medium">
                    All Accounts <Badge variant="outline" className="ml-2 h-4 px-1.5 text-[10px]">6</Badge>
                  </Button>
                  <Button size="sm" className="h-7 text-xs rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                    Needs Attention <Badge variant="secondary" className="ml-2 h-4 px-1.5 text-[10px] bg-white/20 text-white border-transparent">11</Badge>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs rounded-md border border-border bg-transparent font-medium">
                    Recent <Badge variant="secondary" className="ml-2 h-4 px-1.5 text-[10px]">7</Badge>
                  </Button>
                </div>

                <div className="flex-1 overflow-auto">
                  <DataTable onRowClick={() => setIsEntityPanelOpen(true)} />
                </div>
              </div>
            ) : currentView === "activity" ? (
              <div className="relative flex h-full w-full flex-col bg-background">
                <div className="absolute top-4 right-4 z-10">
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground bg-background/50 backdrop-blur-sm">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Exit Preview
                    </Button>
                  </Link>
                </div>

                <div className="flex-1 overflow-auto">
                  <ItemList />
                </div>
              </div>
            ) : null}
          </div>
        </main>

      <EntityPanel isOpen={isEntityPanelOpen} onClose={setIsEntityPanelOpen}>
        <EntityDetails onClose={() => setIsEntityPanelOpen(false)} />
        <PotentialContacts />
                <RecentActivity 
                  items={[
                      {
                        id: "1",
                        icon: <img src={BRAND_ICONS.gong} alt="Gong" className="w-4 h-4 object-contain" />,
                        title: <>Call summary logged for <span className="font-medium text-foreground">Sarah Chen</span></>,
                        time: "335d ago",
                        preview: "Treasury strategy discussion and technical review planning.",
                        source: {
                          label: "Gong",
                          url: "https://app.gong.io/call/0987654321",
                        },
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
                        icon: <img src={BRAND_ICONS.gmail.icon} alt="Gmail" className="w-4 h-4 object-contain" />,
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
                        icon: <img src={BRAND_ICONS.zendesk} alt="Zendesk" className="w-4 h-4 object-contain" />,
                        title: <>Ticket updated: <span className="font-medium text-foreground">#1024 - API Rate Limiting</span></>,
                        time: "343d ago",
                        preview: "Status: Open · Priority: High",
                        source: {
                          label: "Zendesk",
                          url: "https://acme.zendesk.com/agent/tickets/1024",
                        },
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
                      }
                    ]}
                  />
        <ConnectedApps />
        <SystemActivity />
      </EntityPanel>

    </div>
  )
}
