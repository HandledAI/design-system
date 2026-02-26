# Textarea
> Styled multi-line text input with focus ring and aria-invalid support.
## Import
```tsx
import { Textarea } from "@handled-ai/design-system"
```
## Props
Prop | Type | Default | Description
className | string | — | Additional Tailwind classes
...props | React.ComponentProps&lt;"textarea"&gt; | — | All native textarea props (value, onChange, placeholder, disabled, rows, maxLength, etc.)

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import { Textarea } from "@handled-ai/design-system"

<Textarea placeholder="Enter description..." />
```
## Examples
### Controlled with Label
```tsx
import { Textarea, Label } from "@handled-ai/design-system"

<div className="space-y-2">
  <Label htmlFor="notes">Notes</Label>
  <Textarea
    id="notes"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    placeholder="Add notes..."
    rows={4}
  />
</div>
```
### With aria-invalid
```tsx
<Textarea
  aria-invalid={!!error}
  placeholder="Required field"
  className={error ? "border-destructive" : ""}
/>
```
## Peer Dependencies
None
## Internal Dependencies
cn (lib/utils)
## Source
`registry/new-york/ui/textarea.tsx`
