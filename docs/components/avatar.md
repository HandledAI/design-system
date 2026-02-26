# Avatar
> User avatar with image, fallback, optional badge, and group layout.
## Import
```tsx
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@handled-ai/design-system"
```
## Props

### Avatar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | "default" \| "sm" \| "lg" | "default" | Size variant |
| ...props | ComponentProps\<AvatarPrimitive.Root\> | — | Radix Avatar.Root props |

### AvatarImage
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<AvatarPrimitive.Image\> | — | Radix Avatar.Image props (src, alt, etc.) |

### AvatarFallback
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<AvatarPrimitive.Fallback\> | — | Radix Avatar.Fallback props |

### AvatarBadge
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<"span"\> | — | Standard span props |

### AvatarGroup / AvatarGroupCount
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<"div"\> | — | Standard div props |

## Variants
- **size (Avatar):** `default` (size-8), `sm` (size-6), `lg` (size-10)

## Basic Usage
```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@handled-ai/design-system"

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Examples

### With badge
```tsx
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@handled-ai/design-system"

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
  <AvatarBadge>2</AvatarBadge>
</Avatar>
```

### Avatar group
```tsx
import { AvatarGroup, Avatar, AvatarImage, AvatarFallback, AvatarGroupCount } from "@handled-ai/design-system"

<AvatarGroup>
  <Avatar><AvatarImage src="/a.jpg" /><AvatarFallback>A</AvatarFallback></Avatar>
  <Avatar><AvatarImage src="/b.jpg" /><AvatarFallback>B</AvatarFallback></Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>
```

## Peer Dependencies
- radix-ui (includes @radix-ui/react-avatar)

## Internal Dependencies
None

## Source
`registry/new-york/ui/avatar.tsx`

**Client-only:** Yes (`"use client"`)
