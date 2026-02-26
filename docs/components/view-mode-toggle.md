# ViewModeToggle
> Icon-based toggle for switching view modes (e.g. list vs grid).
## Import
```tsx
import {
  ViewModeToggle,
  type ViewMode,
  type ViewModeToggleProps,
} from "@handled-ai/design-system"
```
## Props
Prop | Type | Default | Description
modes | ViewMode[] | — | Array of { id, icon, label }
activeMode | string | — | Currently active mode ID
onModeChange | (modeId: string) => void | — | Called when mode changes
className | string | — | Additional classes

### ViewMode
Prop | Type | Description
id | string | Unique mode ID
icon | ReactNode | Icon for the button
label | string | Accessible label (used for title)

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { ViewModeToggle } from "@handled-ai/design-system"

const modes = [
  { id: "list", icon: <span className="size-4" aria-hidden>≡</span>, label: "List view" },
  { id: "grid", icon: <span className="size-4" aria-hidden>⊞</span>, label: "Grid view" },
]

<ViewModeToggle
  modes={modes}
  activeMode={viewMode}
  onModeChange={setViewMode}
/>
```
## Examples
### Three Modes
```tsx
import { ViewModeToggle } from "@handled-ai/design-system"

<ViewModeToggle
  modes={[
    { id: "list", icon: <span className="size-4" aria-hidden>≡</span>, label: "List" },
    { id: "grid", icon: <span className="size-4" aria-hidden>⊞</span>, label: "Grid" },
    { id: "kanban", icon: <span className="size-4" aria-hidden>▤</span>, label: "Kanban" },
  ]}
  activeMode={mode}
  onModeChange={setMode}
/>
```
### With Toolbar
```tsx
import { ViewModeToggle, Separator, Button } from "@handled-ai/design-system"

<div className="flex items-center gap-2">
  <ViewModeToggle modes={modes} activeMode={mode} onModeChange={setMode} />
  <Separator orientation="vertical" className="h-4" />
  <Button variant="ghost" size="sm">Filter</Button>
</div>
```
## Peer Dependencies
None
## Internal Dependencies
cn (lib/utils)
## Source
`registry/new-york/ui/view-mode-toggle.tsx`

---
**Note:** Client-only. Uses `"use client"`.
