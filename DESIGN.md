# DESIGN.md — Verdant (Plant Care)

Implementation guide for generating UI consistently. **Always reference tokens by name** (from `tokens.css` / `tokens.json`); never hard-code hex, px, rem, or ms. Where a rule says "must," treat it as non-negotiable for on-brand output. The Do/Don't list at the end is the final tie-breaker.

Reference implementation: `reservation.html` + `reservation.css` (Schedule / plant check-in screen).

---

## Brand Personality

Calm, natural, and gently premium — like a soft botanical magazine for people who love plants and good taste. Still friendly and cute (rounded Nunito, bubbly controls, flat illustration), but composed and unhurried rather than cartoon-loud.

Green anchors the palette; warm **clay**, **sky**, and **sunshine** accents appear only on small supporting elements (tags, badges, icons, illustration details) to keep the page cozy without becoming visually noisy.

Keywords: cozy · calm · natural · elegant · gentle · bubbly · plant-forward · approachable.

---

## Design Principles

1. **Green-first, accent sparingly.** A 10-step green scale drives surfaces, text, and primary actions. Use **clay**, **sky**, and **sunshine** only for tags, badges, category labels, icons, and illustration fills — never for large backgrounds or body copy blocks.
2. **Light, airy page canvas.** `bg-page` is a soft mint (`green-100`) with optional subtle radial gradient blobs (`green-50`, `neutral-50`) — not a saturated full-bleed green.
3. **Warm, cozy surfaces.** Cards, nav, and panels use `bg-surface` (`neutral-50`, a warm off-white) — not pure `white`. Reserve `white` for control hover/focus lift only.
4. **Flat and outlined.** No drop shadows (`shadow-card`, `shadow-float` = `none`). Depth comes from 2px borders (`border-width-hairline`) and color contrast, not elevation.
5. **Bubbly shapes.** Generous rounding on cards, inputs, callouts, and checkboxes (`radius-card`, `radius-md`). Buttons, badges, tags, and tabs use `radius-pill`.
6. **One friendly type family.** **Nunito** for everything — logo, hero display, headings, body, labels, and controls. No serif, no script. Slightly enlarged type scale and relaxed line heights for easy reading. Prefer **lighter weights** (500–600) over heavy bold — elegant, not childish.
7. **Botanical illustration.** Sidebar/planter art uses flat fills and soft outlines; stem, layered leaves, clay pot, sky water drops, and sunshine accents. Refined and natural, not overly cartoon.
8. **Calm through composition, not emptiness.** Rounded controls, pastel accents, and **composed spacing** — sections sit close enough to feel put-together, with breathing room between major blocks. Every interactive state still needs a clear non-color cue (icon, border, label).

---

## Color Tokens

### Primitives

**Green (10-step):** `green-50 #F0FAF2 · 100 #DDF3E4 · 200 #C2EBCF · 300 #9BDFAE · 400 #6BCB77 · 500 #52B85E · 600 #3FA04A · 700 #2E7D38 · 800 #1F5C28 · 900 #1A3D2E`

**Teal (legacy info):** `teal-500 #5BB5A2 · 700 #3D9484 · 900 #2A6B5E`

**Cozy accents (small UI only):**

| Name | Main | Background | Foreground |
|---|---|---|---|
| Clay | `#C9957A` | `#F5E6DC` | `#6B4F3F` |
| Sky | `#7AB8D4` | `#E3F4FA` | `#3D6578` |
| Sunshine | `#E8C96A` | `#FDF6DC` | `#6B5A2E` |

**Neutral:** `white #FFFFFF · neutral-50 #FAFCFA · 100 #E8EEE9 · 300 #C5D4C8 · 500 #7A9480 · 700 #3D5244 · 900 #243028 · black #1A241C`

### Semantic (use these in UI; never raw primitives)

| Token | = | Use |
|---|---|---|
| `bg-page` | green-100 | Outermost page background (+ optional soft radial gradients). |
| `bg-surface` | neutral-50 | Cards, nav, modals, editorial panels — warm off-white, not pure white. |
| `bg-surface-alt` | green-50 | Inset panels, input fills, tab track, hover tints. |
| `bg-inverse` | green-800 | Modal scrim base. |
| `fg-default` | green-900 | Body and heading text on light surfaces. |
| `fg-muted` | neutral-500 | Captions, placeholders, inactive nav links, kickers. |
| `fg-on-accent` | white | Text/icons on filled primary buttons and active pill tabs. |
| `fg-on-inverse` | green-50 | Body text on `bg-inverse`. |
| `accent` / `-hover` / `-active` | green-400 / 500 / 600 | Primary buttons, active states, brand highlights. |
| `accent-subtle` | green-200 | Selected slot/option backgrounds, subtle green badges. |
| `border-default` | green-200 | Card, input, and divider outlines. |
| `border-strong` | green-700 | Secondary button outlines, emphasis. |
| `border-accent` | green-500 | Focus/selected indicators. |
| `link` / `link-hover` | green-600 / 800 | Inline text links (underlined). |

