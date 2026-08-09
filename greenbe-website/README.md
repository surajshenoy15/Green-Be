# GreenBe Dynamic Blog CMS

This package is the supplied GreenBe showcase website upgraded into a full dynamic blog CMS.

## Folder structure

```text
GreenBe-Dynamic-CMS/
├── frontend/   React + Vite + Tailwind + Tiptap
└── backend/    FastAPI + SQLAlchemy + Supabase Postgres/Storage
```

## What changed

The original visual language is preserved for the public site. The previous hard-coded blog data has been replaced by FastAPI-powered public APIs, and the home-page story cards now load from the CMS as well.

The admin area is intentionally hidden from the public navigation. Visit `/login` directly to sign in. After authentication, the admin can create, edit, preview, publish, unpublish and delete blogs from the dashboard.

The writing experience is Medium-inspired rather than a copy of Medium branding: a clean title/subtitle canvas, selection bubble menu, insertion controls, live WYSIWYG drafting, cover image, rich metadata and public-style preview. Tiptap is used as the editor engine.

## Quick start

1. Create a Supabase project.
2. Configure `backend/.env` from `backend/.env.example`.
3. Run the FastAPI backend.
4. Configure `frontend/.env` from `frontend/.env.example`.
5. Run the React frontend.
6. Open `/login` directly with the admin credentials configured in the backend environment.

See the README inside each folder for exact commands and deployment notes.
