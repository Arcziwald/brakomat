import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";

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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Strona główna
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy-900 mb-3">
            Jedna prosta cena
          </h1>
          <p className="text-gray-500 text-lg">
            Bez limitów, bez planów, bez zaskoczenia.
          </p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-accent shadow-xl p-10">
          <div className="mb-2 text-sm font-semibold text-accent uppercase tracking-wider">
            Roczny dostęp
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-6xl font-black text-navy-900">€49</span>
            <span className="text-gray-400 mb-3 text-lg">/ rok</span>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            To mniej niż 15 minut pracy Twojego pracownika miesięcznie.
          </p>
          <ul className="space-y-3 mb-10">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent shrink-0" />
                <span className="text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/login"
            className="block w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-4 rounded-xl text-lg text-center transition-colors"
          >
            Zacznij za darmo
          </Link>
          <p className="text-gray-400 text-sm mt-4 text-center">
            14 dni bez karty kredytowej.
          </p>
        </div>
      </div>
    </div>
  );
}
