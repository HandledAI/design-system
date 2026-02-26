# Card
> Compound card layout with header, content, footer, and optional action slot.
## Import
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@handled-ai/design-system"
```
## Props

### Card
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<"div"\> | — | Standard div props |

### CardHeader
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<"div"\> | — | Standard div props |

### CardTitle
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<"div"\> | — | Standard div props |

### CardDescription
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<"div"\> | — | Standard div props |

### CardAction
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<"div"\> | — | Action slot (top-right) |

### CardContent
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<"div"\> | — | Main content area |

### CardFooter
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...props | ComponentProps\<"div"\> | — | Footer with border-t when .border-t |

## Variants
N/A
## Basic Usage
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@handled-ai/design-system"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

## Examples

### With action and footer
```tsx
import { Card, CardHeader, CardTitle, CardAction, CardContent, CardFooter, Button } from "@handled-ai/design-system"

<Card>
  <CardHeader>
    <CardTitle>Report</CardTitle>
    <CardAction>
      <Button size="sm" variant="ghost">Export</Button>
    </CardAction>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter className="border-t">
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Full layout
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@handled-ai/design-system"

<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
    <CardDescription>Manage your preferences</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>
```

## Peer Dependencies
None beyond base peer dependencies.

## Internal Dependencies
None

## Source
`registry/new-york/ui/card.tsx`
