import { WA_GENERAL } from '../lib/whatsapp';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { id: 1, name: "Rahul Sharma", role: "Hyundai Creta Owner", content: "The attention to detail is remarkable. My car's audio system now delivers clarity I didn't think was possible. Worth every rupee. The team at Ayansh is professional, prompt, and passionate about cars.", rating: 5, service: "Audio System" },
  { id: 2, name: "Aditya Verma", role: "BMW 3 Series Owner", content: "Exceptional craftsmanship. The leather work is flawless, and the team's professionalism throughout the process was outstanding. My interior looks better than the original factory finish.", rating: 5, service: "Leather Interior" },
  { id: 3, name: "Sneha Patel", role: "Mercedes C-Class Owner", content: "Transformed my vehicle completely. The ceramic coating has maintained that showroom finish for months. Highly recommended — worth every paisa.", rating: 5, service: "Ceramic Coating" },
  { id: 4, name: "Vikram Desai", role: "Tata Nexon EV Owner", content: "Got the ambient lighting done and I absolutely love it. The Ayansh team understood exactly what I wanted and delivered beyond expectations. Pune's best car studio without a doubt.", rating: 5, service: "Ambient Lighting" },
  { id: 5, name: "Priya Nair", role: "Honda City Owner", content: "The PPF installation was perfect — not a single bubble or misalignment. They were incredibly careful with my car. Will definitely come back for more work.", rating: 5, service: "PPF" },
  { id: 6, name: "Arjun Mehta", role: "MG Hector Owner", content: "Booked the full detailing package and was blown away by the results. The paint correction made my 4-year-old car look brand new. The guys here really know their craft.", rating: 5, service: "Detailing" },
];

export default function TestimonialsPage() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent-primary/15 to-purple-500/15 rounded-full blur-3xl" />

      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-small uppercase tracking-[0.2em] text-text-tertiary font-medium mb-4 block">What Our Clients Say</span>
          <h1 className="text-display font-display font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Testimonials
          </h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto font-light">
            Real stories from real car enthusiasts who trusted us with their vehicles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-8 flex flex-col gap-5 hover:border-border-medium transition-all duration-premium"
            >
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent-primary fill-accent-primary" />
                ))}
              </div>
              <p className="text-body text-text-secondary font-light leading-relaxed flex-1">"{t.content}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                <div>
                  <h4 className="text-body font-display font-semibold text-white">{t.name}</h4>
                  <span className="text-small text-text-tertiary">{t.role}</span>
                </div>
                <span className="text-small text-accent-primary font-medium bg-accent-primary/10 px-3 py-1 rounded-full">{t.service}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-20 glass rounded-2xl p-12"
        >
          <h2 className="text-h2 font-display font-bold text-white mb-4">Ready to Transform Your Ride?</h2>
          <p className="text-body text-text-secondary font-light mb-8 max-w-xl mx-auto">Join hundreds of satisfied customers. Book your consultation today.</p>
          <a
            href={WA_GENERAL}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-medium text-body shadow-glow-accent hover:shadow-glow-accent-strong transition-all duration-premium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book on WhatsApp
          </a>
        </motion.div>
      </section>
    </div>
  );
}
