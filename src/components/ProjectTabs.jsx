import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SHAHARLAR = [
  { label: "Barchasi", value: "All" },
  { label: "Toshkent", value: "Tashkent" },
  { label: "Samarqand", value: "Samarkand" },
  { label: "Buxoro", value: "Bukhara" },
];

export default function ProjectTabs() {
  const [tanlanganShahar, setTanlanganShahar] = useState("All");

  const saralanganLoyihalar = useMemo(() => {
    if (tanlanganShahar === "All") return projects;
    return projects.filter((p) => p.city === tanlanganShahar);
  }, [tanlanganShahar]);

  return (
    <section className="mt-12">
      {/* filter */}
      <div className="flex flex-wrap gap-2">
        {SHAHARLAR.map((shahar) => {
          const active = tanlanganShahar === shahar.value;

          return (
            <button
              key={shahar.value}
              onClick={() => setTanlanganShahar(shahar.value)}
              className={[
                "rounded-2xl border px-4 py-2 text-sm font-medium transition",
                active
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-slate-200 hover:bg-emerald-50",
              ].join(" ")}
            >
              {shahar.label}
            </button>
          );
        })}
      </div>

      {/* cards */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {saralanganLoyihalar.map((loyiha) => (
          <div
            key={loyiha.id}
            className="group flex items-center gap-4 rounded-3xl border border-slate-200 p-5 hover:shadow-xl transition"
          >
            <div className="h-20 w-20 overflow-hidden rounded-2xl">
              <img
                src={loyiha.cover}
                alt={loyiha.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="text-sm text-slate-500 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                {loyiha.city}
              </div>

              <h3 className="text-lg font-semibold">
                {loyiha.title}
              </h3>

              <Link
                to={`/projects/${loyiha.slug}`}
                className="mt-2 inline-flex items-center gap-2 text-emerald-700 text-sm font-medium"
              >
                Batafsil
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}