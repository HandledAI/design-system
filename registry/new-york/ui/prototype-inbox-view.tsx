"use client"

import * as React from "react"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Filter,
  FileText,
  Clock,
  CheckSquare,
  Eye,
  Plus,
  MessageSquare,
  Mail,
  Building,
  LayoutList,
  Columns2,
  Square,
  Tag,
} from "lucide-react"

import { Button } from "./button"
import { Badge } from "./badge"
import { Input } from "./input"
import { ViewModeToggle } from "./view-mode-toggle"
import {
  InboxToolbar,
  type AssigneeFilter,
  type InboxFilterCategory,
} from "./inbox-toolbar"
import { GroupedListView, type GroupedListGroup } from "./item-list"
import { SignalApproval } from "./signal-feedback-inline"
import { ScoreBreakdown } from "./score-breakdown"
import { Citation, type SourceDef } from "./detail-view"
import {
  SuggestedActions,
  type SuggestedAction,
  type SuggestedContact,
} from "./suggested-actions"
import { TimelineActivity, type TimelineEvent } from "./timeline-activity"
import type {
  QueueItem,
  InboxViewConfig,
  InboxDetailSections,
  SignalScoreData,
} from "./prototype-config"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PrototypeInboxViewProps extends InboxViewConfig {
  /** Extra ReactNode rendered at the end of the header bar (e.g. exit button). */
  headerActions?: React.ReactNode
  onOpenEntityPanel?: () => void
  onOpenRecentActivity?: () => void
  onNavigateToInbox?: () => void
}

// ---------------------------------------------------------------------------
// Default detail sections
// ---------------------------------------------------------------------------

const DEFAULT_DETAIL_SECTIONS: InboxDetailSections = {
  signalBrief: true,
  suggestedActions: true,
  timeline: true,
}

