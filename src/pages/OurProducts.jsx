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
  const [videoError, setVideoError] = useState(false);
  const [mobileVideoError, setMobileVideoError] = useState(false);

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
      <section className="py-8 sm:py-12 md:py-16 bg-white/0 relative overflow-hidden min-h-[400px] sm:min-h-[500px]">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          {/* Desktop Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="hidden sm:block w-full h-full object-cover"
            onError={() => setVideoError(true)}
          >
            <source src="/assets/bg.mp4" type="video/mp4" />
          </video>
          
          {/* Mobile Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="block sm:hidden w-full h-full object-cover"
            onError={() => setMobileVideoError(true)}
          >
            <source src="/assets/bg-mobile.mp4" type="video/mp4" />
          </video>
          
          {(videoError && mobileVideoError) && (
            <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-emerald-700"></div>
          )}
          
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container-pad relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-6 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
              Bizning <span className="text-emerald-400">mahsulotlar</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto px-4">
              Sifat va ishonch garovi - 13 yil kafolat
            </p>
          </motion.div>

          {/* Products Grid - Kichraytirilgan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="group cursor-pointer w-full"
                onClick={() => handleProductClick(product)}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-white/20">
                  {/* Image Container - Kichraytirilgan */}
                  <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-br from-white/10 to-white/5 p-3 sm:p-4 md:p-5 flex items-center justify-center overflow-hidden">
                    <motion.img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                    />
                    
                    {/* Quick view - Kichraytirilgan */}
                   {/* Quick view - Kichraytirilgan */}
                    <motion.div 
                                            className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <span className="text-[8px] sm:text-[10px] md:text-xs font-medium flex items-center gap-1">
                        <ZoomIn className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                        Batafsil
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Content - Kichraytirilgan */}
                  <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
                    <span className="text-[8px] sm:text-[10px] md:text-xs text-emerald-300 font-semibold mb-0.5 sm:mb-1 block uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 sm:mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/80 mb-2 sm:mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Features - Kichraytirilgan */}
                    <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <span key={i} className="text-[7px] sm:text-[9px] bg-emerald-500/20 text-emerald-200 px-1 sm:px-1.5 py-0.5 rounded-full font-medium backdrop-blur-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* View details link - Kichraytirilgan */}
                    <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-white/20 mt-auto">
                      <span className="text-[8px] sm:text-[10px] font-medium text-white/60">Batafsil</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="bg-emerald-500/30 p-0.5 sm:p-1 rounded-full backdrop-blur-sm"
                      >
                        <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-300" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
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

