# Elite Moments with Brenda – Version 2

A fully functional luxury companion website (static site with real form persistence via Supabase).

## What’s new in V2

- **Working forms**: Booking and contact forms actually insert data into Supabase tables (with graceful fallback + toast notifications).
- **Clean, complete CSS**: Single self-contained `style.css` — no missing `responsive.css` / `animations.css`.
- **Fixed HTML**: No broken structure, consistent navigation, proper accessibility attributes.
- **Consistent branding & contact info** across every page.
- **Better UX**: Loading states on buttons, form validation, future-date check on bookings, toast feedback, improved mobile drawer, scroll-to-top.
- **Ready to deploy** on Vercel, Netlify, GitHub Pages, etc.

## Required Supabase tables

Create these two tables in your Supabase project (SQL editor):

```sql
-- Bookings
create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  experience text not null,
  appointment_date date not null,
  appointment_time time not null,
  client_name text not null,
  phone text not null,
  location_preference text not null,
  notes text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Contact messages
create table public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Allow public inserts (anon key)
alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;

create policy "Allow public insert on bookings"
  on public.bookings for insert
  to anon
  with check (true);

create policy "Allow public insert on contact_messages"
  on public.contact_messages for insert
  to anon
  with check (true);
```

You can keep the existing Supabase project URL + anon key already in `supabaseClient.js`, or replace them with your own.

## Local preview

Just open `index.html` in a browser, or use any static server:

```bash
npx serve .
# or
python -m http.server 8080
```

## Images

Copy the image files from the original repository into this folder:

- `hero.jpg`
- `brenda-profile.jpg`
- `brenda.jpg`
- `gfe.jpg`
- `dinner-date.jpg`
- `overnight.jpg`
- `massage.jpg`
- `travel.jpg`

(Or replace them with your own assets.)

## Deploy

1. Push this folder to a new GitHub repo (or update the existing one).
2. Connect to Vercel / Netlify → deploy as a static site.
3. (Optional) Add a custom domain.

---

© 2026 Elite Moments with Brenda – For adults 18+ only.
