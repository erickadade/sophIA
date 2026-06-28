export default function EmbedViewer({ tipo, urlEmbed, urlArchivo, contenidoTexto }) {
  if (tipo === 'video') {
    return (
      <div className="embed-wrapper">
        <iframe
          src={urlEmbed}
          title="Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (tipo === 'tiktok') {
    return (
      <div className="embed-wrapper embed-wrapper--tiktok">
        <iframe
          src={urlEmbed}
          title="TikTok"
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    )
  }

  if (tipo === 'pdf') {
    return (
      <div className="pdf-link-box">
        <div className="pdf-icon">📄</div>
        <p>Este recurso es un PDF alojado externamente.</p>
        <a
          href={urlArchivo}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Abrir PDF
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
