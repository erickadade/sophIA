import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { user, userData, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Si ya está logueado, redirigir
  if (!loading && user) {
    if (userData?.rol === 'docente') return <Navigate to="/docente" replace />
    if (userData?.rol === 'alumno') return <Navigate to="/alumno" replace />
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const snap = await getDoc(doc(db, 'usuarios', cred.user.uid))
      if (snap.exists()) {
        const rol = snap.data().rol
        navigate(rol === 'docente' ? '/docente' : rol === 'alumno' ? '/alumno' : '/', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    } catch (err) {
      setError(getErrorMessage(err.code))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-content login-page">
      <div className="login-card card">
        <div className="login-logo">
          soph<span>IA</span>
        </div>
        <h1 className="login-title">Ingresar</h1>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="tu@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary login-btn" disabled={submitting}>
            {submitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}

function getErrorMessage(code) {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email o contraseña incorrectos.'
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Esperá un momento antes de reintentar.'
    case 'auth/network-request-failed':
      return 'Error de conexión. Revisá tu internet.'
    default:
      return 'Error al ingresar. Intentá de nuevo.'
  }
}
