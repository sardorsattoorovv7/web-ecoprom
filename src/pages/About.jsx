import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const title = lang === "ru" ? "О компании" : "Kompaniya haqida";
  const subtitle =
    lang === "ru"
      ? "Производство сэндвич-панелей и холодильных камер: проектирование, изготовление, монтаж и сервис."
      : "Sendvich panel va sovutkich kameralar: loyiha, ishlab chiqarish, montaj va servis.";

  const story =
    lang === "ru"
      ? "Это демо-страница. Здесь будет история компании, миссия, ценности, сертификаты и фотографии производства."
      : "Bu demo sahifa. Bu yerda kompaniya tarixi, missiya, qadriyatlar, sertifikatlar va ishlab chiqarish rasmlari bo‘ladi.";

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* dotted bg */}
      <div className="pointer-events-none absolute inset-0 bg-ielts-grid opacity-50" />

      <div className="relative z-10">
        {/* Header */}
        <section className="container-pad pt-16 pb-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fade} className="max-w-4xl">
            <div className="inline-flex px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-medium mb-4">
              {t("nav.about")}
            </div>

            <h1 className="display-2 text-slate-900">{title}</h1>
            <p className="text-lead text-slate-600 mt-4">{subtitle}</p>
          </motion.div>
        </section>

        {/* Story + Stats */}
        <section className="container-pad pb-10">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fade}
              className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                {lang === "ru" ? "Кто мы" : "Biz kimmiz"}
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{story}</p>

              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <MiniStat title="10+" subtitle={lang === "ru" ? "лет опыта" : "yil tajriba"} />
                <MiniStat title="3k+" subtitle={lang === "ru" ? "проектов" : "loyiha"} />
                <MiniStat title="24/7" subtitle={lang === "ru" ? "сервис" : "servis"} />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fade}
              className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {lang === "ru" ? "Миссия и подход" : "Missiya va yondashuv"}
              </h3>

              <div className="mt-4 grid gap-3">
                <InfoRow
                  title={lang === "ru" ? "Качество" : "Sifat"}
                  text={lang === "ru" ? "Контроль на каждом этапе." : "Har bir bosqichda nazorat."}
                />
                <InfoRow
                  title={lang === "ru" ? "Сроки" : "Muddat"}
                  text={lang === "ru" ? "Точное планирование и доставка." : "Aniq reja va yetkazib berish."}
                />
                <InfoRow
                  title={lang === "ru" ? "Сервис" : "Servis"}
                  text={lang === "ru" ? "Поддержка после монтажа." : "Montajdan keyin ham yordam."}
                />
              </div>

              <div className="mt-6">
                <a href="/contact" className="btn-primary w-full py-3">
                  {lang === "ru" ? "Связаться с нами" : "Bog‘lanish"}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certificates / Team / Equipment */}
        <section className="container-pad pb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fade}>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                title={lang === "ru" ? "Сертификаты" : "Sertifikatlar"}
                text={lang === "ru" ? "ISO, соответствие стандартам, документы." : "ISO, standartlarga moslik, hujjatlar."}
              />
              <FeatureCard
                title={lang === "ru" ? "Команда" : "Jamoa"}
                text={lang === "ru" ? "Инженеры, монтажники и сервис-специалисты." : "Muhandislar, montaj va servis mutaxassislari."}
              />
              <FeatureCard
                title={lang === "ru" ? "Оборудование" : "Uskuna"}
                text={lang === "ru" ? "Современные линии и контроль качества." : "Zamonaviy liniyalar va sifat nazorati."}
              />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fade} className="mt-10">
            <div className="rounded-[2rem] border border-slate-200 bg-white/80 backdrop-blur p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-sm font-semibold text-emerald-700">
                  {lang === "ru" ? "Хотите узнать больше?" : "Batafsil bilmoqchimisiz?"}
                </div>
                <div className="text-2xl font-semibold text-slate-900 mt-2">
                  {lang === "ru" ? "Получите консультацию по вашему проекту" : "Loyihangiz bo‘yicha konsultatsiya oling"}
                </div>
                <p className="text-slate-600 mt-2">
                  {lang === "ru"
                    ? "Оставьте заявку — мы свяжемся и предложим решение."
                    : "So‘rov qoldiring — bog‘lanib yechim taklif qilamiz."}
                </p>
              </div>

              <a className="btn-primary px-8 py-3" href="/contact">
                {lang === "ru" ? "Оставить заявку" : "So‘rov qoldirish"}
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
    <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4 text-center">
      <div className="text-2xl font-bold gradient-text">{title}</div>
      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">
        {subtitle}
      </div>
    </div>
  );
}

function InfoRow({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-sm text-slate-600 mt-1">{text}</div>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7 hover:shadow-2xl transition">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 grid place-items-center text-emerald-700 font-bold">
        ✓
      </div>
      <div className="text-xl font-semibold text-slate-900 mt-5">{title}</div>
      <p className="text-slate-600 mt-2 leading-relaxed">{text}</p>
      <div className="mt-5 text-emerald-700 font-semibold text-sm">
        {title} →
      </div>
    </div>
  );
}
