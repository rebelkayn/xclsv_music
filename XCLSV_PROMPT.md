# XCLSV — Premium Custom Music Marketplace

Build "XCLSV" — a premium custom music marketplace where collectors commission bespoke songs from elite artists ($10k–$100k). Dark-themed, modern music aesthetic, with a secure deposit-based transaction flow and DRM-protected streaming-only delivery.

---

## Stack

- **Next.js 14+ (App Router)** with TypeScript
- **Tailwind CSS** with a single `theme.ts` config as the design system source of truth
- **Framer Motion** for subtle, premium animations
- **Stripe** for split payments (50% deposit + 50% balance)
- **Server-side audio streaming** — no client-side URLs exposed

---

## Design System (`theme.ts`)

| Token        | Value                              |
| ------------ | ---------------------------------- |
| Background   | `#0A0A0A`                          |
| Surface 1    | `#141414`                          |
| Surface 2    | `#1A1A1A`                          |
| Surface 3    | `#222222`                          |
| Accent       | Gold gradient `#C6A55C` → `#E8D5A3`|
| Text Primary | `#F5F5F5`                          |
| Text Secondary | `#999999`                        |
| Font Body    | Inter                              |
| Font Display | Playfair Display                   |

All spacing, radius, shadow, and color values as tokens — no magic numbers, no hardcoded colors anywhere in components.

---

## User Flow (5 States)

The entire platform revolves around a **5-state order lifecycle**. Architect all UI and API logic around these states.

### State 1: Browse (Landing Page)

Single-scroll landing page with 4 sections:

1. **Hero** — full-viewport, ambient waveform or vinyl-texture background (CSS/SVG, no heavy assets). Bold tagline (5–7 words), one-sentence subline on exclusivity, single CTA: "Browse Artists" → smooth scroll to roster.
2. **Artist Roster Grid** — responsive card grid (1 col mobile, 2 tablet, 3 desktop). Each `ArtistCard`: artist image, name, genre tag, 1–2 sentence pitch, formatted price (`$XX,XXX`), "Commission" CTA. All data-driven from a single `artists.ts` constants file. Hover: card lift + gold border glow.
3. **How It Works** — 3-step horizontal layout: Select → Brief → Receive. Reusable `StepCard` component, data-driven from array.
4. **Footer** — minimal: logo, tagline, placeholder links, © 2026 XCLSV.

Clicking "Commission" on any artist → opens commission flow at `/commission/[artistSlug]`.

### State 2: Commission & Deposit

Route: `/commission/[artistSlug]`

- **Artist summary** at top (photo, name, genre, total price)
- **Brief form**:
  - Collector's name (text input)
  - Email (email input)
  - Song description / vision (textarea, 500 char max)
  - Occasion (dropdown: Celebration, Tribute, Personal, Gift, Other)
- **Price breakdown panel**:
  - Total: $XX,XXX
  - Deposit now (50%): $XX,XXX
  - Balance on delivery: $XX,XXX
- **Terms checkbox** (required): _"I agree to the [Terms & Conditions] — all sales are final, songs are streaming-only and may not be downloaded, recorded, or redistributed."_
- **"Pay Deposit" button** — disabled until terms checked and all fields valid
- Stripe Checkout / Stripe Elements for payment
- On success → redirect to `/orders/[orderId]` with status `DEPOSITED`

### State 3: In Progress (Artist Working)

Route: `/orders/[orderId]`

- Status page: "Your song is being crafted"
- Displays: artist info, brief submitted, deposit amount paid, estimated delivery date (7 days from deposit)
- Countdown or delivery date
- Status badge progression: `Deposited → In Progress → Delivered`

### State 4: Delivered — Preview Only (Balance Unpaid)

- Artist uploads completed song via admin/artist portal
- Collector receives email notification + updated order page
- **30-second preview player**: waveform visualization, play/pause, progress bar — audio cuts at 30s with fade-out
- Preview is a **separate, server-generated truncated file** — NOT the full file with client-side time limits (client-side limits can be bypassed)
- Prominent CTA: _"Pay remaining $XX,XXX to unlock your full song"_
- **"Pay Balance" button** → Stripe for remaining 50%
- Terms reminder: _"Streaming only. No downloads."_

### State 5: Unlocked — Full Stream

- Full song player: waveform visualization, play/pause, scrubbing, elapsed/total time
- **Streaming-only, fully protected** (see Content Protection below)
- Order page shows: "Owned — Stream Anytime", artist info, original brief, delivery date
- Re-playable forever from their authenticated account

---

## Content Protection Architecture (Critical)

### Server-Side Streaming Endpoint (`/api/stream/[orderId]`)

This is the core security layer. Everything else is defense in depth.

1. **Auth-gated**: verify session → verify user owns this order → verify payment status. If balance unpaid, serve preview file only. If paid, serve full track.
2. **Signed, expiring URLs**: generate short-lived tokens (5-min TTL) per playback session. Token validated server-side on every chunk request. No permanent audio URLs exist on the client.
3. **Chunked streaming**: use HTTP Range requests (`206 Partial Content`) to stream audio in chunks. Never serve the full file in one response.
4. **No direct storage URLs**: audio files live in private cloud storage (S3 with no public access). The API route fetches from storage and pipes to the client. The client never sees `s3.amazonaws.com/...` or any storage origin.
5. **Response headers**:
   ```
   Cache-Control: no-store, no-cache, must-revalidate
   Content-Type: audio/mpeg
   X-Content-Type-Options: nosniff
   Content-Disposition: inline
   ```
   Never use `attachment`. Never expose a downloadable content disposition.
