# DataTable
> Full-featured data table with filtering, quick views, column visibility, sorting, and score analysis modal.
## Import
```tsx
import { DataTable, type DataRow, type DataTableProps } from "@handled-ai/design-system"
```
## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onRowClick | (row: DataRow) => void | — | Optional row click handler |
| rows | DataRow[] | built-in sample | Custom row data. Defaults to built-in sample data. |
| filterCategories | DataTableFilterCategory[] | — | Custom filter dimensions. |
| quickViews | string[] | — | Quick view preset names. |
| moreQuickViews | string[] | — | Additional quick view presets shown in overflow. |
| quickViewFilters | Record<string, (row: DataRow) => boolean> | — | Filter functions keyed by quick view name. |
| iconMap | { salesforce?: string } | — | Icon URLs for external service links. |
| entityUrlBuilder | (row: DataRow) => string | — | Callback to build deep-link URLs for entities. |
| onScoreFactorFeedback | (account, scoreType, factorKey, type, detail?) => void | — | Callback for score factor thumbs up/down feedback. |
| onScoreApproveFeedback | (account, scoreType, reasons, detail) => void | — | Callback for score approval feedback. |
| onScoreDismissFeedback | (account, scoreType, reasons, detail) => void | — | Callback for score dismiss feedback. |

**Exported types:** `DataRow` (row shape with all fields), `DataTableProps`.

**Note:** When `rows` is omitted, DataTable uses a built-in demo dataset. For full control, use or compose DataTableToolbar, DataTableFilter, DataTableQuickViews, DataTableDisplay with your own table implementation.

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
