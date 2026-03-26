import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LeadForm({ compact = false, onClose }) {
  const { t } = useTranslation();

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Formadagi ma'lumotlarni yig'ish
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const product = formData.get("product");
    const message = formData.get("message");

    const botToken = "8559719741:AAGa5BnxXt2rxjC-gKFnzboBiJQgPUY2GzU";
    const chatId = "@testttt1221"; // FAQAT BITTA @ BELGISI

    const text = `🚀 <b>Yangi buyurtma!</b>\n\n` +
                 `👤 <b>Ism:</b> ${name}\n` +
                 `📞 <b>Tel:</b> ${phone}\n` +
                 `📦 <b>Mahsulot:</b> ${product}\n` +
                 `📝 <b>Xabar:</b> ${message || "Yo'q"}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML"
        }),
      });

      if (response.ok) {
        setSent(true);
        // 3 soniyadan keyin xabarni o'chirish va modalni yopish
        setTimeout(() => {
          setSent(false);
          if (onClose) onClose(); 
        }, 2500);
      } else {
        alert("Xatolik yuz berdi. Bot kanalda admin ekanligini tekshiring.");
      }
    } catch (error) {
      alert("Internet aloqasini tekshiring!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={"grid gap-3 " + (compact ? "" : "card p-6")}
    >
      <div className="grid md:grid-cols-2 gap-3">
        <input
          name="name" // NAME ATRIBUTI SHART
          type="text"
          className="input border p-2 rounded-lg"
          placeholder={t("form.name") || "Ismingiz"}
          required
        />

        <input
          name="phone" // NAME ATRIBUTI SHART
          type="tel"
          className="input border p-2 rounded-lg"
          placeholder={t("form.phone") || "Telefon raqam"}
          required
        />
      </div>

      <select name="product" className="select border p-2 rounded-lg">
        <option value="Tanlanmagan">Mahsulot turini tanlang</option>
        <option value="PIR sendvich panel">PIR sendvich panel</option>
        <option value="Sovutgich kamera">Sovutgich kamera</option>
        <option value="Muzlatgich ombor">Muzlatgich ombor</option>
        <option value="Sanoat eshiklari">Sanoat eshiklari</option>
      </select>

      <textarea
        name="message" // NAME ATRIBUTI SHART
        className="textarea border p-2 rounded-lg"
        placeholder={t("form.message") || "Qo‘shimcha ma'lumot"}
        rows={compact ? 3 : 4}
      />

      <div className="flex items-center gap-3">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-all"
          type="submit"
          disabled={loading}
        >
          {loading ? "Yuborilmoqda..." : t("cta.send") || "Yuborish"}
        </button>

        {sent && (
          <span className="text-sm font-medium text-emerald-600 animate-bounce">
             {t("form.success") || "Muvaffaqiyatli yuborildi!"}
          </span>
        )}
      </div>

      <p className="text-[10px] text-slate-400">
        Sizning ma'lumotlaringiz maxfiy saqlanadi.
      </p>
    </form>
  );
}