import { motion } from "framer-motion";
import { useState } from "react";
import { Package, X } from "lucide-react";

const products = [
  // ESHIKLAR (o'zgarishsiz)
  {
    id: 2,
    name: "F1 Eshik",
    category: "eshik",
    images: ["https://i.ibb.co/Kj9zBbDG/3.png", "https://i.ibb.co/Vd4CY31/4.png"],
    description: "Material: Sandwich panellar. Ramka: Alyuminiy. Tutqich va menteşalar: Plastik. Mexanizm: Xitoy.",
    specs: {
      material: "Sandwich panellar",
      frame: "Alyuminiy",
      hinges: "Plastik",
      mechanism: "Xitoy"
    }
  },
  {
    id: 3,
    name: "F2 Eshik",
    category: "eshik",
    images: ["https://i.ibb.co/hxh8cXFK/5.png", "https://i.ibb.co/20ZdDK2M/6.png"],
    description: "Material: Sandwich panellar. Ramka: Alyuminiy (kengaytirilgan). Tutqich va menteşalar: Plastik (3 ta menteşa).",
    specs: {
      material: "Sandwich panellar",
      frame: "Alyuminiy (kengaytirilgan)",
      hinges: "Plastik (3 ta)",
      mechanism: "Standart"
    }
  },
  {
    id: 4,
    name: "F3 Eshik",
    category: "eshik",
    images: ["https://i.ibb.co/gbdjwy33/7.png", "https://i.ibb.co/rqtmgr9/8.png"],
    description: "Material: Sandwich panellar. Ramka: Plastik. Tutqich va menteşalar: Metall. Mexanizm: Maxsus.",
    specs: {
      material: "Sandwich panellar",
      frame: "Plastik",
      hinges: "Metall",
      mechanism: "Maxsus"
    }
  },
  {
    id: 5,
    name: "F4 Eshik",
    category: "eshik",
    images: ["https://i.ibb.co/3Y4BhGMm/9.png", "https://i.ibb.co/XqyXQQ2/10.png"],
    description: "Material: Sandwich panellar. Ramka: Plastik.",
    specs: {
      material: "Sandwich panellar",
      frame: "Plastik",
      hinges: "Standart",
      mechanism: "Standart"
    }
  },
  {
    id: 6,
    name: "F5 Eshik",
    category: "eshik",
    images: ["https://i.ibb.co/Rp2sPZFm/11.png", "https://i.ibb.co/wrR9ftK2/12.png"],
    description: "Material: Sandwich panellar. Ramka: Plastik. Tutqich va menteşalar: Metall.",
    specs: {
      material: "Sandwich panellar",
      frame: "Plastik",
      hinges: "Metall",
      mechanism: "Standart"
    }
  },
  {
    id: 7,
    name: "F6 Eshik",
    category: "eshik",
    images: ["https://i.ibb.co/xtdQGK83/13.png", "https://i.ibb.co/FqcVx2yk/14.png"],
    description: "Material: Sandwich panellar. Ramka: Alyuminiy. Menteşalar: Turkiya plastigi. Tutqich: Egri to‘siqcha. Konstruktsiya: Ikki qanotli mayatnik eshik. Xususiyatlar: Shisha oynachalar. Ochildi yo‘nalishi: Ikkala tomonga.",
    specs: {
      material: "Sandwich panellar",
      frame: "Alyuminiy",
      hinges: "Turkiya plastigi",
      design: "Ikki qanotli mayatnik",
      features: "Shisha oynachalar"
    }
  },
  {
    id: 8,
    name: "F7 Eshik",
    category: "eshik",
    images: ["https://i.ibb.co/v46fBbnB/15.png", "https://i.ibb.co/DffTrMCW/16.png"],
    description: "Material: Sandwich panellar. Ramka: Alyuminiy. Menteşalar: Turkiya plastigi. Tutqich: PVX egri to‘siqcha. Konstruktsiya: Bir qanotli mayatnik eshik.",
    specs: {
      material: "Sandwich panellar",
      frame: "Alyuminiy",
      hinges: "Turkiya plastigi",
      handle: "PVX egri to‘siqcha",
      design: "Bir qanotli mayatnik"
    }
  },
  {
    id: 9,
    name: "F8 Eshik",
    category: "eshik",
    images: ["https://i.ibb.co/6cBwbLss/17.png", "https://i.ibb.co/Z1hd3L4Z/18.png"],
    description: "Material: Sandwich panellar. Ramka: Alyuminiy. Tutqich va menteşalar: Metall. Konstruktsiya: Süriluvchi eshik. Xususiyatlar: Maxsus rels va roliklar, tutqich va tutqich mexanizmi, pastki ramkasiz (arava va transport uchun).",
    specs: {
      material: "Sandwich panellar",
      frame: "Alyuminiy",
      hinges: "Metall",
      design: "Süriluvchi eshik",
      features: "Pastki ramkasiz"
    }
  },
  {
    id: 10,
    name: "F9 Eshik",
    category: "eshik",
    images: ["https://i.ibb.co/SDhMZV7t/19.png", "https://i.ibb.co/mVJQx07B/20.png"],
    description: "Material: Sandwich panellar. Ramka: Alyuminiy. Konstruktsiya: Süriluvchi eshik (F8 bilan o‘xshash). Xususiyatlar: Zanjirli qulflash mexanizmi, tutqichsiz dizayn.",
    specs: {
      material: "Sandwich panellar",
      frame: "Alyuminiy",
      design: "Süriluvchi eshik",
      lock: "Zanjirli mexanizm",
      handle: "Tutqichsiz"
    }
  },

  // SOVUTGICH KAMERALAR
  {
    id: 11,
    name: "WALK-IN Muzlatish Kamerasi",
    category: "sovutgich",
    images: ["https://i.ibb.co/LzsjFKLv/24.png"],
    description: "Sovutgich va muzlatkich kameralari. Tibbiyot muassasalarida dori vositalarini, gullarni, go‘shtni, baliqni, mevalarni va muzqaymoqni ishonchli saqlash uchun mo‘ljallangan. Innovatsion yechimlar, energiya tejamkorligi va yuqori saqlash standartlari.",
    specs: {
      type: "Muzlatish kamerasi",
      usage: "Dori, go'sht, baliq, meva, muzqaymoq",
      features: "Energiya tejamkor, innovatsion"
    }
  },
  {
    id: 12,
    name: "Muzqaymoq uchun kamera",
    category: "sovutgich",
    images: ["https://i.ibb.co/twc1XRfc/25.png"],
    description: "Harorat rejimi: -20°C dan -25°C gacha. Muzqaymoqni uzoq muddatli saqlash uchun ideal. Maxsus panjaralar va javonlar bilan jihozlangan.",
    specs: {
      temperature: "-20°C dan -25°C",
      usage: "Muzqaymoq",
      features: "Maxsus javonlar"
    }
  },
  {
    id: 13,
    name: "Sabzavot va mevalar uchun kamera",
    category: "sovutgich",
    images: ["https://i.ibb.co/xK8Hk6TM/26.png"],
    description: "Harorat rejimi: +6°C dan +10°C gacha. Sabzavot va mevalarni yangiligicha saqlash. Optimal shamollatish va sozlanadigan namlik darajasi.",
    specs: {
      temperature: "+6°C dan +10°C",
      usage: "Sabzavot va mevalar",
      features: "Shamollatish, namlik nazorati"
    }
  },
  {
    id: 14,
    name: "Mol go‘shti uchun kamera",
    category: "sovutgich",
    images: ["https://i.ibb.co/cKxQGBF7/27.png"],
    description: "Harorat rejimi: +1°C dan +4°C gacha. Yangi mol go‘shtini optimal saqlash. Go‘shtning turli qismlari uchun zonalarga bo‘lingan.",
    specs: {
      temperature: "+1°C dan +4°C",
      usage: "Mol go‘shti",
      features: "Zonalarga bo'lingan"
    }
  },
  {
    id: 15,
    name: "Baliq uchun kamera",
    category: "sovutgich",
    images: ["https://i.ibb.co/MDvBt4Zq/28.png"],
    description: "Harorat rejimi: -2°C dan +2°C gacha. Baliqning yangiligini saqlash. Suv oqizish imkoniyatiga ega maxsus javonlar.",
    specs: {
      temperature: "-2°C dan +2°C",
      usage: "Baliq",
      features: "Suv oqizish tizimi"
    }
  },
  {
    id: 16,
    name: "Dori vositalari uchun kamera",
    category: "sovutgich",
    images: ["https://i.ibb.co/Mxb7XYpz/29.png"],
    description: "Harorat rejimi: +2°C dan +8°C gacha. Dori vositalarini xavfsiz saqlash. Haroratni kuzatish tizimi va favqulodda ogohlantirish funksiyasi.",
    specs: {
      temperature: "+2°C dan +8°C",
      usage: "Dori vositalari",
      features: "Kuzatuv tizimi, ogohlantirish"
    }
  },

  // PANELLAR
  {
    id: 22,
    name: "Yashirin Zamokli PIR Panel",
    category: "panel",
    images: ["https://i.ibb.co/NdFPCV5Y/23.png"],
    description: "Sandwich panel. Ramka: Alyuminiy. Zamonaviy dizayn. Yashirin zamok tizimi.",
    specs: {
      type: "PIR Panel",
      frame: "Alyuminiy",
      features: "Yashirin zamok",
      sizes: "5cm, 8cm"
    }
  },
  {
    id: 23,
    name: "PUR Panel",
    category: "panel",
    images: ["https://i.ibb.co/B51h8gCm/22.png"],
    description: "Soddaligi va chidamliligi bilan ajraladi. Ramka: Alyuminiy. Mexanizm: Xitoy. O‘lchamlar: 5cm, 8cm, 10cm, 15cm.",
    specs: {
      type: "PUR Panel",
      frame: "Alyuminiy",
      mechanism: "Xitoy",
      sizes: "5cm, 8cm, 10cm, 15cm"
    }
  },
  {
    id: 24,
    name: "Panel",
    category: "panel",
    images: ["https://i.ibb.co/1jsNDYx/21.png"],
    description: "Issiqlikni yaxshi saqlaydi. Yengil konstruktsiya. Barcha ranglar mavjud.",
    specs: {
      type: "Panel",
      features: "Issiqlik saqlash, yengil",
      colors: "Barcha ranglar"
    }
  }
];

