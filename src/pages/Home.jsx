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

/* ---------------- 1. DYNAMIK HERO MA'LUMOTLARI ---------------- */
const SLIDES = [
  {
    id: "pir",
    category: "Poliuretan Tizimlari",
    title: "PIR Sendvich panellar",
    desc: "Issiqlik izolyatsiyasi bo'yicha eng yuqori ko'rsatkich. Energiyani 40% gacha tejaydigan zamonaviy panel tizimlari.",
    image: "https://i.ibb.co/LzsjFKLv/24.png",
    badge: "Premium sifat",
    width: 800,
    height: 600,
  },
  {
    id: "cold",
    category: "Sovutish Texnologiyasi",
    title: "Sovutgich Kameralar",
    desc: "Meva-sabzavot va go'sht mahsulotlari uchun maxsus harorat nazorati ostidagi professional omborxonalar.",
    image: "https://i.ibb.co/cKxQGBF7/27.png",
    badge: "Energiya tejamkor",
    width: 800,
    height: 600,
  },
  {
    id: "doors",
    category: "Sanoat qurilishi",
    title: "Sanoat binolari",
    desc: "Tezkor montaj qilinadigan va yillar davomida xizmat qiladigan mustahkam va ishonchli qurilmalar.",
    image: "https://i.ibb.co/xK8Hk6TM/26.png",
    badge: "Tez montaj",
    width: 800,
    height: 600,
  },
];

