import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/ui/SmoothScroll';
import FloatingCTA from './components/ui/FloatingCTA';
import HomePage from './pages/HomePage';
import Shop from './pages/Shop';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <SmoothScroll>
        <ScrollToTop />
        <div className="bg-bg-primary min-h-screen text-white selection:bg-accent-primary selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
          <FloatingCTA />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
