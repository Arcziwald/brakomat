const steps = [
  {
    number: "01",
    title: "Dodaj klientow i pozycje",
    description:
      "Wpisz klientow biura i utworz liste dokumentow, ktorych oczekujesz - faktury, wyciagi, umowy, cokolwiek potrzebujesz.",
  },
  {
    number: "02",
    title: "Sledz statusy jednym kliknieciem",
    description:
      'Zmien status pozycji z "Brakuje" na "Otrzymano" w sekunde. Dashboard od razu pokazuje, co jest pilne, a co juz zalatwie.',
  },
  {
    number: "03",
    title: "Wyslij gotowe przypomnienie",
    description:
      'Kliknij "Przypomnij" - Brakomat generuje gotowy tekst SMS lub e-mail. Skopiuj i wyslij. Bez pisania od zera.',
  },
];

export function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Jak to dziala?
          </h2>
          <p className="text-gray-500 text-lg">
            Trzy kroki, zeby miec pelna kontrole nad dokumentami klientow.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map(({ number, title, description }) => (
            <div key={number} className="relative">
              <div className="text-6xl font-black text-accent/20 leading-none mb-4">
                {number}
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{title}</h3>
              <p className="text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
