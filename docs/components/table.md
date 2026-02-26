# Table
> Semantic table components with consistent styling for headers, rows, and cells.
## Import
```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@handled-ai/design-system"
```
## Props
All components accept `className` and spread `React.ComponentProps` of their underlying HTML elements (`table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`).

Prop | Type | Default | Description
className | string | — | Additional Tailwind classes
...props | HTML element props | — | Standard attributes for each element

Client-only: Yes (`"use client"`).

## Variants (if applicable)
N/A
## Basic Usage
```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@handled-ai/design-system"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice</TableCell>
      <TableCell>alice@example.com</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```
## Examples
### With Footer
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Item</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell className="text-right">{item.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell className="text-right">{total}</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```
### With Caption
```tsx
<Table>
  <TableCaption>Monthly revenue by region</TableCaption>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```
## Peer Dependencies
None beyond base peer dependencies.
## Internal Dependencies
- `cn` utility from `lib/utils`
## Source
`registry/new-york/ui/table.tsx`
