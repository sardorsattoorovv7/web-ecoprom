import Groq from "groq-sdk";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { messages } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 600,
      messages: [
        {
          role: "system",
          content: `
Sen EcoProm kompaniyasining virtual savdo yordamchisisan.

EcoProm mahsulotlari:
- PIR sendvich panellar
- Sovutgich kameralar
- Sanoat eshiklari
- Metall konstruksiyalar

Qoidalar:
- Javoblarni o'zbek tilida ber
- Qisqa va aniq bo'lsin
- Narx so'ralsa loyiha asosida hisoblanishini ayt
- Mijozni telefon orqali bog'lanishga unda

Telefon:
+998 78 555 86 18
`
        },
        ...messages
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Kechirasiz javob olinmadi.";

    res.status(200).json({ reply });

  } catch (error) {

    res.status(500).json({
      error: "AI xatolik",
      detail: error.message
    });

  }
}