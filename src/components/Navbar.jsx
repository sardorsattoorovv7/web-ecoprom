import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

  const linkBase =
    "text-sm font-medium transition px-3 py-2 rounded-xl";
  const linkIdle =
    "text-slate-700 hover:bg-slate-100/70 hover:text-slate-900";
  const linkActive =
    "text-emerald-700 bg-emerald-50 border border-emerald-100";

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b backdrop-blur-md transition",
        scrolled
          ? "bg-white/85 border-slate-200 shadow-sm"
          : "bg-white/55 border-slate-200/60",
      ].join(" ")}
    >
      <div className="container-pad h-16 flex items-center justify-between">
        {/* Logo */}
       <Link to="/" className="flex items-center gap-2">
        {/* Div o'rniga rasm qo'yamiz */}
        <img 
          src="/logo.png" 
          alt="EcoProm Logo" 
          className="h-11 w-11 object-contain rounded-lg" 
        />
        
        <div className="leading-tight">
          <div className="font-semibold text-slate-900">EcoProm</div>
        </div>
      </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              [linkBase, isActive ? linkActive : linkIdle].join(" ")
            }
            end
          >
            {t("nav.home")}
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              [linkBase, isActive ? linkActive : linkIdle].join(" ")
            }
          >
            {t("nav.services")}
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              [linkBase, isActive ? linkActive : linkIdle].join(" ")
            }
          >
            {t("nav.projects")}
          </NavLink>

          <NavLink
            to="/news"
            className={({ isActive }) =>
              [linkBase, isActive ? linkActive : linkIdle].join(" ")
            }
          >
            {t("nav.news")}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              [linkBase, isActive ? linkActive : linkIdle].join(" ")
            }
          >
            {t("nav.about")}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              [linkBase, isActive ? linkActive : linkIdle].join(" ")
            }
          >
            {t("nav.contact")}
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="btn-outline hidden sm:inline-flex" onClick={onOpenCall}>
            {t("hero.primary")}
          </button>

          {/* Mobile burger */}
          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white/70"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="text-xl">≡</span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900">Menu</div>
              <button
                className="h-10 w-10 rounded-xl border border-slate-200"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {[
                { to: "/", label: t("nav.home"), end: true },
                { to: "/services", label: t("nav.services") },
                { to: "/projects", label: t("nav.projects") },
                { to: "/news", label: t("nav.news") },
                { to: "/about", label: t("nav.about") },
                { to: "/contact", label: t("nav.contact") },
              ].map((x) => (
                <NavLink
                  key={x.to}
                  to={x.to}
                  end={x.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "px-4 py-3 rounded-2xl border text-sm font-medium transition",
                      isActive
                        ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                        : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50",
                    ].join(" ")
                  }
                >
                  {x.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-4">
              <button
                className="btn-primary w-full"
                onClick={() => {
                  setOpen(false);
                  onOpenCall?.();
                }}
              >
                {t("hero.primary")}
              </button>
              <p className="text-xs text-slate-500 mt-2">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
