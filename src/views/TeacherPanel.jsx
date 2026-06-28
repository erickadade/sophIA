import { useState, useEffect } from 'react'
import {
  collection, getDocs, addDoc, setDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy
} from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '../lib/firebase'
import { seedDatabase } from '../lib/seedData'
import Modal from '../components/Modal'

const TABS = ['Autores', 'Recursos', 'Consignas', 'Entregas', 'Alumnos']
const PERIODOS = ['Antigüedad', 'Medieval', 'Moderna', 'Contemporánea']
const TIPOS_RECURSO = ['texto', 'pdf', 'video', 'tiktok', 'instagram', 'facebook', 'imagen']
const CURSOS = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B']

export default function TeacherPanel() {
  const [tab, setTab] = useState('Autores')
  const [autores, setAutores] = useState([])
  const [recursos, setRecursos] = useState([])
  const [consignas, setConsignas] = useState([])
  const [entregas, setEntregas] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // { tipo, item }
  const [seedMsg, setSeedMsg] = useState('')
  const [seeding, setSeeding] = useState(false)
  const [entregaDetalle, setEntregaDetalle] = useState(null)

  async function cargar() {
    try {
      const [autSnap, recSnap, conSnap, entSnap, usrSnap] = await Promise.all([
        getDocs(collection(db, 'autores')),
        getDocs(collection(db, 'recursos')),
        getDocs(query(collection(db, 'consignas'), orderBy('fechaCreacion', 'desc'))),
        getDocs(query(collection(db, 'entregas'), orderBy('fechaEntrega', 'desc'))),
        getDocs(query(collection(db, 'usuarios'), orderBy('nombre'))),
      ])
      setAutores(autSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.nombre.localeCompare(b.nombre)))
      setRecursos(recSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.titulo.localeCompare(b.titulo)))
      setConsignas(conSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setEntregas(entSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setAlumnos(usrSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter(u => u.rol === 'alumno'))
    } catch (err) {
      console.error('Error al cargar datos:', err)
      alert('Error de permisos en Firestore. ¿Las reglas de seguridad están publicadas?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const openModal = (tipo, item = null) => setModal({ tipo, item })
  const closeModal = () => setModal(null)

  async function handleSeed() {
    setSeeding(true)
    setSeedMsg('')
    const result = await seedDatabase()
    setSeedMsg(result.message)
    setSeeding(false)
    if (result.ok) await cargar()
  }

  async function handleDelete(coleccion, id) {
    if (!confirm('¿Confirmar eliminación?')) return
    await deleteDoc(doc(db, coleccion, id))
    await cargar()
  }

  if (loading) return <div className="loading-state">Cargando...</div>

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Panel del docente</h1>
      </div>

      <div className="panel-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`panel-tab ${tab === t ? 'panel-tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── AUTORES ─────────────────────────────────────────── */}
      {tab === 'Autores' && (
        <div className="panel-section">
          <div className="panel-section__toolbar">
            <h2>Autores ({autores.length})</h2>
            <button className="btn btn-primary btn-sm" onClick={() => openModal('autor')}>
              + Nuevo autor
            </button>
          </div>
          <div className="panel-table-wrapper">
            <table className="panel-table">
              <thead><tr><th>Nombre</th><th>Período</th><th>Fechas</th><th>Orden</th><th></th></tr></thead>
              <tbody>
                {autores.map(a => (
                  <tr key={a.id}>
                    <td><strong>{a.nombre}</strong></td>
                    <td>{a.periodo}</td>
                    <td>{a.anioNacimiento} – {a.anioMuerte}</td>
                    <td>{a.ordenCronologico}</td>
                    <td className="table-actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => openModal('autor', a)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete('autores', a.id)}>Borrar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="seed-section">
            <button className="btn btn-ghost btn-sm" onClick={handleSeed} disabled={seeding}>
              {seeding ? 'Cargando...' : '⚡ Cargar datos de ejemplo'}
            </button>
            {seedMsg && <p className="seed-msg">{seedMsg}</p>}
          </div>
        </div>
      )}

      {/* ── RECURSOS ────────────────────────────────────────── */}
      {tab === 'Recursos' && (
        <div className="panel-section">
          <div className="panel-section__toolbar">
            <h2>Recursos ({recursos.length})</h2>
            <button className="btn btn-primary btn-sm" onClick={() => openModal('recurso')}>
              + Nuevo recurso
            </button>
          </div>
          <div className="panel-table-wrapper">
            <table className="panel-table">
              <thead><tr><th>Título</th><th>Tipo</th><th>Autor</th><th>Temas</th><th></th></tr></thead>
              <tbody>
                {recursos.map(r => {
                  const autorNombre = autores.find(a => a.id === r.autorId)?.nombre || r.autorId
                  return (
                    <tr key={r.id}>
                      <td>{r.titulo}</td>
                      <td><span className={`resource-type-badge tipo-${r.tipo}`}>{r.tipo}</span></td>
                      <td>{autorNombre}</td>
                      <td>{r.temas?.join(', ')}</td>
                      <td className="table-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => openModal('recurso', r)}>Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete('recursos', r.id)}>Borrar</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── CONSIGNAS ───────────────────────────────────────── */}
      {tab === 'Consignas' && (
        <div className="panel-section">
          <div className="panel-section__toolbar">
            <h2>Consignas ({consignas.length})</h2>
            <button className="btn btn-primary btn-sm" onClick={() => openModal('consigna')}>
              + Nueva consigna
            </button>
          </div>
          <div className="panel-table-wrapper">
            <table className="panel-table">
              <thead><tr><th>Título</th><th>Curso</th><th>Fecha límite</th><th></th></tr></thead>
              <tbody>
                {consignas.map(c => (
                  <tr key={c.id}>
                    <td><strong>{c.titulo}</strong><br/><small>{c.descripcion?.slice(0, 60)}...</small></td>
                    <td>{c.curso}</td>
                    <td>{c.fechaLimite?.toDate?.().toLocaleDateString('es-AR') || '—'}</td>
                    <td className="table-actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => openModal('consigna', c)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete('consignas', c.id)}>Borrar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── ENTREGAS ────────────────────────────────────────── */}
      {tab === 'Entregas' && (
        <div className="panel-section">
          <h2>Entregas ({entregas.length})</h2>
          <div className="panel-table-wrapper">
            <table className="panel-table">
              <thead><tr><th>Alumno</th><th>Consigna</th><th>Fecha</th><th></th></tr></thead>
              <tbody>
                {entregas.map(e => {
                  const consigna = consignas.find(c => c.id === e.consignaId)
                  return (
                    <tr key={e.id}>
                      <td>{e.alumnoNombre}</td>
                      <td>{consigna?.titulo || e.consignaId}</td>
                      <td>{e.fechaEntrega?.toDate?.().toLocaleDateString('es-AR') || '—'}</td>
                      <td>
                        <button className="btn btn-ghost btn-sm" onClick={() => setEntregaDetalle(e)}>
                          Ver
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── ALUMNOS ─────────────────────────────────────────── */}
      {tab === 'Alumnos' && (
        <div className="panel-section">
          <div className="panel-section__toolbar">
            <h2>Alumnos ({alumnos.length})</h2>
            <button className="btn btn-primary btn-sm" onClick={() => openModal('alumno')}>
              + Crear alumno
            </button>
          </div>
          <div className="panel-table-wrapper">
            <table className="panel-table">
              <thead><tr><th>Nombre</th><th>Email (uid)</th><th>Curso</th></tr></thead>
              <tbody>
                {alumnos.map(a => (
                  <tr key={a.id}>
                    <td>{a.nombre}</td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{a.id}</td>
                    <td>{a.curso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── MODALES ─────────────────────────────────────────── */}
      {modal?.tipo === 'autor' && (
        <AutorModal
          item={modal.item}
          onClose={closeModal}
          onSaved={() => { closeModal(); cargar() }}
        />
      )}
      {modal?.tipo === 'recurso' && (
        <RecursoModal
          item={modal.item}
          autores={autores}
          recursos={recursos}
          onClose={closeModal}
          onSaved={() => { closeModal(); cargar() }}
        />
      )}
      {modal?.tipo === 'consigna' && (
        <ConsignaModal
          item={modal.item}
          recursos={recursos}
          onClose={closeModal}
          onSaved={() => { closeModal(); cargar() }}
        />
      )}
      {modal?.tipo === 'alumno' && (
        <AlumnoModal
          onClose={closeModal}
          onSaved={() => { closeModal(); cargar() }}
        />
      )}
      {entregaDetalle && (
        <Modal title="Entrega del alumno" onClose={() => setEntregaDetalle(null)} wide>
          <p><strong>Alumno:</strong> {entregaDetalle.alumnoNombre}</p>
          <p><strong>Fecha:</strong> {entregaDetalle.fechaEntrega?.toDate?.().toLocaleString('es-AR')}</p>
          <hr style={{ margin: 'var(--space-4) 0', borderColor: 'var(--border-subtle)' }} />
          <p style={{ whiteSpace: 'pre-wrap' }}>{entregaDetalle.contenido}</p>
          {entregaDetalle.urlArchivo && (
            <a href={entregaDetalle.urlArchivo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ marginTop: 'var(--space-4)' }}>
              Ver archivo adjunto
            </a>
          )}
        </Modal>
      )}
    </div>
  )
}

// ── Sub-componentes de formulario ────────────────────────────

function AutorModal({ item, onClose, onSaved }) {
  const [form, setForm] = useState({
    nombre: item?.nombre || '',
    periodo: item?.periodo || 'Antigüedad',
    anioNacimiento: item?.anioNacimiento || '',
    anioMuerte: item?.anioMuerte || '',
    bio: item?.bio || '',
    ordenCronologico: item?.ordenCronologico ?? 1,
  })
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const data = { ...form, ordenCronologico: Number(form.ordenCronologico) }
    try {
      if (item?.id) {
        await updateDoc(doc(db, 'autores', item.id), data)
      } else {
        await addDoc(collection(db, 'autores'), data)
      }
      onSaved()
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title={item ? 'Editar autor' : 'Nuevo autor'} onClose={onClose} wide>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input className="form-control" value={form.nombre} onChange={e => set('nombre', e.target.value)} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Período</label>
            <select className="form-control" value={form.periodo} onChange={e => set('periodo', e.target.value)}>
              {PERIODOS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Orden cronológico</label>
            <input type="number" className="form-control" value={form.ordenCronologico} onChange={e => set('ordenCronologico', e.target.value)} min={1} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Año nacimiento</label>
            <input className="form-control" value={form.anioNacimiento} onChange={e => set('anioNacimiento', e.target.value)} placeholder="ej: 470 a.C." />
          </div>
          <div className="form-group">
            <label>Año muerte</label>
            <input className="form-control" value={form.anioMuerte} onChange={e => set('anioMuerte', e.target.value)} placeholder="ej: 399 a.C." />
          </div>
        </div>
        <div className="form-group">
          <label>Biografía</label>
          <textarea className="form-control" value={form.bio} onChange={e => set('bio', e.target.value)} rows={5} />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </form>
    </Modal>
  )
}

function RecursoModal({ item, autores, recursos, onClose, onSaved }) {
  const [form, setForm] = useState({
    tipo: item?.tipo || 'texto',
    titulo: item?.titulo || '',
    autorId: item?.autorId || autores[0]?.id || '',
    temas: item?.temas?.join(', ') || '',
    contenidoTexto: item?.contenidoTexto || '',
    urlArchivo: item?.urlArchivo || '',
    urlEmbed: item?.urlEmbed || '',
    relacionados: item?.relacionados || [],
  })
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const toggleRelacionado = (rid) => {
    setForm(f => ({
      ...f,
      relacionados: f.relacionados.includes(rid)
        ? f.relacionados.filter(r => r !== rid)
        : [...f.relacionados, rid],
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const data = {
      ...form,
      temas: form.temas.split(',').map(t => t.trim().toLowerCase()).filter(Boolean),
    }
    try {
      if (item?.id) {
        await updateDoc(doc(db, 'recursos', item.id), data)
      } else {
        await addDoc(collection(db, 'recursos'), data)
      }
      onSaved()
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const otrosRecursos = recursos.filter(r => r.id !== item?.id)

  return (
    <Modal title={item ? 'Editar recurso' : 'Nuevo recurso'} onClose={onClose} wide>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Tipo</label>
            <select className="form-control" value={form.tipo} onChange={e => set('tipo', e.target.value)}>
              {TIPOS_RECURSO.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: 3 }}>
            <label>Título</label>
            <input className="form-control" value={form.titulo} onChange={e => set('titulo', e.target.value)} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Autor</label>
            <select className="form-control" value={form.autorId} onChange={e => set('autorId', e.target.value)}>
              {autores.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: 2 }}>
            <label>Temas (separados por coma)</label>
            <input className="form-control" value={form.temas} onChange={e => set('temas', e.target.value)} placeholder="amor, ética, libertad" />
          </div>
        </div>

        {form.tipo === 'texto' && (
          <div className="form-group">
            <label>Contenido del texto</label>
            <textarea className="form-control" value={form.contenidoTexto} onChange={e => set('contenidoTexto', e.target.value)} rows={8} />
          </div>
        )}
        {(form.tipo === 'pdf' || form.tipo === 'imagen') && (
          <div className="form-group">
            <label>URL del archivo (link externo — Google Drive, etc.)</label>
            <input type="url" className="form-control" value={form.urlArchivo} onChange={e => set('urlArchivo', e.target.value)} placeholder="https://drive.google.com/..." />
          </div>
        )}
        {(form.tipo === 'video' || form.tipo === 'tiktok' || form.tipo === 'instagram' || form.tipo === 'facebook') && (
          <div className="form-group">
            <label>URL de embed ({
              form.tipo === 'video' ? 'ej: https://www.youtube.com/embed/...' :
              form.tipo === 'tiktok' ? 'ej: https://www.tiktok.com/embed/v2/...' :
              form.tipo === 'instagram' ? 'ej: https://www.instagram.com/reel/.../embed' :
              'ej: código de embed de Facebook Video/Page Plugin'
            })</label>
            <input type="url" className="form-control" value={form.urlEmbed} onChange={e => set('urlEmbed', e.target.value)} />
          </div>
        )}

        {otrosRecursos.length > 0 && (
          <div className="form-group">
            <label>Recursos relacionados</label>
            <div className="relacionados-list">
              {otrosRecursos.map(r => (
                <label key={r.id} className="relacionado-item">
                  <input
                    type="checkbox"
                    checked={form.relacionados.includes(r.id)}
                    onChange={() => toggleRelacionado(r.id)}
                  />
                  <span>{r.titulo}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </form>
    </Modal>
  )
}

function ConsignaModal({ item, recursos, onClose, onSaved }) {
  const [form, setForm] = useState({
    titulo: item?.titulo || '',
    descripcion: item?.descripcion || '',
    curso: item?.curso || CURSOS[0],
    recursoVinculadoId: item?.recursoVinculadoId || '',
    fechaLimite: item?.fechaLimite?.toDate?.().toISOString().split('T')[0] || '',
  })
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const data = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      curso: form.curso,
      recursoVinculadoId: form.recursoVinculadoId || null,
      fechaLimite: form.fechaLimite ? new Date(form.fechaLimite + 'T23:59:59') : null,
    }
    try {
      if (item?.id) {
        await updateDoc(doc(db, 'consignas', item.id), data)
      } else {
        await addDoc(collection(db, 'consignas'), { ...data, fechaCreacion: serverTimestamp() })
      }
      onSaved()
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title={item ? 'Editar consigna' : 'Nueva consigna'} onClose={onClose} wide>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input className="form-control" value={form.titulo} onChange={e => set('titulo', e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Descripción / enunciado</label>
          <textarea className="form-control" value={form.descripcion} onChange={e => set('descripcion', e.target.value)} rows={4} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Curso</label>
            <select className="form-control" value={form.curso} onChange={e => set('curso', e.target.value)}>
              {CURSOS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Fecha límite</label>
            <input type="date" className="form-control" value={form.fechaLimite} onChange={e => set('fechaLimite', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Recurso vinculado (opcional)</label>
          <select className="form-control" value={form.recursoVinculadoId} onChange={e => set('recursoVinculadoId', e.target.value)}>
            <option value="">— Ninguno —</option>
            {recursos.map(r => <option key={r.id} value={r.id}>{r.titulo}</option>)}
          </select>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </form>
    </Modal>
  )
}

function AlumnoModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', curso: CURSOS[0] })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await setDoc(doc(db, 'usuarios', cred.user.uid), {
        nombre: form.nombre,
        rol: 'alumno',
        curso: form.curso,
      })
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title="Crear alumno" onClose={onClose}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)', fontSize: 'var(--text-sm)' }}>
        Esto crea una cuenta en Firebase Authentication y el perfil del alumno.
      </p>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre completo</label>
          <input className="form-control" value={form.nombre} onChange={e => set('nombre', e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={form.email} onChange={e => set('email', e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contraseña provisional</label>
          <input type="password" className="form-control" value={form.password} onChange={e => set('password', e.target.value)} required minLength={6} />
        </div>
        <div className="form-group">
          <label>Curso</label>
          <select className="form-control" value={form.curso} onChange={e => set('curso', e.target.value)}>
            {CURSOS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Creando...' : 'Crear alumno'}</button>
        </div>
      </form>
    </Modal>
  )
}
