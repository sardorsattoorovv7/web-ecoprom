import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Snowflake, Beef, Apple, Store } from "lucide-react";

const coldRoomOptions = [
  {
    id: "meat",
    label: "Go‘sht uchun",
    title: "Go‘sht mahsulotlari uchun muzlatgich",
    description:
      "Go‘sht va yarim tayyor mahsulotlarni saqlash uchun ishonchli sovutish yechimi.",
    icon: Beef,
    badge: "Kuchli sovutish",
    image: "https://i.ibb.co/cKxQGBF7/27.png",
  },


  
  {
    id: "fruit",
    label: "Meva-sabzavot",
    title: "Meva va sabzavotlar uchun sovutgich",
    description:
      "Mahsulotning yangiligini uzoqroq saqlash uchun mo‘ljallangan zamonaviy kamera.",
    icon: Apple,
    badge: "Universal",
    image: "https://i.ibb.co/LzsjFKLv/24.png",
  },
  {
    id: "shop",
    label: "Do‘kon uchun",
    title: "Do‘kon va savdo nuqtalari uchun",
    description:
      "Ichimliklar, sut mahsulotlari va kundalik savdo uchun qulay sovutgich kamera.",
    icon: Store,
    badge: "Top tanlov",
    image: "https://i.ibb.co/xK8Hk6TM/26.png",
  },
  {
    id: "pharmacy",
    label: "Dorixona",
    title: "Farmatsevtika mahsulotlari uchun sovutgich",
    description:
      "Ombor va yirik hajmdagi mahsulotlarni muzlatib saqlash uchun yechim.",
    icon: Snowflake,
    badge: "Maksimal hajm",
    image: "https://i.ibb.co/Mxb7XYpz/29.png",
  },
  
];

function ProductPreview({ option }) {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div className="relative rounded-[28px] bg-gradient-to-b from-emerald-50 via-white to-white p-4 shadow-[0_20px_55px_rgba(15,23,42,0.12)] ring-1 ring-emerald-100/70">
        <div className="mb-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            EcoProm muzlatgich yechimi
          </div>

          <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
            {option.badge}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-white p-3 ring-1 ring-slate-100"
          >
          <div className="relative h-[260px] overflow-hidden rounded-2xl bg-slate-50">
            <img
              src={option.image}
              alt={option.title}
              className="h-full w-full object-cover"
            />
          </div>

            <div className="mt-4 text-center">
              <div className="text-sm font-bold text-slate-900">
                {option.title}
              </div>
              <div className="mt-1 text-xs leading-5 text-slate-500">
                {option.description}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProductTabs({ selected, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {coldRoomOptions.map((item) => {
        const Icon = item.icon;
        const active = selected === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={[
              "rounded-2xl px-4 py-3 text-left transition-all duration-300",
              active
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-white/80 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  active ? "bg-white/15" : "bg-emerald-50",
                ].join(" ")}
              >
                <Icon
                  className={
                    active ? "h-5 w-5 text-white" : "h-5 w-5 text-emerald-600"
                  }
                />
              </div>

              <div>
                <div className="text-sm font-bold">{item.label}</div>
                <div
                  className={
                    active ? "text-xs text-white/80" : "text-xs text-slate-500"
                  }
                >
                  {item.badge}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function EcoPromPanelStack() {
  const [selectedId, setSelectedId] = useState("shop");

  const selected = useMemo(
    () =>
      coldRoomOptions.find((item) => item.id === selectedId) ||
      coldRoomOptions[2],
    [selectedId]
  );

  return (
    <div className="relative">
      <ProductPreview option={selected} />

      <div className="mt-4">
        <ProductTabs selected={selectedId} onChange={setSelectedId} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-4 rounded-2xl bg-white/80 p-4 ring-1 ring-slate-100"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Tanlangan tur: {selected.label}
              </div>
              <div className="mt-1 text-xs leading-5 text-slate-500">
                {selected.description}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}