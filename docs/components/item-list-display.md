# ItemListDisplay

> Popover for display settings: view mode (list/board), grouping, sub-grouping, ordering, and visible row toggles.

## Import

```tsx
import {
  ItemListDisplay,
  type ItemListDisplayState,
  type ItemListGrouping,
  type ItemListViewMode,
} from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | ItemListDisplayState | — | Current state |
| onChange | (next: ItemListDisplayState) => void | — | State change handler |
| onReset | () => void | — | Reset to defaults |

### ItemListDisplayState

```ts
{
  viewMode: "list" | "board"
  grouping: "stage" | "owner" | "risk"
  subGrouping: "none" | "stage" | "owner" | "risk"
  ordering: string
  orderingDirection: "asc" | "desc"
  showContactSignals: boolean
  showOwner: boolean
  showStatus: boolean
}
```

## Variants (if applicable)

- **viewMode**: `list`, `board`
- **grouping**: `stage`, `owner`, `risk`

## Basic Usage

```tsx
<ItemListDisplay
  value={display}
  onChange={setDisplay}
  onReset={() => setDisplay(DEFAULT_DISPLAY_STATE)}
/>
```

## Examples

**Controlled display state**

```tsx
const [display, setDisplay] = useState<ItemListDisplayState>({
  viewMode: "list",
  grouping: "stage",
  subGrouping: "none",
  ordering: "priority",
  orderingDirection: "desc",
  showContactSignals: true,
  showOwner: true,
  showStatus: true,
})

<ItemListDisplay
  value={display}
  onChange={setDisplay}
  onReset={() => setDisplay(DEFAULT_DISPLAY_STATE)}
/>
```

**Within ItemListToolbar**

```tsx
<ItemListToolbar
  ...
  display={display}
  onDisplayChange={setDisplay}
  onResetDisplay={() => setDisplay(DEFAULT)}
/>
```

## Peer Dependencies

- `lucide-react`
- `radix-ui` (Popover)
- `@handled-ai/design-system` (Button, Select, Separator)

## Internal Dependencies

- Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- Separator

## Source

`registry/new-york/ui/item-list-display.tsx`

**Client-only:** Uses `"use client"`.
