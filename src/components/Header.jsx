import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, userData } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-logo">
          <span>soph<span className="site-logo__ia">IA</span></span>
          <img src="/sophia-iso.svg" alt="" className="site-logo__owl" />
        </Link>

        <button
          className="nav-toggle"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') && location.pathname === '/' ? 'nav-link--active' : ''}`}>
            Línea de tiempo
          </Link>
          <Link to="/temas" className={`nav-link ${isActive('/temas') ? 'nav-link--active' : ''}`}>
            Temas
          </Link>
          <Link to="/buscar" className={`nav-link ${isActive('/buscar') ? 'nav-link--active' : ''}`}>
            Buscar
          </Link>

          {user && userData?.rol === 'docente' && (
            <Link to="/docente" className={`nav-link ${isActive('/docente') ? 'nav-link--active' : ''}`}>
              Panel docente
            </Link>
          )}
          {user && userData?.rol === 'alumno' && (
            <Link to="/alumno" className={`nav-link ${isActive('/alumno') ? 'nav-link--active' : ''}`}>
              Mis tareas
            </Link>
          )}
        </nav>

        <div className="site-header__auth">
          {user ? (
            <div className="header-user">
              <span className="header-user__name">{userData?.nombre || user.email}</span>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                Salir
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
