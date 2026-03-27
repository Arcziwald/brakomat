import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-6xl">
          <Link href="/" className="text-navy-900 font-bold text-lg">
            Brakomat
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {/* Tabs */}
          <div className="flex rounded-xl bg-gray-200 p-1 mb-8">
            <button className="flex-1 py-2 rounded-lg bg-white text-navy-900 font-semibold text-sm shadow-sm">
              Zaloguj się
            </button>
            <button className="flex-1 py-2 rounded-lg text-gray-500 font-semibold text-sm hover:text-gray-700 transition-colors">
              Załóż konto
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h1 className="text-2xl font-bold text-navy-900 mb-2">
              Witaj z powrotem
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Wpisz dane, aby zalogować się do Brakomat.
            </p>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Adres e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jan@twoje-biuro.pl"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hasło
                  </label>
                  <a
                    href="#"
                    className="text-xs text-accent hover:text-accent-600 transition-colors"
                  >
                    Zapomniałem hasła
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                />
              </div>

              <Link
                href="/dashboard"
                className="block w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 rounded-xl text-sm text-center transition-colors mt-2"
              >
                Zaloguj się
              </Link>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Nie masz jeszcze konta?{" "}
                <a
                  href="#"
                  className="text-accent hover:text-accent-600 font-medium transition-colors"
                >
                  Zacznij za darmo — 14 dni
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
