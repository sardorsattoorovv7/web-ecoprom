import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8787;

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// API Key tekshiruvi
if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY topilmadi. .env faylga yozing.");
  process.exit(1);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// MAHSULOTLAR MA'LUMOTLAR BAZASI
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
      { name: "Sanoat qurilishi", examples: ["Zavodlar", "Sexlar", "Omborlar", "Logistika markazlari"] },
      { name: "Sovutish tizimlari", examples: ["Sovutgich kameralar", "Muzlatgichlar", "Tez muzlatish kameralari"] },
      { name: "Qishloq xo'jaligi", examples: ["Parrandachilik fermalari", "Chorvachilik binolari", "Issiqxonalar"] }
    ],
    advantages: ["Energiyani 40% gacha tejaydi", "Tez montaj", "Korroziyaga chidamli"],
    price_range: "Loyiha asosida hisoblanadi."
  },
  pur: {
    name: "PUR Sendvich panellar",
    fullName: "Poliuretan (PUR) sendvich panellar",
    description: "Ko'p funksiyali issiqlik izolyatsiyasi materiali",
    composition: "PUR panellar qattiq poliuretan ko'pik (asos), ikki tomonlama metall qoplama",
    features: ["Issiqlik izolyatsiyasi (λ = 0.022-0.026 Vt/m·K)", "Elastik va mustahkam", "Namlikka chidamli"],
    specifications: { thickness: "40-200 mm", thermalConductivity: "0.022-0.026 Vt/(m·K)", fireResistance: "EI15-EI90" },
    applications: [{ name: "Omborlar va turar-joylar", examples: ["Kottejlar", "Sport zallari"] }],
    advantages: ["Arzon narx", "Yaxshi izolyatsiya", "Tez montaj"],
    price_range: "Aniq narx uchun murojaat qiling."
  },
  mw: {
    name: "Mineral Wool (MW) Sendvich panellar",
    fullName: "Mineral junli sendvich panellar",
    description: "Yong'inga chidamli issiqlik izolyatsiyasi materiali",
    composition: "Mineral jun (asos), ikki tomonlama metall qoplama",
    features: ["Yuqori yong'inga chidamlilik (EI240)", "Yaxshi ovoz izolyatsiyasi"],
    specifications: { thickness: "50-200 mm", fireResistance: "EI90-EI240", soundInsulation: "45-50 dB" },
    applications: [{ name: "Xavfli ob'ektlar", examples: ["Zavodlar", "Kasalxonalar", "Aeroportlar"] }],
    advantages: ["Eng yuqori yong'in xavfsizligi", "Ovoz izolyatsiyasi"],
    price_range: "Loyiha asosida."
  },
  coldRooms: {
    name: "Sovutgich Kameralar",
    description: "Har xil mahsulotlarni saqlash uchun sovutish tizimlari",
    specifications: { temperature: "-25°C dan +8°C gacha", volume: "5-1000 m³" },
    advantages: ["Mahsulotni uzoq saqlash", "GSM monitoring", "Energiya tejamkor"],
    price_range: "Hajm va uskunaga qarab."
  },
  industrialDoors: {
    name: "Sanoat Eshiklari",
    description: "Germetik va tez ochiluvchi sanoat eshiklari",
    features: ["Tez ochilish (1.5 m/s)", "Germetik muhr", "Haroratga chidamlilik"],
    price_range: "Maxsus buyurtma asosida."
  },
  metalStructures: {
    name: "Metall Konstruksiyalar",
    description: "Sanoat binolari uchun mustahkam karkaslar",
    specifications: { constructionTime: "30-90 kun", warranty: "13 yil" },
    advantages: ["Tez qurilish", "Iqtisodiy samarali", "Mustahkam"],
    price_range: "Loyiha bo'yicha."
  }
};

// Dinamik Kontekst Tayyorlash
const getContext = () => {
  let context = "Kompaniya: EcoProm. Tajriba: 13 yil. Loyihalar: 500+.\n\n";
  Object.values(PRODUCTS).forEach(p => {
    context += `Mahsulot: ${p.name}\n- Ta'rif: ${p.description}\n`;
    if (p.specifications) context += `- Texnik: ${JSON.stringify(p.specifications)}\n`;
    if (p.advantages) context += `- Afzallik: ${p.advantages.join(", ")}\n`;
    context += "\n";
  });
  context += "Kontakt: +998 78 555 86 18. Manzil: Toshkent va Samarqand.";
  return context;
};

// Dinamik System Prompt (Tilga qarab)
const getSystemPrompt = (lang = 'uz') => {
  const langRules = {
    uz: "Faqat o'zbek tilida javob bering.",
    ru: "Отвечайте только на русском языке.",
    en: "Answer only in English."
  };

  return `
Siz EcoProm kompaniyasining savdo yordamchisisiz. 
${langRules[lang] || langRules.uz}

QOIDALAR:
1. Faqat aniq ma'lumot bering. Ma'lumot yo'q bo'lsa, mutaxassisga yo'naltiring (+998 78 555 86 18).
2. PIR va PUR farqi: PIR (0.019-0.022 Vt/mK, EI30-180) yaxshiroq va qimmatroq, PUR (0.022-0.026 Vt/mK, EI15-90) standart va arzonroq.
3. Narxlar: "Aniq narx loyiha hajmi va material qalinligiga qarab hisoblanadi" deb ayting.
4. Foydalanuvchiga doim yordam berishga tayyor bo'ling.

KONTEKST:
${getContext()}
`;
};

// API ENDPOINTS

// 1. Health Check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, status: "Active", model: "llama-3.3-70b" });
});

// 2. Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, lang } = req.body; // Frontenddan til (lang) kelyapti

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages noto'g'ri formatda" });
    }

    // Xabarlarni tozalash (Xavfsizlik uchun)
    const safeMessages = messages
      .filter((m) => m && typeof m.content === "string")
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content.slice(0, 2000), 
      }))
      .slice(-10); // Oxirgi 10 ta xabarni olish

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2, // Faktik aniqlik uchun past harorat
      max_tokens: 800,
      messages: [
        { role: "system", content: getSystemPrompt(lang) },
        ...safeMessages,
      ],
    });

    const reply = completion.choices?.[0]?.message?.content || "Kechirasiz, xatolik yuz berdi.";

    return res.json({ reply });
  } catch (error) {
    console.error("Groq Chat Error:", error);
    res.status(500).json({ error: "Server xatosi", detail: error.message });
  }
});

// 3. Mahsulotlar ro'yxatini olish
app.get("/api/products", (req, res) => {
  res.json(PRODUCTS);
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`--- EcoProm AI Backend ishga tushdi ---`);
  console.log(`Link: http://localhost:${PORT}`);
  console.log(`Port: ${PORT}`);
});