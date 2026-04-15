"use client";

import { useState } from "react";
import Link from "next/link";
import DemoWidget from "@/components/DemoWidget";
import PhotoUpload from "@/components/PhotoUpload";
import { CheckCircle, Hammer, Ruler, Wrench, Home, Zap, TreePine, ArrowRight, Star, Award } from "lucide-react";

const KATEGORIEN = [
  { icon: Home, label: "Hausbau & Neubau", color: "text-primary" },
  { icon: Wrench, label: "Sanierung & Renovierung", color: "text-steel-600" },
  { icon: TreePine, label: "Gartengestaltung", color: "text-green-600" },
  { icon: Ruler, label: "Innenausbau", color: "text-primary" },
  { icon: Hammer, label: "Dach & Fassade", color: "text-steel-600" },
  { icon: Zap, label: "Elektro & Heizung", color: "text-accent" },
];

export default function HomePage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-primary-100">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            KI-Bauberater
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight tracking-tight text-balance font-display">
            Bau smarter.{" "}
            <span className="text-primary">Nicht teurer.</span>
          </h1>

          <p className="text-base sm:text-lg text-text-light max-w-lg text-balance leading-relaxed">
            Materialmengen, Kosten, Anleitungen — dein KI-Bauberater fuer jedes Projekt. Frage stellen, Foto hochladen, loslegen.
          </p>

          <div className="w-full mt-2">
            <DemoWidget />
          </div>
        </div>
      </section>

      {/* Kategorie tiles */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm font-semibold text-text-muted uppercase tracking-widest mb-8">
            Beratung fuer alle Projekte
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {KATEGORIEN.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 border border-steel-200 cursor-default"
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                <span className="text-sm font-medium text-text">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foto-Analyse */}
      <section className="py-20 px-4" id="foto-analyse">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-text font-display">Foto hochladen, Analyse erhalten</h2>
            <p className="mt-2 text-text-light text-sm">Lade ein Foto deines Projekts hoch und erhalte eine Analyse mit Empfehlungen.</p>
          </div>
          <PhotoUpload />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white" id="so-funktionierts">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text font-display">So funktioniert es</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Projekt & Frage", desc: "Waehle dein Projekt, stell deine Frage oder lade ein Foto hoch." },
              { step: "2", title: "Sofort Antwort", desc: "Materialliste, Kostenabschaetzung und Schritt-fuer-Schritt-Anleitung — in Sekunden." },
              { step: "3", title: "Loslegen", desc: "Bestell das Material, schnapp dir das Werkzeug und leg los." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-4 border border-primary-100">
                  {step}
                </div>
                <h3 className="font-semibold text-text mb-2 text-sm">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4" id="preise">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-text font-display">Klare Preise</h2>
            <p className="mt-2 text-text-light text-sm">Einmal kostenlos testen. Dann den passenden Plan waehlen.</p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-1 bg-steel-100 rounded-xl p-1 mt-6">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  billing === "monthly" ? "bg-white text-text shadow-sm" : "text-text-muted hover:text-text"
                }`}
              >
                Monatlich
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  billing === "annual" ? "bg-white text-text shadow-sm" : "text-text-muted hover:text-text"
                }`}
              >
                Jaehrlich <span className="text-green-600 text-xs font-semibold">spare bis zu 17%</span>
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {/* Basic */}
            <div className="rounded-2xl border border-steel-200 p-6 bg-surface">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-text">Basic</h3>
              </div>
              <div className="mt-2 text-3xl font-bold text-text">
                {billing === "monthly" ? "12,99" : "10,75"} &euro;
                <span className="text-base font-normal text-text-muted">/Mo</span>
              </div>
              {billing === "annual" && (
                <p className="text-xs text-green-600 mt-1">129 &euro;/Jahr (statt 155,88 &euro;)</p>
              )}
              <ul className="mt-5 space-y-2.5">
                {[
                  "Unbegrenzte Bauberatungen",
                  "Alle 12 Kategorien",
                  "Materiallisten & Kosten",
                  "Jederzeit kuendbar",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-4 h-4 text-steel-300 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding?plan=basic"
                className="mt-6 block w-full text-center border border-primary text-primary font-medium py-2.5 rounded-xl hover:bg-primary-50 transition-colors text-sm"
              >
                Basic starten
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-primary p-6 bg-white relative shadow-card">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                EMPFOHLEN
              </span>
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-text">Premium</h3>
              </div>
              <div className="mt-2 text-3xl font-bold text-text">
                {billing === "monthly" ? "19,99" : "16,58"} &euro;
                <span className="text-base font-normal text-text-muted">/Mo</span>
              </div>
              {billing === "annual" && (
                <p className="text-xs text-green-600 mt-1">199 &euro;/Jahr (statt 239,88 &euro;)</p>
              )}
              <ul className="mt-5 space-y-2.5">
                {[
                  "Alles aus Basic",
                  "Erinnert sich an deine Fragen",
                  "Kennt dich und dein Projekt",
                  "Foto-Analyse (unbegrenzt)",
                  "Personalisierte Empfehlungen",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding?plan=premium"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-600 transition-colors text-sm"
              >
                Premium starten
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Baumeister */}
            <div className="rounded-2xl border border-steel-200 p-6 bg-surface">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-text">Baumeister</h3>
              </div>
              <div className="mt-2 text-3xl font-bold text-text">
                {billing === "monthly" ? "59,99" : "49,92"} &euro;
                <span className="text-base font-normal text-text-muted">/Mo</span>
              </div>
              {billing === "annual" && (
                <p className="text-xs text-green-600 mt-1">599 &euro;/Jahr (statt 719,88 &euro;)</p>
              )}
              <ul className="mt-5 space-y-2.5">
                {[
                  "Alles aus Premium",
                  "Bis zu 5 Nutzer / Team",
                  "Projekte gliedern & verwalten",
                  "Personalisiert fuer jedes Teammitglied",
                  "Prioritaets-Support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding?plan=baumeister"
                className="mt-6 block w-full text-center bg-accent text-white font-semibold py-2.5 rounded-xl hover:bg-accent-600 transition-colors text-sm"
              >
                Baumeister starten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 bg-white border-t border-steel-200">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-text-muted leading-relaxed">
            Hinweis: Hausbaubegleiter ersetzt keine professionelle Bauberatung. Fuer tragende Konstruktionen, Elektrik und Gas immer einen Fachmann hinzuziehen. Alle Kostenangaben sind Richtwerte fuer den DACH-Raum.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text text-balance font-display">
            Dein naechstes Projekt wartet
          </h2>
          <p className="mt-3 text-text-light">
            Einmal kostenlos testen — dann den passenden Plan waehlen.
          </p>
          <Link
            href="/onboarding"
            className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-600 transition-colors"
          >
            Jetzt kostenlos testen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
