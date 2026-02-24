"use client"

import { cn } from "@/lib/utils"
import {
  ItemListDisplay,
  type ItemListDisplayState,
} from "@/registry/new-york/ui/item-list-display"
import {
  ItemListFilter,
  type ItemListFilterCategory,
} from "@/registry/new-york/ui/item-list-filter"

export interface ItemListQuickView {
  id: string
  label: string
  count: number
}

interface ItemListToolbarProps {
  quickViews: ItemListQuickView[]
  activeQuickView: string | null
  onQuickViewChange: (viewId: string | null) => void
  filterCategories: ItemListFilterCategory[]
  selectedFilters: Record<string, string[]>
  onToggleFilter: (categoryId: string, option: string) => void
  onClearFilters: () => void
  display: ItemListDisplayState
  onDisplayChange: (next: ItemListDisplayState) => void
  onResetDisplay: () => void
}

export function ItemListToolbar({
  quickViews,
  activeQuickView,
  onQuickViewChange,
  filterCategories,
  selectedFilters,
  onToggleFilter,
  onClearFilters,
  display,
  onDisplayChange,
  onResetDisplay,
}: ItemListToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
        {quickViews.map((quickView) => {
          const isActive = quickView.id === activeQuickView
          return (
            <button
              key={quickView.id}
              type="button"
              onClick={() => onQuickViewChange(isActive ? null : quickView.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-emerald-700 bg-emerald-600 text-white"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {quickView.label}
              <span
                className={cn(
                  "rounded px-1.5 py-0 text-[10px] font-semibold",
                  isActive
                    ? "bg-emerald-700/80 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {quickView.count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ItemListFilter
          categories={filterCategories}
          selectedFilters={selectedFilters}
          onToggleFilter={onToggleFilter}
          onClearFilters={onClearFilters}
        />
        <ItemListDisplay
          value={display}
          onChange={onDisplayChange}
          onReset={onResetDisplay}
        />
      </div>
    </div>
  )
}
