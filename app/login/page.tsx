"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError("Nieprawidłowy email lub hasło.");
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setInfo(
        "Sprawdź skrzynkę emailową i kliknij link aktywacyjny, aby dokończyć rejestrację."
      );
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-6xl">
          <Link href="/" className="text-navy-900 font-bold text-lg">
            Brakomat
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="flex rounded-xl bg-gray-200 p-1 mb-8">
            <button
              onClick={() => { setMode("login"); setError(""); setInfo(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                mode === "login"
                  ? "bg-white text-navy-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Zaloguj sie
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); setInfo(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                mode === "signup"
                  ? "bg-white text-navy-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Zaloz konto
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h1 className="text-2xl font-bold text-navy-900 mb-2">
              {mode === "login" ? "Witaj z powrotem" : "Zacznij za darmo"}
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              {mode === "login"
                ? "Wpisz dane, aby zalogowac sie do Brakomat."
                : "14 dni bez karty kredytowej."}
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
                {error}
              </div>
            )}

            {info && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-5">
                {info}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jan@twoje-biuro.pl"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Haslo
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="minimum 6 znakow"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy-900 hover:bg-navy-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors mt-2"
              >
                {loading
                  ? "Ladowanie..."
                  : mode === "login"
                  ? "Zaloguj sie"
                  : "Zaloz konto"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
