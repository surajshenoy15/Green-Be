# GreenBe FastAPI CMS Backend

This backend turns the GreenBe blog into an admin-controlled CMS using FastAPI + Supabase Postgres + Supabase Storage.

## Features

- Hidden admin authentication API (`POST /api/auth/login`)
- JWT bearer authentication for all admin APIs
- Admin blog CRUD
- Draft / publish / unpublish workflow
- Featured stories
- SEO title and description
- Categories, tags, author details and slugs
- Tiptap JSON + HTML storage
- Reading-time calculation
- Supabase Storage uploads for thumbnails and in-article images
- Public read-only blog APIs
- Optional automatic table creation and first-admin seeding

## 1. Create environment file

```bash
cp .env.example .env
```

Set at minimum:

- `DATABASE_URL` – your Supabase Postgres connection string
- `JWT_SECRET` – a long random secret
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_PASSWORD`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

For a long-running FastAPI server, use the Supabase direct connection when IPv6 is available, or the Shared Pooler **session mode on port 5432** for an IPv4-only host.

## 2. Install and run

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

macOS/Linux:

```bash
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: `http://localhost:8000/docs`

## 3. Supabase tables

The app creates tables on startup when `AUTO_CREATE_TABLES=true`.

For controlled production migrations, run `sql/schema.sql` in Supabase SQL Editor and set:

```env
AUTO_CREATE_TABLES=false
```

## 4. Supabase Storage

The upload service uses the bucket configured by `SUPABASE_STORAGE_BUCKET` (default `blog-media`). The backend attempts to create it as a public image bucket when the first upload occurs.

If your project policy prevents automatic bucket creation, create `blog-media` manually in Supabase Storage and mark it **Public**.

Never expose `SUPABASE_SERVICE_ROLE_KEY` in the frontend.

## 5. Seed the existing GreenBe sample stories (optional)

Start the backend once so tables exist, then from the backend folder run:

```bash
python scripts/seed_blogs.py
```

The seed is idempotent by slug.

## Important production notes

- Change the seed admin password before the first production start.
- Use HTTPS in production.
- Set `FRONTEND_ORIGINS` to only your deployed frontend domains (comma-separated if needed).
- After the first admin user is created, changing `ADMIN_SEED_PASSWORD` does not reset that user's database password automatically.
