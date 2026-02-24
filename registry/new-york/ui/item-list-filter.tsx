"use client"

import { Filter, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"

export interface ItemListFilterCategory {
  id: string
  label: string
  options: string[]
}

interface ItemListFilterProps {
  categories: ItemListFilterCategory[]
  selectedFilters: Record<string, string[]>
  onToggleFilter: (categoryId: string, option: string) => void
  onClearFilters: () => void
}

function getActiveFilterCount(selectedFilters: Record<string, string[]>) {
  return Object.values(selectedFilters).reduce(
    (count, values) => count + values.length,
    0
  )
}

export function ItemListFilter({
  categories,
  selectedFilters,
  onToggleFilter,
  onClearFilters,
}: ItemListFilterProps) {
  const activeFilterCount = getActiveFilterCount(selectedFilters)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-md border-border bg-background text-xs font-medium text-foreground shadow-none hover:bg-muted/50"
        >
          <Filter className="h-3.5 w-3.5" />
          Filter
          {activeFilterCount > 0 ? (
            <span className="rounded bg-muted px-1.5 py-0 text-[10px] font-semibold text-muted-foreground">
              {activeFilterCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px] p-3">
        <DropdownMenuLabel className="px-0 text-xs font-semibold text-foreground">
          Apply filters
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />

        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={category.id} className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {category.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.options.map((option) => {
                  const selected =
                    selectedFilters[category.id]?.includes(option) ?? false

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onToggleFilter(category.id, option)}
                      className={cn(
                        "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
                        selected
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-border bg-background text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
              {index < categories.length - 1 ? (
                <DropdownMenuSeparator className="mt-2" />
              ) : null}
            </div>
          ))}
        </div>

        {activeFilterCount > 0 ? (
          <>
            <DropdownMenuSeparator className="my-2" />
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
