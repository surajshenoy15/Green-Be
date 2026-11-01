import { Navigate, useLocation } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-cream text-brand-700"><LoaderCircle className="animate-spin" size={30} /></div>
  }
  if (!admin) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}
