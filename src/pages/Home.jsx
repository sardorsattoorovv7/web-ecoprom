import { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ArrowUp,
} from "lucide-react";
import { useTranslation } from "react-i18next"; // ✅ useTranslation import qilindi

// Lazy loading komponentlar
const OurProducts = lazy(() => import("../components/OurProducts"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));
const FreeSamples = lazy(() => import("../components/FreeSamples"));
const OurProjects = lazy(() => import("../components/OurProjects"));
const OurProduction = lazy(() => import("../components/OurProduction"));
const AiAssistant = lazy(() => import("../components/AIAssistant"));
const PartnerMarquee = lazy(() => import("../components/PartnerMarquee"));
const CookieConsentBanner = lazy(() => import("../components/CookieConsentBanner"));

/* ---------------- 1. COUNTER HOOK ---------------- */
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return [count, ref];
};

/* ---------------- 2. SCROLL PROGRESS BAR ---------------- */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollTop / height) * 100);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-150"
         style={{ width: `${progress}%` }} />
  );
};

/* ---------------- 3. BACK TO TOP BUTTON ---------------- */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-110 hover:shadow-xl"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
};

/* ---------------- 4. LOADING SKELETON ---------------- */
const SkeletonLoader = () => (
  <div className="w-full py-20">
    <div className="container-pad">
      <div className="animate-pulse">
        <div className="h-12 bg-slate-200 rounded-lg w-1/3 mx-auto mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ---------------- 5. 3D CARD COMPONENT ---------------- */
const Card3D = ({ children, className = "" }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setRotate({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.y}deg) rotateY(${rotate.x}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ---------------- 6. STAT CARD WITH COUNTER ---------------- */
const StatCard = ({ value, label, suffix = "+", delay = 0 }) => {
  const [count, ref] = useCounter(value, 2000);
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const isFromLeft = !!(Math.floor(delay * 10) % 2);

  return (
    <motion.div
      ref={inViewRef}
      initial={{ 
        opacity: 0, 
        x: isFromLeft ? -100 : 100,
        y: 20
      }}
      animate={inView ? { 
        opacity: 1, 
        x: 0,
        y: 0
      } : {}}
      transition={{ 
        duration: 0.7, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:-translate-y-2"
    >
      <div ref={ref} className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
        {inView ? count : 0}{suffix}
      </div>
      <div className="text-slate-600 font-medium">{label}</div>
    </motion.div>
  );
};

/* ---------------- 7. INTERACTIVE BACKGROUND ---------------- */
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
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={bgRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
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
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.15), transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/10 via-transparent to-blue-50/10" />
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

/* ---------------- 8. SECTION WITH SCROLL ANIMATION ---------------- */
const SectionWrapper = ({ children, className = "", delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ---------------- 9. RANG KONFIGURATORI MA'LUMOTLARI (tarjima bilan) ---------------- */
const getPanelColors = (t) => [
  {
    id: "yellow",
    name: t("colors_config.yellow", "Sariq"),
    hex: "#ffff08",
    image: "/assets/sariq-panel.png",
    desc: t("colors_config.desc_classic", "Klassik sanoat uslubi"),
  },
  {
    id: "blue",
    name: t("colors_config.blue", "Ko'k"),
    hex: "#2563EB",
    image: "/assets/kok-panel.png",
    desc: t("colors_config.desc_cold", "Sovutish omborlari uchun ideal"),
  },
  {
    id: "red",
    name: t("colors_config.red", "Qizil"),
    hex: "#DC2626",
    image: "https://i.ibb.co/Xx5vNwF3/qizil.jpg",
    desc: t("colors_config.desc_brand", "Brending uchun maxsus rang"),
  },
  {
    id: "green",
    name: t("colors_config.green", "Yashil"),
    hex: "#16A34A",
    image: "https://i.ibb.co/DHnkBPs8/yashil.jpg",
    desc: t("colors_config.desc_eco", "Ekologik loyihalar uchun"),
  },
];

/* ---------------- 10. HERO SLIDES (tarjima bilan) ---------------- */
const getHeroSlides = (t) => [
  {
    id: "pir-pur",
    category: t("hero_slides.0.category", "Poliuretan Tizimlari"),
    title: t("hero_slides.0.title", "PIR-PUR Sendvich panellar"),
    desc: t("hero_slides.0.desc", "Issiqlik izolyatsiyasi bo'yicha eng yuqori ko'rsatkich. Energiyani 40% gacha tejaydigan zamonaviy panel tizimlari."),
    badge: t("hero_slides.0.badge", "Premium sifat"),
  },
  {
    id: "cold",
    category: t("hero_slides.1.category", "Sovutish Texnologiyasi"),
    title: t("hero_slides.1.title", "Sovutgich Kameralar"),
    desc: t("hero_slides.1.desc", "Meva-sabzavot va go'sht mahsulotlari uchun maxsus harorat nazorati ostidagi professional omborxonalar."),
    badge: t("hero_slides.1.badge", "Energiya tejamkor"),
  },
  {
    id: "doors",
    category: t("hero_slides.2.category", "Sanoat qurilishi"),
    title: t("hero_slides.2.title", "Sanoat binolari"),
    desc: t("hero_slides.2.desc", "Tezkor montaj qilinadigan va yillar davomida xizmat qiladigan mustahkam va ishonchli qurilmalar."),
    badge: t("hero_slides.2.badge", "Tez montaj"),
  },
];

/* ---------------- 11. MAIN COMPONENT ---------------- */
export default function EcoPromMain({ onOpenCall }) {
  const { t, i18n } = useTranslation();
  
  // Tarjimaga qarab dinamik ma'lumotlar
  const heroSlides = useMemo(() => getHeroSlides(t), [t]);
  const panelColors = useMemo(() => getPanelColors(t), [t]);
  
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(panelColors[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // selectedColor panelColors o'zgarganda yangilanadi
  useEffect(() => {
    setSelectedColor(panelColors[0]);
  }, [panelColors]);

  // Parallax effekt uchun
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-slide tugmasi
  const heroTimerRef = useRef(null);

  const resetAutoSlide = useCallback(() => {
    if (heroTimerRef.current) {
      clearInterval(heroTimerRef.current);
    }
    heroTimerRef.current = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  }, [heroSlides.length]);

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (heroTimerRef.current) {
        clearInterval(heroTimerRef.current);
      }
    };
  }, [resetAutoSlide]);

  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleHeroIndexChange = useCallback((index) => {
    setHeroIndex(index);
    resetAutoSlide();
  }, [resetAutoSlide]);

  // Statistika ma'lumotlari (tarjima bilan)
  const stats = [
    { value: 13, label: t("stats_items.exp", "Yillik tajriba"), suffix: "+" },
    { value: 500, label: t("stats_items.projects", "Muvaffaqiyatli loyiha"), suffix: "+" },
    { value: 100, label: t("stats_items.staff", "Malakali xodimlar"), suffix: "+" },
    { value: 5, label: t("stats_items.lines", "Ishlab chiqarish liniyasi"), suffix: "" },
  ];

  // SEO data
  const seoData = useMemo(
    () => ({
      title: t("seo.title", "EcoProm — PIR-PUR sendvich panellar, sovutgich kameralar va sanoat binolari"),
      description: t("seo.description", "EcoProm zamonaviy PIR-PUR sendvich panellar, sovutgich kameralar va sanoat binolari ishlab chiqaradi. Yuqori issiqlik izolyatsiyasi, tez montaj va ishonchli sifat."),
      keywords: t("seo.keywords", "PIR sendvich panel, poliuretan panel, sovutgich kamera, sanoat binolari, sendvich panel Uzbekistan, EcoProm"),
      canonicalUrl: "https://web-ecoprom.vercel.app/",
      ogImage: "https://i.ibb.co/LzsjFKLv/24.png",
    }),
    [t]
  );

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "EcoProm",
      url: seoData.canonicalUrl,
      logo: seoData.ogImage,
      description: seoData.description,
      sameAs: ["https://www.instagram.com/ecoprom_uz", "https://t.me/ecopromgroup"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toshkent",
        addressCountry: "UZ",
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
        <html lang={i18n.language} />
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImage} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="relative bg-white">
        <ScrollProgress />
        <InteractiveBackground />

        {/* Hero Section */}
        <section
          className="relative flex min-h-[500px] items-center overflow-hidden pt-6 sm:min-h-[600px] md:min-h-[70vh]"
          aria-label={t("hero.aria_label", "Asosiy mahsulotlar")}
          style={{
            backgroundImage: `url(/assets/main-bg.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

          {/* Parallax effekt */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="container-pad relative z-10 w-full py-6 sm:py-8 md:py-12">
            <div className="max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroSlides[heroIndex]?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-100 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    {heroSlides[heroIndex]?.category}
                  </div>

                  <h1 className="mb-4 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
                    {heroSlides[heroIndex]?.title}
                  </h1>

                  <p className="mb-6 max-w-2xl text-base leading-7 text-white/90 drop-shadow md:text-lg md:leading-8">
                    {heroSlides[heroIndex]?.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <button
                      onClick={onOpenCall}
                      className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-8 sm:py-4 sm:text-base"
                    >
                      {t("buttons.get_info", "Ma'lumot olish")}
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>

                    <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-sm">
                      {heroSlides[heroIndex]?.badge}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-6 left-0 w-full sm:bottom-8 md:bottom-10">
            <div className="container-pad flex justify-center gap-2">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => handleHeroIndexChange(i)}
                  className={`h-2 rounded-full transition-all sm:h-2.5 ${
                    heroIndex === i
                      ? "w-8 bg-emerald-400 sm:w-10"
                      : "w-2 bg-white/50 hover:bg-white/80 sm:w-2.5"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section with Counters */}
        <SectionWrapper className="py-16 bg-gradient-to-br from-slate-50 to-white">
          <div className="container-pad">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Color Configurator */}
        <SectionWrapper className="py-16 bg-white">
          <div className="container-pad">
            <div className="text-center mb-12">
              <span className="text-emerald-600 font-medium">
                {t("colors_config.title", "Ranglar")}
              </span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">
                {t("colors_config.subtitle", "Loyihangiz rangini tanlang")}
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12">
              <Card3D className="flex-1 text-center">
                <div className="relative inline-block">
                  <img
                    src={selectedColor.image}
                    alt={selectedColor.name}
                    className="h-64 w-auto object-contain"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                    <span className="font-medium text-slate-800">
                      {selectedColor.name}
                    </span>
                  </div>
                </div>
              </Card3D>

              <div className="flex-1">
                <div className="space-y-3">
                  {panelColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                        selectedColor.id === color.id
                          ? "bg-emerald-50 border-2 border-emerald-500"
                          : "hover:bg-slate-50 border-2 border-transparent"
                      }`}
                    >
                      <div
                        className="h-12 w-12 rounded-lg shadow-md"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-slate-800">
                          {color.name}
                        </h4>
                        <p className="text-sm text-slate-500">{color.desc}</p>
                      </div>
                      {selectedColor.id === color.id && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={onOpenCall}
                  className="w-full mt-8 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all hover:scale-[1.02] shadow-lg"
                >
                  {t("colors_config.button", "Loyihani boshlash")}
                </button>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Lazy loaded komponentlar */}
        <Suspense fallback={<SkeletonLoader />}>
          <FreeSamples />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <OurProducts
            onProductClick={(product) => {
              console.log(t("product.selected", "Tanlandi:"), product);
            }}
          />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <WhyChooseUs />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <OurProduction />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <PartnerMarquee />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <AiAssistant />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <CookieConsentBanner />
        </Suspense>

        <BackToTop />
      </div>
    </>
  );
}