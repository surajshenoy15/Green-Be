const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '')
const TOKEN_KEY = 'greenbe_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, auth = true, headers = {} } = options
  const requestHeaders = { ...headers }
  const token = getToken()
  if (auth && token) requestHeaders.Authorization = `Bearer ${token}`

  const config = { method, headers: requestHeaders }
  if (body !== undefined) {
    if (body instanceof FormData) config.body = body
    else {
      requestHeaders['Content-Type'] = 'application/json'
      config.body = JSON.stringify(body)
    }
  }

  const response = await fetch(`${API_BASE}${path}`, config)
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : await response.text()
  if (!response.ok) {
    const message = typeof data === 'object' ? data.detail || data.message : data
    const error = new Error(message || `Request failed (${response.status})`)
    error.status = response.status
    throw error
  }
  return data
}

export function publicRequest(path, options = {}) {
  return apiRequest(path, { ...options, auth: false })
}

export async function uploadImage(file) {
  const form = new FormData()
  form.append('file', file)
  return apiRequest('/admin/uploads', { method: 'POST', body: form })
}
