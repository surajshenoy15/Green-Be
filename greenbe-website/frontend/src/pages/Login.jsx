import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { admin, login, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  if (!loading && admin) return <Navigate to="/admin" replace />

  const submit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(email, password)
      navigate(location.state?.from || '/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to sign in')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative grid min-h-screen overflow-hidden bg-brand-950 lg:grid-cols-[1.05fr_.95fr]">
      <div className="relative hidden min-h-screen lg:block">
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=88" alt="Green forest" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/65 to-brand-700/20" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white xl:p-16">
          <div className="inline-flex self-start rounded-2xl bg-white px-3 py-2"><img src="/images/logo-1.png" alt="GreenBe" className="h-14 w-auto" /></div>
          <div className="max-w-xl pb-12"><p className="text-xs font-bold uppercase tracking-[.18em] text-lime">Content studio</p><h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05]">Publish thoughtful stories for a cleaner tomorrow.</h1><p className="mt-5 max-w-lg text-lg leading-8 text-white/65">A focused editorial workspace for GreenBe's sustainability journal.</p></div>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center bg-white px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden"><img src="/images/logo-1.png" alt="GreenBe" className="h-14 w-auto" /></div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"><LockKeyhole size={22} /></span>
          <h2 className="mt-6 font-display text-3xl font-extrabold text-brand-950">Admin sign in</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">This route is intentionally not linked from the public website.</p>
          <form className="mt-8 space-y-5" onSubmit={submit}>
            <label className="block text-sm font-bold text-slate-700">Email<input className="input-field" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@greenbe.org" required /></label>
            <label className="block text-sm font-bold text-slate-700">Password<div className="relative"><input className="input-field pr-12" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••••" required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(v => !v)} className="absolute bottom-0 right-0 grid h-[48px] w-12 place-items-center text-slate-400 hover:text-brand-700">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
            {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
            <button className="btn-primary w-full" disabled={submitting}>{submitting ? <LoaderCircle className="animate-spin" size={18} /> : <>Continue <ArrowRight size={17} /></>}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
