import Link from "next/link";
import DemoWidget from "@/components/DemoWidget";
import PhotoUpload from "@/components/PhotoUpload";
import { CheckCircle, Hammer, Ruler, Wrench, Home, Zap, TreePine, ArrowRight } from "lucide-react";

const KATEGORIEN = [
  { icon: Hammer, label: "Mauerwerk & Rohbau", color: "text-primary" },
  { icon: Home, label: "Dach & Fassade", color: "text-steel-600" },
  { icon: Wrench, label: "Sanitaer & Heizung", color: "text-primary" },
  { icon: Ruler, label: "Innenausbau", color: "text-steel-600" },
  { icon: Zap, label: "Elektro & Technik", color: "text-accent" },
  { icon: TreePine, label: "Garten & Terrasse", color: "text-green-600" },
];

export default function HomePage() {
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
            Materialmengen, Kosten, Anleitungen — dein KI-Bauberater fuer jedes Projekt. Foto hochladen, Frage stellen, loslegen.
          </p>

          {/* Demo Widget */}
          <div className="w-full mt-2">
            <DemoWidget />
          </div>
        </div>
      </section>

      {/* Kategorie tiles */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm font-semibold text-text-muted uppercase tracking-widest mb-8">
            Beratung fuer alle Gewerke
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
              { step: "1", title: "Projekt beschreiben", desc: "Waehle dein Gewerk, gib die Flaeche an und stell deine Frage. Oder lade einfach ein Foto hoch." },
              { step: "2", title: "Sofort Antwort", desc: "Materialliste, Kostenabschaetzung und Schritt-fuer-Schritt-Anleitung — in Sekunden." },
              { step: "3", title: "Loslegen", desc: "Bestell das Material, schnapp dir das Werkzeug und leg los. Bei Fragen: frag nochmal." },
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text font-display">Klare Preise</h2>
            <p className="mt-2 text-text-light text-sm">30 Tage kostenlos testen. Keine Kreditkarte noetig.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Free */}
            <div className="rounded-2xl border border-steel-200 p-6 bg-surface">
              <h3 className="font-semibold text-text">Kostenlos</h3>
              <div className="mt-2 text-3xl font-bold text-text">
                0 &euro;<span className="text-base font-normal text-text-muted">/Monat</span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {["3 Bauberatungen pro Tag", "2 Foto-Analysen pro Tag", "Alle Kategorien", "Keine Registrierung"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-4 h-4 text-steel-300 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className="mt-6 block w-full text-center border border-steel-200 text-text-light font-medium py-2.5 rounded-xl hover:bg-steel-50 transition-colors text-sm"
              >
                Demo nutzen
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-primary p-6 bg-white relative shadow-card">
              <h3 className="font-semibold text-text">Baubegleiter Pro</h3>
              <div className="mt-2 text-3xl font-bold text-text">
                9,99 &euro;<span className="text-base font-normal text-text-muted">/Monat</span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Unbegrenzte Beratungen",
                  "Unbegrenzte Foto-Analysen",
                  "Projekte speichern",
                  "Materiallisten exportieren",
                  "Jederzeit kuendbar",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-600 transition-colors text-sm"
              >
                Kostenlos starten
                <ArrowRight className="w-4 h-4" />
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
            Starte jetzt kostenlos — kein Abo, kein Risiko.
          </p>
          <Link
            href="/onboarding"
            className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-600 transition-colors"
          >
            Jetzt kostenlos starten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
