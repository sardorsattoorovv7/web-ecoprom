import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY topilmadi. .env faylga yozing.");
  process.exit(1);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const PRODUCTS = {
  pir: {
    name: "PIR Sendvich panellar",
    fullName: "Poliizotsianurat (PIR) sendvich panellar",
    description: "Yuqori samarali issiqlik izolyatsiyasi materiali",
    composition: "PIR panellar poliizotsianurat ko'pik (asos), ikki tomonlama metall qoplama (po'lat yoki alyuminiy), korroziyaga qarshi qoplama, dekorativ qatlam",
    features: [
      "Eng yuqori issiqlik izolyatsiyasi (λ = 0.019-0.022 Vt/m·K)",
      "Yong'inga chidamlilik - G2/G3 sinf",
      "Namlikka chidamlilik - 100%",
      "Ekologik toza, sog'liq uchun xavfsiz",
      "Uzoq xizmat muddati - 50+ yil"
    ],
    specifications: {
      thickness: "40-200 mm",
      length: "2000-16000 mm",
      width: "1000 mm / 1190 mm",
      density: "40-45 kg/m³",
      thermalConductivity: "0.019-0.022 Vt/(m·K)",
      fireResistance: "EI30-EI180",
      soundInsulation: "30-35 dB"
    },
    applications: [
      {
        name: "Sanoat qurilishi",
        examples: ["Zavodlar", "Sexlar", "Omborlar", "Logistika markazlari"]
      },
      {
        name: "Sovutish tizimlari",
        examples: ["Sovutgich kameralar", "Muzlatgichlar", "Tez muzlatish kameralari"]
      },
      {
        name: "Qishloq xo'jaligi",
        examples: ["Parrandachilik fermalari", "Chorvachilik binolari", "Issiqxonalar"]
      },
      {
        name: "Savdo va ofis",
        examples: ["Savdo markazlari", "Ofis binolari", "Ko'rgazma zallari"]
      }
    ],
    advantages: [
      "Energiyani 40% gacha tejaydi",
      "Tez montaj qilinadi",
      "Yengil vazn",
      "Estetik ko'rinish",
      "Korroziyaga chidamli",
      "Har xil ranglarda mavjud (RAL)"
    ],
    price_range: "Narxi qalinlik va rangga qarab o'zgaradi. Aniq narx uchun murojaat qiling."
  },

  pur: {
    name: "PUR Sendvich panellar",
    fullName: "Poliuretan (PUR) sendvich panellar",
    description: "Ko'p funksiyali issiqlik izolyatsiyasi materiali",
    composition: "PUR panellar qattiq poliuretan ko'pik (asos), ikki tomonlama metall qoplama, himoya qatlami, dekorativ qoplama",
    features: [
      "Yaxshi issiqlik izolyatsiyasi (λ = 0.022-0.026 Vt/m·K)",
      "Elastik va mustahkam",
      "Namlikka chidamli",
      "Mexanik kuchlanishlarga bardoshli"
    ],
    specifications: {
      thickness: "40-200 mm",
      length: "2000-16000 mm",
      width: "1000 mm / 1190 mm",
      density: "38-42 kg/m³",
      thermalConductivity: "0.022-0.026 Vt/(m·K)",
      fireResistance: "EI15-EI90"
    },
    applications: [
      {
        name: "Turar-joy qurilishi",
        examples: ["Uylar", "Kottejlar", "Ko'p qavatli binolar"]
      },
      {
        name: "Omborlar",
        examples: ["Quruq omborlar", "Tarqatish markazlari"]
      },
      {
        name: "Sport inshootlari",
        examples: ["Sport zallari", "Basseynlar", "Fitnes markazlari"]
      }
    ],
    advantages: [
      "Arzon narx",
      "Yaxshi izolyatsiya",
      "Tez montaj",
      "Ekologik toza"
    ],
    price_range: "Narxi qalinlik va rangga qarab o'zgaradi. Aniq narx uchun murojaat qiling."
  },

  mw: {
    name: "Mineral Wool (MW) Sendvich panellar",
    fullName: "Mineral junli sendvich panellar",
    description: "Yong'inga chidamli issiqlik izolyatsiyasi materiali",
    composition: "MW panellar mineral jun (asos), ikki tomonlama metall qoplama, gidroizolyatsiya qatlami, himoya qoplamasi",
    features: [
      "Yuqori yong'inga chidamlilik (EI240 gacha)",
      "Yaxshi ovoz izolyatsiyasi",
      "Nafas oluvchi material",
      "Eko-friendly"
    ],
    specifications: {
      thickness: "50-200 mm",
      length: "2000-16000 mm",
      width: "1000 mm / 1190 mm",
      density: "100-150 kg/m³",
      thermalConductivity: "0.038-0.042 Vt/(m·K)",
      fireResistance: "EI90-EI240",
      soundInsulation: "45-50 dB"
    },
    applications: [
      {
        name: "Yong'in xavfli ob'ektlar",
        examples: ["Neft-gaz sanoati", "Kimyo zavodlari", "Yoqilg'i omborlari"]
      },
      {
        name: "Transport",
        examples: ["Temir yo'l vokzallari", "Aeroportlar", "Avtovokzallar"]
      },
      {
        name: "Jamoat binolari",
        examples: ["Kasalxonalar", "Maktablar", "Bolalar bog'chalari"]
      }
    ],
    advantages: [
      "Eng yuqori yong'in xavfsizligi",
      "Yaxshi ovoz izolyatsiyasi",
      "Uzoq xizmat muddati",
      "Harorat o'zgarishiga chidamli"
    ],
    price_range: "Narxi qalinlik va rangga qarab o'zgaradi. Aniq narx uchun murojaat qiling."
  },

  coldRooms: {
    name: "Sovutgich Kameralar",
    fullName: "Sovutgich va muzlatgich kameralari",
    description: "Har xil mahsulotlarni saqlash uchun sovutish tizimlari",
    composition: "PIR/PUR panellar, sovutish agregati, avtomatik boshqaruv tizimi, germetik eshiklar, yoritish tizimi",
    features: [
      "Harorat rejimi: -25°C dan +8°C gacha",
      "Avtomatik harorat nazorati",
      "Namlik boshqaruvi",
      "Energiya tejamkor"
    ],
    specifications: {
      temperature: "-25°C dan +8°C gacha",
      volume: "5-1000 m³",
      panelThickness: "80-200 mm",
      humidity: "40-85%",
      control: "Avtomatik / GSM"
    },
    applications: [
      {
        name: "Oziq-ovqat mahsulotlari",
        examples: ["Go'sht va baliq", "Sut mahsulotlari", "Meva-sabzavotlar", "Yarim tayyor mahsulotlar"]
      },
      {
        name: "Farmatsevtika",
        examples: ["Dorilar", "Vaksinalar", "Biologik materiallar"]
      },
      {
        name: "Gullar va o'simliklar",
        examples: ["Kesilgan gullar", "Ko'chatlar", "Ekzotik o'simliklar"]
      },
      {
        name: "Sanoat",
        examples: ["Kimyoviy moddalar", "Laboratoriya namunalari"]
      }
    ],
    advantages: [
      "Mahsulotlarni uzoq vaqt saqlash",
      "Haroratni aniq ushlab turish",
      "Energiya tejamkor",
      "GSM orqali monitoring",
      "Zaxira quvvat manbai"
    ],
    price_range: "Narxi hajm va uskunalarga qarab o'zgaradi. Loyiha asosida hisoblanadi."
  },

  industrialDoors: {
    name: "Sanoat Eshiklari",
    fullName: "Germetik va sanoat eshiklari",
    description: "Har xil sanoat ob'ektlari uchun maxsus eshiklar",
    composition: "Metall rama, panel to'ldirgich (PIR/PUR), germetik muhr, avtomatik yuritma, boshqaruv tizimi",
    features: [
      "Germetik muhr",
      "Tez ochilish (1.5 m/s gacha)",
      "Haroratga chidamli (-40°C dan +50°C)",
      "Avtomatik boshqaruv"
    ],
    specifications: {
      speed: "1.5 m/s gacha",
      temperature: "-40°C dan +50°C gacha",
      size: "Maxsus buyurtma",
      insulation: "0.5-1.0 m²K/Vt",
      control: "Avtomatik / Masofadan"
    },
    applications: [
      {
        name: "Sovutgich kameralar",
        examples: ["Germetik eshiklar", "Muzlatgich eshiklari"]
      },
      {
        name: "Sanoat ob'ektlari",
        examples: ["Zavodlar", "Sexlar", "Omborlar"]
      },
      {
        name: "Logistika",
        examples: ["Yuk rampasi eshiklari", "Terminallar"]
      }
    ],
    advantages: [
      "Sovuq o'tkazmaydi",
      "Tez ochiladi",
      "Shovqinsiz ishlaydi",
      "Uzoq xizmat muddati",
      "Masofadan boshqarish"
    ],
    price_range: "Narxi o'lcham va turiga qarab o'zgaradi. Aniq narx uchun murojaat qiling."
  },

  metalStructures: {
    name: "Metall Konstruksiyalar",
    fullName: "Sanoat metall konstruksiyalari",
    description: "Har xil sanoat binolari va inshootlari uchun metall konstruksiyalar",
    composition: "Profil trubalar, ikki-tavr, shveller, burchaklik, murvatli ulanishlar, payvand choklari, korroziyaga qarshi qoplama",
    features: [
      "Tez qurilish",
      "Mustahkam va ishonchli",
      "Har qanday iqlimga mos",
      "Modul tizim"
    ],
    specifications: {
      area: "100-10000 m²",
      height: "6-15 m",
      load: "5 t/m² gacha",
      constructionTime: "30-90 kun",
      warranty: "13 yil"
    },
    applications: [
      {
        name: "Sanoat ob'ektlari",
        examples: ["Zavodlar", "Sexlar", "Ishlab chiqarish korxonalari"]
      },
      {
        name: "Omborlar",
        examples: ["Logistika markazlari", "Tarqatish markazlari", "Terminallar"]
      },
      {
        name: "Qishloq xo'jaligi",
        examples: ["Parrandachilik fermalari", "Chorvachilik komplekslari", "Issiqxonalar"]
      },
      {
        name: "Sport va savdo",
        examples: ["Sport zallari", "Savdo markazlari", "Ko'rgazma pavilyonlari"]
      }
    ],
    advantages: [
      "Tez quriladi",
      "Iqtisodiy samarali",
      "Kengaytirish imkoniyati",
      "Energiya tejamkor",
      "Ekologik toza"
    ],
    price_range: "Narxi maydon va murakkablikka qarab o'zgaradi. Loyiha asosida hisoblanadi."
  }
};

