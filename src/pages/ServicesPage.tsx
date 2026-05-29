import { useState, useRef } from 'react';
import { WA_GENERAL } from '../lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Shield, Award, Palette, Volume2, Star, Wrench, ChevronRight, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: "Bespoke Leather Interiors",
    description: "Handcrafted premium leather upholstery for seats, door panels, dashboard, and steering wheel. We use Italian Nappa leather, Alcantara, and other exotic materials with custom stitching patterns.",
    gradient: "from-amber-500 to-orange-600",
    color: "#f59e0b",
    features: ["Italian Nappa Leather", "Diamond Stitching", "Custom Colour Matching", "Seat Covers & Full Interior"],
    tag: "Most Popular",
  },
  {
    icon: Zap,
    title: "Flagship Audio Systems",
    description: "High-fidelity sound systems with acoustic tuning, custom A-pillar fabrication, and component-level installation for audiophile-grade listening in your car.",
    gradient: "from-blue-500 to-cyan-600",
    color: "#3b82f6",
    features: ["JBL / Focal / Hertz Brands", "Custom A-Pillar Pods", "Acoustic Treatment", "DSP Tuning"],
    tag: null,
  },
  {
    icon: Shield,
    title: "Paint Protection Film (PPF)",
    description: "Premium self-healing PPF and ceramic coating that shields your vehicle's paint from scratches, UV rays, and environmental damage — with warranty options.",
    gradient: "from-emerald-500 to-teal-600",
    color: "#10b981",
    features: ["Self-Healing Film", "Gloss & Matte Finish", "Garware / 3M Brands", "Lifetime Warranty Options"],
    tag: null,
  },
  {
    icon: Award,
    title: "Precision Detailing",
    description: "Multi-stage paint correction, machine polishing, and professional detailing to restore your vehicle to showroom condition or better.",
    gradient: "from-purple-500 to-pink-600",
    color: "#a855f7",
    features: ["Paint Correction", "Machine Polishing", "Interior Detailing", "Engine Bay Cleaning"],
    tag: null,
  },
  {
    icon: Palette,
    title: "Ambient Lighting",
    description: "Multi-zone RGB ambient lighting with app-controlled scenes. Transform your cabin atmosphere with millions of colour combinations.",
    gradient: "from-rose-500 to-pink-600",
    color: "#f43f5e",
    features: ["Multi-Zone RGB", "App Controlled", "OEM Integration", "Custom Profiles"],
    tag: null,
  },
  {
    icon: Volume2,
    title: "Subwoofer & Bass Setup",
    description: "Custom subwoofer enclosures built to fit your boot perfectly, with professional tuning for deep, distortion-free bass response.",
    gradient: "from-indigo-500 to-violet-600",
    color: "#6366f1",
    features: ["Custom Enclosures", "JL Audio / Rockford", "Boot Fitment", "Bass Tuning"],
    tag: null,
  },
  {
    icon: Star,
    title: "Ceramic Coating",
    description: "9H hardness nano-ceramic coating that permanently bonds to your paint, offering hydrophobic protection and a mirror-like gloss.",
    gradient: "from-yellow-500 to-amber-600",
    color: "#eab308",
    features: ["9H Hardness", "Hydrophobic Layer", "5-Year Warranty", "UV & Chemical Resistant"],
    tag: "Best Value",
  },
  {
    icon: Wrench,
    title: "Custom Fabrication",
    description: "One-of-a-kind custom work including roof liners, dashboard wraps, custom consoles, and any bespoke modification you can imagine.",
    gradient: "from-teal-500 to-cyan-600",
    color: "#14b8a6",
    features: ["Alcantara Roof Liner", "Dashboard Customisation", "Console Modification", "Any Custom Request"],
    tag: null,
  },
];

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ServicesPage() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const detailRef = useRef<HTMLDivElement>(null);

  const handleSelect = (i: number) => {
    setActive(i);
    // On mobile only: scroll the detail panel into view smoothly
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-accent-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-blue-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <section className="py-10 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-small uppercase tracking-[0.2em] text-text-tertiary font-medium mb-3 block">What We Offer</span>
          <h1 className="text-4xl sm:text-display font-display font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 sm:mb-6">
            Our Services
          </h1>
          <p className="text-sm sm:text-body text-text-secondary max-w-2xl mx-auto font-light px-2">
            From subtle upgrades to full transformations — every service is delivered with precision and passion.
          </p>
        </motion.div>

        {/* ── MOBILE: stacked layout — icon grid → detail panel ── */}
        {/* ── DESKTOP: side-by-side — list left, detail right ── */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

          {/* Service selector — horizontal scroll grid on mobile, vertical list on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-80 flex-shrink-0"
          >
            {/* Mobile: 2-col icon grid */}
            <div className="grid grid-cols-2 gap-2 lg:hidden">
              {services.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <button
                    key={s.title}
                    onClick={() => handleSelect(i)}
                    className={`relative flex flex-col items-center gap-2 px-3 py-4 rounded-xl text-center transition-all duration-300 border ${
                      isActive
                        ? 'bg-surface border-border-medium'
                        : 'border-border-subtle/50 bg-surface/30 active:bg-surface/70'
                    }`}
                  >
                    {isActive && (
                      <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-gradient-to-r ${s.gradient}`} />
                    )}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ background: isActive ? s.color + '33' : 'rgba(255,255,255,0.05)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isActive ? s.color : '#888' }} />
                    </div>
                    <span className={`text-[11px] font-medium leading-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-text-secondary'}`}>
                      {s.title}
                    </span>
                    {s.tag && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                        style={{ background: s.color + '22', color: s.color }}>
                        {s.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden lg:flex flex-col gap-2">
              {services.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <button
                    key={s.title}
                    onClick={() => setActive(i)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 relative group border ${
                      isActive
                        ? 'bg-surface border-border-medium'
                        : 'border-transparent hover:bg-surface/50 hover:border-border-subtle'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-gradient-to-b ${s.gradient}`}
                      />
                    )}
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ background: isActive ? s.color + '33' : 'transparent' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isActive ? s.color : '#888' }} />
                    </div>
                    <span className={`text-small font-medium transition-colors duration-300 flex-1 ${isActive ? 'text-white' : 'text-text-secondary group-hover:text-white'}`}>
                      {s.title}
                    </span>
                    {s.tag && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: s.color + '22', color: s.color }}>
                        {s.tag}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-4 h-4 text-text-tertiary flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Detail panel — shows below grid on mobile, to the right on desktop */}
          <div ref={detailRef} className="flex-1 scroll-mt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-gradient-to-br from-surface to-bg-secondary rounded-2xl border border-border-subtle overflow-hidden p-5 sm:p-8 lg:p-10"
              >
                <div className={`absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br ${current.gradient} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none`} />
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${current.gradient} opacity-60`} />

                <div className="relative z-10">
                  {/* Title row */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${current.gradient} p-3 sm:p-4 shadow-elevation-sm flex-shrink-0`}>
                      <current.icon className="w-full h-full text-white" />
                    </div>
                    <div className="min-w-0">
                      {current.tag && (
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 inline-block"
                          style={{ background: current.color + '22', color: current.color }}>
                          {current.tag}
                        </span>
                      )}
                      <h2 className="text-xl sm:text-h2 font-display font-bold text-white leading-tight">{current.title}</h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-body text-text-secondary font-light leading-relaxed mb-6 sm:mb-8">
                    {current.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mb-7 sm:mb-10">
                    {current.features.map(f => (
                      <div key={f} className="flex items-center gap-3 bg-bg-primary/50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-border-subtle">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: current.color }} />
                        <span className="text-[12px] sm:text-small text-text-secondary">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={WA_GENERAL}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-5 sm:px-7 py-3.5 sm:py-4 bg-[#25D366] text-white rounded-full text-sm sm:text-body font-medium hover:opacity-90 active:opacity-80 transition-all duration-premium group"
                  >
                    {WA_ICON}
                    Enquire on WhatsApp
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
