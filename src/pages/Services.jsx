import { services } from "../data/services";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Wrench,
  PenTool,
  Snowflake,
  ShieldCheck,
  Factory,
} from "lucide-react";

const cardAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

function getServiceIcon(service) {
  const key = `${service.slug} ${service.title_uz ?? ""} ${service.title_ru ?? ""}`.toLowerCase();

  if (
    key.includes("project") ||
    key.includes("loyiha") ||
    key.includes("design")
  ) {
    return PenTool;
  }

  if (
    key.includes("montaj") ||
    key.includes("install") ||
    key.includes("o‘rnatish") ||
    key.includes("ornatish")
  ) {
    return Wrench;
  }

  if (
    key.includes("sovut") ||
    key.includes("cold") ||
    key.includes("cool") ||
    key.includes("kamera") ||
    key.includes("refriger")
  ) {
    return Snowflake;
  }

  if (
    key.includes("servis") ||
    key.includes("service") ||
    key.includes("ta'mir") ||
    key.includes("tamir")
  ) {
    return ShieldCheck;
  }

  if (
    key.includes("zavod") ||
    key.includes("factory") ||
    key.includes("ishlab chiqar")
  ) {
    return Factory;
  }

  return Building2;
}

export default function Services() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-ielts-grid opacity-40" />

      <div className="relative z-10">
        {/* Header */}
        <section className="container-pad pb-10 pt-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              {t("nav.services", { defaultValue: "Xizmatlar" })}
            </div>

            <h1 className="display-2 text-slate-900">
              {t("nav.services", { defaultValue: "Xizmatlar" })}
            </h1>

            <p className="mt-4 text-lead text-slate-600">
              {t("services.pageSubtitle", {
                defaultValue:
                  "Biz sendvich panellar va sovutkich kameralar bo‘yicha to‘liq xizmatlar ko‘rsatamiz: loyihalashdan tortib montaj va servisgacha.",
              })}
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="container-pad pb-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = getServiceIcon(s);

              return (
                <motion.div
                  key={s.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardAnim}
                >
                  <Link
                    to={`/services/${s.slug}`}
                    className="group block h-full rounded-3xl border border-slate-200 bg-white/85 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-2xl"
                  >
                    {/* Icon */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-100">
                      <Icon className="h-7 w-7" strokeWidth={2.2} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900">
                      {lang === "ru" ? s.title_ru : s.title_uz}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {lang === "ru" ? s.desc_ru : s.desc_uz}
                    </p>

                    {/* CTA */}
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                      {t("common.learnMore", { defaultValue: "Batafsil" })}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}