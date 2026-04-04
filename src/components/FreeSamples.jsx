import { motion } from "framer-motion";
import { Package, Sparkles, CheckCircle, Award } from "lucide-react";
import { useTranslation } from "react-i18next"; // i18n import qilindi
import LeadForm from "../components/LeadForm";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function FreeSamples() {
  const { t } = useTranslation();

  return (
    <section className="py-20 mb-20 bg-slate-100 rounded-2xl shadow-md max-w-7xl w-full px-4 mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div 
              variants={fadeUp}
              custom={1}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg"
            >
              <Package className="h-4 w-4" />
              {t("free_samples.badge")}
              <Sparkles className="h-3 w-3 ml-1" />
            </motion.div>

            {/* Title */}
            <motion.h2 
              variants={fadeUp}
              custom={2}
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
            >
              {t("free_samples.title_1")}{" "}
              <span className="text-emerald-600 block mt-2">
                {t("free_samples.title_2")}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={fadeUp}
              custom={3}
              className="text-lg text-slate-600 mb-8"
            >
              {t("free_samples.desc_1")}{" "}
              <span className="text-emerald-600 font-semibold"> {t("free_samples.desc_2")} </span> 
              {t("free_samples.desc_3")}
            </motion.p>

            {/* Features */}
            <motion.div 
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start"
            >
              {t("free_samples.items", { returnObjects: true }).map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-sm text-slate-600 bg-white/70 backdrop-blur px-4 py-2 rounded-full shadow"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* 🔥 PREMIUM LEAD FORM */}
            <motion.div
              variants={fadeUp}
              custom={5}
            >
              <div className="bg-white/50 border border-emerald-100 rounded-[40px] p-8 md:p-10 shadow-lg">
                <LeadForm compact={true} />
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="relative group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-300 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition" />

              <div className="relative rounded-2xl bg-gradient-to-br from-white to-emerald-50 p-4 shadow-2xl">
                <img 
                  src="/assets/sampples.png"
                  alt={t("free_samples.badge")}
                  className="w-auto h-[350px] md:h-[400px] object-contain rounded-xl relative z-10 drop-shadow-2xl group-hover:scale-105 transition duration-500"
                />

                {/* Floating icons */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-emerald-600 text-white p-3 rounded-full shadow-xl"
                >
                  <Award className="h-6 w-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-white text-emerald-600 p-3 rounded-full shadow-xl border-2 border-emerald-500"
                >
                  <Package className="h-6 w-6" />
                </motion.div>
              </div>
            </div>
          </motion.div>

      </div>
    </section>
  );
}