import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { 
  Phone, Mail, MapPin, Instagram, Facebook, 
  Send, Video, Heart, Shield, Award, Clock,
  ChevronRight, Sparkles, Building2, Package,
  Snowflake, DoorOpen, Factory
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/ecoprom_uz", label: "Instagram", color: "hover:text-pink-600" },
    { icon: Facebook, href: "https://www.facebook.com/share/188Fga4yAs/?mibextid=wwXIfr", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Send, href: "https://t.me/ecopromgroup", label: "Telegram", color: "hover:text-sky-500" },
    { icon: Video, href: "https://www.tiktok.com/@eco.prom8616", label: "TikTok", color: "hover:text-black" }
  ];

  const quickLinks = [
    { to: "/", label: "Bosh sahifa", icon: Sparkles },
    { to: "/services", label: "Xizmatlar", icon: Factory },
    { to: "/projects", label: "Loyihalar", icon: Building2 },
    { to: "/contact", label: "Bog'lanish", icon: Phone }
  ];

  const products = [
    { name: "PIR panellar", icon: Package },
    { name: "Sovutgich kameralar", icon: Snowflake },
    { name: "Sanoat eshiklari", icon: DoorOpen },
    { name: "Metall konstruksiyalar", icon: Factory }
  ];

  const contactInfo = [
    { icon: Phone, text: "+998 (90) 123-45-67", href: "tel:+998901234567" },
    { icon: Mail, text: "info@ecoprom.uz", href: "mailto:info@ecoprom.uz" },
    { icon: MapPin, text: "Samarkand, O'zbekiston", href: "https://maps.app.goo.gl/tngiRwULxeyuxszT9?g_st=it" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 to-white border-t border-slate-100 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-pad relative z-10">
        {/* Main Footer */}
        <div className="grid lg:grid-cols-4 gap-10 py-16">
          
          {/* Company Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800">EcoProm</span>
                <span className="block text-xs text-emerald-600 font-medium">Premium sifat</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 leading-relaxed">
              Sendvich panellar, sovutgich kameralar va tez quriladigan binolar ishlab chiqarish.
              10 yillik tajriba, 500+ muvaffaqiyatli loyiha.
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">ISO 9001</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
                <Award className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">10 yil</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Biz bilan bog'laning</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:scale-110 transition-all duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-5">
              Tezkor havolalar
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{link.label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            {/* Products mini list */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
                Mahsulotlar
              </h4>
              <ul className="space-y-2">
                {products.map((product) => {
                  const Icon = product.icon;
                  return (
                    <li key={product.name} className="flex items-center gap-2 text-slate-500 text-sm">
                      <Icon className="h-4 w-4 text-emerald-500" />
                      {product.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-5">
              Bog'lanish
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {contactInfo.slice(0, 3).map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.text}
                      href={item.href}
                      className="flex items-center gap-3 text-slate-500 hover:text-emerald-600 transition-colors group"
                    >
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                        <Icon className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </a>
                  );
                })}
              </div>
              <div className="space-y-4">
                {contactInfo.slice(3).map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.text}
                      href={item.href}
                      className="flex items-center gap-3 text-slate-500 hover:text-emerald-600 transition-colors group"
                    >
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                        <Icon className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </a>
                  );
                })}

                {/* Working hours */}
                <div className="flex items-start gap-3 pt-2">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Dushanba - Shanba</p>
                    <p className="text-sm font-medium text-slate-700">8:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map preview */}
            <div className="mt-6 bg-slate-100 rounded-xl p-3 flex items-center gap-3 hover:bg-slate-200 transition-colors cursor-pointer">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <span className="text-sm text-slate-600">Samarqand Tuman, Chumchuqli MFY  </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>© {currentYear} EcoProm</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Barcha huquqlar himoyalangan</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="/privacy" className="hover:text-emerald-600 transition-colors">Maxfiylik siyosati</a>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <a href="/terms" className="hover:text-emerald-600 transition-colors">Foydalanish shartlari</a>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-emerald-500 fill-emerald-500" />
            <span>in Uzbekistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}