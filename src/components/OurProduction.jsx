import { motion, AnimatePresence } from "framer-motion";
import { 
  Factory, Package, Users, Settings, 
  Shield, Play, X,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  Download, FileText, Snowflake, DoorOpen 
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function OurProduction() {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const imageUrls = [
    "https://i.ibb.co/vC01JWC5/unnamed.jpg",
    "https://i.ibb.co/vC01JWC5/unnamed.jpg",
    "https://i.ibb.co/zT5DxCg4/unnamed-1.jpg",
    "https://i.ibb.co/NnWr9K4T/unnamed-2.jpg",
    "https://i.ibb.co/TBMC5Gx5/unnamed-3.jpg"
  ];

  const productionImages = useMemo(() => {
    const data = t("production.slider.images", { returnObjects: true });
    if (Array.isArray(data)) {
      return data.map((item, index) => ({
        ...item,
        id: index + 1,
        image: imageUrls[index] || imageUrls[0]
      }));
    }
    return [];
  }, [t, i18n.language]);

  const stats = useMemo(() => {
    const icons = [Factory, Users, Settings, Shield];
    const keys = ["area", "employees", "lines", "quality"];
    const values = ["10 000 m²", "100+", "5", "ISO 9001"];
    
    return keys.map((key, index) => ({
      id: index + 1,
      value: values[index],
      label: t(`production.stats.${key}`),
      icon: icons[index]
    }));
  }, [t, i18n.language]);

  useEffect(() => {
    if (isHovering || productionImages.length === 0) return;
    const autoSlideTimer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % productionImages.length);
    }, 8000);
    return () => clearInterval(autoSlideTimer);
  }, [isHovering, productionImages.length]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (productionImages.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-pad relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full text-sm font-semibold text-emerald-700 mb-4">
            <Factory className="h-4 w-4" />
            {t("production.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t("production.title").split(' ').slice(0, -1).join(' ')} <span className="text-emerald-600">{t("production.title").split(' ').pop()}</span>
          </h2>
          <p className="text-lg text-slate-500">
            {t("production.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6, type: "spring" }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-gradient-to-br from-white to-emerald-50/30 rounded-xl border border-slate-100 p-5 text-center hover:shadow-lg hover:border-emerald-200 transition-all"
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-3"
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="h-6 w-6 text-emerald-600" />
                </motion.div>
                <div className="text-xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="relative w-full mb-12">
          <motion.div 
            className="relative h-screen max-h-[700px] overflow-hidden rounded-2xl shadow-2xl bg-slate-900"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            animate={{ scale: isHovering ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/20 to-transparent z-[5] pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/20 to-transparent z-[5] pointer-events-none" />
            
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 25 },
                  opacity: { duration: 0.5 }
                }}
                className="absolute w-full h-full cursor-pointer"
                onClick={() => openModal(productionImages[currentIndex])}
              >
                <motion.img
                  src={productionImages[currentIndex].image}
                  alt={productionImages[currentIndex].title}
                  className="w-full h-full object-cover"
                  animate={{ scale: isHovering ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="inline-block bg-emerald-600 px-3 py-1 rounded-full text-xs font-medium mb-3 uppercase tracking-wider">
                      {productionImages[currentIndex].category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {productionImages[currentIndex].title}
                    </h3>
                    <p className="text-white/80 max-w-2xl text-base md:text-lg">
                      {productionImages[currentIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {productionImages.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  width: index === currentIndex ? 28 : 8,
                  backgroundColor: index === currentIndex ? 'rgba(16, 185, 129, 1)' : 'rgba(148, 163, 184, 0.4)',
                }}
                transition={{ duration: 0.3 }}
                className="h-2 rounded-full cursor-pointer"
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 md:-top-4 md:-right-12 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                <X className="h-6 w-6 text-slate-600" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent text-white rounded-b-2xl">
                <h3 className="text-xl font-bold mb-1">{selectedImage.title}</h3>
                <p className="text-sm text-white/80">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}