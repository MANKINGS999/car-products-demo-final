import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const ADDRESS = "AYANSH CAR DECOR, Bengaluru - Mumbai Hwy, Siddharth Nagar, Bavdhan, Pune, Maharashtra 411021";
const GMAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export default function MapEmbed() {
  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-border-subtle relative group min-h-[300px]">
      <iframe
        src={EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '300px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ayansh Car Decor — Bavdhan, Pune"
        className="absolute inset-0 w-full h-full"
      />

      <a
        href={GMAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 flex items-end justify-center pb-6"
        aria-label="Open in Google Maps"
      >
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-accent-primary text-white text-small font-semibold px-5 py-2.5 rounded-full shadow-glow-accent flex items-center gap-2"
        >
          <MapPin size={14} /> Open in Google Maps
        </motion.span>
      </a>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-bg-primary/90 backdrop-blur-sm border-t border-border-subtle px-3 py-2.5 flex items-center justify-between pointer-events-none">
        <div className="flex items-start gap-2 min-w-0">
          <MapPin size={13} className="text-accent-primary mt-0.5 flex-shrink-0" />
          <p className="text-[10px] sm:text-[11px] text-text-secondary leading-snug truncate">
            AYANSH CAR DECOR, Bengaluru - Mumbai Hwy, Siddharth Nagar, Bavdhan, Pune, Maharashtra 411021
          </p>
        </div>
        <a
          href={GMAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 flex-shrink-0 px-3 py-1.5 bg-accent-primary text-white text-[10px] font-bold rounded-full pointer-events-auto hover:opacity-90 transition-opacity uppercase tracking-wide"
        >
          Directions →
        </a>
      </div>
    </div>
  );
}
