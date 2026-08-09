import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest, getToken, setToken } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(Boolean(getToken()))

  useEffect(() => {
    let active = true
    async function restore() {
      if (!getToken()) {
        setLoading(false)
        return
      }
      try {
        const me = await apiRequest('/auth/me')
        if (active) setAdmin(me)
      } catch {
        setToken(null)
        if (active) setAdmin(null)
      } finally {
        if (active) setLoading(false)
      }
    }
    restore()
    return () => { active = false }
  }, [])

  const value = useMemo(() => ({
    admin,
    loading,
    async login(email, password) {
      const result = await apiRequest('/auth/login', { method: 'POST', auth: false, body: { email, password } })
      setToken(result.access_token)
      setAdmin(result.admin)
      return result.admin
    },
    logout() {
      setToken(null)
      setAdmin(null)
    },
  }), [admin, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
