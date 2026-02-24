"use client"

import * as React from "react"
import { ListFilter, Search } from "lucide-react"

import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"

export interface DataTableFilterCategory {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  options: string[]
}

interface DataTableFilterProps {
  categories: DataTableFilterCategory[]
  selectedFilters: Record<string, string[]>
  onToggleFilter: (categoryId: string, option: string) => void
}

export function DataTableFilter({
  categories,
  selectedFilters,
  onToggleFilter,
}: DataTableFilterProps) {
  const [query, setQuery] = React.useState("")

  const visibleCategories = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return categories
    }

    return categories.filter((category) => {
      if (category.label.toLowerCase().includes(normalized)) {
        return true
      }

      return category.options.some((option) =>
        option.toLowerCase().includes(normalized)
      )
    })
  }, [categories, query])

  const activeCount = React.useMemo(
    () =>
      Object.values(selectedFilters).reduce(
        (count, selected) => count + selected.length,
        0
      ),
    [selectedFilters]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-md border-border/60 bg-background text-xs font-normal shadow-none hover:bg-muted/50"
        >
          <ListFilter className="h-3.5 w-3.5" />
          Filter
          {activeCount > 0 ? (
            <span className="rounded bg-muted px-1.5 py-0 text-[10px] font-semibold">
              {activeCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[240px] p-0">
        <div className="sticky top-0 z-10 border-b border-border bg-popover p-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-8 w-full rounded-md bg-muted/50 py-1 pr-2 pl-7 text-xs outline-none transition-colors placeholder:text-muted-foreground/70 focus:bg-muted"
              placeholder="Search filters..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            />
          </div>
        </div>

        <div className="max-h-[320px] overflow-y-auto p-1">
          {visibleCategories.map((category) => (
            <DropdownMenuSub key={category.id}>
              <DropdownMenuSubTrigger className="cursor-pointer py-1.5 text-xs">
                <category.icon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                {category.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-52 p-1">
                {category.options.map((option) => {
                  const selected =
                    selectedFilters[category.id]?.includes(option) ?? false

                  return (
                    <DropdownMenuItem
                      key={option}
                      className="cursor-pointer justify-between text-xs"
                      onSelect={(event) => {
                        event.preventDefault()
                        onToggleFilter(category.id, option)
                      }}
                    >
                      {option}
                      {selected ? (
                        <span className="text-[10px] font-semibold text-brand-purple">
                          Applied
                        </span>
                      ) : null}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ))}

          {visibleCategories.length === 0 ? (
            <div className="p-2 text-center text-xs text-muted-foreground">
              No filters found
            </div>
          ) : null}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
