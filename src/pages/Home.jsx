import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import OurProducts from "../components/OurProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import FreeSamples from "../components/FreeSamples";
import OurProjects from "../components/OurProjects";
import OurProduction from "../components/OurProduction";
import AiAssistant from "../components/AIAssistant";
import {
  ArrowRight,
  Sparkles,                                                   
  CheckCircle2,
} from "lucide-react";
import PartnerMarquee from "../components/PartnerMarquee";

/* ---------------- 1. HERO MA'LUMOTLARI - FAQAT MATNLAR ---------------- */
const SLIDES = [
  {
    id: "pir",
    category: "Poliuretan Tizimlari",
    title: "PIR Sendvich panellar",
    desc: "Issiqlik izolyatsiyasi bo'yicha eng yuqori ko'rsatkich. Energiyani 40% gacha tejaydigan zamonaviy panel tizimlari.",
    badge: "Premium sifat",
  },
  {
    id: "cold",
    category: "Sovutish Texnologiyasi",
    title: "Sovutgich Kameralar",
    desc: "Meva-sabzavot va go'sht mahsulotlari uchun maxsus harorat nazorati ostidagi professional omborxonalar.",
    badge: "Energiya tejamkor",
  },
  {
    id: "doors",
    category: "Sanoat qurilishi",
    title: "Sanoat binolari",
    desc: "Tezkor montaj qilinadigan va yillar davomida xizmat qiladigan mustahkam va ishonchli qurilmalar.",
    badge: "Tez montaj",
  },
];

/* ---------------- 2. RANG KONFIGURATORI MA'LUMOTLARI ---------------- */
const PANEL_COLORS = [
  {
    id: "silver",
    name: "Kumush",
    hex: "#94A3B8",
    image: "/assets/sariq-panel.png",
    desc: "Klassik sanoat uslubi",
    width: 800,
    height: 600,
  },
  {
    id: "blue",
    name: "Ko'k",
    hex: "#2563EB",
    image: "/assets/kok-panel.png",
    desc: "Sovutish omborlari uchun ideal",
    width: 800,
    height: 600,
  },
  {
    id: "red",
    name: "Qizil",
    hex: "#DC2626",
    image: "https://i.ibb.co/Xx5vNwF3/qizil.jpg",
    desc: "Brending uchun maxsus rang",
    width: 800,
    height: 600,
  },
  {
    id: "green",
    name: "Yashil",
    hex: "#16A34A",
    image: "https://i.ibb.co/DHnkBPs8/yashil.jpg",
    desc: "Ekologik loyihalar uchun",
    width: 800,
    height: 600,
  },
];

