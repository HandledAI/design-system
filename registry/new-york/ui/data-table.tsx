"use client"

import * as React from "react"
import {
  Briefcase,
  Calendar,
  DollarSign,
  History,
  Link as LinkIcon,
  SearchX,
  TrendingUp,
  User,
  Users,
} from "lucide-react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/new-york/ui/badge"
import {
  DataTableQuickViews,
  type DataTableQuickViewValue,
} from "@/registry/new-york/ui/data-table-quick-views"
import { DataTableToolbar } from "@/registry/new-york/ui/data-table-toolbar"
import { type DataTableFilterCategory } from "@/registry/new-york/ui/data-table-filter"
import { ScoreAnalysisModal } from "@/registry/new-york/ui/score-analysis-modal"
import type { ScoreFactor } from "@/registry/new-york/ui/score-breakdown"

type DataRow = {
  id: string
  name: string
  industry: string[]
  accountRisks: string[]
  riskScore: number
  expansionScore: number
  growthIndicators: string[]
  lastInteraction: string
  lastInteractionDays: number
  createdAt: string
  revenue: string
  headcount: string
  lastFunding: string
  owner: string
  opportunityCount: number
  productAdoptionScore: number
}

const QUICK_VIEWS = [
  "Balance Flight Detected",
  "Not Touched in 30+ Days",
  "Open Opportunity, Stalled",
  "Growth Signal Detected",
  "Low Product Adoption",
]

const MORE_QUICK_VIEWS = [
  "Missed meeting this week",
  "High churn risk score",
  "Key contact departed",
  "Recent large inflow",
  "Dormant (no payments)",
  "Support tickets elevated",
]

const FILTER_CATEGORIES: DataTableFilterCategory[] = [
  {
    id: "industry",
    label: "Industry",
    icon: Briefcase,
    options: [
      "Software",
      "E-commerce",
      "Financial Technology",
      "Workforce Management",
      "Artificial Intelligence",
      "Health Technology",
      "Design",
    ],
  },
  {
    id: "lastInteraction",
    label: "Last interaction",
    icon: History,
    options: ["1 day ago", "3 days ago", "1 week ago", "1 month ago", "2 months ago"],
  },
  {
    id: "createdAt",
    label: "Created at",
    icon: Calendar,
    options: ["Last 30 days", "Last 90 days", "This year", "Last year"],
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: DollarSign,
    options: ["$0 - $1M", "$1M - $10M", "$10M - $50M", "$50M+"],
  },
  {
    id: "headcount",
    label: "Headcount",
    icon: Users,
    options: ["11-50", "51-200", "201-500", "500-1000", "1000+"],
  },
  {
    id: "lastFunding",
    label: "Last funding",
    icon: TrendingUp,
    options: ["Seed", "Series A", "Series B", "Series C+", "Undisclosed"],
  },
  {
    id: "owner",
    label: "Owner",
    icon: User,
    options: ["Sam Lee", "Alex Morgan", "Jordan Case", "Taylor Reed"],
  },
  {
    id: "opportunityCount",
    label: "Opportunity count",
    icon: LinkIcon,
    options: ["0", "1", "2", "3+"],
  },
]

