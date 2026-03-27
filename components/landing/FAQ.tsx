"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Czy muszę instalować aplikację?",
    a: "Nie. Brakomat działa w przeglądarce na każdym urządzeniu — komputerze, tablecie i telefonie.",
  },
  {
    q: "Czy moje dane są bezpieczne?",
    a: "Tak. Dane przechowywane są na serwerach Supabase z szyfrowaniem. Masz pełną kontrolę nad swoimi danymi.",
  },
  {
    q: "Czy mogę anulować subskrypcję?",
    a: "Tak, w każdej chwili z poziomu ustawień konta. Po anulowaniu masz dostęp do końca opłaconego okresu.",
  },
  {
    q: "Czy jest okres próbny?",
    a: "Tak — 14 dni za darmo, bez podawania karty kredytowej. Dopiero po tym czasie decydujesz, czy chcesz kontynuować.",
  },
  {
    q: "Ile klientów mogę dodać?",
    a: "Bez limitu. Cena €49/rok obejmuje nieograniczoną liczbę klientów i pozycji.",
  },
  {
    q: "Czy Brakomat wysyła przypomnienia automatycznie?",
    a: "Na razie nie — generuje gotowy tekst, który kopiujesz i wysyłasz sam. Automatyczna wysyłka pojawi się w kolejnej wersji.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Często zadawane pytania
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {faqs.map(({ q, a }, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4"
              >
                <span className="font-semibold text-navy-900">{q}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gray-400 shrink-0 transition-transform",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <p className="pb-5 text-gray-500 leading-relaxed">{a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
