import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Star, Wrench, Award } from "lucide-react";

export const metadata: Metadata = { title: "Starten" };

export default function OnboardingPage() {
  return (
    <div className="bg-surface min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-text font-display">Waehle deinen Plan</h1>
          <p className="mt-2 text-text-light text-sm">Unbegrenzter Zugang zu deinem KI-Bauberater.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {/* Basic */}
          <div className="rounded-2xl border border-steel-200 p-6 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-text">Basic</h3>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-text">12,99 &euro;<span className="text-sm font-normal text-text-muted">/Mo</span></div>
              <p className="text-xs text-green-600 mt-0.5">oder 129 &euro;/Jahr</p>
            </div>
            <ul className="mt-4 space-y-2">
              {["Unbegrenzte Bauberatungen", "Alle 12 Kategorien", "Materiallisten & Kosten", "Jederzeit kuendbar"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-text-light">
                  <CheckCircle className="w-3.5 h-3.5 text-steel-300 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/onboarding/registrierung?plan=basic"
              className="mt-5 block w-full text-center border border-primary text-primary font-medium py-2.5 rounded-xl hover:bg-primary-50 transition-colors text-sm"
            >
              Basic waehlen
            </Link>
          </div>

          {/* Premium */}
          <div className="rounded-2xl border-2 border-primary p-6 bg-white relative shadow-card">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              EMPFOHLEN
            </span>
            <div className="flex items-center gap-2 mb-1">
              <Wrench className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-text">Premium</h3>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-text">19,99 &euro;<span className="text-sm font-normal text-text-muted">/Mo</span></div>
              <p className="text-xs text-green-600 mt-0.5">oder 199 &euro;/Jahr</p>
            </div>
            <ul className="mt-4 space-y-2">
              {["Alles aus Basic", "Erinnert sich an deine Fragen", "Kennt dich und dein Projekt", "Foto-Analyse (unbegrenzt)", "Personalisierte Empfehlungen"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-text-light">
                  <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/onboarding/registrierung?plan=premium"
              className="mt-5 flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-600 transition-colors text-sm"
            >
              Premium waehlen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Baumeister */}
          <div className="rounded-2xl border border-steel-200 p-6 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-accent" />
              <h3 className="font-semibold text-text">Baumeister</h3>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-text">59,99 &euro;<span className="text-sm font-normal text-text-muted">/Mo</span></div>
              <p className="text-xs text-green-600 mt-0.5">oder 599 &euro;/Jahr</p>
            </div>
            <p className="text-xs text-text-muted mt-2">Fuer Firmen und Teams</p>
            <ul className="mt-4 space-y-2">
              {["Alles aus Premium", "Bis zu 5 Nutzer / Team", "Projekte gliedern & verwalten", "Personalisiert pro Mitglied", "Prioritaets-Support"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-text-light">
                  <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/onboarding/registrierung?plan=baumeister"
              className="mt-5 block w-full text-center bg-accent text-white font-semibold py-2.5 rounded-xl hover:bg-accent-600 transition-colors text-sm"
            >
              Baumeister waehlen
            </Link>
          </div>
        </div>

        {/* DSGVO note */}
        <div className="text-center">
          <p className="text-xs text-text-muted">
            Mit der Registrierung stimmst du unseren{" "}
            <Link href="/agb" className="text-primary hover:underline">AGB</Link>{" "}
            und{" "}
            <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzhinweisen</Link>{" "}
            zu.
          </p>
        </div>
      </div>
    </div>
  );
}
