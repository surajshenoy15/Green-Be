import { useCallback, useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'

import {
  ArrowLeft,
  Check,
  Eye,
  ImagePlus,
  Leaf,
  LoaderCircle,
  MoreHorizontal,
  PanelRight,
  Save,
  Send,
  X,
} from 'lucide-react'

import {
  Link,
  useParams,
} from 'react-router-dom'

import {
  apiRequest,
  uploadImage,
} from '../../api/client'

import MediumEditor from '../../components/editor/MediumEditor'

import {
  formatFileSize,
  optimizeImageForUpload,
} from '../../utils/imageOptimization'


const blankPost = {
  title: '',
  slug: '',
  excerpt: '',
  category: 'Stories',

  author_name: 'GreenBe Team',
  author_avatar_url: '',

  thumbnail_url: '',

  content_json: {},
  content_html: '',

  tags: [],

  seo_title: '',
  seo_description: '',

  featured: false,

  status: 'draft',
  published_at: null,
}


function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 220)
}


function Preview({
  post,
  onClose,
}) {
  const safe =
    DOMPurify.sanitize(
      post.content_html || ''
    )

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white">

      {/* Preview header */}

      <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur sm:px-8">

        <div className="flex items-center gap-2 font-display font-extrabold text-brand-900">
          <Leaf size={20} />
          Live preview
        </div>

        <button
          type="button"
          onClick={onClose}
          className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700"
        >
          <X size={19} />
        </button>

      </div>


      <article className="pb-24">

        {/* Article heading */}

        <header className="bg-brand-50 py-14 sm:py-20">

          <div className="container-shell max-w-5xl">

            <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-600">
              {post.category || 'Stories'}
            </p>

            <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] text-brand-950 sm:text-5xl lg:text-6xl">
              {post.title || 'Untitled story'}
            </h1>

            {post.excerpt && (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {post.excerpt}
              </p>
            )}

            <p className="mt-6 text-sm font-semibold text-slate-500">
              By{' '}
              {post.author_name ||
                'GreenBe Team'}
              {' · '}
              Draft preview
            </p>

          </div>

        </header>


        {/* Cover */}

        {post.thumbnail_url && (
          <div className="container-shell py-10 sm:py-14">

            <img
              src={post.thumbnail_url}
              alt=""
              className="max-h-[660px] w-full rounded-[2rem] object-cover shadow-soft"
            />

          </div>
        )}


        {/* Article content */}

        <div className="container-shell">

          <div
            className="article-content rich-article mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{
              __html: safe,
            }}
          />

        </div>

      </article>

    </div>
  )
}


