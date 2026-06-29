import packageInfo from '../../package.json'

export default function Footer() {
  const year = new Date().getFullYear()
  const version = packageInfo.version

  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        Desarrollado por <strong>Encadenados</strong> · v{version} · © {year}
      </p>
    </footer>
  )
}