/* ---------------- 2. RANG KONFIGURATORI MA'LUMOTLARI ---------------- */
const PANEL_COLORS = [
  {
    id: "silver",
    name: "Kumush",
    hex: "#94A3B8",
    image: "https://i.ibb.co/1jsNDYx/21.png",
    desc: "Klassik sanoat uslubi",
    width: 800,
    height: 600,
  },
  {
    id: "blue",
    name: "Ko'k",
    hex: "#2563EB",
    image: "https://i.ibb.co/jXSNfy9/kok.jpg",
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
  const [hoveredCell, setHoveredCell] = useState(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bgRef.current) {
        const rect = bgRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
        
        // Grid cell hisoblash (24px grid)
        const cellX = Math.floor((e.clientX - rect.left) / 24);
        const cellY = Math.floor((e.clientY - rect.top) / 24);
        setHoveredCell({ x: cellX, y: cellY });
      }
    };

    const handleMouseLeave = () => {
      setHoveredCell(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={bgRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Asosiy kvadratchali grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          opacity: 0.15,
        }}
      />
      
      {/* Hover effektli kvadratchalar - mouse atrofida */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.15), transparent 70%)`,
        }}
      />
      
     
      
      {/* Qo'shimcha gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/10 via-transparent to-blue-50/10" />
      
      {/* Harakatlanuvchi nuqtalar */}
      {[...Array(20)].map((_, i) => (
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

  // Auto-slide with pause on hover
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Preload critical images
  useEffect(() => {
    const preloadImages = SLIDES.map(slide => {
      const img = new Image();
      img.src = slide.image;
      return img;
    });
  }, []);

  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleHeroIndexChange = useCallback((index) => {
    setHeroIndex(index);
  }, []);

  // SEO data - TO'LIQ SAQLANGAN
  const seoData = useMemo(() => ({
    title: "EcoProm — PIR sendvich panellar, sovutgich kameralar va sanoat binolari",
    description: "EcoProm zamonaviy PIR sendvich panellar, sovutgich kameralar va sanoat binolari ishlab chiqaradi. Yuqori issiqlik izolyatsiyasi, tez montaj va ishonchli sifat.",
    keywords: "PIR sendvich panel, poliuretan panel, sovutgich kamera, sanoat binolari, sendvich panel Uzbekistan, EcoProm, poliuretan tizimlari, sovutish texnologiyasi, Toshkent, Samarqand",
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
        "https://www.facebook.com/share/188Fga4yAs/"
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

  const websiteStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "EcoProm",
      url: seoData.canonicalUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${seoData.canonicalUrl}?q={search_term_string}`
        },
        "query-input": "required name=search_term_string",
      },
    }),
    [seoData]
  );

  const breadcrumbStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Bosh sahifa",
          item: seoData.canonicalUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Mahsulotlar",
          item: `${seoData.canonicalUrl}#mahsulotlar`,
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
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://i.ibb.co" />
        <link rel="dns-prefetch" href="https://i.ibb.co" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:site_name" content="EcoProm" />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="uz_UZ" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.ogImage} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>

      <div className="relative bg-white">
        {/* INTERACTIVE BACKGROUND - YANGI QO'SHILDI */}
        <InteractiveBackground />

        {/* ---------------- SECTION 1: HERO ---------------- */}
        <section 
          className="relative flex min-h-[600px] items-center overflow-hidden pt-6 sm:min-h-[700px] sm:pt-8 md:min-h-screen"
          aria-label="Asosiy mahsulotlar slayderi"
        >
          <div className="container-pad relative z-10 w-full py-6 sm:py-8 md:py-12">
            <div className="grid items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
              {/* TEXT */}
              <div className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[420px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={SLIDES[heroIndex].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:px-4 sm:py-2 sm:text-sm">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      {SLIDES[heroIndex].category}
                    </div>

                    <h1 className="mb-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl md:mb-5 md:text-5xl xl:text-6xl">
                      {SLIDES[heroIndex].title}
                    </h1>

                    <p className="mb-5 max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 md:mb-8 md:text-lg">
                      {SLIDES[heroIndex].desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <button
                        onClick={onOpenCall}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-6 sm:py-3.5 sm:text-base md:px-8 md:py-4"
                        aria-label="Ma'lumot olish uchun bog'lanish"
                      >
                        Ma'lumot olish
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                      </button>

                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 sm:px-4 sm:py-2 sm:text-sm">
                        {SLIDES[heroIndex].badge}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* IMAGE */}
              <div className="relative flex min-h-[200px] items-center justify-center sm:min-h-[250px] md:min-h-[350px] lg:min-h-[450px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={SLIDES[heroIndex].id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={SLIDES[heroIndex].image}
                      alt={`${SLIDES[heroIndex].title} - EcoProm mahsuloti`}
                      loading="eager"
                      fetchPriority="high"
                      width={SLIDES[heroIndex].width}
                      height={SLIDES[heroIndex].height}
                      className="h-auto max-h-[180px] w-auto object-contain sm:max-h-[230px] md:max-h-[360px] lg:max-h-[560px] xl:max-h-[640px]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-0 w-full sm:bottom-6 md:bottom-10">
            <div className="container-pad flex justify-center gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => handleHeroIndexChange(i)}
                  aria-label={`${slide.title} - slayd ${i + 1}/${SLIDES.length}`}
                  className={`h-2 w-2 rounded-full transition-all sm:h-2.5 sm:w-2.5 ${
                    heroIndex === i
                      ? "w-6 bg-emerald-500 sm:w-8"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 2: COLOR CONFIGURATOR ---------------- */}
        <section 
          className="relative bg-white py-10 sm:py-12 md:py-20 lg:py-24"
          aria-label="Rang konfiguratori"
        >
          <div className="container-pad relative z-10">
            <div className="mb-6 text-center sm:mb-8 md:mb-12 lg:mb-14">
              <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
                O'z loyihangizni yarating
              </h2>
              <p className="text-sm text-slate-600 sm:text-base md:text-lg">
                Rangni tanlang va natijani ko'ring
              </p>
            </div>

            <div className="grid items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Visual Display */}
              <div className="flex min-h-[200px] items-center justify-center sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedColor.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    {!imagesLoaded[selectedColor.id] && (
                      <div className="h-[150px] w-[150px] animate-pulse rounded-2xl bg-slate-200 sm:h-[200px] sm:w-[200px] md:h-[250px] md:w-[250px]" />
                    )}
                    <img
                      src={selectedColor.image}
                      alt={`${selectedColor.name} rangli panel`}
                      loading="lazy"
                      width={selectedColor.width}
                      height={selectedColor.height}
                      onLoad={() => setImagesLoaded(prev => ({ ...prev, [selectedColor.id]: true }))}
                      className={`h-auto max-h-[150px] w-auto object-contain sm:max-h-[200px] md:max-h-[250px] lg:max-h-[400px] ${
                        imagesLoaded[selectedColor.id] ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-300`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Ranglar paneli */}
              <div>
                <div className="mb-5 sm:mb-6">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl">
                    {selectedColor.name}
                  </h3>
                  <p className="text-sm text-slate-600 sm:text-base">
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
                        <CheckCircle2 className="absolute inset-0 m-auto h-5 w-5 text-white" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:pt-6">
                  <button
                    onClick={onOpenCall}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-6"
                    aria-label="Buyurtma berish"
                  >
                    Buyurtma berish
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
        <OurProjects />
        <OurProduction />
        <PartnerMarquee />
        <AiAssistant />
      </div>
    </>
  );
}