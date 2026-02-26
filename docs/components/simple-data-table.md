# SimpleDataTable

A lightweight, generic data table with a clean `columns`/`data` interface. Provides rounded hover rows, thin header separators, and compact cell padding with no toolbar chrome.

## Import

```tsx
import { SimpleDataTable } from "@handled-ai/design-system"
```

## Usage

```tsx
import { createColumnHelper } from "@tanstack/react-table"

type Flow = { name: string; status: string; candidates: number }

const columnHelper = createColumnHelper<Flow>()

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("candidates", { header: "Candidates" }),
]

<SimpleDataTable
  columns={columns}
  data={flows}
  onRowClick={(row) => openDetail(row)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<TData, unknown>[]` | required | TanStack Table column definitions. |
| `data` | `TData[]` | required | Array of row data objects. |
| `onRowClick` | `(row: TData) => void` | — | Callback when a row is clicked. |
| `emptyIcon` | `ReactNode` | `<SearchX />` | Custom icon for the empty state. |
| `emptyMessage` | `string` | `"No rows found"` | Heading for the empty state. |
| `emptyDescription` | `string` | `"Try adjusting your filters"` | Description for the empty state. |
| `className` | `string` | — | Additional CSS classes on the wrapper. |

## Comparison with DataTable

| Feature | DataTable | SimpleDataTable |
|---------|-----------|-----------------|
| Built-in demo data | Yes | No (bring your own) |
| Toolbar / filters | Yes | No |
| Quick views | Yes | No |
| Score analysis modal | Yes | No |
| Generic type support | No (`DataRow`) | Yes (`TData`) |
| Column sorting | Yes | Yes |
| Row hover | Flat bg | Rounded corners (`rounded-lg`) |
| Cell borders | Yes | No |
