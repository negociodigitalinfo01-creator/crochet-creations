import dress1 from "@/assets/crochet-dress-1.jpg";
import dress2 from "@/assets/crochet-dress-2.jpg";
import dress3 from "@/assets/crochet-dress-3.jpg";
import bag1 from "@/assets/crochet-bag-1.jpg";
import bag2 from "@/assets/crochet-bag-2.jpg";
import bag3 from "@/assets/crochet-bag-3.jpg";

const GALLERY = [
  { src: dress1, alt: "Vestido de crochê rosa" },
  { src: bag1, alt: "Bolsa de crochê bege" },
  { src: dress2, alt: "Vestido de crochê branco" },
  { src: bag2, alt: "Bolsa de crochê rosa" },
  { src: dress3, alt: "Vestido de crochê laranja" },
  { src: bag3, alt: "Bolsa de crochê branca redonda" },
];

// duplicate for seamless loop
const TRACK = [...GALLERY, ...GALLERY];

export default function IntroLanding({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 overflow-hidden">
      {/* Hero */}
      <section className="px-6 pt-12 pb-8 max-w-5xl mx-auto text-center">
        <span className="inline-block bg-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
          + 12.000 alumnas felices
        </span>
        <h1
          className="text-3xl md:text-5xl font-black leading-tight text-gray-900 mb-5"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Aprende a tejer{" "}
          <span className="text-rose-500 italic">vestidos y bolsas</span> únicas
          a crochet — desde cero
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Un método paso a paso pensado para principiantes. Crea piezas
          increíbles que puedes usar, regalar o vender desde el primer mes.
        </p>

        <button
          onClick={onStart}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-rose-200 hover:shadow-xl transition-all"
        >
          QUIERO EMPEZAR AHORA →
        </button>
        <p className="text-xs text-gray-400 mt-3">
          🔒 Acceso inmediato · Pago único · Garantía de 7 días
        </p>
      </section>

      {/* Carrusel infinito */}
      <section className="py-8 relative">
        <div
          className="flex gap-6 animate-scroll-x"
          style={{ width: "max-content" }}
        >
          {TRACK.map((item, i) => (
            <div
              key={i}
              className="relative w-56 md:w-72 aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-4 border-white flex-shrink-0"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Carrusel inverso */}
      <section className="py-4 relative">
        <div
          className="flex gap-6 animate-scroll-x-reverse"
          style={{ width: "max-content" }}
        >
          {[...TRACK].reverse().map((item, i) => (
            <div
              key={i}
              className="relative w-44 md:w-56 aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border-4 border-white flex-shrink-0"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl md:text-4xl font-black text-rose-500">12k+</p>
          <p className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">
            Alumnas
          </p>
        </div>
        <div>
          <p className="text-2xl md:text-4xl font-black text-rose-500">98%</p>
          <p className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">
            Satisfacción
          </p>
        </div>
        <div>
          <p className="text-2xl md:text-4xl font-black text-rose-500">∞</p>
          <p className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">
            Acceso vitalicio
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="text-center pb-16 px-6">
        <h2
          className="text-2xl md:text-3xl font-black text-gray-900 mb-4"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          ¿Lista para empezar tu primera pieza?
        </h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto text-sm md:text-base">
          Responde 3 preguntas rápidas y descubre el plan perfecto para vos.
        </p>
        <button
          onClick={onStart}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg transition-all"
        >
          HACER EL TEST GRATIS →
        </button>
      </section>
    </div>
  );
}
