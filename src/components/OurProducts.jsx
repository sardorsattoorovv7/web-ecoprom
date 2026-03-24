import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, ArrowRight, X,
  Ruler, Thermometer, Shield, Zap, Droplets, Clock,
  Maximize2, Minimize2, ZoomIn, ChevronLeft, ChevronRight,
  Info, Award, CheckCircle, Star, ThumbsUp,
  Layers, Grid3X3, Box
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Sendvich panellar",
    category: "Devor va tom uchun",
    fullName: "Sendvich panellar",
    image: "/assets/devor.jpg",
    gallery: [
      "/assets/devor.jpg",
    ],
    description: "Yuqori sifatli izolyatsiya, yong'inga chidamli, uzoq xizmat muddati.",
    longDescription: "PIR sendvich panellar - bu zamonaviy qurilish materiali bo'lib, yuqori issiqlik izolyatsiyasi, yong'in xavfsizligi va uzoq xizmat muddati bilan ajralib turadi.",
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
    ],
    applications: [
      "Sanoat binolari",
      "Sovutgich kameralari",
      "Omborxonalar",
      "Savdo markazlari"
    ]
  },
  {
    id: 2,
    name: "Sovutgich Kameralar",
    category: "Go'sht, meva, sut",
    fullName: "Sovutgich Kameralar",
    image: "/assets/sovutgich.jpg",
    gallery: [
      "/assets/sovutgich.jpg",
      
    ],
    description: "Maxsus harorat rejimi, tez montaj, germetik muhr.",
    longDescription: "Sovutgich kameralari - bu har xil turdagi mahsulotlarni saqlash uchun mo'ljallangan professional sovutish tizimlari.",
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
    ],
    applications: [
      "Go'sht mahsulotlari",
      "Meva-sabzavot",
      "Sut mahsulotlari",
      "Baliq mahsulotlari"
    ]
  },
  {
    id: 3,
    name: "Ombor Tizimlari",
    category: "Metall konstruksiyalar",
    fullName: "Ombor Tizimlari",
    image: "/assets/omborr.jpg",
    gallery: [
      "/assets/ombor.jpg",
    ],
    description: "Tez quriladigan omborlar, logistika markazlari, sexlar.",
    longDescription: "Ombor tizimlari - bu tez quriladigan va iqtisodiy jihatdan samarali bo'lgan sanoat binolari.",
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
      "13 yil kafolat",
      "Har qanday iqlim",
      "Modul tizim",
      "Kengaytirish mumkin"
    ],
    applications: [
      "Logistika markazlari",
      "Ishlab chiqarish sexlari",
      "Agrosanoat majmualari",
      "Savdo omborlari"
    ]
  }
];

