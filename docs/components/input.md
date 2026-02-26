# Input

> Styled text input. Extends native `<input>` props with design-system styling.

## Import

```tsx
import { Input } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | — | Additional classes |
| type | string | — | Input type (text, email, etc.) |
| ...props | InputHTMLAttributes | — | All native input props |

Styled: `h-9`, rounded, border, focus ring, placeholder, disabled, file input support, invalid state.

## Variants (if applicable)

N/A — single variant; use `type` and native attributes.

## Basic Usage

```tsx
<Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
```

## Examples

**With label**

```tsx
import { Label } from "@handled-ai/design-system"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />
```

**Search + controlled**

```tsx
<Input
  type="search"
  placeholder="Search activity..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="h-9 text-sm"
/>
```

**Disabled / invalid**

```tsx
<Input disabled placeholder="Disabled" />
<Input aria-invalid placeholder="Required" />
```

## Peer Dependencies

None (uses `lib/utils` for `cn`).

## Internal Dependencies

- `lib/utils` (cn)

## Source

`registry/new-york/ui/input.tsx`
