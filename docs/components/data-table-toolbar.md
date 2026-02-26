# DataTableToolbar
> Toolbar composing filter and display controls for data tables.
## Import
```tsx
import { DataTableToolbar } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| categories | DataTableFilterCategory[] | — | Filter categories |
| selectedFilters | Record\<string, string[]\> | — | Current filter state |
| onToggleFilter | (categoryId: string, option: string) => void | — | Filter toggle handler |
| sorting | SortingState | — | TanStack sorting state |
| onSortingChange | (next: SortingState) => void | — | Sorting change handler |
| displayColumns | DataTableDisplayColumn[] | — | Column metadata |
| onToggleColumn | (columnId: string) => void | — | Column visibility toggle |
| onResetDisplay | () => void | — | Reset display to defaults |

## Variants
N/A
## Basic Usage
```tsx
import { DataTableToolbar } from "@handled-ai/design-system"
import type { DataTableFilterCategory, DataTableDisplayColumn } from "@handled-ai/design-system"

<DataTableToolbar
  categories={filterCategories}
  selectedFilters={selectedFilters}
  onToggleFilter={toggleFilter}
  sorting={sorting}
  onSortingChange={setSorting}
  displayColumns={displayColumns}
  onToggleColumn={(id) => table.getColumn(id)?.toggleVisibility()}
  onResetDisplay={resetDisplay}
/>
```

## Examples

### Inside DataTable
DataTable renders DataTableToolbar with filter categories, display columns derived from table state, and handlers wired to table/sorting state.

### Custom table
```tsx
<div className="flex flex-col">
  <DataTableToolbar {...toolbarProps} />
  <table>...</table>
</div>
```

## Peer Dependencies
- @tanstack/react-table

## Internal Dependencies
- DataTableFilter
- DataTableDisplay

## Source
`registry/new-york/ui/data-table-toolbar.tsx`

**Client-only:** Yes (`"use client"`)
