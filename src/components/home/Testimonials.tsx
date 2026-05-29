import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
  { id: 1, name: "Rahul Sharma", role: "Creta Owner", content: "The attention to detail is remarkable. My car's audio system now delivers clarity I didn't think was possible. Worth every rupee.", rating: 5 },
  { id: 2, name: "Aditya Verma", role: "BMW 3 Series", content: "Exceptional craftsmanship. The leather work is flawless, and the team's professionalism throughout the process was outstanding.", rating: 5 },
  { id: 3, name: "Sneha Patel", role: "Mercedes C-Class", content: "Transformed my vehicle completely. The ceramic coating has maintained that showroom finish for months. Highly recommended.", rating: 5 },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-3xl lg:py-4xl bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2xl text-center"
        >
          <span className="text-small uppercase tracking-[0.2em] text-text-tertiary font-medium mb-4 block">Client Testimonials</span>
          <h2 className="text-h2 lg:text-h1 font-display font-bold text-white">
            Trusted by <span className="text-gradient">Enthusiasts</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[320px] sm:h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => {
                if (index !== activeIndex) return null;
                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-full"
                  >
                    <div className="glass rounded-2xl p-6 sm:p-10 lg:p-12 text-center">
                      <div className="flex justify-center gap-1 mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-accent-primary fill-accent-primary" />
                        ))}
                      </div>
                      <p className="text-base sm:text-h4 font-light text-white leading-relaxed mb-8">"{testimonial.content}"</p>
                      <div>
                        <h4 className="text-body font-display font-semibold text-white mb-1">{testimonial.name}</h4>
                        <span className="text-small text-text-tertiary">{testimonial.role}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index} onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-premium ${index === activeIndex ? 'bg-accent-primary w-8' : 'bg-border-medium w-2 hover:bg-border-medium/50'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Redirect button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-accent-primary to-purple-600 text-white rounded-full font-medium text-body transition-all duration-premium hover:shadow-glow-accent-strong hover:scale-[1.02] active:scale-[0.98]">
            Get In Touch →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
