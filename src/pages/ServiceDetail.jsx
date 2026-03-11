import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";
import { useTranslation } from "react-i18next";
import LeadForm from "../components/LeadForm";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Factory,
  PenTool,
  ShieldCheck,
  Snowflake,
  Wrench,
  CheckCircle2,
} from "lucide-react";

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

export default function ServiceDetail() {
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const item = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  if (!item) {
    return (
      <div className="container-pad py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Building2 className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-semibold text-slate-900">
            {t("services.notFoundTitle", { defaultValue: "Xizmat topilmadi" })}
          </h1>

          <p className="mt-3 max-w-xl text-slate-600">
            {t("services.notFoundDesc", {
              defaultValue:
                "Siz qidirayotgan xizmat sahifasi mavjud emas yoki o‘chirilgan bo‘lishi mumkin.",
            })}
          </p>

          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("services.backToServices", { defaultValue: "Xizmatlarga qaytish" })}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = getServiceIcon(item);

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-ielts-grid opacity-40" />

      <div className="container-pad relative z-10 py-10">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:underline"
          to="/services"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("services.backToServices", { defaultValue: "Xizmatlarga qaytish" })}
        </Link>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Left content */}
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-sm backdrop-blur md:col-span-2">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Icon className="h-8 w-8" strokeWidth={2.2} />
            </div>

            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              {lang === "ru" ? item.title_ru : item.title_uz}
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              {lang === "ru"
                ? item.desc_ru ||
                  "Здесь будет полное описание услуги. Позже можно добавить ваш реальный контент, технические характеристики, преимущества и этапы работы."
                : item.desc_uz ||
                  "Bu yerda xizmatning to‘liq tavsifi bo‘ladi. Keyin bu joyga sizning real kontentingiz, texnik tavsiflar, afzalliklar va ish jarayonlari kiritiladi."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-medium text-slate-900">
                      {lang === "ru" ? "Технические решения" : "Texnik yechimlar"}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {lang === "ru"
                        ? "Индивидуальный подход под каждый объект."
                        : "Har bir obyekt uchun individual yechim."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-medium text-slate-900">
                      {lang === "ru" ? "Материалы и толщина" : "Material va qalinlik"}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {lang === "ru"
                        ? "Подбор оптимального состава и параметров."
                        : "Optimal tarkib va parametrlarni tanlash."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2 xl:col-span-1">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-medium text-slate-900">
                      {lang === "ru" ? "Монтаж и гарантия" : "Montaj va kafolat"}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {lang === "ru"
                        ? "Качественная установка и сервисная поддержка."
                        : "Sifatli o‘rnatish va servis qo‘llab-quvvatlash."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {lang === "ru"
                      ? "Нужна консультация по этому направлению?"
                      : "Shu yo‘nalish bo‘yicha konsultatsiya kerakmi?"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {lang === "ru"
                      ? "Оставьте заявку и мы свяжемся с вами в ближайшее время."
                      : "So‘rov qoldiring va tez orada siz bilan bog‘lanamiz."}
                  </p>
                </div>

                <a
                  href="#lead-form"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
                >
                  {lang === "ru" ? "Оставить заявку" : "So‘rov qoldirish"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div
            id="lead-form"
            className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur"
          >
            <div className="mb-3 text-xl font-semibold text-slate-900">
              {lang === "ru" ? "Оставить заявку" : "So‘rov qoldirish"}
            </div>

            <p className="mb-5 text-sm leading-6 text-slate-600">
              {lang === "ru"
                ? "Заполните форму, и мы отправим вам первичное предложение. Позже можно подключить отправку в Telegram или Email."
                : "Formani to‘ldiring, biz sizga dastlabki taklifni yuboramiz. Keyinchalik Telegram yoki Email integratsiya qilinadi."}
            </p>

            <LeadForm compact />
          </div>
        </div>
      </div>
    </div>
  );
}