/* Product Detail Modal Component - Kichraytirilgan */
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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg sm:rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-xl mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-2 sm:p-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
            </div>
            <div>
              <span className="text-[9px] sm:text-xs text-emerald-600 font-medium">{product.category}</span>
              <h2 className="text-xs sm:text-sm md:text-base font-bold text-slate-800">{product.fullName}</h2>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <button 
              onClick={() => setShowGallery(!showGallery)}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-slate-100 flex items-center justify-center"
            >
              <Grid3X3 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400" />
            </button>
            <button 
              onClick={onClose}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-slate-100 flex items-center justify-center"
            >
              <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-2 sm:p-3 overflow-y-auto max-h-[calc(90vh-60px)]">
          {showGallery ? (
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-xs sm:text-sm font-semibold text-slate-800">Galereya</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.gallery?.map((img, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-square bg-slate-50 rounded-lg overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowGallery(false);
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-3">
              {/* Left - Image Gallery */}
              <div className="space-y-2">
                <motion.div 
                  className={`relative bg-slate-50 rounded-lg overflow-hidden border border-slate-100 transition-all duration-300 ${
                    isZoomed ? 'fixed inset-2 z-50 cursor-zoom-out' : 'h-[180px] sm:h-[220px] cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <motion.img 
                      key={currentImageIndex}
                      src={product.gallery?.[currentImageIndex] || product.image}
                      alt={product.fullName}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  
                  {!isZoomed && (
                    <>
                      <button
                        className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/90 shadow flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                      >
                        <ChevronLeft className="h-2.5 w-2.5 text-slate-600" />
                      </button>
                      <button
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/90 shadow flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                      >
                        <ChevronRight className="h-2.5 w-2.5 text-slate-600" />
                      </button>
                    </>
                  )}
                  
                  <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-white/90 shadow flex items-center justify-center">
                    {isZoomed ? (
                      <Minimize2 className="h-2 w-2 text-slate-600" />
                    ) : (
                      <Maximize2 className="h-2 w-2 text-slate-600" />
                    )}
                  </div>
                </motion.div>
                
                {/* Thumbnails */}
                <div className="flex gap-1 overflow-x-auto pb-1 justify-center">
                  {product.gallery?.map((img, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border transition-all ${
                        currentImageIndex === index 
                          ? 'border-emerald-500' 
                          : 'border-transparent hover:border-slate-200'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`Thumb ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Info */}
              <div className="space-y-2">
                <div>
                  <h3 className="text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1">
                    <Info className="h-3 w-3 text-emerald-500" />
                    Mahsulot haqida
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-0.5 border-b border-slate-100">
                  {[
                    { id: 'specs', label: 'Texnik', icon: Ruler },
                    { id: 'features', label: 'Xususiyat', icon: Layers },
                    { id: 'advantages', label: 'Afzallik', icon: Award },
                    { id: 'applications', label: 'Qo\'llash', icon: Box }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        className={`px-1.5 py-0.5 text-[8px] sm:text-[9px] font-medium rounded-t transition-all ${
                          activeTab === tab.id
                            ? 'text-emerald-600 border-b border-emerald-600 bg-emerald-50/50'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className="h-2 w-2 inline-block mr-0.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="min-h-[120px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'specs' && (
                      <motion.div
                        key="specs"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 gap-1"
                      >
                        {product.specs.map((spec, index) => {
                          const Icon = spec.icon;
                          return (
                            <div key={index} className="bg-slate-50 p-1 rounded border border-slate-100">
                              <div className="flex items-center gap-0.5 text-slate-500 mb-0.5">
                                <Icon className="h-2 w-2" />
                                <span className="text-[7px] uppercase">{spec.label}</span>
                              </div>
                              <span className="text-[8px] sm:text-[9px] font-semibold text-slate-800">{spec.value}</span>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}

                    {activeTab === 'features' && (
                      <motion.div
                        key="features"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 gap-1"
                      >
                        {product.features.map((feature, index) => (
                          <div key={index} className="bg-slate-50 p-1 rounded border border-slate-100">
                            <div className="flex items-start gap-0.5">
                              <CheckCircle className="h-2 w-2 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-[8px] sm:text-[9px] text-slate-700">{feature}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'advantages' && (
                      <motion.div
                        key="advantages"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 gap-1"
                      >
                        {product.advantages.map((adv, index) => (
                          <div key={index} className="bg-slate-50 p-1 rounded border border-slate-100">
                            <div className="flex items-start gap-0.5">
                              <ThumbsUp className="h-2 w-2 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-[8px] sm:text-[9px] text-slate-700">{adv}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'applications' && (
                      <motion.div
                        key="applications"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 gap-1"
                      >
                        {product.applications.map((app, index) => (
                          <div key={index} className="bg-slate-50 p-1 rounded border border-slate-100">
                            <div className="flex items-start gap-0.5">
                              <Box className="h-2 w-2 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-[8px] sm:text-[9px] text-slate-700">{app}</span>
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

        <div className="p-2 sm:p-3 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5">
            <div className="flex flex-wrap items-center justify-center gap-1">
              <div className="flex items-center gap-0.5">
                <Shield className="h-2.5 w-2.5 text-emerald-500" />
                <span className="text-[8px] text-slate-600">13 yil</span>
              </div>
              <div className="flex items-center gap-0.5">
                <Award className="h-2.5 w-2.5 text-emerald-500" />
                <span className="text-[8px] text-slate-600">ISO</span>
              </div>
            </div>
            
            <button className="w-full sm:w-auto bg-emerald-600 text-white px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1">
              Ma'lumot olish
              <ArrowRight className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}