import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import ResourceCard from '../components/ResourceCard'

export default function TopicExplorer() {
  const { tema: temaFromUrl } = useParams()
  const navigate = useNavigate()
  const [allRecursos, setAllRecursos] = useState([])
  const [autoresMap, setAutoresMap] = useState({})
  const [temaActivo, setTemaActivo] = useState(temaFromUrl || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [recursosSnap, autoresSnap] = await Promise.all([
        getDocs(collection(db, 'recursos')),
        getDocs(collection(db, 'autores')),
      ])
      setAllRecursos(recursosSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      const aMap = {}
      autoresSnap.docs.forEach(d => { aMap[d.id] = d.data().nombre })
      setAutoresMap(aMap)
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    setTemaActivo(temaFromUrl || null)
  }, [temaFromUrl])

  if (loading) return <div className="loading-state">Cargando...</div>

  // Contar frecuencia de temas
  const temaCount = {}
  allRecursos.forEach(r => {
    r.temas?.forEach(t => {
      temaCount[t] = (temaCount[t] || 0) + 1
    })
  })
  const temas = Object.entries(temaCount).sort((a, b) => b[1] - a[1])

  const recursosFiltrados = temaActivo
    ? allRecursos.filter(r => r.temas?.includes(temaActivo))
    : []

  const maxCount = Math.max(...temas.map(([, c]) => c), 1)

  const handleTema = (t) => {
    if (temaActivo === t) {
      setTemaActivo(null)
      navigate('/temas')
    } else {
      setTemaActivo(t)
      navigate(`/temas/${encodeURIComponent(t)}`)
    }
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Explorador de temas</h1>
        <p>Tocá un tema para ver todos los recursos relacionados.</p>
      </div>

      <div className="topics-cloud">
        {temas.length === 0 ? (
          <p className="text-secondary">No hay temas disponibles todavía.</p>
        ) : temas.map(([tema, count]) => {
          const scale = 0.85 + (count / maxCount) * 0.7
          const isActive = tema === temaActivo
          return (
            <button
              key={tema}
              className={`topic-cloud-item ${isActive ? 'topic-cloud-item--active' : ''}`}
              style={{ fontSize: `${scale}rem` }}
              onClick={() => handleTema(tema)}
            >
              {tema}
              <span className="topic-cloud-count">{count}</span>
            </button>
          )
        })}
      </div>

      {temaActivo && (
        <section className="topics-results">
          <h2 className="section-title">
            Recursos sobre <em>{temaActivo}</em> ({recursosFiltrados.length})
          </h2>
          {recursosFiltrados.length === 0 ? (
            <p className="text-secondary">Sin resultados para este tema.</p>
          ) : (
            <div className="resources-grid">
              {recursosFiltrados.map(r => (
                <ResourceCard
                  key={r.id}
                  recurso={r}
                  autorNombres={r.autorIds?.map(id => autoresMap[id]).filter(Boolean)}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
