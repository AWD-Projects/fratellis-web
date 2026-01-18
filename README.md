# Fratelli's Helados - Next.js Luxury Catering Site

A bespoke, mobile-first website for Fratelli's Helados focused on premium catering with an elegant food truck experience.

## Features

- Luxury, minimal aesthetic aligned with the Fratelli's color palette
- App Router (Next.js 14) with static generation for SEO
- Semantic HTML5 and accessible UI patterns
- Optimized images with `next/image`
- Contact form with SendGrid integration
- Structured data (JSON-LD) for discoverability

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- SendGrid

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local`:
   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   SENDGRID_FROM_EMAIL=fratellisheladeria16@gmail.com
   CONTACT_EMAIL=fratellisheladeria16@gmail.com
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Project Structure

```
fratellishelados-next/
├── app/
│   ├── api/contact/         # SendGrid API route
│   ├── layout.tsx           # Global layout & metadata
│   ├── page.tsx             # Single-page experience
│   └── globals.css          # Theme tokens & global styles
├── components/
│   ├── layout/
│   │   ├── site-footer.tsx  # Minimal footer
│   │   └── site-header.tsx  # Sticky navigation
│   └── sections/
│       ├── about-section.tsx
│       ├── catering-section.tsx
│       ├── contact-section.tsx
│       ├── flavors-section.tsx
│       ├── gallery-section.tsx
│       ├── hero-section.tsx
│       ├── testimonials-section.tsx
│       └── truck-section.tsx
├── lib/
│   ├── content.ts           # Content data
│   ├── theme.ts             # Design tokens
│   └── utils.ts             # Helpers
├── types/
│   └── contact.ts           # Types
└── public/images/            # Photos and brand assets
```

## Design Tokens

- Primary: `#B4945C`
- Secondary: `#B5BBC2`
- Text: `#333333`
- Background: `#FFFFFF`
- Muted: `#F1F2EF`
- Accent: `#664E4C`

Typography
- Brand font: Manrope

Tokens live in `lib/theme.ts` and are surfaced in `tailwind.config.ts` and `app/globals.css`.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Deployment

Optimized for Vercel. Add environment variables in the dashboard and deploy.

## Content Notes

All copy is written in Spanish and emphasizes:
- Food truck catering for premium events
- Artisanal ice cream and soda fountain offerings
- Trust signals: over a decade of experience, curated menus, professional service

## License

© 2026 Fratelli's Helados

## Content Draft (ES + EN)

Hero
- ES: "Helados artesanales para eventos inolvidables."
- EN: "Artisanal ice cream for unforgettable events."

Value proposition
- ES: "Food truck premium con helado artesanal y sodas italianas en CDMX."
- EN: "A premium food truck serving artisanal ice cream and Italian sodas in Mexico City."

Catering
- ES: "Un servicio diseñado para eventos con estilo."
- EN: "A service designed for events with style."

Flavors
- ES: "Sabores clásicos y de temporada curados para sorprender."
- EN: "Classic and seasonal flavors curated to surprise."

Food truck
- ES: "Un punto focal elegante que eleva la atmósfera."
- EN: "An elegant focal point that elevates the atmosphere."

Contact CTA
- ES: "Reserva tu evento."
- EN: "Book your event."
# fratellis-web
