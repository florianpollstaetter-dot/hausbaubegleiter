"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Wrench, Sparkles } from "lucide-react";

const KATEGORIEN = [
  { value: "hausbau", label: "Hausbau / Neubau" },
  { value: "wohnungsbau", label: "Wohnungsbau / Umbau" },
  { value: "haussanierung", label: "Haussanierung" },
  { value: "wohnungssanierung", label: "Wohnungssanierung" },
  { value: "gartengestaltung", label: "Gartengestaltung" },
  { value: "innenausbau", label: "Innenausbau" },
  { value: "dach_fassade", label: "Dach & Fassade" },
  { value: "sanitaer_bad", label: "Sanitaer & Bad" },
  { value: "heizung_energie", label: "Heizung & Energie" },
  { value: "elektro", label: "Elektro & Smart Home" },
  { value: "garage_carport", label: "Garage & Carport" },
  { value: "keller", label: "Keller & Fundament" },
];

const CARD_STYLES: Record<string, { bg: string; border: string }> = {
  "ueberblick": { bg: "bg-blue-50", border: "border-blue-200" },
  "überblick": { bg: "bg-blue-50", border: "border-blue-200" },
  "materialliste": { bg: "bg-amber-50", border: "border-amber-200" },
  "geschaetzte kosten": { bg: "bg-green-50", border: "border-green-200" },
  "geschätzte kosten": { bg: "bg-green-50", border: "border-green-200" },
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
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trialExpired, setTrialExpired] = useState(false);

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
          question: question.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "trial_expired") {
          setTrialExpired(true);
          return;
        }
        setError(data.message ?? data.error ?? "Ein Fehler ist aufgetreten.");
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
  const isFormValid = kategorie && question.trim();

  if (trialExpired) {
    return (
      <div className="bg-white rounded-2xl shadow-float border border-steel-200 overflow-hidden p-6 sm:p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mx-auto">
          <Wrench className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-text font-display">Hat dir die Beratung geholfen?</h2>
        <p className="text-sm text-text-light leading-relaxed max-w-md mx-auto">
          Du hast deine kostenlose Beratung erhalten. Waehle einen Plan fuer unbegrenzten Zugang zu Materiallisten, Kostenkalkulationen und Foto-Analysen.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/onboarding?plan=basic"
            className="flex-1 text-center bg-white border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary-50 transition-colors text-sm"
          >
            Basic — 12,99 &euro;/Mo
          </Link>
          <Link
            href="/onboarding?plan=pro"
            className="flex-1 text-center bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-600 transition-colors text-sm shadow-sm"
          >
            Pro — 19,99 &euro;/Mo
          </Link>
          <Link
            href="/onboarding?plan=baumeister"
            className="flex-1 text-center bg-accent text-white font-semibold py-3 rounded-xl hover:bg-accent-600 transition-colors text-sm"
          >
            Baumeister — 29,99 &euro;/Mo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-float border border-steel-200 overflow-hidden">
      {!advice ? (
        <form onSubmit={handleSubmit} className="p-5 sm:p-7">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-text">Jetzt kostenlos ausprobieren</span>
            </div>
            <p className="text-xs text-text-muted">Eine Beratung gratis — sofort, ohne Anmeldung.</p>
          </div>

          <div className="mb-3">
            <label htmlFor="kategorie" className="block text-xs font-medium text-text-light mb-1.5">
              Was planst du?
            </label>
            <select
              id="kategorie"
              value={kategorie}
              onChange={(e) => setKategorie(e.target.value)}
              required
              className="w-full border border-steel-200 rounded-xl px-4 py-3 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
            >
              <option value="">Projekt waehlen ...</option>
              {KATEGORIEN.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="question" className="block text-xs font-medium text-text-light mb-1.5">
              Deine Frage
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              placeholder="z.B. Wie viele Ziegel brauche ich fuer eine Garage mit 25 m²? Was kostet das ungefaehr?"
              rows={3}
              className="w-full border border-steel-200 rounded-xl px-4 py-3 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 mb-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isFormValid}
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
              Das war deine kostenlose Beratung. Fuer unbegrenzten Zugang:
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/onboarding?plan=basic"
                className="flex-1 text-center bg-white border border-primary text-primary font-semibold py-2.5 rounded-xl hover:bg-primary-50 transition-colors text-sm"
              >
                Basic — 12,99 &euro;/Mo
              </Link>
              <Link
                href="/onboarding?plan=pro"
                className="flex-1 text-center bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-600 transition-colors text-sm"
              >
                Pro — 19,99 &euro;/Mo
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
