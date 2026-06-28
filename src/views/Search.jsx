import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import ResourceCard from '../components/ResourceCard'
import AuthorCard from '../components/AuthorCard'

export default function Search() {
  const [query, setQuery] = useState('')
  const [allRecursos, setAllRecursos] = useState([])
  const [allAutores, setAllAutores] = useState([])
  const [autoresMap, setAutoresMap] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [recursosSnap, autoresSnap] = await Promise.all([
        getDocs(collection(db, 'recursos')),
        getDocs(collection(db, 'autores')),
      ])
      const autores = autoresSnap.docs.map(d => ({ id: d.id, ...d.data() }))
      const aMap = {}
      autores.forEach(a => { aMap[a.id] = a.nombre })
      setAllAutores(autores)
      setAutoresMap(aMap)
      setAllRecursos(recursosSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }
    load()
  }, [])

  const q = query.toLowerCase().trim()

  const autoresFiltrados = q
    ? allAutores.filter(a => a.nombre.toLowerCase().includes(q) || a.periodo.toLowerCase().includes(q))
    : []

  const recursosFiltrados = q
    ? allRecursos.filter(r =>
        r.titulo.toLowerCase().includes(q) ||
        autoresMap[r.autorId]?.toLowerCase().includes(q) ||
        r.temas?.some(t => t.toLowerCase().includes(q))
      )
    : []

  const totalResults = autoresFiltrados.length + recursosFiltrados.length

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Buscador</h1>
      </div>

      <div className="search-box">
        <input
          type="search"
          className="form-control search-input"
          placeholder="Buscá por título, autor o tema..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {loading && <div className="loading-state">Cargando...</div>}

      {!loading && q && (
        <div className="search-results">
          <p className="search-results__count">
            {totalResults === 0
              ? 'Sin resultados'
              : `${totalResults} resultado${totalResults !== 1 ? 's' : ''}`}
          </p>

          {autoresFiltrados.length > 0 && (
            <section className="search-section">
              <h2 className="section-title">Autores ({autoresFiltrados.length})</h2>
              <div className="authors-grid">
                {autoresFiltrados.map(a => <AuthorCard key={a.id} autor={a} />)}
              </div>
            </section>
          )}

          {recursosFiltrados.length > 0 && (
            <section className="search-section">
              <h2 className="section-title">Recursos ({recursosFiltrados.length})</h2>
              <div className="resources-grid">
                {recursosFiltrados.map(r => (
                  <ResourceCard key={r.id} recurso={r} autorNombre={autoresMap[r.autorId]} />
                ))}
              </div>
            </section>
          )}

          {totalResults === 0 && (
            <div className="empty-state">
              <h3>Sin resultados para "{query}"</h3>
              <p>Probá con otro término o explorá por temas.</p>
            </div>
          )}
        </div>
      )}

      {!loading && !q && (
        <div className="empty-state">
          <h3>Escribí algo para buscar</h3>
          <p>Podés buscar por nombre de autor, título de recurso o tema.</p>
        </div>
      )}
    </div>
  )
}
