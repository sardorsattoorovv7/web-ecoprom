import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, ArrowRight, X,
  Ruler, Thermometer, Shield, Droplets, Clock,
  Maximize2, Minimize2, ZoomIn, ChevronLeft, ChevronRight,
  Info, Award, CheckCircle, ThumbsUp,
  Layers, Grid3X3, Box
} from "lucide-react";

const productsData = [
  {
    id: 1,
    key: "sandwich_panels",
    categoryKey: "sandwich_panels",
    nameKey: "sandwich_panels",
    image: "/assets/devor.jpg",
    gallery: ["/assets/devor.jpg"],
    descriptionKey: "sandwich_panels",
    longDescriptionKey: "sandwich_panels",
    specs: [
      { labelKey: "thickness", value: "40-200 mm", icon: Ruler },
      { labelKey: "length", value: "2000-16000 mm", icon: Ruler },
      { labelKey: "width", value: "1000/1190 mm", icon: Ruler },
      { labelKey: "thermal_conductivity", value: "0.0194 W/(m·K)", icon: Thermometer },
    ],
    features: [
      "fire_resistance",
      "energy_saving",
      "ral_colors",
      "sealed_connection"
    ],
    advantages: [
      "no_cold_bridges",
      "ce_certificate",
      "en_standard",
      "profile_connection"
    ],
    applicationsKey: "panels"
  },
  {
    id: 2,
    key: "cold_rooms",
    categoryKey: "cold_rooms",
    nameKey: "cold_rooms",
    image: "/assets/sovutgich.jpg",
    gallery: ["/assets/sovutgich.jpg"],
    descriptionKey: "cold_rooms",
    longDescriptionKey: "cold_rooms",
    specs: [
      { labelKey: "temperature", value: "-25°C to +8°C", icon: Thermometer },
      { labelKey: "volume", value: "5-1000 m³", icon: Package },
      { labelKey: "wall_thickness", value: "80-200 mm", icon: Ruler },
      { labelKey: "humidity", value: "40-85%", icon: Droplets },
    ],
    features: [
      "automatic_control",
      "humidity_sensors",
      "quick_freezing",
      "defrost_system"
    ],
    advantages: [
      "energy_efficient",
      "247_monitoring",
      "backup_power",
      "gsm_alarm"
    ],
    applicationsKey: "cold"
  },
  {
    id: 3,
    key: "warehouse_systems",
    categoryKey: "warehouse_systems",
    nameKey: "warehouse_systems",
    image: "/assets/omborr.jpg",
    gallery: ["/assets/ombor.jpg"],
    descriptionKey: "warehouse_systems",
    longDescriptionKey: "warehouse_systems",
    specs: [
      { labelKey: "area", value: "100-10000 m²", icon: Ruler },
      { labelKey: "height", value: "6-15 m", icon: Ruler },
      { labelKey: "load_capacity", value: "5 t/m²", icon: Package },
      { labelKey: "installation", value: "30-90 kun", icon: Clock },
    ],
    features: [
      "fast_assembly",
      "durable",
      "economical",
      "energy_efficient"
    ],
    advantages: [
      "13_year_warranty",
      "any_climate",
      "modular_system",
      "expandable"
    ],
    applicationsKey: "warehouse"
  }
];

