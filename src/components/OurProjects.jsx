import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, X, MapPin, Calendar, Package, 
  ChevronRight, Award, Building2, ExternalLink 
} from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "Sabzavot ombori",
    location: "Toshkent viloyati, O'zbekiston",
    category: "Qishloq xo'jaligi",
    image: "https://i.ibb.co/LzsjFKLv/24.png",
    description: "5000 tonna sabzavot saqlash quvvatiga ega zamonaviy sovutgich ombori. Harorat -2°C dan +4°C gacha boshqariladi.",
    details: {
      area: "2500 m²",
      capacity: "5000 tonna",
      year: "2024",
      technology: "PIR panellar, R134a sovutish tizimi",
      features: [
        "Avtomatik harorat nazorati",
        "Namlik boshqaruvi",
        "Zaxira generator",
        "GSM monitoring"
      ]
    }
  },
  {
    id: 2,
    name: "Meva saqlash ombori",
    location: "Samarqand, O'zbekiston",
    category: "Agrosanoat",
    image: "https://i.ibb.co/cKxQGBF7/27.png",
    description: "Olma, nok va boshqa mevalarni uzoq muddat saqlash uchun mo'ljallangan 3000 tonnalik ombor.",
    details: {
      area: "1800 m²",
      capacity: "3000 tonna",
      year: "2023",
      technology: "Sovutgich kameralar, ULO saqlash",
      features: [
        "Kontrolli atmosfera",
        "Etilen boshqaruvi",
        "Sorteerlash liniyasi",
        "Qadoqlash sexi"
      ]
    }
  },
  {
    id: 3,
    name: "Un ishlab chiqarish kompleksi",
    location: "Andijon, O'zbekiston",
    category: "Sanoat",
    image: "https://i.ibb.co/xK8Hk6TM/26.png",
    description: "Kuniga 200 tonna un ishlab chiqarish quvvatiga ega zamonaviy tegirmon kompleksi.",
    details: {
      area: "3500 m²",
      capacity: "200 t/kun",
      year: "2024",
      technology: "Metall konstruksiya, PIR panellar",
      features: [
        "To'liq avtomatlashtirilgan",
        "Laboratoriya",
        "Silos xo'jaligi",
        "Yuklash terminali"
      ]
    }
  },
  {
    id: 4,
    name: "Meva qayta ishlash zavodi",
    location: "Farg'ona, O'zbekiston",
    category: "Qayta ishlash",
    image: "https://i.ibb.co/Mxb7XYpz/29.png",
    description: "Yiliga 10000 tonna meva va sabzavotlarni qayta ishlash quvvatiga ega zamonaviy zavod.",
    details: {
      area: "4200 m²",
      capacity: "10000 t/yil",
      year: "2023",
      technology: "Sovutish tizimlari, muzlatish kameralari",
      features: [
        "Tez muzlatish (-35°C)",
        "Suv tozalash tizimi",
        "Laboratoriya",
        "Ombor majmuasi"
      ]
    }
  },
  {
    id: 5,
    name: "Parrandachilik kompleksi",
    location: "Jizzax, O'zbekiston",
    category: "Qishloq xo'jaligi",
    image: "https://i.ibb.co/cKxQGBF7/27.png",
    description: "100000 bosh parranda uchun mo'ljallangan zamonaviy ferma majmuasi.",
    details: {
      area: "5000 m²",
      capacity: "100000 bosh",
      year: "2024",
      technology: "Sendvich panellar, ventilyatsiya tizimi",
      features: [
        "Avtomatik ozuqa tarqatish",
        "Iqlim nazorati",
        "Chiqindilarni qayta ishlash",
        "Suv tozalash"
      ]
    }
  },
  {
    id: 6,
    name: "Go'shtni qayta ishlash kompleksi",
    location: "Namangan, O'zbekiston",
    category: "Oziq-ovqat sanoati",
    image: "https://i.ibb.co/LzsjFKLv/24.png",
    description: "Kuniga 50 tonna go'sht mahsulotlarini qayta ishlash quvvatiga ega zamonaviy kompleks.",
    details: {
      area: "3800 m²",
      capacity: "50 t/kun",
      year: "2023",
      technology: "Sovutgich kameralar, muzlatish tizimlari",
      features: [
        "Muzlatish (-25°C)",
        "Sovutish (+2°C)",
        "Qadoqlash liniyasi",
        "Ekspeditsiya"
      ]
    }
  },
  {
    id: 7,
    name: "Muzlatgich ombori",
    location: "Buxoro, O'zbekiston",
    category: "Logistika",
    image: "https://i.ibb.co/xK8Hk6TM/26.png",
    description: "8000 tonnalik muzlatgich ombori, -25°C gacha haroratni saqlaydi.",
    details: {
      area: "4500 m²",
      capacity: "8000 tonna",
      year: "2024",
      technology: "PIR panellar, ikki bosqichli sovutish",
      features: [
        "Muzlatish kameralari",
        "Sovutish kameralari",
        "Ekspeditsiya zonasi",
        "Yuklash rampasi"
      ]
    }
  },
  {
    id: 8,
    name: "Sut mahsulotlari zavodi",
    location: "Qarshi, O'zbekiston",
    category: "Oziq-ovqat sanoati",
    image: "https://i.ibb.co/Mxb7XYpz/29.png",
    description: "Kuniga 100 tonna sut mahsulotlarini qayta ishlash quvvatiga ega zamonaviy zavod.",
    details: {
      area: "5200 m²",
      capacity: "100 t/kun",
      year: "2023",
      technology: "Sovutish tizimlari, sterilizatsiya",
      features: [
        "Sovutish kameralari",
        "Muzlatish kameralari",
        "Laboratoriya",
        "Sifat nazorati"
      ]
    }
  }
];

