# Design System

Source of truth: Figma file "Alan Portfolio — Product Design & Frontend", canvas "Foundations" (node 263:33). The tokens live in `app/globals.css`. Use the tokens. Do not hardcode values.

## Rules for agents

- Use semantic tokens in components (`bg-surface`, `text-foreground`). Never reference primitives (`--neutral-*`, `--blue-*`) directly.
- Use only the type roles listed below. Do not invent sizes. Emphasis is a weight or color change, not a new style.
- Spacing comes from the 4px scale only. Never use a custom gap.
- Radius has two values only: `rounded-card` for rounded rectangles, `rounded-pill` for fully rounded shapes.
- Every interactive element gets the `ring` focus ring (2px). Never remove it.
- Check every text and interactive fill against WCAG 2.1 (see Accessibility).

## Color

This is a single dark theme. There is no light mode.

### Tier 1 — Primitives

Raw values. Never used directly in components.

| Token | Hex |
| --- | --- |
| `neutral-950` | `#0D0D10` |
| `neutral-900` | `#1A1A1E` |
| `neutral-850` | `#232328` |
| `neutral-800` | `#2B2B30` |
| `neutral-600` | `#66666E` |
| `neutral-400` | `#A6A6AE` |
| `neutral-050` | `#F2F2F3` |
| `blue-900` | `#1E3A8A` |
| `blue-600` | `#3B5BDB` |
| `blue-500` | `#4A6FD1` |

### Tier 2 — Semantic

Use these in components.

| Token | Maps to | Use for |
| --- | --- | --- |
| `background` | neutral-950 | Page base layer. Not for cards or raised surfaces. |
| `surface` | neutral-900 | Cards, chat response area, input fields. One level above background. |
| `surface-hover` | neutral-850 | Hover state for cards and list rows. |
| `border` | neutral-800 | Dividers and component outlines. Not for text. |
| `input` | neutral-600 | Boundary of form fields (the chat input). Reaches 3:1 against background. |
| `ring` | neutral-050 | Keyboard focus ring on every interactive element. |
| `foreground` | neutral-050 | Default text. Headings and primary body copy. |
| `muted-foreground` | neutral-400 | Captions, placeholders, metadata, inactive labels. |
| `accent` | blue-600 | Primary actions: send button, active chip, active state. |
| `accent-hover` | blue-500 | Hover and pressed state for accent elements. |
| `accent-deep` | blue-900 | Decorative only: large background tints, logo marks. Fails 3:1 UI contrast. Never on buttons, chips, or other interactive elements. |
| `accent-foreground` | neutral-050 | Text and icons on top of an accent-filled surface. |

Tailwind utilities: `bg-background`, `bg-surface`, `bg-surface-hover`, `border-border`, `border-input`, `ring-ring`, `text-foreground`, `text-muted-foreground`, `bg-accent`, `bg-accent-hover`, `bg-accent-deep`, `text-accent-foreground`.

### Brand gradient

`bg-brand-gradient` is the decorative page background. It runs from `accent-deep` (80%, mixed with `background`) to `background` at 60%. Keep it on large background layers only. The `accent` and `accent-hover` tones are too bright for text: `muted-foreground` drops to 4.28:1 on pure `accent-deep`, and `foreground` drops to 4.24:1 on `accent-hover`. The 80% mix keeps `muted-foreground` at 5.03:1 or higher.

## Typography

Three families. Seven roles. Each role sets size, line height and weight together.

| Role | Family | Weight | Size / Line height | Use for |
| --- | --- | --- | --- | --- |
| Title | Space Grotesk | 700 | 32px / 38px (118%) | The one headline on a screen: hero text, project name. Never resize per screen. |
| Heading | Space Grotesk | 500 | 18px / 25px (140%) | Names inside a component: card titles, section names. |
| Subtitle | Inter | 400 | 18px / 25px (140%) | One-line description under a Title. |
| Body | Inter | 400 | 16px / 24px (150%) | Paragraphs, chat answers, chip labels. |
| Caption | Inter | 400 | 13px / 19px (145%) | Secondary text: metadata, card subtext, muted detail. |
| Label | Inter | 500 | 12px / 16px (130%) | Eyebrows and micro-labels. Always uppercase, always this size. |
| Mono | IBM Plex Mono | 400 | 13px / 17px (130%) | Technical text: stack tags, metrics, code references. |

Tailwind utilities: `text-title`, `text-heading`, `text-subtitle`, `text-body`, `text-caption`, `text-label`, `text-mono`. Families: `font-display`, `font-sans`, `font-mono`.

## Spacing

4px base. Allowed steps:

| Step | Value |
| --- | --- |
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 8 | 32px |
| 11 | 44px |
| 12 | 48px |
| 16 | 64px |

Use with Tailwind's spacing utilities (`p-4` = 16px, `gap-6` = 24px). Do not use values outside this scale.

## Radius

| Token | Value | Use for |
| --- | --- | --- |
| `card` | 12px | Any rectangular surface: cards, inputs, chat response area, project thumbnails. |
| `pill` | 999px | Buttons, chips, the send icon. Anything fully rounded. |

Tailwind utilities: `rounded-card`, `rounded-pill`.

## Accessibility

Checked against WCAG 2.1. Text needs 4.5:1 (normal) or 3:1 (large/bold). Interactive fills need 3:1 against their background.

| Pairing | Ratio | Result |
| --- | --- | --- |
| foreground on background | 17.35:1 | Pass |
| foreground on surface | 15.51:1 | Pass |
| muted-foreground on background | 8.03:1 | Pass |
| muted-foreground on surface | 7.18:1 | Pass |
| accent-foreground on accent | 5.07:1 | Pass |
| accent on background (UI fill) | 3.42:1 | Pass |
| accent-deep on background (UI fill) | 1.87:1 | Fail. Decorative only. |

## Source

- Tokens: `app/globals.css`
- Figma: https://www.figma.com/design/E4Ja49UXQP4NmYHCCcpjyO/Alan-Portfolio-%E2%80%94-Product-Design---Frontend?node-id=263-33
