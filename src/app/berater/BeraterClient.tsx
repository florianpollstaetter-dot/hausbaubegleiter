"use client";

import { useState, useRef } from "react";
import { Send, Camera, ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";

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

interface Message {
  role: "user" | "assistant";
  content: string;
  photo?: string;
}

interface Section {
  title: string;
  content: string;
}

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
  "was ich sehe": { bg: "bg-blue-50", border: "border-blue-200" },
  "analyse": { bg: "bg-amber-50", border: "border-amber-200" },
  "empfehlung": { bg: "bg-green-50", border: "border-green-200" },
};

const DEFAULT_CARD_STYLE = { bg: "bg-steel-50", border: "border-steel-200" };

function parseSections(text: string): Section[] {
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
  if (sections.length === 0 && text.trim()) {
    sections.push({ title: "Antwort", content: text.trim() });
  }
  return sections;
}

export default function BeraterClient() {
  const [kategorie, setKategorie] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhotoFile(f);
    setPhotoPreview(URL.createObjectURL(f));
  }

  function clearPhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if ((!input.trim() && !photoFile) || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim() || "Analysiere dieses Foto",
      photo: photoPreview ?? undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    try {
      let responseText = "";

      if (photoFile) {
        const formData = new FormData();
        formData.append("photo", photoFile);
        if (input.trim()) formData.append("question", input.trim());

        const res = await fetch("/api/analyze-photo", { method: "POST", body: formData });
        const data = await res.json();
        responseText = data.analysis ?? data.message ?? data.error ?? "Fehler bei der Analyse.";
        clearPhoto();
      } else {
        const res = await fetch("/api/demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kategorie: kategorie || "hausbau", question: input.trim() }),
        });
        const data = await res.json();
        responseText = data.advice ?? data.message ?? data.error ?? "Fehler bei der Beratung.";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Verbindungsfehler. Bitte versuch es nochmal." }]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-steel-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="p-1.5 rounded-lg hover:bg-steel-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-text-light" />
          </Link>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-text">Bauberater</h1>
            <p className="text-xs text-text-muted">Frag mich alles rund ums Bauen</p>
          </div>
          <select
            value={kategorie}
            onChange={(e) => setKategorie(e.target.value)}
            className="text-xs border border-steel-200 rounded-lg px-2.5 py-1.5 text-text-light bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Alle Kategorien</option>
            {KATEGORIEN.map((k) => (
              <option key={k.value} value={k.value}>{k.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-text font-display mb-1">Stell deine Frage</h2>
              <p className="text-sm text-text-muted max-w-md mx-auto">
                Waehle eine Kategorie, stell deine Baufrage oder lade ein Foto hoch. Du erhaeltst Materiallisten, Kosten und Schritt-fuer-Schritt-Anleitungen.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] ${msg.role === "user" ? "order-last" : ""}`}>
                {msg.role === "user" ? (
                  <div className="bg-primary text-white rounded-2xl rounded-br-md px-4 py-3">
                    {msg.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={msg.photo} alt="Upload" className="rounded-xl max-h-48 mb-2" />
                    )}
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {parseSections(msg.content).map((section, j) => {
                      const key = section.title.toLowerCase();
                      const style = CARD_STYLES[key] ?? DEFAULT_CARD_STYLE;
                      return (
                        <div key={j} className={`${style.bg} border ${style.border} rounded-xl p-4`}>
                          <h3 className="font-display text-sm font-bold text-text mb-1">{section.title}</h3>
                          <div className="text-sm text-text-light leading-relaxed whitespace-pre-wrap">{section.content}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-steel-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Beratung wird erstellt ...
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Photo preview */}
      {photoPreview && (
        <div className="border-t border-steel-200 bg-white px-4 py-2">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoPreview} alt="Vorschau" className="w-16 h-16 rounded-lg object-cover" />
            <span className="text-xs text-text-muted flex-1">Foto bereit zum Senden</span>
            <button onClick={clearPhoto} className="p-1.5 rounded-lg hover:bg-steel-50">
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-steel-200 bg-white px-4 py-3">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-end gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="p-2.5 rounded-xl text-text-muted hover:text-primary hover:bg-primary-50 transition-colors flex-shrink-0"
          >
            <Camera className="w-5 h-5" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Deine Baufrage ..."
              rows={1}
              className="w-full border border-steel-200 rounded-xl px-4 py-2.5 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading || (!input.trim() && !photoFile)}
            className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
