"use client"

import * as React from "react"
import {
  Briefcase,
  Calendar,
  DollarSign,
  History,
  Link as LinkIcon,
  TrendingUp,
  User,
  Users,
} from "lucide-react"
import type { SortingState } from "@tanstack/react-table"

import { DataTable } from "@/registry/new-york/ui/data-table"
import {
  DataTableFilter,
  type DataTableFilterCategory,
} from "@/registry/new-york/ui/data-table-filter"
import {
  DataTableDisplay,
  type DataTableDisplayColumn,
} from "@/registry/new-york/ui/data-table-display"
import { DataTableQuickViews } from "@/registry/new-york/ui/data-table-quick-views"

const DEMO_FILTER_CATEGORIES: DataTableFilterCategory[] = [
  {
    id: "industry",
    label: "Industry",
    icon: Briefcase,
    options: ["Software", "E-commerce", "Artificial Intelligence"],
  },
  {
    id: "lastInteraction",
    label: "Last interaction",
    icon: History,
    options: ["1 day ago", "1 week ago", "1 month ago"],
  },
  {
    id: "createdAt",
    label: "Created at",
    icon: Calendar,
    options: ["Last 30 days", "This year", "Last year"],
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: DollarSign,
    options: ["$1M - $10M", "$10M - $50M", "$50M+"],
  },
  {
    id: "headcount",
    label: "Headcount",
    icon: Users,
    options: ["51-200", "201-500", "1000+"],
  },
  {
    id: "lastFunding",
    label: "Last funding",
    icon: TrendingUp,
    options: ["Series A", "Series B", "Series C+"],
  },
  {
    id: "owner",
    label: "Owner",
    icon: User,
    options: ["Sam Lee", "Alex Morgan"],
  },
  {
    id: "opportunityCount",
    label: "Opportunity count",
    icon: LinkIcon,
    options: ["0", "1", "3+"],
  },
]

const DEMO_QUICK_VIEWS = [
  "Balance Flight Detected",
  "Not Touched in 30+ Days",
  "Open Opportunity, Stalled",
]

const DEMO_MORE_VIEWS = [
  "High churn risk score",
  "Support tickets elevated",
  "Dormant (no payments)",
]

const DEMO_DISPLAY_COLUMNS: DataTableDisplayColumn[] = [
  { id: "entity", label: "Entity", visible: true, canHide: false },
  { id: "accountRisks", label: "Risk Signals", visible: true, canHide: true },
  { id: "riskScore", label: "Risk Score", visible: true, canHide: true },
  { id: "expansionScore", label: "Expansion Score", visible: true, canHide: true },
  { id: "growthIndicators", label: "Growth Signals", visible: true, canHide: true },
  { id: "lastInteraction", label: "Last interaction", visible: false, canHide: true },
]

export function DataTableShowcase() {
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string[]>
  >({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [activeQuickView, setActiveQuickView] = React.useState<string | null>(null)
  const [displayColumns, setDisplayColumns] =
    React.useState<DataTableDisplayColumn[]>(DEMO_DISPLAY_COLUMNS)

  const toggleFilter = (categoryId: string, option: string) => {
    setSelectedFilters((previous) => {
      const currentValues = previous[categoryId] ?? []
      const nextValues = currentValues.includes(option)
        ? currentValues.filter((value) => value !== option)
        : [...currentValues, option]

      return {
        ...previous,
        [categoryId]: nextValues,
      }
    })
  }

  const toggleColumn = (columnId: string) => {
    setDisplayColumns((previous) =>
      previous.map((column) =>
        column.id === columnId && column.canHide
          ? { ...column, visible: !column.visible }
          : column
      )
    )
  }

  return (
    <>
      <div id="custom-data-table-filter" className="border rounded-xl p-6 space-y-4 scroll-m-20">
        <h3 className="font-semibold text-lg">Data Table Filter</h3>
        <div className="border rounded-lg p-4 bg-card">
          <DataTableFilter
            categories={DEMO_FILTER_CATEGORIES}
            selectedFilters={selectedFilters}
            onToggleFilter={toggleFilter}
          />
        </div>
      </div>

      <div id="custom-data-table-display" className="border rounded-xl p-6 space-y-4 scroll-m-20">
        <h3 className="font-semibold text-lg">Data Table Display</h3>
        <div className="border rounded-lg p-4 bg-card flex justify-end">
          <DataTableDisplay
            sorting={sorting}
            onSortingChange={setSorting}
            columns={displayColumns}
            onToggleColumn={toggleColumn}
            onReset={() => {
              setSorting([])
              setDisplayColumns(DEMO_DISPLAY_COLUMNS)
            }}
          />
        </div>
      </div>

      <div id="custom-data-table-quick-views" className="border rounded-xl p-6 space-y-4 scroll-m-20">
        <h3 className="font-semibold text-lg">Data Table Quick Views</h3>
        <div className="border rounded-lg bg-card">
          <DataTableQuickViews
            quickViews={DEMO_QUICK_VIEWS}
            moreViews={DEMO_MORE_VIEWS}
            activeView={activeQuickView}
            onViewChange={setActiveQuickView}
          />
        </div>
      </div>

      <div id="custom-data-table" className="border rounded-xl p-6 space-y-4 scroll-m-20">
        <h3 className="font-semibold text-lg">Data Table</h3>
        <DataTable />
      </div>
    </>
  )
}
