# CSS audit — astrodaily-site

## Summary
Audited `src/styles.css`, `src/widgets.css`, `src/badges.css`, `src/languages.css`, `public/legal.css` against the rendered markup in `src/App.jsx` and the three static pages (`public/{privacy,terms,support}/index.html`). **1 P1, 5 P2, 7 P3.** The three things that actually matter: (1) the static legal/support header has no mobile collapse and is estimated to overflow horizontally at 390 px, producing a scrollbar the React app does not have; (2) `badges.css` silently overrides the header's `z-index:20` down to `1`, which risks the mobile nav dropdown painting behind `<main>`; (3) `styles.css` and `legal.css` have drifted, so the same header/footer/legal-card components render in different fonts, different golds, and a serif vs sans H1 depending on which page you land on. No confirmed always-on layout animation, no `will-change`, no invalid values. The React app's own mobile handling is largely well done. All contrast ratios and overflow widths below are **estimates**, not measured.

## Findings

### [P1] Static legal/support header likely overflows horizontally at 390 px
- File: `public/legal.css:2` (`.site-header`, `.site-nav`), `public/terms/index.html:8` (inline `<style>`), also `public/privacy/index.html:8`, `public/support/index.html:8`
- Problem: `.site-header{...display:flex;...justify-content:space-between}` and `.site-nav{display:flex;align-items:center;gap:8px}` have **no `flex-wrap`, no mobile collapse, and no hamburger**. The only concession is the inline `<style>` in each HTML page shrinking nav links to `font-size:12px;padding:8px 7px` (`.cta` to `padding:9px 10px`) under 800 px. Neither `body` nor `.site` sets `overflow:hidden`, so any overflow becomes a horizontal scrollbar.
- Consequence: On the Terms page at 390 px the header must fit the brand (38 px logo + gap + "AstroDaily" ≈ 130 px) **plus four** nav items (Home / Privacy / Support / "Get the app"). Estimated natural widths at 12 px type sum to roughly 260–270 px for the nav alone → ~390–400 px total against ~354 px of available width (390 − 2×18 px padding). **Estimate** (character-width math, not observed): the header overflows by ~30–50 px, giving the static pages a horizontal scrollbar on small phones that the React app (which collapses to a `.menu-button`) does not have.
- Suggested fix: Give the static pages the same mobile pattern as the app — hide `.site-nav` behind a toggle under ~800 px, or at minimum add `flex-wrap:wrap` / allow the nav to shrink. Alternatively add `overflow-x:hidden` on `.site` as a stopgap (masks, doesn't fix).

### [P2] `badges.css` cancels the header's `z-index:20`, risking the mobile nav dropdown sitting behind `<main>`
- File: `src/badges.css:13-18` (the `z-index:1` declaration is on line 17) overriding `src/styles.css:3` (`.site-header{...position:relative;z-index:20}`)
- Problem: `main.jsx` imports `styles.css` then `badges.css` (lines 4–5), so on equal specificity the later file wins. `badges.css` groups `.site-header,.app>main,.app>footer{position:relative;z-index:1}` (intended to lift content above the fixed `.animated-stars` canvas), but as a side effect it re-declares `.site-header`'s `z-index` from `20` to `1`.
- Consequence: The mobile dropdown `.site-header nav{position:absolute;top:65px;...}` (styles.css:4) lives inside the header's now-`z-index:1` stacking context; `.app>main` is also `z-index:1` and comes **later** in the DOM, so it paints on top. **Inferred, not observed:** the open nav menu can render beneath the hero content instead of above it.
- Suggested fix: Re-assert a higher `z-index` on `.site-header` in `badges.css` (or remove `.site-header` from that grouped rule so the `z-index:20` in `styles.css` stands).

### [P2] `styles.css` and `legal.css` have drifted — same components look different across pages
- File: `src/styles.css:2` (`:root`) and `:3`; `public/legal.css:1` (`:root`) and `:2`
- Problem: The two sheets style visually identical header/footer/`subpage`/`legal-card` components but no longer agree. Side-by-side:

  | Property | `src/styles.css` (React) | `public/legal.css` (static) |
  |---|---|---|
  | Body/display font | `"DM Sans"` (`:root`, line 2) | `Inter, ui-sans-serif, system-ui...` (line 2) |
  | `--gold` | `#f4c65b` | `#e7c46a` (paler) |
  | `--lav` | `#b9a7ff` | `#b4a0ff` |
  | `--muted` | `#aea7c3` | `#aaa3b8` |
  | `--line` | `rgba(190,171,255,.18)` | `rgba(193,177,235,.18)` |
  | `.subpage h1` | DM Sans (inherits), `max-width:700px` via shared `.hero h1,.subpage h1` rule | `font-family:Georgia,"Times New Roman",serif`, no `max-width` |
  | `.legal-card` / `.faq,.contact-card` background | solid `#121023` | `rgba(18,16,35,.95)` (semi-transparent over the cosmic bg) |
  | `.primary` padding | `15px 22px` | `12px 20px` |
  | Page background treatment | `.app` uses `background-blend-mode:multiply` (darker) | `.site` uses a `linear-gradient(...)` overlay |
- Consequence: A visitor clicking from the app's Privacy page to the static one (or vice versa) sees the H1 switch from sans to serif, every gold accent shift hue, cards gain/lose transparency, and buttons change size — the site reads as two half-matched designs.
- Suggested fix: Pick one sheet as the source of truth for the shared tokens (`--gold`, `--lav`, fonts) and the shared component rules, and have the other import/alias them; in particular reconcile the `.subpage h1` serif/sans split.

### [P2] Footer copyright text fails WCAG AA contrast (both sheets)
- File: `src/styles.css:3` and `public/legal.css:2` — `footer>p{...color:#615a6e;font-size:11px}`
- Problem: `#615a6e` on the `#080713` page background. **Estimated** contrast ratio ≈ 3.0:1 (not computed with a tool); AA requires 4.5:1 for normal text, and this is 11 px.
- Consequence: The "© 2026 AstroDaily…" line is genuinely hard to read for low-vision visitors on every page, app and static alike.
- Suggested fix: Lighten to roughly `#8a8398` or brighter (aim ≥ 4.5:1). Nearby offenders worth fixing in the same pass (all **estimates**): `.subpage-hero>span`/`time` `#6e677d` (≈3.5:1) and `.shot-tabs button b` `#665b80` (≈3.4:1).

### [P2] `.showcase-caption` is positioned outside its container and gets clipped between ~800 px and ~1250 px viewports
- File: `src/styles.css:3` — `.showcase-caption{position:absolute;right:-35px;bottom:35px;width:210px;...}`; the `right:10px` correction only applies under 800 px (`src/styles.css:4`)
- Problem: The caption hangs 35 px past the right edge of `.showcase`. `.showcase` is the right column of `.experience` (max-width 1168 px, centered). Between the 800 px breakpoint (where the two-column grid is still active) and roughly a 1250 px viewport, the caption's outer edge lands past the viewport's right edge.
- Consequence: `.app{overflow:hidden}` prevents a scrollbar, but the caption card is **visually clipped** at the right edge in that window (no scrollbar, just a cut-off card). Inferred from geometry, not observed.
- Suggested fix: Keep the caption inside the container (`right:10px`–`right:20px`) at all sizes, or gate the `-35 px` offset behind a `min-width` media query where there is provably room.

### [P2] `background-attachment:fixed` on the full-page cosmic image (both sheets)
- File: `src/styles.css:3` (`.app{...background-attachment:fixed;...}`) and `public/legal.css:2` (`.site{...background-attachment:fixed}`)
- Problem: A large raster background re-attached on every scroll frame. This is a well-known cause of scroll jank / main-thread repaint on many Android browsers and desktops, and iOS Safari effectively ignores `fixed` (so the intended parallax is inconsistent across platforms anyway).
- Consequence: Heavier, less smooth scrolling on the exact devices (phones) this site targets; the effect also renders differently on iOS vs Android vs desktop.
- Suggested fix: Drop `background-attachment:fixed` (the `.animated-stars` canvas already provides the ambient motion), or move the image to a fixed-position pseudo-element/`<div>` that composites once.

### [P3] Dead `.store-row` rules in `styles.css` (superseded by `.store-badges`)
- File: `src/styles.css:3` (`.store-row`, `.store-row button`, `.store-row small`) and `:4` (`.store-row{justify-content:center;flex-wrap:wrap}` inside the 800 px block)
- Problem: The download section renders `.store-badges` (see `src/App.jsx:119`, styled by `src/badges.css:24-44`). No `.store-row` element exists in `App.jsx` or in any of the three static pages — checked all four markup sources.
- Consequence: None for visitors; ~4 unused rules of maintenance debt, including a now-meaningless media override.
- Suggested fix: Delete the `.store-row` rules.

### [P3] Dead form/`.success` rules in `legal.css` (static support page has no form)
- File: `public/legal.css:2` — `.contact-card form`, `.contact-card label`, `.contact-card input,.contact-card textarea`, `.contact-card textarea{resize:vertical}`, `.success`, `.success p`, `.success b`
- Problem: `public/support/index.html:13` replaced the contact form with a `mailto:` link (`<a class="primary">`) and a `.contact-note` paragraph — there is no `<form>`, `<input>`, `<textarea>`, or `.success` element on any static page. These rules style nothing. (The React app's own form is styled separately by `styles.css`.)
- Consequence: None for visitors; dead weight, and see the related `outline:none` note below.
- Suggested fix: Remove them from `legal.css`.

### [P3] `outline:none` on inputs — weak focus in the app, none at all in `legal.css`
- File: `src/styles.css:3` (`input,textarea{...outline:none}` + `input:focus,textarea:focus{border-color:var(--lav)}`); `public/legal.css:2` (`.contact-card input,.contact-card textarea{...outline:none}`)
- Problem: The app removes the outline and substitutes only a border-color change (`#39324d` → `#b9a7ff`) — a visible but thin focus indicator. `legal.css` removes the outline with **no replacement rule at all** (moot today only because its form rules are dead, per the previous finding — but it would bite if a form is re-added).
- Consequence: Keyboard users get a low-visibility (app) or absent (legal.css, potentially) focus ring on form fields.
- Suggested fix: Keep a real focus indicator — e.g. `outline:2px solid var(--lav);outline-offset:2px` on `:focus-visible`, or at least a stronger border + box-shadow.

### [P3] `scroll-behavior:smooth` is not gated by `prefers-reduced-motion`
- File: `src/styles.css:2` and `public/legal.css:2` — `html{scroll-behavior:smooth}`
- Problem: Smooth scrolling applies unconditionally, ignoring users who request reduced motion. (Credit where due: the one continuous animation, the `.animated-stars` canvas, *does* check `prefers-reduced-motion` in `src/App.jsx`, and there are no `@keyframes` in any sheet.)
- Consequence: Reduced-motion users still get animated anchor scrolling (e.g. "Get the app" → `#download`).
- Suggested fix: `@media (prefers-reduced-motion: reduce){ html{scroll-behavior:auto} }`.

### [P3] `backdrop-filter:blur(15px)` on the floating cards
- File: `src/styles.css:3` — `.float-card{...backdrop-filter:blur(15px);...}`
- Problem: Two small backdrop-blur cards over the hero. Small area and hidden under 430 px, so low impact, but backdrop blur forces an expensive per-frame composite while anything behind them moves (the stars canvas animates behind them on desktop).
- Consequence: Minor extra GPU/composite cost on the hero; negligible on mobile where they are `display:none`.
- Suggested fix: The cards already use a near-opaque `rgba(24,18,47,.92)` background — the blur is barely perceptible and could be dropped.

### [P3] Active screenshot tab is signalled by colour alone
- File: `src/styles.css:3` — `.shot-tabs button.active span{color:white}` and `.shot-tabs button.active b{color:var(--gold)}`
- Problem: The only difference between active and inactive tabs is text colour (`#827a94`/`#665b80` → white/gold). No underline, weight change, background, or `aria-selected`.
- Consequence: Colour-blind users (and anyone on a poor display) may not be able to tell which tab is active; assistive tech gets no state.
- Suggested fix: Add a non-colour cue (e.g. a gold top-border/underline or `font-weight` bump) and `aria-selected`/`role=tab` semantics.

### [P3] Several tap targets under the ~44 px guideline
- File: `src/styles.css:3` and `:4`; `public/legal.css:2`
- Problem: `.site-header nav button,.footer-links button{padding:10px 14px}` (≈36–40 px tall); `.menu-button{padding:12px}` with two 1-px bars (≈32 px tall, `styles.css:4`); `.legal-contact button{padding:0}` (a bare inline text button); static `.site-nav a{padding:10px 14px}`. **Estimates** of rendered height, not measured.
- Consequence: Thumb-sized targets on mobile are slightly fiddly; the hamburger and the "Contact support" inline button are the worst offenders.
- Suggested fix: Raise interactive heights to ≥44 px (padding or `min-height`), especially `.menu-button`.

## Checked and clean
- **Dead-selector sweep of `src/widgets.css` and `src/languages.css`:** every class (`.widgets`, `.widget-*`, `.energy-*`, `.languages`, `.language-*`) is rendered in `src/App.jsx`; nothing dead in either file.
- **Responsive collapses present where needed** (`src/styles.css:4-5`): `features-grid`/`experience`/`premium`/`download`/`support-layout` → single column under 800 px; `hero-actions` → `display:grid` and `.float-card` → `display:none` under 430 px; `legal-card article` → single column; `premium ul` → single column. `widgets.css` and `languages.css` collapse at 900 px and shrink phones at 560 px.
- **No `white-space:nowrap`, no long unbreakable strings, no `min-width` over 320 px** anywhere in the five sheets. `body{min-width:320px}` is the only `min-width`.
- **No `@keyframes` animations, no `transition` declarations, no `will-change`** in any stylesheet — so no always-on CSS animation of layout/paint properties. The only continuous motion is the JS canvas, which honours `prefers-reduced-motion` (`src/App.jsx`).
- **No invalid property values** and no vendor-prefix-without-standard-property cases found (only `-webkit-font-smoothing`, which is fine as an enhancement).
- `.meter-list` (62 px/1fr/42 px grid) and `.compatibility` (≈270 px total) fit comfortably within 390 px.
- The `badges.css` `.download>img` box-shadow override (`.28`→`.50` alpha) is a deliberate, working override, not an accident.

## Not checked
- **Nothing was rendered.** No browser was run, so actual computed styles, real overflow/scrollbar behaviour, and true tap-target/contrast values were **not observed** — every overflow width, contrast ratio, and rendered-height figure above is an estimate from the source.
- The P1 header-overflow width math uses approximate character widths for DM Sans/Inter at 12 px; real glyphs may fit or overflow slightly differently.
- Dead-CSS cross-check was limited to `src/App.jsx` and the three static `index.html` pages (per the brief). Any other consumer of `legal.css`, or markup injected at runtime by a future script, was not considered.
- The `dist/` build output and the stale root-level duplicate `App.jsx`/`badges.css`/`languages.css` were ignored as instructed (not audited).
- Asset weights (e.g. `cosmic-background.jpg`, the WhatsApp screenshot JPEGs) and font-loading/FOUT behaviour were not inspected — out of scope for a stylesheet audit but relevant to real-world performance.
