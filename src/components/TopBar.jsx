import { useTranslation } from "react-i18next";
import { Phone, Mail, Clock, Globe } from "lucide-react"; // Ikonkalar uchun

export default function TopBar() {
  const { t } = useTranslation();

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="container-pad py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden">
        
        {/* Aloqa ma'lumotlari */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
          <ContactItem 
            icon={<Phone size={14} />} 
            label={t("topbar.phone")} 
            value="+998 (78) 555-86-16" 
            href="tel:+998785558616"
          />
          <ContactItem 
            icon={<Mail size={14} />} 
            label={t("topbar.email")} 
            value="info@ecoprom.uz" 
            href="mailto:info@ecoprom.uz"
          />
          <ContactItem 
            icon={<Clock size={14} />} 
            label={t("topbar.hours")} 
            value="08:00 – 18:00" 
          />
        </div>

        {/* Til o'zgartirgich */}
       
      </div>
    </div>
  );
}

// Aloqa elementlari uchun yordamchi komponent
function ContactItem({ icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-2 group cursor-default">
      <span className="text-emerald-600 group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <span className="text-[13px] text-slate-500 font-medium tracking-tight">
        <span className="hidden md:inline">{label}:</span>{" "}
        <span className="text-slate-800 group-hover:text-emerald-700 transition-colors">
          {value}
        </span>
      </span>
    </div>
  );

  return href ? <a href={href} className="hover:no-underline">{content}</a> : content;
}

function LanguageSwitch() {
  const { i18n } = useTranslation();
  const active = i18n.language;

  const Btn = ({ lang, label }) => (
    <button
      onClick={() => i18n.changeLanguage(lang)}
      className={`
        relative px-3 py-1 text-[12px] font-bold transition-all duration-300 rounded-md
        ${active === lang 
          ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-200" 
          : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
      <Btn lang="uz" label="UZ" />
      <Btn lang="ru" label="RU" />
    </div>
  );
}
