import { useEffect, useRef, useState } from "react";
import { 
  MessageCircle, X, Send, Phone, Bot, 
  Sparkles, ChevronDown, History, HelpCircle,
  Package, Snowflake, DoorOpen, Factory, FileText,
  AlertCircle
} from "lucide-react";
import Groq from "groq-sdk";

const START_MESSAGES = [
  {
    role: "assistant",
    content:
      "Assalomu alaykum! Men EcoProm virtual yordamchisiman. Sizga PIR panel, sovutkich kamera yoki montaj bo‘yicha yordam beraman.",
  },
];

const QUICK_QUESTIONS = [
  "PIR panel nima?",
  "Sovutkich kamera uchun qaysi qalinlik kerak?",
  "Montaj ham qilasizlarmi?",
  "Narxni qanday olsam bo‘ladi?",
];

// Qo'shimcha tezkor savollar
const PRODUCT_QUESTIONS = [
  { icon: Package, text: "PIR va PUR farqi", color: "text-emerald-600" },
  { icon: Snowflake, text: "Sovutgich kamera hajmi", color: "text-blue-600" }, // Bu yerda bitta " bo'lishi kerak
  { icon: DoorOpen, text: "Eshik turlari", color: "text-amber-600" },
  { icon: Factory, text: "Metall konstruksiya", color: "text-purple-600" },
];

// FAQ ma'lumotlari
const FAQ_ITEMS = [
  {
    question: "Yetkazib berish muddati?",
    answer: "5-7 ish kuni",
    category: "yetkazib"
  },
  {
    question: "Kafolat muddati?",
    answer: "10 yil",
    category: "kafolat"
  },
  {
    question: "Namuna olish mumkinmi?",
    answer: "Bepul namunalar",
    category: "namuna"
  },
  {
    question: "To'lov turlari?",
    answer: "Naqd, plastik, bank o'tkazmasi",
    category: "tolov"
  }
];

// EcoProm ma'lumotlari
const COMPANY_CONTEXT = `
Kompaniya: EcoProm
Ma'lumot: 10 yillik tajriba, 500+ muvaffaqiyatli loyiha

ASOSIY MAHSULOTLAR:
1. PIR SENDVICH PANELLAR (qalinligi 40-200mm, issiqlik o'tkazuvchanlik 0.019-0.022)
2. PUR SENDVICH PANELLAR (qalinligi 40-200mm, issiqlik o'tkazuvchanlik 0.022-0.026)
3. MINERAL WOOL PANELLAR (qalinligi 50-200mm, yong'inga chidamli EI240)
4. SOVUTGICH KAMERALAR (-25°C dan +8°C gacha, hajmi 5-1000 m³)
5. SANOAT ESHIKLARI (germetik, tez ochilish 1.5 m/s)
6. METALL KONSTRUKSIYALAR (maydon 100-10000 m², 10 yil kafolat)

QO'LLANISH SOHALARI:
- Sanoat qurilishi (zavodlar, sexlar, omborlar)
- Sovutish tizimlari (sovutgich kameralar, muzlatgichlar)
- Qishloq xo'jaligi (fermalar, issiqxonalar)
- Savdo va ofis (savdo markazlari, ofislar)

KONTAKT:
- Telefon: +998 78 555 86 18
- Manzil: Toshkent va Samarqand
`;

// Groq API sozlamalari
const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY || "gsk_SizningAPIKalitingiz",
  dangerouslyAllowBrowser: true // Brauzerda ishlatish uchun
});

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(START_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [error, setError] = useState(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);

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

    const userMessage = { role: "user", content: value };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setShowFaq(false);

    try {
      // Groq API ga to'g'ridan-to'g'ri so'rov yuborish
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content: `Sen EcoProm kompaniyasining virtual yordamchisisan. 
            
            Kompaniya haqida ma'lumot:
            ${COMPANY_CONTEXT}
            
            Qoidalar:
            - O'zbek tilida javob ber
            - Qisqa va aniq javob ber
            - Narx so'ralsa, aniq narx yo'qligini va loyiha asosida hisoblanishini ayt
            - Telefon raqamini taklif qil: +998 78 555 86 18
            - Mahsulot tarkibi va texnik xususiyatlarini ayt
            - Qo'llanish sohalariga misol keltir`
          },
          ...messages.slice(-5).map(m => ({
            role: m.role,
            content: m.content
          })),
          { role: "user", content: value }
        ]
      });

      const reply = completion.choices[0]?.message?.content || 
        "Kechirasiz, javob olishda muammo bo'ldi.";

      setMessages([...nextMessages, { 
        role: "assistant", 
        content: reply 
      }]);
    } catch (error) {
      console.error("Groq API xatolik:", error);
      setError("API ga ulanishda xatolik");
      
      // Fallback javob
      setMessages([...nextMessages, { 
        role: "assistant", 
        content: "Kechirasiz, hozir ulanishda muammo bor. Biz bilan bog‘laning: +998 78 555 86 18" 
      }]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function clearChat() {
    setMessages(START_MESSAGES);
    setShowHistory(false);
    setError(null);
  }

  function handleFaqClick(question) {
    sendMessage(question);
    setShowFaq(false);
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl transition hover:scale-105 hover:bg-emerald-700 hover:shadow-2xl"
          aria-label="AI assistantni ochish"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-[100] w-[calc(100%-24px)] max-w-[400px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">EcoProm AI</span>
                  <Sparkles className="h-3 w-3 text-emerald-200" />
                </div>
                <div className="text-xs text-emerald-100">
                  Savollaringizga tezkor javob
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="rounded-lg p-1.5 transition hover:bg-white/10"
                title="Tarix"
              >
                <History className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowFaq(!showFaq)}
                className="rounded-lg p-1.5 transition hover:bg-white/10"
                title="Tez so'raladigan savollar"
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

          {/* History Panel */}
          {showHistory && (
            <div className="border-b border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">So'nggi mavzular</span>
                <button 
                  onClick={clearChat}
                  className="text-xs text-emerald-600 hover:text-emerald-700"
                >
                  Yangi chat
                </button>
              </div>
              <div className="space-y-1.5">
                {messages.filter(m => m.role === "user").slice(-3).map((msg, idx) => (
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

          {/* FAQ Panel */}
          {showFaq && (
            <div className="border-b border-slate-200 bg-slate-50 p-3">
              <span className="text-xs font-medium text-slate-500 mb-2 block">
                Tez-tez so'raladigan savollar
              </span>
              <div className="grid grid-cols-2 gap-2">
                {FAQ_ITEMS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleFaqClick(item.question)}
                    className="rounded-lg bg-white p-2 text-left shadow-sm hover:bg-emerald-50"
                  >
                    <div className="text-xs font-medium text-slate-700">{item.question}</div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">{item.answer}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="max-h-[380px] space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "assistant";

              return (
                <div
                  key={`${msg.role}-${idx}`}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
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

          {/* Quick Questions */}
          <div className="border-t border-slate-200 bg-white p-3">
            {/* Mahsulot bo'yicha tezkor savollar */}
            <div className="mb-3 grid grid-cols-4 gap-2">
              {PRODUCT_QUESTIONS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => sendMessage(item.text)}
                    className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-2 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <Icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-[10px] text-center text-slate-600">{item.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Asosiy tezkor savollar */}
            <div className="mb-3 flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input form */}
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
                placeholder="Savolingizni yozing..."
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

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] text-slate-400">Online 24/7</span>
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
