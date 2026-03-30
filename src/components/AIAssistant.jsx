import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Bot,
  Sparkles,
  History,
  HelpCircle,
  Package,
  Snowflake,
  DoorOpen,
  Factory,
  AlertCircle,
  Languages,
} from "lucide-react";

// Ko'p tilli start xabarlari
const START_MESSAGES_BY_LANG = {
  uz: "Assalomu alaykum! Men EcoProm virtual yordamchisiman. Sizga PIR panel, sovutkich kamera yoki montaj bo‘yicha yordam beraman.",
  ru: "Ассаламу алейкум! Я виртуальный помощник EcoProm. Помогу вам с PIR панелями, холодильными камерами или монтажом.",
  en: "Hello! I'm EcoProm virtual assistant. I can help you with PIR panels, cold rooms, or installation services.",
};

// Ko'p tilli tezkor savollar
const QUICK_QUESTIONS_BY_LANG = {
  uz: [
    "PIR panel nima?",
    "Sovutkich kamera uchun qaysi qalinlik kerak?",
    "Montaj ham qilasizlarmi?",
    "Narxni qanday olsam bo‘ladi?",
  ],
  ru: [
    "Что такое PIR панель?",
    "Какая толщина нужна для холодильной камеры?",
    "Вы также делаете монтаж?",
    "Как узнать цену?",
  ],
  en: [
    "What is PIR panel?",
    "What thickness is needed for a cold room?",
    "Do you also provide installation?",
    "How can I get the price?",
  ],
};

// Ko'p tilli mahsulot savollari
const PRODUCT_QUESTIONS_BY_LANG = {
  uz: [
    { icon: Package, text: "PIR va PUR farqi", color: "text-emerald-600" },
    { icon: Snowflake, text: "Sovutgich kamera hajmi", color: "text-blue-600" },
    { icon: DoorOpen, text: "Eshik turlari", color: "text-amber-600" },
  ],
  ru: [
    { icon: Package, text: "Разница PIR и PUR", color: "text-emerald-600" },
    { icon: Snowflake, text: "Размер холодильной камеры", color: "text-blue-600" },
    { icon: DoorOpen, text: "Типы дверей", color: "text-amber-600" },
  ],
  en: [
    { icon: Package, text: "PIR vs PUR difference", color: "text-emerald-600" },
    { icon: Snowflake, text: "Cold room dimensions", color: "text-blue-600" },
    { icon: DoorOpen, text: "Door types", color: "text-amber-600" },
  ],
};

// Ko'p tilli FAQ
const FAQ_ITEMS_BY_LANG = {
  uz: [
    { question: "Yetkazib berish muddati?", answer: "5-7 ish kuni", category: "yetkazib" },
    { question: "Kafolat muddati?", answer: "13 yil", category: "kafolat" },
    { question: "Namuna olish mumkinmi?", answer: "Bepul namunalar", category: "namuna" },
    { question: "To'lov turlari?", answer: "Naqd, plastik, bank o'tkazmasi", category: "tolov" },
  ],
  ru: [
    { question: "Срок доставки?", answer: "5-7 рабочих дней", category: "yetkazib" },
    { question: "Гарантийный срок?", answer: "13 лет", category: "kafolat" },
    { question: "Можно получить образец?", answer: "Бесплатные образцы", category: "namuna" },
    { question: "Способы оплаты?", answer: "Наличные, карта, банковский перевод", category: "tolov" },
  ],
  en: [
    { question: "Delivery time?", answer: "5-7 business days", category: "yetkazib" },
    { question: "Warranty period?", answer: "13 years", category: "kafolat" },
    { question: "Can I get a sample?", answer: "Free samples", category: "namuna" },
    { question: "Payment methods?", answer: "Cash, card, bank transfer", category: "tolov" },
  ],
};

// Tilni aniqlash funksiyasi
const detectLanguage = (text) => {
  const cyrillicPattern = /[а-яё]/i;
  const latinPattern = /[a-zA-Z]/;
  const uzbekLatinPattern = /[qwx]/i;
  
  if (cyrillicPattern.test(text)) {
    return "ru";
  } else if (latinPattern.test(text)) {
    // Ingliz tilini aniqlash uchun qo'shimcha tekshirish
    const englishWords = ['what', 'how', 'is', 'are', 'the', 'for', 'price', 'panel', 'cold', 'room'];
    const lowerText = text.toLowerCase();
    const hasEnglishWord = englishWords.some(word => lowerText.includes(word));
    if (hasEnglishWord) {
      return "en";
    }
    return "uz";
  }
  return "uz";
};

