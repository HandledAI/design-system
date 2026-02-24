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
  Zap,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarHeader,
} from "@/registry/new-york/ui/sidebar"

import { MetricCard } from "@/registry/new-york/ui/metric-card"
import {
  DetailViewThread,
  ThreadMessage,
  Citation,
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
} from "@/registry/new-york/ui/entity-panel"
import { SignalFeedback } from "@/registry/new-york/ui/signal-feedback-inline"
import {
  RecommendedActionsSection,
  type RecommendedAction,
} from "@/registry/new-york/ui/recommended-actions-section"
import { QuickActionModal } from "@/registry/new-york/ui/quick-action-modal"
import { DataTable } from "@/registry/new-york/ui/data-table"
import { ItemList } from "@/registry/new-york/ui/item-list"

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

const buildRecommendedActions = (item: QueueItem): RecommendedAction[] => [
  {
    id: `${item.id}-1`,
    title: `Reply to ${item.company} treasury thread`,
    reason: `The account has multiple churn indicators and an open thread without a response. A fast, consultative reply can re-anchor trust before this concern escalates.`,
    category: item.statusColor === "red" ? "Churn" : "Nurture",
    priority: item.statusColor === "red" ? "High" : "Medium",
    dueDate: "Today",
    confidence: 0.84,
    signals: ["Balance outflow", "Lower login frequency"],
    revenueImpact: 12000,
  },
  {
    id: `${item.id}-2`,
    title: `Schedule a 20-minute risk check-in with ${item.company}`,
    reason: "A live check-in increases reply rates on sensitive topics and creates room to uncover whether this is operational variance or active vendor evaluation.",
    category: "Nurture",
    priority: "Medium",
    dueDate: "Within 48 hours",
    confidence: 0.73,
    signals: ["Slack intent signal", "Unanswered email"],
    revenueImpact: 7000,
  },
  {
    id: `${item.id}-3`,
    title: `Prepare a targeted treasury optimization brief`,
    reason: "Tailored recommendations tied to their observed behavior can convert uncertainty into concrete product value and prevent silent churn.",
    category: "Expand",
    priority: "Medium",
    dueDate: "This week",
    confidence: 0.68,
    signals: ["Treasury research mentions", "Usage pattern shift"],
    revenueImpact: 9000,
  },
]

