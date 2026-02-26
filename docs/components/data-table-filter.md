# DataTableFilter
> Dropdown filter for data tables with searchable categories and multi-select options.
## Import
```tsx
import { DataTableFilter, type DataTableFilterCategory } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| categories | DataTableFilterCategory[] | — | Filter categories |
| selectedFilters | Record\<string, string[]\> | — | Currently selected filters (categoryId → option[]) |
| onToggleFilter | (categoryId: string, option: string) => void | — | Toggle a filter option |

### DataTableFilterCategory
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | — | Category id |
| label | string | — | Display label |
| icon | React.ComponentType\<{ className?: string }\> | — | Category icon |
| options | string[] | — | Filter options |

## Variants
N/A
## Basic Usage
```tsx
import { DataTableFilter } from "@handled-ai/design-system"

const IndustryIcon = () => <span className="size-4" aria-hidden>💼</span>
<DataTableFilter
  categories={[
    { id: "industry", label: "Industry", icon: IndustryIcon, options: ["Software", "Fintech"] },
  ]}
  selectedFilters={selectedFilters}
  onToggleFilter={(catId, option) => toggleFilter(catId, option)}
/>
```

## Examples

### Multiple categories
```tsx
import { DataTableFilter } from "@handled-ai/design-system"

const StatusIcon = () => <span className="size-4" aria-hidden>✓</span>
const RegionIcon = () => <span className="size-4" aria-hidden>📍</span>
<DataTableFilter
  categories={[
    { id: "status", label: "Status", icon: StatusIcon, options: ["Active", "Pending"] },
    { id: "region", label: "Region", icon: RegionIcon, options: ["US", "EU", "APAC"] },
  ]}
  selectedFilters={selectedFilters}
  onToggleFilter={handleToggle}
/>
```

### With DataTableToolbar
DataTableFilter is used inside DataTableToolbar; see DataTable docs.

## Peer Dependencies
None beyond base peer dependencies.

## Internal Dependencies
- Button
- DropdownMenu

## Source
`registry/new-york/ui/data-table-filter.tsx`

**Client-only:** Yes (`"use client"`)
