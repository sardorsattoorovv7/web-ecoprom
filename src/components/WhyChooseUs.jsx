import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Award, Clock, TrendingDown, CheckCircle2,
  Star, Shield, Leaf, Headphones
} from "lucide-react";

export default function WhyChooseUs() {
  const { t } = useTranslation();

  // Ikonkalarni ID bo'yicha tartiblab olamiz
  const icons = [Award, Clock, TrendingDown, Leaf, Headphones, Shield];

  const features = useMemo(() => {
    const translatedFeatures = t("why_choose_us.features", { returnObjects: true });
    return Array.isArray(translatedFeatures) ? translatedFeatures.map((f, i) => ({
      ...f,
      id: i + 1,
      icon: icons[i] || Award
    })) : [];
  }, [t]);

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
            <span className="text-sm font-semibold text-emerald-700">{t("why_choose_us.badge")}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t("why_choose_us.title_main")}{" "}
            <span className="text-emerald-600 block">{t("why_choose_us.title_accent")}</span>
          </h2>
          <p className="text-lg text-slate-500">
            {t("why_choose_us.subtitle")}
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
                initial={{ opacity: 0, y: 40, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.12,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-emerald-100 transition-all duration-300 relative overflow-hidden"
              >
                {/* Icon */}
                <motion.div 
                  className="relative z-10 w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-125 group-hover:bg-emerald-100 transition-transform duration-300"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: index * 0.1 }}
                >
                  <Icon className="h-7 w-7 text-emerald-600 transition-colors duration-300 group-hover:text-emerald-700" />
                </motion.div>

                {/* Content */}
                <h3 className="relative z-10 text-xl font-bold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                
                <p className="relative z-10 text-slate-500 text-sm leading-relaxed mb-4">
                  {feature.desc}
                </p>

                {/* Stats badge */}
                <div className="relative z-10 inline-flex items-center gap-1.5 bg-gradient-to-r from-slate-50 to-emerald-50 px-3 py-1.5 rounded-full border border-slate-100/50 group-hover:border-emerald-200 transition-all duration-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-xs font-medium text-slate-600 group-hover:text-emerald-700 transition-colors">
                    {feature.stats}
                  </span>
                </div>

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