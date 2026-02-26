"use client"

import * as React from "react"
import { ItemList } from "./item-list"
import type { WorkQueueViewConfig } from "./prototype-config"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PrototypeWorkQueueViewProps {
  headerActions?: React.ReactNode
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PrototypeWorkQueueView({
  headerActions,
}: PrototypeWorkQueueViewProps) {
  return (
    <div className="relative flex h-full w-full flex-col bg-background">
      {headerActions && (
        <div className="absolute top-4 right-4 z-10">{headerActions}</div>
      )}
      <div className="flex-1 overflow-auto">
        <ItemList />
      </div>
    </div>
  )
}
