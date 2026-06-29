import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Timeline from './views/Timeline'
import AuthorProfile from './views/AuthorProfile'
import TopicExplorer from './views/TopicExplorer'
import ResourceDetail from './views/ResourceDetail'
import Search from './views/Search'
import Login from './views/Login'
import TeacherPanel from './views/TeacherPanel'
import StudentPanel from './views/StudentPanel'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  )
}
