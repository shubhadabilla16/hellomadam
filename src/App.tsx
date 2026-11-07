import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AdminProvider } from './context/AdminContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MyBookingsModal } from './components/MyBookingsModal';
import { FloatingContactBar } from './components/FloatingContactBar';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ServicesPage } from './pages/ServicesPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Scroll restoration to top on page navigation or anchor scroll
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AdminProvider>
          <BookingProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-[#faf7f2] text-stone-900 selection:bg-[#fef2ee] selection:text-[#e03e1a] font-sans">
              {/* Sticky Luxury Navbar with Official Brand Logo */}
              <Navbar />

              {/* Main Content View */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/our-work" element={<OurWorkPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/book" element={<BookingPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  {/* Fallback route */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>

              {/* Footer with Official Logo & Business Details */}
              <Footer />

              {/* Interactive Modals & Floating Buttons */}
              <MyBookingsModal />
              <FloatingContactBar />
            </div>
          </BookingProvider>
        </AdminProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