const ROWS: DataRow[] = [
  {
    id: "rappi",
    name: "Rappi",
    industry: ["E-commerce", "Food Delivery", "Financial Technology"],
    accountRisks: ["Flight Risk", "Low Engagement"],
    riskScore: 65,
    expansionScore: 45,
    growthIndicators: ["Job Openings", "Recent Funding"],
    lastInteraction: "1 week ago",
    lastInteractionDays: 7,
    createdAt: "This year",
    revenue: "$10M - $50M",
    headcount: "1000+",
    lastFunding: "Series C+",
    owner: "Sam Lee",
    opportunityCount: 2,
    productAdoptionScore: 62,
  },
  {
    id: "codeshot",
    name: "Codeshot",
    industry: ["Software"],
    accountRisks: ["Flight Risk", "Low Engagement"],
    riskScore: 85,
    expansionScore: 20,
    growthIndicators: [],
    lastInteraction: "2 months ago",
    lastInteractionDays: 64,
    createdAt: "Last year",
    revenue: "$1M - $10M",
    headcount: "201-500",
    lastFunding: "Series A",
    owner: "Alex Morgan",
    opportunityCount: 1,
    productAdoptionScore: 31,
  },
  {
    id: "lovi",
    name: "Lovi",
    industry: ["Artificial Intelligence", "Health Technology"],
    accountRisks: ["Low Engagement", "Key Contact Departure"],
    riskScore: 55,
    expansionScore: 75,
    growthIndicators: ["Recent Funding", "Headcount Expansion"],
    lastInteraction: "1 month ago",
    lastInteractionDays: 36,
    createdAt: "This year",
    revenue: "$10M - $50M",
    headcount: "500-1000",
    lastFunding: "Series B",
    owner: "Jordan Case",
    opportunityCount: 3,
    productAdoptionScore: 38,
  },
  {
    id: "anthropic",
    name: "Anthropic",
    industry: ["Software"],
    accountRisks: [],
    riskScore: 25,
    expansionScore: 68,
    growthIndicators: ["Recent Funding", "Headcount Expansion"],
    lastInteraction: "3 days ago",
    lastInteractionDays: 3,
    createdAt: "Last 90 days",
    revenue: "$50M+",
    headcount: "1000+",
    lastFunding: "Series C+",
    owner: "Sam Lee",
    opportunityCount: 2,
    productAdoptionScore: 86,
  },
  {
    id: "buildbear",
    name: "BuildBear",
    industry: ["Software"],
    accountRisks: [],
    riskScore: 35,
    expansionScore: 92,
    growthIndicators: ["Recent Funding", "Revenue Growth"],
    lastInteraction: "1 day ago",
    lastInteractionDays: 1,
    createdAt: "Last 30 days",
    revenue: "$1M - $10M",
    headcount: "51-200",
    lastFunding: "Seed",
    owner: "Taylor Reed",
    opportunityCount: 2,
    productAdoptionScore: 91,
  },
  {
    id: "content-mobbin",
    name: "Content-mobbin",
    industry: ["Workforce Management"],
    accountRisks: [],
    riskScore: 28,
    expansionScore: 85,
    growthIndicators: ["Recent Funding", "Headcount Expansion"],
    lastInteraction: "1 week ago",
    lastInteractionDays: 9,
    createdAt: "Last 30 days",
    revenue: "$0 - $1M",
    headcount: "11-50",
    lastFunding: "Seed",
    owner: "Taylor Reed",
    opportunityCount: 2,
    productAdoptionScore: 77,
  },
  {
    id: "figma",
    name: "Figma",
    industry: ["Design", "Software"],
    accountRisks: [],
    riskScore: 15,
    expansionScore: 88,
    growthIndicators: ["Headcount Expansion", "Job Openings"],
    lastInteraction: "3 days ago",
    lastInteractionDays: 3,
    createdAt: "This year",
    revenue: "$50M+",
    headcount: "1000+",
    lastFunding: "Series C+",
    owner: "Alex Morgan",
    opportunityCount: 1,
    productAdoptionScore: 94,
  },
  {
    id: "loom",
    name: "Loom",
    industry: ["Software"],
    accountRisks: ["Key Contact Departure"],
    riskScore: 35,
    expansionScore: 68,
    growthIndicators: ["Headcount Expansion", "Job Openings"],
    lastInteraction: "1 month ago",
    lastInteractionDays: 33,
    createdAt: "Last year",
    revenue: "$10M - $50M",
    headcount: "500-1000",
    lastFunding: "Series B",
    owner: "Jordan Case",
    opportunityCount: 1,
    productAdoptionScore: 58,
  },
  {
    id: "miro",
    name: "Miro",
    industry: ["Software"],
    accountRisks: [],
    riskScore: 32,
    expansionScore: 55,
    growthIndicators: [],
    lastInteraction: "1 week ago",
    lastInteractionDays: 8,
    createdAt: "This year",
    revenue: "$50M+",
    headcount: "1000+",
    lastFunding: "Series C+",
    owner: "Sam Lee",
    opportunityCount: 0,
    productAdoptionScore: 64,
  },
  {
    id: "webflow",
    name: "Webflow",
    industry: ["Software"],
    accountRisks: [],
    riskScore: 25,
    expansionScore: 72,
    growthIndicators: ["Recent Funding", "Headcount Expansion"],
    lastInteraction: "1 week ago",
    lastInteractionDays: 10,
    createdAt: "Last 90 days",
    revenue: "$10M - $50M",
    headcount: "500-1000",
    lastFunding: "Series B",
    owner: "Alex Morgan",
    opportunityCount: 2,
    productAdoptionScore: 71,
  },
]

