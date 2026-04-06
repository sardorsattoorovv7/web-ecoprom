import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next"; // Saytingizdagi i18n kutubxonasi
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
  AlertCircle,
} from "lucide-react";

export default function AiAssistant() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "uz";

  // --- TILGA MOS LUG'AT ---
  const UI_TEXT = {
    uz: {
      welcome: "Assalomu alaykum! Men EcoProm virtual yordamchisiman. Sizga PIR panel, sovutkich kamera yoki montaj bo‘yicha yordam beraman.",
      tooltip: "Savolingiz bormi?",
      subtitle: "Savollaringizga tezkor javob",
      history: "So'nggi mavzular",
      newChat: "Yangi chat",
      faq: "Tez-tez so'raladigan savollar",
      placeholder: "Savolingizni yozing...",
      online: "Online 24/7",
      error: "Ulanishda muammo bo'ldi.",
      questions: ["PIR panel nima?", "Sovutkich kamera qalinligi?", "Montaj qilasizlarmi?", "Narxni olish"],
      products: [
        { icon: Package, text: "PIR va PUR farqi", color: "text-emerald-600" },
        { icon: Snowflake, text: "Kamera hajmi", color: "text-blue-600" },
        { icon: DoorOpen, text: "Eshik turlari", color: "text-amber-600" },
      ],
      faqItems: [
        { question: "Muddati?", answer: "5-7 ish kuni" },
        { question: "Kafolat?", answer: "13 yil" }
      ]
    },
    ru: {
      welcome: "Здравствуйте! Я помощник EcoProm. Помогу с ПИР-панелями, камерами или монтажом.",
      tooltip: "Есть вопросы?",
      subtitle: "Быстрые ответы на вопросы",
      history: "Последние темы",
      newChat: "Новый чат",
      faq: "Частые вопросы",
      placeholder: "Напишите ваш вопрос...",
      online: "В сети 24/7",
      error: "Проблема с соединением.",
      questions: ["Что такое ПИР?", "Толщина камер?", "Делаете монтаж?", "Как узнать цену?"],
      products: [
        { icon: Package, text: "ПИР или ПУР?", color: "text-emerald-600" },
        { icon: Snowflake, text: "Объем камеры", color: "text-blue-600" },
        { icon: DoorOpen, text: "Типы дверей", color: "text-amber-600" },
      ],
      faqItems: [
        { question: "Сроки?", answer: "5-7 рабочих дней" },
        { question: "Гарантия?", answer: "13 лет" }
      ]
    },
    en: {
      welcome: "Hello! I am EcoProm assistant. I can help with PIR panels, cold rooms, or installation.",
      tooltip: "Have questions?",
      subtitle: "Quick answers to your questions",
      history: "Recent topics",
      newChat: "New chat",
      faq: "FAQ",
      placeholder: "Type your question...",
      online: "Online 24/7",
      error: "Connection problem.",
      questions: ["What is PIR?", "Room thickness?", "Do you install?", "Get a price"],
      products: [
        { icon: Package, text: "PIR vs PUR", color: "text-emerald-600" },
        { icon: Snowflake, text: "Room volume", color: "text-blue-600" },
        { icon: DoorOpen, text: "Door types", color: "text-amber-600" },
      ],
      faqItems: [
        { question: "Delivery?", answer: "5-7 working days" },
        { question: "Warranty?", answer: "13 years" }
      ]
    }
  }[currentLang] || { /* default uz matnlari */ };

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: UI_TEXT.welcome }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [error, setError] = useState(null);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Til o'zgarganda chatni tozalash va xush kelibsiz xabarini yangilash
  useEffect(() => {
    setMessages([{ role: "assistant", content: UI_TEXT.welcome }]);
  }, [currentLang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text) {
    const value = (text ?? input).trim();
    if (!value || loading) return;

    const userMessage = { role: "user", content: value };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          lang: currentLang // BACKENDGA TILNI YUBORISH
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "API Error");

      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(UI_TEXT.error);
      setMessages([...nextMessages, { role: "assistant", content: `Call us: +998 78 555 86 18` }]);
    } finally {
      setLoading(false);
    }
  }

  const clearChat = () => setMessages([{ role: "assistant", content: UI_TEXT.welcome }]);

  return (
    <>
      {!open && (
        <div className="fixed bottom-28 right-6 z-[100] flex items-center gap-3">
          <div className="hidden sm:block rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-lg">{UI_TEXT.tooltip}</div>
          <button onClick={() => setOpen(true)} className="relative h-14 w-14 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center transition hover:scale-110">
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-[100] w-[calc(100%-24px)] max-w-[400px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">EcoProm AI</div>
                <div className="text-[10px] text-emerald-100">{UI_TEXT.subtitle}</div>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setShowHistory(!showHistory)} className="p-1.5 hover:bg-white/10 rounded-lg"><History size={16} /></button>
              <button onClick={() => setShowFaq(!showFaq)} className="p-1.5 hover:bg-white/10 rounded-lg"><HelpCircle size={16} /></button>
              <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg"><X size={18} /></button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="h-[380px] overflow-y-auto bg-slate-50 p-4 space-y-3">
            {(showHistory || showFaq) && (
                <div className="bg-white p-3 rounded-xl border border-slate-200 mb-4 animate-in slide-in-from-top">
                    <span className="text-xs font-bold text-slate-500 block mb-2">{showHistory ? UI_TEXT.history : UI_TEXT.faq}</span>
                    <div className="grid grid-cols-1 gap-2">
                        {(showHistory ? messages.filter(m => m.role === 'user').slice(-3) : UI_TEXT.faqItems).map((item, i) => (
                            <button key={i} onClick={() => { sendMessage(item.content || item.question); setShowHistory(false); setShowFaq(false); }} className="text-left text-xs p-2 bg-slate-50 rounded-lg hover:bg-emerald-50 truncate">
                                {item.content || item.question}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === "assistant" ? "bg-white text-slate-700 shadow-sm" : "bg-emerald-600 text-white"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-slate-400">AI is typing...</div>}
            <div ref={endRef} />
          </div>

          {/* Footer / Input */}
          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {UI_TEXT.questions.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] hover:bg-emerald-50">{q}</button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={UI_TEXT.placeholder} className="h-11 flex-1 border rounded-xl px-4 text-sm focus:border-emerald-500 outline-none" />
              <button type="submit" disabled={loading} className="h-11 w-11 bg-emerald-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}