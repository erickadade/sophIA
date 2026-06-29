import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import ResourceCard from '../components/ResourceCard'

const PERIODO_COLORS = {
  'Antigüedad':    'var(--color-gold-500)',
  'Medieval':      'var(--color-ink-600)',
  'Moderna':       'var(--color-olive-500)',
  'Contemporánea': 'var(--color-terracotta-500)',
}

export default function AuthorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [autor, setAutor] = useState(null)
  const [recursos, setRecursos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [autorSnap, recursosSnap] = await Promise.all([
        getDoc(doc(db, 'autores', id)),
        getDocs(query(collection(db, 'recursos'), where('autorIds', 'array-contains', id))),
      ])
      if (!autorSnap.exists()) { navigate('/'); return }
      setAutor({ id: autorSnap.id, ...autorSnap.data() })
      setRecursos(recursosSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }
    load()
  }, [id, navigate])

  if (loading) return <div className="loading-state">Cargando...</div>
  if (!autor) return null

  const periodoColor = PERIODO_COLORS[autor.periodo] || 'var(--text-secondary)'

  return (
    <div className="page-content">
      <button className="btn btn-ghost btn-sm back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="author-profile">
        <div className="author-profile__header">
          <div className="author-profile__avatar">
            {autor.nombre.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="author-profile__meta">
            <span className="author-profile__periodo" style={{ color: periodoColor }}>
              {autor.periodo}
            </span>
            <h1 className="author-profile__name">{autor.nombre}</h1>
            <p className="author-profile__dates">
              {autor.anioNacimiento} — {autor.anioMuerte}
            </p>
          </div>
        </div>

        <div className="author-profile__bio">
          {autor.bio}
        </div>

        <section className="author-profile__recursos">
          <h2 className="section-title">Recursos ({recursos.length})</h2>
          {recursos.length === 0 ? (
            <p className="text-secondary">No hay recursos cargados para este autor.</p>
          ) : (
            <div className="resources-grid">
              {recursos.map(r => (
                <ResourceCard key={r.id} recurso={r} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
