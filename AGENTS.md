# AGENTS.md

## Project preferences

- **Design goal:** clear and modern

## Universal links

[.well-known/apple-app-site-association](.well-known/apple-app-site-association)
is the server half of every app's universal links. When adding an app, add it to
**both** `applinks.details` and `webcredentials.apps` — keep the two lists
mirrored. Entries are ordered by URL slug.

App Store in-app event links follow `/<slug>/appstoreevent`. The slug matches the
app's *current* App Store name (not always its bundle ID), and no page is served
at that path — it exists only to route into the app.

Renamed apps keep their original URL slug so existing links and AASA entries stay
valid. **Palette Studio** is served from `/palette3d/` (bundle ID
`com.jaydenirwin.palette3d`); only the display name changed.

## Build

GitHub Pages builds this site with **Jekyll** so shared chrome is rendered
server-side — every nav link is in the HTML, crawlable and working without
JavaScript. There are no layouts, plugins or Markdown: each page is still a
complete, hand-editable HTML document.

Two rules:

1. Every page needs **empty front matter** (`---` / `---`) as its first two
   lines, or Jekyll copies it verbatim and the `{% include %}` tags render as
   literal text.
2. Shared chrome comes from `_includes/`; the app list comes from `_data/`.

Preview locally with `jekyll build` / `jekyll serve` (`_site/` is gitignored).
Do not re-add `.nojekyll` — it disables all of the above.

## Navigation

The floating nav is the **only** app switcher — there is no second row of app
icons inside the page. [_data/apps.yml](_data/apps.yml) is the single source of
truth for the app list. Each group has a `title` (nav label when there is room)
and a `short` label (used below 860px).

Includes:

- `{% include header.html %}` — floating liquid-glass nav plus the apps rows.
  On every page.
- `{% include footer.html %}` — on every page.
- `{% include apps-rows.html %}` — one apps row per category; used by
  `header.html`.

Every pill looks and behaves the same — the brand is a pill too, marked
`selected` on the home page. No disclosure arrows.

**Tabs are links.** Each category pill is a real `<a>` pointing at the group's
first app, so a tab is useful on its own and works without JavaScript. Contact
and the brand are the same kind of pill.

**The apps row** is a full-bleed band at the top edge: a translucent blurred
strip running edge to edge, with the apps centred inside it in columns of two
(`grid-auto-flow: column`, two rows) using the same app buttons as before. The
nav pill floats *over* the band, so the apps clear it by `--header-clearance`.
Rows slide in and out from the top edge (`transform: translateY(-100%)` → `0`);
a closed row sits above the band's top edge, so nothing needs clipping. Narrow
windows scroll the row horizontally rather than reflowing it.

**Only a row you opened is sticky.** Rows live *outside* the fixed header and are
`position: absolute` at the top of the document, so the page's own row scrolls
away with the banner behind it. `menu.js` adds `pinned` (`position: fixed`) to a
row it opens from the nav, so a hovered or focused row is an overlay that stays
at the top of the window; resting back on the page's own row drops the class.
A closing row keeps whichever it had — it is off screen once closed either way.

An app page opens its own row on load, so its hero clears it by
`--row-clearance` instead of `--header-clearance`. Every other page's first
section uses `--header-clearance`.

The row for the category the current page belongs to carries `current open` in
the HTML, so an app page shows its own apps row on load and leaving the nav
returns to that row rather than closing everything. Visitors still see one
category at a time, so the graphics apps are never presented alongside the
Minecraft data packs. App pages start with an `.app-hero`, which the row floats
over.

[global/menu.js](global/menu.js) is **behaviour only**: pointer devices drop a
row down on **hover**, keyboard users get it on **focus**, and Escape returns to
the page's own row. Without the script every tab and every app link still works.

Groups are by *audience*, not by app family: **Graphics Apps**,
**Everyday Apps**, **Fun Stuff**.

**Fun Stuff** also holds the non-Apple projects — the Minecraft data packs
(`/instagrow/`, `/letterbanners/`). Their pages follow the app-page template but
link to **Modrinth** instead of the App Store, and they get **no AASA entry**
(no universal links). Screenshots come from each repo's `Repo Assets` folder.

### Unreleased apps

`_data/apps.yml` lists **released apps only**. Unreleased apps get an AASA entry
(so universal links work during development and the moment they ship) but are
deliberately *not* linked from the nav — that is why
[.well-known/apple-app-site-association](.well-known/apple-app-site-association)
holds more apps than the site shows. When an app ships, add it to
`_data/apps.yml`.

