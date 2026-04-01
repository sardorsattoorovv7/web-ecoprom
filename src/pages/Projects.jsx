import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LeadForm from "../components/LeadForm";

export default function Projects() {
  const { t } = useTranslation();

  // Videolarni JSON dagi tarjimalar bilan bog'lash
  const videoData = [
    { id: 1, title: t("projects.videos.video_1"), src: "/assets/1.mp4" },
    { id: 2, title: t("projects.videos.video_2"), src: "/assets/2.mp4" },
    { id: 3, title: t("projects.videos.video_3"), src: "/assets/3.MP4" },
  ];

  const handleMouseEnter = (e) => {
    const video = e.target;
    video.muted = false;
    video.volume = 0.5;
    video.play();
  };

  const handleMouseLeave = (e) => {
    const video = e.target;
    video.pause();
    video.muted = true;
    video.currentTime = 0;
  };

  return (
    <div className="relative min-h-screen bg-slate-100">
    

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-100">
            {t("projects.badge")}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            {t("projects.title_1")} <span className="text-emerald-600">{t("projects.title_2")}</span>
          </h1>

          <p className="mt-6 text-slate-600 text-lg">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {videoData.map((video) => (
            <div key={video.id} className="group">
              
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-50 border border-emerald-100 shadow-sm hover:shadow-emerald-200/50 hover:shadow-2xl transition-all duration-500">
                
                <video 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                  loop
                  muted
                  playsInline
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <source src={video.src} type="video/mp4" />
                </video>

                {/* HOVER OVERLAY */}
                <div 
                  className="absolute inset-x-0 top-[55%] h-[45%] bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest">Live Preview</span>
                  </div>
                </div>

              </div>

              <h4 className="mt-5 text-slate-800 font-bold text-base text-center group-hover:text-emerald-600 transition-colors">
                {video.title}
              </h4>

            </div>
          ))}
        </div>

        {/* Lead Form */}
        <div className="bg-white border border-emerald-100 rounded-[40px] p-10 shadow-xl">
          <LeadForm compact={true} />
        </div>

      </div>
    </div>
  );
}