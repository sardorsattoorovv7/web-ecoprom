import { motion } from "framer-motion";
import { Package, Download, ChevronRight } from "lucide-react";

export default function FreeSamples({ onOrderClick }) {
  return (
    <section className="py-20 bg-white/0 backdrop-blur-sm overflow-hidden">
      <div className="container-pad">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full text-sm font-semibold text-emerald-700 mb-4">
              <Package className="h-4 w-4" />
              Bepul namunalar
            </div>
            
        
            
            <p className="text-lg text-slate-500 mb-8">
              Sifatga o'zingiz baho bering. Bepul namunalar va kataloglarni buyurtma qiling
            </p>

            <button
              onClick={onOrderClick}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors group shadow-lg hover:shadow-xl"
            >
              <Download className="h-5 w-5" />
              Namunalarni buyurtma qilish
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-slate-400 mt-4">
              * PIR panel, izolyatsiya, katalog va sertifikatlar
            </p>
          </motion.div>

          {/* Right side - Image (ajralib turadi) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Soya va oq fon bilan ajratish */}
              <div className="absolute -inset-4 " />
              <div className="relative ">
                <img 
                  src="https://i.ibb.co/r2hv5xdp/photo-2026-03-11-15-39-57.jpg"
                  alt="Bepul namunalar to'plami"
                  className="w-auto h-[300px] md:h-[350px] object-contain rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Namuna+Rasmi';
                  }}
                />
              </div>
              {/* Dekorativ badge */}
             
              {/* Sertifikat belgisi */}
            
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}