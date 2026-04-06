import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
// 1. Ma'lumotlarni alohida fayldan import qilamiz
import { productsData } from '../data/products'; 

export default function ProductsNav() {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-white py-16 font-sans overflow-hidden border-b border-gray-100 relative">
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
        `}
      </style>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Sarlavha qismi */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
            Bizning <span className="text-emerald-600">Mahsulotlar</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Marquee (Cheksiz aylanish) qismi */}
        <div 
          className="relative py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Yumshoq o'tish uchun gradientlar */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden">
            <motion.div
              animate={isPaused ? {} : { x: ["0%", "-50%"] }}
              transition={{
                duration: 35, // Aylanish tezligi
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex whitespace-nowrap"
            >
              {/* Seamless loop uchun massivni ikkilantiramiz */}
              {[...productsData, ...productsData].map((product, index) => (
                <button
                  key={`${product.id}-${index}`}
                  // 2. Navigatsiya slug orqali amalga oshiriladi
                  onClick={() => navigate(`/products/${product.slug}`)}
                  className="inline-flex flex-col items-center group mx-6 md:mx-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-4 rounded-2xl p-2 transition-all"
                >
                  {/* Rasm konteyneri */}
                  <div className="w-28 h-28 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-4">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="object-contain h-24 w-24 group-hover:animate-float drop-shadow-md" 
                    />
                  </div>

                  {/* Mahsulot nomi */}
                  <span className="mt-6 text-sm font-semibold text-slate-600 group-hover:text-emerald-600 transition-colors duration-300 whitespace-normal text-center max-w-[140px] leading-tight">
                    {product.name}
                  </span>
                  
                  {/* Hover bo'lganda chiqadigan chiziqcha */}
                  <div className="w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-500 mt-2 rounded-full"></div>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}