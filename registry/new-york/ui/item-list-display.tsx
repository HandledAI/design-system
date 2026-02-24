"use client"

import { LayoutGrid, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"

export type ItemListGrouping = "stage" | "owner" | "risk"
export type ItemListDensity = "comfortable" | "compact"

export interface ItemListDisplayState {
  grouping: ItemListGrouping
  density: ItemListDensity
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
  const toggleField = (field: "showContactSignals" | "showOwner" | "showStatus") => {
    onChange({
      ...value,
      [field]: !value[field],
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-md border-border bg-background text-xs font-medium text-foreground shadow-none hover:bg-muted/50"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          Display
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px] p-4">
        <div className="space-y-4">
          <DropdownMenuLabel className="px-0 text-xs font-semibold text-foreground">
            Display settings
          </DropdownMenuLabel>

          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Group rows by
            </span>
            <Select
              value={value.grouping}
              onValueChange={(grouping) =>
                onChange({
                  ...value,
                  grouping: grouping as ItemListGrouping,
                })
              }
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select grouping" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stage" className="text-xs">
                  Queue stage
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

          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Density
            </span>
            <div className="flex rounded-md border border-border bg-muted/60 p-1">
              <button
                type="button"
                onClick={() => onChange({ ...value, density: "comfortable" })}
                className={cn(
                  "flex-1 rounded px-2 py-1.5 text-xs font-medium transition-colors",
                  value.density === "comfortable"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Comfortable
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...value, density: "compact" })}
                className={cn(
                  "flex-1 rounded px-2 py-1.5 text-xs font-medium transition-colors",
                  value.density === "compact"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Compact
              </button>
            </div>
          </div>

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
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
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
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
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
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                Stage badge
              </button>
            </div>
          </div>

          <DropdownMenuSeparator />

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Reset display settings
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
