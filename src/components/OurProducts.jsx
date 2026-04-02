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

// Ma'lumotlar bazasi (Statik qismi)
const productsData = [
  {
    id: 1,
    image: "/assets/devor.jpg",
    gallery: ["/assets/devor.jpg"],
    icon: Package,
    specs: [
      { labelKey: "thickness", value: "40-200 mm", icon: Ruler },
      { labelKey: "length", value: "2000-16000 mm", icon: Ruler },
      { labelKey: "width", value: "1000/1190 mm", icon: Ruler },
      { labelKey: "thermal_conductivity", value: "0.0194 W/(m·K)", icon: Thermometer },
    ],
    featuresKeys: ["fire_resistance", "energy_saving", "ral_colors", "sealed_connection"],
    advantagesKeys: ["no_cold_bridges", "ce_certificate", "en_standard", "profile_connection"],
    appsKey: "panels"
  },
  {
    id: 2,
    image: "/assets/sovutgich.jpg",
    gallery: ["/assets/sovutgich.jpg"],
    icon: Package,
    specs: [
      { labelKey: "temperature", value: "-25°C to +8°C", icon: Thermometer },
      { labelKey: "volume", value: "5-1000 m³", icon: Package },
      { labelKey: "wall_thickness", value: "80-200 mm", icon: Ruler },
      { labelKey: "humidity", value: "40-85%", icon: Droplets },
    ],
    featuresKeys: ["automatic_control", "humidity_sensors", "quick_freezing", "defrost_system"],
    advantagesKeys: ["energy_efficient", "247_monitoring", "backup_power", "gsm_alarm"],
    appsKey: "cold"
  },
  {
    id: 3,
    image: "/assets/omborr.jpg",
    gallery: ["/assets/ombor.jpg"],
    icon: Package,
    specs: [
      { labelKey: "area", value: "100-10000 m²", icon: Ruler },
      { labelKey: "height", value: "6-15 m", icon: Ruler },
      { labelKey: "load_capacity", value: "5 t/m²", icon: Package },
      { labelKey: "installation", value: "30-90 kun", icon: Clock },
    ],
    featuresKeys: ["fast_assembly", "durable", "economical", "energy_efficient"],
    advantagesKeys: ["13_year_warranty", "any_climate", "modular_system", "expandable"],
    appsKey: "warehouse"
  }
];

export default function OurProducts({ onProductClick }) {
  const { t, i18n } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  // MUHIM: Tarjimani to'g'ri olish uchun useMemo
  const products = useMemo(() => {
    // Tarjima faylidan "our_products.products" massivini olamiz
    const translatedList = t("our_products.products", { returnObjects: true });
    
    if (!Array.isArray(translatedList)) return [];

    return productsData.map((item, index) => {
      const tItem = translatedList[index] || {};
      return {
        ...item,
        name: tItem.name || "Product Name",
        category: tItem.category || "Category",
        description: tItem.description || "",
        longDescription: tItem.longDescription || "",
        // Xususiyatlarni JSON dagi massivdan olish
        features: tItem.features || [],
        advantages: tItem.advantages || [],
        applications: tItem.applications || [],
        // Specs larni birlashtirish
        specs: item.specs.map((spec, sIdx) => ({
          ...spec,
          label: tItem.specs?.[sIdx]?.label || spec.labelKey
        }))
      };
    });
  }, [t, i18n.language]);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
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

  if (products.length === 0) return null;

  return (
    <>
      <section className="py-24 bg-slate-100 rounded-2xl shadow-md max-w-7xl w-full px-4 mx-auto mb-10">
        <div className="container-pad relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-slate-800 mb-4">
              {t("our_products.title")}
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              {t("our_products.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="group cursor-pointer bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-100"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative h-80 bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <ZoomIn size={16} /> {t("our_products.quick_view")}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <span className="text-sm text-emerald-600 font-bold mb-2 uppercase">{product.category}</span>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{product.name}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <span className="text-sm font-medium text-slate-400">{t("our_products.more_info")}</span>
                    <ArrowRight className="text-emerald-600" />
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
            onClose={() => setIsModalOpen(false)}
            t={t}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProductDetailModal({ product, onClose, t, activeTab, setActiveTab }) {
  const tabs = [
    { id: 'specs', label: t("our_products.tabs.specs"), icon: Ruler },
    { id: 'features', label: t("our_products.tabs.features"), icon: Layers },
    { id: 'advantages', label: t("our_products.tabs.advantages"), icon: Award },
    { id: 'applications', label: t("our_products.tabs.applications"), icon: Box }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-emerald-600 font-bold uppercase">{product.category}</p>
              <h2 className="text-2xl font-bold text-slate-800">{product.name}</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-slate-50 rounded-2xl p-6 flex items-center justify-center">
            <img src={product.image} alt="" className="max-h-80 object-contain" />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Info size={18} className="text-emerald-500" /> {t("our_products.about_product")}
              </h3>
              <p className="text-slate-600 leading-relaxed">{product.longDescription}</p>
            </div>

            <div className="flex border-b">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 text-sm font-bold transition-all ${activeTab === tab.id ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-slate-400'}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 min-h-[200px]">
              {product[activeTab]?.map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center">
                  {activeTab === 'specs' ? (
                    <>
                      <span className="text-[10px] uppercase font-bold text-slate-400">{item.label}</span>
                      <span className="text-sm font-bold text-slate-700">{item.value}</span>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-500" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}