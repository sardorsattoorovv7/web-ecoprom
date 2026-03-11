import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-16 border-t border-slate-100 bg-slate-50">
      <div className="container-pad py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold text-lg">EcoProm</div>
          <p className="text-sm text-slate-600 mt-2">
            Sendvich panel, sovutkich kameralar va tez quriladigan binolar bo‘yicha demo sayt.
          </p>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-2">Menu</div>
          <div className="grid gap-2">
            <NavLink to="/" className="text-slate-700 hover:underline">{t("nav.home")}</NavLink>
            <NavLink to="/services" className="text-slate-700 hover:underline">{t("nav.services")}</NavLink>
            <NavLink to="/projects" className="text-slate-700 hover:underline">{t("nav.projects")}</NavLink>
            <NavLink to="/contact" className="text-slate-700 hover:underline">{t("nav.contact")}</NavLink>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-2">Contact</div>
          <div className="text-slate-700 grid gap-2">
            <div>📞 +998 (00) 000-00-00</div>
            <div>✉️ info@company.uz</div>
            <div>📍 Uzbekistan</div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="container-pad py-4 text-xs text-slate-600">
          © {new Date().getFullYear()} EcoProm. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
