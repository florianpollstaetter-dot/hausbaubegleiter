"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

const KATEGORIEN = [
  { value: "mauerwerk", label: "Mauerwerk & Wände" },
  { value: "dach", label: "Dacharbeiten" },
  { value: "fliesen", label: "Fliesen & Boden" },
  { value: "sanitaer", label: "Sanitär & Bad" },
  { value: "garten", label: "Garten & Terrasse" },
  { value: "garage", label: "Garage & Carport" },
  { value: "daemmung", label: "Dämmung & Energie" },
  { value: "trockenbau", label: "Trockenbau" },
];

const CARD_STYLES: Record<string, { bg: string; border: string }> = {
  "ueberblick": { bg: "bg-blue-50", border: "border-blue-200" },
  "materialliste": { bg: "bg-amber-50", border: "border-amber-200" },
  "geschaetzte kosten": { bg: "bg-green-50", border: "border-green-200" },
  "schritt fuer schritt": { bg: "bg-slate-50", border: "border-slate-200" },
  "schritt für schritt": { bg: "bg-slate-50", border: "border-slate-200" },
  "profi-tipp": { bg: "bg-primary-50", border: "border-primary-200" },
  "sicherheitshinweis": { bg: "bg-red-50", border: "border-red-200" },
};

const DEFAULT_CARD_STYLE = { bg: "bg-steel-50", border: "border-steel-200" };

interface Section {
  title: string;
  content: string;
}

function parseAdviceIntoSections(text: string): Section[] {
  const lines = text.split("\n");
  const sections: Section[] = [];
  let currentTitle = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    const headerMatch = line.match(/^#{1,3}\s+(.+)/);
    const boldHeaderMatch = !headerMatch ? line.match(/^\*\*\d*\.?\s*(.+?)\*\*$/) : null;

    if (headerMatch || boldHeaderMatch) {
      if (currentTitle && currentContent.length > 0) {
        sections.push({ title: currentTitle, content: currentContent.join("\n").trim() });
      }
      const matched = headerMatch ?? boldHeaderMatch;
      currentTitle = (matched?.[1] ?? "").replace(/\*\*/g, "").trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentTitle && currentContent.length > 0) {
    sections.push({ title: currentTitle, content: currentContent.join("\n").trim() });
  }

  if (sections.length === 0) {
    sections.push({ title: "Empfehlung", content: text.trim() });
  }

  return sections;
}

export default function DemoWidget() {
  const [kategorie, setKategorie] = useState("");
  const [flaeche, setFlaeche] = useState("");
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rateLimited, setRateLimited] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setAdvice("");
    setLoading(true);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kategorie,
          flaeche: flaeche ? parseFloat(flaeche) : undefined,
          question: question.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) setRateLimited(true);
        setError(data.error ?? "Ein Fehler ist aufgetreten.");
      } else {
        setAdvice(data.advice);
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuch es nochmal.");
    } finally {
      setLoading(false);
    }
  }

  const sections = advice ? parseAdviceIntoSections(advice) : [];

  return (
    <div className="bg-white rounded-2xl shadow-float border border-steel-200 overflow-hidden">
      {!advice ? (
        <form onSubmit={handleSubmit} className="p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-5">
            <Wrench className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-text">Kostenlose Bauberatung — sofort, ohne Anmeldung</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label htmlFor="kategorie" className="block text-xs font-medium text-text-light mb-1.5">
                Was baust du?
              </label>
              <select
                id="kategorie"
                value={kategorie}
                onChange={(e) => setKategorie(e.target.value)}
                required
                className="w-full border border-steel-200 rounded-xl px-4 py-3 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
              >
                <option value="">Kategorie waehlen ...</option>
                {KATEGORIEN.map((k) => (
                  <option key={k.value} value={k.value}>
                    {k.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="flaeche" className="block text-xs font-medium text-text-light mb-1.5">
                Flaeche in m² (optional)
              </label>
              <input
                id="flaeche"
                type="number"
                min={1}
                max={10000}
                step="0.1"
                value={flaeche}
                onChange={(e) => setFlaeche(e.target.value)}
                placeholder="z.B. 25"
                className="w-full border border-steel-200 rounded-xl px-4 py-3 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="question" className="block text-xs font-medium text-text-light mb-1.5">
              Deine Frage (optional)
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="z.B. Wie viele Ziegel brauche ich fuer eine Garage mit 25 m²? Was kostet das ungefaehr?"
              rows={2}
              className="w-full border border-steel-200 rounded-xl px-4 py-3 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 mb-3">
              {error}
              {rateLimited && (
                <div className="mt-1.5">
                  <Link href="/onboarding" className="font-semibold underline">
                    Jetzt kostenlos registrieren →
                  </Link>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !kategorie}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Beratung wird erstellt ...
              </>
            ) : (
              <>
                Bauberatung starten
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="p-6 sm:p-7 space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-text">
            Deine Bauberatung
          </h2>

          <div className="space-y-3">
            {sections.map((section, i) => {
              const key = section.title.toLowerCase();
              const style = CARD_STYLES[key] ?? DEFAULT_CARD_STYLE;
              return (
                <div
                  key={i}
                  className={`${style.bg} border ${style.border} rounded-xl p-4`}
                >
                  <h3 className="font-display text-sm font-bold text-text mb-1.5">{section.title}</h3>
                  <div className="text-sm text-text-light leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-steel-200 pt-4 space-y-3">
            <p className="text-xs text-text-muted">
              Das war eine kostenlose Kurzberatung. Fuer unbegrenzte Nutzung, Foto-Analyse und Projekt-Speicherung:
            </p>
            <Link
              href="/onboarding"
              className="flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-600 transition-colors text-sm"
            >
              Kostenlos registrieren
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                setAdvice("");
                setError("");
                setKategorie("");
                setFlaeche("");
                setQuestion("");
                setRateLimited(false);
              }}
              className="w-full text-center text-text-muted text-xs hover:text-text transition-colors py-1"
            >
              Neue Anfrage stellen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
