# Copilot Instructions for `turizm-acente-php`

## Architecture
- This repo is split into a PHP backend in `backend/` and a Next.js 16 frontend in `frontend/`.
- Frontend pages live in the App Router under `frontend/src/app/`; most interactive pages are client components because they rely on `window`, `localStorage`, or direct fetches.
- The backend is a plain PHP + MySQL API. Data lives in `tours`, `tour_translations`, `tour_images`, `languages`, `settings`, and `translations`.
- Public API routes are under `backend/api/public/`; admin routes are under `backend/api/admin/`.

## Data flow
- Use `frontend/src/lib/api.ts` for backend URLs: `API_BASE_URL` for admin endpoints and `PUBLIC_API_BASE_URL` for public endpoints.
- Image URLs are stored as relative paths like `uploads/...`; frontend renders them by prefixing `BACKEND_BASE_URL`.
- Language state is centralized in `frontend/src/context/LanguageContext.tsx`; it loads active languages from `languages.php` and translations from `translations.php`, then persists `app_lang` in `localStorage`.
- Language codes are lowercase in React state (`tr`, `en`, `ru`, `de`, `ar`, `es`) but must be uppercased in PHP queries (`TR`, `EN`, ...).

## Frontend conventions
- Prefer `fetchApi()` for admin CRUD requests; use plain `fetch()` for public endpoints when the code already does so.
- Keep new UI in the same style: large inline styles, `lucide-react` icons, and `btn`/`container` utility classes already used across pages.
- Route names are Turkish and map directly to folders: `/turlar`, `/turlar/detay`, `/arama`, `/iletisim`, `/hakkimizda`, `/admin/*`.
- Detail pages use query params, e.g. `/turlar/detay?id=123` and `/turlar?start=YYYY-MM-DD&end=YYYY-MM-DD`.

## Backend conventions
- PHP endpoints always return JSON and usually set permissive CORS headers; keep new endpoints consistent with that contract.
- Tour endpoints join `tours` with `tour_translations` and optionally attach `tour_images`; preserve that shape because the frontend expects `title`, `description`, `images`, `start_date`, `end_date`, `price`, and `quota`.
- Admin tour creation/update is split across `/api/admin/tours.php` and `/api/admin/upload_image.php`; uploads are limited to 8 images and only accept `jpg`, `jpeg`, `png`, `webp`, `gif`.
- Admin auth is intentionally lightweight: `frontend/src/app/admin/layout.tsx` only checks `localStorage.getItem("admin_token")`, and `backend/api/admin/login.php` returns a simple token string.

## Workflow
- Frontend commands are `npm run dev`, `npm run build`, and `npm run lint` from `frontend/`.
- For database work, review both `backend/database_schema.sql` and `backend/setup.sql`; they are similar but not identical, so avoid assuming one is the source of truth.
- If you change API shapes, update the matching frontend consumers in `frontend/src/app/page.tsx`, `frontend/src/app/turlar/*`, `frontend/src/app/admin/*`, or `frontend/src/components/*`.

## Useful references
- `frontend/src/app/layout.tsx` for global providers and page chrome.
- `frontend/src/components/Header.tsx` and `frontend/src/components/Footer.tsx` for shared navigation and legal modal patterns.
- `frontend/src/app/admin/layout.tsx` for the admin shell and redirect behavior.
- `backend/api/public/tours.php` and `backend/api/admin/tours.php` for the canonical tour payloads.