import { useEffect, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, Globe } from "lucide-react";

export default function Navbar({ onOpenCall }) {
  const { t, i18n } = useTranslation();
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
          <img 
            src="/logo.png" 
            alt="EcoProm Logo" 
            className="h-11 w-11 object-contain rounded-lg" 
          />
          <div className="leading-tight">
            <div className="font-semibold text-slate-900">EcoProm</div>
          </div>
        </Link>

        {/* Desktop nav - 1004px va undan katta ekranlarda ko'rinadi */}
        <nav className="hidden min-[1009px]:flex items-center gap-1">
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
            to="/projects"
            className={({ isActive }) =>
              [linkBase, isActive ? linkActive : linkIdle].join(" ")
            }
          >
            {t("nav.projects")}
          </NavLink>

          <NavLink
            to="/ourproducts"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            {t("nav.ourproducts")}
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
          {/* Language Dropdown - Har doim ko'rinadi (hamburger yonida) */}
          <LanguageDropdown />

          <button className="btn-outline hidden sm:inline-flex" onClick={onOpenCall}>
            {t("hero.primary")}
          </button>

          {/* Mobile burger - 1003px va undan kichik ekranlarda ko'rinadi */}
          <button
            className="min-[1009px]:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white/70"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="text-xl">≡</span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay - faqat menyular, tillar YO'Q (chunki tillar tashqarida) */}
      {open && (
        <div className="min-[1004px]:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="font-bold text-slate-900 text-lg">
                {t("nav.menu") || "Menu"}
              </div>
              <button
                className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Faqat menyular ro'yxati (tillar YO'Q) */}
            <div className="grid gap-2">
              {[
                { to: "/", label: t("nav.home"), end: true },
                { to: "/projects", label: t("nav.projects") },
                { to: "/ourproducts", label: t("nav.ourproducts") },
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
                      "px-4 py-3 rounded-2xl border text-[15px] font-medium transition",
                      isActive
                        ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                        : "bg-white border-slate-100 text-slate-700 hover:bg-slate-50",
                    ].join(" ")
                  }
                >
                  {x.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Language Dropdown Komponenti
function LanguageDropdown() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "uz", label: "O'zbekcha" },
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100/80 rounded-xl transition-all"
        aria-label={t("language.select") || "Tilni tanlang"}
      >
        <Globe size={16} className="text-emerald-600" />
        <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">
          {currentLang.code}
        </span>
        <ChevronDown 
          size={14} 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 shadow-2xl rounded-2xl py-1.5 z-[100]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center justify-between px-4 py-2.5 text-[13px] font-medium transition-colors
                ${i18n.language === lang.code 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-slate-600 hover:bg-slate-50"}
              `}
            >
              {lang.label}
              {i18n.language === lang.code && (
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}