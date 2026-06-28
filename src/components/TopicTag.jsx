import { useNavigate } from 'react-router-dom'

export default function TopicTag({ tema, onClick }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick(tema)
    } else {
      navigate(`/temas/${encodeURIComponent(tema)}`)
    }
  }

  return (
    <span className="topic-tag" onClick={handleClick} role="button" tabIndex={0}>
      {tema}
    </span>
  )
}
