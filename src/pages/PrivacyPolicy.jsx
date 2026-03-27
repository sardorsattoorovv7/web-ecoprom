// pages/PrivacyPolicy.jsx
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 p-6 md:p-12"
    >
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 border border-slate-200">
        <h1 className="text-3xl font-bold mb-6 text-emerald-700">
          Maxfiylik siyosati
        </h1>

        <p className="mb-4 text-slate-700">
          Oxirgi yangilangan sana: 27.03.2026
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          1. Umumiy qoidalar
        </h2>
        <p className="mb-4 text-slate-700">
          Ushbu Maxfiylik siyosati (keyingi o‘rinlarda – «Siyosat») EcoProm zavodi saytida (keyingi o‘rinlarda – «Sayt») foydalanuvchilarning (keyingi o‘rinlarda – «Foydalanuvchi») shaxsiy ma’lumotlarini yig‘ish, ishlov berish, saqlash va himoya qilish tartibini belgilaydi. Biz sizning maxfiyligingizni hurmat qilamiz va O‘zbekiston Respublikasi qonunchiligi hamda xalqaro standartlar (GDPR, CCPA) talablariga muvofiq himoya qilish majburiyatini olamiz.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          2. Qaysi ma’lumotlarni yig‘amiz?
        </h2>
        <ul className="list-disc list-inside mb-4 text-slate-700">
          <li>Ism, familiya, elektron pochta, telefon raqami</li>
          <li>IP-manzil, brauzer va qurilma ma’lumotlari</li>
          <li>Google Analytics, Yandex.Metrica kabi tahlil ma’lumotlari</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          3. Ma’lumotlar qanday qo‘llanadi?
        </h2>
        <ul className="list-disc list-inside mb-4 text-slate-700">
          <li>Sayt faoliyatini ta’minlash</li>
          <li>Sayt sifatini yaxshilash</li>
          <li>Foydalanuvchilar bilan aloqa</li>
          <li>Marketing va reklama (foydalanuvchi roziligi bilan)</li>
          <li>Xavfsizlikni ta’minlash</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          4. Cookies va o‘xshash texnologiyalar
        </h2>
        <p className="mb-4 text-slate-700">
          Biz cookies-dan quyidagi maqsadlarda foydalanamiz:
        </p>
        <ul className="list-disc list-inside mb-4 text-slate-700">
          <li>Saytning to‘g‘ri ishlashini ta’minlash</li>
          <li>Sizning tanlovlaringizni yodda saqlash</li>
          <li>Sayt tashriflari va reklama samaradorligini tahlil qilish</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          5. Ma’lumotlarni uchinchi tomonlarga berish
        </h2>
        <ul className="list-disc list-inside mb-4 text-slate-700">
          <li>Qonunchilik talab qilganda</li>
          <li>Google, Yandex, to‘lov tizimlari kabi tasdiqlangan servislarga</li>
          <li>Biznesni sotish yoki qayta tashkil etishda (foydalanuvchi roziligi bilan)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          6. Ma’lumotlarni himoya qilish
        </h2>
        <ul className="list-disc list-inside mb-4 text-slate-700">
          <li>Ma’lumotlarni shifrlash</li>
          <li>Maxsus himoyalangan serverlardan foydalanish</li>
          <li>Doimiy xavfsizlik monitoringi</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          7. Foydalanuvchining huquqlari
        </h2>
        <ul className="list-disc list-inside mb-4 text-slate-700">
          <li>Ma’lumotlarni ko‘rish va olish</li>
          <li>Ma’lumotlarni o‘zgartirish yoki o‘chirish</li>
          <li>Ma’lumotlardan foydalanishni cheklash</li>
          <li>Rozilikni bekor qilish</li>
          <li>Shikoyat berish</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          8. Ma’lumotlarni saqlash muddati
        </h2>
        <p className="mb-4 text-slate-700">
          Ma’lumotlar kerakli maqsadlar uchun zarur bo‘lgan muddat davomida saqlanadi. Foydalanuvchi talab qilganda, ma’lumotlar o‘chiriladi.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          9. Siyosatga o‘zgartirishlar
        </h2>
        <p className="mb-4 text-slate-700">
          Biz ushbu Siyosatga o‘zgartirishlar kiritishimiz mumkin. Barcha yangilanishlar shu sahifada e’lon qilinadi.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-slate-800">
          10. Aloqa ma’lumotlari
        </h2>
        <p className="text-slate-700">
           Email: info@ecoprom.uz <br />
           Manzil: O‘zbekiston, Samarqand viloyati, Samarqand Tuman, Chumchuqli MFY
        </p>
      </div>
    </motion.div>
  );
}