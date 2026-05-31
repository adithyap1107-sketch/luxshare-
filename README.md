# 5 Gird Sun Frontend Template

An immersive exhibition archive template with a custom shader hero, editorial manifesto with side video, animated exhibition index, click-through exhibition detail pages, cinematic pavilion videos, and a minimal museum-style footer.

## Features

- Procedural shader hero with stylized horizon, sun, and grid landscape
- Hero navigation and large centered title block
- Typewriter manifesto with optional side video
- Current exhibitions section with hover image reveal and click-through titles
- Exhibition detail pages with left image and right editorial article layout
- Cinematic pavilion video section
- Minimal footer with visit and connect blocks

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v3
- GSAP
- Custom WebGL shader

## Quick Start

1. Install dependencies: `npm install`
2. Edit `src/config.ts`
3. Add images to `public/images/`
4. Add videos to `public/videos/`
5. Run the dev server: `npm run dev`
6. Build for production: `npm run build`

## Configuration

All editable content lives in `src/config.ts`. Do not modify the shader or interaction logic unless you are fixing a real bug.

### `siteConfig`

```ts
export const siteConfig = {
  language: "",         // Language code, e.g. "en", "fr", "zh-CN"
  siteTitle: "",        // Browser tab title
  siteDescription: "",  // Meta description
}
```

### `navigationConfig`

```ts
export const navigationConfig = {
  brandName: "",        // Top-left brand text in the hero nav
  links: [
    // { label: "", href: "#exhibitions" }
  ],
}
```

### `heroConfig`

```ts
export const heroConfig = {
  titleLines: [],       // 1-3 title lines
  subtitle: "",         // Small uppercase subtitle below the title
}
```

### `manifestoConfig`

```ts
export const manifestoConfig = {
  headingText: "",      // Typed heading on the left
  bodyText: "",         // Typed body paragraph
  videoPath: "",        // Right-side video path, e.g. "videos/manifesto.mp4"
}
```

### `exhibitionsConfig`

```ts
export const exhibitionsConfig = {
  sectionLabel: "",     // Label above the exhibitions list
  countLabel: "",       // Small count text on the right
  detailBackText: "",   // Back button text on detail pages
  items: [
    {
      slug: "",         // Unique URL-safe slug
      title: "",        // Exhibition title
      image: "",        // Path like "images/exhibit-01.jpg"
      year: "",         // Year string
      eyebrow: "",      // Small label above detail page title
      intro: "",        // Intro paragraph for the detail page
      sections: [
        // { heading: "", body: "" }
      ],
    },
  ],
}
```

### `pavilionsConfig`

```ts
export const pavilionsConfig = {
  sectionLabel: "",     // Section label
  videos: [
    {
      src: "",          // Path like "videos/pavilion-01.mp4"
      caption: "",      // Caption under the video
    },
  ],
}
```

### `footerConfig`

```ts
export const footerConfig = {
  visitLabel: "",       // Left column heading
  visitLines: [],       // Address lines
  connectLabel: "",     // Right column heading
  connectLinks: [
    // { label: "", href: "" }
  ],
  brandName: "",        // Large footer wordmark
  rightsText: "",       // Bottom-left footer text
  coordinatesText: "",  // Bottom-right footer text
}
```

## Required Images

Place all images in `public/images/`.

### Exhibitions

- One image per exhibition item in `exhibitionsConfig.items`
- Recommended aspect ratio: 4:5 or similar portrait composition
- Minimum recommended size: 1200px on the short edge

## Required Videos

Place all videos in `public/videos/`.

### Manifesto

- Optional video used by `manifestoConfig.videoPath`
- Recommended aspect ratio: 16:9

### Pavilions

- One or more videos used by `pavilionsConfig.videos`
- Recommended aspect ratio: 16:9

## Design

**Colors**

- Hero shader uses a fixed dark cinematic palette defined in `VoidShader.tsx`
- Primary page background: white
- Tertiary video section background: light neutral gray

**Fonts**

- Display: `Playfair Display`
- Sans: `Inter`
- Mono: `Space Mono`

**Motion**

- Hero entrance fade and rise
- Typewriter manifesto text
- Hover image reveal in exhibition list
- Click-through detail pages powered by the same exhibition data

## Notes

- Empty config values hide the corresponding section or element
- `exhibitionsConfig.items` powers both the list view and the detail pages
- Each exhibition `slug` must be unique
- Detail pages use a pathname-based client-side route, so static hosting should support SPA fallback to `index.html`