### Status

| Token | = | Pairs with |
|---|---|---|
| `status-success` / `-bg` | green-500 / green-50 | check icon + text |
| `status-info` / `-bg` | teal-500 / `#E4F6F2` | info icon + text |
| `status-danger` / `-bg` | green-800 / green-50 | **warning icon (required)** + bold text |

### Accent badge & tag variants

Use on pills only — never stretch across full-width surfaces.

| Class suffix | Token basis | Typical meaning |
|---|---|---|
| `--clay` | clay / clay-bg / clay-fg | Warm, cozy, terracotta / indoor spots |
| `--sky` | sky / sky-bg / sky-fg | Water, hydration, low-light care |
| `--sunshine` | sunshine / sunshine-bg / sunshine-fg | Bright light, sunny spots, cheerful notes |

Legacy green/teal badge variants (`--subtle`, `--solid`, `--info-*`) remain available; prefer accent variants when semantics match.

**Color rules (must):**

- Hero decorative `display` text (e.g. "Schedule") uses **`green-800`** on the light page — never light `accent` green (insufficient contrast).
- Body text appears only on `bg-surface`, `bg-surface-alt`, or `bg-inverse`.
- Lead paragraphs may use `neutral-700` for softer contrast on `bg-page`.
- Every state (error, active, selected) combines color with a second cue: icon, text, shape, or border.
- Clay, sky, and sunshine are **accent sprinkles** — limit to badges, tags, icons, legend swatches, and illustration details.
- Interactive control hover/focus lifts to **`white`** (`--white`) for contrast against warm `bg-surface` and `bg-surface-alt` fills.

---

## Typography

**Family:** `font-ui` and `font-display` both resolve to **Nunito** (rounded, friendly sans). Load weights 400 / 500 / 600 / 700 — prefer 400–600 in practice; reserve 700 sparingly.

**Root scale:** `html` at **106.25%** (17px base). All sizes below are rem tokens.

**Sizes:** `xs .8125 · sm .9375 · base 1.0625 · md 1.25 · lg 1.5 · xl 1.875 · 2xl 2.375 · display-sm 2.75 · display-md 3.75 · display-lg 5.25`

**Line-height:** `tight 1.1 · snug 1.4 · normal 1.6 · relaxed 1.75`

**Tracking:** `tight -.01em · normal .01em · wide .02em · wider .04em` — small labels, captions, kickers, nav links, tabs, badges, and tags use `tracking-wide` or `tracking-wider`; never uppercase label styling.

### Roles

| Role | Size | Weight | LH | Tracking | Use |
|---|---|---|---|---|---|
| `kicker` | sm | 500 | snug | wider | Editorial overline above hero (e.g. "Plant care · by appointment"). `fg-muted`. |
| `display` | display-sm → display-md at `lg` | 500 | snug | normal | Large decorative hero word (e.g. "Schedule"). Color: **`green-800`**. Must repeat meaning in `h1`. |
| `h1` | 2xl | 600 | snug | tight | One per screen; functional page title. |
| `h2` | xl | 600 | snug | tight | Section / card headings. |
| `h3` | lg | 500 | snug | normal | Subsection headings. |
| `body-lg` | md | 400 | relaxed | normal | Lead paragraphs; may use `neutral-700`. |
| `body` | base | 400 | relaxed | normal | Default running text. |
| `body-sm` | sm | 400 | relaxed | normal | Secondary/dense text. |
| `label` | sm | 500 | snug | wide | Form labels — **sentence case**, not uppercase. Color: `neutral-700`. |
| `caption` | sm | 400 | relaxed | wide | Helper/meta text; `fg-muted`. Latin names, time periods, footer notes. |

**Type rules (must):** one `h1` per screen; never skip heading levels for styling; decorative `display` must not carry essential information absent from `h1`; max reading measure = `measure-max` (65ch).

---

## Spacing & Layout

