import { useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || ''

export default function ChatUI() {
  const [situation, setSituation] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [finalDecision, setFinalDecision] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!situation.trim()) return
    setLoading(true)
    setMessages([])
    setFinalDecision('')
    setError('')
    try {
      const res = await fetch(`${backend}/api/debate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation })
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setMessages(data.messages || [])
      setFinalDecision(data.final_decision || data.finalDecision || '')
    } catch (e) {
      console.error(e)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pointer-events-auto relative z-[60] max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <form onSubmit={submit} className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-5 shadow-[0_8px_30px_rgb(0_0_0/0.25)]">
        <label className="block text-xs uppercase tracking-wide text-white/60">Describe your situation</label>
        <textarea
          className="mt-2 w-full rounded-xl bg-white/5 text-white placeholder-white/50 border border-white/10 p-4 focus:outline-none focus:ring-2 focus:ring-sky-400/70 focus:border-transparent min-h-[120px] pointer-events-auto"
          placeholder="e.g., I got a new job offer but it requires moving to another city..."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        />
        <div className="mt-4 flex items-center justify-between gap-3">
          {error && <span className="text-rose-300 text-sm">{error}</span>}
          <div className="flex-1" />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-medium shadow-sm hover:bg-white/90 active:scale-[0.99] transition disabled:opacity-60"
          >
            {loading ? 'Debating…' : 'Start Debate'}
          </button>
        </div>
      </form>

      {messages.length > 0 && (
        <div className="mt-8 space-y-4">
          {messages.filter(m => m.role !== 'user').map((m, idx) => (
            <div key={idx} className={`rounded-2xl p-4 border ${m.role === 'emotional' ? 'bg-rose-400/10 border-rose-300/20' : m.role === 'logical' ? 'bg-sky-400/10 border-sky-300/20' : 'bg-amber-400/10 border-amber-300/20'}`}>
              <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white/60 mb-1">{m.role}</div>
              <div className="text-white/90 leading-relaxed">{m.content}</div>
            </div>
          ))}

          {finalDecision && (
            <div className="rounded-2xl p-5 bg-emerald-400/10 border border-emerald-300/20">
              <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-emerald-200 mb-2">Balanced Decision</div>
              <div className="text-white leading-relaxed">{finalDecision}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
