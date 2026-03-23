import { services } from "../data/services";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Wrench,
  PenTool,
  Snowflake,
  ShieldCheck,
  Factory,
} from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
  }),
};

function getServiceIcon(service) {
  const key =
    `${service.slug} ${service.title_uz ?? ""} ${service.desc_uz ?? ""}`.toLowerCase();

  if (key.includes("loyiha") || key.includes("design")) return PenTool;

  if (
    key.includes("montaj") ||
    key.includes("o‘rnatish") ||
    key.includes("ornatish")
  )
    return Wrench;

  if (key.includes("sovut") || key.includes("kamera")) return Snowflake;

  if (key.includes("servis") || key.includes("tamir")) return ShieldCheck;

  if (key.includes("zavod") || key.includes("ishlab chiqar")) return Factory;

  return Building2;
}

export default function Services() {
  return (
    <div className="relative min-h-screen overflow-hidden">
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

      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none" />

      <div className="relative z-10 container-pad py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-medium mb-4">
            Xizmatlar
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Xizmatlar
          </h1>

          <p className="text-slate-600 mt-2 max-w-2xl text-lg">
            To‘liq xizmatlar majmuasi: loyiha, ishlab chiqarish,
            montaj va servis xizmatlari.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service);

            return (
              <motion.div
                key={service.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group block rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-100">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <div className="mt-4 text-lg font-semibold text-slate-900">
                    {service.title_uz}
                  </div>

                  {/* Description */}
                  <div className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {service.desc_uz}
                  </div>

                  {/* CTA */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-700">
                    Batafsil
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}