import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DatabaseStatusIndicator from './components/DatabaseStatusIndicator';
import InquiryModal from './components/InquiryModal';
import BackToTop from './components/BackToTop';
import FloatingBriefButton from './components/FloatingBriefButton';
import ScrollProgressRail from './components/ScrollProgressRail';
import CustomCursor from './components/CustomCursor';

import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PartnershipsPage from './pages/PartnershipsPage';
import ContactPage from './pages/ContactPage';
import InquiriesDashboardPage from './pages/InquiriesDashboardPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [activePropertyForInquiry, setActivePropertyForInquiry] = useState(null);

  const handleOpenInquiry = (property = null) => {
    setActivePropertyForInquiry(property);
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryModalOpen(false);
    setActivePropertyForInquiry(null);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#0F0F0E] font-sans antialiased selection:bg-[#B8913A] selection:text-[#FAF7F2]">
        
        {/* Custom Luxury Ambient Cursor */}
        <CustomCursor />

        {/* Navigation Bar with Scroll Progress */}
        <Navbar onOpenInquiry={() => handleOpenInquiry(null)} />

        {/* Floating Database & Architecture Indicator */}
        <DatabaseStatusIndicator />

        {/* Section Progress Rail */}
        <ScrollProgressRail />

        {/* Floating Smooth Back-To-Top Button */}
        <BackToTop />

        {/* Floating Quick Action Brief Button */}
        <FloatingBriefButton onOpenInquiry={() => handleOpenInquiry(null)} />

        {/* Global Inquiry Modal */}
        <InquiryModal
          isOpen={isInquiryModalOpen}
          onClose={handleCloseInquiry}
          initialProperty={activePropertyForInquiry}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenInquiry={handleOpenInquiry} />} />
            <Route path="/properties" element={<PropertiesPage onOpenInquiry={handleOpenInquiry} />} />
            <Route path="/properties/:id" element={<PropertyDetailPage onOpenInquiry={handleOpenInquiry} />} />
            <Route path="/about" element={<AboutPage onOpenInquiry={handleOpenInquiry} />} />
            <Route path="/services" element={<ServicesPage onOpenInquiry={handleOpenInquiry} />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/inquiries" element={<InquiriesDashboardPage />} />
            <Route path="*" element={<HomePage onOpenInquiry={handleOpenInquiry} />} />
          </Routes>
        </main>

        {/* Global Architectural Footer */}
        <Footer />

      </div>
    </Router>
  );
}
