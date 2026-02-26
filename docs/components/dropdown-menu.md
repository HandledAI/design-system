# DropdownMenu

> Radix-based dropdown menu with items, submenus, radio/checkbox groups, labels, and separators.

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@handled-ai/design-system"
```

## Props

### DropdownMenuContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sideOffset | number | 4 | Distance from trigger |
| align | "start" \| "center" \| "end" | — | Alignment |
| className | string | — | Additional classes |

### DropdownMenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| inset | boolean | — | Left padding for sub-item alignment |
| variant | "default" \| "destructive" | "default" | Item variant |
| className | string | — | Additional classes |

### DropdownMenuLabel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| inset | boolean | — | Left padding |

### DropdownMenuSubTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| inset | boolean | — | Left padding |

## Variants (if applicable)

- **DropdownMenuItem** `variant`: `default`, `destructive`

## Basic Usage

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Examples

**Submenu**

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Filter</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-[220px]">
    <DropdownMenuLabel>Add Filter</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
```

**Radio group**

```tsx
<DropdownMenuRadioGroup value={assignee} onValueChange={onAssigneeChange}>
  <DropdownMenuRadioItem value="me">Assigned to me</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="team">My Team</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="all">All Cases</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>
```

**Checkbox items**

```tsx
<DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
  Show archived
</DropdownMenuCheckboxItem>
```

## Peer Dependencies

- `radix-ui` (@radix-ui/react-dropdown-menu)
- `lucide-react`

## Internal Dependencies

None (standalone).

## Source

`registry/new-york/ui/dropdown-menu.tsx`

**Client-only:** Uses `"use client"`.
