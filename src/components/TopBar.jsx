import { useTranslation } from "react-i18next";

export default function TopBar() {
  const { t } = useTranslation();

  return (
    <div className="border-b border-slate-100 bg-slate-50">
      <div className="container-pad py-2 text-sm flex flex-wrap items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-4">
          <span className="text-slate-600">{t("topbar.phone")}: <b className="text-slate-900">+998 (00) 000-00-00</b></span>
          <span className="text-slate-600">{t("topbar.email")}: <b className="text-slate-900">info@company.uz</b></span>
          <span className="text-slate-600">{t("topbar.hours")}: <b className="text-slate-900">09:00–18:00</b></span>
        </div>
        <LanguageSwitch />
      </div>
    </div>
  );
}

function LanguageSwitch() {
  const { i18n } = useTranslation();
  const active = i18n.language;

  const Btn = ({ lang, label }) => (
    <button
      onClick={() => i18n.changeLanguage(lang)}
      className={
        "px-3 py-1 rounded-lg border text-sm transition " +
        (active === lang
          ? "bg-white border-slate-200 text-slate-900"
          : "bg-transparent border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-200")
      }
      aria-label={"Switch language to " + lang}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center gap-1">
      <Btn lang="uz" label="UZ" />
      <Btn lang="ru" label="RU" />
    </div>
  );
}
