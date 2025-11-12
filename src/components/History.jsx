import { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || ''

export default function History() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(null)
  const [detail, setDetail] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const load = async () => {
    try {
      const res = await fetch(`${backend}/api/conversations`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) { console.error(e) }
  }

  useEffect(() => { load() }, [])

  const open = async (id) => {
    setActive(id)
    setDetail(null)
    try {
      const res = await fetch(`${backend}/api/conversations/${id}`)
      const data = await res.json()
      setDetail(data)
    } catch (e) { console.error(e) }
  }

  const del = async (id) => {
    if (!confirm('Delete this conversation?')) return
    setDeleting(id)
    try {
      const res = await fetch(`${backend}/api/conversations/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      if (active === id) {
        setActive(null)
        setDetail(null)
      }
      await load()
    } catch (e) { console.error(e) }
    finally { setDeleting(null) }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h3 className="text-2xl font-bold mb-4">Previous Debates</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3">
          {items.map((it) => (
            <div key={it.id} className={`w-full text-left p-4 rounded-xl border shadow-sm bg-white/70 ${active===it.id?'ring-2 ring-sky-400':''}`}>
              <button onClick={() => open(it.id)} className="block w-full text-left">
                <div className="text-sm text-gray-500">{new Date(it.created_at || Date.now()).toLocaleString()}</div>
                <div className="font-medium text-gray-800 line-clamp-2">{it.situation}</div>
                <div className="mt-1 flex gap-2 flex-wrap">{(it.tags||[]).map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">{t}</span>)}</div>
              </button>
              <div className="mt-2 flex justify-end">
                <button onClick={() => del(it.id)} className="text-xs px-2 py-1 rounded-md bg-rose-100 text-rose-700 hover:bg-rose-200 disabled:opacity-60" disabled={deleting===it.id}>
                  {deleting===it.id ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-2">
          {!detail && (<div className="text-gray-500">Select a conversation to view details.</div>)}
          {detail && (
            <div className="space-y-4">
              <div className="rounded-xl p-4 bg-white/70 border shadow">
                <div className="text-xs text-gray-500">Situation</div>
                <div className="font-semibold text-gray-900">{detail.situation}</div>
              </div>
              {(detail.messages||[]).filter(m => m.role !== 'user').map((m, idx) => (
                <div key={idx} className={`rounded-xl p-4 border shadow-sm ${m.role==='emotional'?'bg-rose-50/70 border-rose-100': m.role==='logical'?'bg-sky-50/70 border-sky-100':'bg-amber-50/70 border-amber-100'}`}>
                  <div className="text-xs uppercase tracking-wide font-semibold text-gray-500 mb-1">{m.role}</div>
                  <div className="text-gray-800">{m.content}</div>
                </div>
              ))}
              {detail.final_decision && (
                <div className="rounded-xl p-5 bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-100 shadow">
                  <div className="text-xs uppercase tracking-wide font-semibold text-emerald-700 mb-2">Balanced Decision</div>
                  <div className="text-gray-900 leading-relaxed">{detail.final_decision}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
