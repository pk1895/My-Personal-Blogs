# prasad-blog-ts-supabase

TypeScript blog with an in-site **Admin editor** using Supabase (Auth + DB).

## 1) Supabase setup
- Create a free project at https://supabase.com
- Project Settings → API:
  - `VITE_SUPABASE_URL` = Project URL
  - `VITE_SUPABASE_ANON_KEY` = anon public key

Create `.env.local` in the project root:
```
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### SQL (run in Supabase SQL Editor)
```sql
create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  content text not null,
  published_at timestamptz default now(),
  author_id uuid references auth.users(id) on delete set null
);

alter table public.posts enable row level security;

create policy "Public can read posts"
on public.posts for select
to public
using (true);

create policy "Logged-in can insert own posts"
on public.posts for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Author can update own posts"
on public.posts for update
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);
```

### Auth
- Enable **GitHub** provider in Supabase Auth.
- Add redirect URL: `http://localhost:5173/admin` (and your Vercel domain `/admin` later).

## 2) Run locally
```bash
npm install
npm run dev
```

## 3) Deploy to Vercel
- Add env vars in Vercel → Settings → Environment Variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Deploy. Update Supabase Auth redirect with your production `/admin` URL.
