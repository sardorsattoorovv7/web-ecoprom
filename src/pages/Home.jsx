  import { useState, useEffect } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import OurProducts from "../components/OurProducts";
  import WhyChooseUs from "../components/WhyChooseUs";
  import {
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Award,
  } from "lucide-react";
  import FreeSamples from "../components/FreeSamples";
  import OurProjects from "../components/OurProjects";
  import OurProduction from "../components/OurProduction";


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

    return (
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
        <section className="relative flex min-h-screen items-center overflow-hidden">
          <div className="container-pad relative z-10 w-full py-10 md:py-14">
            <div className="grid min-h-[700px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* TEXT */}
              <div className="relative h-[420px] md:h-[440px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={SLIDES[heroIndex].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                      <Sparkles className="h-4 w-4" />
                      {SLIDES[heroIndex].category}
                    </div>

                    <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl xl:text-6xl">
                      {SLIDES[heroIndex].title}
                    </h1>

                    <p className="mb-8 max-w-lg text-base leading-7 text-slate-600 md:text-lg">
                      {SLIDES[heroIndex].desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={onOpenCall}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-emerald-700"
                      >
                        Ma'lumot olish
                        <ArrowRight className="h-5 w-5" />
                      </button>

                      <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
                        {SLIDES[heroIndex].badge}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* IMAGE */}
              <div className="relative flex h-[520px] items-center justify-center lg:h-[620px]">
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
                      alt={SLIDES[heroIndex].title}
                      className="h-[380px] w-auto object-contain md:h-[460px] lg:h-[720px] xl:h-[760px]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-10 left-0 w-full">
            <div className="container-pad flex justify-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
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
        <section className="relative bg-white py-20 md:py-24">
          <div className="container-pad relative z-10">
            <div className="mb-14 text-center">
              <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
                O'z loyihangizni yarating
              </h2>
              <p className="text-lg text-slate-600">
                Rangni tanlang va natijani ko'ring
              </p>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Visual Display */}
              <div className="flex min-h-[360px] items-center justify-center lg:min-h-[440px]">
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
                      alt={selectedColor.name}
                      className="h-[280px] w-auto object-contain md:h-[340px] lg:h-[600px]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Ranglar paneli */}
              <div>
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                    {selectedColor.name}
                  </h3>
                  <p className="text-slate-600">{selectedColor.desc}</p>
                </div>

                <div className="mb-8 flex flex-wrap gap-4">
                  {PANEL_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`relative h-12 w-12 rounded-full transition-all ${
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

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                

                  <button
                    onClick={onOpenCall}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    Buyurtma berish
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FreeSamples/>
        <OurProducts onProductClick={(product) => {
          console.log("Tanlandi:", product);
          // Modal ochish yoki boshqa amal
        }} />
        <WhyChooseUs />
        <OurProjects />
        <OurProduction />
      </div>
    );
  }