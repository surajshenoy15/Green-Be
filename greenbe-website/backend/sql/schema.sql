-- GreenBe CMS schema for Supabase Postgres
-- The FastAPI app can create these tables automatically when AUTO_CREATE_TABLES=true.

create table if not exists public.admin_users (
  id serial primary key,
  email varchar(320) unique not null,
  full_name varchar(120) not null default 'GreenBe Admin',
  password_hash varchar(255) not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id serial primary key,
  title varchar(220) not null,
  slug varchar(240) unique not null,
  excerpt text not null default '',
  category varchar(100) not null default 'Stories',
  author_name varchar(120) not null default 'GreenBe Team',
  author_avatar_url text,
  thumbnail_url text,
  content_json jsonb not null default '{}'::jsonb,
  content_html text not null default '',
  tags jsonb not null default '[]'::jsonb,
  seo_title varchar(255),
  seo_description varchar(320),
  status varchar(20) not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  read_time_minutes integer not null default 1,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ix_blog_posts_status on public.blog_posts(status);
create index if not exists ix_blog_posts_published_at on public.blog_posts(published_at);
create index if not exists ix_blog_posts_featured on public.blog_posts(featured);
create index if not exists ix_blog_posts_public_feed on public.blog_posts(status, published_at desc);
