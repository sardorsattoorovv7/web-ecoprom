import { motion } from "framer-motion";
import { 
  Award, Clock, TrendingDown, CheckCircle2,
  Star, Shield, Leaf, Headphones
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Yuqori sifat",
    description: "Barcha 5 bosqichda sifat va texnologiya nazorati: komponentlar tanlashdan tortib ishlab chiqarishgacha",
    icon: Award,
    stats: "5 bosqichli nazorat",
  },
  {
    id: 2,
    title: "Tezkor yetkazib berish",
    description: "5 ta uzluksiz ishlab chiqarish liniyasi mahsulot yetkazib berish muddatini aniq rejalashtirish imkonini beradi",
    icon: Clock,
    stats: "5 ta liniya",
  },
  {
    id: 3,
    title: "Qulay narxlar",
    description: "Buyurtma hajmiga qarab chegirmalar, doimiy mijozlar uchun hamkorlik dasturlari",
    icon: TrendingDown,
    stats: "Moslashuvchan narx",
  },
  {
    id: 4,
    title: "Ekologik toza",
    description: "Zamonaviy ekologik standartlarga javob beradigan materiallar va ishlab chiqarish texnologiyalari",
    icon: Leaf,
    stats: "100% qayta ishlanadi",
  },
  {
    id: 5,
    title: "24/7 Qo'llab-quvvatlash",
    description: "Texnik maslahat va servis xizmati tunu-kun, har doim yoningizda",
    icon: Headphones,
    stats: "24/7 texnik yordam",
  },
  {
    id: 6,
    title: "Kafolat va sertifikat",
    description: "13 yil kafolat va xalqaro sifat sertifikatlari.",
    icon: Shield,
    stats: "13 yil kafolat",
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container-pad">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-4">
            <Star className="h-4 w-4 text-emerald-600 fill-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Nega biz?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Bizni tanlashning
            <span className="text-emerald-600 block">6 ta sababi</span>
          </h2>
          <p className="text-lg text-slate-500">
            13 yillik tajriba va 500+ muvaffaqiyatli loyihalar
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ 
                  opacity: 0, 
                  y: 40,
                  x: index % 2 === 0 ? -20 : 20
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  x: 0
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.12,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.03,
                  shadow: "0 20px 60px -24px rgba(16, 185, 129, 0.3)"
                }}
                className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-emerald-100 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                />
                
                {/* Icon */}
                <motion.div 
                  className="relative z-10 w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-125 group-hover:bg-emerald-100 transition-transform duration-300"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: index * 0.1 }}
                  whileHover={{ rotate: 360, scale: 1.3 }}
                  whileInView={{ scale: 1 }}
                >
                  <Icon className="h-7 w-7 text-emerald-600 transition-colors duration-300 group-hover:text-emerald-700" />
                </motion.div>

                {/* Content */}
                <motion.h3 
                  className="relative z-10 text-xl font-bold text-slate-800 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.1 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="relative z-10 text-slate-500 text-sm leading-relaxed mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.2 }}
                >
                  {feature.description}
                </motion.p>

                {/* Stats badge */}
                <motion.div 
                  className="relative z-10 inline-flex items-center gap-1.5 bg-gradient-to-r from-slate-50 to-emerald-50 px-3 py-1.5 rounded-full border border-slate-100/50 group-hover:border-emerald-200 group-hover:from-emerald-50 group-hover:to-emerald-100 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  </motion.div>
                  <span className="text-xs font-medium text-slate-600 group-hover:text-emerald-700 transition-colors">
                    {feature.stats}
                  </span>
                </motion.div>

                {/* Bottom border animation */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}