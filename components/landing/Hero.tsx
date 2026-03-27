import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative container mx-auto px-6 py-28 text-center max-w-4xl">
        <div className="inline-block bg-accent/10 border border-accent/30 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          Dla biur rachunkowych
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          Zawsze wiesz,{" "}
          <span className="text-accent">czego brakuje</span>{" "}
          od którego klienta.
        </h1>
        <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Brakomat to prosty system dla biur rachunkowych. Śledź braki dokumentów,
          zmieniaj statusy jednym kliknięciem i wysyłaj gotowe przypomnienia
          w kilka sekund.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="bg-accent hover:bg-accent-500 text-navy-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Zacznij za darmo — 14 dni
          </Link>
          <a
            href="#jak-to-dziala"
            className="border border-navy-600 hover:border-accent text-white px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Jak to działa?
          </a>
        </div>
        <p className="text-navy-400 text-sm mt-6">
          Bez karty kredytowej. Anuluj kiedy chcesz.
        </p>
      </div>
    </section>
  );
}
