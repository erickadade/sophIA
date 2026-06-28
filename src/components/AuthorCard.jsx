import { useNavigate } from 'react-router-dom'

const PERIODO_COLORS = {
  'Antigüedad':    { bg: 'var(--color-gold-100)',        text: 'var(--color-gold-700)' },
  'Medieval':      { bg: 'var(--color-ink-100)',         text: 'var(--color-ink-700)' },
  'Moderna':       { bg: 'var(--color-olive-100)',       text: 'var(--color-olive-700)' },
  'Contemporánea': { bg: 'var(--color-terracotta-100)',  text: 'var(--color-terracotta-700)' },
}

function initials(nombre) {
  return nombre.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function AuthorCard({ autor }) {
  const navigate = useNavigate()
  const colors = PERIODO_COLORS[autor.periodo] || PERIODO_COLORS['Medieval']

  return (
    <div
      className="author-card card"
      onClick={() => navigate(`/autor/${autor.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/autor/${autor.id}`)}
    >
      <div className="author-card__avatar" style={{ background: colors.bg, color: colors.text }}>
        {initials(autor.nombre)}
      </div>
      <div className="author-card__info">
        <h3 className="author-card__name">{autor.nombre}</h3>
        <p className="author-card__dates">
          {autor.anioNacimiento} – {autor.anioMuerte}
        </p>
      </div>
    </div>
  )
}
