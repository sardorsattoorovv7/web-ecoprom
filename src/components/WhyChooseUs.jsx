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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-7 w-7 text-emerald-600" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Stats badge */}
                <div className="inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-xs font-medium text-slate-600">
                    {feature.stats}
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