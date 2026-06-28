import { useNavigate } from 'react-router-dom'
import TopicTag from './TopicTag'

const TYPE_ICONS = {
  pdf: '📄',
  video: '🎬',
  tiktok: '📱',
  texto: '📝',
}

const TYPE_LABELS = {
  pdf: 'PDF',
  video: 'Video',
  tiktok: 'TikTok',
  texto: 'Texto',
}

export default function ResourceCard({ recurso, autorNombre }) {
  const navigate = useNavigate()

  return (
    <div
      className="resource-card card"
      onClick={() => navigate(`/recurso/${recurso.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/recurso/${recurso.id}`)}
    >
      <div className="resource-card__header">
        <span className={`resource-type-badge tipo-${recurso.tipo}`}>
          {TYPE_ICONS[recurso.tipo]} {TYPE_LABELS[recurso.tipo]}
        </span>
      </div>
      <h3 className="resource-card__title">{recurso.titulo}</h3>
      {autorNombre && (
        <p className="resource-card__autor">{autorNombre}</p>
      )}
      {recurso.temas?.length > 0 && (
        <div className="resource-card__tags">
          {recurso.temas.slice(0, 3).map((tema) => (
            <TopicTag key={tema} tema={tema} onClick={(t) => { navigate(`/temas/${encodeURIComponent(t)}`) }} />
          ))}
        </div>
      )}
    </div>
  )
}
