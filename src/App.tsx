import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MyBookingsModal } from './components/MyBookingsModal';
import { FloatingContactBar } from './components/FloatingContactBar';
import { MobileStickyCartBar } from './components/MobileStickyCartBar';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ServicesPage } from './pages/ServicesPage';
import { CategoryPage } from './pages/CategoryPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { BookingPage } from './pages/BookingPage';
import { BookingsListPage } from './pages/BookingsListPage';
import { PackagesPage } from './pages/PackagesPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AdminImagesPage } from './pages/AdminImagesPage';
import { PartnerViewPage } from './pages/PartnerViewPage';
import { BeauticianLoginPage } from './pages/BeauticianLoginPage';
import { BeauticianDashboardPage } from './pages/BeauticianDashboardPage';

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
        <AuthProvider>
          <AdminProvider>
            <BookingProvider>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col bg-[#faf7f2] text-stone-900 selection:bg-[#fef2ee] selection:text-[#e03e1a] font-sans pb-16 md:pb-0">
                {/* Sticky Luxury Navbar with Official Brand Logo */}
                <Navbar />

                {/* Main Content View */}
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/services/:categoryId" element={<CategoryPage />} />
                    <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
                    <Route path="/packages" element={<PackagesPage />} />
                    <Route path="/favourites" element={<FavouritesPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/book" element={<BookingPage />} />
                    <Route path="/bookings" element={<BookingsListPage />} />
                    <Route path="/our-work" element={<OurWorkPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/images" element={<AdminImagesPage />} />
                    <Route path="/partner" element={<PartnerViewPage />} />
                    <Route path="/beautician" element={<Navigate to="/beautician/login" replace />} />
                    <Route path="/beautician/login" element={<BeauticianLoginPage />} />
                    <Route path="/beautician/dashboard" element={<BeauticianDashboardPage />} />
                    {/* Fallback route */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </main>

                {/* Footer with Official Logo & Business Details */}
                <Footer />

                {/* Interactive Modals, Toast, and Floating Bars */}
                <MyBookingsModal />
                <FloatingContactBar />
                <MobileStickyCartBar />
                <Toast />
              </div>
            </BookingProvider>
          </AdminProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
