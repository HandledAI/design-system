# ItemList

> Queue/inventory list with quick views, filters, display controls, and grouped list/board views. Uses ItemListToolbar, ItemListDisplay, ItemListFilter.

## Import

```tsx
import {
  ItemList,
  GroupedListView,
  type GroupedListGroup,
  type GroupedListViewProps,
} from "@handled-ai/design-system"
```

## Props

### ItemList (standalone)

ItemList is a self-contained demo/showcase with internal state. For custom implementations, use `GroupedListView` + `ItemListToolbar` + `ItemListFilter` + `ItemListDisplay`.

### GroupedListView\<T\>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| groups | GroupedListGroup\<T\>[] | — | `{ key, label, items }[]` |
| renderRow | (item: T, index: number) => ReactNode | — | Row renderer |
| getItemKey | (item: T) => string | — | Unique key |
| selectedKey | string | — | Selected item key |
| onItemClick | (item: T) => void | — | Row click handler |
| emptyMessage | string | "No items found" | Empty state message |
| className | string | — | Wrapper classes |

### GroupedListGroup\<T\>

```ts
{ key: string; label: string; items: T[] }
```

## Variants (if applicable)

- **List view**: Expandable groups, rows with details.
- **Board view**: Column cards by group.

## Basic Usage

**GroupedListView (reusable)**

```tsx
<GroupedListView
  groups={groupedItems}
  renderRow={(item) => <InboxRow {...item} />}
  getItemKey={(item) => item.id}
  selectedKey={selectedId}
  onItemClick={(item) => setSelectedId(item.id)}
  emptyMessage="No queue items"
/>
```

## Examples

**Custom grouped list**

```tsx
const groups: GroupedListGroup<QueueItem>[] = [
  { key: "e-b-verified", label: "E&B Verified", items: verifiedItems },
  { key: "contacted", label: "Contacted", items: contactedItems },
]
<GroupedListView
  groups={groups}
  renderRow={(item) => (
    <InboxRow
      itemId={item.id}
      primaryText={item.patient}
      secondaryText={item.source}
      tertiaryText={item.specialty}
      statusColor={item.risk === "At Risk" ? "red" : "gray"}
      assignee={item.owner}
      status={item.stage}
      time={item.aging}
      interactionCount={item.attempts}
    />
  )}
  getItemKey={(item) => item.id}
  selectedKey={selectedId}
  onItemClick={selectItem}
/>
```

**Full ItemList (demo)**

```tsx
<ItemList />
```

Uses quick views (Referrals, Contact Attempted, Pending Intake, etc.), filters (stage, risk, owner), display (list/board, grouping, visible columns).

## Peer Dependencies

- `lucide-react`
- `@handled-ai/design-system` (Badge, ItemListToolbar, ItemListFilter, ItemListDisplay)

## Internal Dependencies

- Badge
- ItemListToolbar, ItemListFilter, ItemListDisplay
- ItemListDisplayState, ItemListFilterCategory, ItemListQuickView

## Source

`registry/new-york/ui/item-list.tsx`

**Client-only:** Uses `"use client"`.
