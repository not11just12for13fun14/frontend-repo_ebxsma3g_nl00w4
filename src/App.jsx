import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Heart, MessageSquare, History as HistoryIcon } from 'lucide-react'
import Hero from './components/Hero'
import ChatUI from './components/ChatUI'
import History from './components/History'

function App() {
  const [tab, setTab] = useState('chat')

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1226] via-[#111] to-[#1a1440] text-white">
      <header className="sticky top-0 z-20 bg-transparent/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-fuchsia-500 via-sky-500 to-amber-400" />
            <span className="font-extrabold tracking-tight text-xl">MinSplit</span>
          </div>
          <nav className="flex items-center gap-2">
            <button onClick={() => setTab('chat')} className={`px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 ${tab==='chat'?'bg-white/10':''}`}><MessageSquare size={18}/> Chat</button>
            <button onClick={() => setTab('history')} className={`px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 ${tab==='history'?'bg-white/10':''}`}><HistoryIcon size={18}/> History</button>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <section className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-rose-400/20 flex items-center justify-center border border-rose-200/30"><Heart className="text-rose-300" size={20}/></div>
                <div>
                  <div className="font-semibold">Emotional</div>
                  <div className="text-white/70 text-sm">Values, feelings, motivation, relationships</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-sky-400/20 flex items-center justify-center border border-sky-200/30"><Brain className="text-sky-300" size={20}/></div>
                <div>
                  <div className="font-semibold">Logical</div>
                  <div className="text-white/70 text-sm">Evidence, probabilities, reversibility, EV</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            {tab === 'chat' ? <ChatUI /> : <History />}
          </div>
        </section>
      </main>

      <footer className="mt-12 py-10 text-center text-white/60">
        Built with balance • MinSplit
      </footer>
    </div>
  )
}

export default App
