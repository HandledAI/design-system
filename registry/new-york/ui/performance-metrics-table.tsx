"use client"

import * as React from "react"
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { cn } from "../../../lib/utils"
import { Avatar, AvatarFallback } from "./avatar"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Input } from "./input"
import { ScrollArea, ScrollBar } from "./scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

export interface PerformanceMetricsTableRow {
  id: string
  label: string
  avatarFallback: string
  role?: string
  primaryValue: number
  primaryTarget: number
  ratePercent: number
  metricOne: number
  metricTwo: string
  metricThree: number
  metricFour: number
}

export interface PerformanceMetricsTableSortOption {
  id: "primary-desc" | "primary-asc" | "rate-desc" | "metric-four-desc"
  label: string
}

interface PerformanceMetricsTableProps {
  title?: string
  entityColumnLabel?: string
  primaryMetricColumnLabel?: string
  rateColumnLabel?: string
  metricOneColumnLabel?: string
  metricTwoColumnLabel?: string
  metricThreeColumnLabel?: string
  metricFourColumnLabel?: string
  viewOptions?: string[]
  roleOptions?: string[]
  sortOptions?: PerformanceMetricsTableSortOption[]
  rows?: PerformanceMetricsTableRow[]
  pageSize?: number
  searchPlaceholder?: string
}

const DEFAULT_ROWS: PerformanceMetricsTableRow[] = [
  {
    id: "member-1",
    label: "Jennifer Davis",
    avatarFallback: "JD",
    role: "Senior Coordinator",
    primaryValue: 188,
    primaryTarget: 200,
    ratePercent: 78,
    metricOne: 256,
    metricTwo: "8.5h",
    metricThree: 401,
    metricFour: 42,
  },
  {
    id: "member-2",
    label: "Robert Taylor",
    avatarFallback: "RT",
    role: "Coordinator",
    primaryValue: 168,
    primaryTarget: 200,
    ratePercent: 70,
    metricOne: 210,
    metricTwo: "7.4h",
    metricThree: 330,
    metricFour: 36,
  },
  {
    id: "member-3",
    label: "Karen Park",
    avatarFallback: "KP",
    role: "Coordinator",
    primaryValue: 165,
    primaryTarget: 200,
    ratePercent: 68,
    metricOne: 195,
    metricTwo: "6.9h",
    metricThree: 298,
    metricFour: 33,
  },
  {
    id: "member-4",
    label: "Alex Chen",
    avatarFallback: "AC",
    role: "Junior Coordinator",
    primaryValue: 142,
    primaryTarget: 200,
    ratePercent: 65,
    metricOne: 201,
    metricTwo: "7.2h",
    metricThree: 315,
    metricFour: 29,
  },
  {
    id: "member-5",
    label: "Sarah Mitchell",
    avatarFallback: "SM",
    role: "Senior Coordinator",
    primaryValue: 130,
    primaryTarget: 200,
    ratePercent: 76,
    metricOne: 247,
    metricTwo: "8.2h",
    metricThree: 389,
    metricFour: 31,
  },
  {
    id: "member-6",
    label: "Mike Rodriguez",
    avatarFallback: "MR",
    role: "Coordinator",
    primaryValue: 115,
    primaryTarget: 200,
    ratePercent: 72,
    metricOne: 218,
    metricTwo: "7.8h",
    metricThree: 342,
    metricFour: 25,
  },
]

const DEFAULT_SORT_OPTIONS: PerformanceMetricsTableSortOption[] = [
  { id: "primary-desc", label: "Primary Metric (High to Low)" },
  { id: "primary-asc", label: "Primary Metric (Low to High)" },
  { id: "rate-desc", label: "Rate (High to Low)" },
  { id: "metric-four-desc", label: "Metric Four (High to Low)" },
]

function getProgressStatus(value: number, target: number) {
  const percent = (value / target) * 100

  if (percent >= 80) {
    return {
      color: "bg-emerald-500",
      textColor: "text-emerald-700",
      icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />,
    }
  }

  if (percent >= 65) {
    return {
      color: "bg-amber-500",
      textColor: "text-amber-700",
      icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />,
    }
  }

  return {
    color: "bg-red-500",
    textColor: "text-red-700",
    icon: <AlertTriangle className="h-3.5 w-3.5 text-red-600" />,
  }
}

function sortRows(
  rows: PerformanceMetricsTableRow[],
  sortId: PerformanceMetricsTableSortOption["id"]
) {
  const copy = [...rows]
  switch (sortId) {
    case "primary-asc":
      return copy.sort((a, b) => a.primaryValue - b.primaryValue)
    case "rate-desc":
      return copy.sort((a, b) => b.ratePercent - a.ratePercent)
    case "metric-four-desc":
      return copy.sort((a, b) => b.metricFour - a.metricFour)
    case "primary-desc":
    default:
      return copy.sort((a, b) => b.primaryValue - a.primaryValue)
  }
}

