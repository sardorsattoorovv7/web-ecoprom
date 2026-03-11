import { faq } from "../data/faq";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section className="container-pad mt-12">
      <h2 className="text-2xl md:text-3xl font-semibold">{t("sections.faq")}</h2>
      <div className="mt-6 grid gap-3">
        {faq.map((f, idx) => (
          <details key={idx} className="card p-5">
            <summary className="cursor-pointer font-semibold">
              {lang === "ru" ? f.q_ru : f.q_uz}
            </summary>
            <div className="mt-2 text-sm text-slate-600">
              {lang === "ru" ? f.a_ru : f.a_uz}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
