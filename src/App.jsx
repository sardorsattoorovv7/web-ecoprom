import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";
import { useTranslation } from "react-i18next";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import LeadForm from "./components/LeadForm";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import OurProducts from "./pages/OurProducts";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// 1. Google Analytics-ni o'z ID raqamingiz bilan ishga tushiramiz
ReactGA.initialize("G-8F1XE9QTXM");

export default function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  // 2. Sahifa o'zgarganda (Route o'zgarganda) Analytics-ga ma'lumot yuborish
  useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col font-sans text-slate-900 antialiased">
        
        {/* Header - Navbarni o'rab oladi */}
        <header className="z-50">
          <TopBar />
          <Navbar onOpenCall={() => setOpen(true)} />
        </header>

        {/* Main landmark - Bu SEO va Accessibility uchun juda muhim */}
        <main id="main-content" className="flex-1 focus:outline-none">
          <Routes>
            <Route path="/" element={<Home onOpenCall={() => setOpen(true)} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            
            {/* BU YERDA: /OurProducts ni kichik harfga o'zgartirdik */}
            <Route path="/ourproducts" element={<OurProducts />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        {/* Modal oynasi */}
        <Modal 
          open={open} 
          onClose={() => setOpen(false)} 
          title={t("modal.callRequest")}
          closeLabel={t("common.close")}
        >
          <div className="p-2">
            <LeadForm />
          </div>
        </Modal>
      </div>
    </HelmetProvider>
  );
}