export function PerformanceMetricsTable({
  title = "Performance Table",
  entityColumnLabel = "Entity",
  primaryMetricColumnLabel = "Primary Goal",
  rateColumnLabel = "Rate",
  metricOneColumnLabel = "Metric One",
  metricTwoColumnLabel = "Metric Two",
  metricThreeColumnLabel = "Metric Three",
  metricFourColumnLabel = "Metric Four",
  viewOptions = ["By Entity"],
  roleOptions = ["All", "Senior Coordinator", "Coordinator", "Junior Coordinator"],
  sortOptions = DEFAULT_SORT_OPTIONS,
  rows = DEFAULT_ROWS,
  pageSize = 6,
  searchPlaceholder = "Search rows...",
}: PerformanceMetricsTableProps) {
  const [view, setView] = React.useState(viewOptions[0] ?? "By Entity")
  const [sortId, setSortId] =
    React.useState<PerformanceMetricsTableSortOption["id"]>(
      sortOptions[0]?.id ?? "primary-desc"
    )
  const [roleFilter, setRoleFilter] = React.useState(roleOptions[0] ?? "All")
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(1)

  const filteredRows = React.useMemo(() => {
    const normalized = search.trim().toLowerCase()
    return rows.filter((row) => {
      if (roleFilter !== "All" && row.role !== roleFilter) {
        return false
      }
      if (!normalized) {
        return true
      }
      return row.label.toLowerCase().includes(normalized)
    })
  }, [roleFilter, rows, search])

  const sortedRows = React.useMemo(
    () => sortRows(filteredRows, sortId),
    [filteredRows, sortId]
  )

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const start = (page - 1) * pageSize
  const paginatedRows = sortedRows.slice(start, start + pageSize)

  React.useEffect(() => {
    setPage(1)
  }, [search, roleFilter, sortId, view])

  React.useEffect(() => {
    setPage((previous) => Math.min(previous, pageCount))
  }, [pageCount])

  const sortLabel =
    sortOptions.find((option) => option.id === sortId)?.label ?? "Sort"

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                {view}
                <ChevronDown className="ml-2 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {viewOptions.map((option) => (
                <DropdownMenuItem key={option} onClick={() => setView(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Sort: {sortLabel.replace(/\s*\(.+\)/, "")}
                <ChevronDown className="ml-2 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {sortOptions.map((option) => (
                <DropdownMenuItem key={option.id} onClick={() => setSortId(option.id)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Role: {roleFilter}
                <ChevronDown className="ml-2 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {roleOptions.map((option) => (
                <DropdownMenuItem key={option} onClick={() => setRoleFilter(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-8 w-48 text-xs"
          />
        </div>
      </div>

      <ScrollArea>
        <div className="min-w-[1180px]">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {entityColumnLabel}
                </TableHead>
                <TableHead className="w-[260px] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {primaryMetricColumnLabel}
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {rateColumnLabel}
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {metricOneColumnLabel}
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {metricTwoColumnLabel}
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {metricThreeColumnLabel}
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {metricFourColumnLabel}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRows.map((row) => {
                const percentage = (row.primaryValue / row.primaryTarget) * 100
                const progress = getProgressStatus(row.primaryValue, row.primaryTarget)

                return (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarFallback className="bg-emerald-100 text-[11px] font-medium text-emerald-700">
                            {row.avatarFallback}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{row.label}</span>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="shrink-0">{progress.icon}</span>
                        <div className="w-full max-w-[180px]">
                          <div className="mb-1 text-sm font-bold text-foreground">
                            {row.primaryValue}/{row.primaryTarget}
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className={cn("h-full rounded-full", progress.color)}
                              style={{ width: `${Math.min(100, percentage)}%` }}
                            />
                          </div>
                          <div className={cn("mt-1 text-xs font-medium", progress.textColor)}>
                            {Math.round(percentage)}%
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-right text-sm font-semibold text-emerald-600">
                      {row.ratePercent}%
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right text-sm font-medium text-foreground">
                      {row.metricOne}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right text-sm text-muted-foreground">
                      {row.metricTwo}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right text-sm font-medium text-foreground">
                      {row.metricThree}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right text-sm font-medium text-foreground">
                      {row.metricFour}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-3">
        <span className="text-xs text-muted-foreground">
          Showing {sortedRows.length === 0 ? 0 : start + 1} to{" "}
          {Math.min(start + pageSize, sortedRows.length)} of {sortedRows.length} rows
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            disabled={page <= 1}
            onClick={() => setPage((previous) => Math.max(previous - 1, 1))}
          >
            <ChevronLeft className="mr-1 h-3.5 w-3.5" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            disabled={page >= pageCount}
            onClick={() =>
              setPage((previous) => Math.min(previous + 1, pageCount))
            }
          >
            Next
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