type ScoreAnalysisData = {
  title: string
  description: string
  whyNow: string
  evidence: string[]
  confidence: number
  confidenceDescription: string
  factors: ScoreFactor[]
}

const SCORE_ANALYSIS: Record<string, (row: DataRow) => ScoreAnalysisData> = {
  Risk: (row) => ({
    title: "Risk Score Analysis",
    description:
      "Estimated probability of churn within the next 90 days based on activity and support signals",
    whyNow:
      row.riskScore >= 60
        ? "Critical risk factors detected requiring immediate intervention to prevent churn."
        : "Account health is stable, but monitoring recent support interactions is recommended.",
    evidence: [
      "Recent decline in weekly active users (-12%)",
      "Unresolved critical support ticket (>48h)",
      "Competitor presence detected in recent conversations",
    ],
    confidence: 89,
    confidenceDescription:
      "Based on risk scoring model trained on historical customer data and outcomes.",
    factors: [
      { key: "engagement", label: "Engagement drop", score: Math.min(row.riskScore + 10, 100), why: "Weekly active users declined 12% over past 30 days" },
      { key: "support", label: "Support load", score: Math.min(row.riskScore + 5, 100), why: "Unresolved critical ticket open for >48h" },
      { key: "competitive", label: "Competitive risk", score: null, risk: row.riskScore >= 60 ? "High" as const : "Low" as const, why: "Competitor mentions detected in recent conversations" },
      { key: "usage", label: "Product usage", score: Math.max(100 - row.riskScore, 10), why: "Core feature adoption remains consistent" },
    ],
  }),
  Expansion: (row) => ({
    title: "Expansion Score Analysis",
    description:
      "Likelihood of successful upsell and cross-sell opportunities based on usage and engagement",
    whyNow:
      row.expansionScore >= 70
        ? "Usage patterns and growth signals indicate readiness for additional product adoption."
        : "Moderate expansion potential; consider targeted engagement to increase adoption.",
    evidence: [
      "Treasury utilization above 85th percentile vs peers",
      "Frequent feature requests for advanced functionality",
      "Recent team expansion in finance department",
    ],
    confidence: 81,
    confidenceDescription:
      "Based on expansion model trained on historical upsell outcomes and usage patterns.",
    factors: [
      { key: "usage-depth", label: "Usage depth", score: Math.min(row.expansionScore + 8, 100), why: "Active usage across 4+ core product features" },
      { key: "growth", label: "Growth signals", score: row.expansionScore, why: row.growthIndicators.length > 0 ? row.growthIndicators.join(", ") + " detected" : "No active growth signals" },
      { key: "fit", label: "Product fit", score: Math.min(row.expansionScore + 12, 100), why: "Company profile matches high-expansion ICP" },
      { key: "timing", label: "Timing", score: null, risk: row.expansionScore >= 70 ? "Low" as const : "Medium" as const, why: "Within typical evaluation window for upsell" },
    ],
  }),
}

