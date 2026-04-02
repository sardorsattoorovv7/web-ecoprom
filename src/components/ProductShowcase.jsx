import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Box, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export default function ProductShowcase() {
  const { t } = useTranslation();

  const product = {
    title: "Sovutkich eshiklari", 
    video: "/assets/door.mp4",
    desc: "Yuqori germetiklik va chidamlilikka ega sanoat eshiklari. Har qanday harorat rejimiga moslashuvchan va energiya tejamkor yechimlar.",
    features: [
      "PIR-PUR yuqori zichlikdagi to'ldirgich",
      "Zangga chidamli galvanizatsiyalangan metall",
      "Sifatli germetik rezina zichlagichlar",
      "Mustahkam italyan furniturasi"
    ]
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Orqa fondagi nuqtalar ham juda och rangga o'tkazildi */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#009A73 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Sarlavha */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-[#009A73] text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-100"
          >
            <ShieldCheck size={14} />
            <span>Sifat kafolati</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Mahsulotlarimiz <span className="text-[#009A73]">Harakatda</span>
          </h2>
        </div>

        {/* Asosiy qism */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Video: Fon oq bo'lgani uchun video kontenerini ham och rangga o'tkazdik */}
          {/* Video qismi */}
        <motion.div 
        className="lg:col-span-7 relative"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        >
        {/* 1. bg-white qildik (yonidagi bo'shliqlar oq fon bilan qo'shilib ketadi)
            2. shadow-2xl orqali faqat tashqi tomonga soya berdik
        */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white border border-slate-100 aspect-video group">
            <video
            src={product.video}
            autoPlay 
            muted 
            loop 
            playsInline
            /* object-contain videoni qirqmaydi, bg-white esa bo'shliqni yo'qotadi */
            className="w-full h-full object-contain relative z-10"
            />
            
            {/* Video ustidan o'tuvchi juda nafis ichki soya (faqat video bor joyda ko'rinadi) */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-2xl z-20" />
        </div>
        
        {/* Dekorativ yashil nur (ixtiyoriy, olib tashlasangiz ham bo'ladi) */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-400/10 rounded-full blur-[60px] -z-10" />
        </motion.div>

          {/* Ma'lumotlar */}
          <motion.div 
            className="lg:col-span-5 space-y-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h3 className="text-3xl font-extrabold text-slate-800 mb-4 leading-tight">
                {product.title}
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                {product.desc}
              </p>
            </div>

            <ul className="space-y-4">
              {product.features.map((trait, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                  <div className="mt-1 bg-emerald-50 p-1 rounded-md">
                    <CheckCircle2 className="text-[#009A73]" size={18} />
                  </div>
                  <span className="text-base">{trait}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#009A73] text-white font-bold rounded-2xl hover:bg-[#008563] transition-all shadow-lg shadow-emerald-100 active:scale-95 flex items-center gap-2 group">
                Batafsil ko'rish 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
             
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}