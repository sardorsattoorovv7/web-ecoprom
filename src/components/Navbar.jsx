import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react"; // Ikonkalar uchun

export default function Navbar({ onOpenCall }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menu ochilganda body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkBase = "text-sm font-medium transition px-3 py-2 rounded-xl";
  const linkIdle = "text-slate-700 hover:bg-slate-100/70 hover:text-slate-900";
  const linkActive = "text-emerald-700 bg-emerald-50 border border-emerald-100";

  // Menyu elementlari (xatolarni oldini olish uchun markazlashgan ro'yxat)
  const navItems = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/services", label: t("nav.services") },
    { to: "/ourproducts", label: t("nav.ourproducts") }, // URL kichik harfga to'g'irlandi
    { to: "/projects", label: t("nav.projects") },
    { to: "/news", label: t("nav.news") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-white/85 border-slate-200 shadow-sm"
          : "bg-white/55 border-slate-200/60"
      }`}
    >
      <div className="container-pad h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="EcoProm Logo"
            className="h-10 w-10 object-contain rounded-lg transition-transform group-hover:scale-105"
          />
          <div className="leading-tight">
            <div className="font-bold text-slate-900">EcoProm</div>
            <div className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider hidden sm:block">Industrial</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            className="btn-primary hidden sm:inline-flex py-2 px-5 text-sm" 
            onClick={onOpenCall}
          >
            {t("hero.primary")}
          </button>

          {/* Mobile burger */}
          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white/70 text-slate-600"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          {/* Side Panel */}
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="font-bold text-slate-900 text-lg">Menu</div>
              <button
                className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-2xl border text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-emerald-50 border-emerald-100 text-emerald-800 shadow-sm"
                        : "bg-white border-slate-100 text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t">
              <button
                className="btn-primary w-full py-4 rounded-2xl shadow-lg shadow-emerald-100"
                onClick={() => {
                  setOpen(false);
                  onOpenCall?.();
                }}
              >
                {t("hero.primary")}
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
                EcoProm Uzbekistan
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}