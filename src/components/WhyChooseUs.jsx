import { motion } from "framer-motion";
import { 
  Award, Clock, TrendingDown, CheckCircle2,
  ArrowRight 
} from "lucide-react";

const reasons = [
  {
    id: 1,
    title: "Sifat",
    description: "Barcha 5 bosqichda sifat va texnologiya nazorati: komponentlar tanlashdan tortib ishlab chiqarishgacha",
    icon: Award,
    stats: "5 bosqichli nazorat",
  },
  {
    id: 2,
    title: "Muddat",
    description: "5 ta uzluksiz ishlab chiqarish liniyasi mahsulot yetkazib berish muddatini aniq rejalashtirish imkonini beradi",
    icon: Clock,
    stats: "2 ta liniya",
  },
  {
    id: 3,
    title: "Narx",
    description: "Buyurtma hajmiga qarab chegirmalar, doimiy mijozlar uchun hamkorlik dasturlari",
    icon: TrendingDown,
    stats: "Moslashuvchan narx",
  }
];

const projects = [
  {
    id: 1,
    name: "Logistika markazi",
    location: "Toshkent, O'zbekiston",
    area: "5000 m²",
    image: "https://i.ibb.co/LzsjFKLv/24.png",
    year: "2024"
  },
  {
    id: 2,
    name: "Sovutgich ombori",
    location: "Samarqand, O'zbekiston",
    area: "3200 m²",
    image: "https://i.ibb.co/cKxQGBF7/27.png",
    year: "2023"
  },
  {
    id: 3,
    name: "Sanoat sexi",
    location: "Andijon, O'zbekiston",
    area: "2800 m²",
    image: "https://i.ibb.co/xK8Hk6TM/26.png",
    year: "2024"
  },
  {
    id: 4,
    name: "Muzlatgich kamerasi",
    location: "Farg'ona, O'zbekiston",
    area: "1500 m²",
    image: "https://i.ibb.co/Mxb7XYpz/29.png",
    year: "2023"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background faqat shu section uchun */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-emerald-50/30 rounded-full blur-3xl" />
      </div>

      <div className="container-pad relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nega <span className="text-emerald-600">bizni</span> tanlashadi
          </h2>
          <p className="text-lg text-slate-500">
            12 yillik tajriba va 500+ muvaffaqiyatli loyihalar
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-8 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-emerald-600" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  {reason.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {reason.description}
                </p>

                {/* Stats */}
                <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">
                    {reason.stats}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

  
      </div>
    </section>
  );
}