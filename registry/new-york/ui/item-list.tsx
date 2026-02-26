"use client"

import * as React from "react"
import {
  AlertCircle,
  ChevronDown,
  Mail,
  MessageSquare,
  Phone,
  SearchX,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/new-york/ui/badge"
import {
  ItemListToolbar,
  type ItemListQuickView,
} from "@/registry/new-york/ui/item-list-toolbar"
import { type ItemListDisplayState } from "@/registry/new-york/ui/item-list-display"
import { type ItemListFilterCategory } from "@/registry/new-york/ui/item-list-filter"

type QueueStage =
  | "Referrals"
  | "E&B Verified"
  | "Contacted"
  | "Pending Intake"
  | "Pending Scheduling"

type QueueRisk = "At Risk" | "Watch" | "Stable"

interface QueueItem {
  id: string
  patient: string
  source: string
  specialty: string
  stage: QueueStage
  risk: QueueRisk
  attempts: number
  owner: string
  aging: string
  contactSignals: {
    phone: boolean
    email: boolean
    message: boolean
  }
}

const QUEUE_ITEMS: QueueItem[] = [
  {
    id: "REF-1894",
    patient: "James Liu",
    source: "Cedars",
    specialty: "Oncology",
    stage: "E&B Verified",
    risk: "At Risk",
    attempts: 2,
    owner: "Jessica Wong",
    aging: "Aging 18h",
    contactSignals: { phone: true, email: false, message: false },
  },
  {
    id: "REF-1903",
    patient: "Michael Brown",
    source: "Providence",
    specialty: "Orthopedics",
    stage: "E&B Verified",
    risk: "Stable",
    attempts: 1,
    owner: "Sarah Johnson",
    aging: "New today",
    contactSignals: { phone: false, email: true, message: false },
  },
  {
    id: "REF-1910",
    patient: "Samantha Rodriguez",
    source: "Kaiser",
    specialty: "Rheumatology",
    stage: "E&B Verified",
    risk: "At Risk",
    attempts: 4,
    owner: "Michael Chen",
    aging: "Aging 36h",
    contactSignals: { phone: true, email: true, message: true },
  },
  {
    id: "REF-1916",
    patient: "Christopher Davis",
    source: "USC",
    specialty: "Gastroenterology",
    stage: "E&B Verified",
    risk: "Stable",
    attempts: 1,
    owner: "Daniel Kim",
    aging: "New 6h ago",
    contactSignals: { phone: false, email: true, message: true },
  },
  {
    id: "REF-1924",
    patient: "Lisa Anderson",
    source: "CHLA",
    specialty: "Pediatric Surgery",
    stage: "E&B Verified",
    risk: "Watch",
    attempts: 1,
    owner: "Jennifer Davis",
    aging: "New 8h ago",
    contactSignals: { phone: true, email: false, message: true },
  },
  {
    id: "REF-1901",
    patient: "Sarah Chen",
    source: "CHLA",
    specialty: "Pediatrics",
    stage: "Contacted",
    risk: "Stable",
    attempts: 1,
    owner: "Daniel Kim",
    aging: "New today",
    contactSignals: { phone: true, email: false, message: false },
  },
  {
    id: "REF-1908",
    patient: "David Smith",
    source: "USC",
    specialty: "Dermatology",
    stage: "Contacted",
    risk: "Stable",
    attempts: 2,
    owner: "Jennifer Davis",
    aging: "New 3h ago",
    contactSignals: { phone: false, email: true, message: true },
  },
  {
    id: "REF-1913",
    patient: "Olivia Martinez",
    source: "Providence",
    specialty: "Cardiology",
    stage: "Contacted",
    risk: "At Risk",
    attempts: 3,
    owner: "Jessica Wong",
    aging: "Aging 24h",
    contactSignals: { phone: true, email: true, message: false },
  },
  {
    id: "REF-1919",
    patient: "Kevin Nguyen",
    source: "Kaiser",
    specialty: "Nephrology",
    stage: "Contacted",
    risk: "Stable",
    attempts: 1,
    owner: "Sarah Johnson",
    aging: "New 5h ago",
    contactSignals: { phone: true, email: false, message: true },
  },
  {
    id: "REF-1923",
    patient: "Rachel Kim",
    source: "UCLA Health",
    specialty: "Hematology",
    stage: "Contacted",
    risk: "Watch",
    attempts: 2,
    owner: "Michael Chen",
    aging: "New 7h ago",
    contactSignals: { phone: false, email: true, message: true },
  },
  {
    id: "REF-1926",
    patient: "Brian Foster",
    source: "Cedars",
    specialty: "Vascular Surgery",
    stage: "Contacted",
    risk: "Stable",
    attempts: 1,
    owner: "Daniel Kim",
    aging: "New today",
    contactSignals: { phone: false, email: false, message: true },
  },
  {
    id: "REF-1931",
    patient: "Jasmine Patel",
    source: "Dignity Health",
    specialty: "Pulmonology",
    stage: "Pending Intake",
    risk: "Watch",
    attempts: 2,
    owner: "Sarah Johnson",
    aging: "Aging 14h",
    contactSignals: { phone: true, email: true, message: false },
  },
  {
    id: "REF-1933",
    patient: "Evan Torres",
    source: "Sutter",
    specialty: "Neurology",
    stage: "Pending Intake",
    risk: "Stable",
    attempts: 1,
    owner: "Jessica Wong",
    aging: "New 2h ago",
    contactSignals: { phone: false, email: true, message: true },
  },
  {
    id: "REF-1940",
    patient: "Natalie Brooks",
    source: "MemorialCare",
    specialty: "Pain Management",
    stage: "Pending Scheduling",
    risk: "Watch",
    attempts: 2,
    owner: "Jennifer Davis",
    aging: "Aging 20h",
    contactSignals: { phone: true, email: false, message: true },
  },
  {
    id: "REF-1942",
    patient: "Carlos Rivera",
    source: "Providence",
    specialty: "Urology",
    stage: "Pending Scheduling",
    risk: "Stable",
    attempts: 1,
    owner: "Daniel Kim",
    aging: "New 5h ago",
    contactSignals: { phone: false, email: true, message: false },
  },
  {
    id: "REF-1946",
    patient: "Alyssa Wright",
    source: "UCLA Health",
    specialty: "Referrals",
    stage: "Referrals",
    risk: "Stable",
    attempts: 1,
    owner: "Michael Chen",
    aging: "New today",
    contactSignals: { phone: false, email: true, message: true },
  },
  {
    id: "REF-1948",
    patient: "Marcus Lopez",
    source: "Cedars",
    specialty: "Referrals",
    stage: "Referrals",
    risk: "At Risk",
    attempts: 4,
    owner: "Jessica Wong",
    aging: "Aging 30h",
    contactSignals: { phone: true, email: true, message: false },
  },
]

const STAGE_ORDER: QueueStage[] = [
  "Referrals",
  "E&B Verified",
  "Contacted",
  "Pending Intake",
  "Pending Scheduling",
]

const RISK_ORDER: QueueRisk[] = ["At Risk", "Watch", "Stable"]

const FILTER_CATEGORIES: ItemListFilterCategory[] = [
  {
    id: "stage",
    label: "Queue stage",
    options: STAGE_ORDER,
  },
  {
    id: "risk",
    label: "Risk level",
    options: RISK_ORDER,
  },
  {
    id: "owner",
    label: "Assignee",
    options: [...new Set(QUEUE_ITEMS.map((item) => item.owner))],
  },
]

interface QuickViewDefinition {
  id: string
  label: string
  matches: (item: QueueItem) => boolean
}

const QUICK_VIEW_DEFINITIONS: QuickViewDefinition[] = [
  {
    id: "referrals",
    label: "Referrals",
    matches: (item) => item.stage === "Referrals",
  },
  {
    id: "contact-attempted",
    label: "Contact Attempted",
    matches: (item) =>
      item.stage === "E&B Verified" || item.stage === "Contacted",
  },
  {
    id: "pending-intake",
    label: "Pending Intake",
    matches: (item) => item.stage === "Pending Intake",
  },
  {
    id: "pending-scheduling",
    label: "Pending Scheduling",
    matches: (item) => item.stage === "Pending Scheduling",
  },
  {
    id: "needs-escalation",
    label: "Needs Escalation",
    matches: (item) => item.attempts >= 4 || item.risk === "At Risk",
  },
]

const DEFAULT_DISPLAY_STATE: ItemListDisplayState = {
  viewMode: "list",
  grouping: "stage",
  subGrouping: "none",
  ordering: "priority",
  orderingDirection: "desc",
  showContactSignals: true,
  showOwner: true,
  showStatus: true,
}

function toggleFilterValue(
  current: Record<string, string[]>,
  categoryId: string,
  option: string,
) {
  const selected = current[categoryId] ?? []
  const hasOption = selected.includes(option)

  return {
    ...current,
    [categoryId]: hasOption
      ? selected.filter((value) => value !== option)
      : [...selected, option],
  }
}

function matchesCategoryFilter(
  item: QueueItem,
  categoryId: string,
  selectedOptions: string[],
) {
  if (selectedOptions.length === 0) {
    return true
  }

  switch (categoryId) {
    case "stage":
      return selectedOptions.includes(item.stage)
    case "risk":
      return selectedOptions.includes(item.risk)
    case "owner":
      return selectedOptions.includes(item.owner)
    default:
      return true
  }
}

function getRiskDotColor(risk: QueueRisk) {
  switch (risk) {
    case "At Risk":
      return "bg-red-500"
    case "Watch":
      return "bg-orange-400"
    case "Stable":
    default:
      return "bg-slate-300"
  }
}

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
]

function getAvatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

function WorkItemCard({ item, display }: { item: QueueItem; display: ItemListDisplayState }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] text-slate-400">{item.id}</span>
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            getRiskDotColor(item.risk),
          )}
        />
      </div>
      <div className="mb-1 text-sm font-medium text-slate-900">
        {item.patient}
      </div>
      <div className="mb-2 text-xs text-slate-500">
        via {item.source} &rarr; {item.specialty}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {item.risk === "At Risk" ? (
            <Badge
              variant="outline"
              className="h-5 gap-1 rounded-full border-red-200 bg-red-50 px-1.5 text-[10px] font-medium text-red-700 shadow-none"
            >
              <AlertCircle className="h-3 w-3" />
              At Risk
            </Badge>
          ) : null}
          <span
            className={cn(
              "inline-flex h-5 items-center rounded border px-1.5 text-[10px] font-semibold",
              item.attempts >= 4
                ? "border-red-200 bg-red-50 text-red-700"
                : item.attempts === 3
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : "border-slate-200 bg-slate-100 text-slate-600",
            )}
          >
            {item.attempts >= 4 ? "4+" : item.attempts}
          </span>
        </div>
        <span className="text-[11px] text-slate-400">{item.aging}</span>
      </div>
      {display.showOwner ? (
        <div className="mt-2 flex items-center gap-1.5 border-t border-slate-100 pt-2">
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded text-[9px] font-semibold",
              getAvatarColor(item.owner),
            )}
          >
            {item.owner.charAt(0)}
          </div>
          <span className="text-xs text-slate-600">{item.owner}</span>
        </div>
      ) : null}
    </div>
  )
}