export default function OurProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", name: "Barchasi" },
    { id: "eshik", name: "Eshiklar" },
    { id: "sovutgich", name: "Sovutgich kameralar" },
    { id: "panel", name: "Panellar" }
  ];

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.category === filter);

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Kvadratcha grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-pad relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full text-sm font-semibold text-emerald-700 mb-4">
            <Package className="h-4 w-4" />
            Mahsulotlarimiz
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Bizning <span className="text-emerald-600">mahsulotlar</span>
          </h2>
          <p className="text-lg text-slate-500">
            Sifat va ishonch garovi
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === cat.id
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products grid - FONLAR O'CHIRILDI */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => openModal(product)}
              className="group rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-white/0 backdrop-blur-sm"
            >
              {/* Image */}
              <div className="h-48 bg-white/0 p-4 flex items-center justify-center relative overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-32 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                  {product.category === "eshik" ? "Eshik" : product.category === "sovutgich" ? "Sovutgich" : "Panel"}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 bg-white/20 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{product.name}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                  {product.description.substring(0, 80)}...
                </p>
                <div className="flex items-center justify-end">
                  <span className="text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                    Batafsil →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Modal (o'zgarishsiz) */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-xl font-semibold text-slate-800">{selectedProduct.name}</h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-center mb-3">
                    <img
                      src={selectedProduct.images[selectedImage]}
                      alt={selectedProduct.name}
                      className="h-64 w-auto object-contain"
                    />
                  </div>
                  {selectedProduct.images.length > 1 && (
                    <div className="flex gap-2 justify-center">
                      {selectedProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`w-12 h-12 rounded-lg border-2 overflow-hidden ${
                            selectedImage === idx ? "border-emerald-500" : "border-transparent"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <p className="text-slate-600 whitespace-pre-line">
                    {selectedProduct.description}
                  </p>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-3">Texnik xususiyatlar</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedProduct.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-slate-500">{key}:</span>
                          <span className="font-medium text-slate-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <p className="text-sm text-emerald-700">
                      Kategoriya: {selectedProduct.category === "eshik" ? "Eshiklar" : 
                                   selectedProduct.category === "sovutgich" ? "Sovutgich kameralar" : "Panellar"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}