"use client"

import * as React from "react"
import {
  User,
  Users,
  List,
  Filter,
  ChevronDown,
  X,
  Tag,
  Building,
} from "lucide-react"
import { cn } from "../../../lib/utils"
import { Button } from "./button"
import { Badge } from "./badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export type AssigneeFilter = "me" | "team" | "all"

export interface InboxFilterCategory {
  id: string
  label: string
  icon: React.ReactNode
  options: string[]
}

export interface InboxToolbarProps {
  assignee: AssigneeFilter
  onAssigneeChange: (value: AssigneeFilter) => void
  filterCategories: InboxFilterCategory[]
  selectedFilters: Record<string, string>
  onFilterChange: (categoryId: string, value: string) => void
  onClearFilters: () => void
  className?: string
}

const FILTER_PILL_COLORS: Record<string, string> = {
  status: "bg-muted text-foreground border-border hover:bg-muted/80",
  category: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
  account: "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100",
  company: "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100",
}

function getFilterPillColor(categoryId: string) {
  return FILTER_PILL_COLORS[categoryId] ?? FILTER_PILL_COLORS.status
}

export function InboxToolbar({
  assignee,
  onAssigneeChange,
  filterCategories,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  className,
}: InboxToolbarProps) {
  const hasActiveFilters = Object.values(selectedFilters).some(
    (v) => v !== "all"
  )

  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto px-4 py-2 border-b border-border",
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-7 shrink-0 gap-1.5 border-border bg-background text-xs font-medium shadow-sm"
          >
            {assignee === "me" && (
              <User className="h-3.5 w-3.5 text-brand-purple" />
            )}
            {assignee === "team" && (
              <Users className="h-3.5 w-3.5 text-blue-600" />
            )}
            {assignee === "all" && (
              <List className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <span>
              {assignee === "me" && "Assigned to me"}
              {assignee === "team" && "My Team"}
              {assignee === "all" && "All Cases"}
            </span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[180px]">
          <DropdownMenuLabel>Assignee</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={assignee}
            onValueChange={(v) => onAssigneeChange(v as AssigneeFilter)}
          >
            <DropdownMenuRadioItem value="me" className="gap-2 text-xs">
              <User className="h-3.5 w-3.5 text-brand-purple" />
              Assigned to me
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="team" className="gap-2 text-xs">
              <Users className="h-3.5 w-3.5 text-blue-600" />
              My Team
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="all" className="gap-2 text-xs">
              <List className="h-3.5 w-3.5 text-muted-foreground" />
              All Cases
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 h-4 w-px shrink-0 bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-7 shrink-0 gap-1.5 border-dashed border-border bg-transparent text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[220px]">
          <DropdownMenuLabel>Add Filter</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filterCategories.map((category) => (
            <DropdownMenuSub key={category.id}>
              <DropdownMenuSubTrigger className="gap-2 text-xs">
                {category.icon}
                {category.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="max-h-[300px] w-[180px] overflow-y-auto">
                <DropdownMenuRadioGroup
                  value={selectedFilters[category.id] ?? "all"}
                  onValueChange={(v) => onFilterChange(category.id, v)}
                >
                  <DropdownMenuRadioItem value="all" className="text-xs">
                    All
                  </DropdownMenuRadioItem>
                  {category.options.map((option) => (
                    <DropdownMenuRadioItem
                      key={option}
                      value={option}
                      className="text-xs"
                    >
                      {option}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {Object.entries(selectedFilters).map(([categoryId, value]) => {
        if (value === "all") return null
        const category = filterCategories.find((c) => c.id === categoryId)
        if (!category) return null

        return (
          <Badge
            key={categoryId}
            variant="secondary"
            className={cn(
              "h-7 shrink-0 gap-1 border pl-2 pr-1 font-normal transition-colors",
              getFilterPillColor(categoryId)
            )}
          >
            <span className="text-[10px] opacity-60">{category.label}:</span>
            <span className="max-w-[120px] truncate text-[10px] font-medium">
              {value}
            </span>
            <button
              type="button"
              onClick={() => onFilterChange(categoryId, "all")}
              className="ml-0.5 rounded-sm p-0.5 hover:bg-foreground/10"
            >
              <X className="h-2.5 w-2.5" />
              <span className="sr-only">Remove</span>
            </button>
          </Badge>
        )
      })}

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto h-7 shrink-0 px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      )}
    </div>
  )
}
