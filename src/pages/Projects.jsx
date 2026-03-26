import { useTranslation } from "react-i18next";
import LeadForm from "../components/LeadForm";

const videoData = [
  { id: 1, title: "Zanglamas metall panel", src: "/assets/1.mp4" },
  { id: 2, title: "Eng Zamonaviy texnologiyalar", src: "/assets/2.mp4" },
  { id: 3, title: "Aydar Ko'l 2026 Biznes uchrashuv", src: "/assets/3.MP4" },
];

export default function Projects() {
  const { t } = useTranslation();

  // Ovozni boshqarish funksiyalari
  const handleMouseEnter = (e) => {
    const video = e.target;
    video.muted = false; // Ovozni yoqish
    video.volume = 0.5;  // Ovoz balandligi (0.0 dan 1.0 gacha)
    video.play();
  };

  const handleMouseLeave = (e) => {
    const video = e.target;
    video.pause();
    video.muted = true;  // Qayta ovozsiz holatga keltirish
    video.currentTime = 0; // Videoni boshiga qaytarish (ixtiyoriy)
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Kvadratcha (Grid) Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #10b981 1px, transparent 1px),
            linear-gradient(to bottom, #10b981 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        
        {/* Sarlavha qismi */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-100">
            Eco Technology
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Ish jarayonidan <span className="text-emerald-600">lavhalar</span>
          </h1>
          <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-2xl">
            Bizning texnologik jarayonlarimiz va amalga oshirilgan loyihalarimizning qisqacha video sharhlari.
          </p>
        </div>

        {/* Video Grid - 3 ta video bo'lgani uchun grid-cols-3 qilish ham mumkin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {videoData.map((video) => (
            <div key={video.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-50 border border-emerald-100 shadow-sm transition-all duration-500 hover:shadow-emerald-200/50 hover:shadow-2xl hover:-translate-y-2">
                <video 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                  loop
                  muted // Brauzer talabi bo'yicha boshlang'ich holat muted bo'lishi kerak
                  playsInline
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                
                {/* Video ustidagi yozuv */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center gap-2 text-white">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
              <h4 className="mt-5 text-slate-800 font-bold text-base text-center group-hover:text-emerald-600 transition-colors">
                {video.title}
              </h4>
            </div>
          ))}
        </div>

        {/* LeadForm Section */}
        <div className="relative overflow-hidden bg-white border border-emerald-100 rounded-[40px] p-8 md:p-16 shadow-xl shadow-emerald-50/50">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Loyihangiz uchun <br/> 
                <span className="text-emerald-600 font-black italic underline decoration-emerald-200">mutaxassis</span> kerakmi?
              </h2>
              <ul className="space-y-5">
                {[
                  "Bepul o'lchov va konsultatsiya",
                  "Individual loyihalash xizmati",
                  "Sifat nazorati va kafolat"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-600 font-medium">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-emerald-50 shadow-inner">
              <LeadForm compact={true} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}