export default function OurProducts({ onProductClick }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

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
    setCurrentImageIndex(0);
    setIsZoomed(false);
    setShowGallery(false);
    setActiveTab('specs');
    onProductClick?.(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
      setCurrentImageIndex(0);
      setIsZoomed(false);
      setShowGallery(false);
    }, 300);
  };

  const nextImage = () => {
    if (selectedProduct?.gallery) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct?.gallery) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.gallery.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <section className="py-24 bg-white/0 relative overflow-hidden">
        <div className="container-pad relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-slate-800 mb-4">
              Bizning <span className="text-emerald-600">mahsulotlar</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Sifat va ishonch garovi - 13 yil kafolat
            </p>
          </motion.div>

          {/* 3 ta card - keng va to'liq */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer w-full"
                onClick={() => handleProductClick(product)}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  {/* Image Container - balandligi oshirildi */}
                  <div className="relative h-96 bg-gradient-to-br from-slate-50 to-white p-8 flex items-center justify-center overflow-hidden">
                    <motion.img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Quick view */}
                    <motion.div 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <span className="text-sm font-medium flex items-center gap-2">
                        <ZoomIn className="h-4 w-4" />
                        Batafsil
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Content - kengaytirildi */}
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-sm text-emerald-600 font-semibold mb-2 block uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-2 text-base">
                      {product.description}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* View details link */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <span className="text-sm font-medium text-slate-400">Batafsil ma'lumot</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="bg-emerald-100 p-2 rounded-full"
                      >
                        <ArrowRight className="h-5 w-5 text-emerald-600" />
                      </motion.div>
                    </div>
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
          <ProductDetailModal 
            product={selectedProduct} 
            onClose={closeModal}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            showGallery={showGallery}
            setShowGallery={setShowGallery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            nextImage={nextImage}
            prevImage={prevImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* Mahsulot Detail Modal Component */
function ProductDetailModal({ 
  product, 
  onClose, 
  currentImageIndex, 
  setCurrentImageIndex,
  isZoomed,
  setIsZoomed,
  showGallery,
  setShowGallery,
  activeTab,
  setActiveTab,
  nextImage,
  prevImage 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Package className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <span className="text-sm text-emerald-600 font-medium">{product.category}</span>
              <h2 className="text-2xl font-bold text-slate-800">{product.fullName}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowGallery(!showGallery)}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <Grid3X3 className="h-5 w-5 text-slate-400" />
            </button>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {showGallery ? (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-slate-800">Mahsulot galereyasi</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.gallery?.map((img, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-square bg-slate-50 rounded-xl overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowGallery(false);
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain p-4"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left - Image Gallery - TO'G'IRLANGAN */}
              <div className="space-y-4">
                <motion.div 
                  className={`relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 transition-all duration-500 ${
                    isZoomed ? 'fixed inset-4 md:inset-10 z-50 cursor-zoom-out' : 'h-[300px] md:h-[400px] cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <div className="w-full h-full flex items-center justify-center p-4 md:p-6">
                    <motion.img 
                      key={currentImageIndex}
                      src={product.gallery?.[currentImageIndex] || product.image}
                      alt={product.fullName}
                      className={`w-full h-full transition-all duration-500 ${
                        isZoomed ? 'object-contain' : 'object-contain'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {!isZoomed && (
                    <>
                      <button
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                      >
                        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                      </button>
                      <button
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                      >
                        <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                      </button>
                    </>
                  )}
                  
                  <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                    {isZoomed ? (
                      <Minimize2 className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                    ) : (
                      <Maximize2 className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                    )}
                  </div>
                </motion.div>
                
                {/* Thumbnails */}
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 justify-center">
                  {product.gallery?.map((img, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-emerald-500' 
                          : 'border-transparent hover:border-slate-200'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Info */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3 flex items-center gap-2">
                    <Info className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" />
                    Mahsulot haqida
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 md:gap-2 border-b border-slate-100">
                  {[
                    { id: 'specs', label: 'Texnik', icon: Ruler },
                    { id: 'features', label: 'Xususiyatlar', icon: Layers },
                    { id: 'advantages', label: 'Afzalliklar', icon: Award },
                    { id: 'applications', label: 'Qo\'llanish', icon: Box }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-t-lg transition-all ${
                          activeTab === tab.id
                            ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className="h-3 w-3 md:h-4 md:w-4 inline-block mr-1" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="min-h-[250px] md:min-h-[300px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'specs' && (
                      <motion.div
                        key="specs"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 gap-2 md:gap-4"
                      >
                        {product.specs.map((spec, index) => {
                          const Icon = spec.icon;
                          return (
                            <div key={index} className="bg-slate-50 p-2 md:p-4 rounded-lg md:rounded-xl border border-slate-100">
                              <div className="flex items-center gap-1 md:gap-2 text-slate-500 mb-1 md:mb-2">
                                <Icon className="h-3 w-3 md:h-4 md:w-4" />
                                <span className="text-xs uppercase">{spec.label}</span>
                              </div>
                              <span className="text-xs md:text-base font-semibold text-slate-800">{spec.value}</span>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}

                    {activeTab === 'features' && (
                      <motion.div
                        key="features"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 gap-2 md:gap-4"
                      >
                        {product.features.map((feature, index) => (
                          <div key={index} className="bg-slate-50 p-2 md:p-4 rounded-lg md:rounded-xl border border-slate-100">
                            <div className="flex items-start gap-1 md:gap-2">
                              <CheckCircle className="h-3 w-3 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-xs md:text-sm text-slate-700">{feature}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'advantages' && (
                      <motion.div
                        key="advantages"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 gap-2 md:gap-4"
                      >
                        {product.advantages.map((adv, index) => (
                          <div key={index} className="bg-slate-50 p-2 md:p-4 rounded-lg md:rounded-xl border border-slate-100">
                            <div className="flex items-start gap-1 md:gap-2">
                              <ThumbsUp className="h-3 w-3 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-xs md:text-sm text-slate-700">{adv}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'applications' && (
                      <motion.div
                        key="applications"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 gap-2 md:gap-4"
                      >
                        {product.applications.map((app, index) => (
                          <div key={index} className="bg-slate-50 p-2 md:p-4 rounded-lg md:rounded-xl border border-slate-100">
                            <div className="flex items-start gap-1 md:gap-2">
                              <Box className="h-3 w-3 md:h-5 md:w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-xs md:text-sm text-slate-700">{app}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-4">
              <div className="flex items-center gap-1 md:gap-2">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" />
                <span className="text-xs md:text-sm text-slate-600 font-medium">13 yil kafolat</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <Award className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" />
                <span className="text-xs md:text-sm text-slate-600 font-medium">ISO 9001</span>
              </div>
            </div>
            
            <button className="w-full sm:w-auto bg-emerald-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 md:gap-3">
              Ma'lumot olish
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}