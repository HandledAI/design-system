"use client"

import * as React from "react"
import { Button } from "./button"
import { Badge } from "./badge"
import { DataTable } from "./data-table"
import type { AccountsViewConfig, AccountFilterTab } from "./prototype-config"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PrototypeAccountsViewProps extends AccountsViewConfig {
  headerActions?: React.ReactNode
  onRowClick?: () => void
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_FILTER_TABS: AccountFilterTab[] = [
  { label: "All Accounts", count: 6, variant: "default" },
  { label: "Needs Attention", count: 11, variant: "attention" },
  { label: "Recent", count: 7, variant: "ghost" },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PrototypeAccountsView({
  filterTabs,
  headerActions,
  onRowClick,
}: PrototypeAccountsViewProps) {
  const tabs = filterTabs ?? DEFAULT_FILTER_TABS

  return (
    <div className="flex flex-col h-full w-full bg-background relative">
      {headerActions && (
        <div className="absolute top-4 right-4 z-10">{headerActions}</div>
      )}

      <div className="px-4 py-3 border-b border-border flex items-center gap-2 overflow-x-auto shrink-0 mt-2">
        {tabs.map((tab, i) => {
          if (tab.variant === "attention") {
            return (
              <Button key={i} size="sm" className="h-7 text-xs rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                {tab.label}
                {tab.count != null && (
                  <Badge variant="secondary" className="ml-2 h-4 px-1.5 text-[10px] bg-white/20 text-white border-transparent">
                    {tab.count}
                  </Badge>
                )}
              </Button>
            )
          }
          if (tab.variant === "ghost") {
            return (
              <Button key={i} variant="ghost" size="sm" className="h-7 text-xs rounded-md border border-border bg-transparent font-medium">
                {tab.label}
                {tab.count != null && (
                  <Badge variant="secondary" className="ml-2 h-4 px-1.5 text-[10px]">
                    {tab.count}
                  </Badge>
                )}
              </Button>
            )
          }
          return (
            <Button key={i} variant="secondary" size="sm" className="h-7 text-xs rounded-md bg-muted font-medium">
              {tab.label}
              {tab.count != null && (
                <Badge variant="outline" className="ml-2 h-4 px-1.5 text-[10px]">
                  {tab.count}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto">
        <DataTable onRowClick={onRowClick} />
      </div>
    </div>
  )
}
