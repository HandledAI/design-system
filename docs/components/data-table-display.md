# DataTableDisplay
> Dropdown for sorting and column visibility in data tables.
## Import
```tsx
import { DataTableDisplay, type DataTableDisplayColumn } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sorting | SortingState | — | TanStack Table sorting state |
| onSortingChange | (next: SortingState) => void | — | Sorting change handler |
| columns | DataTableDisplayColumn[] | — | Column metadata for visibility + sort |
| onToggleColumn | (columnId: string) => void | — | Toggle column visibility |
| onReset | () => void | — | Reset display to defaults |

### DataTableDisplayColumn
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | — | Column id |
| label | string | — | Display label |
| visible | boolean | — | Is column visible |
| canHide | boolean | — | Can column be hidden |

## Variants
N/A
## Basic Usage
```tsx
import { DataTableDisplay } from "@handled-ai/design-system"

<DataTableDisplay
  sorting={sorting}
  onSortingChange={setSorting}
  columns={[
    { id: "name", label: "Name", visible: true, canHide: false },
    { id: "status", label: "Status", visible: true, canHide: true },
  ]}
  onToggleColumn={(id) => table.getColumn(id)?.toggleVisibility()}
  onReset={() => setColumnVisibility(DEFAULT)}
/>
```

## Examples

### With DataTableToolbar
DataTableDisplay is typically used inside DataTableToolbar; see DataTable / DataTableToolbar docs.

### Standalone
```tsx
<DataTableDisplay
  sorting={[{ id: "createdAt", desc: true }]}
  onSortingChange={setSorting}
  columns={displayColumns}
  onToggleColumn={toggleColumn}
  onReset={resetDisplay}
/>
```

## Peer Dependencies
- @tanstack/react-table

## Internal Dependencies
- Button
- DropdownMenu
- Select

## Source
`registry/new-york/ui/data-table-display.tsx`

**Client-only:** Yes (`"use client"`)
