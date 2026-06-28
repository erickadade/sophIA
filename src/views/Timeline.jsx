import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'
import AuthorCard from '../components/AuthorCard'

const PERIODOS = ['Antigüedad', 'Medieval', 'Moderna', 'Contemporánea']

const PERIODO_META = {
  'Antigüedad':    { color: 'var(--color-gold-500)',       bg: 'var(--color-gold-50)' },
  'Medieval':      { color: 'var(--color-ink-600)',        bg: 'var(--color-ink-50)' },
  'Moderna':       { color: 'var(--color-olive-500)',      bg: 'var(--color-olive-50)' },
  'Contemporánea': { color: 'var(--color-terracotta-500)', bg: 'var(--color-terracotta-50)' },
}

export default function Timeline() {
  const [autores, setAutores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const snap = await getDocs(query(collection(db, 'autores'), orderBy('ordenCronologico')))
      setAutores(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="loading-state">Cargando...</div>

  const byPeriodo = PERIODOS.reduce((acc, p) => {
    acc[p] = autores.filter(a => a.periodo === p).sort((a, b) => a.ordenCronologico - b.ordenCronologico)
    return acc
  }, {})

  const periodosConAutores = PERIODOS.filter(p => byPeriodo[p].length > 0)

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Línea de tiempo filosófica</h1>
        <p>Explorá el pensamiento filosófico a lo largo de la historia.</p>
      </div>

      {periodosConAutores.length === 0 ? (
        <div className="empty-state">
          <h3>Sin autores cargados</h3>
          <p>Iniciá sesión como docente para cargar los datos de ejemplo.</p>
        </div>
      ) : (
        <div className="timeline-grid">
          {periodosConAutores.map((periodo) => {
            const meta = PERIODO_META[periodo]
            return (
              <div key={periodo} className="periodo-column">
                <div className="periodo-header" style={{ borderColor: meta.color }}>
                  <span className="periodo-name" style={{ color: meta.color }}>{periodo}</span>
                </div>
                <div className="periodo-authors">
                  {byPeriodo[periodo].map((autor) => (
                    <AuthorCard key={autor.id} autor={autor} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
