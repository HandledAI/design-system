"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, SearchX } from "lucide-react"

import { cn } from "../../../lib/utils"

export interface SimpleDataTableProps<TData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  emptyIcon?: React.ReactNode
  emptyMessage?: string
  emptyDescription?: string
  className?: string
}

export function SimpleDataTable<TData>({
  columns,
  data,
  onRowClick,
  emptyIcon,
  emptyMessage = "No rows found",
  emptyDescription = "Try adjusting your filters",
  className,
}: SimpleDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className={cn("w-full", className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-border/50 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="h-9 px-3 text-left align-middle text-xs font-medium text-muted-foreground whitespace-nowrap"
                >
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                      )}
                    </button>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className={cn(
                  "group border-none transition-colors",
                  onRowClick && "cursor-pointer",
                )}
              >
                {row.getVisibleCells().map((cell, cellIdx) => (
                  <td
                    key={cell.id}
                    className={cn(
                      "px-3 py-3 align-middle whitespace-nowrap group-hover:bg-muted/50",
                      cellIdx === 0 && "rounded-l-lg",
                      cellIdx === row.getVisibleCells().length - 1 && "rounded-r-lg",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-52 px-4 text-center">
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  {emptyIcon ?? <SearchX className="h-7 w-7 opacity-40" />}
                  <p className="text-sm font-medium">{emptyMessage}</p>
                  <p className="text-xs">{emptyDescription}</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
