# QuickActionSidebarNav

> A collapsible sidebar with brand, nav sections, Quick Action button, user profile dropdown, and integrated QuickActionModal. Client-only.

## Import

```tsx
import {
  QuickActionSidebarNav,
  type QuickActionTaskDraft,
  type SidebarNavItem,
  type SidebarNavSection,
  type SidebarUserProfile,
  type UserMenuItem,
} from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| brandLabel | string | "ACME CO" | Brand header text |
| brandSubtitle | string | "Placeholder" | Brand subtitle |
| navSections | SidebarNavSection[] | DEFAULT_NAV_SECTIONS | Navigation sections |
| activeItemId | string | "inbox" | Currently active nav item id |
| activeVariant | "default" \| "gradient" | "default" | Active state style: `"default"` flat background, `"gradient"` gradient from primary. |
| onNavigate | (itemId: string) => void | — | Navigation handler |
| user | SidebarUserProfile | DEFAULT_USER | User profile for footer |
| userMenuItems | UserMenuItem[] | DEFAULT_USER_MENU | User dropdown menu items |
| onUserMenuAction | (itemId: string) => void | — | User menu item click handler |
| onCreateTask | (draft: QuickActionTaskDraft) => void | — | Quick Action create handler |
| defaultCollapsed | boolean | false | Initial collapsed state |
| brandImage | string | — | URL to a brand image. When provided, renders an `<img>` element instead of the default circle-and-text brand mark. |
| hideQuickAction | boolean | — | When true, suppresses the Quick Action button, tooltip, and Cmd+K modal entirely. |
| className | string | — | Additional CSS classes |
| ...props | React.ComponentProps<"aside"> | — | Standard aside attributes |

**SidebarNavItem:** `{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }`  
**SidebarNavSection:** `{ title?: string; items: SidebarNavItem[]; moreItems?: SidebarNavItem[] }`  
**SidebarUserProfile:** `{ name: string; email: string; initials?: string }`  
**UserMenuItem:** `{ id: string; label: string; icon: React.ComponentType<{ className?: string }>; destructive?: boolean }`

## Variants

### activeVariant

- `"default"` — Active nav item gets a flat `bg-sidebar-accent` background (existing behavior).
- `"gradient"` — Active nav item gets `bg-gradient-to-r from-primary/10 to-transparent text-primary`, matching the Recruiting Module sidebar pattern.

## Basic Usage

```tsx
import { QuickActionSidebarNav } from "@handled-ai/design-system"

<QuickActionSidebarNav
  onNavigate={(id) => setActiveId(id)}
  onCreateTask={(draft) => createTask(draft)}
/>
```

## Examples

### Custom nav and user

```tsx
import { QuickActionSidebarNav } from "@handled-ai/design-system"

const HomeIcon = () => <span className="size-4" aria-hidden>🏠</span>
const SettingsIcon = () => <span className="size-4" aria-hidden>⚙</span>
<QuickActionSidebarNav
  brandLabel="My App"
  navSections={[
    { items: [{ id: "home", label: "Home", icon: HomeIcon }] },
    { title: "Settings", items: [{ id: "settings", label: "Settings", icon: SettingsIcon }] },
  ]}
  user={{ name: "Jane Doe", email: "jane@example.com" }}
  onNavigate={handleNav}
  onUserMenuAction={handleUserAction}
/>
```

### Start collapsed

```tsx
import { QuickActionSidebarNav } from "@handled-ai/design-system"

<QuickActionSidebarNav defaultCollapsed onCreateTask={handleCreate} />
```

## Peer Dependencies

- `lucide-react`
- `tailwind-merge` (via cn utility)

## Internal Dependencies

- Avatar, AvatarFallback
- DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
- Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
- QuickActionModal

## Source

`registry/new-york/ui/quick-action-sidebar-nav.tsx`

**Note:** Client-only component.
