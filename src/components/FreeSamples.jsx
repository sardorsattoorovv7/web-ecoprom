import { motion } from "framer-motion";
import { Package, Download, ChevronRight, Sparkles, CheckCircle, Award, FileText } from "lucide-react";

export default function FreeSamples({ onOrderClick }) {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-emerald-50/20 to-white overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container-pad relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge with animation */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-emerald-200"
            >
              <Package className="h-4 w-4" />
              Bepul namunalar
              <Sparkles className="h-3 w-3 ml-1" />
            </motion.div>
            
            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
            >
              Mahsulotlarimizni 
              <span className="text-emerald-600 block mt-2">sinab ko'ring</span>
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-600 mb-8 leading-relaxed"
            >
              Sifatga o'zingiz baho bering. Bepul namunalar va kataloglarni 
              <span className="text-emerald-600 font-semibold"> bugun </span> 
              buyurtma qiling
            </motion.p>

            {/* Features list */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start"
            >
              {[
                "Panel namunalari",
                "Izolyatsiya materiallari",
                "Katalog"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-white/0 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  {item}
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={onOrderClick}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-10 py-5 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 group shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Download className="h-5 w-5 group-hover:animate-bounce" />
                Namunalarni buyurtma qilish
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Additional info */}
          </motion.div>

          {/* Right side - Image with effects */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Main image container */}
            <div className="relative group">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-300 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
              
              {/* Image with glow effect */}
              <div className="relative rounded-2xl bg-gradient-to-br from-white to-emerald-50 p-4 shadow-2xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src="/assets/sampples.png"
                  alt="Bepul namunalar to'plami"
                  className="w-auto h-[350px] md:h-[400px] object-contain rounded-xl relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Namuna+Rasmi';
                  }}
                />
                
                {/* Floating badges */}
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-emerald-600 text-white p-3 rounded-full shadow-xl z-20"
                >
                  <Award className="h-6 w-6" />
                </motion.div>
                
                <motion.div 
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-white text-emerald-600 p-3 rounded-full shadow-xl z-20 border-2 border-emerald-500"
                >
                  <Package className="h-6 w-6" />
                </motion.div>
              </div>

              {/* Stats card */}
              
            </div>
          </motion.div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
      </div>
    </section>
  );
}