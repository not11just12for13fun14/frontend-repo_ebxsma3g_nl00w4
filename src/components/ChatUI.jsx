import { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || ''

export default function ChatUI() {
  const [situation, setSituation] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [finalDecision, setFinalDecision] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!situation.trim()) return
    setLoading(true)
    setMessages([])
    setFinalDecision('')
    try {
      const res = await fetch(`${backend}/api/debate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation })
      })
      const data = await res.json()
      setMessages(data.messages || [])
      setFinalDecision(data.final_decision || data.finalDecision || '')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <form onSubmit={submit} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-white/40">
        <label className="block text-sm font-medium text-gray-700">Describe your situation</label>
        <textarea
          className="mt-2 w-full rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent min-h-[120px]"
          placeholder="e.g., I got a new job offer but it requires moving to another city..."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        />
        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 via-sky-500 to-amber-400 text-white font-semibold shadow hover:opacity-95 disabled:opacity-60"
          >
            {loading ? 'Debating...' : 'Start Debate'}
          </button>
        </div>
      </form>

      {messages.length > 0 && (
        <div className="mt-8 space-y-4">
          {messages.filter(m => m.role !== 'user').map((m, idx) => (
            <div key={idx} className={`rounded-2xl p-4 shadow-sm border ${m.role === 'emotional' ? 'bg-rose-50/70 border-rose-100' : m.role === 'logical' ? 'bg-sky-50/70 border-sky-100' : 'bg-amber-50/70 border-amber-100'}`}>
              <div className="text-xs uppercase tracking-wide font-semibold text-gray-500 mb-1">{m.role}</div>
              <div className="text-gray-800 leading-relaxed">{m.content}</div>
            </div>
          ))}

          {finalDecision && (
            <div className="rounded-2xl p-5 bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-100 shadow">
              <div className="text-xs uppercase tracking-wide font-semibold text-emerald-700 mb-2">Balanced Decision</div>
              <div className="text-gray-900 leading-relaxed">{finalDecision}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
