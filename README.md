# Joseph Speciality Hospital — Website

A complete, production-ready hospital website for **Joseph Speciality Hospital**, Srivilliputhur, Tamil Nadu.

> **Compassionate Care. Trusted Healthcare. Excellence Every Day.**

---

## Tech Stack

| Layer       | Technology                                    |
| ----------- | --------------------------------------------- |
| Frontend    | React 18, TypeScript, Vite                    |
| Styling     | Tailwind CSS (custom medical design system)   |
| Animation   | Framer Motion                                 |
| Forms       | React Hook Form                               |
| Charts      | Recharts (admin dashboard)                    |
| Icons       | Lucide React                                  |
| Routing     | React Router v6                               |
| Backend     | Supabase (PostgreSQL database + Auth)         |

> **Note on the stack:** The original request specified Node/Express + MongoDB.
> This environment runs a Vite frontend with Supabase pre-provisioned, so the
> backend is implemented with Supabase (PostgreSQL + Auth) instead. The data
> model, REST-style access, and admin authentication are fully functional.
> The schema and RLS policies are in the Supabase migration applied at setup.

---

## Features

### Public Website
- **Home** — hero, about, animated stat counters, why-choose-us, services overview, featured doctors, testimonials carousel, facilities grid, health tips, FAQ, newsletter, emergency banner
- **About** — overview, mission/vision, core values, history timeline, trust differentiators, infrastructure
- **Departments** — all 16 departments as interactive cards
- **Doctors** — searchable/filterable doctor cards (loaded from Supabase)
- **Services** — full service catalogue with facilities
- **Appointment Booking** — validated form with department→doctor cascading dropdown, date picker, success confirmation (saves to Supabase)
- **Gallery** — filterable masonry layout with lightbox
- **Testimonials** — star-rated patient reviews with rating summary
- **Blog** — article listing + single-article view (loaded from Supabase)
- **Contact** — Google Maps embed, contact form, emergency section, social links

### UX Features
- Sticky navigation with top contact bar
- Dark mode toggle (persisted)
- Scroll-to-top button
- Emergency floating button + WhatsApp floating button
- Smooth scrolling and subtle Framer Motion animations
- Fully responsive (mobile-first)
- SEO-optimised HTML with Open Graph tags

### Admin Dashboard (`/admin`)
- JWT-based authentication (Supabase Auth)
- Dashboard overview with Recharts analytics
- Appointments management (view, approve, reschedule, cancel, delete)
- Doctors management (add, edit, delete)
- Blog management (create, edit, publish/unpublish, delete)
- Messages inbox (read, reply, delete)
- Hospital information & settings editor
- Responsive sidebar navigation

---

## Project Structure

```
src/
├── components/
│   ├── home/          # Home page sections
│   ├── layout/        # Header, Footer, FloatingButtons, etc.
│   └── ui/            # Reusable Button, SectionHeading, FAQ, etc.
├── pages/             # Public pages
├── admin/             # Admin dashboard (login, overview, CRUD pages)
├── data/              # Static data (departments, services, testimonials...)
├── hooks/             # Custom hooks (useTheme, useCountUp, useInView)
└── utils/             # Supabase client + constants
```

---

## Getting Started

The dev server runs automatically in this environment. To run locally:

```bash
npm install
npm run dev
```

### Admin Access

1. Create an admin user in Supabase (Auth → Users → Add user with email + password).
2. Visit `/admin/login` and sign in.

---

## Replacing Placeholder Content

All editable content lives in clear locations:

| Content              | Where to update                                        |
| -------------------- | ------------------------------------------------------- |
| Hospital name, phone, address, hours, social links | `src/utils/constants.ts` → `HOSPITAL`     |
| Navigation links     | `src/utils/constants.ts` → `NAV_LINKS`                  |
| Department info      | `src/data/departments.ts`                               |
| Services             | `src/data/services.ts`                                  |
| Facilities           | `src/data/facilities.ts`                                |
| Testimonials         | `src/data/testimonials.ts`                              |
| Gallery images       | `src/data/gallery.ts`                                   |
| Health tips & FAQs   | `src/data/content.ts`                                   |
| Doctors              | Admin dashboard → Doctors (or Supabase `doctors` table) |
| Blog articles        | Admin dashboard → Blog (or Supabase `blog_posts` table) |
| Google Maps embed    | `src/utils/constants.ts` → `HOSPITAL.mapEmbed`          |
| WhatsApp number      | `src/utils/constants.ts` → `HOSPITAL.whatsapp`          |
| Images               | Replace Pexels URLs with real hospital photos           |

### Images
All images use Pexels stock photos as placeholders. Replace the URLs in the
data files and Supabase records with your own hospital photos (hosted on your
CDN, Supabase Storage, or any image host).

---

## Database Schema (Supabase / PostgreSQL)

| Table                      | Purpose                                    |
| -------------------------- | ------------------------------------------ |
| `doctors`                  | Doctor profiles shown on the website       |
| `appointments`             | Appointment booking requests               |
| `contact_messages`         | Contact form submissions                   |
| `blog_posts`               | Health blog articles                       |
| `newsletter_subscriptions` | Newsletter email signups                   |

All tables have Row Level Security enabled:
- Public reads and form submissions allow the `anon` role (no login needed).
- Admin operations require `authenticated` (admin sign-in).

---

## Build

```bash
npm run build      # production build → dist/
npm run typecheck  # TypeScript type checking
npm run lint       # ESLint
```

---

## Deployment

This is a static Vite app — deploy the `dist/` folder to any static host:

- **Vercel / Netlify:** connect the repo, build command `npm run build`, output `dist`.
- **Any static host:** upload `dist/` contents.

The Supabase backend is already provisioned and the env vars are configured.
For a custom deployment, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
in your hosting environment.