const COMPANY_CONTEXT = `
Kompaniya: EcoProm
Ma'lumot: 13 yillik tajriba, 500+ muvaffaqiyatli loyiha

ASOSIY MAHSULOTLAR:

1. PIR SENDVICH PANELLAR
   Ta'rifi: ${PRODUCTS.pir.description}
   Tarkibi: ${PRODUCTS.pir.composition}
   Texnik xususiyatlari:
   - Qalinligi: ${PRODUCTS.pir.specifications.thickness}
   - Issiqlik o'tkazuvchanlik: ${PRODUCTS.pir.specifications.thermalConductivity}
   - Yong'inga chidamlilik: ${PRODUCTS.pir.specifications.fireResistance}
   - Ovoz izolyatsiyasi: ${PRODUCTS.pir.specifications.soundInsulation}
   - Zichlik: ${PRODUCTS.pir.specifications.density}
   Qo'llanish sohalari:
   ${PRODUCTS.pir.applications.map(app => `   * ${app.name}: ${app.examples.join(", ")}`).join("\n")}
   Afzalliklari:
   ${PRODUCTS.pir.advantages.map(adv => `   * ${adv}`).join("\n")}

2. PUR SENDVICH PANELLAR
   Ta'rifi: ${PRODUCTS.pur.description}
   Tarkibi: ${PRODUCTS.pur.composition}
   Texnik xususiyatlari:
   - Qalinligi: ${PRODUCTS.pur.specifications.thickness}
   - Issiqlik o'tkazuvchanlik: ${PRODUCTS.pur.specifications.thermalConductivity}
   - Yong'inga chidamlilik: ${PRODUCTS.pur.specifications.fireResistance}
   - Zichlik: ${PRODUCTS.pur.specifications.density}
   Qo'llanish sohalari:
   ${PRODUCTS.pur.applications.map(app => `   * ${app.name}: ${app.examples.join(", ")}`).join("\n")}
   Afzalliklari:
   ${PRODUCTS.pur.advantages.map(adv => `   * ${adv}`).join("\n")}
   PIR va PUR farqi: PIR panel PIR ga qaraganda yuqori issiqlik izolyatsiyasiga ega (0.019-0.022 Vt/m·K), yong'inga chidamliligi yuqori (EI30-EI180), narxi qimmatroq. PUR panel esa arzonroq, issiqlik izolyatsiyasi 0.022-0.026 Vt/m·K, yong'inga chidamliligi EI15-EI90.

3. MINERAL WOOL (MW) PANELLAR
   Ta'rifi: ${PRODUCTS.mw.description}
   Tarkibi: ${PRODUCTS.mw.composition}
   Texnik xususiyatlari:
   - Qalinligi: ${PRODUCTS.mw.specifications.thickness}
   - Issiqlik o'tkazuvchanlik: ${PRODUCTS.mw.specifications.thermalConductivity}
   - Yong'inga chidamlilik: ${PRODUCTS.mw.specifications.fireResistance}
   - Ovoz izolyatsiyasi: ${PRODUCTS.mw.specifications.soundInsulation}
   - Zichlik: ${PRODUCTS.mw.specifications.density}
   Qo'llanish sohalari:
   ${PRODUCTS.mw.applications.map(app => `   * ${app.name}: ${app.examples.join(", ")}`).join("\n")}
   Afzalliklari:
   ${PRODUCTS.mw.advantages.map(adv => `   * ${adv}`).join("\n")}

4. SOVUTGICH KAMERALAR
   Ta'rifi: ${PRODUCTS.coldRooms.description}
   Tarkibi: ${PRODUCTS.coldRooms.composition}
   Texnik xususiyatlari:
   - Harorat rejimi: ${PRODUCTS.coldRooms.specifications.temperature}
   - Hajm: ${PRODUCTS.coldRooms.specifications.volume}
   - Panel qalinligi: ${PRODUCTS.coldRooms.specifications.panelThickness}
   - Namlik nazorati: ${PRODUCTS.coldRooms.specifications.humidity}
   Qo'llanish sohalari:
   ${PRODUCTS.coldRooms.applications.map(app => `   * ${app.name}: ${app.examples.join(", ")}`).join("\n")}
   Afzalliklari:
   ${PRODUCTS.coldRooms.advantages.map(adv => `   * ${adv}`).join("\n")}

5. SANOAT ESHIKLARI
   Ta'rifi: ${PRODUCTS.industrialDoors.description}
   Tarkibi: ${PRODUCTS.industrialDoors.composition}
   Texnik xususiyatlari:
   - Ochilish tezligi: ${PRODUCTS.industrialDoors.specifications.speed}
   - Harorat diapazoni: ${PRODUCTS.industrialDoors.specifications.temperature}
   - Izolyatsiya: ${PRODUCTS.industrialDoors.specifications.insulation}
   Qo'llanish sohalari:
   ${PRODUCTS.industrialDoors.applications.map(app => `   * ${app.name}: ${app.examples.join(", ")}`).join("\n")}
   Afzalliklari:
   ${PRODUCTS.industrialDoors.advantages.map(adv => `   * ${adv}`).join("\n")}

6. METALL KONSTRUKSIYALAR
   Ta'rifi: ${PRODUCTS.metalStructures.description}
   Tarkibi: ${PRODUCTS.metalStructures.composition}
   Texnik xususiyatlari:
   - Maydon: ${PRODUCTS.metalStructures.specifications.area}
   - Balandlik: ${PRODUCTS.metalStructures.specifications.height}
   - Yuk ko'tarish: ${PRODUCTS.metalStructures.specifications.load}
   - Qurilish muddati: ${PRODUCTS.metalStructures.specifications.constructionTime}
   Qo'llanish sohalari:
   ${PRODUCTS.metalStructures.applications.map(app => `   * ${app.name}: ${app.examples.join(", ")}`).join("\n")}
   Afzalliklari:
   ${PRODUCTS.metalStructures.advantages.map(adv => `   * ${adv}`).join("\n")}

QO'SHIMCHA XIZMATLAR:
- Bepul loyihalash
- Professional montaj
- Kafolatli servis
- Bepul namunalar
- Texnik kataloglar

KONTAKT:
- Telefon: +998 78 555 86 18
- Manzil: Toshkent va Samarqand
`;

