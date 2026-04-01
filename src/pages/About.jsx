import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100">
      {/* Kvadratcha grid background */}
      

      <div className="relative z-10">
        {/* Header */}
        <section className="container-pad pt-16 pb-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="max-w-4xl">
            <div className="inline-flex px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-medium mb-4">
              {t("nav.about")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900">{t("about.title")}</h1>
            <p className="text-xl text-slate-600 mt-4">{t("about.subtitle")}</p>
          </motion.div>
        </section>

        {/* Story + Video */}
        <section className="container-pad pb-10">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}
              className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white/40 backdrop-blur-sm p-7"
            >
              <h2 className="text-2xl font-semibold text-slate-900">{t("about.who_we_are")}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{t("about.story")}</p>

              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <MiniStat title="13+" subtitle={t("about.stats.experience")} />
                <MiniStat title="3k+" subtitle={t("about.stats.projects")} />
                <MiniStat title="24/7" subtitle={t("about.stats.service")} />
              </div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}
              className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-7 overflow-hidden"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{t("about.video_title")}</h3>
              <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/SJ7EhMYrMW0"
                  title="EcoProm Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-slate-500 mt-4 text-center">{t("about.video_desc")}</p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="container-pad pb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard title={t("about.features.certificates.title")} text={t("about.features.certificates.desc")} />
              <FeatureCard title={t("about.features.team.title")} text={t("about.features.team.desc")} />
              <FeatureCard title={t("about.features.equipment.title")} text={t("about.features.equipment.desc")} />
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="mt-10">
            <div className="rounded-[2rem] border border-slate-200 bg-emerald-900 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
              <div>
                <div className="text-sm font-semibold text-emerald-400">{t("about.cta.question")}</div>
                <div className="text-2xl font-semibold mt-2">{t("about.cta.title")}</div>
                <p className="text-emerald-100/70 mt-2">{t("about.cta.desc")}</p>
              </div>
              <a className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-xl font-bold transition-all" href="/contact">
                {t("about.cta.button")}
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function MiniStat({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
      <div className="text-2xl font-bold text-emerald-600">{title}</div>
      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">{subtitle}</div>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 grid place-items-center text-emerald-700 font-bold text-xl">✓</div>
      <div className="text-xl font-semibold text-slate-900 mt-5">{title}</div>
      <p className="text-slate-600 mt-2 leading-relaxed text-sm">{text}</p>
    </div>
  );
}