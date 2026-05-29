import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WA_GENERAL } from '../../lib/whatsapp';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-purple-900/20 to-bg-primary z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/30 via-transparent to-purple-600/30 z-10" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-primary/30 to-purple-500/30 rounded-full blur-3xl z-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-pink-500/20 rounded-full blur-3xl z-10"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <img
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=2600"
          alt="Luxury Car Interior"
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2600"; }}
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-20 text-center px-6 max-w-7xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="text-small uppercase tracking-[0.2em] bg-gradient-to-r from-text-secondary via-purple-300 to-pink-300 bg-clip-text text-transparent font-medium">
            Pune's Premier Automotive Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-display font-bold tracking-tight text-white mb-6 sm:mb-8 max-w-5xl"
        >
          Precision.<br />Performance.<br />
          <span className="bg-gradient-to-r from-accent-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Perfection.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-body text-text-secondary font-light max-w-2xl mb-8 sm:mb-12 px-2"
        >
          Elevate your vehicle with handcrafted interiors, precision audio engineering,
          and meticulous detailing that transforms every drive into an experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link to="/services" className="text-center px-8 py-4 bg-gradient-to-r from-accent-primary to-purple-600 text-white rounded-full font-medium text-body transition-all duration-premium hover:shadow-glow-accent-strong hover:scale-[1.02] active:scale-[0.98]">
            Explore Our Work
          </Link>
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-8 py-4 bg-white/5 backdrop-blur-sm border border-border-subtle text-white rounded-full font-medium text-body transition-all duration-premium hover:bg-white/10 hover:border-border-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Consultation
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-small uppercase tracking-[0.2em] text-text-tertiary">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-text-tertiary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
