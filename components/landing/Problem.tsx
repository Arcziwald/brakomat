import { MessageSquareX, Clock, TableProperties } from "lucide-react";

const problems = [
  {
    icon: MessageSquareX,
    title: "Chaos w komunikacji",
    description:
      "Pracownicy pytają się nawzajem, co już dostaliśmy. Klienci nie wiedzą, co mają dosłać. Wiadomości giną w skrzynce.",
  },
  {
    icon: Clock,
    title: "Terminy gonią",
    description:
      "VAT, PIT, JPK — każdy miesiąc to wyścig z czasem. A brakujące dokumenty odkrywasz dopiero w ostatniej chwili.",
  },
  {
    icon: TableProperties,
    title: "Excel już nie wystarcza",
    description:
      "Arkusze się rozrastają, duplikują i nikt nie wie, która wersja jest aktualna. Pilnowanie braków pochłania godziny tygodniowo.",
  },
];

export function Problem() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Brzmi znajomo?
          </h2>
          <p className="text-gray-500 text-lg">
            Większość biur rachunkowych traci kilka godzin tygodniowo na ręczne pilnowanie braków.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3">{title}</h3>
              <p className="text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