6. **Preview file is physically separate**: on artist upload, the server generates a 30-second truncated copy with fade-out. This is the only file served before balance payment. Even if intercepted, the attacker only gets 30 seconds.

### Client-Side Protections (Defense in Depth)

These deter casual piracy. The server-side controls are the real protection layer.

- **Web Audio API player** — custom `<AudioPlayer>` component, NOT a native `<audio>` tag (native tags expose `src` and allow right-click → Save As)
- Audio loaded via `fetch()` with auth headers → decoded via `AudioContext.decodeAudioData()` → played via `AudioBufferSourceNode`
- **No `src`, `href`, or `blob:` URLs** in the DOM pointing to audio
- **Disable right-click** on player area (`onContextMenu={e => e.preventDefault()}`)
- **MediaSource Extensions** as alternative for longer tracks to avoid holding full decoded buffer in memory

### Rate Limiting & Abuse Prevention

- Rate-limit `/api/stream` — max 10 requests per minute per user
- Log all stream access (userId, orderId, timestamp, IP)
- Flag anomalous patterns (rapid repeated full-track streams)

---

## Architecture Rules

- **Zero duplication**: every repeated UI pattern is a component
- **Single data source**: artist data, steps, site copy all in `/lib/constants.ts`
- **Type everything**: `Artist`, `Order`, `OrderStatus`, `CommissionBrief`, `StreamToken` in `/types/index.ts`
- **One `Button` component** with variants (`primary | secondary | ghost`) via props — not separate components
- **One `SectionWrapper`** component handling max-width, padding, optional title/subtitle
- **One `AudioPlayer` component** accepting `mode: 'preview' | 'full'` and `orderId` — internally handles auth, token refresh, and streaming
- **Order state machine**: `DEPOSITED → IN_PROGRESS → DELIVERED → UNLOCKED` — model as a TypeScript union type, render UI conditionally based on state
- **API routes handle all sensitive logic**: payment verification, stream authorization, token generation. Never trust the client for authorization decisions
- **Mobile-first responsive**: Tailwind mobile-first, no breakpoint hacks

---

## File Structure

```
/app
  layout.tsx                            ← global fonts, metadata, dark bg
  page.tsx                              ← composes Hero, ArtistGrid, HowItWorks, Footer
  /commission/[artistSlug]/page.tsx     ← brief form + deposit payment
  /orders/[orderId]/page.tsx            ← order status + audio player
  /api
    /stream/[orderId]/route.ts          ← auth-gated streaming endpoint
    /webhooks/stripe/route.ts           ← Stripe payment confirmations
    /orders/route.ts                    ← create/update orders

/components
  Hero.tsx
  ArtistCard.tsx
  ArtistGrid.tsx
  HowItWorks.tsx
  StepCard.tsx
  Footer.tsx
  Button.tsx
  SectionWrapper.tsx
  CommissionForm.tsx
  PriceBreakdown.tsx
  TermsCheckbox.tsx
  OrderStatus.tsx
  AudioPlayer.tsx                       ← single player, handles preview + full mode
  WaveformVisualizer.tsx

/lib
  constants.ts                          ← artists array, steps array, all site copy
  theme.ts                              ← design tokens (colors, spacing, fonts)
  stripe.ts                             ← Stripe client init + payment helpers
  auth.ts                               ← session/token verification
  storage.ts                            ← private file storage abstraction (S3/GCS)
  stream.ts                             ← signed URL generation, token validation

/types
  index.ts                              ← Artist, Order, OrderStatus, CommissionBrief, StreamToken
```

---

## Artist Seed Data (6 Artists)

Include in `/lib/constants.ts`. Mix of genres, prices range $15k–$95k. Each entry:

| Field     | Description                                    |
| --------- | ---------------------------------------------- |
| `name`    | Artist name                                    |
| `slug`    | URL-safe identifier                            |
| `genre`   | Genre tag (Hip-Hop, R&B, Classical, Electronic, Singer-Songwriter, Jazz) |
| `tagline` | 1–2 sentences — aspirational, not generic      |
| `price`   | Number ($15,000–$95,000)                       |
| `image`   | Placeholder image path                         |

Copy should feel like you're hiring a genius, not booking a gig. These are legends crafting one-of-one masterpieces.

---

## Copy Direction

- **Headline**: bold, 5–7 words — exclusivity and artistry
- **Subline**: one sentence, the value prop
- **Artist cards**: 1–2 sentences that make the collector feel they're accessing something rare
- **How It Works**: "Select Your Artist → Submit Your Vision → Receive Your Masterpiece"
- **Tone**: private gallery, not a marketplace. Quiet confidence, not hype.

---

## Quality Bar

- Lighthouse 95+
- Accessible: semantic HTML, WCAG contrast ratios, keyboard nav, ARIA labels on all interactive elements
- No `any` types
- No `eslint-disable`
- No inline styles
- All payment logic server-verified — never trust client state for authorization
- Real copy everywhere — no lorem ipsum
