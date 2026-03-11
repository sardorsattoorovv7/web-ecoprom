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

  if (key.includes("loyiha") || key.includes("design")) {
    return PenTool;
  }

  if (
    key.includes("montaj") ||
    key.includes("o‘rnatish") ||
    key.includes("ornatish") ||
    key.includes("install")
  ) {
    return Wrench;
  }

  if (
    key.includes("sovut") ||
    key.includes("kamera") ||
    key.includes("cold") ||
    key.includes("cool")
  ) {
    return Snowflake;
  }

  if (
    key.includes("servis") ||
    key.includes("service") ||
    key.includes("tamir") ||
    key.includes("ta'mir")
  ) {
    return ShieldCheck;
  }

  if (
    key.includes("zavod") ||
    key.includes("factory") ||
    key.includes("ishlab chiqar")
  ) {
    return Factory;
  }

  return Building2;
}

export default function ServiceCards() {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Xizmatlar
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Loyihalash, ishlab chiqarish, montaj va servis bo‘yicha asosiy
            xizmatlarimiz bilan tanishing.
          </p>
        </div>

        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
        >
          Barchasi
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {services.map((xizmat) => {
          const Icon = getServiceIcon(xizmat);

          return (
            <Link
              to={`/services/${xizmat.slug}`}
              key={xizmat.id}
              className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-100">
                <Icon className="h-7 w-7" strokeWidth={2.2} />
              </div>

              <div className="mt-4 text-lg font-semibold text-slate-900">
                {xizmat.title_uz}
              </div>

              <div className="mt-2 text-sm leading-6 text-slate-600">
                {xizmat.desc_uz}
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                Batafsil
                <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}