  import { Routes, Route } from "react-router-dom";
  import { useState } from "react";
  import { HelmetProvider } from "react-helmet-async"; // 1. SEO uchun

  import TopBar from "./components/TopBar";
  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";
  import Modal from "./components/Modal";
  import LeadForm from "./components/LeadForm";

  import Home from "./pages/Home";
  import Services from "./pages/Services";
  import ServiceDetail from "./pages/ServiceDetail";
  import Projects from "./pages/Projects";
  import News from "./pages/News";
  import About from "./pages/About";
  import Contact from "./pages/Contact";

  export default function App() {
    const [open, setOpen] = useState(false);

    return (
      // 2. HelmetProvider barcha sahifalarda Meta teglarni boshqarishga ruxsat beradi
      <HelmetProvider>
        <div className="min-h-screen flex flex-col font-sans text-slate-900 antialiased">
          
          {/* 3. Header semantikasi - Navbarni o'rab oladi */}
          <header className="z-50">
            <TopBar />
            <Navbar onOpenCall={() => setOpen(true)} />
          </header>

          {/* 4. Main landmark - Lighthouse hisobotidagi "No main landmark" xatosini yo'qotadi */}
          <main id="main-content" className="flex-1">
            <Routes>
              <Route path="/" element={<Home onOpenCall={() => setOpen(true)} />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />

          {/* Modal - Accessibility uchun "aria-modal" xususiyatiga ega ekanligini Modal komponenti ichida tekshiring */}
          <Modal 
            open={open} 
            onClose={() => setOpen(false)} 
            title="Заказать звонок / Qo‘ng‘iroq buyurtma"
          >
            <div className="p-2">
              <LeadForm />
            </div>
          </Modal>
        </div>
      </HelmetProvider>
    );
  }