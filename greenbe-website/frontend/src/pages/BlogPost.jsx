import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { ArrowLeft, CalendarDays, Clock, LoaderCircle, Share2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import { publicRequest } from '../api/client'

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true); setError('')
    Promise.all([publicRequest(`/blogs/${slug}`), publicRequest('/blogs?limit=6')]).then(([story, list]) => {
      if (!active) return
      setPost(story)
      setRelated(list.items.filter(item => item.slug !== story.slug).slice(0, 3))
      document.title = `${story.seo_title || story.title} | GreenBe`
      const description = document.querySelector('meta[name="description"]')
      if (description) description.setAttribute('content', story.seo_description || story.excerpt || 'GreenBe story')
    }).catch(err => active && setError(err.message || 'Story not found')).finally(() => active && setLoading(false))
    return () => { active = false; document.title = 'GreenBe | Your partner in clean living' }
  }, [slug])

  const share = async () => {
    const payload = { title: post.title, text: post.excerpt, url: window.location.href }
    if (navigator.share) await navigator.share(payload)
    else {
      await navigator.clipboard.writeText(window.location.href)
      window.alert('Link copied to clipboard')
    }
  }

  if (loading) return <div className="grid min-h-[75vh] place-items-center pt-20"><LoaderCircle className="animate-spin text-forest-700" size={30} /></div>
  if (error || !post) return <div className="container-shell min-h-[70vh] pt-32"><h1 className="section-title">Story not found</h1><p className="mt-3 text-slate-500">{error}</p><Link to="/blogs" className="btn-primary mt-6">Back to blogs</Link></div>

  const safeHtml = DOMPurify.sanitize(post.content_html || '')

  return (
    <>
      <article className="pt-16 sm:pt-20">
        <header className="bg-forest-50 py-14 sm:py-20">
          <div className="container-shell">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-forest-700"><ArrowLeft size={17} /> Back to all stories</Link>
            <div className="mt-8 max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-600">{post.category}</p><h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] text-forest-950 sm:text-5xl lg:text-6xl">{post.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{post.excerpt}</p><div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-slate-500"><span className="flex items-center gap-2"><CalendarDays size={17} /> {formatDate(post.published_at)}</span><span className="flex items-center gap-2"><Clock size={17} /> {post.read_time_minutes} min read</span><button onClick={share} className="flex items-center gap-2 font-semibold text-forest-700"><Share2 size={17} /> Share</button></div><p className="mt-5 text-sm font-bold text-forest-900">By {post.author_name}</p></div>
          </div>
        </header>
        {post.thumbnail_url && <div className="container-shell py-10 sm:py-14"><img src={post.thumbnail_url} alt={post.title} className="max-h-[660px] w-full rounded-[2rem] object-cover shadow-soft" /></div>}
        <div className="container-shell pb-20 sm:pb-28"><div className="article-content rich-article mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: safeHtml }} /></div>
      </article>
      {related.length > 0 && <section className="bg-forest-50 py-20"><div className="container-shell"><h2 className="font-display text-3xl font-extrabold text-forest-950">Continue reading</h2><div className="mt-8 grid gap-6 lg:grid-cols-3">{related.map(item => <BlogCard key={item.slug} post={item} />)}</div></div></section>}
    </>
  )
}
