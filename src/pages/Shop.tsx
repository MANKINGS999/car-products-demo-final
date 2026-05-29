import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { ArrowUpRight, RefreshCw, AlertCircle, Loader2, TableProperties } from 'lucide-react';
import { waProduct, WA_CUSTOM } from '../lib/whatsapp';
import { useProducts } from '../lib/useProducts';
import { SHEET_ID } from '../lib/sheets.config';

const FALLBACK = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800";

const WA_SVG = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function Unconfigured() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center mb-6">
        <TableProperties className="w-8 h-8 text-accent-primary" />
      </div>
      <h2 className="text-h3 font-display font-bold text-white mb-3">Connect Your Google Sheet</h2>
      <p className="text-body text-text-secondary max-w-lg mb-8 font-light">
        Open <code className="text-accent-primary font-mono text-sm">src/lib/sheets.config.ts</code> and
        replace <code className="text-accent-primary font-mono text-sm">YOUR_GOOGLE_SHEET_ID_HERE</code> with
        your actual Sheet ID.
      </p>
      <div className="glass rounded-xl p-6 text-left max-w-xl w-full space-y-3 text-small text-text-secondary">
        <p className="font-medium text-white">Quick setup:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Open your Google Sheet → <strong>File → Share → Anyone with link → Viewer</strong></li>
          <li>Copy the ID from the URL:<br />
            <code className="text-accent-primary text-xs break-all">
              docs.google.com/spreadsheets/d/<span className="text-white underline">SHEET_ID</span>/edit
            </code>
          </li>
          <li>Paste it in <code className="text-accent-primary">sheets.config.ts</code></li>
          <li>Row 1 headers must be exactly: <code className="text-accent-primary">id · title · category · brands · badge · image · description</code></li>
        </ol>
      </div>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-border-subtle bg-surface animate-pulse">
          <div className="aspect-[4/3] bg-bg-secondary" />
          <div className="p-6 space-y-3">
            <div className="h-3 bg-bg-secondary rounded w-1/3" />
            <div className="h-5 bg-bg-secondary rounded w-2/3" />
            <div className="h-3 bg-bg-secondary rounded w-full" />
            <div className="h-3 bg-bg-secondary rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <h3 className="text-h4 font-display font-bold text-white mb-2">Failed to load products</h3>
      <p className="text-small text-text-secondary max-w-md mb-6">{message}</p>
      <button onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-full text-small font-medium hover:opacity-90 transition-all">
        <RefreshCw size={14} /> Try Again
      </button>
    </div>
  );
}

