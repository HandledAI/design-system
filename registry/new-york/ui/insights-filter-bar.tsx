"use client"

import * as React from "react"
import { CalendarIcon, ChevronDownIcon, FilterIcon } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export interface FilterDefinition {
  id: string
  label: string
  options: string[]
  defaultValue?: string
  icon?: "calendar" | React.ComponentType<{ className?: string }>
}

export interface InsightsFilterBarProps {
  filters: FilterDefinition[]
  values: Record<string, string>
  onChange: (filterId: string, value: string) => void
  onClearAll?: () => void
  className?: string
}

function hasNonDefaultValue(
  filters: FilterDefinition[],
  values: Record<string, string>
) {
  return filters.some((filter) => {
    const defaultVal = filter.defaultValue ?? filter.options[0] ?? "All"
    return values[filter.id] !== undefined && values[filter.id] !== defaultVal
  })
}

function InsightsFilterBar({
  filters,
  values,
  onChange,
  onClearAll,
  className,
}: InsightsFilterBarProps) {
  const showClearAll = onClearAll && hasNonDefaultValue(filters, values)

  return (
    <div
      data-slot="insights-filter-bar"
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-md border border-border bg-card p-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <FilterIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          Filters:
        </span>
      </div>

      {filters.map((filter) => {
        const current = values[filter.id] ?? filter.defaultValue ?? "All"
        const isCheckbox = filter.options.length > 0

        const IconComp =
          filter.icon === "calendar"
            ? CalendarIcon
            : typeof filter.icon === "function"
              ? filter.icon
              : null

        return (
          <DropdownMenu key={filter.id}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs font-normal shadow-none"
              >
                {IconComp ? (
                  <IconComp className="h-3.5 w-3.5 text-muted-foreground" />
                ) : null}
                {filter.label}: {current}
                <ChevronDownIcon className="h-3.5 w-3.5 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {isCheckbox
                ? filter.options.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={current === option}
                      onCheckedChange={() => onChange(filter.id, option)}
                    >
                      {option}
                    </DropdownMenuCheckboxItem>
                  ))
                : filter.options.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onSelect={() => onChange(filter.id, option)}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      })}

      {showClearAll ? (
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-destructive hover:text-destructive"
            onClick={onClearAll}
          >
            Clear All
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export { InsightsFilterBar }
