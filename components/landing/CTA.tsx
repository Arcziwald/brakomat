import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 bg-navy-900 text-white text-center">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-5">
          Zacznij dziś. Bez ryzyka.
        </h2>
        <p className="text-navy-300 text-lg mb-10">
          14 dni za darmo, bez karty kredytowej. Zobaczysz efekt już po pierwszym
          dniu pracy z Brakomat.
        </p>
        <Link
          href="/login"
          className="inline-block bg-accent hover:bg-accent-500 text-navy-900 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
        >
          Załóż konto — to nic nie kosztuje
        </Link>
        <p className="text-navy-500 text-sm mt-6">
          Już ponad 50 biur rachunkowych korzysta z Brakomat.
        </p>
      </div>
    </section>
  );
}
