import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, ArrowRight, X,
  Ruler, Thermometer, Shield, Zap, Droplets, Clock
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "PIR Sendvich panellar",
    category: "Devor va tom uchun",
    fullName: "PIR Sendvich panellar Premier",
    image: "https://i.ibb.co/LzsjFKLv/24.png",
    description: "Yuqori sifatli izolyatsiya, yong'inga chidamli, uzoq xizmat muddati.",
    specs: [
      { label: "Qalinlik", value: "40-200 mm", icon: Ruler },
      { label: "Uzunlik", value: "2000-16000 mm", icon: Ruler },
      { label: "Kenglik", value: "1000/1190 mm", icon: Ruler },
      { label: "Issiqlik o'tkazuvchanlik", value: "0.0194 Vt/(m·K)", icon: Thermometer },
    ],
    features: [
      "Yong'inga chidamlilik - 30 min",
      "Energiya tejash - 40%",
      "RAL ranglari",
      "Germetik ulanish"
    ],
    advantages: [
      "Sovuq ko'priklari yo'q",
      "CE sertifikati",
      "EN-14509 standarti",
      "20 mm profilli ulanish"
    ]
  },
  {
    id: 2,
    name: "Sovutgich Kameralar",
    category: "Go'sht, meva, sut",
    fullName: "Sovutgich Kameralar Cold Pro",
    image: "https://i.ibb.co/cKxQGBF7/27.png",
    description: "Maxsus harorat rejimi, tez montaj, germetik muhr.",
    specs: [
      { label: "Harorat", value: "-25°C dan +8°C", icon: Thermometer },
      { label: "Hajm", value: "5-1000 m³", icon: Package },
      { label: "Devor qalinligi", value: "80-200 mm", icon: Ruler },
      { label: "Namlik", value: "40-85%", icon: Droplets },
    ],
    features: [
      "Avtomatik boshqaruv",
      "Namlik sensorlari",
      "Tez muzlatish",
      "Defrost tizimi"
    ],
    advantages: [
      "Energiya tejamkor",
      "24/7 monitoring",
      "Zaxira quvvat",
      "GSM signalizatsiya"
    ]
  },
  {
    id: 3,
    name: "Sanoat Eshiklari",
    category: "Germetik, seksion",
    fullName: "Sanoat Eshiklari Thermo Door",
    image: "https://i.ibb.co/xK8Hk6TM/26.png",
    description: "Avtomatik boshqaruv, haroratni saqlash, tez ochilish.",
    specs: [
      { label: "Tezlik", value: "1.5 m/s gacha", icon: Zap },
      { label: "O'lchamlar", value: "Maxsus", icon: Ruler },
      { label: "Harorat", value: "-40°C dan +50°C", icon: Thermometer },
      { label: "Izolyatsiya", value: "0.5-1.0 m²K/Vt", icon: Shield },
    ],
    features: [
      "Germetik muhr",
      "Tez ochilish",
      "Haroratga chidamli",
      "Avtomatik"
    ],
    advantages: [
      "Sovuq o'tkazmaydi",
      "Shovqinsiz",
      "Uzoq muddat",
      "Masofadan boshqaruv"
    ]
  },
  {
    id: 4,
    name: "Ombor Tizimlari",
    category: "Metall konstruksiyalar",
    fullName: "Ombor Tizimlari Warehouse Pro",
    image: "https://i.ibb.co/Mxb7XYpz/29.png",
    description: "Tez quriladigan omborlar, logistika markazlari, sexlar.",
    specs: [
      { label: "Maydon", value: "100-10000 m²", icon: Ruler },
      { label: "Balandlik", value: "6-15 m", icon: Ruler },
      { label: "Yuk ko'tarish", value: "5 t/m²", icon: Package },
      { label: "Montaj", value: "30-90 kun", icon: Clock },
    ],
    features: [
      "Tez montaj",
      "Mustahkam",
      "Iqtisodiy",
      "Energiya tejamkor"
    ],
    advantages: [
      "10 yil kafolat",
      "Har qanday iqlim",
      "Modul tizim",
      "Kengaytirish mumkin"
    ]
  }
];

export default function OurProducts({ onProductClick }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    onProductClick?.(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="container-pad">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Bizning mahsulotlar</h2>
            <p className="text-lg text-slate-500">Sifat va ishonch garovi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 group"
                onClick={() => handleProductClick(product)}
              >
                {/* Rasm to'liq kartochkani egallaydi */}
                <div className="h-99 bg-white flex items-center justify-center p-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
                <div className="p-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-base text-slate-800 mt-0.5 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-end">
                    <span className="text-xs text-slate-400 mr-2">Batafsil</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mahsulot Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <ProductDetailModal product={selectedProduct} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}

/* Mahsulot Detail Modal Component */
function ProductDetailModal({ product, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <Package className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs text-slate-400">{product.category}</span>
              <h2 className="text-lg font-semibold text-slate-800">{product.fullName}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left - Rasm (faqat oq fon) */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center min-h-[280px] border border-slate-100">
              <img 
                src={product.image} 
                alt={product.fullName}
                className="w-full max-w-[200px] h-auto object-contain"
              />
            </div>

            {/* Right - Info */}
            <div className="space-y-5">
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-emerald-500" />
                  Texnik xususiyatlar
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.specs.map((spec, index) => {
                    const Icon = spec.icon;
                    return (
                      <div key={index} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                          <Icon className="h-3.5 w-3.5" />
                          <span className="text-xs">{spec.label}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700">{spec.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Features & Advantages */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Xususiyatlar
                  </h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-slate-300 text-xs">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Afzalliklar
                  </h4>
                  <ul className="space-y-1">
                    {product.advantages.map((adv, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-slate-300 text-xs">•</span>
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-slate-300" />
              <span className="text-xs text-slate-500">10 yil kafolat</span>
            </div>
            <button className="bg-emerald-600 text-white text-sm px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
              Ma'lumot olish
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}