export default function Shop() {
  const { products, status, error, reload } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand,    setActiveBrand]    = useState("All Brands");

  const categories = useMemo(() =>
    ["All", ...Array.from(new Set(products.map(p => p.category))).sort()],
    [products]);

  const brandsForCategory = useMemo(() => {
    const base = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);
    return ["All Brands", ...Array.from(new Set(base.flatMap(p => p.brands))).sort()];
  }, [activeCategory, products]);

  const filtered = useMemo(() =>
    products.filter(p =>
      (activeCategory === "All" || p.category === activeCategory) &&
      (activeBrand === "All Brands" || p.brands.includes(activeBrand))
    ), [activeCategory, activeBrand, products]);

  const sheetUrl = SHEET_ID !== "1cqeMFLRcCZXPL2-Ni9nY9GHb_ksOXkYITYGAb7JpJI8"
    ? `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`
    : null;

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-pink-500/10 rounded-full blur-3xl" />

      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-16">
          <span className="text-small uppercase tracking-[0.2em] text-text-tertiary font-medium mb-4 block">Our Products</span>
          <h1 className="text-display font-display font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Shop
          </h1>
          {status === "success" && (
            <p className="text-body text-text-secondary max-w-2xl mx-auto font-light">
              {products.length} products across {categories.length - 1} categories · Price on request · WhatsApp for best deal + installation
            </p>
          )}
          {sheetUrl && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <a href={sheetUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-small text-text-tertiary hover:text-accent-primary transition-colors">
                <TableProperties size={13} /> Edit in Google Sheets
              </a>
              <span className="text-border-subtle">·</span>
              <button onClick={reload}
                className="inline-flex items-center gap-1.5 text-small text-text-tertiary hover:text-white transition-colors">
                <RefreshCw size={12} className={status === "loading" ? "animate-spin" : ""} />
                {status === "loading" ? "Refreshing…" : "Refresh"}
              </button>
            </div>
          )}
        </motion.div>

        {status === "unconfigured" && <Unconfigured />}
        {status === "error"        && <ErrorState message={error ?? "Unknown error"} onRetry={reload} />}
        {status === "loading"      && (
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-text-secondary text-small">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading products from Google Sheets…
            </div>
            <LoadingGrid />
          </div>
        )}

        {status === "success" && (
          <>
            <div className="flex flex-col items-center gap-4 mb-12">
              <div className="flex flex-wrap justify-center gap-2 bg-gradient-to-r from-bg-primary/90 via-surface/90 to-bg-primary/90 backdrop-blur-xl p-3 rounded-full border border-border-subtle shadow-elevation-md">
                {categories.map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setActiveBrand("All Brands"); }}
                    className={`px-5 py-2 rounded-full text-small font-medium transition-all duration-premium ${
                      activeCategory === cat
                        ? "bg-gradient-to-r from-accent-primary to-purple-600 text-white shadow-glow-accent"
                        : "text-text-secondary hover:text-white hover:bg-white/5"
                    }`}>{cat}</button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
                {brandsForCategory.map(brand => (
                  <button key={brand} onClick={() => setActiveBrand(brand)}
                    className={`px-4 py-1.5 rounded-full text-small font-medium border transition-all duration-premium ${
                      activeBrand === brand
                        ? "bg-accent-primary text-white border-accent-primary shadow-glow-accent"
                        : "text-text-tertiary border-border-subtle hover:text-white hover:border-border-medium"
                    }`}>{brand}</button>
                ))}
              </div>
            </div>

            <p className="text-center text-small text-text-tertiary mb-8">
              Showing {filtered.length} of {products.length} products
              {activeBrand !== "All Brands" ? ` · ${activeBrand}` : ""}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, index) => (
                  <motion.div key={item.id} layout
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: index * 0.03 }}
                    className="group relative bg-gradient-to-br from-surface to-bg-secondary rounded-2xl overflow-hidden border border-border-subtle hover:border-border-medium transition-all duration-premium hover:shadow-elevation-md"
                  >
                    {item.badge && (
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-accent-primary text-white text-small font-medium rounded-full shadow-glow-accent">
                        {item.badge}
                      </div>
                    )}
                    <div className="aspect-[4/3] overflow-hidden relative bg-surface">
                      <img src={item.image || FALLBACK} alt={item.title} loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={e => { e.currentTarget.src = FALLBACK; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <span className="text-small uppercase tracking-wider text-accent-primary font-medium mb-1 block">{item.category}</span>
                      <h3 className="text-h4 font-display font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-small text-text-secondary font-light leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mb-5">
                        {item.brands.map(b => (
                          <button key={b} onClick={() => setActiveBrand(b)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border transition-all duration-150 ${
                              activeBrand === b
                                ? "bg-accent-primary text-white border-accent-primary"
                                : "border-border-subtle text-text-tertiary hover:border-accent-primary hover:text-accent-primary"
                            }`}>{b}</button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-small text-text-tertiary font-light">Price on Request</span>
                        <a href={waProduct(item.title)} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-purple-600 text-white rounded-full text-small font-medium hover:shadow-glow-accent transition-all duration-premium">
                          Enquire <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-text-tertiary">
                <p className="text-h4 mb-2">No products found</p>
                <p className="text-small">Try a different category or brand.</p>
              </div>
            )}
          </>
        )}

        {status !== "unconfigured" && (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mt-20 glass rounded-2xl p-12">
            <h2 className="text-h2 font-display font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-body text-text-secondary font-light mb-8 max-w-xl mx-auto">
              We do fully custom work. Describe your vision and we'll make it happen.
            </p>
            <a href={WA_CUSTOM} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-medium text-body hover:opacity-90 transition-all duration-premium">
              {WA_SVG} Chat Custom Request
            </a>
          </motion.div>
        )}

      </section>
    </div>
  );
}