const SYSTEM_PROMPT = `
Siz EcoProm kompaniyasining savdo yordamchisisiz.

Qoidalar:
1. Foydalanuvchi qaysi tilda yozsa, o'sha tilda javob bering (o'zbek, rus, ingliz)
2. Faqat aniq ma'lumot bering, ortiqcha gapirmang
3. Mahsulot haqida so'ralganda: tarkibi, texnik xususiyatlari, qayerlarda qo'llanishi, afzalliklarini aytib bering
4. PUR panel haqida so'ralsa: tarkibi qattiq poliuretan ko'pik, ikki tomonlama metall qoplama, issiqlik o'tkazuvchanligi 0.022-0.026 Vt/m·K, qalinligi 40-200 mm, yong'inga chidamliligi EI15-EI90, qo'llanish sohalari turar-joylar, omborlar, sport inshootlari ekanligini aytib bering
5. PIR va PUR farqi so'ralsa: PIR yuqori issiqlik izolyatsiyasi (0.019-0.022), yong'inga chidamliligi yuqori (EI30-EI180), narxi qimmatroq; PUR arzonroq, issiqlik izolyatsiyasi 0.022-0.026, yong'inga chidamliligi EI15-EI90 ekanligini ayting
6. Narx so'ralsa: aniq narx yo'qligini, loyiha asosida hisoblanishini ayting va telefon raqamini bering
7. Telefon raqamini berish kerak bo'lganda: +998 78 555 86 18 raqamiga murojaat qilishni taklif qiling

Kontekst ma'lumotlar:
${COMPANY_CONTEXT}
`;

