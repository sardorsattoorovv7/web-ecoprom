import ProjectTabs from "../components/ProjectTabs";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-ielts-grid opacity-40" />

      <div className="relative z-10">
        <section className="container-pad pb-6 pt-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              {t("nav.projects", { defaultValue: "Loyihalar" })}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {t("nav.projects", { defaultValue: "Loyihalar" })}
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              {t("projects.pageSubtitle", {
                defaultValue:
                  "Hududlar bo‘yicha amalga oshirilgan loyihalarimiz bilan tanishing. Shahar bo‘yicha filter orqali kerakli obyektlarni tez topishingiz mumkin.",
              })}
            </p>
          </div>
        </section>

        <section className="container-pad pb-20">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
            <ProjectTabs />
          </div>
        </section>
      </div>
    </div>
  );
}