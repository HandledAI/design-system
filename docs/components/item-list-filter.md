# ItemListFilter

> Dropdown filter with multi-category option toggles. Shows active count badge; supports clear all.

## Import

```tsx
import {
  ItemListFilter,
  type ItemListFilterCategory,
} from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| categories | ItemListFilterCategory[] | — | `{ id, label, options[] }` |
| selectedFilters | Record&lt;string, string[]&gt; | — | `{ categoryId: selectedOption[] }` |
| onToggleFilter | (categoryId: string, option: string) => void | — | Toggle option (add/remove) |
| onClearFilters | () => void | — | Clear all selections |

### ItemListFilterCategory

```ts
{ id: string; label: string; options: string[] }
```

## Variants (if applicable)

N/A — multi-select per category.

## Basic Usage

```tsx
<ItemListFilter
  categories={[
    { id: "stage", label: "Queue stage", options: ["Referrals", "E&B Verified", "Contacted"] },
    { id: "risk", label: "Risk level", options: ["At Risk", "Watch", "Stable"] },
  ]}
  selectedFilters={selectedFilters}
  onToggleFilter={(id, opt) => setSelectedFilters(toggle(selectedFilters, id, opt))}
  onClearFilters={() => setSelectedFilters({})}
/>
```

## Examples

**Stage + owner filters**

```tsx
const categories: ItemListFilterCategory[] = [
  { id: "stage", label: "Stage", options: ["New", "In Progress", "Done"] },
  { id: "owner", label: "Assignee", options: owners },
]
<ItemListFilter
  categories={categories}
  selectedFilters={filters}
  onToggleFilter={(cat, opt) => {
    setFilters((prev) => {
      const arr = prev[cat] ?? []
      const next = arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]
      return { ...prev, [cat]: next }
    })
  }}
  onClearFilters={() => setFilters({})}
/>
```

**Within ItemListToolbar**

```tsx
<ItemListToolbar
  filterCategories={categories}
  selectedFilters={selectedFilters}
  onToggleFilter={handleToggle}
  onClearFilters={clearFilters}
  ...
/>
```

## Peer Dependencies

- `lucide-react`
- `@handled-ai/design-system` (Button, DropdownMenu)

## Internal Dependencies

- Button
- DropdownMenu (Trigger, Content, Label, Separator)

## Source

`registry/new-york/ui/item-list-filter.tsx`

**Client-only:** Uses `"use client"`.
