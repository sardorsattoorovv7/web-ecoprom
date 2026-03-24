import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  MapPin, Phone, Mail, Clock, Send, 
  Facebook, Instagram, Youtube, Linkedin,
  User, MessageSquare, AlertCircle, CheckCircle,
  ArrowRight, Globe
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });
  const [loading, setLoading] = useState(false);

  // Telegram Bot Configuration
  // 1. BotFather dan bot yarating va token oling
  // 2. Botni kanalga admin qiling
  // 3. Kanal ID ni oling (masalan: @your_channel yoki -1001234567890)
  const BOT_TOKEN = "8559719741:AAGa5BnxXt2rxjC-gKFnzboBiJQgPUY2GzU"; // BotFather dan olingan token
  const CHANNEL_ID = "@testttt1221"; // Kanal username yoki ID

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendToTelegram = async (formData) => {
    // Format message for Telegram
    const message = `
🏢 *YANGI MUROJAAT* 🏢
━━━━━━━━━━━━━━━━━━━━━

👤 *Ism:* ${formData.name}
📧 *Email:* ${formData.email}
📞 *Telefon:* ${formData.phone || "Ko'rsatilmagan"}
💬 *Xabar:* ${formData.message}

━━━━━━━━━━━━━━━━━━━━━
📅 *Vaqt:* ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}
🌐 *Manba:* Contact page
    `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHANNEL_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      const data = await response.json();
      
      if (!data.ok) {
        throw new Error(data.description || "Xatolik yuz berdi");
      }
      
      return true;
    } catch (error) {
      console.error("Telegramga yuborishda xatolik:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Send to Telegram
    const success = await sendToTelegram(formData);
    
    if (success) {
      setFormStatus({
        submitted: true,
        success: true,
        message: lang === "ru" 
          ? "Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время." 
          : "Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz."
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: "" });
      }, 5000);
    } else {
      setFormStatus({
        submitted: true,
        success: false,
        message: lang === "ru" 
          ? "Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону." 
          : "Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring yoki biz bilan telefon orqali bog'lang."
      });
      
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: "" });
      }, 5000);
    }
    
    setLoading(false);
  };

  // Contact Information with correct numbers
  const contactInfo = [
    {
      icon: MapPin,
      title: lang === "ru" ? "Адрес" : "Manzil",
      details: [
        "Samarqand viloyati, Samarqand tumani",
        "Chumchuqli MFY, O'zbekiston"
      ],
      link: "https://maps.google.com/?q=Samarqand+Chumchuqli",
      color: "text-emerald-600"
    },
    {
      icon: Phone,
      title: lang === "ru" ? "Телефон" : "Telefon",
      details: ["+998 (78) 555-86-16"],
      link: "tel:+998785558616",
      color: "text-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@ecoprom.uz"],
      link: "mailto:info@ecoprom.uz",
      color: "text-red-600"
    },
    {
      icon: Clock,
      title: lang === "ru" ? "Режим работы" : "Ish vaqti",
      details: [
        lang === "ru" ? "Пн-Пт: 08:00 - 18:00" : "Du-Shan: 08:00 - 18:00",
        lang === "ru" ? "Вс: Выходной" : "Yak: Dam olish"
      ],
      color: "text-purple-600"
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/188Fga4yAs/", label: "Facebook", color: "hover:bg-[#1877f2]" },
    { icon: Instagram, href: "https://www.instagram.com/ecoprom_uz", label: "Instagram", color: "hover:bg-gradient-to-r from-[#f09433] to-[#bc1888]" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-[#ff0000]" },
    { icon: Send, href: "https://t.me/ecopromgroup", label: "Telegram", color: "hover:text-sky-500" },
    

  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/80 pointer-events-none" />

      <div className="relative z-10 container-pad py-10 md:py-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-medium mb-4">
            {lang === "ru" ? "Свяжитесь с нами" : "Biz bilan bog'laning"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {lang === "ru" ? "Контакты" : "Kontaktlar"}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {lang === "ru" 
              ? "Оставьте заявку или свяжитесь с нами удобным для вас способом"
              : "So'rov qoldiring yoki biz bilan qulay usulda bog'laning"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {lang === "ru" ? "Отправить сообщение" : "Xabar yuborish"}
              </h2>
              
              {formStatus.submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                    formStatus.success 
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800" 
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {formStatus.success ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm">{formStatus.message}</p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {lang === "ru" ? "Ваше имя" : "Ismingiz"} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder={lang === "ru" ? "Иван Иванов" : "Ismingizni kiriting"}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {lang === "ru" ? "Телефон" : "Telefon"}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="+998 (78) 555-86-16"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {lang === "ru" ? "Сообщение" : "Xabar"} *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                      placeholder={lang === "ru" ? "Ваше сообщение..." : "Xabaringiz..."}
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>{lang === "ru" ? "Отправка..." : "Yuborilmoqda..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === "ru" ? "Отправить сообщение" : "Xabar yuborish"}</span>
                      <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl bg-${info.color.split('-')[1]}-50`}>
                          <Icon className={`h-6 w-6 ${info.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-2">
                            {info.title}
                          </h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-slate-600 mb-1">
                              {detail}
                            </p>
                          ))}
                          {info.link && (
                            <a
                              href={info.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-emerald-600 hover:text-emerald-700 mt-2 inline-flex items-center gap-1"
                            >
                              {lang === "ru" ? "Подробнее" : "Batafsil"}
                              <ArrowRight className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-600" />
                  {lang === "ru" ? "Мы на карте" : "Biz xaritada"}
                </h3>
                <div className="rounded-xl overflow-hidden h-64">
                  <iframe
                    title="Google Maps - Samarqand"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1464.2852444275106!2d67.03178332354027!3d39.636242143498464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d2136f7295ebd%3A0x32d2e979277cef32!2sEcoProm%20-%20production%20of%20sandwich%20panels%20and%20refrigeration%20chambers!5e1!3m2!1suz!2sus!4v1774357118606!5m2!1suz!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5">
                <h3 className="font-semibold text-slate-900 mb-4">
                  {lang === "ru" ? "Социальные сети" : "Ijtimoiy tarmoqlar"}
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className={`w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 ${social.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                {lang === "ru" ? "Часто задаваемые вопросы" : "Ko'p so'raladigan savollar"}
              </h2>
              <p className="text-slate-600">
                {lang === "ru" 
                  ? "Не нашли ответ? Свяжитесь с нами напрямую" 
                  : "Javob topolmadingizmi? To'g'ridan-to'g'ri biz bilan bog'laning"}
              </p>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="tel:+998785558616"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                <span>+998 (78) 555-86-16</span>
              </a>
              <a
                href="https://t.me/ecopromgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <Send className="h-5 w-5" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}