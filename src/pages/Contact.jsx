import { services } from "../data/services";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Wrench,
  PenTool,
  Snowflake,
  ShieldCheck,
  Factory,
} from "lucide-react";

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
    <div className="bg-ielts-grid min-h-screen">
      <div className="container-pad py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Xizmatlar
          </h1>

          <p className="text-slate-600 mt-2 max-w-2xl">
            To‘liq xizmatlar majmuasi: loyiha, ishlab chiqarish,
            montaj va servis xizmatlari.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = getServiceIcon(service);

            return (
              <Link
                to={`/services/${service.slug}`}
                key={service.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition">
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
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}