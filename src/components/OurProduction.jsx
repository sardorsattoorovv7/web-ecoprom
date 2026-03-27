import { motion, AnimatePresence } from "framer-motion";
import { 
  Factory, Package, Users, Settings, 
  Shield, ChevronRight, Play, X,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  Download, FileText, Snowflake, DoorOpen 
} from "lucide-react";
import { useState, useEffect } from "react";

const productionImages = [
  {
    id: 1,
    image: "https://i.ibb.co/vC01JWC5/unnamed.jpg",
    title: "Xomashyo uzatish tizimi",
    category: "Ishlab chiqarish",
    description: "Liniyaning yuqori qismida joylashgan maxsus rezervuarlar va xomashyo aralashtirish tizimi. Bu yerda panelning ichki qismi uchun komponentlar tayyorlanadi."
  },
  {
    id: 2,
    image: "https://i.ibb.co/vC01JWC5/unnamed.jpg",
    title: "Sovutgich kameralar yig'ish sexi",
    category: "Yig'ish",
    description: "Butun liniyani boshqaruvchi markaziy blok. Ishlab chiqarish jarayoni to'liq raqamlashtirilgan bo'lib, inson omilini minimallashtiradi."  },
  {
    id: 3,
    image: "https://i.ibb.co/zT5DxCg4/unnamed-1.jpg",
    title: "Konveyer va shakllantirish bo'limi",
    category: "Ishlab chiqarish",
    description: "Tayyor panellarning shakllanishi va harakatlanishi uchun mo'ljallangan uzun konveyer liniyasi. Xavfsizlik qoidalariga muvofiq maxsus belgilar bilan jihozlangan." 
  },
  {
    id: 4,
    image: "https://i.ibb.co/NnWr9K4T/unnamed-2.jpg",
    title: "Gidravlik presslash tizimi",
    category: "Sifat nazorati",
    description: "Panellarni yuqori bosim ostida presslash va zichligini ta'minlash uchun mo'ljallangan gidravlik porshenlar tizimi."
  },
  {
    id: 5,
    image: "https://i.ibb.co/TBMC5Gx5/unnamed-3.jpg",
    title: "Tayyor mahsulot chiqish qismi",
    category: "Yakuniy bosqich",
    description: "Tayyor bo'lgan sendvich panellarning qadoqlashga yo'naltiriladigan qismi. Bu yerda panellar belgilangan o'lchamlar bo'yicha nazoratdan o'tadi."
  },
 
];

const stats = [
  { id: 1, value: "10 000 m²", label: "Ishlab chiqarish maydoni", icon: Factory },
  { id: 2, value: "100+", label: "Malakali xodimlar", icon: Users },
  { id: 3, value: "5", label: "Ishlab chiqarish liniyasi", icon: Settings },
  // { id: 4, value: "ISO 9001", label: "Sifat sertifikati", icon: Shield }
];

// Kataloglar ro'yxati
const catalogs = [
  {
    id: 1,
    name: "PIR Sendvich panellar katalogi",
    description: "Texnik xususiyatlar, o'lchamlar, ranglar",
    fileSize: "4.5 MB",
    pages: 24,
    icon: Package,
    url: "/catalogs/pir-panels.pdf"
  },
  {
    id: 2,
    name: "Sovutgich kameralar katalogi",
    description: "Sovutish tizimlari, o'rnatish bo'yicha qo'llanma",
    fileSize: "3.8 MB",
    pages: 18,
    icon: Snowflake,
    url: "/catalogs/cold-rooms.pdf"
  },
  {
    id: 3,
    name: "Sanoat eshiklari katalogi",
    description: "Germetik eshiklar, avtomatika, o'lchamlar",
    fileSize: "5.2 MB",
    pages: 32,
    icon: DoorOpen,
    url: "/catalogs/doors.pdf"
  },
  {
    id: 4,
    name: "Umumiy katalog",
    description: "Barcha mahsulotlar to'plami",
    fileSize: "12.5 MB",
    pages: 68,
    icon: FileText,
    url: "/catalogs/general.pdf"
  }
];

export default function OurProduction() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCatalogs, setShowCatalogs] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-slide har 8 soniyada (hovering pauzasida to'xtaydi)
  useEffect(() => {
    if (isHovering) return; // Hovering pauzada, interval o'tkasman
    
    const autoSlideTimer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % productionImages.length);
    }, 8000);

    return () => clearInterval(autoSlideTimer);
  }, [isHovering]);





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

  const downloadCatalog = (url, name) => {
    // PDF ni yuklab olish
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-pad relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full text-sm font-semibold text-emerald-700 mb-4">
            <Factory className="h-4 w-4" />
            Ishlab chiqarish
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Bizning <span className="text-emerald-600">ishlab chiqarish</span>
          </h2>
          <p className="text-lg text-slate-500">
            Zamonaviy uskunalar va malakali mutaxassislar
          </p>
        </motion.div>

        {/* Stats */}
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
                <motion.div 
                  className="text-xl font-bold text-slate-800 mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <motion.div 
                  className="text-xs text-slate-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.3 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Production Image Slider */}
        <div className="relative w-full mb-12">
          {/* Main Slider */}
          <motion.div 
            className="relative h-screen max-h-[700px] overflow-hidden rounded-2xl shadow-2xl"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            animate={{ scale: isHovering ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient overlay on sides */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/20 to-transparent z-5 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/20 to-transparent z-5 pointer-events-none" />
            
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: isHovering 
                  ? "inset 0 0 40px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.2)" 
                  : "inset 0 0 0px rgba(16, 185, 129, 0), 0 0 0px rgba(16, 185, 129, 0)"
              }}
              transition={{ duration: 0.3 }}
            />
            
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
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="inline-block bg-emerald-600 px-3 py-1 rounded-full text-xs font-medium mb-3">
                      {productionImages[currentIndex].category}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">
                      {productionImages[currentIndex].title}
                    </h3>
                    <p className="text-white/80 max-w-2xl">
                      {productionImages[currentIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Indicators */}
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
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Catalog Section */}
     

      
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-2xl">
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