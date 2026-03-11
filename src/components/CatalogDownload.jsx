import { useTranslation } from "react-i18next";

export default function CatalogDownload() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section className="container-pad mt-12">
      <div className="card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{t("sections.catalog")}</h2>
          <p className="text-sm text-slate-600 mt-2">
            {lang === "ru"
              ? "Скачайте демо‑каталог (PDF). Позже заменим на ваш файл."
              : "Demo katalogni yuklab oling (PDF). Keyin o‘zingiznikiga almashtiramiz."}
          </p>
        </div>
        <a className="btn-primary" href="/assets/catalog-demo.pdf" download>
          PDF
        </a>
      </div>
    </section>
  );
}
