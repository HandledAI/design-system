# ItemListToolbar

> Toolbar combining quick view pills, filter dropdown, and display settings popover.

## Import

```tsx
import {
  ItemListToolbar,
  type ItemListQuickView,
} from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| quickViews | ItemListQuickView[] | — | `{ id, label, count }[]` |
| activeQuickView | string \| null | — | Active quick view id |
| onQuickViewChange | (viewId: string \| null) => void | — | Quick view change handler |
| filterCategories | ItemListFilterCategory[] | — | For ItemListFilter |
| selectedFilters | Record&lt;string, string[]&gt; | — | For ItemListFilter |
| onToggleFilter | (categoryId: string, option: string) => void | — | Filter toggle |
| onClearFilters | () => void | — | Clear filters |
| display | ItemListDisplayState | — | For ItemListDisplay |
| onDisplayChange | (next: ItemListDisplayState) => void | — | Display state change |
| onResetDisplay | () => void | — | Reset display |

### ItemListQuickView

```ts
{ id: string; label: string; count: number }
```

## Variants (if applicable)

N/A — single layout.

## Basic Usage

```tsx
<ItemListToolbar
  quickViews={[
    { id: "referrals", label: "Referrals", count: 12 },
    { id: "contact-attempted", label: "Contact Attempted", count: 8 },
  ]}
  activeQuickView={activeView}
  onQuickViewChange={setActiveView}
  filterCategories={filterCategories}
  selectedFilters={selectedFilters}
  onToggleFilter={handleToggle}
  onClearFilters={clearFilters}
  display={display}
  onDisplayChange={setDisplay}
  onResetDisplay={() => setDisplay(DEFAULT)}
/>
```

## Examples

**Full toolbar**

```tsx
<ItemListToolbar
  quickViews={quickViews}
  activeQuickView={activeQuickView}
  onQuickViewChange={setActiveQuickView}
  filterCategories={FILTER_CATEGORIES}
  selectedFilters={selectedFilters}
  onToggleFilter={(id, opt) => setSelectedFilters(toggle(selectedFilters, id, opt))}
  onClearFilters={() => setSelectedFilters({})}
  display={display}
  onDisplayChange={setDisplay}
  onResetDisplay={() => setDisplay(DEFAULT_DISPLAY_STATE)}
/>
```

**Without filters**

```tsx
<ItemListToolbar
  quickViews={views}
  activeQuickView={view}
  onQuickViewChange={setView}
  filterCategories={[]}
  selectedFilters={{}}
  onToggleFilter={() => {}}
  onClearFilters={() => {}}
  display={display}
  onDisplayChange={setDisplay}
  onResetDisplay={reset}
/>
```

## Peer Dependencies

- `@handled-ai/design-system` (ItemListDisplay, ItemListFilter)

## Internal Dependencies

- ItemListDisplay
- ItemListFilter

## Source

`registry/new-york/ui/item-list-toolbar.tsx`

**Client-only:** Uses `"use client"`.
