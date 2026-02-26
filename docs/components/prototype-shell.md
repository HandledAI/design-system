# PrototypeShell

Config-driven shell component that renders a full prototype application with sidebar navigation, configurable views, and an entity detail panel.

## Import

```tsx
import { PrototypeShell, type PrototypeConfig } from "@handled-ai/design-system"
```

## Usage

```tsx
<PrototypeShell config={config} />
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `PrototypeConfig` | Yes | Full prototype configuration (sidebar, views, brand, entity panel). |
| `headerActions` | `ReactNode` | No | Extra content rendered in each view's header area. |
| `entityPanelChildren` | `ReactNode \| ((ctx: { onClose }) => ReactNode)` | No | Custom entity panel content. Overrides default section rendering. |

## Configuration

See [Prototype Template Guide](../prototype-template.md) for the full `PrototypeConfig` reference.

## Dependencies

- `QuickActionSidebarNav`
- `EntityPanel`, `EntityDetails`, `PotentialContacts`, `RecentActivity`, `ConnectedApps`, `SystemActivity`
- `PrototypeInboxView`, `PrototypeInsightsView`, `PrototypeAccountsView`, `PrototypeWorkQueueView`
