# GreenBe Website — Brand Refresh

This is the updated **React + Vite + Tailwind** frontend for GreenBe. The official logo is preserved, and the website's old forest-green UI has been replaced with the blue/lime color language found in that logo.

## Official brand colors

- **Primary blue:** `#0090E9` — primary buttons, highlights, links, key visuals
- **Fresh lime:** `#70E11F` — accent shapes, indicators, callouts on dark backgrounds
- **Deep navy:** `#081C36` — headings, dark sections, high-contrast backgrounds
- **Light blue:** `#F2F9FF` — background surfaces
- **White:** `#FFFFFF` — primary page surfaces

The shared colors live in `tailwind.config.js` (`brand.50`…`brand.950`, `lime`, `cream`). They update the homepage, navigation, inner pages, calculator, app preview and admin interface consistently. The `brand-*` utility name replaces the legacy `forest-*` classes.

## What's changed

- New bright, responsive homepage with a cleaner hero layout and purposeful information hierarchy
- White navigation bar with visible official GreenBe logo and active-link treatment
- New blue/lime design tokens, buttons, cards, backgrounds, spacing and typography
- Reworked footer with brand identity and real navigation links
- Reusable inner-page hero pattern for About, Stories, App and Calculator
- Updated app screen preview using the real logo, clearly identified as a concept
- Admin layout and login updated to use the official logo and same color system
- Existing routes, blog API, calculator logic and admin/content functionality retained
- App icon generated from the symbol in the original logo
- Reduced-motion support and improved focus indicators

All demo visuals in the app preview and calculator marketing tile are illustrative. No actual user activity metrics or test results are represented as real production data.

## Install / run

Requirements: Node.js 18+ and npm.

```bash
cd GreenBe-Website/frontend
npm install
npm run dev
```

Build for deployment:

```bash
npm run build
npm run preview
```

If you use the backend API, copy `.env.example` to `.env` and configure the correct backend URL (`VITE_API_BASE_URL`). Your existing `.env` can be retained; it is **not** included here. The backend and database are unchanged.

## Testing notes

- All 25 source JS/JSX files were parsed successfully with Babel.
- All 44 relative JS/JSX imports resolve.
- Tailwind CSS compilation completed successfully.
- A full Vite production build could not be verified in the editing environment because the original uploaded `node_modules` contained native **Windows** packages rather than Linux binaries and internet package installation was unavailable. Running `npm install` on your development machine will install the proper platform binaries.

## Files intentionally excluded

`node_modules/`, `dist/`, `.git/`, secret `.env`, backend source, database contents, local virtual environments, and archived ZIP duplicates. This package is **frontend only** to prevent unnecessary changes to your backend or data.
