import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsData } from '../data/products'; // Ma'lumotlar bazasi
import { ArrowLeft, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react'; 

export default function ProductDetail() {
  const { slug } = useParams(); // URL-dan mahsulot nomini oladi
  const navigate = useNavigate();

  // Sahifa almashganda tepaga chiqarish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Bizning products.js faylimizdan slug bo'yicha mahsulotni qidirib topadi
  const product = productsData.find((p) => p.slug === slug);

  // Agar mahsulot topilmasa (URL xato yozilsa)
  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Mahsulot topilmadi</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Orqaga qaytish */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-emerald-600 transition-all mb-10 group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-2 transition-transform" size={20} />
          <span className="font-medium text-lg">Mahsulotlar ro'yxatiga qaytish</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* CHAP TOMON: Mahsulot rasmi */}
          <div className="sticky top-32 bg-slate-50 rounded-[40px] p-10 flex items-center justify-center border border-slate-100 shadow-inner">
            <img 
              src={product.img} 
              alt={product.name} 
              className="max-h-[500px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
            />
          </div>

          {/* O'NG TOMON: Mahsulot haqida batafsil */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-widest">
                EcoProm Sifat Kafolati
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-2xl text-emerald-600 font-bold mb-8">
              {product.specs}
            </p>

            <div className="h-px bg-slate-100 w-full mb-8"></div>

            <div className="prose prose-slate mb-10">
              <h3 className="text-xl font-bold text-slate-800 mb-4 uppercase">Tavsif:</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Texnik xususiyatlar ro'yxati */}
            <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <ShieldCheck className="mr-2 text-emerald-600" /> Texnik Xususiyatlar
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {product.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-white rounded-xl shadow-sm">
                    <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bog'lanish qismi */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <a 
                href="tel:+998901234567" // O'z raqamingizni yozing
                className="flex-1 bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                <Phone size={22} />
                Hoziroq buyurtma berish
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}