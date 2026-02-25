"use client"

import * as React from "react"
import {
  ArrowDownAZ,
  ArrowUpAZ,
  LayoutTemplate,
  List as ListIcon,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"
import { Separator } from "@/registry/new-york/ui/separator"

export type ItemListGrouping = "stage" | "owner" | "risk"
export type ItemListViewMode = "list" | "board"

export interface ItemListDisplayState {
  viewMode: ItemListViewMode
  grouping: ItemListGrouping
  subGrouping: "none" | ItemListGrouping
  ordering: string
  orderingDirection: "asc" | "desc"
  showContactSignals: boolean
  showOwner: boolean
  showStatus: boolean
}

interface ItemListDisplayProps {
  value: ItemListDisplayState
  onChange: (next: ItemListDisplayState) => void
  onReset: () => void
}

export function ItemListDisplay({
  value,
  onChange,
  onReset,
}: ItemListDisplayProps) {
  const toggleField = (
    field: "showContactSignals" | "showOwner" | "showStatus",
  ) => {
    onChange({
      ...value,
      [field]: !value[field],
    })
  }

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 rounded-md border-border bg-background text-xs font-medium text-foreground shadow-sm hover:bg-muted/50"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Display
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-50 w-[280px] rounded-lg border border-border bg-background p-4 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="flex flex-col gap-4">
            {/* View Toggle */}
            <div className="flex rounded-md bg-muted/60 p-1">
              <button
                type="button"
                onClick={() => onChange({ ...value, viewMode: "list" })}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1.5 rounded-sm px-3 py-2 text-xs font-medium transition-all",
                  value.viewMode === "list"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <ListIcon className="h-4 w-4" />
                List
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...value, viewMode: "board" })}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1.5 rounded-sm px-3 py-2 text-xs font-medium transition-all",
                  value.viewMode === "board"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <LayoutTemplate className="h-4 w-4" />
                Board
              </button>
            </div>

            <Separator />

            {/* Grouping Controls */}
            <div className="space-y-3">
              <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Grouping
                </span>
                <Select
                  value={value.grouping}
                  onValueChange={(g) =>
                    onChange({ ...value, grouping: g as ItemListGrouping })
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stage" className="text-xs">
                      Stage
                    </SelectItem>
                    <SelectItem value="owner" className="text-xs">
                      Assignee
                    </SelectItem>
                    <SelectItem value="risk" className="text-xs">
                      Risk level
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Sub-grouping
                </span>
                <Select
                  value={value.subGrouping}
                  onValueChange={(g) =>
                    onChange({
                      ...value,
                      subGrouping: g as "none" | ItemListGrouping,
                    })
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" className="text-xs">
                      No grouping
                    </SelectItem>
                    <SelectItem value="stage" className="text-xs">
                      Stage
                    </SelectItem>
                    <SelectItem value="owner" className="text-xs">
                      Assignee
                    </SelectItem>
                    <SelectItem value="risk" className="text-xs">
                      Risk level
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-[80px_1fr_32px] items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Ordering
                </span>
                <Select
                  value={value.ordering}
                  onValueChange={(o) => onChange({ ...value, ordering: o })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority" className="text-xs">
                      Priority
                    </SelectItem>
                    <SelectItem value="aging" className="text-xs">
                      Age
                    </SelectItem>
                    <SelectItem value="name" className="text-xs">
                      Name
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    onChange({
                      ...value,
                      orderingDirection:
                        value.orderingDirection === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  {value.orderingDirection === "asc" ? (
                    <ArrowDownAZ className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpAZ className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Visible Row Details */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Visible row details
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleField("showContactSignals")}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
                    value.showContactSignals
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-border bg-background text-muted-foreground hover:bg-muted",
                  )}
                >
                  Contact signals
                </button>
                <button
                  type="button"
                  onClick={() => toggleField("showOwner")}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
                    value.showOwner
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-border bg-background text-muted-foreground hover:bg-muted",
                  )}
                >
                  Assignee
                </button>
                <button
                  type="button"
                  onClick={() => toggleField("showStatus")}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
                    value.showStatus
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-border bg-background text-muted-foreground hover:bg-muted",
                  )}
                >
                  Stage badge
                </button>
              </div>
            </div>

            <Separator />

            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Reset display settings
            </button>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