export default function OurProducts({ onProductClick }) {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  // Tarjima qilingan mahsulotlar - useMemo bilan optimallashtirildi
  const products = useMemo(() => {
    return productsData.map(product => ({
      ...product,
      name: t(`product_names.${product.nameKey}`, product.nameKey),
      category: t(`product_categories.${product.categoryKey}`, product.categoryKey),
      description: t(`product_descriptions.${product.descriptionKey}`, product.descriptionKey),
      longDescription: t(`product_long_descriptions.${product.longDescriptionKey}`, product.longDescriptionKey),
      features: product.features.map(f => t(`products.${f}`, f)),
      advantages: product.advantages.map(a => t(`products.${a}`, a)),
      applications: t(`product_applications.${product.applicationsKey}`, { returnObjects: true }) || [],
      specs: product.specs.map(spec => ({
        ...spec,
        label: t(`products.${spec.labelKey}`, spec.labelKey)
      }))
    }));
  }, [t]);

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

  // Tarjimalarni olish
  const productsTitle = t("products.title", "Bizning mahsulotlar");
  const productsSubtitle = t("products.subtitle", "Sifat va ishonch garovi - 13 yil kafolat");
  const buttonsDetails = t("buttons.details", "Batafsil");
  const buttonsMoreInfo = t("buttons.more_info", "Batafsil ma'lumot");
  const buttonsGetInfo = t("buttons.get_info", "Ma'lumot olish");
  const productsWarranty = t("products.warranty", "yil kafolat");

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
              {productsTitle}
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              {productsSubtitle}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group cursor-pointer w-full"
                onClick={() => handleProductClick(product)}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-slate-100/50">
                  <div className="relative h-96 bg-gradient-to-br from-slate-50 to-white p-8 flex items-center justify-center overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-emerald-600/20 to-transparent"
                    />
                    <motion.img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 relative z-10"
                      whileHover={{ rotate: 2 }}
                    />
                    <motion.div 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0 }}
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <span className="text-sm font-medium flex items-center gap-2">
                        <ZoomIn className="h-4 w-4" />
                        {buttonsDetails}
                      </span>
                    </motion.div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <motion.span 
                      className="text-sm text-emerald-600 font-semibold mb-2 block uppercase tracking-wider"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.1 }}
                    >
                      {product.category}
                    </motion.span>
                    
                    <motion.h3 
                      className="text-2xl font-bold text-slate-800 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.2 }}
                    >
                      {product.name}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-slate-600 mb-6 line-clamp-2 text-base"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                    >
                      {product.description}
                    </motion.p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <motion.span 
                          key={i} 
                          className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.3 + i * 0.1 }}
                          whileHover={{ scale: 1.1, backgroundColor: "#d1fae5" }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <motion.span 
                        className="text-sm font-medium text-slate-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.4 }}
                      >
                        {buttonsMoreInfo}
                      </motion.span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="bg-gradient-to-r from-emerald-100 to-emerald-50 p-2 rounded-full group-hover:bg-gradient-to-r group-hover:from-emerald-200 group-hover:to-emerald-100 transition-all"
                      >
                        <ArrowRight className="h-5 w-5 text-emerald-600" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            t={t}
            buttonsGetInfo={buttonsGetInfo}
            productsWarranty={productsWarranty}
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
  prevImage,
  t,
  buttonsGetInfo,
  productsWarranty
}) {
  const tabs = [
    { id: 'specs', label: t("products.specifications", "Texnik xususiyatlar"), icon: Ruler },
    { id: 'features', label: t("products.features", "Xususiyatlar"), icon: Layers },
    { id: 'advantages', label: t("products.advantages", "Afzalliklar"), icon: Award },
    { id: 'applications', label: t("products.applications", "Qo'llanish sohalari"), icon: Box }
  ];

  const productInfo = t("products.product_info", "Mahsulot haqida");
  const galleryTitle = t("products.gallery", "Mahsulot galereyasi");

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
              <h2 className="text-2xl font-bold text-slate-800">{product.name}</h2>
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
              <h3 className="text-lg font-semibold text-slate-800">{galleryTitle}</h3>
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
              {/* Left - Image Gallery */}
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
                      alt={product.name}
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
                    {productInfo}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 md:gap-2 border-b border-slate-100">
                  {tabs.map((tab) => {
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
                <span className="text-xs md:text-sm text-slate-600 font-medium">13 {productsWarranty}</span>
              </div>
            </div>
            
            <button className="w-full sm:w-auto bg-emerald-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 md:gap-3">
              {buttonsGetInfo}
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}