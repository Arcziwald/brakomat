import Link from "next/link";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ForWho } from "@/components/landing/ForWho";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <>
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur border-b border-navy-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
          <span className="text-white text-xl font-bold tracking-tight">
            Brakomat
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-navy-300">
            <a href="#jak-to-dziala" className="hover:text-white transition-colors">
              Jak to działa
            </a>
            <a href="#cena" className="hover:text-white transition-colors">
              Cena
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-navy-300 hover:text-white transition-colors"
            >
              Zaloguj się
            </Link>
            <Link
              href="/login"
              className="bg-accent hover:bg-accent-500 text-navy-900 text-sm font-bold px-5 py-2 rounded-lg transition-colors"
            >
              Zacznij za darmo
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <ForWho />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <footer className="bg-navy-950 text-navy-500 text-sm py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl">
          <span className="font-bold text-navy-400">Brakomat</span>
          <span>© 2025 Brakomat. Wszystkie prawa zastrzeżone.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Polityka prywatności
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Regulamin
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
