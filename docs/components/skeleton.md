# Skeleton
> Animated placeholder for loading content.
## Import
```tsx
import { Skeleton } from "@handled-ai/design-system"
```
## Props
Prop | Type | Default | Description
className | string | — | Additional Tailwind classes
...props | React.ComponentProps&lt;"div"&gt; | — | All standard div attributes (style, etc.)

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { Skeleton } from "@handled-ai/design-system"

function LoadingCard() {
  return (
    <div className="space-y-3 p-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}
```
## Examples
### Avatar Placeholder
```tsx
<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-3 w-32" />
  </div>
</div>
```
### Card Skeleton
```tsx
<div className="rounded-lg border p-4">
  <Skeleton className="mb-4 h-40 w-full rounded-md" />
  <Skeleton className="mb-2 h-5 w-2/3" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="mt-2 h-4 w-4/5" />
</div>
```
## Peer Dependencies
None
## Internal Dependencies
cn (lib/utils)
## Source
`registry/new-york/ui/skeleton.tsx`
