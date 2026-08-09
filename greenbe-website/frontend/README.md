# GreenBe Dynamic Website + Admin CMS Frontend

React + Vite + Tailwind frontend using the original GreenBe styling, with a dynamic public blog and a hidden admin CMS.

## Public routes

- `/` – existing homepage, now loading latest stories from the API
- `/about`
- `/blogs` – dynamic blog listing with search/category filtering
- `/blogs/:slug` – full rich-text story page
- `/calculator`
- `/greenbe-app`

## Admin routes

There is intentionally **no admin button or link on the public website**.

Open the admin login directly:

- `/login`

After sign-in:

- `/admin` – overview dashboard
- `/admin/blogs` – blog CRUD library
- `/admin/blogs/new` – Medium-inspired story editor
- `/admin/blogs/:id/edit` – edit an existing story

## Editor features

- Medium-style distraction-free title/subtitle canvas
- Tiptap rich-text editor
- Bold, italic, underline, strike-through and links
- H2 / H3 headings
- Quotes, lists, code blocks and dividers
- Text alignment
- Font family, font size and text colour controls
- Inline image upload through the FastAPI backend to Supabase Storage
- Resizable Tiptap images
- Live public-style preview
- Cover thumbnail upload
- Category, author, slug, tags and featured flag
- SEO title and meta description
- Draft auto-save after typing pauses
- Publish/update workflow
- Word and character count

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

`.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

For deployment, set `VITE_API_BASE_URL` to your deployed FastAPI API origin plus `/api` and rebuild.

## Build

```bash
npm run build
```

The included `vercel.json` keeps React Router deep links working on Vercel.
