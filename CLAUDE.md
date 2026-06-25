# CLAUDE.md

## Project preferences

- **Keep the source code simple.** We want retain the ability to hand-edit the
  HTML/CSS files directly.
- **Design goal:** clear and modern

## Brand

- **Logo:** a glossy droplet/blob filled with the full color wheel — the whole
  visible color spectrum, with a small tail/bias toward red.
- **Brand color:** the identity is the *color wheel*, biased toward red. So the
  primary accent is red (`--accent-color: #ff2d46`), but the full rainbow shows
  up as a signature gradient for hero/identity moments.

## Design system

All shared styling lives in [global/style.css](global/style.css); per-page
overrides go in each page's `page.css`. Use the CSS variables there rather than
hardcoding values:

- `--accent-color` / `--accent-text-color` — brand red (links, buttons, focus).
  `--accent-text-color` is a lighter red in dark mode for legibility.
- `--spectrum` / `--spectrum-conic` — the rainbow gradient (color-wheel
  identity). Utilities: `.spectrum-text` (gradient text) and `.spectrum-bar`
  (thin rainbow divider, used as an `<hr>`).
- `--shadow-sm/md/lg` — elevation (auto-adjusts for dark mode).
- `--content-width`, `--section-space`, `--radius-sm/lg`, `--ease` — layout rhythm.

Type is Inter (loaded via `@import` in `global/style.css`) with the SF Pro / system
stack as fallback. Headings use fluid `clamp()` sizing and negative letter-spacing.
