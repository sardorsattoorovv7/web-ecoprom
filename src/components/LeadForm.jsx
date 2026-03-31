import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LeadForm({ compact = false, onClose }) {
  const { t } = useTranslation();

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const product = formData.get("product");
    const message = formData.get("message");

    const botToken = "8559719741:AAGa5BnxXt2rxjC-gKFnzboBiJQgPUY2GzU";
    const chatId = "@testttt1221";

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
        setTimeout(() => {
          setSent(false);
          if (onClose) onClose(); 
        }, 2500);
        e.target.reset(); // Formani tozalash
      } else {
        alert(t("form.error_bot"));
      }
    } catch (error) {
      alert(t("form.error_net"));
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
          name="name"
          type="text"
          className="input border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder={t("form.name")}
          required
        />

        <input
          name="phone"
          type="tel"
          className="input border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder={t("form.phone")}
          required
        />
      </div>

      <select name="product" className="select border p-2 rounded-lg outline-none cursor-pointer">
        <option value="Tanlanmagan">{t("form.product_placeholder")}</option>
        <option value={t("form.products.pir")}>{t("form.products.pir")}</option>
        <option value={t("form.products.cold")}>{t("form.products.cold")}</option>
        <option value={t("form.products.warehouse")}>{t("form.products.warehouse")}</option>
        <option value={t("form.products.doors")}>{t("form.products.doors")}</option>
      </select>

      <textarea
        name="message"
        className="textarea border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder={t("form.message")}
        rows={compact ? 3 : 4}
      />

      <div className="flex items-center gap-3">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-all font-semibold"
          type="submit"
          disabled={loading}
        >
          {loading ? t("form.sending") : t("cta.send")}
        </button>

        {sent && (
          <span className="text-sm font-medium text-emerald-600 animate-bounce">
             {t("form.success")}
          </span>
        )}
      </div>

      <p className="text-[10px] text-slate-400">
        {t("form.privacy")}
      </p>
    </form>
  );
}