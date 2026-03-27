// components/CookieConsent.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // LocalStorage orqali foydalanuvchi roziligini tekshiramiz
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    // Foydalanuvchi qabul qilganini localStorage-ga saqlaymiz
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    // Foydalanuvchi rad etganini localStorage-ga saqlaymiz
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-50"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-4 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <Cookie className="h-6 w-6 text-emerald-500" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-sm text-slate-600">
                  Sayt tajribangizni yaxshilash va sizga qulaylik yaratish uchun cookies-fayllardan foydalanamiz. Davom etish orqali siz cookies-dan foydalanishga rozilik bildirasiz. 
                  <br />
                  <a href="/privacy" className="text-emerald-600 underline hover:text-emerald-700">
                    Maxfiylik siyosatini o‘qing
                  </a>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 mt-2 md:mt-0">
                <button
                  onClick={declineCookies}
                  className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Rad etish
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Qabul qilish
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={declineCookies}
                className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="h-3 w-3 text-slate-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}