# Fold — Restaurant Website Template

A three-file restaurant landing page. No build step, no dependencies beyond a Google Fonts load. Drop the folder on any static host and it works.

```
index.html   structure
styles.css   all styling
main.js      nav, tabs, scroll reveals, forms
```

**Demo concept:** Fold, a pizza & natural wine restaurant in French. All copy, prices, and images are placeholder — swap them out for your client.

---

## Sections

| # | Section | What's there |
|---|---------|-------------|
| — | Nav | Fixed, blurs on scroll, collapses to hamburger on mobile |
| — | Hero | Full-viewport with animated entrance |
| 01 | Notre Histoire | Two-column layout, stats row, full-width image |
| 02 | Notre Carte | Tabbed menu (Pizzas, Entrées, Vin Nature, Desserts) |
| 03 | La Table | Asymmetric 5-image photo grid with hover captions |
| 04 | Agenda | Event list with scroll-shift hover effect |
| 05 | Réservations | Contact details + reservation form |
| — | Newsletter | Email signup strip |
| — | Footer | Logo, nav links, copyright |

---

## Customizing for a client

### 1. Replace placeholder images

Search for `picsum.photos` — there are 6 image tags. Swap each `src` with a real photo URL or a local path.

### 2. Update copy and contact details

Global find-and-replace targets:

| Placeholder | Replace with |
|-------------|-------------|
| `Fold` / `FOLD` | Restaurant name |
| `147 rue du Marché, Le Quartier` | Real address |
| `(555) 019-2847` | Real phone number |
| `bonjour@foldpizza.fr` | Real email |
| `© 2024 Restaurant Fold` | Correct year and name |

Hours appear in two places: the hero bar and the reservations section.

### 3. Wire up the forms

Forms submit to [Formspree](https://formspree.io) (free tier covers most small restaurants).

1. Create a free Formspree account
2. Create two forms — one for reservations, one for the newsletter
3. Paste the form IDs at the top of `main.js`:

```js
const RESERVATION_FORM_ID = 'YOUR_RESERVATION_FORM_ID';
const NEWSLETTER_FORM_ID  = 'YOUR_NEWSLETTER_FORM_ID';
```

### 4. Language

The UI is in French. To switch to English (or any other language), update the `lang` attribute on `<html>` and translate the visible copy. There are no i18n libraries — it's plain text.

---

## Tech notes

- **No framework, no build.** Pure HTML, CSS, and vanilla JS across three files.
- **Fonts:** EB Garamond via Google Fonts (loaded in `<head>`). Requires an internet connection on first load; cache handles repeat visits.
- **Color system:** CSS custom properties with `oklch()`. Edit the `:root` block at the top of `styles.css` to retheme.
- **Animations:** Hero entrance uses CSS `@keyframes riseIn`. Scroll-triggered sections use `IntersectionObserver` with a `.reveal` / `.visible` class pattern in `main.js`.
- **Responsive breakpoints:** `900px` (tablet) and `768px` (mobile). Mobile nav replaces the link bar with a full-screen overlay menu.

---

## Deploying

Any static host works. Quickest options:

```bash
# Netlify drag-and-drop
# → netlify.com/drop — drag the folder into the browser

# Vercel CLI
vercel

# GitHub Pages
# Push to a repo, enable Pages from Settings → Pages → main branch / root
```
