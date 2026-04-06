import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimationControls } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react'; 
import { productsData } from '../data/products'; 

export default function ProductsNav() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  // Skroll funksiyasi
  const scroll = (direction) => {
    if (scrollRef.current) {
      setIsPaused(true); // Tugma bosilganda avtomatik animatsiyani to'xtatish
      const { current } = scrollRef;
      const scrollAmount = 250; // Har bosilganda 250px suriladi

      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      // 3 sekunddan keyin animatsiyani yana davom ettirish
      setTimeout(() => setIsPaused(false), 3000);
    }
  };

  return (
    <div className="bg-white py-16 font-sans border-b border-gray-100 relative group">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
            {t('products_section.title_main')} <span className="text-emerald-600">{t('products_section.title_accent')}</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Tugmalarni ortaroqqa va rasm balandligiga moslab joylashtiramiz */}
        <div className="absolute inset-x-0 top-[65%] -translate-y-1/2 flex justify-between px-2 md:px-150 z-30 pointer-events-none">
          <button 
            onClick={() => scroll('left')}
            className="pointer-events-auto bg-white/0 p-4 rounded-full shadow-xl border border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110 active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="pointer-events-auto bg-white/0 p-4 rounded-full shadow-xl border border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110 active:scale-95"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        <div 
          className="relative py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradientlarni biroz qisqartirdim, tugmalarga xalaqit bermasligi uchun */}
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div 
            ref={scrollRef}
            className="overflow-x-auto no-scrollbar scroll-smooth"
          >
            <motion.div
              animate={isPaused ? {} : { x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex whitespace-nowrap"
            >
              {/* Animatsiya uzilib qolmasligi uchun 3 marta ko'paytiramiz */}
              {[...productsData, ...productsData, ...productsData].map((product, index) => (
                <button
                  key={`${product.id}-${index}`}
                  onClick={() => navigate(`/products/${product.slug}`)}
                  className="inline-flex flex-col items-center group/btn mx-6 md:mx-12 focus:outline-none rounded-xl p-2 transition-all flex-shrink-0"
                >
                  <div className="w-28 h-28 flex items-center justify-center transition-all duration-500 group-hover/btn:-translate-y-4">
                    <img 
                      src={product.img} 
                      alt={t(`items.${product.slug}.name`)} 
                      className="object-contain h-24 w-24 group-hover/btn:animate-float drop-shadow-md" 
                    />
                  </div>

                  <span className="mt-6 text-sm font-semibold text-slate-600 group-hover/btn:text-emerald-600 transition-colors duration-300 whitespace-normal text-center max-w-[140px] leading-tight">
                    {t(`items.${product.slug}.name`)}
                  </span>
                  
                  <div className="w-0 h-0.5 bg-emerald-500 group-hover/btn:w-full transition-all duration-300 mt-1"></div>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}