**Step scale (rem):** `0:0 · 1:.25 · 2:.5 · 3:.75 · 4:1 · 5:1.5 · 6:2 · 7:3 · 8:4 · 9:6`. **Use only these steps.**

**Semantic:** `tile-gap 2 · card-padding 6 · card-margin 5 · section-gap 8 · grid-gutter 5 · page-margin-desktop 7 · page-margin-mobile 4`

**Control sizing (must):** interactive controls min height `control-md` (2.75rem / 44px). Padding `space-3` vertical × `space-5` horizontal.

### Layout system

- **Container:** centered, `max-width: container-max` (1200px).
- **Grid:** 12-column; `grid-gutter` (`space-5`) desktop, `space-3` below `md`.
- **Page header:** `padding-block space-4` top, `space-3` bottom. Tight stack: kicker → display → h1 → lead (`space-2`–`space-3` between elements).
- **Main layout gap:** `space-5` between hero and content grid; `space-4` below `md`. Page bottom padding: `space-6` (not full `section-gap`).
- **Form card sections:** divided sections use `space-5` top margin + padding with hairline border. Section head margin-bottom: `space-4`. Field spacing: `space-4`. Form footer divider: `space-5` margin-top, `space-4` padding-top.
- **Editorial aside gap:** `space-4` between sidebar blocks.
- **Breakpoints:** `sm 480 · md 768 · lg 1024 · xl 1280`.
- **Focal anchor:** hero `display` title + `h1` stack, or sidebar circular accent illustration + pull quote.

### Schedule screen layout (reference)

```
[ Nav — sticky bg-surface ]

[ Page header — kicker + display + h1 + body-lg lead ]

[ 12-col grid ]
  [ Main 7–8 cols ]          [ Aside 4–5 cols — sticky editorial ]
    [ Card — form ]            [ circle-accent illustration ]
      01 Your plant              [ pull-quote ]
      02 Visit details           [ editorial-card + list ]
      03 Care focus              [ callout--sky ]
      [ form-footer ]            [ banner--sunshine ]
```

---

## Radius

`none 0 · sm .875rem · md 1.375rem · card 2rem · pill 9999px · full 50%`

| Token | Use |
|---|---|
| `radius-card` | Cards, modals, toasts |
| `radius-md` | Inputs, selects, textareas, callouts, banners, inset panels, option/slot tiles, checkboxes, editorial cards |
| `radius-pill` | Buttons, badges, tags, nav links, tab list + active tab |
| `radius-full` | Icon buttons, close buttons, legend swatches, circular accents |

---

## Shadows & Borders

**Shadows:** flat system — all shadow tokens are `none` except **`shadow-focus-ring`** (`0 0 0 3px rgba(107, 203, 119, 0.45)`).

**Borders:** cartoon-style **2px** hairline (`border-width-hairline`) on cards and inputs; **3px** (`border-width-thick`) for emphasis/error/selected states, pull-quote accent edge, and emphasis dividers when needed.

---

## Components

Every interactive component must define all applicable states from the matrix below.

### Universal interaction-state matrix

| State | Treatment (must) |
|---|---|
| default | base tokens |
| hover | darken one accent step **or** `state-hover-overlay`; smooth `background-color` / `color` / `border-color` transition (`duration-fast`) |
| active/pressed | next accent step + `translateY(1px)` on buttons |
| focus-visible | `shadow-focus-ring` |
| selected/checked | `accent-subtle` fill + `border-accent` or accent border color |
| disabled | `state-disabled-bg` + `state-disabled-fg`, `cursor:not-allowed` |
| loading | spinner replaces label, dimensions locked |
| error | `status-danger` border + warning icon + message |

### Components

