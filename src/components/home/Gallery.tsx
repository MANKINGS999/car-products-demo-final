import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200", category: "Interior", size: "large" },
  { id: 2, src: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200", category: "Detailing", size: "small" },
  { id: 3, src: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=1200", category: "Audio", size: "small" },
  { id: 4, src: "https://images.unsplash.com/photo-1605218427360-6961d902d338?w=1200", category: "Detailing", size: "large" },
  { id: 5, src: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200", category: "Interior", size: "small" },
  { id: 6, src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200", category: "Custom", size: "small" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-3xl lg:py-4xl bg-gradient-to-b from-bg-secondary via-bg-primary to-bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2xl max-w-3xl"
        >
          <span className="text-small uppercase tracking-[0.2em] text-text-tertiary font-medium mb-4 block">Portfolio</span>
          <h2 className="text-h2 lg:text-h1 font-display font-bold text-white mb-4">
            Our Work<br />
            <span className="bg-gradient-to-r from-accent-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Speaks Volumes</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-[280px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedImage(image.id)}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${image.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img src={image.src} alt={image.category} loading="lazy" className="w-full h-full object-cover transition-transform duration-premium ease-premium group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-premium flex items-end p-6">
                <div className="relative">
                  <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-accent-primary to-purple-500 rounded-full" />
                  <span className="text-small uppercase tracking-[0.2em] text-white font-medium pl-4">{image.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Redirect button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link to="/gallery" className="px-8 py-4 bg-gradient-to-r from-accent-primary to-purple-600 text-white rounded-full font-medium text-body transition-all duration-premium hover:shadow-glow-accent-strong hover:scale-[1.02] active:scale-[0.98]">
            View Full Gallery →
          </Link>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <button onClick={() => setSelectedImage(null)} className="absolute top-8 right-8 text-text-tertiary hover:text-white transition-colors duration-premium" aria-label="Close">
                <X size={32} />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                src={galleryImages.find(img => img.id === selectedImage)?.src}
                alt="Selected"
                className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-elevation-md"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
