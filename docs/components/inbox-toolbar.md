# InboxToolbar

> Toolbar for inbox/queue views: assignee filter (me/team/all), multi-category filters, and filter pills with clear.

## Import

```tsx
import {
  InboxToolbar,
  type AssigneeFilter,
  type InboxFilterCategory,
} from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| assignee | AssigneeFilter | — | "me" \| "team" \| "all" |
| onAssigneeChange | (value: AssigneeFilter) => void | — | Assignee change handler |
| filterCategories | InboxFilterCategory[] | — | `{ id, label, icon, options[] }` |
| selectedFilters | Record&lt;string, string&gt; | — | `{ categoryId: selectedValue }` (use "all" for no filter) |
| onFilterChange | (categoryId: string, value: string) => void | — | Filter change handler |
| onClearFilters | () => void | — | Clear all filters |
| className | string | — | Wrapper classes |

### InboxFilterCategory

```ts
{ id: string; label: string; icon: ReactNode; options: string[] }
```

## Variants (if applicable)

N/A — single layout.

## Basic Usage

```tsx
<InboxToolbar
  assignee="me"
  onAssigneeChange={setAssignee}
  filterCategories={[
    { id: "status", label: "Status", icon: <Tag />, options: ["Active", "Pending", "Closed"] },
    { id: "account", label: "Account", icon: <Building />, options: accountNames },
  ]}
  selectedFilters={selectedFilters}
  onFilterChange={handleFilterChange}
  onClearFilters={() => setSelectedFilters({})}
/>
```

## Examples

**Full toolbar**

```tsx
const [assignee, setAssignee] = useState<AssigneeFilter>("me")
const [filters, setFilters] = useState<Record<string, string>>({})

<InboxToolbar
  assignee={assignee}
  onAssigneeChange={setAssignee}
  filterCategories={[
    { id: "status", label: "Status", icon: <Tag />, options: ["New", "In Progress", "Done"] },
    { id: "company", label: "Company", icon: <Building />, options: ["Acme", "Beta", "Gamma"] },
  ]}
  selectedFilters={filters}
  onFilterChange={(id, value) => setFilters((f) => ({ ...f, [id]: value }))}
  onClearFilters={() => setFilters({})}
/>
```

**With active filter pills**

When `selectedFilters` has non-"all" values, pill badges render with remove (X). "Clear All" appears when any filter is active.

## Peer Dependencies

- `lucide-react`
- `@handled-ai/design-system` (Button, Badge, DropdownMenu)

## Internal Dependencies

- Button, Badge
- DropdownMenu (Trigger, Content, Label, RadioGroup, RadioItem, Separator, Sub, SubTrigger, SubContent)

## Source

`registry/new-york/ui/inbox-toolbar.tsx`

**Client-only:** Uses `"use client"`.