app.get("/api/health", (_req, res) => {
  res.json({ 
    ok: true, 
    status: "EcoProm AI Assistant is running",
    products: Object.keys(PRODUCTS).length
  });
});

app.get("/api/products", (_req, res) => {
  const productsList = Object.entries(PRODUCTS).map(([key, product]) => ({
    id: key,
    name: product.name,
    description: product.description,
    applications: product.applications
  }));
  res.json(productsList);
});

app.get("/api/products/:id", (req, res) => {
  const product = PRODUCTS[req.params.id];
  if (!product) {
    return res.status(404).json({ error: "Mahsulot topilmadi" });
  }
  res.json(product);
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "messages array bo'lishi kerak",
      });
    }

    const safeMessages = messages
      .filter((m) => m && typeof m.content === "string" && typeof m.role === "string")
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content.slice(0, 4000),
      }))
      .slice(-10);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 600,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...safeMessages,
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Kechirasiz, hozir javob tayyor bolmadi. Qayta urinib koring.";

    return res.json({ 
      reply,
      model: "llama-3.3-70b-versatile"
    });
  } catch (error) {
    console.error("Groq chat error:", error);

    return res.status(500).json({
      error: "Server xatoligi yuz berdi",
      detail: error?.message || "Unknown error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`EcoProm AI Server running on http://localhost:${PORT}`);
  console.log(`Products: ${Object.keys(PRODUCTS).length}`);
  console.log(`Model: llama-3.3-70b-versatile`);
});