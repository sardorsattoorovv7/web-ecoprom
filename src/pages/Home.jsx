import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import OurProducts from "../components/OurProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import FreeSamples from "../components/FreeSamples";
import OurProjects from "../components/OurProjects";
import OurProduction from "../components/OurProduction";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

/* ---------------- 1. DYNAMIK HERO MA'LUMOTLARI ---------------- */
const SLIDES = [
  {
    id: "pir",
    category: "Poliuretan Tizimlari",
    title: "PIR Sendvich panellar",
    desc: "Issiqlik izolyatsiyasi bo'yicha eng yuqori ko'rsatkich. Energiyani 40% gacha tejaydigan zamonaviy panel tizimlari.",
    image: "https://i.ibb.co/LzsjFKLv/24.png",
    badge: "Premium sifat",
  },
  {
    id: "cold",
    category: "Sovutish Texnologiyasi",
    title: "Sovutgich Kameralar",
    desc: "Meva-sabzavot va go'sht mahsulotlari uchun maxsus harorat nazorati ostidagi professional omborxonalar.",
    image: "https://i.ibb.co/cKxQGBF7/27.png",
    badge: "Energiya tejamkor",
  },
  {
    id: "doors",
    category: "Sanoat qurilishi",
    title: "Sanoat binolari",
    desc: "Tezkor montaj qilinadigan va yillar davomida xizmat qiladigan mustahkam va ishonchli qurilmalar.",
    image: "https://i.ibb.co/xK8Hk6TM/26.png",
    badge: "Tez montaj",
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
  },
  {
    id: "blue",
    name: "Ko'k",
    hex: "#2563EB",
    image: "https://i.ibb.co/jXSNfy9/kok.jpg",
    desc: "Sovutish omborlari uchun ideal",
  },
  {
    id: "red",
    name: "Qizil",
    hex: "#DC2626",
    image: "https://i.ibb.co/Xx5vNwF3/qizil.jpg",
    desc: "Brending uchun maxsus rang",
  },
  {
    id: "green",
    name: "Yashil",
    hex: "#16A34A",
    image: "https://i.ibb.co/DHnkBPs8/yashil.jpg",
    desc: "Ekologik loyihalar uchun",
  },
];

export default function EcoPromMain({ onOpenCall }) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PANEL_COLORS[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const seoTitle =
    "EcoProm — PIR sendvich panellar, sovutgich kameralar va sanoat binolari";
  const seoDescription =
    "EcoProm zamonaviy PIR sendvich panellar, sovutgich kameralar va sanoat binolari ishlab chiqaradi. Yuqori issiqlik izolyatsiyasi, tez montaj va ishonchli sifat.";
  const canonicalUrl = "https://web-ecoprom.vercel.app/";
  const ogImage = "https://i.ibb.co/LzsjFKLv/24.png";

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "EcoProm",
      url: canonicalUrl,
      logo: ogImage,
      description: seoDescription,
      sameAs: [],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          areaServed: "UZ",
          availableLanguage: ["uz", "ru"],
        },
      ],
    }),
    []
  );

  const websiteStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "EcoProm",
      url: canonicalUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${canonicalUrl}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    }),
    []
  );

  return (
    <>
      <Helmet>
        <html lang="uz" />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content="PIR sendvich panel, poliuretan panel, sovutgich kamera, sanoat binolari, sendvich panel Uzbekistan, EcoProm, poliuretan tizimlari, sovutish texnologiyasi"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="EcoProm" />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
      </Helmet>

      <div className="relative bg-white">
        {/* DOTTED BACKGROUND */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-blue-50/30" />
        </div>

        {/* ---------------- SECTION 1: HERO ---------------- */}
        <section className="relative flex min-h-[auto] items-center overflow-hidden pt-6 sm:pt-8 md:min-h-screen">
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
                      <Sparkles className="h-4 w-4" />
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
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:px-6 sm:py-3.5 sm:text-base md:px-8 md:py-4"
                      >
                        Ma'lumot olish
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>

                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 sm:px-4 sm:py-2 sm:text-sm">
                        {SLIDES[heroIndex].badge}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* IMAGE */}
              <div className="relative flex min-h-[220px] items-center justify-center sm:min-h-[280px] md:min-h-[420px] lg:min-h-[560px]">
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
                      className="h-[180px] w-auto object-contain sm:h-[230px] md:h-[360px] lg:h-[560px] xl:h-[640px]"
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
                  onClick={() => setHeroIndex(i)}
                  aria-label={`${slide.title} slaydiga o'tish`}
                  className={`h-1.5 rounded-full transition-all ${
                    heroIndex === i
                      ? "w-8 bg-emerald-500"
                      : "w-6 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 2: COLOR CONFIGURATOR ---------------- */}
        <section className="relative bg-white py-10 sm:py-12 md:py-20 lg:py-24">
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
              <div className="flex min-h-[220px] items-center justify-center sm:min-h-[280px] md:min-h-[340px] lg:min-h-[440px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedColor.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={selectedColor.image}
                      alt={`${selectedColor.name} rangli panel`}
                      loading="lazy"
                      className="h-[180px] w-auto object-contain sm:h-[240px] md:h-[300px] lg:h-[480px]"
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
                      onClick={() => setSelectedColor(color)}
                      aria-label={`${color.name} rangini tanlash`}
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
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:px-6"
                  >
                    Buyurtma berish
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FreeSamples />
        <OurProducts
          onProductClick={(product) => {
            console.log("Tanlandi:", product);
          }}
        />
        <WhyChooseUs />
        <OurProjects />
        <OurProduction />
      </div>
    </>
  );
}
