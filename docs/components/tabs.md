# Tabs
> Radix-based tabs with horizontal/vertical orientation and CVA list variants.
## Import
```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
} from "@handled-ai/design-system"
```
## Props
### Tabs (TabsPrimitive.Root)
Prop | Type | Default | Description
defaultValue | string | — | Default active tab value
value | string | — | Controlled value
onValueChange | (value: string) => void | — | Value change handler
orientation | "horizontal" \| "vertical" | "horizontal" | Tab layout
className | string | — | Additional classes

### TabsList
Prop | Type | Default | Description
variant | "default" \| "line" | "default" | Visual variant (pills vs underline)
className | string | — | Additional classes

### TabsTrigger
Prop | Type | Default | Description
value | string | — | Tab value (required)
className | string | — | Additional classes
disabled | boolean | — | Disable tab

### TabsContent
Prop | Type | Default | Description
value | string | — | Content value (must match trigger)
className | string | — | Additional classes
forceMount | boolean | — | Force mount when inactive

## Variants (CVA)
**tabsListVariants:** `variant`: default (bg-muted pills) | line (transparent with underline indicator)

## Basic Usage
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@handled-ai/design-system"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
</Tabs>
```
## Examples
### Line Variant
```tsx
<Tabs defaultValue="tab1">
  <TabsList variant="line">
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```
### Vertical Tabs
```tsx
<Tabs orientation="vertical" defaultValue="settings">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Profile form</TabsContent>
  <TabsContent value="settings">Settings form</TabsContent>
</Tabs>
```
## Peer Dependencies

- `radix-ui` (Tabs primitive)
## Internal Dependencies
cn (lib/utils)
## Source
`registry/new-york/ui/tabs.tsx`

---
**Note:** Client-only. Uses `"use client"`.
