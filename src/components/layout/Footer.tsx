import { Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-bg-primary py-8 sm:py-xl border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <Link to="/" className="font-display font-bold text-2xl tracking-tight text-white inline-block mb-3">
              AYANSH<span className="text-accent-primary">.</span>
            </Link>
            <p className="text-small text-text-tertiary">
              © {new Date().getFullYear()} Ayansh Car Decor. Crafted with precision.
            </p>
            <p className="text-[11px] sm:text-small text-text-tertiary mt-1 max-w-[260px] sm:max-w-none mx-auto md:mx-0">
              AYANSH CAR DECOR, Bengaluru - Mumbai Hwy, Siddharth Nagar, Bavdhan, Pune, Maharashtra 411021
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-small text-text-secondary">
            <Link to="/shop" className="hover:text-white transition-colors duration-premium">Shop</Link>
            <Link to="/services" className="hover:text-white transition-colors duration-premium">Services</Link>
            <Link to="/contact" className="hover:text-white transition-colors duration-premium">Contact</Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/ayansh_car_decor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-tertiary hover:text-white hover:bg-accent-primary transition-all duration-premium"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-tertiary hover:text-white hover:bg-accent-primary transition-all duration-premium"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Instagram handle */}
        <div className="mt-6 pt-6 border-t border-border-subtle text-center">
          <a
            href="https://instagram.com/ayansh_car_decor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-small text-text-tertiary hover:text-accent-primary transition-colors duration-premium"
          >
            @ayansh_car_decor
          </a>
        </div>
      </div>
    </footer>
  );
}
