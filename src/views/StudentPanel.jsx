import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../hooks/useAuth'
import Modal from '../components/Modal'

export default function StudentPanel() {
  const { user, userData } = useAuth()
  const [consignas, setConsignas] = useState([])
  const [entregas, setEntregas] = useState([]) // entregas del alumno
  const [loading, setLoading] = useState(true)
  const [modalConsigna, setModalConsigna] = useState(null) // consigna para entregar
  const [formContenido, setFormContenido] = useState('')
  const [formUrl, setFormUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [mensaje, setMensaje] = useState('')

  async function cargar() {
    if (!userData?.curso) { setLoading(false); return }
    const [consSnap, entSnap] = await Promise.all([
      getDocs(query(collection(db, 'consignas'), where('curso', '==', userData.curso))),
      getDocs(query(collection(db, 'entregas'), where('alumnoId', '==', user.uid))),
    ])
    setConsignas(consSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) =>
      b.fechaCreacion?.seconds - a.fechaCreacion?.seconds
    ))
    setEntregas(entSnap.docs.map(d => ({ id: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => { cargar() }, [userData])

  function getEntregaParaConsigna(consignaId) {
    return entregas.find(e => e.consignaId === consignaId)
  }

  function openModal(consigna) {
    const entrega = getEntregaParaConsigna(consigna.id)
    setFormContenido(entrega?.contenido || '')
    setFormUrl(entrega?.urlArchivo || '')
    setModalConsigna(consigna)
    setMensaje('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    const entregaExistente = getEntregaParaConsigna(modalConsigna.id)
    try {
      if (entregaExistente) {
        await updateDoc(doc(db, 'entregas', entregaExistente.id), {
          contenido: formContenido,
          urlArchivo: formUrl,
          fechaEntrega: serverTimestamp(),
        })
      } else {
        await addDoc(collection(db, 'entregas'), {
          consignaId: modalConsigna.id,
          alumnoId: user.uid,
          alumnoNombre: userData.nombre || user.email,
          contenido: formContenido,
          urlArchivo: formUrl,
          fechaEntrega: serverTimestamp(),
        })
      }
      setMensaje('¡Entrega guardada!')
      await cargar()
      setTimeout(() => setModalConsigna(null), 1000)
    } catch (err) {
      setMensaje('Error al guardar: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="loading-state">Cargando...</div>

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Mis tareas</h1>
        {userData?.nombre && <p>Hola, <strong>{userData.nombre}</strong> — Curso: {userData.curso}</p>}
      </div>

      {!userData?.curso ? (
        <div className="empty-state">
          <h3>Perfil incompleto</h3>
          <p>Tu perfil no tiene curso asignado. Contactá al docente.</p>
        </div>
      ) : consignas.length === 0 ? (
        <div className="empty-state">
          <h3>Sin consignas por ahora</h3>
          <p>Cuando el docente publique una tarea para tu curso, aparecerá aquí.</p>
        </div>
      ) : (
        <div className="consignas-list">
          {consignas.map(c => {
            const entrega = getEntregaParaConsigna(c.id)
            const entregada = !!entrega
            const fechaLimite = c.fechaLimite?.toDate?.()
            const vencida = fechaLimite && fechaLimite < new Date() && !entregada

            return (
              <div key={c.id} className={`consigna-item card ${vencida ? 'consigna-item--vencida' : ''}`}>
                <div className="consigna-item__header">
                  <div>
                    <h3 className="consigna-item__title">{c.titulo}</h3>
                    {fechaLimite && (
                      <p className="consigna-item__fecha">
                        Fecha límite: {fechaLimite.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        {vencida && <span className="badge-vencida"> (vencida)</span>}
                      </p>
                    )}
                  </div>
                  <span className={`estado-badge ${entregada ? 'estado-badge--entregada' : 'estado-badge--pendiente'}`}>
                    {entregada ? '✓ Entregada' : 'Pendiente'}
                  </span>
                </div>
                <p className="consigna-item__desc">{c.descripcion}</p>
                {entrega && (
                  <div className="entrega-preview">
                    <p className="entrega-preview__label">Tu entrega:</p>
                    <p className="entrega-preview__text">{entrega.contenido?.slice(0, 200)}{entrega.contenido?.length > 200 ? '...' : ''}</p>
                    {entrega.urlArchivo && (
                      <a href={entrega.urlArchivo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                        Ver archivo adjunto
                      </a>
                    )}
                  </div>
                )}
                <button className="btn btn-primary btn-sm" onClick={() => openModal(c)}>
                  {entregada ? 'Editar entrega' : 'Entregar'}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {modalConsigna && (
        <Modal
          title={getEntregaParaConsigna(modalConsigna.id) ? 'Editar entrega' : 'Entregar tarea'}
          onClose={() => setModalConsigna(null)}
          wide
        >
          <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-2)' }}>
            {modalConsigna.titulo}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            {modalConsigna.descripcion}
          </p>

          {mensaje && (
            <div className={`alert ${mensaje.startsWith('Error') ? 'alert-error' : 'alert-success'}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tu respuesta</label>
              <textarea
                className="form-control"
                rows={6}
                value={formContenido}
                onChange={e => setFormContenido(e.target.value)}
                placeholder="Escribí tu respuesta aquí..."
              />
            </div>
            <div className="form-group">
              <label>Link a archivo (opcional)</label>
              <input
                type="url"
                className="form-control"
                value={formUrl}
                onChange={e => setFormUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setModalConsigna(null)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Guardando...' : 'Guardar entrega'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