const QUICK_VIEW_FILTERS: Record<string, (row: DataRow) => boolean> = {
  "Balance Flight Detected": (row) => row.riskScore >= 60,
  "Not Touched in 30+ Days": (row) => row.lastInteractionDays >= 30,
  "Open Opportunity, Stalled": (row) =>
    row.opportunityCount > 0 && row.lastInteractionDays >= 21,
  "Growth Signal Detected": (row) => row.expansionScore >= 70,
  "Low Product Adoption": (row) => row.productAdoptionScore <= 40,
  "Missed meeting this week": (row) => row.lastInteractionDays >= 6,
  "High churn risk score": (row) => row.riskScore >= 75,
  "Key contact departed": (row) =>
    row.accountRisks.some((risk) => risk.toLowerCase().includes("contact")),
  "Recent large inflow": (row) => row.expansionScore >= 85,
  "Dormant (no payments)": (row) => row.opportunityCount === 0,
  "Support tickets elevated": (row) =>
    row.accountRisks.some((risk) => risk.toLowerCase().includes("engagement")),
}

const columnHelper = createColumnHelper<DataRow>()

const DEFAULT_COLUMN_VISIBILITY: VisibilityState = {
  industry: false,
  lastInteraction: false,
  revenue: false,
  headcount: false,
  lastFunding: false,
  owner: false,
  opportunityCount: false,
}

