import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children, rol }) {
  const { user, userData, loading } = useAuth()

  if (loading) {
    return <div className="loading-state">Cargando...</div>
  }
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (rol && userData?.rol !== rol) {
    return <Navigate to="/" replace />
  }

  return children
}