// Tilga asoslangan start xabarini olish
const getStartMessage = (language) => {
  return START_MESSAGES_BY_LANG[language] || START_MESSAGES_BY_LANG.uz;
};

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [error, setError] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("uz");
  const [quickQuestions, setQuickQuestions] = useState(QUICK_QUESTIONS_BY_LANG.uz);
  const [productQuestions, setProductQuestions] = useState(PRODUCT_QUESTIONS_BY_LANG.uz);
  const [faqItems, setFaqItems] = useState(FAQ_ITEMS_BY_LANG.uz);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Tilni yangilash funksiyasi
  const updateLanguage = (lang) => {
    setCurrentLanguage(lang);
    setQuickQuestions(QUICK_QUESTIONS_BY_LANG[lang]);
    setProductQuestions(PRODUCT_QUESTIONS_BY_LANG[lang]);
    setFaqItems(FAQ_ITEMS_BY_LANG[lang]);
    
    // Til o'zgarganda start xabarini yangilash
    setMessages([
      {
        role: "assistant",
        content: getStartMessage(lang),
      },
    ]);
  };

  // Komponent yuklanganda default start xabar
  useEffect(() => {
    updateLanguage("uz");
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  async function sendMessage(text) {
    const value = (text ?? input).trim();
    if (!value || loading) return;

    // Foydalanuvchi xabaridan tilni aniqlash
    const detectedLang = detectLanguage(value);
    if (detectedLang !== currentLanguage) {
      updateLanguage(detectedLang);
    }

    const userMessage = { role: "user", content: value };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setShowFaq(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
          language: currentLanguage, // API'ga tilni ham yuboramiz
        }),
      });

      const data = await res.json();
      console.log("AI API response:", { status: res.status, data });

      if (!res.ok) {
        throw new Error(data?.detail || data?.error || "API xatolik");
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data.reply ||
            (currentLanguage === "uz" 
              ? "Kechirasiz, hozir javob olinmadi. Biz bilan bog‘laning: +998 78 555 86 18"
              : currentLanguage === "ru"
              ? "Извините, ответ не получен. Свяжитесь с нами: +998 78 555 86 18"
              : "Sorry, no response received. Contact us: +998 78 555 86 18"),
        },
      ]);
    } catch (err) {
      console.error("AI API xatolik:", err);
      setError(err.message);

      const errorMessage = 
        currentLanguage === "uz"
          ? "Kechirasiz, hozir ulanishda muammo bor. Biz bilan bog‘laning: +998 78 555 86 18"
          : currentLanguage === "ru"
          ? "Извините, проблема с подключением. Свяжитесь с нами: +998 78 555 86 18"
          : "Sorry, connection issue. Contact us: +998 78 555 86 18";

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function clearChat() {
    updateLanguage(currentLanguage);
    setShowHistory(false);
    setError(null);
  }

  function handleFaqClick(question) {
    sendMessage(question);
    setShowFaq(false);
  }

  // Tilni o'zgartirish tugmasi
  const LanguageSwitcher = () => (
    <div className="relative group">
      <button
        onClick={() => {
          const nextLang = currentLanguage === "uz" ? "ru" : currentLanguage === "ru" ? "en" : "uz";
          updateLanguage(nextLang);
        }}
        className="rounded-lg p-1.5 transition hover:bg-white/10"
        title={currentLanguage === "uz" ? "O'zbekcha" : currentLanguage === "ru" ? "Русский" : "English"}
      >
        <Languages className="h-4 w-4" />
      </button>
      <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black/80 text-white text-xs rounded px-1.5 py-0.5 whitespace-nowrap">
        {currentLanguage === "uz" ? "O'zbekcha" : currentLanguage === "ru" ? "Русский" : "English"}
      </div>
    </div>
  );

  return (
    <>
      {!open && (
        <div className="fixed bottom-28 right-6 z-[100] flex items-center gap-3">
          <div className="hidden sm:block rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-lg animate-fadeIn">
            {currentLanguage === "uz" 
              ? "Savolingiz bormi?" 
              : currentLanguage === "ru" 
              ? "Есть вопросы?" 
              : "Any questions?"}
          </div>

          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping"></span>
            <span className="absolute inset-[-10px] rounded-full border border-emerald-300/40 animate-[ping_2.5s_ease-out_infinite]"></span>
            <div className="absolute inset-[-12px] rounded-full bg-emerald-500/30 blur-xl"></div>

            <button
              onClick={() => setOpen(true)}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_15px_40px_rgba(16,185,129,0.45)] transition duration-300 hover:scale-110 hover:shadow-[0_20px_55px_rgba(16,185,129,0.55)]"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-[100] w-[calc(100%-24px)] max-w-[400px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">EcoProm AI</span>
                  <Sparkles className="h-3 w-3 text-emerald-200" />
                </div>
                <div className="text-xs text-emerald-100">
                  {currentLanguage === "uz"
                    ? "Savollaringizga tezkor javob"
                    : currentLanguage === "ru"
                    ? "Быстрый ответ на ваши вопросы"
                    : "Quick answers to your questions"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="rounded-lg p-1.5 transition hover:bg-white/10"
                title={currentLanguage === "uz" ? "Tarix" : currentLanguage === "ru" ? "История" : "History"}
              >
                <History className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowFaq(!showFaq)}
                className="rounded-lg p-1.5 transition hover:bg-white/10"
                title={currentLanguage === "uz" ? "Tez so'raladigan savollar" : currentLanguage === "ru" ? "Часто задаваемые вопросы" : "FAQ"}
              >
                <HelpCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 transition hover:bg-white/10"
                aria-label="Yopish"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {showHistory && (
            <div className="border-b border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {currentLanguage === "uz"
                    ? "So'nggi mavzular"
                    : currentLanguage === "ru"
                    ? "Последние темы"
                    : "Recent topics"}
                </span>
                <button
                  onClick={clearChat}
                  className="text-xs text-emerald-600 hover:text-emerald-700"
                >
                  {currentLanguage === "uz"
                    ? "Yangi chat"
                    : currentLanguage === "ru"
                    ? "Новый чат"
                    : "New chat"}
                </button>
              </div>
              <div className="space-y-1.5">
                {messages
                  .filter((m) => m.role === "user")
                  .slice(-3)
                  .map((msg, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(msg.content)}
                      className="w-full truncate rounded-lg bg-white px-3 py-2 text-left text-xs text-slate-600 shadow-sm hover:bg-emerald-50"
                    >
                      {msg.content}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {showFaq && (
            <div className="border-b border-slate-200 bg-slate-50 p-3">
              <span className="mb-2 block text-xs font-medium text-slate-500">
                {currentLanguage === "uz"
                  ? "Tez-tez so'raladigan savollar"
                  : currentLanguage === "ru"
                  ? "Часто задаваемые вопросы"
                  : "Frequently asked questions"}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {faqItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleFaqClick(item.question)}
                    className="rounded-lg bg-white p-2 text-left shadow-sm hover:bg-emerald-50"
                  >
                    <div className="text-xs font-medium text-slate-700">
                      {item.question}
                    </div>
                    <div className="mt-0.5 text-[10px] text-emerald-600">
                      {item.answer}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="max-h-[380px] space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "assistant";

              return (
                <div
                  key={`${msg.role}-${idx}`}
                  className={`flex ${
                    isAssistant ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      isAssistant
                        ? "bg-white text-slate-700 shadow-sm"
                        : "bg-emerald-600 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-500"></div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {error}
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 grid grid-cols-3 gap-2">
              {productQuestions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => sendMessage(item.text)}
                    className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-2 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <Icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-center text-[10px] text-slate-600">
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  {q}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <a
                href="tel:+998785558618"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition hover:bg-emerald-200"
                aria-label="Qo‘ng‘iroq qilish"
              >
                <Phone className="h-5 w-5" />
              </a>

              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  currentLanguage === "uz"
                    ? "Savolingizni yozing..."
                    : currentLanguage === "ru"
                    ? "Напишите ваш вопрос..."
                    : "Type your question..."
                }
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Yuborish"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] text-slate-400">
                  {currentLanguage === "uz"
                    ? "Online 24/7"
                    : currentLanguage === "ru"
                    ? "Онлайн 24/7"
                    : "Online 24/7"}
                </span>
              </div>
              <a
                href="tel:+998785558618"
                className="text-[10px] font-medium text-emerald-600 hover:text-emerald-700"
              >
                +998 78 555 86 18
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}