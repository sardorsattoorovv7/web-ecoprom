import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Package, ArrowRight, X,
  Ruler, Thermometer, Shield, Zap, Droplets, Clock,
  Maximize2, Minimize2, ZoomIn, ChevronLeft, ChevronRight,
  Info, Award, CheckCircle, ThumbsUp,
  Layers, Grid3X3, Box
} from "lucide-react";

export default function OurProducts({ onProductClick }) {
  const { t, i18n } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');
  const [videoError, setVideoError] = useState(false);
  const [mobileVideoError, setMobileVideoError] = useState(false);

  // Rasmlar va ikonkalarni JSON matnlari bilan birlashtirish
  const products = useMemo(() => {
    const items = t("products_section.items", { returnObjects: true });
    const productAssets = [
      { image: "/assets/devor.jpg", gallery: ["/assets/devor.jpg"], 
        specIcons: [Ruler, Ruler, Ruler, Thermometer], values: ["40-200 mm", "2000-16000 mm", "1000/1190 mm", "0.0194 Vt/(m·K)"] },
      { image: "/assets/sovutgich.jpg", gallery: ["/assets/sovutgich.jpg"], 
        specIcons: [Thermometer, Package, Ruler, Droplets], values: ["-25°C dan +8°C", "5-1000 m³", "80-200 mm", "40-85%"] },
      { image: "/assets/omborr.jpg", gallery: ["/assets/ombor.jpg"], 
        specIcons: [Ruler, Ruler, Package, Clock], values: ["100-10000 m²", "6-15 m", "5 t/m²", "30-90 kun"] }
    ];

    if (!Array.isArray(items)) return [];

    return items.map((item, index) => ({
      ...item,
      id: index + 1,
      image: productAssets[index].image,
      gallery: productAssets[index].gallery,
      specs: item.specs_labels.map((label, sIdx) => ({
        label,
        value: productAssets[index].values[sIdx],
        icon: productAssets[index].specIcons[sIdx]
      }))
    }));
  }, [t, i18n.language]);

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
          <video autoPlay loop muted playsInline className="hidden sm:block w-full h-full object-cover" onError={() => setVideoError(true)}>
            <source src="/assets/bg.mp4" type="video/mp4" />
          </video>
          <video autoPlay loop muted playsInline className="block sm:hidden w-full h-full object-cover" onError={() => setMobileVideoError(true)}>
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
              {t("products_section.title_main")} <span className="text-emerald-400">{t("products_section.title_accent")}</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto px-4">
              {t("products_section.subtitle")}
            </p>
          </motion.div>

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
                  <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-br from-white/10 to-white/5 p-3 sm:p-4 md:p-5 flex items-center justify-center overflow-hidden">
                    <motion.img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                    />
                    <motion.div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[8px] sm:text-[10px] md:text-xs font-medium flex items-center gap-1">
                        <ZoomIn className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                        {t("products_section.details")}
                      </span>
                    </motion.div>
                  </div>
                  
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
                    
                    <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <span key={i} className="text-[7px] sm:text-[9px] bg-emerald-500/20 text-emerald-200 px-1 sm:px-1.5 py-0.5 rounded-full font-medium backdrop-blur-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-white/20 mt-auto">
                      <span className="text-[8px] sm:text-[10px] font-medium text-white/60">{t("products_section.details")}</span>
                      <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="bg-emerald-500/30 p-0.5 sm:p-1 rounded-full backdrop-blur-sm">
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
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProductDetailModal({ 
  product, onClose, currentImageIndex, setCurrentImageIndex,
  isZoomed, setIsZoomed, showGallery, setShowGallery,
  activeTab, setActiveTab, nextImage, prevImage, t
}) {
  const tabs = [
    { id: 'specs', label: t("products_section.tabs.specs"), icon: Ruler },
    { id: 'features', label: t("products_section.tabs.features"), icon: Layers },
    { id: 'advantages', label: t("products_section.tabs.advantages"), icon: Award },
    { id: 'applications', label: t("products_section.tabs.applications"), icon: Box }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.3 }} className="bg-white rounded-lg sm:rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-xl mx-2" onClick={(e) => e.stopPropagation()}>
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
            <button onClick={() => setShowGallery(!showGallery)} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-slate-100 flex items-center justify-center">
              <Grid3X3 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400" />
            </button>
            <button onClick={onClose} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-slate-100 flex items-center justify-center">
              <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-2 sm:p-3 overflow-y-auto max-h-[calc(90vh-60px)]">
          {showGallery ? (
            <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-800">Galereya</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.gallery?.map((img, index) => (
                  <motion.div key={index} className="relative aspect-square bg-slate-50 rounded-lg overflow-hidden cursor-pointer" whileHover={{ scale: 1.02 }} onClick={() => { setCurrentImageIndex(index); setShowGallery(false); }}>
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-3">
              <div className="space-y-2">
                <motion.div className={`relative bg-slate-50 rounded-lg overflow-hidden border border-slate-100 transition-all duration-300 ${isZoomed ? 'fixed inset-2 z-50 cursor-zoom-out' : 'h-[180px] sm:h-[220px] cursor-zoom-in'}`} onClick={() => setIsZoomed(!isZoomed)}>
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <motion.img key={currentImageIndex} src={product.gallery?.[currentImageIndex] || product.image} alt="" className="w-full h-full object-contain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                  </div>
                  {!isZoomed && (
                    <>
                      <button className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/90 shadow flex items-center justify-center" onClick={(e) => { e.stopPropagation(); prevImage(); }}><ChevronLeft size={10}/></button>
                      <button className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/90 shadow flex items-center justify-center" onClick={(e) => { e.stopPropagation(); nextImage(); }}><ChevronRight size={10}/></button>
                    </>
                  )}
                  <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-white/90 shadow flex items-center justify-center">
                    {isZoomed ? <Minimize2 size={8}/> : <Maximize2 size={8}/>}
                  </div>
                </motion.div>
                <div className="flex gap-1 overflow-x-auto pb-1 justify-center">
                  {product.gallery?.map((img, index) => (
                    <button key={index} className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border transition-all ${currentImageIndex === index ? 'border-emerald-500' : 'border-transparent'}`} onClick={() => setCurrentImageIndex(index)}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <h3 className="text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1"><Info size={12} className="text-emerald-500" /> {t("products_section.about_product")}</h3>
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed">{product.longDescription}</p>
                </div>

                <div className="flex flex-wrap gap-0.5 border-b border-slate-100">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button key={tab.id} className={`px-1.5 py-0.5 text-[8px] sm:text-[9px] font-medium rounded-t transition-all ${activeTab === tab.id ? 'text-emerald-600 border-b border-emerald-600 bg-emerald-50/50' : 'text-slate-500'}`} onClick={() => setActiveTab(tab.id)}>
                        <Icon className="h-2 w-2 inline-block mr-0.5" />{tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="min-h-[120px]">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="grid grid-cols-2 gap-1">
                      {product[activeTab]?.map((item, index) => (
                        <div key={index} className="bg-slate-50 p-1 rounded border border-slate-100">
                          {activeTab === 'specs' ? (
                            <>
                              <div className="flex items-center gap-0.5 text-slate-500 mb-0.5">
                                <item.icon size={8} /> <span className="text-[7px] uppercase">{item.label}</span>
                              </div>
                              <span className="text-[8px] sm:text-[9px] font-semibold text-slate-800">{item.value}</span>
                            </>
                          ) : (
                            <div className="flex items-start gap-0.5">
                              {activeTab === 'features' ? <CheckCircle size={8} className="text-emerald-500 mt-0.5" /> : <ThumbsUp size={8} className="text-emerald-500 mt-0.5" />}
                              <span className="text-[8px] sm:text-[9px] text-slate-700">{item}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-2 sm:p-3 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5">
            <div className="flex flex-wrap items-center justify-center gap-1">
              <div className="flex items-center gap-0.5"><Shield size={10} className="text-emerald-500" /><span className="text-[8px] text-slate-600">{t("products_section.warranty_text")}</span></div>
              <div className="flex items-center gap-0.5"><Award size={10} className="text-emerald-500" /><span className="text-[8px] text-slate-600">ISO</span></div>
            </div>
            <button className="w-full sm:w-auto bg-emerald-600 text-white px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1">
              {t("products_section.get_info")} <ArrowRight size={10} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}