function getEntityColor(name: string) {
  const colors = [
    "bg-slate-100 text-slate-600",
    "bg-gray-100 text-gray-600",
    "bg-zinc-100 text-zinc-600",
    "bg-blue-50 text-blue-600",
    "bg-indigo-50 text-indigo-600",
    "bg-violet-50 text-violet-600",
  ]

  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

function getIndustryColor(industry: string) {
  const colors: Record<string, string> = {
    "E-commerce": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Food Delivery": "bg-blue-50 text-blue-700 border-blue-100",
    "Financial Technology": "bg-amber-50 text-amber-700 border-amber-100",
    "Workforce Management": "bg-violet-50 text-violet-700 border-violet-100",
    "Artificial Intelligence": "bg-rose-50 text-rose-700 border-rose-100",
    "Health Technology": "bg-orange-50 text-orange-700 border-orange-100",
    Software: "bg-slate-100 text-slate-700 border-slate-200",
  }

  return colors[industry] ?? "bg-muted text-muted-foreground border-border"
}

function toggleFilterValue(
  current: Record<string, string[]>,
  categoryId: string,
  option: string
) {
  const currentValues = current[categoryId] ?? []
  const isActive = currentValues.includes(option)
  const nextValues = isActive
    ? currentValues.filter((value) => value !== option)
    : [...currentValues, option]

  return {
    ...current,
    [categoryId]: nextValues,
  }
}

function isRowMatchingCategoryFilter(
  row: DataRow,
  categoryId: string,
  options: string[]
) {
  if (options.length === 0) {
    return true
  }

  switch (categoryId) {
    case "industry":
      return options.some((option) => row.industry.includes(option))
    case "lastInteraction":
      return options.includes(row.lastInteraction)
    case "createdAt":
      return options.includes(row.createdAt)
    case "revenue":
      return options.includes(row.revenue)
    case "headcount":
      return options.includes(row.headcount)
    case "lastFunding":
      return options.includes(row.lastFunding)
    case "owner":
      return options.includes(row.owner)
    case "opportunityCount":
      return options.some((option) => {
        if (option === "3+") {
          return row.opportunityCount >= 3
        }
        return row.opportunityCount === Number(option)
      })
    default:
      return true
  }
}

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    DEFAULT_COLUMN_VISIBILITY
  )
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string[]>>(
    {}
  )
  const [activeQuickView, setActiveQuickView] =
    React.useState<DataTableQuickViewValue>(null)
  const [scoreModal, setScoreModal] = React.useState<{
    row: DataRow
    type: "Risk" | "Expansion"
  } | null>(null)

  React.useEffect(() => {
    if (!activeQuickView) {
      return
    }

    setColumnVisibility((previous) => {
      const next = { ...previous }
      if (activeQuickView.includes("Touched")) {
        next.lastInteraction = true
      }
      if (activeQuickView.includes("Growth")) {
        next.expansionScore = true
      }
      if (activeQuickView.includes("risk") || activeQuickView.includes("Risk")) {
        next.riskScore = true
      }
      return next
    })
  }, [activeQuickView])

  const filteredRows = React.useMemo(() => {
    return ROWS.filter((row) => {
      const quickViewMatches = activeQuickView
        ? (QUICK_VIEW_FILTERS[activeQuickView]?.(row) ?? true)
        : true

      if (!quickViewMatches) {
        return false
      }

      return Object.entries(selectedFilters).every(([categoryId, options]) =>
        isRowMatchingCategoryFilter(row, categoryId, options)
      )
    })
  }, [activeQuickView, selectedFilters])

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Entity",
        cell: (info) => {
          const row = info.row.original
          return (
            <div className="flex min-w-max items-center gap-3">
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold",
                  getEntityColor(row.name)
                )}
              >
                {row.name.slice(0, 1)}
              </div>
              <span className="text-sm font-medium text-foreground">
                {row.name}
              </span>
            </div>
          )
        },
      }),
      columnHelper.accessor("accountRisks", {
        header: "Risk Signals",
        cell: (info) => {
          const risks = info.getValue()
          if (!risks.length) {
            return <span className="text-xs text-muted-foreground">None</span>
          }

          return (
            <div className="flex min-w-max items-center gap-1.5">
              {risks.slice(0, 2).map((risk) => (
                <Badge
                  key={risk}
                  variant="outline"
                  className="rounded-md border-red-200 bg-red-50 px-2 py-0.5 text-xs font-normal text-red-700"
                >
                  {risk}
                </Badge>
              ))}
            </div>
          )
        },
      }),
      columnHelper.accessor("riskScore", {
        id: "riskScore",
        header: "Risk Score",
        cell: (info) => (
          <div
            className="inline-flex cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setScoreModal({ row: info.row.original, type: "Risk" })
            }}
          >
            <Badge
              variant="outline"
              className={cn(
                "px-2 py-0.5 text-xs font-medium hover:underline decoration-dotted underline-offset-2",
                info.getValue() >= 60
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-border bg-muted/50 text-foreground"
              )}
            >
              {info.getValue()}%
            </Badge>
          </div>
        ),
      }),
      columnHelper.accessor("expansionScore", {
        id: "expansionScore",
        header: "Expansion Score",
        cell: (info) => (
          <div
            className="inline-flex cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setScoreModal({ row: info.row.original, type: "Expansion" })
            }}
          >
            <Badge
              variant="outline"
              className={cn(
                "px-2 py-0.5 text-xs font-medium hover:underline decoration-dotted underline-offset-2",
                info.getValue() >= 70
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-border bg-muted/50 text-foreground"
              )}
            >
              {info.getValue()}%
            </Badge>
          </div>
        ),
      }),
      columnHelper.accessor("growthIndicators", {
        header: "Growth Signals",
        cell: (info) => {
          const indicators = info.getValue()
          if (!indicators.length) {
            return <span className="text-xs text-muted-foreground">None</span>
          }
          return (
            <div className="flex min-w-max items-center gap-1.5">
              {indicators.slice(0, 2).map((indicator) => (
                <Badge
                  key={indicator}
                  variant="outline"
                  className="rounded-md border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-normal text-blue-700"
                >
                  {indicator}
                </Badge>
              ))}
            </div>
          )
        },
      }),
      columnHelper.accessor("industry", {
        header: "Industry",
        cell: (info) => (
          <div className="flex min-w-max items-center gap-1.5">
            {info.getValue().slice(0, 2).map((industry) => (
              <Badge
                key={industry}
                variant="outline"
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-normal",
                  getIndustryColor(industry)
                )}
              >
                {industry}
              </Badge>
            ))}
          </div>
        ),
      }),
      columnHelper.accessor("lastInteraction", {
        header: "Last interaction",
        cell: (info) => <span className="text-sm">{info.getValue()}</span>,
      }),
      columnHelper.accessor("revenue", {
        header: "Revenue",
        cell: (info) => (
          <span className="rounded-md bg-muted/50 px-2 py-0.5 text-xs font-medium">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("headcount", {
        header: "Headcount",
        cell: (info) => (
          <span className="rounded-md bg-muted/50 px-2 py-0.5 text-xs font-medium">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("lastFunding", {
        header: "Last funding",
        cell: (info) => (
          <span className="rounded-md bg-muted/50 px-2 py-0.5 text-xs font-medium">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("owner", {
        header: "Owner",
        cell: (info) => <span className="text-sm">{info.getValue()}</span>,
      }),
      columnHelper.accessor("opportunityCount", {
        header: "Opportunity count",
        cell: (info) => (
          <span className="rounded-md bg-muted/50 px-2 py-0.5 text-xs font-medium">
            {info.getValue()}
          </span>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data: filteredRows,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const displayColumns = table.getAllLeafColumns().map((column) => {
    const header = column.columnDef.header
    const label = typeof header === "string" ? header : column.id

    return {
      id: column.id,
      label,
      visible: column.getIsVisible(),
      canHide: column.getCanHide(),
    }
  })

  const toggleCategoryFilter = (categoryId: string, option: string) => {
    setSelectedFilters((previous) => toggleFilterValue(previous, categoryId, option))
  }

  return (
    <div className="flex h-full min-h-[560px] flex-col bg-background">
      <DataTableToolbar
        categories={FILTER_CATEGORIES}
        selectedFilters={selectedFilters}
        onToggleFilter={toggleCategoryFilter}
        sorting={sorting}
        onSortingChange={setSorting}
        displayColumns={displayColumns}
        onToggleColumn={(columnId) => table.getColumn(columnId)?.toggleVisibility()}
        onResetDisplay={() => setColumnVisibility(DEFAULT_COLUMN_VISIBILITY)}
      />

      <DataTableQuickViews
        quickViews={QUICK_VIEWS}
        moreViews={MORE_QUICK_VIEWS}
        activeView={activeQuickView}
        onViewChange={setActiveQuickView}
      />

      <div className="relative min-h-0 flex-1 overflow-auto border-t border-border">
        <table className="w-max min-w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-10 border-r border-border px-4 text-left text-xs font-medium text-muted-foreground/80 last:border-r-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="group border-b border-border/50 transition-colors hover:bg-muted/30"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border-r border-border/40 px-4 py-2.5 align-middle last:border-r-0"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td
                    className="px-4 py-2 text-xs text-muted-foreground"
                    colSpan={columns.length}
                  >
                    {table.getRowModel().rows.length} rows
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-52 px-4 text-center">
                  <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <SearchX className="h-7 w-7 opacity-40" />
                    <p className="text-sm font-medium">No rows found</p>
                    <p className="text-xs">Try adjusting your filters or quick views</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {scoreModal && (() => {
        const data = SCORE_ANALYSIS[scoreModal.type](scoreModal.row)
        return (
          <ScoreAnalysisModal
            open
            onOpenChange={(open) => { if (!open) setScoreModal(null) }}
            title={data.title}
            description={data.description}
            score={scoreModal.type === "Risk" ? scoreModal.row.riskScore : scoreModal.row.expansionScore}
            whyNow={data.whyNow}
            evidence={data.evidence}
            confidence={data.confidence}
            confidenceDescription={data.confidenceDescription}
            factors={data.factors}
            onFactorFeedback={(key, type) =>
              console.log("Factor feedback:", { account: scoreModal.row.name, factor: key, type })
            }
          />
        )
      })()}
    </div>
  )
}
