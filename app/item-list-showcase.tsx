"use client"

import * as React from "react"

import { ItemList } from "@/registry/new-york/ui/item-list"
import {
  ItemListDisplay,
  type ItemListDisplayState,
} from "@/registry/new-york/ui/item-list-display"
import {
  ItemListFilter,
  type ItemListFilterCategory,
} from "@/registry/new-york/ui/item-list-filter"

const DEMO_FILTER_CATEGORIES: ItemListFilterCategory[] = [
  {
    id: "stage",
    label: "Queue stage",
    options: [
      "Referrals",
      "E&B Verified",
      "Contacted",
      "Pending Intake",
      "Pending Scheduling",
    ],
  },
  {
    id: "risk",
    label: "Risk level",
    options: ["At Risk", "Watch", "Stable"],
  },
  {
    id: "owner",
    label: "Assignee",
    options: ["Jessica Wong", "Michael Chen", "Sarah Johnson", "Daniel Kim"],
  },
]

const DEMO_DEFAULT_DISPLAY: ItemListDisplayState = {
  grouping: "stage",
  density: "comfortable",
  showContactSignals: true,
  showOwner: true,
  showStatus: true,
}

function toggleFilterValue(
  current: Record<string, string[]>,
  categoryId: string,
  option: string
) {
  const selected = current[categoryId] ?? []
  const exists = selected.includes(option)

  return {
    ...current,
    [categoryId]: exists
      ? selected.filter((value) => value !== option)
      : [...selected, option],
  }
}

export function ItemListShowcase() {
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string[]>
  >({})
  const [display, setDisplay] =
    React.useState<ItemListDisplayState>(DEMO_DEFAULT_DISPLAY)

  return (
    <>
      <div id="custom-item-list-filter" className="scroll-m-20 space-y-4 rounded-xl border p-6">
        <h3 className="text-lg font-semibold">Item List Filter</h3>
        <div className="flex items-center justify-end rounded-lg border bg-card p-4">
          <ItemListFilter
            categories={DEMO_FILTER_CATEGORIES}
            selectedFilters={selectedFilters}
            onToggleFilter={(categoryId, option) =>
              setSelectedFilters((previous) =>
                toggleFilterValue(previous, categoryId, option)
              )
            }
            onClearFilters={() => setSelectedFilters({})}
          />
        </div>
      </div>

      <div id="custom-item-list-display" className="scroll-m-20 space-y-4 rounded-xl border p-6">
        <h3 className="text-lg font-semibold">Item List Display</h3>
        <div className="flex items-center justify-end rounded-lg border bg-card p-4">
          <ItemListDisplay
            value={display}
            onChange={setDisplay}
            onReset={() => setDisplay(DEMO_DEFAULT_DISPLAY)}
          />
        </div>
      </div>

      <div id="custom-item-list" className="scroll-m-20 space-y-4 rounded-xl border p-6">
        <h3 className="text-lg font-semibold">Item List</h3>
        <ItemList />
      </div>
    </>
  )
}