const DEFAULT_SIGNAL_SCORE: SignalScoreData = {
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

// ---------------------------------------------------------------------------
// Detail View
// ---------------------------------------------------------------------------

interface DetailViewProps {
  item: QueueItem
  sections: InboxDetailSections
  getSignalScore: (company: string) => SignalScoreData
  buildSuggestedActions: (item: QueueItem) => SuggestedAction[]
  buildSourceItems: (item: QueueItem) => SourceDef[]
  getTimelineEvents?: (item: QueueItem) => TimelineEvent[]
  accountContacts: SuggestedContact[]
  emailSignature: string
  iconMap: Record<string, string>
  onOpenEntityPanel?: () => void
  onOpenRecentActivity?: () => void
  onSuggestedActionFeedback?: (actionId: number | string, feedback: string, actionTitle?: string) => void
}

function DetailView({
  item,
  sections,
  getSignalScore,
  buildSuggestedActions,
  buildSourceItems,
  getTimelineEvents,
  accountContacts,
  emailSignature,
  iconMap,
  onOpenEntityPanel,
  onOpenRecentActivity,
  onSuggestedActionFeedback,
}: DetailViewProps) {
  const [evidenceExpanded, setEvidenceExpanded] = React.useState(false)
  const [showTimeline, setShowTimeline] = React.useState(false)
  const [extraActions, setExtraActions] = React.useState<SuggestedAction[]>([])

  React.useEffect(() => {
    setShowTimeline(false)
    setEvidenceExpanded(false)
    setExtraActions([])
  }, [item.id])

  const signalData = React.useMemo(
    () => getSignalScore(item.company),
    [getSignalScore, item.company],
  )

  const suggestedActions = React.useMemo(
    () => [...buildSuggestedActions(item), ...extraActions],
    [buildSuggestedActions, item, extraActions],
  )
  const sourceItems = React.useMemo(() => buildSourceItems(item), [buildSourceItems, item])
  const timelineEvents = React.useMemo(
    () => getTimelineEvents?.(item) ?? [],
    [getTimelineEvents, item],
  )

  const handleDuplicate = React.useCallback(
    (id: number | string) => {
      const base = suggestedActions.find((a) => a.id === id)
      if (!base || base.type !== "email") return
      const clone: SuggestedAction = {
        ...base,
        id: `${base.id}-dup-${Date.now()}`,
        emailMeta: base.emailMeta ? { ...base.emailMeta, to: undefined } : undefined,
      }
      setExtraActions((prev) => [...prev, clone])
    },
    [suggestedActions],
  )

  return (
    <SignalApproval.Root
      companyName={item.company}
      opportunityUrl={`https://acme.lightning.force.com/lightning/r/Opportunity/006${item.id}/view`}
      onApprove={() => {
        console.log("Approved signal:", { taskId: item.id, company: item.company })
      }}
      onApproveFeedback={(reasons, detail) => {
        signalData.onApproveFeedback?.(reasons, detail)
        console.log("Approval feedback:", { taskId: item.id, company: item.company, reasons, detail })
      }}
      onDismiss={(reasons, detail) => {
        signalData.onDismissFeedback?.(reasons, detail)
        console.log("Dismissed signal:", { taskId: item.id, reasons, detail })
      }}
    >
      <div className="mx-auto w-full max-w-3xl p-6 pb-12 md:p-8">
        <div className="pb-8">
          {/* Header */}
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
              onClick={onOpenEntityPanel}
              className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/30 px-2 py-1 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded bg-muted-foreground/10 text-[9px] font-semibold text-muted-foreground">
                {item.company.substring(0, 1)}
              </div>
              <span className="text-xs font-medium text-foreground">{item.company}</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            </button>
          </div>

          {/* Signal Brief */}
          {sections.signalBrief && (() => {
            const pct = signalData.score
            const scoreColor = pct >= 70 ? "text-emerald-600" : pct >= 40 ? "text-amber-600" : "text-red-600"
            const barColor = pct >= 70 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-500" : "bg-red-500"
            const scoreLabel = pct >= 70 ? "HIGH" : pct >= 40 ? "MEDIUM" : "LOW"

            const evidenceWithCitations: React.ReactNode[] =
              sourceItems.length >= 4
                ? [
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
                : signalData.evidence.map((ev, i) => (
                    <span key={i}>{ev}</span>
                  ))

            return (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Signal brief</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  We detected signals that suggest a potential opportunity with {item.company}.
                </p>
                <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                  {signalData.whyNow}
                </p>

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
                        {evidenceWithCitations.map((ev, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">{ev}</span>
                          </li>
                        ))}
                      </ul>
                      <ScoreBreakdown
                        factors={signalData.factors}
                        onFactorFeedback={signalData.onFactorFeedback ?? ((key, type, detail) =>
                          console.log("Signal factor feedback:", { company: item.company, factor: key, type, detail })
                        )}
                      />
                      <SignalApproval.Actions />
                    </div>
                  )}
                </div>

                {!evidenceExpanded && <SignalApproval.Actions />}
              </div>
            )
          })()}

          {/* Activity Timeline */}
          {sections.timeline && timelineEvents.length > 0 && (
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setShowTimeline((prev) => !prev)}
                className="group/timeline flex w-full items-center justify-between gap-2 py-2 rounded-md transition-colors hover:bg-muted/40 -mx-2 px-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider group-hover/timeline:text-foreground transition-colors">Activity timeline</h3>
                  {!showTimeline && (
                    <span className="text-[11px] text-muted-foreground/60">&middot; Last activity 1d ago</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-muted-foreground">{timelineEvents.length} events</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${showTimeline ? "rotate-180" : ""}`} />
                </div>
              </button>
              {showTimeline && (
                <div className="mt-3">
                  <TimelineActivity events={timelineEvents} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Suggested Actions */}
        {sections.suggestedActions && (
          <SignalApproval.Gate>
            <SuggestedActions
              actions={suggestedActions}
              accountContacts={accountContacts}
              signature={emailSignature}
              iconMap={iconMap}
              onDismiss={(id) => console.log("Dismiss action:", id)}
              onSend={(id) => console.log("Send action:", id)}
              onSaveDraft={(id) => console.log("Save draft:", id)}
              onDuplicate={handleDuplicate}
              onOpenAccountDetails={onOpenEntityPanel}
              onOpenRecentActivity={onOpenRecentActivity}
              onMarkComplete={(id) => console.log("Mark complete:", id)}
              onDispatchAgent={(id) => console.log("Dispatch agent:", id)}
            />
          </SignalApproval.Gate>
        )}
      </div>
    </SignalApproval.Root>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function PrototypeInboxView({
  items,
  filterCategories,
  detailSections,
  accountContacts = [],
  buildAccountContacts,
  emailSignature = "",
  buildSuggestedActions: buildSuggestedActionsProp,
  buildSourceItems: buildSourceItemsProp,
  getSignalScore: getSignalScoreProp,
  getTimelineEvents,
  iconMap = {},
  hideToolbarActions,
  hideHoverActions,
  onSuggestedActionFeedback,
  headerActions,
  onOpenEntityPanel,
  onOpenRecentActivity,
}: PrototypeInboxViewProps) {
  const [inboxViewMode, setInboxViewMode] = React.useState<"inbox" | "list" | "detail">("inbox")
  const [previousViewMode, setPreviousViewMode] = React.useState<"inbox" | "list">("inbox")
  const [selectedTask, setSelectedTask] = React.useState(items[0])
  const [inboxAssignee, setInboxAssignee] = React.useState<AssigneeFilter>("me")
  const [inboxFilters, setInboxFilters] = React.useState<Record<string, string>>({})

  const sections = React.useMemo(
    () => ({ ...DEFAULT_DETAIL_SECTIONS, ...detailSections }),
    [detailSections],
  )

  const resolvedFilterCategories: InboxFilterCategory[] = React.useMemo(
    () =>
      filterCategories ?? [
        {
          id: "category",
          label: "Category",
          icon: <Tag className="h-3.5 w-3.5 text-muted-foreground" />,
          options: [...new Set(items.map((i) => i.tag1))],
        },
        {
          id: "account",
          label: "Account",
          icon: <Building className="h-3.5 w-3.5 text-muted-foreground" />,
          options: [...new Set(items.map((i) => i.company))],
        },
      ],
    [filterCategories, items],
  )

  const buildSuggestedActions = React.useMemo(
    () => buildSuggestedActionsProp ?? (() => []),
    [buildSuggestedActionsProp],
  )

  const buildSourceItems = React.useMemo(
    () => buildSourceItemsProp ?? (() => []),
    [buildSourceItemsProp],
  )

  const getSignalScore = React.useMemo(
    () => getSignalScoreProp ?? (() => DEFAULT_SIGNAL_SCORE),
    [getSignalScoreProp],
  )

  // Grouped items for list view
  const inboxGroups = React.useMemo<GroupedListGroup<QueueItem>[]>(() => {
    const urgent = items.filter((i) => i.statusColor === "red")
    const active = items.filter((i) => i.statusColor !== "red")
    return [
      { key: "urgent", label: "Urgent", items: urgent },
      { key: "active", label: "Active", items: active },
    ].filter((g) => g.items.length > 0)
  }, [items])

  const renderInboxRow = React.useCallback(
    (item: QueueItem) => (
      <>
        <span className={`h-2 w-2 shrink-0 rounded-full ${item.statusColor === "red" ? "bg-[#f43f5e]" : "bg-[#3b82f6]"}`} />
        <span className="w-[80px] shrink-0 font-mono text-xs text-muted-foreground/80">{item.id}</span>
        <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground whitespace-nowrap">{item.tag1}</span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{item.title}</span>
        <span className="w-[120px] shrink-0 truncate text-xs font-medium text-foreground">{item.company}</span>
        <span className="w-[80px] shrink-0 text-right text-xs text-muted-foreground">{item.time}</span>
      </>
    ),
    [],
  )

  const handleInboxItemSelect = React.useCallback(
    (item: QueueItem) => {
      setSelectedTask(item)
      if (inboxViewMode === "list") {
        setPreviousViewMode("list")
        setInboxViewMode("detail")
      }
    },
    [inboxViewMode],
  )

  const handleBackFromDetail = React.useCallback(() => {
    setInboxViewMode(previousViewMode)
  }, [previousViewMode])

  const handleViewModeChange = React.useCallback((id: string) => {
    const mode = id as "inbox" | "list" | "detail"
    if (mode !== "detail") {
      setPreviousViewMode(mode)
    }
    setInboxViewMode(mode)
  }, [])

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

  const detailViewProps: DetailViewProps = {
    item: selectedTask,
    sections,
    getSignalScore,
    buildSuggestedActions,
    buildSourceItems,
    getTimelineEvents,
    accountContacts: buildAccountContacts?.(selectedTask) ?? accountContacts,
    emailSignature,
    iconMap,
    onOpenEntityPanel,
    onOpenRecentActivity,
    onSuggestedActionFeedback,
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Toolbar */}
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
            {items.length}
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
          {headerActions}
        </div>
      </div>

      {/* View modes */}
      {inboxViewMode === "detail" ? (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
          <div className="flex-1 overflow-y-auto">
            <DetailView {...detailViewProps} />
          </div>
        </div>
      ) : inboxViewMode === "list" ? (
        <div className="flex-1 overflow-y-auto bg-background">
          <InboxToolbar
            assignee={inboxAssignee}
            onAssigneeChange={setInboxAssignee}
            filterCategories={resolvedFilterCategories}
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
        /* Split view */
        <div className="flex h-full min-h-0 w-full flex-1">
          <div className="flex h-full min-w-[380px] w-[380px] flex-col border-r border-border bg-background shadow-sm z-10">
            <div className="flex flex-col gap-4 border-b border-border p-4 shrink-0">
              {!hideToolbarActions && (
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
              )}
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
              {items.map((item) => (
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
                      <span className="shrink-0 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {item.tag1}
                      </span>
                    )}
                    <span className="ml-auto shrink-0 text-[10px] font-medium text-muted-foreground/80">{item.time}</span>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${item.statusColor === "red" ? "bg-[#f43f5e]" : "bg-[#3b82f6]"}`} />
                    <span className="text-xs text-muted-foreground leading-tight">{item.details}</span>
                  </div>
                  {!hideHoverActions && (
                    <div className={`absolute right-4 bottom-4 flex items-center gap-1.5 bg-background shadow-sm rounded-md px-1 py-0.5 border border-border ${
                      selectedTask.id === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"
                    }`}>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"><CheckSquare className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"><Clock className="w-3.5 h-3.5" /></Button>
                    </div>
                  )}
                </div>
              ))}
              <div className="p-4">
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold rounded-md shadow-none">See more</Button>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto">
              <DetailView {...detailViewProps} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
