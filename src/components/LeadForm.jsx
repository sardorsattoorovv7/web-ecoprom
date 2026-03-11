import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LeadForm({ compact = false }) {
  const { t } = useTranslation();

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);

      setTimeout(() => setSent(false), 3000);
    }, 1000);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={"grid gap-3 " + (compact ? "" : "card p-6")}
    >
      {/* Name + Phone */}
      <div className="grid md:grid-cols-2 gap-3">
        <input
          type="text"
          className="input"
          placeholder={t("form.name") || "Ismingiz"}
          required
        />

        <input
          type="tel"
          className="input"
          placeholder={t("form.phone") || "Telefon raqam"}
          required
        />
      </div>

      {/* Product select */}
      <select className="select">
        <option>{ "Mahsulot turini tanlang"}</option>
        <option>PIR sendvich panel</option>
        <option>Sovutgich kamera</option>
        <option>Muzlatgich ombor</option>
        <option>Sanoat eshiklari</option>
      </select>

      {/* Message */}
      <textarea
        className="textarea"
        placeholder={t("form.message") || "Qo‘shimcha ma'lumot"}
        rows={compact ? 3 : 4}
      />

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          className="btn-secondary flex items-center gap-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Yuborilmoqda..." : t("cta.send") || "Yuborish"}
        </button>

        {sent && (
          <span className="text-sm text-emerald-700">
            {t("form.success") || "Xabar yuborildi"}
          </span>
        )}
      </div>

      {/* Privacy text */}
      <p className="text-xs text-slate-400">
        Sizning ma'lumotlaringiz maxfiy saqlanadi.
      </p>
    </form>
  );
}