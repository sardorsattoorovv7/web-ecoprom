import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Phone, Mail, MapPin, Instagram, Facebook, 
  Send, Shield, Award, Clock, ChevronRight,
  Package, Snowflake, Factory, Heart
} from "lucide-react";

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/ecoprom_uz", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Facebook, href: "https://www.facebook.com/share/188Fga4yAs/", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Send, href: "https://t.me/ecopromgroup", label: "Telegram", color: "hover:text-sky-500" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@eco.prom8616", label: "TikTok", color: "hover:text-white" },
    { icon: YouTubeIcon, href: "https://youtube.com", label: "YouTube", color: "hover:bg-[#ff0000]" },

  ];

  const quickLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const products = t("footer.products", { returnObjects: true });
  const productIcons = [Package, Snowflake, Factory, Factory];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900 text-white overflow-hidden">
      {/* Kvadratcha grid background */}
      {/* <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      /> */}

      {/* Background decoration - yumshoqroq qilindi */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-pad relative z-10 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Logo & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Logo rasm */}
              <img 
                src="/logo.png" 
                alt="EcoProm Logo" 
                className="w-24 h-24 object-contain rounded-xl"
              />
              <div>
                <span className="text-xl font-bold text-white">EcoProm</span>
                <span className="block text-xs text-emerald-400">{t("footer.premium")}</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              {t("footer.experience")}
            </p>

            {/* <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full">
                <Shield className="h-3 w-3 text-emerald-400" />
                <span className="text-xs">ISO 9001</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full">
                <Award className="h-3 w-3 text-emerald-400" />
                <span className="text-xs">13 yil</span>
              </div>
            </div> */}

            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-slate-300 hover:scale-110 transition-all ${social.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="text-sm text-slate-300 hover:text-emerald-400 transition flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("footer.productsTitle")}</h3>
            <ul className="space-y-2">
              {products.map((product, idx) => {
                const Icon = productIcons[idx];
                return (
                  <li key={product} className="flex items-center gap-2 text-sm text-slate-300">
                    <Icon className="h-3.5 w-3.5 text-emerald-400" />
                    {product}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("footer.contactTitle")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <Phone className="h-4 w-4 text-emerald-400" />
                <a href="tel:+998785558616" className="hover:text-emerald-400">+998 (78) 555-86-16</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <Mail className="h-4 w-4 text-emerald-400" />
                <a href="mailto:info@ecoprom.uz" className="hover:text-emerald-400">info@ecoprom.uz</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>{t("footer.addressShort")}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>{t("footer.workTime")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-slate-400">
          <p>© {currentYear} EcoProm. {t("footer.rights")}</p>
          <p className="mt-1">{t("footer.addressLong")}</p>
        </div>
      </div>
    </footer>
  );
}