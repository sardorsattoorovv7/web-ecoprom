import ProjectTabs from "../components/ProjectTabs";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white/0">
      {/* Kvadratcha grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

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
          <div className="rounded-3xl border border-slate-200 bg-white/0 backdrop-blur-sm p-6 shadow-sm md:p-8">
            <ProjectTabs />
          </div>
        </section>
      </div>
    </div>
  );
}