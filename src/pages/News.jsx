import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const NEWS = [
  {
    id: 1,
    slug: "new-line",
    date: "2025-12-01",
    title_uz: "Yangi ishlab chiqarish liniyasi ishga tushdi",
    title_ru: "Запуск новой производственной линии",
    excerpt_uz: "Korxonamizda yangi zamonaviy ishlab chiqarish liniyasi ishga tushirildi.",
    excerpt_ru: "На предприятии запущена новая современная производственная линия.",
  },
  {
    id: 2,
    slug: "new-project",
    date: "2025-11-15",
    title_uz: "Yirik loyiha muvaffaqiyatli yakunlandi",
    title_ru: "Крупный проект успешно завершён",
    excerpt_uz: "Sanoat obyektlari uchun mo‘ljallangan loyiha to‘liq yakunlandi.",
    excerpt_ru: "Полностью завершён проект для промышленного объекта.",
  },
];

const cardAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export default function News() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return NEWS;
    return NEWS.filter((n) =>
      (lang === "ru" ? n.title_ru : n.title_uz).toLowerCase().includes(s)
    );
  }, [q, lang]);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* 🔴 dotted background */}
      <div className="pointer-events-none absolute inset-0 bg-ielts-grid opacity-50" />

      <div className="relative z-10">
        {/* ===== Header ===== */}
        <section className="container-pad pt-16 pb-10">
          <div className="max-w-3xl">
            <div className="inline-flex px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-medium mb-4">
              {t("nav.news")}
            </div>

            <h1 className="display-2 text-slate-900">
              {t("nav.news")}
            </h1>

            <p className="text-lead text-slate-600 mt-4">
              Kompaniyamizdagi yangiliklar, loyihalar va muhim voqealar bilan tanishing.
            </p>

            {/* Search */}
            <div className="mt-6 max-w-md">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={lang === "ru" ? "Поиск новостей..." : "Yangiliklardan qidirish..."}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ===== News list ===== */}
        <section className="container-pad pb-20">
          <div className="grid gap-6">
            {filtered.map((n, i) => (
              <motion.article
                key={n.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardAnim}
                className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7 transition hover:shadow-2xl"
              >
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <time className="text-xs font-semibold text-slate-500 tracking-wide">
                    {n.date}
                  </time>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                    News
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900">
                  {lang === "ru" ? n.title_ru : n.title_uz}
                </h3>

                <p className="mt-3 text-slate-600 leading-relaxed max-w-3xl">
                  {lang === "ru" ? n.excerpt_ru : n.excerpt_uz}
                </p>

                <div className="mt-5 flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                  Batafsil o‘qish
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </motion.article>
            ))}

            {filtered.length === 0 && (
              <div className="text-center text-slate-500 py-16">
                {lang === "ru" ? "Новостей не найдено" : "Yangilik topilmadi"}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
