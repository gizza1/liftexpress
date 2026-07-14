# Lift Express sh.p.k — Website PRD

## Original Problem Statement
Build a highly detailed, professional 3-page website for "Lift Express sh.p.k" (elevator service, Pristina). Use the official PNG logo. Include 3D-style animations: on load show an elevator; on scroll the elevator doors open to reveal the site. White background, black text, brick-red accent from logo. Animations & transitions are critical. Bilingual (Albanian + English).

Business info: Rruga Ali Kelmendi, Prishtinë 10000 · +383 43 901 313 · Open · Closes 5 PM · Areas: Pristina · Slogan: "Mirëmbajtje, shitje dhe servisim te ashensorëve".

## Architecture
- Frontend: React 19 + react-router-dom, framer-motion, lenis (smooth scroll), Tailwind. No backend usage (static marketing site).
- Fonts: Cabinet Grotesk (display) + Satoshi (body) via Fontshare.
- Logo served from /frontend/public/liftexpress.png.

## User Personas
- Building managers / property owners in Pristina needing maintenance, sales or emergency repair.

## Core Requirements (static)
- 3 pages: Ballina (Home), Shërbimet (Services), Rreth Nesh + Kontakti (About+Contact).
- Signature elevator-door scroll reveal on Home.
- Bilingual AL/EN toggle. Brick-red (#A5262B) accent, white bg, black text.

## Implemented (2026-07-14)
- Home: ElevatorStage door reveal, kinetic hero, stats band, services summary, editorial marquee, numbered manifesto, CTA band.
- Services: 3 detailed alternating service blocks (Maintenance/Sales/Servicing) with bullets, process steps, CTA.
- About+Contact: story, values grid, contact rows (phone/address/hours/area), directions, embedded Google map.
- Global: sticky animated navbar, mobile menu, AL/EN language context, footer, page transitions, Lenis smooth scroll.
- Verified via screenshots on Home/Services/About (desktop).

## Backlog
- P1: Real contact form with email (Resend) if user later wants inbound leads.
- P2: Project/reference gallery, client logos, testimonials once reviews exist.
- P2: SEO metadata per route + sitemap.

## Next Tasks
- Await user feedback; refine copy/images as needed.
