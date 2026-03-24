import { motion, AnimatePresence } from "framer-motion";
import { 
  Factory, Package, Users, Settings, 
  Shield, ChevronRight, Play, X,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  Download, FileText, Snowflake, DoorOpen 
} from "lucide-react";
import { useState } from "react";

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

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % productionImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + productionImages.length) % productionImages.length);
  };

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
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl border border-slate-100 p-5 text-center hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Production Image Slider */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Main Slider */}
          <div className="relative h-[500px] overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full h-full cursor-pointer"
                onClick={() => openModal(productionImages[currentIndex])}
              >
                <img
                  src={productionImages[currentIndex].image}
                  alt={productionImages[currentIndex].title}
                  className="w-full h-full object-cover"
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
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
          >
            <ChevronLeft className="h-6 w-6 text-slate-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
          >
            <ChevronRightIcon className="h-6 w-6 text-slate-700" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {productionImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-emerald-600' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
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