- **Buttons** — `radius-pill`. Variants: `primary` (fill `accent` → hover `accent-hover`), `secondary` (outline `border-strong`), `ghost` (text `accent`). Height `control-md`. Weight 500. Hover transitions on background, color, and border over `duration-fast`.
- **Inputs** — `bg-surface-alt`, `border-default`, `radius-md`, height `control-md`. Hover/focus: **`white`** surface + accent border. Focus: `border-accent` + ring. Error: thick danger border + warning icon.
- **Form controls** — checkbox `radius-md`; checked = `accent` fill + white check. Radio/slot/option tiles: `radius-md`, `tile-gap` spacing, selected = `accent-subtle` + accent border. Option tiles may include a `caption` detail line (e.g. Latin plant name).
- **Cards** — `bg-surface`, `radius-card`, **2px border** (no shadow), `card-padding`. Warm off-white fill — not pure white.
- **Navigation** — sticky `bg-surface`, 2px bottom border, `padding-block space-3`. Brand wordmark: Nunito **`text-xl` weight 600**, `green-800`. Links: pill-shaped, weight 500, `tracking-wide`; inactive `fg-muted`; active = filled `accent` pill with `fg-on-accent`.
- **Tabs** — pill track (`bg-surface-alt`, `radius-pill`); active tab = filled `accent` pill (not underline indicator). Weight 500, `tracking-wide`.
- **Badges & tags** — `radius-pill`, `text-sm`, weight 500, `tracking-wide`, sentence case. Prefer `--clay`, `--sky`, `--sunshine` when semantics match. Tags include a `tag__dot` swatch.
- **Form sections** — numbered editorial blocks (`form-section__num` + `h2` head). Dividers: hairline border + `space-5` separation. Numbers: `text-sm` weight 500, `tracking-wider`, `fg-muted`.
- **Callouts** — `radius-md`, compact padding (`space-3` × `space-4`). `callout--sky`: sky background + water-drop icon. `callout--info`: teal info (legacy).
- **Banners** — `radius-md`, compact padding. `banner--sunshine`: sunshine background + sun icon for bright/outdoor notes.
- **Pull quote** — `body-lg` weight 400, `green-800`, left border `border-width-thick` `green-300`. Editorial aside only.
- **Editorial card** — `bg-surface`, `radius-md`, 2px border, `space-4` padding. Contains `h3` + list with colored dot icons (`green-400`, `clay`, `sky`).
- **Circle accent** — `radius-full`, `bg-surface`, 2px border. Contains botanical SVG illustration.
- **Modals** — `radius-card`, 2px border, scrim `bg-inverse` ~35–50% opacity. Circular close button.
- **Toasts** — `radius-card`, 2px border, auto-dismiss + manual close.
- **Illustration** — flat filled SVG; classes `pot-clay`, `stem`, `leaf-green`, `leaf-sky`, `sunshine`, `sky-drop`, `ground` map to token colors.

---

## Motion

**Durations:** `instant 80 · fast 160 · base 240 · slow 400ms`

**Easings:** `standard`, `entrance`, `exit`, `organic` (slight overshoot for button hover lift only)

**Rules:** state changes use `fast`; honor `prefers-reduced-motion` (disable transforms, keep color/opacity fades).

---

## Accessibility

- **Contrast (must):** `fg-default` on `bg-surface` / `bg-surface-alt` passes AA. Hero `display` uses **`green-800`**, not light accent green. Text on `accent` fills uses `fg-on-accent` (white) at button/tab sizes.
- **Color independence (must):** pair hue with icon, text, shape, or border for every state; errors require a warning icon.
- **Focus (must):** `shadow-focus-ring` on every `:focus-visible`.
- **Targets (must):** minimum 44px (`control-md`).
- **Semantics:** one `h1` per screen; decorative `display` and illustration `aria-hidden`; section numbers decorative; modals trap and restore focus.

---

## Do / Don't

**Do**

- Reference every value by token name.
- Keep the page light and minty; build warm off-white (`neutral-50`) cards on soft green margins.
- Use Nunito everywhere at the enlarged scale with relaxed line heights and lighter weights (500–600).
- Add `tracking-wide` / `tracking-wider` on small labels, captions, kickers, and control text.
- Round corners generously — cards, inputs, and controls should feel bubbly.
- Stay flat: borders and color, not shadows.
- Sprinkle clay / sky / sunshine on badges, tags, icons, and illustration only.
- Use `green-800` for the large hero display title.
- Keep spacing composed — sections close enough to feel calm and put-together, not scattered.
- Combine color with icon/text/shape for every interactive state.
- Transition button and control colors smoothly on hover.
- Lift interactive controls to `white` on hover/focus against warm surfaces.

**Don't**

- Don't use serif, script, or heavy bold display type — friendly, not childish.
- Don't use uppercase label styling or tight paragraph leading.
- Don't fill large areas with clay, sky, or sunshine — green and neutral own the canvas.
- Don't use pure white (`#FFFFFF`) for card or nav backgrounds — use `bg-surface` (`neutral-50`).
- Don't use drop shadows or sharp zero-radius cards/inputs.
- Don't place light green accent text on the light page background (contrast failure).
- Don't rely on color alone to convey meaning.
- Don't invent spacing, size, or color values off the token scale.
- Don't leave large empty gaps between sections — prefer `space-4`–`space-5` rhythm over loose `section-gap` stacking.
