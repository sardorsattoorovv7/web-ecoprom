import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";
import en from "./locales/en.json";

const SUPPORTED_LANGUAGES = ["uz", "ru", "en"];
const getInitialLanguage = () => {
  const saved = localStorage.getItem("lang");
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;

  const browserLang = (navigator.language || "uz").slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGUAGES.includes(browserLang)) return browserLang;
  return "uz";
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: getInitialLanguage(),
    fallbackLng: "uz",
    interpolation: { escapeValue: false },
  });

document.documentElement.lang = i18n.language;
i18n.on("languageChanged", (lang) => {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
});

export default i18n;
