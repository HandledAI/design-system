# DataTable
> Full-featured data table with filtering, quick views, column visibility, sorting, and score analysis modal.
## Import
```tsx
import { DataTable } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onRowClick | (row: DataRow) => void | — | Optional row click handler |

**Note:** DataTable uses a built-in demo dataset and schema. For custom data, use or compose DataTableToolbar, DataTableFilter, DataTableQuickViews, DataTableDisplay with your own table implementation.

## Variants
N/A
## Basic Usage
```tsx
import { DataTable } from "@handled-ai/design-system"

<DataTable />
<DataTable onRowClick={(row) => console.log(row)} />
```

## Examples

### With row click
```tsx
import { DataTable } from "@handled-ai/design-system"

<DataTable onRowClick={(row) => setSelectedAccount(row)} />
```

### Full layout
The DataTable includes:
- DataTableToolbar (filters, display options)
- DataTableQuickViews (preset filters)
- Scrollable table with sticky header
- ScoreAnalysisModal (Risk/Expansion score drill-down)

## Peer Dependencies
- @tanstack/react-table
- lucide-react

## Internal Dependencies
- Badge
- DataTableQuickViews
- DataTableToolbar (DataTableFilter, DataTableDisplay)
- ScoreAnalysisModal
- detail-view (Citation, SourceDef)

## Source
`registry/new-york/ui/data-table.tsx`

**Client-only:** Yes (`"use client"`)