export default function BlogEditor() {
  const { id } = useParams()

  const isNew =
    !id ||
    id === 'new'


  const [
    postId,
    setPostId,
  ] = useState(
    isNew
      ? null
      : Number(id)
  )


  const [
    form,
    setForm,
  ] = useState(blankPost)


  const [
    loading,
    setLoading,
  ] = useState(!isNew)


  const [
    saving,
    setSaving,
  ] = useState(false)


  /*
   * Shared upload status.
   *
   * MediumEditor also updates this
   * while article images upload.
   */
  const [
    uploading,
    setUploading,
  ] = useState(false)


  /*
   * Thumbnail-only upload UI.
   */
  const [
    thumbnailUploadStage,
    setThumbnailUploadStage,
  ] = useState('')


  const [
    thumbnailCompression,
    setThumbnailCompression,
  ] = useState(null)


  const [
    dirty,
    setDirty,
  ] = useState(false)


  const [
    saveLabel,
    setSaveLabel,
  ] = useState('Saved')


  const [
    settingsOpen,
    setSettingsOpen,
  ] = useState(false)


  const [
    previewOpen,
    setPreviewOpen,
  ] = useState(false)


  const thumbnailRef =
    useRef(null)

  const titleRef =
    useRef(null)

  const subtitleRef =
    useRef(null)

  const saveLock =
    useRef(false)

  const latestForm =
    useRef(form)


  /*
   * Keep latest form available
   * for autosave/publish.
   */
  useEffect(() => {
    latestForm.current = form
  }, [form])


  /*
   * Auto grow title + subtitle.
   */
  useEffect(() => {
    for (
      const ref of [
        titleRef,
        subtitleRef,
      ]
    ) {
      const element =
        ref.current

      if (element) {
        element.style.height =
          'auto'

        element.style.height =
          `${element.scrollHeight}px`
      }
    }
  }, [
    form.title,
    form.excerpt,
  ])


  /*
   * Load existing article.
   */
  useEffect(() => {
    if (isNew) {
      return
    }

    let active = true

    apiRequest(
      `/admin/posts/${id}`
    )
      .then(data => {
        if (!active) return

        setPostId(data.id)

        setForm({
          ...blankPost,
          ...data,

          tags:
            data.tags || [],

          content_json:
            data.content_json || {},
        })
      })

      .catch(error => {
        window.alert(
          error.message
        )
      })

      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })


    return () => {
      active = false
    }

  }, [
    id,
    isNew,
  ])


  /*
   * Generic field updater.
   */
  const updateField = (
    key,
    value,
    markDirty = true
  ) => {
    setForm(current => {
      const next = {
        ...current,
        [key]: value,
      }

      latestForm.current =
        next

      return next
    })


    if (markDirty) {
      setDirty(true)

      setSaveLabel(
        'Unsaved changes'
      )
    }
  }


  /*
   * Prepare API payload.
   */
  const buildPayload = (
    overrideStatus
  ) => {
    const current =
      latestForm.current

    return {
      ...current,

      slug:
        current.slug?.trim() ||
        slugify(
          current.title
        ),

      tags:
        Array.isArray(
          current.tags
        )
          ? current.tags
          : [],

      status:
        overrideStatus ||
        current.status ||
        'draft',

      author_avatar_url:
        current.author_avatar_url ||
        null,

      thumbnail_url:
        current.thumbnail_url ||
        null,

      seo_title:
        current.seo_title ||
        null,

      seo_description:
        current.seo_description ||
        null,

      published_at:
        overrideStatus === 'draft'
          ? null
          : current.published_at,
    }
  }


  /*
   * Save article.
   */
  const persist =
    useCallback(
      async (
        overrideStatus = null,
        quiet = false
      ) => {

        if (saveLock.current) {
          return null
        }


        const current =
          latestForm.current


        if (
          !current.title.trim()
        ) {
          if (!quiet) {
            window.alert(
              'Add a title before saving.'
            )
          }

          return null
        }


        saveLock.current = true

        setSaving(true)


        if (!quiet) {
          setSaveLabel(
            'Saving…'
          )
        }


        try {
          const payload =
            buildPayload(
              overrideStatus
            )


          let result


          /*
           * Existing post
           */
          if (postId) {

            result =
              await apiRequest(
                `/admin/posts/${postId}`,
                {
                  method: 'PUT',
                  body: payload,
                }
              )

          } else {

            /*
             * New post
             */

            result =
              await apiRequest(
                '/admin/posts',
                {
                  method: 'POST',
                  body: payload,
                }
              )


            setPostId(
              result.id
            )


            window.history.replaceState(
              {},
              '',
              `/admin/blogs/${result.id}/edit`
            )
          }


          setForm(
            currentForm => {

              const next = {
                ...currentForm,
                ...result,
              }

              latestForm.current =
                next

              return next
            }
          )


          setDirty(false)


          setSaveLabel(
            result.status ===
              'published'
              ? 'Published'
              : 'Saved'
          )


          return result

        } catch (error) {

          setSaveLabel(
            'Save failed'
          )


          if (!quiet) {
            window.alert(
              error.message ||
              'Save failed'
            )
          }


          return null

        } finally {

          saveLock.current =
            false

          setSaving(false)
        }
      },

      [postId]
    )


  /*
   * Medium-style autosave.
   */
  useEffect(() => {
    if (
      !dirty ||
      !form.title.trim() ||
      loading
    ) {
      return
    }


    const timer =
      setTimeout(
        () =>
          persist(
            null,
            true
          ),

        1800
      )


    return () =>
      clearTimeout(timer)

  }, [
    dirty,
    loading,
    persist,

    form.title,
    form.content_html,
    form.excerpt,
    form.category,
    form.slug,
    form.author_name,
    form.author_avatar_url,
    form.thumbnail_url,
    form.featured,
    form.tags,
    form.seo_title,
    form.seo_description,
  ])


  /*
   * Publish article.
   */
  const publish =
    async () => {

      if (
        !form.title.trim() ||
        !form.content_html.trim() ||
        form.content_html ===
          '<p></p>'
      ) {

        window.alert(
          'Add a title and article content before publishing.'
        )

        return
      }


      const saved =
        await persist(
          'published'
        )


      if (saved) {
        setForm(current => {

          const next = {
            ...current,

            status:
              'published',

            published_at:
              saved.published_at,
          }

          latestForm.current =
            next

          return next
        })
      }
    }


  /*
   * FAST THUMBNAIL UPLOAD
   *
   * Original:
   * 4-8 MB → backend → Supabase
   *
   * Now:
   * 4-8 MB
   * ↓
   * Browser compression
   * ↓
   * ~300 KB - 1 MB
   * ↓
   * Backend
   * ↓
   * Supabase
   */
  const handleThumbnail =
    async event => {

      const file =
        event.target.files?.[0]


      event.target.value = ''


      if (!file) {
        return
      }


      setUploading(true)

      setThumbnailCompression(
        null
      )

      setThumbnailUploadStage(
        'Optimising cover…'
      )


      try {

        /*
         * Compress and resize
         * BEFORE network upload.
         */
        const optimisedFile =
          await optimizeImageForUpload(
            file,
            {
              maxDimension:
                1600,

              quality:
                0.80,
            }
          )


        /*
         * Record result
         * for UI feedback.
         */
        if (
          optimisedFile.size <
          file.size
        ) {

          setThumbnailCompression({
            before:
              file.size,

            after:
              optimisedFile.size,
          })
        }


        /*
         * Now upload
         * compressed file.
         */
        setThumbnailUploadStage(
          'Uploading cover…'
        )


        const result =
          await uploadImage(
            optimisedFile
          )


        updateField(
          'thumbnail_url',
          result.url
        )


      } catch (error) {

        console.error(
          'Thumbnail upload failed:',
          error
        )


        window.alert(
          error.message ||
          'Thumbnail upload failed'
        )


      } finally {

        setUploading(false)

        setThumbnailUploadStage(
          ''
        )
      }
    }


  /*
   * Loading screen
   */
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-white">

        <LoaderCircle
          className="animate-spin text-brand-700"
        />

      </div>
    )
  }


  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Hidden thumbnail picker */}

      <input
        ref={thumbnailRef}
        type="file"

        accept="
          image/png,
          image/jpeg,
          image/webp,
          image/gif
        "

        className="hidden"

        onChange={
          handleThumbnail
        }
      />


      {/* ============================
          TOP EDITOR HEADER
      ============================ */}

      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">

        <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">


          {/* Back */}

          <Link
            to="/admin/blogs"

            className="grid h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-100"

            title="Back to blogs"
          >
            <ArrowLeft
              size={20}
            />
          </Link>


          {/* Brand */}

          <div className="flex items-center gap-2 font-display text-lg font-extrabold text-brand-950">

            <Leaf
              size={20}
              className="text-brand-700"
            />

            GreenBe

            <span className="font-sans text-xs font-medium text-slate-400">
              {form.status ===
              'published'
                ? 'Published'
                : 'Draft'}
            </span>

          </div>


          {/* Save state */}

          <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">

            {saving
              ? (
                <LoaderCircle
                  className="animate-spin"
                  size={14}
                />
              )
              : (
                <Check
                  size={14}
                />
              )
            }

            {saveLabel}

          </div>


          {/* Right controls */}

          <div className="ml-auto flex items-center gap-2">


            {/* Preview */}

            <button
              type="button"

              onClick={() =>
                setPreviewOpen(
                  true
                )
              }

              className="hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 sm:inline-flex"
            >
              <Eye
                size={16}
              />

              Preview
            </button>


            {/* Settings */}

            <button
              type="button"

              onClick={() =>
                setSettingsOpen(
                  true
                )
              }

              className="grid h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-100"

              title="Story settings"
            >
              <PanelRight
                size={18}
              />
            </button>


            {/* Save */}

            <button
              type="button"

              onClick={() =>
                persist(
                  form.status ===
                    'published'
                    ? 'published'
                    : 'draft'
                )
              }

              disabled={
                saving
              }

              className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 md:inline-flex"
            >
              <Save
                size={15}
              />

              {form.status ===
              'published'
                ? 'Save changes'
                : 'Save draft'}
            </button>


            {/* Publish */}

            <button
              type="button"

              onClick={
                publish
              }

              disabled={
                saving ||
                uploading
              }

              className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2 text-xs font-bold text-white hover:bg-brand-800 disabled:opacity-50"
            >
              <Send
                size={15}
              />

              {form.status ===
              'published'
                ? 'Update'
                : 'Publish'}
            </button>


            <button
              type="button"

              className="grid h-10 w-10 place-items-center rounded-full text-slate-400 hover:bg-slate-100"

              title="More"
            >
              <MoreHorizontal
                size={19}
              />
            </button>

          </div>

        </div>

      </header>


      {/* ============================
          WRITING AREA
      ============================ */}

      <main className="pb-24">

        <div className="mx-auto max-w-[820px] px-5 pt-12 sm:px-8 sm:pt-16">


          {/* Title */}

          <textarea
            ref={titleRef}

            value={
              form.title
            }

            onChange={event => {
              const title =
                event.target.value


              setForm(current => {
                const next = {
                  ...current,

                  title,

                  slug:
                    current.slug
                      ? current.slug
                      : slugify(
                          title
                        ),
                }

                latestForm.current =
                  next

                return next
              })


              setDirty(true)

              setSaveLabel(
                'Unsaved changes'
              )
            }}

            placeholder="Title"

            rows={1}

            className="medium-title-input"

            onInput={event => {
              event.currentTarget.style.height =
                'auto'

              event.currentTarget.style.height =
                `${event.currentTarget.scrollHeight}px`
            }}
          />


          {/* Subtitle */}

          <textarea
            ref={subtitleRef}

            value={
              form.excerpt
            }

            onChange={event =>
              updateField(
                'excerpt',
                event.target.value
              )
            }

            placeholder="Add a short subtitle or summary…"

            rows={2}

            className="medium-subtitle-input"
          />


          {/* Rich editor */}

          <div className="mt-8 border-t border-slate-100 pt-2">

            <MediumEditor

              initialJson={
                form.content_json
              }

              initialHtml={
                form.content_html
              }

              onUploadState={
                setUploading
              }

              onChange={({
                json,
                html,
              }) => {

                setForm(current => {

                  const next = {
                    ...current,

                    content_json:
                      json,

                    content_html:
                      html,
                  }


                  latestForm.current =
                    next


                  return next
                })


                setDirty(true)

                setSaveLabel(
                  'Unsaved changes'
                )
              }}
            />

          </div>

        </div>

      </main>


      {/* ============================
          SETTINGS SIDEBAR
      ============================ */}

      {settingsOpen && (
        <>

          {/* Overlay */}

          <button
            type="button"

            onClick={() =>
              setSettingsOpen(
                false
              )
            }

            className="fixed inset-0 z-[70] bg-brand-950/20 backdrop-blur-[2px]"

            aria-label="Close settings"
          />


          <aside className="fixed inset-y-0 right-0 z-[80] w-full max-w-md overflow-y-auto border-l border-slate-100 bg-white shadow-2xl">


            {/* Sidebar header */}

            <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-100 bg-white px-5">

              <div>

                <p className="font-display text-lg font-extrabold text-brand-950">
                  Story settings
                </p>

                <p className="text-xs text-slate-400">
                  Publishing, discovery and presentation
                </p>

              </div>


              <button
                type="button"

                onClick={() =>
                  setSettingsOpen(
                    false
                  )
                }

                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"
              >
                <X
                  size={18}
                />
              </button>

            </div>


            <div className="space-y-6 p-5 sm:p-6">


              {/* ====================
                  COVER IMAGE
              ==================== */}

              <section>

                <p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400">
                  Thumbnail
                </p>


                <button
                  type="button"

                  onClick={() =>
                    !uploading &&
                    thumbnailRef.current?.click()
                  }

                  disabled={
                    uploading
                  }

                  className="relative mt-3 grid min-h-44 w-full place-items-center overflow-hidden rounded-2xl border border-dashed border-brand-200 bg-brand-50 text-brand-700 transition hover:border-brand-400 hover:bg-brand-100 disabled:cursor-wait"
                >

                  {form.thumbnail_url
                    ? (
                      <>
                        <img
                          src={
                            form.thumbnail_url
                          }

                          alt="Thumbnail"

                          className="h-48 w-full object-cover"
                        />


                        {/* Change-image overlay */}

                        {!uploading && (
                          <div className="absolute inset-0 grid place-items-center bg-brand-950/0 opacity-0 transition hover:bg-brand-950/35 hover:opacity-100">

                            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-800 shadow-lg">

                              <ImagePlus
                                size={15}
                              />

                              Change cover

                            </span>

                          </div>
                        )}
                      </>
                    )

                    : (
                      <span className="flex flex-col items-center gap-2 text-sm font-bold">

                        {uploading
                          ? (
                            <LoaderCircle
                              className="animate-spin"
                            />
                          )
                          : (
                            <ImagePlus />
                          )
                        }


                        {uploading
                          ? thumbnailUploadStage ||
                            'Uploading…'
                          : 'Upload cover image'
                        }

                      </span>
                    )
                  }


                  {/* Existing image upload overlay */}

                  {uploading &&
                    form.thumbnail_url && (
                      <div className="absolute inset-0 grid place-items-center bg-white/80 backdrop-blur-sm">

                        <span className="flex flex-col items-center gap-2 text-sm font-bold text-brand-700">

                          <LoaderCircle
                            className="animate-spin"
                          />

                          {thumbnailUploadStage ||
                            'Uploading…'}

                        </span>

                      </div>
                    )
                  }

                </button>


                {/* Compression result */}

                {thumbnailCompression &&
                  !uploading && (

                    <div className="mt-2 inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[11px] font-bold text-brand-700">

                      Optimised{' '}

                      {formatFileSize(
                        thumbnailCompression.before
                      )}

                      {' → '}

                      {formatFileSize(
                        thumbnailCompression.after
                      )}

                    </div>
                  )
                }


                {/* Remove */}

                {form.thumbnail_url && (
                  <button
                    type="button"

                    onClick={() => {
                      updateField(
                        'thumbnail_url',
                        ''
                      )

                      setThumbnailCompression(
                        null
                      )
                    }}

                    className="mt-2 block text-xs font-bold text-red-600"
                  >
                    Remove thumbnail
                  </button>
                )}

              </section>


              {/* Category */}

              <label className="block text-sm font-bold text-slate-700">

                Category

                <input
                  className="input-field"

                  value={
                    form.category
                  }

                  onChange={event =>
                    updateField(
                      'category',
                      event.target.value
                    )
                  }

                  placeholder="Sustainability"
                />

              </label>


              {/* Author */}

              <label className="block text-sm font-bold text-slate-700">

                Author

                <input
                  className="input-field"

                  value={
                    form.author_name
                  }

                  onChange={event =>
                    updateField(
                      'author_name',
                      event.target.value
                    )
                  }
                />

              </label>


              {/* Slug */}

              <label className="block text-sm font-bold text-slate-700">

                URL slug

                <div className="mt-2 flex rounded-xl border border-slate-200 bg-white focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100">

                  <span className="flex items-center pl-3 text-xs text-slate-400">
                    /blogs/
                  </span>

                  <input
                    className="min-w-0 flex-1 rounded-xl px-2 py-3 text-sm outline-none"

                    value={
                      form.slug
                    }

                    onChange={event =>
                      updateField(
                        'slug',

                        slugify(
                          event.target.value
                        )
                      )
                    }
                  />

                </div>

              </label>


              {/* Tags */}

              <label className="block text-sm font-bold text-slate-700">

                Tags

                <input
                  className="input-field"

                  value={
                    (
                      form.tags ||
                      []
                    ).join(', ')
                  }

                  onChange={event =>
                    updateField(
                      'tags',

                      event.target.value
                        .split(',')
                        .map(value =>
                          value.trim()
                        )
                        .filter(Boolean)
                    )
                  }

                  placeholder="climate, clean living, students"
                />

                <span className="mt-1 block text-xs font-normal text-slate-400">
                  Separate tags with commas.
                </span>

              </label>


              {/* Featured */}

              <label className="flex items-center justify-between gap-4 rounded-2xl border border-brand-100 p-4">

                <div>

                  <p className="text-sm font-bold text-slate-800">
                    Featured story
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Prioritise this story on the blog page.
                  </p>

                </div>


                <input
                  type="checkbox"

                  checked={
                    form.featured
                  }

                  onChange={event =>
                    updateField(
                      'featured',
                      event.target.checked
                    )
                  }

                  className="h-5 w-5 accent-[#0090E9]"
                />

              </label>


              {/* Unpublish */}

              {form.status ===
                'published' && (

                <button
                  type="button"

                  onClick={() =>
                    persist(
                      'draft'
                    )
                  }

                  className="w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 hover:bg-amber-100"
                >
                  Move published story back to draft
                </button>
              )}


              {/* SEO */}

              <div className="border-t border-slate-100 pt-6">

                <p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400">
                  SEO
                </p>


                <label className="mt-4 block text-sm font-bold text-slate-700">

                  SEO title

                  <input
                    className="input-field"

                    value={
                      form.seo_title ||
                      ''
                    }

                    onChange={event =>
                      updateField(
                        'seo_title',
                        event.target.value
                      )
                    }

                    placeholder={
                      form.title ||
                      'Search title'
                    }

                    maxLength={255}
                  />

                </label>


                <label className="mt-4 block text-sm font-bold text-slate-700">

                  Meta description

                  <textarea
                    className="input-field min-h-28 resize-y"

                    value={
                      form.seo_description ||
                      ''
                    }

                    onChange={event =>
                      updateField(
                        'seo_description',
                        event.target.value
                      )
                    }

                    placeholder={
                      form.excerpt ||
                      'Short search description'
                    }

                    maxLength={320}
                  />

                </label>

              </div>

            </div>

          </aside>

        </>
      )}


      {/* ============================
          LIVE PREVIEW
      ============================ */}

      {previewOpen && (
        <Preview
          post={form}

          onClose={() =>
            setPreviewOpen(
              false
            )
          }
        />
      )}

    </div>
  )
}