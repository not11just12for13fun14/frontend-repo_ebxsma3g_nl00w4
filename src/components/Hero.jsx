import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <section ref={ref} className="relative isolate z-0 h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Make the Spline animation cover the entire viewport and ignore pointer events */}
      <div className="absolute inset-0 pointer-events-none">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
      </div>
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="font-ocean text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-300 via-sky-300 to-amber-200 drop-shadow-sm select-none"
        >
          Mindsplit
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-4 text-lg md:text-xl text-white/90"
        >
          Two minds. One balanced decision. Emotional vs Logical — a playful debate that guides you to clarity.
        </motion.p>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </section>
  )
}
