const partners = [
  { name: "EcoProm Group", type: "Asosiy hamkor" },
  { name: "Artel", type: "Sanoat hamkori" },
  { name: "AKFA", type: "Strategik hamkor" },
  { name: "UzAuto Motors", type: "Yirik mijoz" },
  { name: "Enter Engineering", type: "Qurilish hamkori" },
  { name: "Texnopark", type: "Ishlab chiqarish" },
  { name: "Nestlé Uzbekistan", type: "Oziq-ovqat sanoati" },
  { name: "Coca-Cola Uzbekistan", type: "Sovutish yechimlari" },
  { name: "Knauf", type: "Qurilish materiali" },
  { name: "Orient Group", type: "Korporativ hamkor" },
  { name: "Korona Foods", type: "Oziq-ovqat ishlab chiqarish" },
  { name: "Agro World", type: "Agro sanoat" },
];

export default function PartnerMarquee() {
  const loop = [...partners, ...partners];

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-pad">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Hamkorlar
          </div>

          <h2 className="display-3 gradient-text-dark">
            Ishonch bildirgan
            <span className="block gradient-text-primary">
              hamkor kompaniyalar
            </span>
          </h2>

          <p className="text-body mx-auto mt-5 max-w-2xl">
            EcoProm mahsulotlari va texnologiyalariga ishonch bildirgan
            yirik korxonalar bilan uzoq muddatli hamkorlikni yo‘lga qo‘yganmiz.
          </p>

        </div>


        {/* Marquee Container */}
        <div className="relative overflow-hidden rounded-[32px] bg-white p-8">

          <div className="marquee-fade marquee-fade-left z-20" />
          <div className="marquee-fade marquee-fade-right z-20" />

          <div className="marquee-container py-4">

            <div className="marquee-track flex items-center">

              {loop.map((partner, idx) => (

                <div key={idx} className="partner-item px-3">

                  {/* CARD */}
                  <div className="group relative min-w-[280px] rounded-[28px] bg-white p-6 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

                    <div className="relative z-10 flex items-start gap-4">

                      {/* Logo */}
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                        <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-emerald-500"/>

                        <span className="text-lg font-bold text-emerald-700">
                          {getInitials(partner.name)}
                        </span>

                      </div>


                      {/* Text */}
                      <div className="flex-1">

                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition">
                          {partner.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {partner.type}
                        </p>

                        <div className="mt-4 flex items-center justify-between text-sm">

                          <span className="flex items-center gap-2 text-emerald-600 font-medium">
                            <span className="h-2 w-2 rounded-full bg-emerald-500"/>
                            Ishonchli hamkor
                          </span>

                          <span className="text-xs uppercase text-slate-400">
                            EcoProm
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}