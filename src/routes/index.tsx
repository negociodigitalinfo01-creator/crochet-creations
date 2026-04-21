import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import IntroLanding from "@/components/IntroLanding";
import instructoraImg from "@/assets/instructora.webp";
import quizLogo from "@/assets/quiz-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CrochetMaster - Vestidos y Bolsas Tejidos a Mano" },
      {
        name: "description",
        content:
          "Aprende a tejer vestidos y bolsas a crochet desde cero. Curso online con +12.000 alumnas, acceso de por vida y método paso a paso.",
      },
    ],
    scripts: [
      { src: "https://fast.wistia.com/player.js", async: true },
      { src: "https://fast.wistia.com/embed/gfx38tfitw.js", async: true, type: "module" },
    ],
  }),
});

function CountdownBar() {
  const [time, setTime] = useState({ h: 11, m: 48, s: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t;
        if (s > 0) s--;
        else if (m > 0) {
          m--;
          s = 59;
        } else if (h > 0) {
          h--;
          m = 59;
          s = 59;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className="bg-rose-500 text-white text-center py-3 font-bold text-sm md:text-base px-4">
      ⏰ DESCUENTO DISPONIBLE POR: {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </div>
  );
}

type QuizStep = {
  question: string;
  options: { icon: string; label: string }[];
  cta: string;
};

const QUIZ_STEPS: QuizStep[] = [
  {
    question: "¿Cuál es tu nivel de experiencia?",
    cta: "Siguiente →",
    options: [
      { icon: "🌱", label: "Cero — nunca he tejido" },
      { icon: "🧶", label: "Básico — conozco algunos puntos" },
      { icon: "🏅", label: "Experta — ya tejo con frecuencia" },
    ],
  },
  {
    question: "¿Cuál es tu objetivo principal?",
    cta: "Siguiente →",
    options: [
      { icon: "💰", label: "Generar ingresos vendiendo mis piezas" },
      { icon: "💖", label: "Tenerlo como hobby creativo" },
      { icon: "🎁", label: "Hacer regalos para mi familia" },
    ],
  },
  {
    question: "¿Cuánto tiempo tienes disponible?",
    cta: "Ver mi resultado →",
    options: [
      { icon: "⏰", label: "1 a 2 horas por día" },
      { icon: "⏱️", label: "3 a 5 horas por día" },
      { icon: "⏲️", label: "Más de 5 horas por día" },
    ],
  },
];

function Quiz({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const current = QUIZ_STEPS[step];
  const progress = ((step + 1) / QUIZ_STEPS.length) * 100;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => {
      if (step < QUIZ_STEPS.length - 1) {
        setStep(step + 1);
        setSelected(null);
      } else {
        onFinish();
      }
    }, 350);
  };

  return (
    <section className="min-h-screen bg-rose-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={quizLogo}
            alt="CrochetMaster"
            className="h-16 w-auto mb-3"
          />
          <p className="text-rose-500 text-xs font-bold tracking-widest uppercase">
            Paso {step + 1} de {QUIZ_STEPS.length}
          </p>
        </div>

        {/* Progress */}
        <div className="w-full h-1.5 bg-rose-100 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-rose-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2
            className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-8"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {current.question}
          </h2>

          <div className="space-y-3">
            {current.options.map((opt, i) => {
              const active = selected === i;
              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                    active
                      ? "bg-rose-100 border-rose-500"
                      : "bg-rose-50/50 border-transparent hover:border-rose-300 hover:bg-rose-50"
                  }`}
                >
                  <span className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-lg shadow-sm">
                    {opt.icon}
                  </span>
                  <span className="font-semibold text-gray-800 text-sm md:text-base">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {QUIZ_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-8 bg-rose-500" : "w-2 bg-rose-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [stage, setStage] = useState<"intro" | "quiz" | "landing">("intro");

  if (stage === "intro") {
    return <IntroLanding onStart={() => setStage("quiz")} />;
  }
  if (stage === "quiz") {
    return <Quiz onFinish={() => setStage("landing")} />;
  }
  return <Landing />;
}

function Landing() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setRevealed(true), 5000);
    return () => clearTimeout(id);
  }, []);

  const faqs = [
    {
      q: "¿Necesito saber crochet para empezar?",
      a: "No. El curso empieza desde cero absoluto. Aprenderás cada punto desde el principio antes de empezar tu primer vestido o bolsa.",
    },
    {
      q: "¿Cuánto tiempo tarda en hacerse un vestido o una bolsa?",
      a: "Un vestido puede tardar entre 1 y 3 semanas dependiendo de tu dedicación. Las bolsas playeras son más rápidas, muchas alumnas terminan una en pocos días.",
    },
    {
      q: "¿Qué materiales necesito?",
      a: "Un gancho de crochet y hilo. Nada más para empezar. El curso incluye la lista de materiales completa para que no cometas errores al comprar.",
    },
    {
      q: "¿El acceso realmente es de por vida?",
      a: "Sí. Pagas una sola vez y el acceso nunca vence. Cuando agregamos nuevos modelos de vestidos o bolsas (en el plan Premium cada semana), los recibes sin costo adicional. No hay pagos recurrentes ni renovaciones.",
    },
    {
      q: "¿Las bolsas playeras tienen estructura firme?",
      a: "Sí. El método enseña técnicas específicas para que las bolsas queden con estructura firme y acabado profesional, listas para vender.",
    },
    {
      q: "¿Puedo pagar en mi moneda local?",
      a: "Sí. La plataforma de pago convierte automáticamente el precio a la moneda de tu país al momento del checkout.",
    },
    {
      q: "¿Es un pago único o hay mensualidades?",
      a: "Es un pago único. Pagas una sola vez y tienes acceso de por vida a todos los modelos de vestidos y bolsas. No hay mensualidades, no hay renovaciones, no hay cargos adicionales. Nunca.",
    },
    {
      q: "¿Puedo ver las aulas en mi celular?",
      a: "Sí. La plataforma funciona perfectamente en celular, tablet y computadora. Puedes ver las aulas donde quieras, cuando quieras, a tu ritmo.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
      <CountdownBar />



      {/* HERO + VIDEO */}
      <section className="px-6 md:px-16 pt-6 pb-12 max-w-5xl mx-auto text-center">
        <span className="inline-block bg-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
          ENTRENAMIENTO VESTIDOS QUE SE VENDEN
        </span>
        <h1
          className="text-3xl md:text-5xl font-black leading-tight text-gray-900 mb-5"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Crea vestidos y bolsas únicas con tus{" "}
          <span className="text-rose-500 italic">propias manos</span> — y aprende a venderlas.
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Mira el video y descubre cómo +12.000 mujeres están tejiendo piezas que se venden por
          $80, $150 y hasta $300 USD — desde su casa, sin experiencia previa.
        </p>

        {/* VIDEO WISTIA */}
        <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-rose-100">
          <div
            dangerouslySetInnerHTML={{
              __html: `<wistia-player media-id="gfx38tfitw" aspect="1.7777777777777777"></wistia-player>`,
            }}
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#precios"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-rose-200 hover:shadow-xl transition-all"
          >
            QUIERO EMPEZAR AHORA
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex -space-x-3">
            <img alt="alumna" className="w-9 h-9 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=47" />
            <img alt="alumna" className="w-9 h-9 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=32" />
            <img alt="alumna" className="w-9 h-9 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=25" />
            <img alt="alumna" className="w-9 h-9 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=12" />
          </div>
          <p className="text-sm text-gray-500">
            <strong className="text-rose-600">+12.000 alumnas</strong> ya están tejiendo
          </p>
        </div>
      </section>


      {/* STATS */}
      <section className="bg-white border-y border-rose-100 py-8 px-6 md:px-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-black text-rose-500">12.000+</p>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Alumnas</p>
          </div>
          <div>
            <p className="text-3xl font-black text-rose-500">50 años</p>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Experiencia</p>
          </div>
          <div>
            <p className="text-3xl font-black text-rose-500">98%</p>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Satisfacción</p>
          </div>
          <div>
            <p className="text-3xl font-black text-rose-500">De por vida</p>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Acceso</p>
          </div>
        </div>
      </section>

      {/* QUE VAS APRENDER */}
      <section className="py-16 px-6 md:px-16 max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-3"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Lo que vas a aprender
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Un método paso a paso, pensado para que termines tu primera pieza incluso si nunca
          tomaste un gancho en tu vida.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🧶", title: "Desde el primer punto", text: "Aprende todos los puntos básicos y avanzados con videos en alta calidad y vista cercana." },
            { icon: "👗", title: "Vestidos completos", text: "Tejé vestidos elegantes, casuales y de playa con patrones exclusivos paso a paso." },
            { icon: "👜", title: "Bolsas con estructura firme", text: "Domina la técnica para que tus bolsas queden profesionales, listas para usar y vender." },
            { icon: "💰", title: "Cómo vender tu trabajo", text: "Aprende a calcular precios, fotografiar y vender tus piezas por redes sociales." },
            { icon: "📱", title: "Acceso desde cualquier lugar", text: "Mira las clases en tu celular, tablet o computadora, a tu ritmo, cuando quieras." },
            { icon: "🎁", title: "Modelos nuevos cada semana", text: "En el plan Premium recibís nuevos vestidos y bolsas todas las semanas, sin costo extra." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-rose-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-black text-lg text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTRUCTORA */}
      <section className="bg-rose-50 py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-3 bg-rose-200 rounded-3xl rotate-3" />
              <img
                alt="Instructora"
                className="relative rounded-3xl w-64 h-80 object-cover shadow-xl"
                src={instructoraImg}
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Tu Instructora
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mb-4"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              50 años tejiendo, miles de alumnas felices
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Empecé a tejer cuando tenía 8 años junto a mi abuela. Hoy, después de 5 décadas
              creando piezas únicas, decidí compartir todo lo que sé en un método simple, claro
              y pensado para mujeres como vos — que quieren aprender un oficio hermoso y, si lo
              desean, transformarlo en una fuente de ingresos real.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Más de <strong className="text-rose-600">12.000 alumnas</strong> ya pasaron por
              este curso y muchas hoy venden sus vestidos y bolsas en sus propias ciudades.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-16 px-6 md:px-16 max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-3"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Lo que dicen nuestras alumnas
        </h2>
        <p className="text-center text-gray-500 mb-12">Resultados reales de mujeres reales</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "María, Argentina", img: "https://i.pravatar.cc/100?img=47", text: "Nunca había tejido en mi vida. En 2 semanas terminé mi primer vestido y ya tengo 3 pedidos de amigas." },
            { name: "Lucía, México", img: "https://i.pravatar.cc/100?img=32", text: "Vendí mi primera bolsa playera por $90 USD. El curso se pagó solo en menos de un mes." },
            { name: "Camila, Colombia", img: "https://i.pravatar.cc/100?img=25", text: "Las clases son clarísimas. Aprendí a calcular precios y hoy tengo una pequeña marca propia." },
          ].map((t) => (
            <div key={t.name} className="bg-white border border-rose-100 rounded-2xl p-6 shadow-sm">
              <div className="flex text-rose-400 mb-3">{"★★★★★"}</div>
              <p className="text-gray-600 italic mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img alt={t.name} src={t.img} className="w-10 h-10 rounded-full object-cover" />
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="bg-gradient-to-b from-rose-50 to-white py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-3"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Elegí tu plan
          </h2>
          <p className="text-center text-gray-500 mb-12">Pago único · Acceso de por vida · Sin mensualidades</p>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: "PLAN BÁSICO",
                oldPrice: "$29.90",
                price: "$9.90",
                cta: "Empezar con Básico",
                features: [
                  { text: "Curso Completo de Crochet", on: true },
                  { text: "Acceso Vitalicio", on: true },
                  { text: "Material PDF descargable", on: true },
                  { text: "Soporte por email", on: true },
                  { text: "Comunidad privada", on: false },
                  { text: "Clases en vivo", on: false },
                  { text: "Certificado digital", on: false },
                ],
                highlight: false,
              },
              {
                name: "PLAN POPULAR",
                oldPrice: "$59.90",
                price: "$19.90",
                cta: "Quiero el Popular",
                features: [
                  { text: "Curso Completo de Crochet", on: true },
                  { text: "Acceso Vitalicio", on: true },
                  { text: "Material PDF descargable", on: true },
                  { text: "Soporte prioritario", on: true },
                  { text: "Comunidad privada de alumnas", on: true },
                  { text: "Clases en vivo mensuales", on: true },
                  { text: "Certificado digital", on: false },
                ],
                highlight: true,
              },
              {
                name: "PLAN PREMIUM",
                oldPrice: "$99.90",
                price: "$39.90",
                cta: "Quiero el Premium",
                features: [
                  { text: "Curso Completo de Crochet", on: true },
                  { text: "Acceso Vitalicio", on: true },
                  { text: "Material PDF descargable", on: true },
                  { text: "Soporte VIP 1 a 1", on: true },
                  { text: "Comunidad privada de alumnas", on: true },
                  { text: "Clases en vivo mensuales", on: true },
                  { text: "Certificado digital oficial", on: true },
                ],
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 bg-white flex flex-col ${
                  p.highlight
                    ? "border-2 border-rose-400 shadow-2xl bg-rose-50/40"
                    : "border border-rose-100 shadow-sm"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full whitespace-nowrap">
                    ⭐ MÁS ELEGIDO
                  </span>
                )}
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
                  {p.name}
                </p>
                <p className="text-sm text-gray-400 line-through mb-1">
                  {p.oldPrice} USD
                </p>
                <div className="mb-1">
                  <span className="text-5xl font-black text-gray-900">
                    {p.price}
                  </span>
                  <span className="ml-1 text-sm text-gray-400 font-semibold">
                    USD
                  </span>
                </div>
                <p className="text-rose-500 text-sm font-semibold mb-6">
                  Pago único · Acceso vitalicio
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f.text}
                      className={`flex items-start gap-2 text-sm ${
                        f.on ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      <span
                        className={
                          f.on ? "text-rose-500 font-bold" : "text-gray-300"
                        }
                      >
                        {f.on ? "✓" : "✕"}
                      </span>
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full font-bold py-4 rounded-2xl transition-all ${
                    p.highlight
                      ? "bg-rose-500 text-white hover:bg-rose-600 shadow-lg"
                      : "bg-rose-200 text-rose-700 hover:bg-rose-300"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            🔒 Pago seguro · 7 días de garantía · Acceso inmediato después de la compra
          </p>
        </div>
      </section>

      {/* GARANTÍA */}
      <section className="py-16 px-6 md:px-16 max-w-3xl mx-auto text-center">
        <div className="inline-block bg-rose-100 text-rose-600 rounded-full p-5 mb-6">
          <span className="text-4xl">🛡️</span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-black text-gray-900 mb-4"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Garantía de 7 días
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Si en 7 días sentís que el curso no es para vos, te devolvemos el 100% de tu dinero.
          Sin preguntas, sin trámites complicados. Tu única misión es probar.
        </p>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 md:px-16 max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-3"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Preguntas frecuentes
        </h2>
        <p className="text-center text-gray-500 mb-10">Todo lo que necesitás saber antes de empezar</p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-white border border-rose-100 rounded-2xl px-6 mb-3 shadow-sm"
            >
              <AccordionTrigger className="text-left font-bold text-gray-900 text-base hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA FINAL */}
      <section className="bg-rose-500 text-white text-center py-16 px-6">
        <h2
          className="text-3xl md:text-4xl font-black mb-4"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Empezá hoy mismo
        </h2>
        <p className="text-rose-100 mb-8 max-w-xl mx-auto">
          Únete a las +12.000 alumnas que ya están tejiendo (y vendiendo) sus propias piezas.
        </p>
        <a
          href="#precios"
          className="inline-block bg-white text-rose-500 px-10 py-4 rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform"
        >
          QUIERO EMPEZAR AHORA
        </a>
      </section>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © {new Date().getFullYear()} CrochetMaster · Todos los derechos reservados
      </footer>
        </div>
      )}
    </div>
  );
}
