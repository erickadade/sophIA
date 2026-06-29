import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'
import { db } from '../lib/firebase'
import EmbedViewer from '../components/EmbedViewer'
import TopicTag from '../components/TopicTag'
import ResourceCard from '../components/ResourceCard'

export default function ResourceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recurso, setRecurso] = useState(null)
  const [autores, setAutores] = useState([])
  const [relacionados, setRelacionados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, 'recursos', id))
      if (!snap.exists()) { navigate('/'); return }
      const data = { id: snap.id, ...snap.data() }
      setRecurso(data)

      if (data.autorIds?.length > 0) {
        const autorSnaps = await Promise.all(
          data.autorIds.map(id => getDoc(doc(db, 'autores', id)))
        )
        setAutores(autorSnaps.filter(s => s.exists()).map(s => ({ id: s.id, ...s.data() })))
      }

      if (data.relacionados?.length > 0) {
        const relSnaps = await Promise.all(
          data.relacionados.map(rid => getDoc(doc(db, 'recursos', rid)))
        )
        setRelacionados(relSnaps.filter(s => s.exists()).map(s => ({ id: s.id, ...s.data() })))
      }

      setLoading(false)
    }
    load()
  }, [id, navigate])

  if (loading) return <div className="loading-state">Cargando...</div>
  if (!recurso) return null

  return (
    <div className="page-content">
      <button className="btn btn-ghost btn-sm back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <article className="resource-detail">
        <header className="resource-detail__header">
          <div className="resource-detail__meta">
            <span className={`resource-type-badge tipo-${recurso.tipo}`}>
              {recurso.tipo}
            </span>
            {autores.map(autor => (
              <Link key={autor.id} to={`/autor/${autor.id}`} className="resource-detail__autor-link">
                {autor.nombre}
              </Link>
            ))}
          </div>
          <h1 className="resource-detail__title">{recurso.titulo}</h1>
          {recurso.temas?.length > 0 && (
            <div className="resource-detail__tags">
              {recurso.temas.map(t => <TopicTag key={t} tema={t} />)}
            </div>
          )}
        </header>

        <div className="resource-detail__content">
          <EmbedViewer
            tipo={recurso.tipo}
            urlEmbed={recurso.urlEmbed}
            urlArchivo={recurso.urlArchivo}
            contenidoTexto={recurso.contenidoTexto}
          />
        </div>

        {relacionados.length > 0 && (
          <section className="resource-detail__relacionados">
            <h2 className="section-title">Recursos relacionados</h2>
            <div className="resources-grid resources-grid--small">
              {relacionados.map(r => (
                <ResourceCard key={r.id} recurso={r} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
