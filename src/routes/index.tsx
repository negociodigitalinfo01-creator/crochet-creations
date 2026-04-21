import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Curso Crochet - Crea Vestidos Desde Casa" },
      {
        name: "description",
        content:
          "Aprende a crear vestidos a crochet desde casa y conviértelo en una fuente de ingresos, incluso si empiezas desde cero.",
      },
    ],
  }),
});

function Countdown() {
  const [seconds, setSeconds] = useState(11 * 60 + 48);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return (
    <span>
      {m}:{s}
    </span>
  );
}

function Index() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* TOPO URGÊNCIA */}
      <section className="bg-rose-500 text-white text-center py-3 font-bold">
        ⏰ DESCUENTO DISPONIBLE POR: <Countdown />
      </section>

      {/* HEADLINE */}
      <section className="text-center py-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          CREA VESTIDOS A CROCHET DESDE CASA
        </h1>
        <p className="text-lg text-gray-600">
          Y conviértelo en una fuente de ingresos incluso si empiezas desde cero
        </p>
      </section>

      {/* VÍDEO */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="aspect-video bg-black rounded-2xl" />
      </section>

      {/* AUTORIDADE */}
      <section className="text-center py-10 px-4">
        <img
          src="https://i.pravatar.cc/150"
          alt="María Elena Vargas"
          className="mx-auto rounded-full mb-4"
        />
        <h3 className="font-bold text-xl">María Elena Vargas</h3>
        <p className="text-gray-600">+50 años de experiencia</p>
        <p className="text-gray-600">+12.000 alumnas</p>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-gray-100 py-10 px-4">
        <h2 className="text-center text-2xl font-bold mb-6">
          Lo que dicen nuestras alumnas
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-4 rounded-xl shadow">
            <p>"En 3 meses ya estaba vendiendo mis vestidos."</p>
            <span className="text-sm text-gray-500">— Laura, México</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p>"Nunca había tejido y hoy tengo ingresos."</p>
            <span className="text-sm text-gray-500">— Camila, Colombia</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p>"Me cambió la vida completamente."</p>
            <span className="text-sm text-gray-500">— Sofía, Perú</span>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Elige tu acceso</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-lg">Básico</h3>
            <p className="text-2xl font-bold my-4">$9.90</p>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg">
              Comprar
            </button>
          </div>
          <div className="border-2 border-rose-500 rounded-xl p-6 scale-105">
            <h3 className="font-bold text-lg text-rose-500">Popular</h3>
            <p className="text-3xl font-bold my-4">$19.90</p>
            <button className="bg-rose-500 text-white px-6 py-3 rounded-lg font-bold">
              Comprar Ahora
            </button>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-lg">Premium</h3>
            <p className="text-2xl font-bold my-4">$39.90</p>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg">
              Comprar
            </button>
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="bg-green-100 text-center py-8 px-4">
        <h3 className="font-bold text-lg">Garantía de 7 días</h3>
        <p>Si no te gusta, te devolvemos el dinero</p>
      </section>

      {/* FAQ */}
      <section className="py-10 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">¿Necesito experiencia?</h3>
            <p className="text-gray-600">No, es desde cero paso a paso.</p>
          </div>
          <div>
            <h3 className="font-bold">¿Cuándo tengo acceso?</h3>
            <p className="text-gray-600">
              Inmediatamente después de la compra.
            </p>
          </div>
          <div>
            <h3 className="font-bold">¿Funciona para vender?</h3>
            <p className="text-gray-600">
              Sí, muchas alumnas ya generan ingresos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-rose-500 text-white text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Empieza hoy mismo</h2>
        <button className="bg-white text-rose-500 px-8 py-3 rounded-lg font-bold">
          QUIERO EMPEZAR AHORA
        </button>
      </section>
    </div>
  );
}