const buildSourceItems = (item: QueueItem) => [
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

export default function PreviewClientPage() {
  const [currentView, setCurrentView] = React.useState("inbox")
  const [selectedTask, setSelectedTask] = React.useState(MOCK_QUEUE[0])
  const [showAllMetrics, setShowAllMetrics] = React.useState(false)
  const [showCoaching, setShowCoaching] = React.useState(true)
  const [isEntityPanelOpen, setIsEntityPanelOpen] = React.useState(false)
  const [isQuickActionOpen, setIsQuickActionOpen] = React.useState(false)
  const [contextExpanded, setContextExpanded] = React.useState(false)

  React.useEffect(() => {
    setContextExpanded(false)
  }, [selectedTask.id])

  const renderDetailView = (item: QueueItem) => {
    const recommendedActions = buildRecommendedActions(item)
    const sourceItems = buildSourceItems(item)

    return (
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

          <SignalFeedback.Root
            onSubmitFeedback={(type, pills, detail) => {
              console.log("Signal feedback:", { type, pills, detail, taskId: item.id })
            }}
          >
            <div className="overflow-hidden bg-background">
              <div className="relative z-20 bg-background p-4">
                <div className="flex gap-4">
                  <div className="w-1 self-stretch rounded-full bg-brand-purple" />
                  <div className="flex-1 space-y-3">
                    <div className="text-sm leading-relaxed text-foreground">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <p className="font-medium">Here&apos;s what I found for {item.company}:</p>
                        <SignalFeedback.Trigger />
                      </div>
                      <ul className="list-disc space-y-2 pl-4 text-muted-foreground marker:text-muted-foreground/60">
                        <li>
                          There are <span className="font-medium text-foreground">3 unusual signals</span> including a large balance
                          outflow and reduced login frequency
                          <Citation number={1} />
                          <Citation number={2} />
                          <Citation number={3} />
                        </li>
                        <li>
                          Scott mentioned in <span className="font-medium text-foreground">#treasury-questions</span> that they are actively
                          looking for treasury management options
                          <Citation number={4} />
                        </li>
                        <li>
                          You have a recent email thread regarding optimization options that hasn&apos;t been replied to
                          <Citation number={6} />
                        </li>
                      </ul>
                      <SignalFeedback.Panel />
                    </div>
                  </div>
                </div>

                <div className="ml-5 mt-4 pl-1">
                  <button
                    type="button"
                    onClick={() => setContextExpanded((previous) => !previous)}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 transition-colors hover:text-foreground"
                  >
                    Sources
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${contextExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {contextExpanded && (
                <div className="overflow-hidden bg-background px-6 pb-6 pt-2">
                  <div className="space-y-3">
                    {sourceItems.map((source) => (
                      <div
                        key={source.id}
                        className="group flex items-start gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-muted/30"
                      >
                        <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-border text-[9px] font-bold text-muted-foreground/60">
                          {source.id}
                        </span>
                        <div className="leading-relaxed text-muted-foreground">
                          <span>{source.summary}</span>
                          <span className="mx-1.5 text-muted-foreground/40">|</span>
                          <span className="text-xs">{source.meta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SignalFeedback.Root>
        </div>

        <RecommendedActionsSection
          actions={recommendedActions}
          onQueueAction={(action) => {
            console.log("Queue recommended action:", action.id)
          }}
          onDismissAction={(action) => {
            console.log("Dismiss recommended action:", action.id)
          }}
          onFeedback={(actionId, feedback, comment) => {
            console.log("Recommended action feedback:", { actionId, feedback, comment })
          }}
        />

        <DetailViewThread title="SUGGESTED RESPONSES" actionCount={3}>
          <ThreadMessage
            icon={<Mail className="w-4 h-4 text-red-500" />}
            subject={`Reply to ${item.company}`}
            time="4:15 PM"
            messageCount={4}
            threadLink="#"
            sender="Scott Mitchell to Me"
            senderTime="2 hours ago"
          >
            <p>Hey Sarah, thanks for checking in. We did move some funds around for a specific vendor payment cycle coming up.</p>
            <br />
            <p>
              <strong>Hi Scott,</strong>
            </p>
            <p>
              I noticed ~$4.2M moved out over the past week, which is higher than your normal pattern. Totally fine if this is
              expected (e.g., vendor payments or payroll batch), but if anything felt off or if you&apos;re exploring other options,
              I&apos;d love to help.
            </p>
          </ThreadMessage>
        </DetailViewThread>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background font-sans">
        <Sidebar variant="sidebar" className="z-20 border-r border-border bg-background">
          <SidebarHeader className="p-4 border-b-0">
            <div className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground px-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-foreground text-[10px] text-background">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><circle cx="12" cy="12" r="10"/></svg>
              </div>
              ACME CO
            </div>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide px-2 mt-1 block">Relationship Intelligence</span>
          </SidebarHeader>

          <SidebarContent className="bg-background mt-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9">
                      <Search className="h-4 w-4" />
                      <span className="font-medium text-sm">Search</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={currentView === "inbox"}
                      onClick={() => setCurrentView("inbox")}
                      className="gap-3 bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/15 hover:text-brand-purple font-medium rounded-md h-9"
                    >
                      <Inbox className="h-4 w-4" />
                      <span className="font-semibold text-sm">Unibox</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium text-sm">Drafts</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Book</div>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === "accounts"}
                      onClick={() => setCurrentView("accounts")}
                      className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9"
                    >
                      <Building className="h-4 w-4" />
                      <span className="font-medium text-sm">My Accounts</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentView === "activity"}
                      onClick={() => setCurrentView("activity")}
                      className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9"
                    >
                      <Activity className="h-4 w-4" />
                      <span className="font-medium text-sm">Activity</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={currentView === "dashboard"}
                      onClick={() => setCurrentView("dashboard")}
                      className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9"
                    >
                      <BarChart2 className="h-4 w-4" />
                      <span className="font-medium text-sm">Insights</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Acme Co Assistant</div>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9">
                      <Plus className="h-4 w-4" />
                      <span className="font-medium text-sm">New chat</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9">
                      <MessageSquare className="h-4 w-4" />
                      <span className="font-medium text-sm">Chats</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Your Teams</div>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9">
                      <Users className="h-4 w-4" />
                      <span className="font-medium text-sm">Account Development</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9">
                      <Users className="h-4 w-4" />
                      <span className="font-medium text-sm">Relationship Management</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md h-9 mt-1">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="font-medium text-sm">... More</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarFooter className="mt-auto border-t border-border bg-background p-3">
              <Button
                type="button"
                onClick={() => setIsQuickActionOpen(true)}
                className="h-11 w-full justify-between rounded-md bg-[#1B4332] px-3 text-white hover:bg-[#245240]"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Zap className="h-4 w-4" />
                  Quick Action
                </span>
                <span className="flex items-center gap-1">
                  <span className="rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold">
                    CMD
                  </span>
                  <span className="rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold">
                    K
                  </span>
                </span>
              </Button>
            </SidebarFooter>

          </SidebarContent>
        </Sidebar>

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
              </div>
            ) : currentView === "inbox" ? (
              <div className="flex h-full w-full">
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
                    <div>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted font-medium text-[11px] px-2.5 py-0.5 rounded-md">
                        31 pending
                      </Badge>
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
                        className={`cursor-pointer border-b border-border p-4 transition-colors group relative ${
                          selectedTask.id === item.id
                            ? "bg-muted/30"
                            : "bg-transparent hover:bg-muted/10"
                        }`}
                      >
                        <div className="mb-1.5 flex items-start justify-between">
                          <span className="truncate pr-2 text-[14px] font-semibold text-foreground leading-tight">{item.title}</span>
                          <span className="whitespace-nowrap pt-0.5 text-[11px] font-medium text-muted-foreground/80">{item.time}</span>
                        </div>
                        <div className="flex items-start gap-2 mt-2">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${item.statusColor === 'red' ? 'bg-[#f43f5e]' : 'bg-[#3b82f6]'}`} />
                          <span className="text-[13px] text-muted-foreground leading-tight">{item.details}</span>
                        </div>
                        
                        {/* Hover/Selected Icons on right side */}
                        <div className={`absolute right-4 bottom-4 flex items-center gap-1.5 bg-background shadow-sm rounded-md px-1 py-0.5 border border-border ${
                          selectedTask.id === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"
                        }`}>
                           <Button variant="ghost" size="icon" className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"><CheckSquare className="w-3.5 h-3.5" /></Button>
                           <Button variant="ghost" size="icon" className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"><Clock className="w-3.5 h-3.5" /></Button>
                        </div>
                        
                        {selectedTask.id !== item.id && item.tag1 === "Outbound" && (
                          <div className="mt-2 text-[11px] font-medium text-[#3b82f6]">
                            {item.tag1}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="p-4">
                       <Button variant="outline" size="sm" className="h-8 text-xs font-semibold rounded-md shadow-none">See more</Button>
                    </div>
                  </div>
                </div>

                <div className="flex h-full flex-1 flex-col overflow-hidden bg-background relative">
                  <div className="absolute top-4 right-4 z-10">
                    <Link href="/">
                      <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground bg-background/50 backdrop-blur-sm">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Exit Preview
                      </Button>
                    </Link>
                  </div>
                  <div className="flex-1 overflow-y-auto">{renderDetailView(selectedTask)}</div>
                </div>
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
                  <DataTable />
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

                <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
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
                icon: <MessageCircle className="w-4 h-4" />,
                title: "Call with Sarah Chen — Treasury strategy discussion",
                details: "Strong interest in yield optimization and cash management.",
                time: "335d ago",
                source: "Gong"
              },
              {
                icon: <Users className="w-4 h-4 text-orange-500" />,
                title: "Mike Rodriguez",
                details: "New VP Engineering may impact API integration priorities.",
                time: "344d ago",
                source: "Company Blog"
              },
              {
                icon: <Mail className="w-4 h-4" />,
                title: "Payment Operations Manager",
                details: "Payment ops expansion indicates transaction volume growth.",
                time: "343d ago",
                source: "AngelList"
              }
            ]}
          />
          <ConnectedApps />
        </EntityPanel>
        <QuickActionModal
          open={isQuickActionOpen}
          onOpenChange={setIsQuickActionOpen}
          onCreateTask={(draft) => {
            console.log("Quick action created:", draft)
          }}
        />

      </div>
    </SidebarProvider>
  )
}
