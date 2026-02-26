# StyledBarList
> Horizontal bar list for name/value data with optional animation and subtitles.
## Import
```tsx
import { StyledBarList } from "@handled-ai/design-system"
import type { StyledBarItem, StyledBarListProps } from "@handled-ai/design-system"
```
## Props
Prop | Type | Default | Description
data | StyledBarItem[] | — | Array of { name, value, href?, subtitle? }
valueFormatter | (value: number) => string | (v) => v.toString() | Formatter for value display
className | string | — | Additional classes
showAnimation | boolean | true | Animate bar width transitions
showSubtitle | boolean | false | Show subtitle under each bar
barColor | string | "bg-emerald-500/30" | Tailwind class for bar fill

### StyledBarItem
Prop | Type | Description
name | string | Label text
value | number | Numeric value (drives bar width)
href | string | Optional link
subtitle | string | Optional subtitle when showSubtitle is true

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { StyledBarList } from "@handled-ai/design-system"

const data = [
  { name: "Product A", value: 120 },
  { name: "Product B", value: 85 },
  { name: "Product C", value: 200 },
]

<StyledBarList data={data} valueFormatter={(v) => `$${v}k`} />
```
## Examples
### With Subtitles
```tsx
<StyledBarList
  data={[
    { name: "Q1", value: 45, subtitle: "Up 12% from last quarter" },
    { name: "Q2", value: 62, subtitle: "Up 8% from last quarter" },
  ]}
  showSubtitle
  barColor="bg-blue-500/30"
/>
```
### Custom Formatter
```tsx
<StyledBarList
  data={salesByRegion}
  valueFormatter={(v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v)}
  showAnimation={false}
/>
```
## Peer Dependencies

None beyond base peer dependencies.

## Internal Dependencies
cn (lib/utils)
## Source
`registry/new-york/ui/styled-bar-list.tsx`

---
**Note:** Client-only. Uses `"use client"`.
