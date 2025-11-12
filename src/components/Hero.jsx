import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax for hero copy
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  // Shape swap on scroll
  const circleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0])
  const circleScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9])

  const altOpacity = useTransform(scrollYProgress, [0.2, 0.4, 1], [0, 1, 1])
  const altRotate = useTransform(scrollYProgress, [0.2, 1], [0, 12])
  const altScale = useTransform(scrollYProgress, [0.2, 1], [0.9, 1])

  return (
    <section ref={ref} className="relative isolate z-0 min-h-[100svh] w-full overflow-hidden flex items-center justify-center">
      {/* Background 3D scene */}
      <div className="absolute inset-0 pointer-events-none">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
      </div>

      {/* Centerpiece shape that changes as you scroll */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Circle state (initial) */}
        <motion.div
          style={{ opacity: circleOpacity, scale: circleScale }}
          className="h-36 w-36 sm:h-44 sm:w-44 md:h-56 md:w-56 rounded-full bg-gradient-to-br from-fuchsia-400/60 via-sky-400/60 to-amber-300/60 blur-xl shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        />
        {/* Alternate state (after scroll): rotated rounded-diamond */}
        <motion.div
          style={{ opacity: altOpacity, rotate: altRotate, scale: altScale }}
          className="absolute h-36 w-36 sm:h-44 sm:w-44 md:h-56 md:w-56 rounded-2xl bg-gradient-to-tr from-emerald-400/60 via-cyan-400/60 to-violet-400/60 blur-xl shadow-[0_0_50px_rgba(0,0,0,0.2)]"
        />
      </div>

      {/* Copy */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-5 sm:px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="font-ocean text-[44px] sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-300 via-sky-300 to-amber-200 drop-shadow-sm select-none"
        >
          Mindsplit
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white/90 px-1"
        >
          Two minds. One balanced decision. Emotional vs Logical — a playful debate that guides you to clarity.
        </motion.p>
      </motion.div>

      {/* Bottom gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </section>
  )
}
