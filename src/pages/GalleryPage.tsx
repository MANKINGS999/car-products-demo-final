import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200", category: "Interior", title: "Leather Seat Overhaul" },
  { id: 2, src: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200", category: "Detailing", title: "Paint Correction Detail" },
  { id: 3, src: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=1200", category: "Audio", title: "Focal Audio Install" },
  { id: 4, src: "https://images.unsplash.com/photo-1605218427360-6961d902d338?w=1200", category: "Detailing", title: "Ceramic Coat Finish" },
  { id: 5, src: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200", category: "Interior", title: "Ambient Lighting" },
  { id: 6, src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200", category: "Custom", title: "Full Custom Build" },
  { id: 7, src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200", category: "Detailing", title: "Exterior Detail" },
  { id: 8, src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200", category: "Custom", title: "Custom Wrap" },
  { id: 9, src: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200", category: "Interior", title: "Dashboard Upgrade" },
  { id: 10, src: "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?w=1200", category: "Audio", title: "Subwoofer Setup" },
  { id: 11, src: "https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=1200", category: "Detailing", title: "PPF Application" },
  { id: 12, src: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=1200", category: "Custom", title: "Full Interior Redo" },
];

const categories = ["All", "Interior", "Audio", "Detailing", "Custom"];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter(i => i.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent-primary/15 to-purple-500/15 rounded-full blur-3xl" />

      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-small uppercase tracking-[0.2em] text-text-tertiary font-medium mb-4 block">Portfolio</span>
          <h1 className="text-display font-display font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Our Gallery
          </h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto font-light">
            A showcase of our finest work — each project a testament to our craft.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-small font-medium transition-all duration-premium ${
                activeCategory === cat ? 'bg-gradient-to-r from-accent-primary to-purple-600 text-white shadow-glow-accent' : 'text-text-secondary hover:text-white hover:bg-white/5 border border-border-subtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <AnimatePresence>
            {filtered.map((image, index) => (
              <motion.div
                key={image.id} layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedImage(image.id)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group border border-border-subtle hover:border-border-medium transition-all duration-premium"
              >
                <img src={image.src} alt={image.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-premium group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-premium flex items-end p-5">
                  <div>
                    <span className="text-small uppercase tracking-wider text-accent-primary font-medium block mb-1">{image.category}</span>
                    <span className="text-body font-display font-bold text-white">{image.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button onClick={() => setSelectedImage(null)} className="absolute top-8 right-8 text-text-tertiary hover:text-white transition-colors duration-premium" aria-label="Close">
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              src={galleryImages.find(img => img.id === selectedImage)?.src}
              alt="Selected"
              className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-elevation-md"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
