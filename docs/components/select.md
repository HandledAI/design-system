# Select

> A dropdown select built on Radix UI Select. Client-only.

## Import

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@handled-ai/design-system"
```

## Props

### Select (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | — | Selected value |
| defaultValue | string | — | Default value (uncontrolled) |
| onValueChange | (value: string) => void | — | Value change handler |
| disabled | boolean | — | Disable select |
| required | boolean | — | Required for form |
| name | string | — | Form name |
| ...props | SelectRootProps | — | Radix Select.Root props |

### SelectTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | "sm" \| "default" | "default" | Trigger size |
| children | React.ReactNode | — | Trigger content (usually SelectValue) |
| className | string | — | Additional CSS classes |
| ...props | SelectTriggerProps | — | Radix Select.Trigger props |

### SelectContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | "popper" \| "item-aligned" | "item-aligned" | Positioning mode |
| align | "start" \| "center" \| "end" | "center" | Alignment |
| className | string | — | Additional CSS classes |
| ...props | SelectContentProps | — | Radix Select.Content props |

### SelectItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | — | Item value |
| disabled | boolean | — | Disable item |
| children | React.ReactNode | — | Item label |
| className | string | — | Additional CSS classes |
| ...props | SelectItemProps | — | Radix Select.Item props |

### SelectLabel, SelectSeparator, SelectGroup

Standard Radix Select props. SelectLabel/SelectSeparator accept `className`.

## Variants

### SelectTrigger size

- **default**: h-9
- **sm**: h-8

## Basic Usage

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@handled-ai/design-system"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Pick one" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>
```

## Examples

### Controlled with groups

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@handled-ai/design-system"

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Small size

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@handled-ai/design-system"

<Select>
  <SelectTrigger size="sm">
    <SelectValue placeholder="Compact" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">One</SelectItem>
    <SelectItem value="2">Two</SelectItem>
  </SelectContent>
</Select>
```

## Peer Dependencies

- `radix-ui` (includes @radix-ui/react-select)
- `lucide-react` (CheckIcon, ChevronDownIcon, ChevronUpIcon)
- `tailwind-merge` (via cn utility)

## Internal Dependencies

- `cn` utility

## Source

`registry/new-york/ui/select.tsx`

**Note:** Client-only component.
