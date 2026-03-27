import Link from "next/link";
import { Check } from "lucide-react";

const features = [
  "Nieograniczona liczba klientów",
  "Nieograniczona liczba pozycji",
  "Generator przypomnień (3 warianty)",
  "Szablony typów dokumentów",
  "Dashboard statusów",
  "Filtrowanie i widok po terminie",
  "Support e-mail",
  "14 dni za darmo — bez karty",
];

export function Pricing() {
  return (
    <section id="cena" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
          Jedna prosta cena
        </h2>
        <p className="text-gray-500 text-lg mb-12">
          Bez ukrytych opłat, bez limitów per klient, bez planów.
        </p>
        <div className="bg-white rounded-3xl border-2 border-accent shadow-xl p-10">
          <div className="mb-2 text-sm font-semibold text-accent uppercase tracking-wider">
            Roczny dostęp
          </div>
          <div className="flex items-end justify-center gap-2 mb-1">
            <span className="text-6xl font-black text-navy-900">€49</span>
            <span className="text-gray-400 mb-3 text-lg">/ rok</span>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            To mniej niż 15 minut pracy Twojego pracownika miesięcznie.
          </p>
          <ul className="space-y-3 mb-10 text-left">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent shrink-0" />
                <span className="text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/login"
            className="block w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-4 rounded-xl text-lg transition-colors"
          >
            Zacznij za darmo
          </Link>
          <p className="text-gray-400 text-sm mt-4">
            14 dni bez karty kredytowej. Potem €49 / rok.
          </p>
        </div>
      </div>
    </section>
  );
}
