# EntityPanel

> Side sheet/drawer for entity details (lead, account). Supports fullscreen toggle and compound subcomponents.

## Import

```tsx
import {
  EntityPanel,
  EntityPanelHeader,
  EntityPanelTabs,
  EntityMetadataGrid,
  EntitySection,
  EntityActivityItem,
  EntityDetails,
  PotentialContacts,
  RecentActivity,
  ConnectedApps,
  SystemActivity,
  type EntityMetadataField,
  type EntityPanelBrandIcons,
  type ActivityItem,
} from "@handled-ai/design-system"
```

## Props

### EntityPanel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | — | Panel visibility |
| onClose | (open: boolean) => void | — | Close handler |
| children | ReactNode | — | Panel content |

### EntityPanelHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | ReactNode | — | Optional header icon |
| title | string | — | Entity title |
| badgeLabel | string | — | Badge (e.g. "Lead") |
| subtitle | string | — | Optional subtitle |
| headerAction | ReactNode | — | Custom content rendered in the header's action area before the Copy Link and Fullscreen buttons. |

### EntityPanelTabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tabs | { id: string; label: string }[] | — | Tab definitions |
| activeTab | string | — | Active tab id |
| onTabChange | (id: string) => void | — | Tab change handler |

### EntityMetadataGrid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fields | EntityMetadataField[] | — | `{ icon, label, value }[]` |

### EntitySection

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Section heading |
| children | ReactNode | — | Content |
| action | ReactNode | — | Optional action slot |

### EntityActivityItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | ReactNode | — | Optional icon |
| title | ReactNode | — | Title content |
| description | ReactNode | — | Optional description |
| date | string | — | Optional timestamp |

## Variants (if applicable)

- **Sheet mode** (default): Right slide-out, ~500px width.
- **Fullscreen**: Toggle via header; uses `fixed inset-0`.

## Basic Usage

```tsx
<EntityPanel isOpen={isOpen} onClose={setIsOpen}>
  <EntityPanelHeader
    title="CloudKitchen"
    badgeLabel="Lead"
    subtitle="Last enriched: Today"
  />
  <EntityPanelTabs
    tabs={[{ id: "overview", label: "Overview" }, { id: "details", label: "Details" }]}
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />
  <EntityMetadataGrid fields={metadataFields} />
  <EntitySection title="Company Signals">
    <ul>...</ul>
  </EntitySection>
</EntityPanel>
```

## Examples

**Header with fullscreen toggle**

```tsx
<EntityPanelHeader
  icon={<Avatar>CK</Avatar>}
  title="Acme Corp"
  badgeLabel="Account"
  subtitle="Enriched 2h ago"
/>
```

**Metadata fields**

```tsx
const fields: EntityMetadataField[] = [
  { icon: Users, label: "Lead Name", value: <span>Jackie Lee</span> },
  { icon: Building2, label: "Company", value: <span>CloudKitchen</span> },
  { icon: Mail, label: "Source", value: <Badge>Inbound</Badge> },
]
<EntityMetadataGrid fields={fields} />
```

**Section with activity**

```tsx
<EntitySection title="Recent Activity" action={<Button size="sm">View all</Button>}>
  <EntityActivityItem
    icon={<Mail className="w-4 h-4" />}
    title={<><strong>Jackie</strong> submitted form</>}
    date="Yesterday at 3:22 PM"
  />
</EntitySection>
```

## Peer Dependencies

- `lucide-react`
- `@handled-ai/design-system` (Sheet, Badge, Button, Input, Avatar)

## Internal Dependencies

- Sheet, DialogContent
- Badge, Button, Input
- TimelineActivity (for RecentActivity)

## Source

`registry/new-york/ui/entity-panel.tsx`

**Client-only:** Uses `"use client"`.
