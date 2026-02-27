"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, ArrowUpDown, LayoutGrid } from "lucide-react"
import type { SortingState } from "@tanstack/react-table"

import { cn } from "../../../lib/utils"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

export interface DataTableDisplayColumn {
  id: string
  label: string
  visible: boolean
  canHide: boolean
}

interface DataTableDisplayProps {
  sorting: SortingState
  onSortingChange: (next: SortingState) => void
  columns: DataTableDisplayColumn[]
  onToggleColumn: (columnId: string) => void
  onReset: () => void
}

export function DataTableDisplay({
  sorting,
  onSortingChange,
  columns,
  onToggleColumn,
  onReset,
}: DataTableDisplayProps) {
  const sortableColumns = columns
  const currentSortId = sorting[0]?.id ?? sortableColumns[0]?.id ?? ""
  const isDescending = Boolean(sorting[0]?.desc)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-md border-border/60 bg-background text-xs font-normal shadow-none hover:bg-muted/50"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          Display
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px] p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <ArrowUpDown className="h-3.5 w-3.5" />
              Sorting
            </span>
            <div className="flex items-center gap-2">
              <Select
                value={currentSortId}
                onValueChange={(value) =>
                  onSortingChange([{ id: value, desc: sorting[0]?.desc ?? false }])
                }
              >
                <SelectTrigger className="h-8 w-full text-xs">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  {sortableColumns.map((column) => (
                    <SelectItem key={column.id} value={column.id} className="text-xs">
                      {column.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() =>
                  onSortingChange([{ id: currentSortId, desc: !isDescending }])
                }
                disabled={!currentSortId}
              >
                {isDescending ? (
                  <ArrowDown className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUp className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground">
              Display properties
            </span>
            <div className="flex flex-wrap gap-2">
              {columns.map((column) => (
                <button
                  key={column.id}
                  disabled={!column.canHide}
                  onClick={() => onToggleColumn(column.id)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all",
                    column.visible
                      ? "border-brand-purple/30 bg-brand-purple/10 text-brand-purple"
                      : "border-border bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground",
                    !column.canHide && "cursor-not-allowed opacity-50"
                  )}
                >
                  {column.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-start border-t border-border pt-2">
            <button
              className="text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