export default function OurProjects({ limit = 6 }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("barchasi");

  // Filter options
  const filters = [
    { id: "barchasi", name: "Barchasi" },
    { id: "qishloq", name: "Qishloq xo'jaligi" },
    { id: "sanoat", name: "Sanoat" },
    { id: "ozuq", name: "Oziq-ovqat" },
    { id: "logistika", name: "Logistika" }
  ];

  // Filter projects
  const filteredProjects = filter === "barchasi" 
    ? projects 
    : projects.filter(p => 
        (filter === "qishloq" && (p.category === "Qishloq xo'jaligi" || p.category === "Agrosanoat")) ||
        (filter === "sanoat" && p.category === "Sanoat") ||
        (filter === "ozuq" && (p.category === "Oziq-ovqat sanoati" || p.category === "Qayta ishlash")) ||
        (filter === "logistika" && p.category === "Logistika")
      );

  // Limit projects for homepage
  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  // Modal scroll ni to'xtatish
  useState(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-pad relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Bizning <span className="text-emerald-600">loyihalar</span>
          </h2>
          <p className="text-lg text-slate-500">
            500+ muvaffaqiyatli loyihalar | 12 yillik tajriba
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === f.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - 3 ustun, rasmlar kartochkani to'ldiradi */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all"
              onClick={() => openModal(project)}
            >
              {/* Image - kartochkani to'ldiradi */}
              <div className="h-42 bg-slate-50 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">
                  {project.name}
                </h3>
                <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="line-clamp-1">{project.location}</span>
                </div>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{project.details.year}</span>
                  </div>
                  <span className="text-emerald-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Batafsil
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button - limit bo'lganda ko'rinadi */}
        {limit && filteredProjects.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors group shadow-lg hover:shadow-xl"
            >
              Barcha loyihalarni ko'rish
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* Project Detail Modal Component */
function ProjectDetailModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-emerald-600" />
            <h3 className="text-xl font-semibold text-slate-800">{project.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image - katta */}
            <div className="bg-slate-50 rounded-xl overflow-hidden h-42">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1">Loyiha haqida</h4>
                <p className="text-slate-600">{project.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="text-xs text-slate-400 block">Joylashuv</span>
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    {project.location}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="text-xs text-slate-400 block">Yil</span>
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                    {project.details.year}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-emerald-600" />
              Texnik ma'lumotlar
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-xs text-slate-400 block">Maydon</span>
                <span className="text-sm font-bold text-slate-700">{project.details.area}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-xs text-slate-400 block">Quvvat</span>
                <span className="text-sm font-bold text-slate-700">{project.details.capacity}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-xs text-slate-400 block">Texnologiya</span>
                <span className="text-sm font-bold text-slate-700">PIR</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Asosiy xususiyatlar</h4>
            <div className="grid grid-cols-2 gap-2">
              {project.details.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
            <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              Loyiha sahifasi
            </button>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
              Konsultatsiya olish
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}