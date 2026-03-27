import { Check } from "lucide-react";

const fits = [
  "Biuro rachunkowe obsługujące 5–100 klientów",
  "Zespół, który traci czas na ręczne pilnowanie dokumentów",
  "Biuro bez dedykowanego systemu obiegu dokumentów",
  "Każdy, kto chce wiedzieć, co pilne — bez otwierania Excela",
  "Biuro, które chce wysyłać profesjonalne przypomnienia szybko",
];

const notFits = [
  "Duże korporacje z własnym ERP",
  "Firmy szukające pełnej automatyzacji wysyłki",
];

export function ForWho() {
  return (
    <section className="py-24 bg-navy-900 text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dla kogo?</h2>
          <p className="text-navy-300 text-lg">
            Brakomat jest prosty z założenia — i taki ma pozostać.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-accent font-semibold text-sm uppercase tracking-wider mb-6">
              Brakomat jest dla Ciebie, jeśli:
            </h3>
            <ul className="space-y-4">
              {fits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-navy-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-6">
              Nie jest dla Ciebie, jeśli:
            </h3>
            <ul className="space-y-4">
              {notFits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-5 h-5 text-gray-500 shrink-0 mt-0.5 text-lg leading-none">
                    ×
                  </span>
                  <span className="text-navy-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
