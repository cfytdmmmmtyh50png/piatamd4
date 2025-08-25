# Piata.md — Avito pentru Moldova (MVP)

Full‑stack Next.js + Prisma + Tailwind proiect care copiază funcționalul de bază Avito:
- Publicare anunțuri cu titlu, descriere, preț, categorie, locație
- Listă, filtrare, căutare full‑text
- Pagină detalii produs cu imagini
- Favorite (salvare)
- Autentificare cu credențiale (MVP: demo user pentru acțiuni)
- Locații și categorii pentru Moldova (seed)

## Cum rulezi local

1. **Instalează Node 18+** și pnpm sau npm.
2. Clonează/Descarcă acest folder.
3. Copiază `.env.example` -> `.env`.
4. Instalează dependențele:
   ```bash
   npm i
   ```
5. Inițializează DB (SQLite local) și seed:
   ```bash
   npx prisma db push
   npm run db:seed
   ```
6. Pornește dev serverul:
   ```bash
   npm run dev
   ```
7. Deschide `http://localhost:3000`.

## Ce urmează (pentru paritate cu Avito)

- Conturi reale + NextAuth (email OTP, Google/Apple)
- Upload poze (UploadThing/S3)
- Chat în timp real (WebSocket / Pusher)
- Promovare plătită (Stripe) — urgent/top/highlight
- Moderare anunțuri, rapoarte, blocări
- Recenzii vânzători, rating
- Atribute dinamice per categorie (marcă/model, km, camere etc.)
- Hărți și distanță, filtrare pe raioane/sectoare
- Admin panel (role-based)
- SMS/Telefon verificat
- Programare vizionări, livrare, escrow opțional

## Structură

- `src/app` — rute App Router
- `src/lib` — prisma, auth
- `prisma/schema.prisma` — modele DB
- `prisma/seed.ts` — categorii & locații MD

> Notă: în MVP, uploadul de imagini e omis. Poți pune linkuri externe (ex. utfs.io) manual în DB sau extinde cu un provider.
