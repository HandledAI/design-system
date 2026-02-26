# MetricCard

> Card for KPIs: title, value, unit, subtitle, change indicator, optional donut chart with data points.

## Import

```tsx
import { MetricCard, type MetricDataPoint } from "@handled-ai/design-system"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Card title |
| value | string \| number | — | Main value |
| unit | string | — | Unit (e.g. "%") |
| subtitle | string | — | Subtitle text |
| change | { value: string; direction: "up" \| "down" \| "neutral"; isGood?: boolean } | — | Change indicator |
| footerText | string | — | Footer text |
| dataPoints | MetricDataPoint[] | — | For donut variant |
| showExternalLink | boolean | — | Show external link icon |
| showInfo | boolean | true | Show info icon |

### MetricDataPoint

```ts
{ label: string; value: number | string; color?: string }
```

## Variants (if applicable)

- **Standard**: Title + big value + change + footer.
- **Donut**: `dataPoints` — inline donut with center value + legend.

## Basic Usage

```tsx
<MetricCard
  title="Conversion Rate"
  value={78}
  unit="%"
  subtitle="vs. last period"
  change={{ value: "+5%", direction: "up", isGood: true }}
  footerText="Based on 847 referrals"
/>
```

## Examples

**Donut variant**

```tsx
<MetricCard
  title="Pipeline by Stage"
  value={520}
  dataPoints={[
    { label: "Completed", value: 520, color: "#166534" },
    { label: "Scheduled", value: 92, color: "#22c55e" },
    { label: "Pending", value: 48, color: "#6ee7b7" },
  ]}
/>
```

**Churn (down is good)**

```tsx
<MetricCard
  title="Churn Rate"
  value={2.1}
  unit="%"
  change={{ value: "-0.3%", direction: "down", isGood: true }}
/>
```

## Peer Dependencies

- `lucide-react` (ArrowUp, ArrowDown, Info, ExternalLink)

## Internal Dependencies

None (standalone).

## Source

`registry/new-york/ui/metric-card.tsx`
