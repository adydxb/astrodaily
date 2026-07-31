# Design QA

- Source visual truth paths: `public/assets/WhatsApp Image 2026-07-11 at 11.01.48 AM.jpeg` through `…11.02.57 AM.jpeg`, plus `public/assets/astrodaily-logo.png`.
- Implementation: `http://localhost:4173/` (production build via `npx vite preview`).
- Intended viewports: desktop 1440 × 900 and mobile 390 × 844.
- Intended state: home page, default app-showcase selection.
- Primary interactions intended for testing: navigation, app screenshot selector, FAQ accordions, support form success state, and mobile menu.

## Verification method

Screenshot capture remained unavailable — the browser pane does not composite frames in this environment, so no pixel comparison against the source screenshots was possible. **The source-versus-render visual comparison is still outstanding.**

In its place, the layout claims that the previous iteration could only guess at were verified by **measuring computed geometry and computed styles in the live page** (`getBoundingClientRect`, `getComputedStyle`, `matchMedia`, `documentElement.scrollWidth`). That is stronger evidence than a screenshot for overflow, stacking, and contrast, and weaker for typography, spacing rhythm, and colour harmony. Both are recorded honestly below.

## Observed results

Routes — all served 200: `/`, `/privacy/`, `/terms/`, `/support/`.
Console — **zero** errors or warnings across all four routes. All asset requests 200/304.

| Check | Viewport | Result |
|---|---|---|
| Horizontal overflow, home | 390 × 844 | none (`scrollWidth` 390 = `innerWidth`) |
| Horizontal overflow, /privacy/, /terms/, /support/ | 390 × 844 | none |
| Terms header, 4 nav items | 390 × 844 | nav wraps to a 2nd row; header grows 72 → **79px**; nav fits inside header, not clipped |
| Header stacking vs content | 1440 × 900 | `.site-header` z-index **20**, `.app > main` z-index **1** — header correctly above |
| Header/footer nav anchors | 1440 × 900 | all 5 render `rgb(198,191,216)`, `text-decoration: none` — no default blue/underline |
| Showcase caption clipping | 1000 × 900 | fully visible, 50px clearance (previously clipped ~11px) |
| Showcase caption flourish | 1440 × 900 | `right: -35px` active, 134px clearance — design intent preserved |
| Menu button tap target | 390 × 844 | **47 × 44px** — meets the 44px guideline |
| Footer copyright contrast | all | `rgb(138,131,152)` = `#8a8398` → **5.50:1** on `#080713` (was 3.04:1, failed AA) |
| Effective-date line contrast | /privacy/ | `#8a8398` → 5.50:1 (was `#6e677d`, 3.71:1) |
| Static support page | 390 × 844 | no `<form>` present, 4 FAQ `<details>` — matches its stated no-web-form policy |

Note: `.hero-orbit` extends past the right viewport edge at 390px. This is the intentional decorative orbit, `aria-hidden`, clipped by `.app{overflow:hidden}` — not overflow, and it produces no scrollbar.

## Findings

- Resolved this pass: duplicate/contradictory legal + support content, invalid deploy workflow, header z-index override, reduced-motion canvas resize bug, three WCAG AA contrast failures, caption clipping, mobile header overflow, missing favicon and social card. See `AUDIT-CSS.md` for the stylesheet audit.

- [P2] Still open — **stylesheet drift between `src/styles.css` and `public/legal.css`.** The two sheets disagree on `--gold` (`#f4c65b` vs `#e7c46a`), `--lav`, `--muted`, `--line`, body font (DM Sans vs Inter), and `.subpage h1` (sans vs Georgia serif). A visitor moving between the app and the legal pages sees accents shift hue and the H1 switch family. Deliberately left alone — picking the winner is a design decision.

- [P2] Still open — **landing-page image weight, 4.2MB.** `astrodaily-logo.png` is 1254 × 1254 at 1.93MB but renders ~32px in the header; `download-logo.png` is 1042 × 1042 at 2.28MB. A lossless re-encode was tested and came out *larger*, so the weight is inherent to the dimensions, not to poor compression. Same-dimension WebP measures 168KB for the logo (−91%). Also affects `og:image`, which should be ~1200 × 630 rather than a 1.9MB square.

## Implementation checklist

- [x] Test all header/footer routes.
- [x] Test the mobile header at 390px on every static page.
- [x] Check console errors.
- [x] Verify stacking, contrast, overflow, and tap targets by computed style.
- [ ] Capture home at 1440 × 900 and 390 × 844 as images — **still blocked**, no compositing.
- [ ] Complete source-screenshot-versus-render comparison — **still blocked**, depends on the above.
- [ ] Test the five-state screenshot selector and FAQ expansion interactively.

## Comparison history

- Iteration 1: browser navigation to the local server returned a connection error; nothing could be captured or measured.
- Iteration 2 (this pass): production build served on `:4173`; all four routes reachable. Screenshots still unavailable, so verification moved to computed-geometry measurement. Twelve layout/contrast/stacking claims verified against the live DOM; two visual-design items deliberately left open above.

final result: verified by measurement; pixel comparison still blocked
