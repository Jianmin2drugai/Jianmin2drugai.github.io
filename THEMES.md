# Site themes

Set `site_theme` in `_config.yml` to `default`, `air`, `sunrise`, `mint`,
`dirt`, or `contrast`, then rebuild the site. For example:

```yaml
site_theme: "mint"
```

The navigation's light/dark button follows the system preference initially
and remembers an explicit selection in the browser. It also works with the
keyboard and when browser storage is unavailable.

Theme palettes and shared styles are adapted from Academic Pages
(commit 3d28cd27d0551b3d9dd8132f207538355fbbc7cc), under the repository's MIT license.
The existing content, custom card layout, icon fonts, image lightbox,
and sticky sidebar are retained. Custom card colors use the shared theme
variables in `assets/css/custom.css`.

After editing navigation JavaScript, run `npm install` and `npm run build:js`
to regenerate `assets/js/main.min.js`. The small `theme-mode.js` script loads
in the head so the saved color mode applies before the page is painted.

Validation: run `node tests/theme-mode.cjs` and `bundle exec jekyll build --safe`.
The emoji plugin uses GitHub Pages' supported `jemoji`; the older `jekyll-emoji`
converter incorrectly retained `.md` output extensions in local builds.
