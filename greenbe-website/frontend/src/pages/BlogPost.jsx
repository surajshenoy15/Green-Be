import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  LoaderCircle,
  Share2,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import BlogCard from '../components/BlogCard'
import { publicRequest } from '../api/client'


function formatDate(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}


export default function BlogPost() {
  const { slug } = useParams()

  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  useEffect(() => {
    let active = true

    setLoading(true)
    setError('')

    Promise.all([
      publicRequest(`/blogs/${slug}`),
      publicRequest('/blogs?limit=6'),
    ])
      .then(([story, list]) => {
        if (!active) return

        setPost(story)

        setRelated(
          (list.items || [])
            .filter(item => item.slug !== story.slug)
            .slice(0, 3)
        )

        document.title = `${
          story.seo_title || story.title
        } | GreenBe`

        const description = document.querySelector(
          'meta[name="description"]'
        )

        if (description) {
          description.setAttribute(
            'content',
            story.seo_description ||
              story.excerpt ||
              'GreenBe story'
          )
        }
      })
      .catch(err => {
        if (active) {
          setError(
            err.message ||
              'Story not found'
          )
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })


    return () => {
      active = false

      document.title =
        'GreenBe | Your partner in clean living'
    }
  }, [slug])


  const share = async () => {
    const payload = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(payload)
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        )

        window.alert(
          'Link copied to clipboard'
        )
      }
    } catch (error) {
      // User may cancel native share dialog.
      console.log('Share cancelled', error)
    }
  }


  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="grid min-h-[70vh] place-items-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle
            size={30}
            className="animate-spin text-forest-700"
          />

          <p className="text-sm font-semibold text-slate-500">
            Loading story…
          </p>
        </div>
      </div>
    )
  }


  /*
   * Error state
   */
  if (error || !post) {
    return (
      <div className="container-shell flex min-h-[70vh] flex-col items-center justify-center text-center">

        <h1 className="font-display text-3xl font-extrabold text-forest-950">
          Story not found
        </h1>

        {error && (
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            {error}
          </p>
        )}

        <Link
          to="/blogs"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-forest-800"
        >
          <ArrowLeft size={17} />
          Back to blogs
        </Link>

      </div>
    )
  }


  const safeHtml = DOMPurify.sanitize(
    post.content_html || ''
  )


  return (
    <>

      {/* =====================================
          ARTICLE HEADER
      ====================================== */}

      <section className="bg-forest-50">

        <div className="container-shell">

          <div className="mx-auto max-w-5xl py-10 sm:py-14 lg:py-16">

            {/* Back */}

            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-bold text-forest-700 transition hover:text-forest-950"
            >
              <ArrowLeft size={15} />
              Back to all stories
            </Link>


            {/* Category */}

            <p className="mt-8 text-xs font-extrabold uppercase tracking-[.18em] text-forest-600">
              {post.category || 'Stories'}
            </p>


            {/* Title */}

            <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-forest-950 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>


            {/* Excerpt */}

            {post.excerpt && (
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {post.excerpt}
              </p>
            )}


            {/* Metadata */}

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-slate-500">

              {post.published_at && (
                <span className="inline-flex items-center gap-1.5">

                  <CalendarDays
                    size={15}
                    className="text-forest-600"
                  />

                  {formatDate(
                    post.published_at
                  )}

                </span>
              )}


              {post.read_time_minutes && (
                <span className="inline-flex items-center gap-1.5">

                  <Clock
                    size={15}
                    className="text-forest-600"
                  />

                  {post.read_time_minutes}{' '}
                  min read

                </span>
              )}


              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-1.5 font-bold text-forest-700 transition hover:text-forest-950"
              >
                <Share2 size={15} />
                Share
              </button>

            </div>


            {/* Author */}

            <p className="mt-6 text-sm font-bold text-forest-950">
              By{' '}
              {post.author_name ||
                'GreenBe Team'}
            </p>

          </div>

        </div>

      </section>



      {/* =====================================
          COVER IMAGE + ARTICLE BODY

          Both use max-w-5xl.
          Article gets internal padding so
          text remains readable.
      ====================================== */}

      <section className="bg-white">

        <div className="container-shell">


          {/* Cover image */}

          {post.thumbnail_url && (
            <div className="mx-auto max-w-5xl pt-10 sm:pt-12 lg:pt-14">

              <img
                src={post.thumbnail_url}
                alt={post.title}
                className="
                  block
                  w-full
                  max-h-[680px]
                  rounded-[1.25rem]
                  object-cover
                  shadow-soft
                  sm:rounded-[1.75rem]
                "
              />

            </div>
          )}



          {/* Article area */}

          <div className="mx-auto w-full max-w-5xl">

            <div
              className="
                article-content
                rich-article
                w-full
                px-0
                py-10
                sm:px-8
                sm:py-12
                lg:px-16
                lg:py-14
              "
              dangerouslySetInnerHTML={{
                __html: safeHtml,
              }}
            />

          </div>

        </div>

      </section>



      {/* =====================================
          RELATED STORIES
      ====================================== */}

      {related.length > 0 && (

        <section className="border-t border-forest-100 bg-forest-50/60 py-16 sm:py-20">

          <div className="container-shell">

            <div className="mx-auto max-w-6xl">

              <div className="mb-8 sm:mb-10">

                <p className="text-xs font-extrabold uppercase tracking-[.18em] text-forest-600">
                  GreenBe Journal
                </p>

                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">
                  Continue reading
                </h2>

              </div>


              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {related.map(item => (
                  <BlogCard
                    key={item.id || item.slug}
                    post={item}
                  />
                ))}

              </div>

            </div>

          </div>

        </section>

      )}

    </>
  )
}