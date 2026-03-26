// components/RouterWrapper.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageLoader from "./PageLoader";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Lazy load - sahifalarni kechiktirib yuklash
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Projects = lazy(() => import("../pages/Projects"));
const Products = lazy(() => import("../pages/OurProductsPage"));
const Contact = lazy(() => import("../pages/Contact"));

export default function RouterWrapper() {
  return (
    <BrowserRouter>
      <Navbar />
      <PageLoader />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ourproducts" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}