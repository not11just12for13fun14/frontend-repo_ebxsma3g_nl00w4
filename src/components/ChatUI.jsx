import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const backend = import.meta.env.VITE_BACKEND_URL || ''

export default function ChatUI() {
  const [situation, setSituation] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [finalDecision, setFinalDecision] = useState('')
  const [error, setError] = useState('')
  const listRef = useRef(null)
  const endRef = useRef(null)

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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

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
            className="px-5 py-2.5 rounded-xl bg-white text-black font-medium shadow-sm hover:bg-white/90 active:scale-[0.99] transition disabled:opacity-60 min-w-[130px] text-sm"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span>Debating</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 0.9, repeatType: 'reverse' }}
                >…</motion.span>
              </div>
            ) : (
              'Start Debate'
            )}
          </button>
        </div>
      </form>

      <div ref={listRef} className="mt-8 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {messages.filter(m => m.role !== 'user').map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22, mass: 0.7 }}
              className={`rounded-2xl p-4 border ${m.role === 'emotional' ? 'bg-rose-400/10 border-rose-300/20' : m.role === 'logical' ? 'bg-sky-400/10 border-sky-300/20' : 'bg-amber-400/10 border-amber-300/20'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`h-1.5 w-1.5 rounded-full ${m.role === 'emotional' ? 'bg-rose-300' : m.role === 'logical' ? 'bg-sky-300' : 'bg-amber-300'}`}/>
                <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white/60">{m.role}</div>
              </div>
              <div className="text-white/90 leading-relaxed">{m.content}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-4 border border-white/10 bg-white/5"
          >
            <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white/60 mb-2">Debate in progress</div>
            <div className="flex items-center gap-2 text-white/80">
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="h-2 w-2 rounded-full bg-rose-300"/>
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="h-2 w-2 rounded-full bg-sky-300"/>
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="h-2 w-2 rounded-full bg-amber-300"/>
              <span className="ml-2">Weighing options…</span>
            </div>
          </motion.div>
        )}

        {finalDecision && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="rounded-2xl p-5 bg-emerald-400/10 border border-emerald-300/20"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: [0.95, 1.02, 1] }}
              transition={{ duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.18em] font-semibold text-emerald-200 mb-2"
            >
              Balanced Decision
            </motion.div>
            <div className="text-white leading-relaxed">{finalDecision}</div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  )
}
