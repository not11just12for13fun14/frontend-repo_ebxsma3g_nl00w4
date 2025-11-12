import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative isolate z-0 h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Make the Spline animation cover the entire viewport and ignore pointer events */}
      <div className="absolute inset-0 pointer-events-none">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
      </div>
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-400 via-sky-400 to-amber-300 drop-shadow-sm">MinSplit</h1>
        <p className="mt-4 text-lg md:text-xl text-white/90">Two minds. One balanced decision. Emotional vs Logical — a playful debate that guides you to clarity.</p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </section>
  )
}
