import { motion } from "framer-motion";
import { Award, Briefcase, Globe2 } from "lucide-react";

const partners = [
  { 
    id: 1, 
    name: "Sevimli Samarqand",
    logo: "/assets/logo-partners/sevimli-samarqand.png"
  },
  { 
    id: 2, 
    name: "AGROMIR",
    logo: "/assets/logo-partners/agromir.png"
  },
  { 
    id: 3, 
    name: "Shirin Tabaka",
    logo: "/assets/logo-partners/shirintabaka.png"
  },
  { 
    id: 4, 
    name: "Eco Dry Food",
    logo: "/assets/logo-partners/ecodry.png"
  },
  { 
    id: 5, 
    name: "Stroy Xolod Tashkent",
    logo: "/assets/logo-partners/stroyxolod.png"
  },
  { 
    id: 6, 
    name: "Agro Bravo",
    logo: "/assets/logo-partners/agrobravo.png"
  },
];

export default function OurPartners() {
  return (
    <section className="py-24 bg-white/0 relative overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-50/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-100/10 rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b8 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="container-pad relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-emerald-200/50 bg-white/50 backdrop-blur-sm mb-6">
            <Award className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
              Ishonchli hamkorlarimiz
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 mb-6 tracking-tight">
            Bizning <span className="font-semibold text-emerald-600">Hamkorlarimiz</span>
          </h2>
        </motion.div>

        {/* Partners Marquee */}
        <div className="relative py-8">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/0 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/0 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex whitespace-nowrap"
            >
              {/* First row */}
              <div className="flex gap-16 md:gap-24 px-8 items-center">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="inline-flex flex-col items-center group cursor-default"
                  >
                    <img 
                      src={partner.logo}
                      alt={partner.name}
                      className="h-45 md:h-65 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="mt-4 text-sm font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase tracking-wider">
                      {partner.name}
                    </span>
                    <div className="w-12 h-px bg-emerald-200/50 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
              
              {/* Duplicate for seamless loop */}
              <div className="flex gap-16 md:gap-24 px-8 items-center">
                {partners.map((partner) => (
                  <div
                    key={`dup-${partner.id}`}
                    className="inline-flex flex-col items-center group cursor-default"
                  >
                    <img 
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="mt-4 text-sm font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase tracking-wider">
                      {partner.name}
                    </span>
                    <div className="w-12 h-px bg-emerald-200/50 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-12 md:gap-20 mt-20 pt-8 border-t border-slate-100"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-light text-emerald-600 mb-2">50+</div>
            <div className="flex items-center gap-2 text-slate-400 text-sm uppercase tracking-wider">
              <Briefcase className="h-4 w-4" />
              <span>Hamkorlarimiz</span>
            </div>
          </div>
          
          <div className="w-px h-12 bg-slate-200" />
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-light text-emerald-600 mb-2">10+</div>
            <div className="flex items-center gap-2 text-slate-400 text-sm uppercase tracking-wider">
              <Globe2 className="h-4 w-4" />
              <span>Davlatlar</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}