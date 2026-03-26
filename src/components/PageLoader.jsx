// components/PageLoader.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const location = useLocation();
  const fullText = "ECO PROM";
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Har bir route o'zgarishida loader ko'rsatish
    setIsLoading(true);
    setTextIndex(0);
    setLoadingText("");

    // 1.5 sekunddan keyin loaderni yashirish
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Typing animatsiyasi
  useEffect(() => {
    if (!isLoading) return;

    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setLoadingText((prev) => prev + fullText[textIndex]);
        setTextIndex((prev) => prev + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [textIndex, isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-12 h-12 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Typing text */}
            <div className="relative mb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl md:text-5xl font-bold"
              >
                <span className="text-slate-800">{loadingText}</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-0.5 h-10 md:h-12 bg-emerald-600 ml-1"
                />
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-emerald-100 rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-emerald-600 rounded-full"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-slate-400 mt-4"
            >
              Yuklanmoqda...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}