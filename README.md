# Fallen Horizons — Hackathon 2026

A plain HTML, CSS, and JavaScript website. No framework, installation, or build step is required.

## Run the website

1. Extract the ZIP completely.
2. Open `index.html` in your browser.
3. Keep the three code files and the `assets` folder together.

## Project files

- `index.html`: page content, navigation, sections, partner links, and FAQ.
- `style.css`: colors, typography, layouts, responsive rules, and animations.
- `script.js`: registration links, mobile menu, loading intro, and scroll progress.
- `assets/`: original event and partner logos.

## Make changes

- Edit text and section content in `index.html`.
- Change theme colors in the `:root` block near the top of `style.css`.
- Change `REGISTRATION_URL` and `COMMUNITY_URL` at the top of `script.js`.
- Change `INTRO_DURATION_MS` in `script.js` to adjust the intro length.
- Replace logos in `assets/`, keeping their filenames or updating the HTML paths.

The CSS retains the original order of later theme overrides so the existing design is preserved. Section comments help locate the relevant rules. Mobile rules appear in `@media` blocks.

The introduction is a timed visual effect, not actual download progress. Visitors can skip it, press Escape, or use their device's reduced-motion preference to bypass it.

Google Fonts requires an internet connection; local fallback fonts are included in the stylesheet. Registration, community, and partner links also require internet access.
