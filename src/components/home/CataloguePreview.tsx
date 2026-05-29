import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../lib/useProducts';

const FALLBACK = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800";

const gradients = [
  "from-amber-500/20 to-orange-500/20",
  "from-blue-500/20 to-cyan-500/20",
  "from-emerald-500/20 to-teal-500/20",
  "from-purple-500/20 to-pink-500/20",
];

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border-subtle bg-surface animate-pulse">
      <div className="aspect-[4/5] bg-bg-secondary" />
      <div className="p-5 space-y-2">
        <div className="h-3 bg-bg-secondary rounded w-1/3" />
        <div className="h-4 bg-bg-secondary rounded w-2/3" />
      </div>
    </div>
  );
}

export default function CataloguePreview() {
  const { products, status } = useProducts();
  const preview = products.slice(0, 4);

  // Don't render section at all if sheet is unconfigured
  if (status === 'unconfigured') return null;

  return (
    <section className="py-12 sm:py-3xl lg:py-4xl bg-gradient-to-b from-bg-secondary to-bg-primary relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-accent-primary/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500/8 to-pink-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2xl"
        >
          <span className="text-small uppercase tracking-[0.2em] text-text-tertiary font-medium mb-4 block">
            Our Catalogue
          </span>
          <h2 className="text-h2 lg:text-h1 font-display font-bold text-white mb-6">
            Explore Our<br />
            <span className="text-gradient">Premium Range</span>
          </h2>
          <p className="text-body text-text-secondary font-light max-w-xl">
            From luxury interiors to high-fidelity audio and paint protection — a glimpse into the collections we offer.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {status === 'loading' && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

          {(status === 'success' || status === 'error') && preview.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group relative bg-gradient-to-br from-surface to-bg-secondary rounded-2xl overflow-hidden border border-border-subtle hover:border-border-medium transition-all duration-premium hover:shadow-elevation-md"
            >
              {/* Badge */}
              {item.badge && (
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-accent-primary text-white text-[11px] font-medium rounded-full tracking-wide">
                  {item.badge}
                </div>
              )}

              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={item.image || FALLBACK}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => { e.currentTarget.src = FALLBACK; }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${gradients[i % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-premium`} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-70" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-premium">
                  <span className="text-[11px] uppercase tracking-wider text-accent-primary font-medium block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-body font-display font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-premium delay-75">
                    <span className="text-small font-medium text-purple-200 truncate pr-2">
                      {item.brands.join(', ')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-accent-primary to-purple-600 text-white rounded-full font-medium text-body hover:opacity-90 hover:scale-[1.03] transition-all duration-premium shadow-glow-accent group"
          >
            View Full Catalogue
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
