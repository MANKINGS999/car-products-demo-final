import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Services from '../components/home/Services';
import CataloguePreview from '../components/home/CataloguePreview';
import Testimonials from '../components/home/Testimonials';
import Location from '../components/home/Location';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <CataloguePreview />
      <Testimonials />
      <Location />
    </main>
  );
}