If an unreleased app already has a page, keep it out of search: set
`noindex: true` in its front matter (the sitemap skips it) and add
`<meta name="robots" content="noindex">`. See `spriteparty/index.html`.

Currently unreleased: **Sprite Party** (its `/spriteparty/` page exists but is
unlinked and noindexed), Burger Tycoon, Game Tips, Incognito, Project Progress,
Time of Use, TV Party.

### Crawlability

[sitemap.xml](sitemap.xml) is generated by Liquid from whatever Jekyll builds —
no plugin, nothing to maintain — and is advertised in `robots.txt`. Every page
carries the shared header and footer so nothing is orphaned.

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
- `--glass-*` — liquid glass surfaces. Apply `.glass` for the translucent
  material (blur + saturation, specular edge, sheen); `--glass-panel-tint` is the
  more opaque variant used by the category menus. `--glass-hover` /
  `--glass-selected` are the nav pill states.
- `--shadow-sm/md/lg` — elevation (auto-adjusts for dark mode).
- `--content-width`, `--section-space`, `--radius-sm/lg`, `--ease` — layout rhythm.
- `--header-height` / `--header-clearance` — the floating nav's size and the room
  content needs to clear it.
- `--badge-height` — store badge size (48px, 44px compact).
- `--app-color` — the app's own accent, used by its hero `.tagline`.
- `--stage-art` — the artwork or gradient lighting a `.stage.art` (absolute URLs
  only).

The nav **floats over the content**: page backgrounds run to the top of the
window, and the first section pads itself down by `--header-clearance` (or
`--row-clearance` for an `.app-hero`). There is no spacer element.

## Page structure

Pages are built from a small set of shared components in `global/style.css` —
reach for these before writing anything page-specific:

- `.stage` — a dark section lit from behind by the colour wheel. Pair it with
  `.dark-theme` so headings and links take their dark values. Used for the home
  hero, every app hero and the closing call to action.
- `.stage.art` — same section, lit by the page's own artwork instead. The page
  sets `--stage-art`, which may be a `url()` **or** a gradient. The URL must be
  **absolute** (`url("/spritepencil/banner.png")`): a custom property's relative
  URL resolves against `global/style.css`, not the page's own `page.css`.
- `.split` / `.split.reverse` — the alternating two-column feature block
  (`.copy` on one side, a device on the other), collapsing to one column.
- `.phone` — a screenshot sitting in `/phone.png`'s cutout; `.phone.landscape`
  uses `/phone_landscape.png`. `.bleed` runs it off the bottom of a `.clipped`
  section.
- `.card` / `.card-grid` — the app lineup and an app's supported features
  (`.card.compact`).
- `.eyebrow`, `.section-title`, `.group-title`, `.lead` — the type rhythm.
- `.app-hero` — an app page's opening section: icon, name, `.tagline` (coloured
  by the page's `--app-color`), `.summary`, `.button-row` and `.tag`.

The home page's lineup is generated from `_data/apps.yml`, so a new app appears
in the nav and in the lineup from the same entry. A group marked `home: false`
is kept out of the lineup but still shown in the nav — **Fun Stuff** is, so the
home page stays about the Apple apps.

Type is Inter (loaded via `@import` in `global/style.css`) with the SF Pro / system
stack as fallback. Headings use fluid `clamp()` sizing and negative letter-spacing.

## Download buttons

Every app page's download link is the **official store badge**, not a styled
pill: `global/app-store-badge.svg` for the App Store,
`global/modrinth-badge.webp` for the data packs. Markup is an `<a class="store-badge">`
wrapping the `<img>` — badge artwork is never recoloured or restyled, only scaled
to `--badge-height`. Sources live in `Raw Assets/` (excluded from the build).

Secondary links (GitHub, web app) are `.button large ghost` pills. Every button
is a **capsule** (`border-radius: 999px`) so the pills match the store badge
beside them. Badge and pills share the hero's `.button-row`, with the platform
list in a `.tag` paragraph underneath. The closing `.stage` repeats the badge on
its own.

A page whose art is a wide marketing render rather than a device screenshot
skips the hero's `.split` and uses `.centered` instead — the render runs
**full-bleed** in its own section below, never boxed in a card. See
`spaceui/`.
