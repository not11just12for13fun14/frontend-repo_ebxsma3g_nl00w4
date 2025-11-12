import { useState } from 'react'
import { Brain, Heart, MessageSquare, History as HistoryIcon } from 'lucide-react'
import Hero from './components/Hero'
import ChatUI from './components/ChatUI'
import History from './components/History'

function App() {
  const [tab, setTab] = useState('chat')

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1226] via-[#111] to-[#1a1440] text-white">
      <header className="sticky top-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-fuchsia-500 via-sky-500 to-amber-400" />
            <span className="font-semibold tracking-tight text-sm md:text-base">MinSplit</span>
          </div>
          <nav className="flex items-center gap-1">
            <button onClick={() => setTab('chat')} className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors hover:bg-white/10 ${tab==='chat'?'bg-white/10':''}`}><MessageSquare size={16}/> Chat</button>
            <button onClick={() => setTab('history')} className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors hover:bg-white/10 ${tab==='history'?'bg-white/10':''}`}><HistoryIcon size={16}/> History</button>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        {/* Elevate the interactive section above any visual layers */}
        <section className="relative z-50 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mt-8 grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-rose-400/20 flex items-center justify-center border border-rose-200/30"><Heart className="text-rose-300" size={18}/></div>
                <div>
                  <div className="font-medium">Emotional</div>
                  <div className="text-white/70 text-xs">Values, feelings, motivation, relationships</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-sky-400/20 flex items-center justify-center border border-sky-200/30"><Brain className="text-sky-300" size={18}/></div>
                <div>
                  <div className="font-medium">Logical</div>
                  <div className="text-white/70 text-xs">Evidence, probabilities, reversibility, EV</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10">
            {tab === 'chat' ? <ChatUI /> : <History />}
          </div>
        </section>
      </main>

      <footer className="mt-12 py-8 text-center text-white/50 text-sm">
        Built with balance • MinSplit
      </footer>
    </div>
  )
}

export default App