export function ItemList() {
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string[]>
  >({})
  const [activeQuickView, setActiveQuickView] = React.useState<string | null>(
    "contact-attempted",
  )
  const [display, setDisplay] =
    React.useState<ItemListDisplayState>(DEFAULT_DISPLAY_STATE)
  const [expandedGroups, setExpandedGroups] = React.useState<
    Record<string, boolean>
  >({})

  const quickViews = React.useMemo<ItemListQuickView[]>(
    () =>
      QUICK_VIEW_DEFINITIONS.map((definition) => ({
        id: definition.id,
        label: definition.label,
        count: QUEUE_ITEMS.filter(definition.matches).length,
      })),
    [],
  )

  const filteredItems = React.useMemo(() => {
    const quickViewFilter = QUICK_VIEW_DEFINITIONS.find(
      (definition) => definition.id === activeQuickView,
    )

    return QUEUE_ITEMS.filter((item) => {
      if (quickViewFilter && !quickViewFilter.matches(item)) {
        return false
      }

      return Object.entries(selectedFilters).every(([categoryId, options]) =>
        matchesCategoryFilter(item, categoryId, options),
      )
    })
  }, [activeQuickView, selectedFilters])

  const groupedItems = React.useMemo(() => {
    const groups = new Map<string, QueueItem[]>()

    for (const item of filteredItems) {
      const key =
        display.grouping === "stage"
          ? item.stage
          : display.grouping === "owner"
            ? item.owner
            : item.risk
      const current = groups.get(key) ?? []
      current.push(item)
      groups.set(key, current)
    }

    const entries = Array.from(groups.entries())

    entries.sort(([groupA], [groupB]) => {
      if (display.grouping === "stage") {
        return (
          STAGE_ORDER.indexOf(groupA as QueueStage) -
          STAGE_ORDER.indexOf(groupB as QueueStage)
        )
      }

      if (display.grouping === "risk") {
        return (
          RISK_ORDER.indexOf(groupA as QueueRisk) -
          RISK_ORDER.indexOf(groupB as QueueRisk)
        )
      }

      return groupA.localeCompare(groupB)
    })

    return entries.map(([group, items]) => ({
      key: group.toLowerCase().replace(/\s+/g, "-"),
      label: group,
      items,
    }))
  }, [display.grouping, filteredItems])

  React.useEffect(() => {
    setExpandedGroups((previous) => {
      const next: Record<string, boolean> = {}
      groupedItems.forEach((group) => {
        next[group.key] = previous[group.key] ?? true
      })
      return next
    })
  }, [groupedItems])

  return (
    <div className="overflow-hidden bg-background">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          Patient Inventory
        </h3>
      </div>

      <ItemListToolbar
        quickViews={quickViews}
        activeQuickView={activeQuickView}
        onQuickViewChange={setActiveQuickView}
        filterCategories={FILTER_CATEGORIES}
        selectedFilters={selectedFilters}
        onToggleFilter={(categoryId, option) =>
          setSelectedFilters((previous) =>
            toggleFilterValue(previous, categoryId, option),
          )
        }
        onClearFilters={() => setSelectedFilters({})}
        display={display}
        onDisplayChange={setDisplay}
        onResetDisplay={() => setDisplay(DEFAULT_DISPLAY_STATE)}
      />

      <div className="flex-1 overflow-auto">
        {groupedItems.length > 0 ? (
          display.viewMode === "board" ? (
            /* Board View */
            <div className="flex gap-4 overflow-x-auto p-4">
              {groupedItems.map((group) => (
                <div
                  key={group.key}
                  className="flex w-[280px] shrink-0 flex-col"
                >
                  <div className="mb-3 flex items-center justify-between px-1">
                    <h4 className="truncate text-sm font-semibold uppercase text-muted-foreground">
                      {group.label}
                    </h4>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {group.items.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <WorkItemCard
                        key={item.id}
                        item={item}
                        display={display}
                      />
                    ))}
                    {group.items.length === 0 ? (
                      <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
                        <span className="text-xs text-muted-foreground/50">
                          No items
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            groupedItems.map((group) => {
              const isExpanded = expandedGroups[group.key]

              return (
                <div
                  key={group.key}
                  className="last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedGroups((previous) => ({
                        ...previous,
                        [group.key]: !previous[group.key],
                      }))
                    }
                    className="flex w-full cursor-pointer select-none items-center gap-2 border-b border-border bg-muted/30 px-4 py-2 text-left transition-colors hover:bg-muted/50"
                  >
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-muted-foreground transition-transform",
                        !isExpanded && "-rotate-90",
                      )}
                    />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </span>
                    <span className="rounded border border-border bg-background px-1.5 py-0 text-[10px] font-medium text-muted-foreground">
                      {group.items.length}
                    </span>
                  </button>

                  {isExpanded ? (
                    <div>
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="group flex cursor-pointer items-center gap-3 border-b border-border/50 px-4 py-2.5 text-sm transition-colors hover:bg-muted/40"
                        >
                          <span className="w-[80px] shrink-0 font-mono text-xs text-muted-foreground/80">
                            {item.id}
                          </span>

                          <div className="shrink-0">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full",
                                getRiskDotColor(item.risk),
                              )}
                            />
                          </div>

                          <div className="min-w-0 flex-1 truncate font-semibold text-sm text-foreground">
                            {item.patient}{" "}
                            <span className="font-normal text-muted-foreground">
                              via {item.source} &rarr; {item.specialty}
                            </span>
                          </div>

                          <div className="hidden w-[80px] shrink-0 items-center md:flex">
                            {item.risk === "At Risk" ? (
                              <Badge
                                variant="outline"
                                className="h-5 gap-1 rounded-full border-red-200 bg-red-50 px-1.5 text-[10px] font-medium text-red-700 shadow-none"
                              >
                                <AlertCircle className="h-3 w-3" />
                                At Risk
                              </Badge>
                            ) : null}
                          </div>

                          {display.showContactSignals ? (
                            <div className="hidden items-center gap-3 text-muted-foreground/40 md:flex">
                              <Phone className="h-3.5 w-3.5 cursor-pointer transition-colors hover:text-foreground" />
                              <Mail className="h-3.5 w-3.5 cursor-pointer transition-colors hover:text-foreground" />
                              <MessageSquare className="h-3.5 w-3.5 cursor-pointer transition-colors hover:text-foreground" />
                            </div>
                          ) : null}

                          <div className="hidden w-[60px] shrink-0 items-center justify-center md:flex">
                            <span
                              className={cn(
                                "inline-flex h-5 items-center justify-center rounded border px-2 text-xs font-semibold",
                                item.attempts >= 4
                                  ? "border-red-300 bg-red-100 text-red-700"
                                  : item.attempts === 3
                                    ? "border-amber-300 bg-amber-100 text-amber-700"
                                    : "border-border bg-muted text-muted-foreground",
                              )}
                            >
                              {item.attempts >= 4 ? "4+" : item.attempts}
                            </span>
                          </div>

                          {display.showOwner ? (
                            <div className="hidden w-[120px] shrink-0 items-center gap-2 lg:flex">
                              <span className="truncate text-xs font-medium text-foreground">
                                {item.owner}
                              </span>
                            </div>
                          ) : null}

                          {display.showStatus ? (
                            <div className="hidden w-[140px] shrink-0 items-center justify-end gap-2 sm:flex">
                              <span className="truncate rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                {item.stage}
                              </span>
                            </div>
                          ) : null}

                          <div className="w-[80px] shrink-0 text-right text-xs text-muted-foreground">
                            {item.aging}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })
          )
        ) : (
          <div className="flex h-56 flex-col items-center justify-center gap-1 text-muted-foreground">
            <SearchX className="h-7 w-7 opacity-40" />
            <p className="text-sm font-medium">No queue items found</p>
            <p className="text-xs">
              Try a different quick view or clear your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// GroupedListView -- shared grouped row list used by ItemList and Inbox
// ---------------------------------------------------------------------------

export interface GroupedListGroup<T> {
  key: string
  label: string
  items: T[]
}

export interface GroupedListViewProps<T> {
  groups: GroupedListGroup<T>[]
  renderRow: (item: T, index: number) => React.ReactNode
  getItemKey: (item: T) => string
  selectedKey?: string
  onItemClick?: (item: T) => void
  emptyMessage?: string
  className?: string
}

export function GroupedListView<T>({
  groups,
  renderRow,
  getItemKey,
  selectedKey,
  onItemClick,
  emptyMessage = "No items found",
  className,
}: GroupedListViewProps<T>) {
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    groups.forEach((g) => { init[g.key] = true })
    return init
  })

  React.useEffect(() => {
    setExpandedGroups((prev) => {
      const next: Record<string, boolean> = {}
      groups.forEach((g) => { next[g.key] = prev[g.key] ?? true })
      return next
    })
  }, [groups])

  if (groups.length === 0 || groups.every((g) => g.items.length === 0)) {
    return (
      <div className={cn("flex h-56 flex-col items-center justify-center gap-1 text-muted-foreground", className)}>
        <SearchX className="h-7 w-7 opacity-40" />
        <p className="text-sm font-medium">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {groups.map((group) => {
        const isExpanded = expandedGroups[group.key] ?? true
        return (
          <div key={group.key}>
            <button
              type="button"
              onClick={() =>
                setExpandedGroups((prev) => ({ ...prev, [group.key]: !prev[group.key] }))
              }
              className="flex w-full cursor-pointer select-none items-center gap-2 border-b border-border bg-muted/30 px-4 py-2 text-left transition-colors hover:bg-muted/50"
            >
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-muted-foreground transition-transform",
                  !isExpanded && "-rotate-90",
                )}
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </span>
              <span className="rounded border border-border bg-background px-1.5 py-0 text-[10px] font-medium text-muted-foreground">
                {group.items.length}
              </span>
            </button>
            {isExpanded &&
              group.items.map((item, idx) => {
                const key = getItemKey(item)
                return (
                  <div
                    key={key}
                    onClick={() => onItemClick?.(item)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 border-b border-border/50 text-[13px] cursor-pointer transition-colors",
                      selectedKey === key
                        ? "bg-muted/30 border-l-2 border-l-primary"
                        : "border-l-2 border-l-transparent hover:bg-muted/40",
                    )}
                  >
                    {renderRow(item, idx)}
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}
