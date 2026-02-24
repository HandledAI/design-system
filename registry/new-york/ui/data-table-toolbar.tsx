"use client"

import type { SortingState } from "@tanstack/react-table"

import {
  DataTableFilter,
  type DataTableFilterCategory,
} from "@/registry/new-york/ui/data-table-filter"
import {
  DataTableDisplay,
  type DataTableDisplayColumn,
} from "@/registry/new-york/ui/data-table-display"

interface DataTableToolbarProps {
  categories: DataTableFilterCategory[]
  selectedFilters: Record<string, string[]>
  onToggleFilter: (categoryId: string, option: string) => void
  sorting: SortingState
  onSortingChange: (next: SortingState) => void
  displayColumns: DataTableDisplayColumn[]
  onToggleColumn: (columnId: string) => void
  onResetDisplay: () => void
}

export function DataTableToolbar({
  categories,
  selectedFilters,
  onToggleFilter,
  sorting,
  onSortingChange,
  displayColumns,
  onToggleColumn,
  onResetDisplay,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
      <div className="flex items-center gap-2">
        <DataTableFilter
          categories={categories}
          selectedFilters={selectedFilters}
          onToggleFilter={onToggleFilter}
        />
      </div>
      <div className="flex items-center gap-2">
        <DataTableDisplay
          sorting={sorting}
          onSortingChange={onSortingChange}
          columns={displayColumns}
          onToggleColumn={onToggleColumn}
          onReset={onResetDisplay}
        />
      </div>
    </div>
  )
}
