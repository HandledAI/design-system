# Sidebar
> Collapsible app sidebar with desktop/mobile variants, groups, menus, and keyboard shortcuts.
## Import
```tsx
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSkeleton,
  SidebarSeparator,
  SidebarInput,
  SidebarRail,
  useSidebar,
} from "@handled-ai/design-system"
```
## Props
### SidebarProvider
Prop | Type | Default | Description
defaultOpen | boolean | true | Initial expanded state
open | boolean | — | Controlled open state
onOpenChange | (open: boolean) => void | — | Called when open state changes
className | string | — | Additional classes
style | React.CSSProperties | — | Inline styles

### Sidebar
Prop | Type | Default | Description
side | "left" \| "right" | "left" | Sidebar placement
variant | "sidebar" \| "floating" \| "inset" | "sidebar" | Visual variant
collapsible | "offcanvas" \| "icon" \| "none" | "offcanvas" | Collapse behavior

### SidebarMenuButton (CVA)
Prop | Type | Default | Description
variant | "default" \| "outline" | "default" | Button style variant
size | "default" \| "sm" \| "lg" | "default" | Button size
isActive | boolean | false | Active state styling
tooltip | string \| TooltipContentProps | — | Tooltip when collapsed
asChild | boolean | false | Render as child component (Slot)

## Variants (CVA)
**sidebarMenuButtonVariants:** `variant`: default | outline; `size`: default | sm | lg

## Basic Usage
```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@handled-ai/design-system"

export function AppLayout() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Home">
                  <span className="size-4" aria-hidden>🏠</span>
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger />
          <h1>App</h1>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```
## Examples
### Collapsed to Icon
```tsx
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@handled-ai/design-system"

<SidebarProvider defaultOpen={false}>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Dashboard" size="lg">
            <span className="size-4" aria-hidden>📊</span>
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>
```
### Floating Variant with Menu Sub-items
```tsx
import { Sidebar, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@handled-ai/design-system"

<Sidebar variant="floating" collapsible="icon">
  <SidebarGroup>
    <SidebarGroupLabel>Settings</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <span className="size-4" aria-hidden>👤</span>
            <span>Profile</span>
          </SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton href="/profile/edit">Edit</SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</Sidebar>
```
## Peer Dependencies
@radix-ui/react-slot, lucide-react
## Internal Dependencies
Button, Input, Separator, Sheet, Skeleton, Tooltip, useIsMobile
## Source
`registry/new-york/ui/sidebar.tsx`

---
**Note:** Client-only. Uses `"use client"`. Requires React context (SidebarProvider) and browser APIs for mobile detection and cookies.
