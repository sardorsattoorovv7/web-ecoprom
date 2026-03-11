export default function CompanyVideo() {
  return (
    <section className="container-pad mt-12">
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <div className="text-sm font-semibold text-emerald-700">
            Kompaniya haqida
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mt-2">
            Video orqali tanishing
          </h2>
          <p className="text-slate-600 mt-2">
            Ishlab chiqarish, montaj va loyiha jarayonlarini qisqa videoda ko‘ring.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs rounded-full border border-slate-200 bg-white/70">
              Ishlab chiqarish
            </span>
            <span className="px-3 py-1 text-xs rounded-full border border-slate-200 bg-white/70">
              Montaj
            </span>
            <span className="px-3 py-1 text-xs rounded-full border border-slate-200 bg-white/70">
              Servis
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="card p-3">
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/SJ7EhMYrMW0"
                title="Company video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
