export default function SplashScreen({ visible }) {
  return (
    <div className={`splash-screen${visible ? '' : ' splash-screen--fading'}`}>
      <div className="splash-content">
        <img src="/sophia-iso.svg" alt="sophIA" className="splash-logo" />
        <p className="splash-wordmark">
          soph<span className="splash-ia">IA</span>
        </p>
      </div>
    </div>
  )
}
