import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { WA_GENERAL } from '../../lib/whatsapp';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-premium ease-premium ${
        isScrolled ? 'bg-bg-primary/80 backdrop-blur-glass border-b border-border-subtle' : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-2xl tracking-tight text-white z-50 relative">
            AYANSH<span className="text-accent-primary">.</span>
          </Link>

          {/* Desktop Nav — includes Home */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-small font-medium hover:text-white transition-colors duration-premium tracking-wide uppercase relative group ${
                  location.pathname === link.href ? 'text-white' : 'text-text-secondary'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent-primary transition-all duration-premium group-hover:w-full ${
                  location.pathname === link.href ? 'w-full' : 'w-0'
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 glass rounded-full hover:bg-white/10 hover:border-border-medium transition-all duration-premium"
            >
              <span className="text-small font-medium">Book Now</span>
            </a>
          </div>

          <button
            className="md:hidden text-white z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu — includes Home */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg-primary/97 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            {navLinks.map((link, index) => (
              <motion.div key={link.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-h3 font-display font-bold text-white hover:text-accent-primary transition-colors duration-premium"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
              className="btn-primary mt-8"
              onClick={() => setIsOpen(false)}
            >
              Book Consultation
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
