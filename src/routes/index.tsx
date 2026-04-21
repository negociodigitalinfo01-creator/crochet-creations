import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CrochetMaster - Vestidos y Bolsas Tejidos a Mano" },
      {
        name: "description",
        content:
          "Aprende a tejer vestidos y bolsas a crochet desde cero. Curso online con +12.000 alumnas y 50 años de experiencia.",
      },
    ],
  }),
});

function Index() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white flex flex-col">
      {/* NAV */}
      <nav className="w-full px-6 md:px-16 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-rose-500 flex items-center justify-center text-white font-black">
            C
          </div>
          <span className="font-black text-gray-900 text-lg">CrochetMaster</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <a href="#video" className="hover:text-rose-500 transition-colors cursor-pointer">
            Curso
          </a>
          <a href="#instructor" className="hover:text-rose-500 transition-colors cursor-pointer">
            Instructora
          </a>
          <a href="#testimonios" className="hover:text-rose-500 transition-colors cursor-pointer">
            Testimonios
          </a>
          <a href="#precios" className="hover:text-rose-500 transition-colors cursor-pointer">
            Precios
          </a>
        </div>
        <button className="border-2 border-rose-400 text-rose-600 font-bold px-5 py-2 rounded-full text-sm hover:bg-rose-500 hover:text-white transition-all whitespace-nowrap cursor-pointer">
          Empezar
        </button>
      </nav>

      {/* HERO */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 md:px-16 gap-12 py-12">
        <div className="flex-1 max-w-xl">
          <span className="inline-block bg-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Curso Online de Crochet
          </span>
          <h1
            className="text-4xl md:text-6xl font-black leading-tight text-gray-900 mb-6"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Vestidos y bolsas tejidos con tus{" "}
            <span className="text-rose-500 italic">manos.</span>
          </h1>
          <p className="text-lg text-gray-500 italic mb-8 leading-relaxed">
            Aprende a tejer piezas únicas y descubre cuánto puedes ganar vendiendo tu arte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-rose-200 hover:shadow-xl transition-all whitespace-nowrap cursor-pointer">
              Empezar Ahora
            </button>
            <a
              href="#video"
              className="border-2 border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-full text-lg hover:border-rose-300 transition-all whitespace-nowrap cursor-pointer text-center"
            >
              Ver el Curso
            </a>
          </div>
          <div className="flex items-center gap-4">
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
        </div>

        <div className="flex-1 max-w-lg w-full">
          <div className="relative">
            <div className="absolute -inset-4 bg-rose-100 rounded-3xl rotate-3" />
            <img
              alt="Tejido de crochet"
              className="relative rounded-3xl w-full h-[420px] md:h-[520px] object-cover object-top shadow-xl"
              src="https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=700&fit=crop"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border border-rose-100">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Alumnas activas</p>
              <p className="text-2xl font-black text-rose-500">12.000+</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-rose-500 text-white rounded-2xl p-4 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider">Acceso</p>
              <p className="text-lg font-black">Vitalicio</p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="w-full bg-white border-t border-rose-100 py-6 px-6 md:px-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-black text-rose-500">12.000+</p>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Alumnas</p>
          </div>
          <div>
            <p className="text-2xl font-black text-rose-500">50 años</p>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Experiencia</p>
          </div>
          <div>
            <p className="text-2xl font-black text-rose-500">98%</p>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Satisfacción</p>
          </div>
          <div>
            <p className="text-2xl font-black text-rose-500">3 Planes</p>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Disponibles</p>
          </div>
        </div>
      </div>
    </section>
  );
}
