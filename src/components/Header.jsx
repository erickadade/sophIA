import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, userData } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!userMenuOpen) return
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

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
            <div className="user-menu" ref={userMenuRef}>
              <button
                className="user-avatar-btn"
                aria-label="Menú de usuario"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen(o => !o)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-3.866 3.582-7 8-7s8 3.134 8 7" />
                </svg>
              </button>
              {userMenuOpen && (
                <div className="user-dropdown" role="menu">
                  <div className="user-dropdown__name">{userData?.nombre || user.email}</div>
                  <button className="user-dropdown__item" role="menuitem" onClick={() => setUserMenuOpen(false)}>
                    Gestionar cuenta
                  </button>
                  <button className="user-dropdown__item user-dropdown__item--danger" role="menuitem" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
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
