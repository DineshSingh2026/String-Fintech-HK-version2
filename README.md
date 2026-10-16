# String FinTech HK Ltd. — Corporate Website

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

| Path | Purpose |
| --- | --- |
| `lib/content.ts` | **All site copy**: services, delivery-model nodes, SEO titles/meta, contact details |
| `app/page.tsx` | Home |
| `app/services/page.tsx` | Services overview |
| `app/services/[slug]/page.tsx` | Template for the 5 service pages (statically generated) |
| `app/about`, `app/contact` | About Us, Contact Us |
| `app/api/enquiry/route.ts` | Contact form endpoint |
| `components/DeliveryDiagram.tsx` | Interactive Service Delivery Model diagram |
| `components/NetworkCanvas.tsx` | Animated hero node network |
| `app/globals.css` | Design tokens (colours, fonts, grid lines, flow animations) |

## Contact form

Copy `.env.example` to `.env.local` and set either the Resend keys or a webhook URL.
Until one is configured, the form validates input and then offers the visitor a
pre-filled email to info@stringfintech.com, so no enquiry is silently lost.

## Brand colour and accessibility

`#F44E04` is used for icons, lines, eyebrows on dark backgrounds and focus rings.
White text on `#F44E04` is only 3.5:1 contrast, so filled buttons use `#D04000`
and small orange text on white uses `#C23C00`. Both meet WCAG AA (4.5:1).

## Logo

`public/string-fintech-logo.png` is the supplied 223×55 PNG. For crisp rendering on
high-DPI screens, replace it with an SVG or a 3× PNG of the same proportions.
