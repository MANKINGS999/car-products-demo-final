import { useState } from 'react';
import { WA_GENERAL, WA_NUMBER } from '../lib/whatsapp';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Facebook, Send, MessageCircle } from 'lucide-react';
import MapEmbed from '../components/ui/MapEmbed';

function WhatsAppForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const fullMessage = `Hi! I'm *${name || 'a customer'}* (📱 ${phone || 'N/A'}).\n\n${message}\n\n— Sent via Ayansh Car Decor website`;
    const url = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 relative bg-gradient-to-br from-surface to-bg-secondary rounded-2xl border border-border-subtle overflow-hidden p-8 lg:p-10"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-60" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
          </div>
          <div>
            <h3 className="text-h3 font-display font-bold text-white">Send Us a Message</h3>
            <p className="text-small text-text-tertiary">Fill in the form — we'll open WhatsApp with your message pre-typed.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-small text-text-secondary mb-2 font-medium">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-bg-primary/70 border border-border-subtle rounded-xl px-4 py-3 text-white text-body placeholder-text-tertiary focus:outline-none focus:border-[#25D366] transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-small text-text-secondary mb-2 font-medium">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="e.g. +91 xxxxx xxxxx"
              className="w-full bg-bg-primary/70 border border-border-subtle rounded-xl px-4 py-3 text-white text-body placeholder-text-tertiary focus:outline-none focus:border-[#25D366] transition-colors duration-200"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-small text-text-secondary mb-2 font-medium">Your Message</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Tell us about your car and what you'd like done..."
            rows={4}
            className="w-full bg-bg-primary/70 border border-border-subtle rounded-xl px-4 py-3 text-white text-body placeholder-text-tertiary focus:outline-none focus:border-[#25D366] transition-colors duration-200 resize-none"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full text-body font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-premium group"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Send on WhatsApp
          <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="mt-4 text-[12px] text-text-tertiary">
          Clicking "Send" opens WhatsApp with your message ready to go. We typically reply within a few minutes.
        </p>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent-primary/15 to-purple-500/15 rounded-full blur-3xl" />

      <section className="py-10 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-small uppercase tracking-[0.2em] text-text-tertiary font-medium mb-4 block">Get In Touch</span>
          <h1 className="text-4xl sm:text-display font-display font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto font-light">
            Visit our studio or reach out through any channel below. We'd love to talk about your car.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center group-hover:bg-accent-primary transition-colors duration-premium flex-shrink-0">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="text-h4 font-display text-white mb-2">Studio Location</h4>
                <p className="text-body text-text-secondary leading-relaxed">
                  AYANSH CAR DECOR, Bengaluru - Mumbai Hwy,<br />
                  Siddharth Nagar, Bavdhan,<br />
                  Pune, Maharashtra 411021
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center group-hover:bg-accent-primary transition-colors duration-premium flex-shrink-0">
                <Phone className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="text-h4 font-display text-white mb-2">Phone / WhatsApp</h4>
                <a href="tel:+917385319052" className="text-body text-text-secondary hover:text-accent-primary transition-colors block">073853 19052</a>
                <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
                  className="text-small text-[#25D366] font-medium mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all duration-premium">
                  Chat on WhatsApp →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center group-hover:bg-accent-primary transition-colors duration-premium flex-shrink-0">
                <Clock className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="text-h4 font-display text-white mb-2">Working Hours</h4>
                <p className="text-body text-text-secondary">Monday – Sunday<br />10:00 AM – 9:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center group-hover:bg-accent-primary transition-colors duration-premium flex-shrink-0">
                <Instagram className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="text-h4 font-display text-white mb-2">Follow Us</h4>
                <a href="https://instagram.com/ayansh_car_decor" target="_blank" rel="noopener noreferrer"
                  className="text-body text-text-secondary hover:text-accent-primary transition-colors">
                  @ayansh_car_decor
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-medium text-small hover:opacity-90 transition-all duration-premium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a href="tel:+917385319052"
                className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-full font-medium text-small hover:opacity-90 transition-all duration-premium">
                <Phone size={14} /> Call Now
              </a>
              <a href="https://instagram.com/ayansh_car_decor" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 glass text-white rounded-full font-medium text-small hover:bg-white/10 transition-all duration-premium">
                <Instagram size={14} /> Instagram
              </a>
              <a href="#"
                className="flex items-center gap-2 px-6 py-3 glass text-white rounded-full font-medium text-small hover:bg-white/10 transition-all duration-premium">
                <Facebook size={14} /> Facebook
              </a>
            </div>
          </motion.div>

          {/* Map — same component as home */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[350px] sm:h-[500px] lg:h-[600px]"
          >
            <MapEmbed />
          </motion.div>
        </div>

        {/* WhatsApp Messaging Form */}
        <WhatsAppForm />

      </section>
    </div>
  );
}
