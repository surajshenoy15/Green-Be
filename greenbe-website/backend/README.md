# GreenBe Website — FastAPI backend

This is the **existing website's CMS API** (FastAPI + SQLAlchemy + Supabase), packaged separately for the refreshed blue/lime React/Vite frontend. It is **not** the separate Green Be multi-tenant mobile SaaS service.

## API features and compatibility

- `GET /api/health` — API health response (not a DB connectivity check)
- `POST /api/auth/login` and `GET /api/auth/me` — admin JWT login/session
- `GET /api/blogs`, `GET /api/blogs/featured`, `GET /api/blogs/{slug}` — public stories
- `GET /api/admin/stats` — admin CMS dashboard
- `/api/admin/posts` — CMS create/read/update/delete, publishing and unpublishing
- `POST /api/admin/uploads` — authenticated image upload to Supabase Storage
- Interactive documentation: `http://localhost:8000/docs`

The paths and request/response shapes match the refreshed website frontend. The database schema has **not been changed**.

## Quick setup (Windows PowerShell)

From the extracted `backend` folder:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env` and set:

1. `DATABASE_URL`: your **existing** Supabase Postgres URL (or uncomment the SQLite URL for isolated local tests only).
2. `JWT_SECRET`: generate a strong random value by running `py -c "import secrets; print(secrets.token_urlsafe(48))"`.
3. `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD`: optional first-admin credentials. Use a unique password of 12+ characters and do not use predictable values.
4. `FRONTEND_ORIGINS`: comma-separated **exact origins**, e.g. `http://localhost:5173,https://your-live-domain.com`, without a trailing `/` or path.
5. `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for CMS media uploads (keep this key **server-side only**).

Start the API:

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Check `http://localhost:8000/api/health` and `http://localhost:8000/docs`.

## Connect the updated React frontend

In `GreenBe-Website/frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Keep the `/api` suffix: `src/api/client.js` appends the endpoint paths. Restart `npm run dev` after changing Vite environment variables.

For deployment, use your public HTTPS backend URL, such as `https://api.your-domain.com/api`, and add your frontend origin to the backend's `FRONTEND_ORIGINS`.

## Database safety

- **No data deletion, resets, table drops, or database migrations** are included.
- `AUTO_CREATE_TABLES=true` uses `create_all` to create *missing tables only*; it will not edit existing table structures.
- For existing production databases, set `AUTO_CREATE_TABLES=false` and keep using your existing schema.
- `sql/schema.sql` documents the existing CMS tables. Do **not** run it against an unrelated application's database.
- `scripts/seed_blogs.py` is an **optional manual script**; it is never executed at startup. It inserts sample articles only if you explicitly run it.
- The backend does not reset an existing admin's password: seed credentials are used only if the seed email does not already exist.

## Uploaded files and secrets

The following were intentionally **excluded** from this delivery:

- The original `.env` (may contain live credentials)
- `.venv/`, `__pycache__/`, `*.pyc` and generated database files
- Frontend `node_modules` and `.git` metadata

Upload accepts JPEG, PNG, WebP, and GIF, maximum 6 MB, into the `blog-media` Supabase Storage bucket. A **public** storage bucket is used for published blog media. Do not upload private documents to it.

## Validation and production considerations

The Python source compiles without syntax errors; a full backend service test requires installing its dependencies and connecting a database/Storage project. Before public production deployment, configure HTTPS, take a database backup, use least-privilege credentials where possible, and consider login rate limiting, persistent audit logs, and stronger content sanitization for externally-authored HTML.
