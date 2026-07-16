# GreenBe NGO Website

A responsive, blog-first NGO website for **GreenBe — Your partner in clean living**.

## Included

- Professional green-and-white visual system
- Mobile-first responsive navigation and layouts
- Home page with programme highlights
- Elaborated About page based on the supplied GreenBe brief
- Hardcoded blog listing and individual blog routes
- Interactive educational carbon-footprint calculator
- GreenBe sustainability app product page
- Lucide icons throughout; no emoji UI

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Main routes

- `/` — Home
- `/about` — About GreenBe
- `/blogs` — Blog index
- `/blogs/:slug` — Individual article
- `/calculator` — Carbon calculator
- `/greenbe-app` — Product vision

## Calculator note

The calculator is intentionally educational, not a certified carbon inventory. Electricity uses the Indian grid weighted-average factor of 0.710 kg CO2/kWh for FY 2024-25. Other lifestyle factors are simplified averages and should be replaced with a reviewed India-specific methodology before public production use.

## Images

The prototype references Unsplash-hosted images. For production, download approved photographs, optimise them to WebP/AVIF, add photographer credits and serve them through your own CDN or `/public` folder.
