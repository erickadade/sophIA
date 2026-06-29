function getYoutubeEmbedUrl(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/)
  if (!match) return null
  return `https://www.youtube.com/embed/${match[1]}`
}

function getTiktokEmbedUrl(url) {
  if (!url) return null
  const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/)
  if (!match) return null
  return `https://www.tiktok.com/embed/v2/${match[1]}`
}

function getInstagramEmbedUrl(url) {
  if (!url) return null
  const match = url.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/)
  if (!match) return null
  return `https://www.instagram.com/p/${match[1]}/embed`
}

function getFacebookEmbedUrl(url) {
  if (!url) return null
  const isLikelyVideo = /\/(videos|watch|reel)\//.test(url)
  const base = isLikelyVideo
    ? 'https://www.facebook.com/plugins/video.php'
    : 'https://www.facebook.com/plugins/post.php'
  return `${base}?href=${encodeURIComponent(url)}&show_text=false`
}

export default function EmbedViewer({ tipo, urlEmbed, urlArchivo, contenidoTexto }) {
  if (tipo === 'video' || tipo === 'tiktok' || tipo === 'instagram' || tipo === 'facebook') {
    let embedUrl = null
    if (urlArchivo) {
      if (tipo === 'video') embedUrl = getYoutubeEmbedUrl(urlArchivo)
      else if (tipo === 'tiktok') embedUrl = getTiktokEmbedUrl(urlArchivo)
      else if (tipo === 'instagram') embedUrl = getInstagramEmbedUrl(urlArchivo)
      else if (tipo === 'facebook') embedUrl = getFacebookEmbedUrl(urlArchivo)
    } else if (urlEmbed) {
      embedUrl = urlEmbed
    }

    const sourceUrl = urlArchivo || urlEmbed

    if (embedUrl) {
      const wrapperClass = tipo === 'video' ? 'embed-wrapper' : `embed-wrapper embed-wrapper--${tipo}`
      const titles = { video: 'Video', tiktok: 'TikTok', instagram: 'Instagram', facebook: 'Facebook' }
      const allows = tipo === 'video'
        ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        : 'autoplay'
      return (
        <div>
          <div className={wrapperClass}>
            <iframe src={embedUrl} title={titles[tipo]} frameBorder="0" allow={allows} allowFullScreen />
          </div>
          {sourceUrl && (
            <div style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                Abrir en pestaña nueva
              </a>
            </div>
          )}
        </div>
      )
    }

    const icons = { video: '🎬', tiktok: '🎵', instagram: '📸', facebook: '📘' }
    const labels = { video: 'video', tiktok: 'TikTok', instagram: 'publicación de Instagram', facebook: 'publicación de Facebook' }
    return (
      <div className="pdf-link-box">
        <div className="pdf-icon">{icons[tipo]}</div>
        <p>Este recurso es un {labels[tipo]} alojado externamente.</p>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Abrir en pestaña nueva
          </a>
        )}
      </div>
    )
  }

  if (tipo === 'pdf' || tipo === 'imagen') {
    const esPdf = tipo === 'pdf'
    return (
      <div className="pdf-link-box">
        <div className="pdf-icon">{esPdf ? '📄' : '🖼️'}</div>
        <p>{esPdf ? 'Este recurso es un PDF alojado externamente.' : 'Esta es una imagen alojada externamente.'}</p>
        <a
          href={urlArchivo}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          {esPdf ? 'Abrir PDF' : 'Abrir imagen'}
        </a>
      </div>
    )
  }

  if (tipo === 'texto' && contenidoTexto) {
    return (
      <div className="texto-content">
        {contenidoTexto.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    )
  }

  return <p className="empty-state-inline">Sin contenido disponible.</p>
}
