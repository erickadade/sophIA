import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { useAuth } from './hooks/useAuth'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import SplashScreen from './components/SplashScreen'
import Timeline from './views/Timeline'
import AuthorProfile from './views/AuthorProfile'
import TopicExplorer from './views/TopicExplorer'
import ResourceDetail from './views/ResourceDetail'
import Search from './views/Search'
import Login from './views/Login'
import TeacherPanel from './views/TeacherPanel'
import StudentPanel from './views/StudentPanel'

const MIN_SPLASH_MS = 1200
const SPLASH_FADE_MS = 400

function AppShell() {
  const { loading: authLoading } = useAuth()
  const [minElapsed, setMinElapsed] = useState(false)
  const [splashMounted, setSplashMounted] = useState(true)

  const splashActive = !minElapsed || authLoading

  useEffect(() => {
    const t = setTimeout(() => setMinElapsed(true), MIN_SPLASH_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!splashActive && splashMounted) {
      const t = setTimeout(() => setSplashMounted(false), SPLASH_FADE_MS)
      return () => clearTimeout(t)
    }
  }, [splashActive])

  return (
    <>
      {splashMounted && <SplashScreen visible={splashActive} />}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/autor/:id" element={<AuthorProfile />} />
          <Route path="/temas" element={<TopicExplorer />} />
          <Route path="/temas/:tema" element={<TopicExplorer />} />
          <Route path="/recurso/:id" element={<ResourceDetail />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/docente"
            element={
              <ProtectedRoute rol="docente">
                <TeacherPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumno"
            element={
              <ProtectedRoute rol="alumno">
                <StudentPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  )
}
