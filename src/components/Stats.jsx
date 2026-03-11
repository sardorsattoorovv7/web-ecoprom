import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

export default function Stats() {
  const { t } = useTranslation();
  const [ref, inView] = useInView();

  const items = [
    { label: "Projects", value: 3000 },
    { label: "Panels (m²)", value: 3500 },
    { label: "Clients", value: 1200 },
    { label: "Regions", value: 14 },
  ];

  return (
    <section className="container-pad mt-12" ref={ref}>
      <div className="card p-6">
        <h2 className="text-2xl md:text-3xl font-semibold">{t("sections.stats")}</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.label} className="rounded-2xl border border-slate-100 p-4">
              <div className="text-3xl font-semibold">
                {inView ? it.value.toLocaleString() : "—"}
                <span className="text-emerald-700">+</span>
              </div>
              <div className="text-sm text-slate-600 mt-1">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