/* ---------------- 3. INTERACTIVE BACKGROUND COMPONENT ---------------- */
const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bgRef.current) {
        const rect = bgRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={bgRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Asosiy kvadratchali grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #adb4be 1px, transparent 1px),
            linear-gradient(to bottom, #646464 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          opacity: 0.15,
        }}
      />
      
      {/* Hover effekt */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.15), transparent 70%)`,
        }}
      />
      
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/10 via-transparent to-blue-50/10" />
      
      {/* Harakatlanuvchi nuqtalar */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-emerald-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default function EcoPromMain({ onOpenCall }) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PANEL_COLORS[0]);
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleHeroIndexChange = useCallback((index) => {
    setHeroIndex(index);
  }, []);

  // SEO data
  const seoData = useMemo(() => ({
    title: "EcoProm — PIR sendvich panellar, sovutgich kameralar va sanoat binolari",
    description: "EcoProm zamonaviy PIR sendvich panellar, sovutgich kameralar va sanoat binolari ishlab chiqaradi. Yuqori issiqlik izolyatsiyasi, tez montaj va ishonchli sifat.",
    keywords: "PIR sendvich panel, poliuretan panel, sovutgich kamera, sanoat binolari, sendvich panel Uzbekistan, EcoProm",
    canonicalUrl: "https://web-ecoprom.vercel.app/",
    ogImage: "https://i.ibb.co/LzsjFKLv/24.png",
  }), []);

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "EcoProm",
      url: seoData.canonicalUrl,
      logo: seoData.ogImage,
      description: seoData.description,
      sameAs: [
        "https://www.instagram.com/ecoprom_uz",
        "https://t.me/ecopromgroup",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toshkent",
        addressCountry: "UZ"
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+998-78-555-86-18",
          contactType: "customer service",
          areaServed: "UZ",
          availableLanguage: ["uz", "ru", "en"],
        },
      ],
    }),
    [seoData]
  );

  return (
    <>
      <Helmet>
        <html lang="uz" />
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImage} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="relative bg-white">
        {/* INTERACTIVE BACKGROUND */}
        <InteractiveBackground />

        {/* ---------------- SECTION 1: HERO - FAQAT MATNLAR ---------------- */}
        <section 
          className="relative flex min-h-[500px] items-center overflow-hidden pt-6 sm:min-h-[600px] md:min-h-[70vh]"
          aria-label="Asosiy mahsulotlar"
          style={{
            backgroundImage: `url(/assets/main-bg.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

          <div className="container-pad relative z-10 w-full py-6 sm:py-8 md:py-12">
            <div className="max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={SLIDES[heroIndex].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-100 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    {SLIDES[heroIndex].category}
                  </div>

                  <h1 className="mb-4 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
                    {SLIDES[heroIndex].title}
                  </h1>

                  <p className="mb-6 max-w-2xl text-base leading-7 text-white/90 drop-shadow md:text-lg md:leading-8">
                    {SLIDES[heroIndex].desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <button
                      onClick={onOpenCall}
                      className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-8 sm:py-4 sm:text-base"
                      aria-label="Ma'lumot olish uchun bog'lanish"
                    >
                      Ma'lumot olish
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                    </button>

                    <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-sm">
                      {SLIDES[heroIndex].badge}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-6 left-0 w-full sm:bottom-8 md:bottom-10">
            <div className="container-pad flex justify-center gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => handleHeroIndexChange(i)}
                  aria-label={`${slide.title} - slayd ${i + 1}/${SLIDES.length}`}
                  className={`h-2 rounded-full transition-all sm:h-2.5 ${
                    heroIndex === i
                      ? "w-8 bg-emerald-400 sm:w-10"
                      : "w-2 bg-white/50 hover:bg-white/80 sm:w-2.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 2: COLOR CONFIGURATOR ---------------- */}
        <section 
          className="relative bg-white/0 py-10 sm:py-12 md:py-20 lg:py-24"
          aria-label="Rang konfiguratori"
        >
          <div className="container-pad relative z-10">
            <div className="mb-6 text-center sm:mb-8 md:mb-12">
              <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
                O'z loyihangizni yarating
              </h2>
              <p className="text-sm text-slate-600 sm:text-base md:text-lg">
                Rangni tanlang va natijani ko'ring
              </p>
            </div>

            <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Visual Display */}
              <div className="flex min-h-[200px] items-center justify-center sm:min-h-[250px] lg:min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedColor.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!imagesLoaded[selectedColor.id] && (
                      <div className="h-[150px] w-[150px] animate-pulse rounded-2xl bg-slate-200 sm:h-[200px] sm:w-[200px] lg:h-[300px] lg:w-[300px]" />
                    )}
                    <img
                      src={selectedColor.image}
                      alt={`${selectedColor.name} rangli panel`}
                      loading="lazy"
                      width={selectedColor.width}
                      height={selectedColor.height}
                      onLoad={() => setImagesLoaded(prev => ({ ...prev, [selectedColor.id]: true }))}
                      className={`h-auto max-h-[150px] w-auto object-contain sm:max-h-[200px] lg:max-h-[350px] ${
                        imagesLoaded[selectedColor.id] ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-300`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Ranglar paneli */}
              <div>
                <div className="mb-5 sm:mb-6">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 sm:text-2xl">
                    {selectedColor.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {selectedColor.desc}
                  </p>
                </div>

                <div className="mb-6 flex flex-wrap gap-3 sm:mb-8 sm:gap-4">
                  {PANEL_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color)}
                      aria-label={`${color.name} rangini tanlash`}
                      aria-pressed={selectedColor.id === color.id}
                      className={`relative h-11 w-11 rounded-full transition-all sm:h-12 sm:w-12 ${
                        selectedColor.id === color.id
                          ? "scale-110 ring-4 ring-emerald-500 ring-offset-4"
                          : "ring-2 ring-slate-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor.id === color.id && (
                        <CheckCircle2 className="absolute inset-0 m-auto h-5 w-5 text-white" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:pt-6">
                  <button
                    onClick={onOpenCall}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-6"
                  >
                    Buyurtma berish
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Komponentlar */}
        <FreeSamples />
        <OurProducts
          onProductClick={(product) => {
            console.log("Tanlandi:", product);
          }}
        />
        <WhyChooseUs />
        {/* <OurProjects /> */}
        <OurProduction />
        <PartnerMarquee />
        <AiAssistant />
      </div>
    </>
  );
}