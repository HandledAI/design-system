# AgentOrb

Three.js WebGL shader orb with perlin noise animation, audio-reactive states, and optional CSS glow effects. All colors use semantic design tokens so the orb adapts to any theme.

## Import

```tsx
import { AgentOrb, AgentOrbCanvas } from "@handled-ai/design-system"
```

## Peer Dependencies

The following are required only when using `AgentOrb` or `AgentOrbCanvas`:

```
three
@react-three/fiber ^8
@react-three/drei ^9
```

## Usage

```tsx
<AgentOrb
  state="listening"
  showGlow={true}
  className="w-[260px] h-[260px]"
/>
```

### Manual volume control

```tsx
<AgentOrb
  state="talking"
  volumeMode="manual"
  manualInput={0.5}
  manualOutput={0.7}
/>
```

### Raw canvas (advanced)

```tsx
<AgentOrbCanvas
  colors={["#982F6A", "#be185d"]}
  agentState="listening"
  className="w-full h-full"
/>
```

## AgentOrb Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `null \| "thinking" \| "listening" \| "talking"` | `null` | Controls animation behavior and glow effects. |
| `colors` | `[string, string]` | Computed from `--primary` | Gradient color pair for the shader. |
| `volumeMode` | `"auto" \| "manual"` | `"auto"` | `auto` generates procedural volume; `manual` uses provided values. |
| `manualInput` | `number` | `0` | Input volume (0–1), used when `volumeMode="manual"`. |
| `manualOutput` | `number` | `0` | Output volume (0–1), used when `volumeMode="manual"`. |
| `inputVolumeRef` | `RefObject<number>` | — | Ref-based input volume (alternative to `manualInput`). |
| `outputVolumeRef` | `RefObject<number>` | — | Ref-based output volume. |
| `getInputVolume` | `() => number` | — | Callback-based input volume. |
| `getOutputVolume` | `() => number` | — | Callback-based output volume. |
| `seed` | `number` | random | Deterministic seed for the noise pattern. |
| `showGlow` | `boolean` | `true` | Show/hide the CSS glow wrapper. |
| `className` | `string` | — | Additional CSS classes. |

## AgentOrbCanvas Props

Exposes the raw Three.js canvas without the glow wrapper. Accepts the same volume/color/state props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `resizeDebounce` | `number` | `100` | Debounce interval for canvas resize events. |

## Theming

By default, colors are resolved from the CSS `--primary` variable at mount time. The glow layers use `color-mix(in srgb, var(--primary) %, transparent)` for all gradient effects. Dark mode is auto-detected via the `.dark` class on `<html>`.
