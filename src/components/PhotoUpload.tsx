"use client";

import { useState, useRef } from "react";
import { Upload, X, Camera, ArrowRight, Wrench } from "lucide-react";
import Link from "next/link";

interface Section {
  title: string;
  content: string;
}

const CARD_STYLES: Record<string, { bg: string; border: string }> = {
  "was ich sehe": { bg: "bg-blue-50", border: "border-blue-200" },
  "analyse": { bg: "bg-amber-50", border: "border-amber-200" },
  "empfehlung": { bg: "bg-green-50", border: "border-green-200" },
  "geschaetzte kosten": { bg: "bg-primary-50", border: "border-primary-200" },
  "geschätzte kosten": { bg: "bg-primary-50", border: "border-primary-200" },
};

const DEFAULT_CARD_STYLE = { bg: "bg-steel-50", border: "border-steel-200" };

function parseSections(text: string): Section[] {
  const lines = text.split("\n");
  const sections: Section[] = [];
  let currentTitle = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    const headerMatch = line.match(/^#{1,3}\s+(.+)/);
    if (headerMatch) {
      if (currentTitle && currentContent.length > 0) {
        sections.push({ title: currentTitle, content: currentContent.join("\n").trim() });
      }
      currentTitle = headerMatch[1].trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  if (currentTitle && currentContent.length > 0) {
    sections.push({ title: currentTitle, content: currentContent.join("\n").trim() });
  }
  if (sections.length === 0) {
    sections.push({ title: "Analyse", content: text.trim() });
  }
  return sections;
}

export default function PhotoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trialExpired, setTrialExpired] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
    setAnalysis("");
  }

  function clearFile() {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError("");
    setAnalysis("");

    const formData = new FormData();
    formData.append("photo", file);
    if (question.trim()) formData.append("question", question.trim());

    try {
      const res = await fetch("/api/analyze-photo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "trial_expired") {
          setTrialExpired(true);
          return;
        }
        setError(data.message ?? data.error ?? "Analyse fehlgeschlagen.");
      } else {
        setAnalysis(data.analysis);
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuch es nochmal.");
    } finally {
      setLoading(false);
    }
  }

  const sections = analysis ? parseSections(analysis) : [];

  if (trialExpired) {
    return (
      <div className="bg-white rounded-2xl shadow-float border border-steel-200 overflow-hidden p-6 sm:p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center mx-auto">
          <Camera className="w-7 h-7 text-accent" />
        </div>
        <h2 className="text-xl font-bold text-text font-display">Foto-Analyse hat geklappt?</h2>
        <p className="text-sm text-text-light leading-relaxed max-w-md mx-auto">
          Du hast deine kostenlose Foto-Analyse erhalten. Waehle einen Plan fuer unbegrenzte Analysen.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/onboarding?plan=premium" className="flex-1 text-center bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-600 transition-colors text-sm shadow-sm">
            Premium — 19,99 &euro;
          </Link>
          <Link href="/onboarding?plan=baumeister" className="flex-1 text-center bg-accent text-white font-semibold py-3 rounded-xl hover:bg-accent-600 transition-colors text-sm">
            Baumeister — 59,99 &euro;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-float border border-steel-200 overflow-hidden">
      {!analysis ? (
        <form onSubmit={handleSubmit} className="p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-5">
            <Camera className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-text">Foto-Analyse — lade ein Bild hoch</span>
          </div>

          {/* Upload area */}
          {!preview ? (
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-steel-300 rounded-xl p-8 cursor-pointer hover:border-primary hover:bg-primary-50/30 transition-colors mb-3"
            >
              <Upload className="w-8 h-8 text-text-muted mb-2" />
              <span className="text-sm font-medium text-text-light">Foto hochladen</span>
              <span className="text-xs text-text-muted mt-1">JPG, PNG, WebP — max 10 MB</span>
              <input
                ref={fileRef}
                id="photo-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Vorschau"
                className="w-full max-h-64 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={clearFile}
                className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-sm hover:bg-white transition-colors"
              >
                <X className="w-4 h-4 text-text" />
              </button>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="photo-question" className="block text-xs font-medium text-text-light mb-1.5">
              Was moechtest du wissen? (optional)
            </label>
            <textarea
              id="photo-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="z.B. Was wuerde es kosten, diese Terrasse neu zu gestalten?"
              rows={2}
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
            disabled={loading || !file}
            className="w-full flex items-center justify-center gap-2 bg-accent text-white font-semibold py-3.5 rounded-xl hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Foto wird analysiert ...
              </>
            ) : (
              <>
                Foto analysieren
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="p-6 sm:p-7 space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-text">
            Foto-Analyse
          </h2>

          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Analysiertes Foto" className="w-full max-h-48 object-cover rounded-xl" />
          )}

          <div className="space-y-3">
            {sections.map((section, i) => {
              const key = section.title.toLowerCase();
              const style = CARD_STYLES[key] ?? DEFAULT_CARD_STYLE;
              return (
                <div key={i} className={`${style.bg} border ${style.border} rounded-xl p-4`}>
                  <h3 className="font-display text-sm font-bold text-text mb-1.5">{section.title}</h3>
                  <div className="text-sm text-text-light leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-steel-200 pt-4 space-y-3">
            <Link
              href="/onboarding"
              className="flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-600 transition-colors text-sm"
            >
              Kostenlos registrieren
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                setAnalysis("");
                setError("");
                clearFile();
                setQuestion("");
              }}
              className="w-full text-center text-text-muted text-xs hover:text-text transition-colors py-1"
            >
              Neues Foto analysieren
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
