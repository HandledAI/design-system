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
  grouping: "stage",
  density: "comfortable",
  showContactSignals: true,
  showOwner: true,
  showStatus: true,
}

function toggleFilterValue(
  current: Record<string, string[]>,
  categoryId: string,
  option: string
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
  selectedOptions: string[]
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
      return "bg-muted-foreground/40"
  }
}

export function ItemList() {
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string[]>
  >({})
  const [activeQuickView, setActiveQuickView] = React.useState<string | null>(
    "contact-attempted"
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
    []
  )

  const filteredItems = React.useMemo(() => {
    const quickViewFilter = QUICK_VIEW_DEFINITIONS.find(
      (definition) => definition.id === activeQuickView
    )

    return QUEUE_ITEMS.filter((item) => {
      if (quickViewFilter && !quickViewFilter.matches(item)) {
        return false
      }

      return Object.entries(selectedFilters).every(([categoryId, options]) =>
        matchesCategoryFilter(item, categoryId, options)
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
        return STAGE_ORDER.indexOf(groupA as QueueStage) -
          STAGE_ORDER.indexOf(groupB as QueueStage)
      }

      if (display.grouping === "risk") {
        return RISK_ORDER.indexOf(groupA as QueueRisk) -
          RISK_ORDER.indexOf(groupB as QueueRisk)
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

  const rowPaddingClass =
    display.density === "compact" ? "px-4 py-2" : "px-4 py-3"

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-muted/20 px-4 py-3">
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
            toggleFilterValue(previous, categoryId, option)
          )
        }
        onClearFilters={() => setSelectedFilters({})}
        display={display}
        onDisplayChange={setDisplay}
        onResetDisplay={() => setDisplay(DEFAULT_DISPLAY_STATE)}
      />

      <div className="max-h-[620px] overflow-auto">
        {groupedItems.length > 0 ? (
          groupedItems.map((group) => {
            const isExpanded = expandedGroups[group.key]

            return (
              <div key={group.key} className="border-b border-border/50 last:border-b-0">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedGroups((previous) => ({
                      ...previous,
                      [group.key]: !previous[group.key],
                    }))
                  }
                  className="flex w-full items-center gap-2 bg-muted/30 px-4 py-2 text-left"
                >
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-muted-foreground transition-transform",
                      !isExpanded && "-rotate-90"
                    )}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
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
                        className={cn(
                          "group flex items-center gap-3 border-t border-border/50 text-sm transition-colors hover:bg-muted/40",
                          rowPaddingClass
                        )}
                      >
                        <div className="w-[94px] shrink-0 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80">
                          {item.id}
                        </div>

                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <span
                            className={cn(
                              "h-2.5 w-2.5 shrink-0 rounded-full",
                              getRiskDotColor(item.risk)
                            )}
                          />
                          <div className="min-w-0 truncate">
                            <span className="font-semibold text-foreground">
                              {item.patient}
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              via {item.source} &rarr; {item.specialty}
                            </span>
                          </div>
                        </div>

                        <div className="w-[98px] shrink-0">
                          {item.risk === "At Risk" ? (
                            <Badge
                              variant="outline"
                              className="inline-flex items-center gap-1 rounded-full border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700"
                            >
                              <AlertCircle className="h-3 w-3" />
                              At Risk
                            </Badge>
                          ) : null}
                        </div>

                        {display.showContactSignals ? (
                          <div className="hidden w-[70px] shrink-0 items-center justify-center gap-2 text-muted-foreground/30 md:flex">
                            <Phone
                              className={cn(
                                "h-3.5 w-3.5",
                                item.contactSignals.phone && "text-muted-foreground"
                              )}
                            />
                            <Mail
                              className={cn(
                                "h-3.5 w-3.5",
                                item.contactSignals.email && "text-muted-foreground"
                              )}
                            />
                            <MessageSquare
                              className={cn(
                                "h-3.5 w-3.5",
                                item.contactSignals.message && "text-muted-foreground"
                              )}
                            />
                          </div>
                        ) : null}

                        <div className="w-[48px] shrink-0 text-center">
                          <span
                            className={cn(
                              "rounded border px-1.5 py-0.5 text-[11px] font-semibold",
                              item.attempts >= 4
                                ? "border-red-200 bg-red-50 text-red-700"
                                : item.attempts === 3
                                  ? "border-amber-200 bg-amber-50 text-amber-700"
                                  : "border-border bg-muted text-muted-foreground"
                            )}
                          >
                            {item.attempts >= 4 ? "4+" : item.attempts}
                          </span>
                        </div>

                        {display.showOwner ? (
                          <div className="hidden w-[130px] shrink-0 truncate text-[13px] font-medium text-foreground lg:block">
                            {item.owner}
                          </div>
                        ) : null}

                        {display.showStatus ? (
                          <div className="hidden w-[125px] shrink-0 justify-end md:flex">
                            <span className="rounded-md border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                              {item.stage}
                            </span>
                          </div>
                        ) : null}

                        <div className="w-[90px] shrink-0 text-right text-[12px] text-muted-foreground">
                          {item.aging}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })
        ) : (
          <div className="flex h-56 flex-col items-center justify-center gap-1 text-muted-foreground">
            <SearchX className="h-7 w-7 opacity-40" />
            <p className="text-sm font-medium">No queue items found</p>
            <p className="text-xs">Try a different quick view or clear your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
