"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

const PLAN_NAMES: Record<string, string> = {
  basic: "Basic",
  premium: "Premium",
  baumeister: "Baumeister",
};

const PLAN_PRICES: Record<string, string> = {
  basic: "12,99",
  premium: "19,99",
  baumeister: "59,99",
};

export default function RegistrierungPage() {
  return (
    <Suspense fallback={<div className="bg-surface min-h-screen flex items-center justify-center"><p className="text-text-muted text-sm">Laden ...</p></div>}>
      <RegistrierungContent />
    </Suspense>
  );
}

function RegistrierungContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "basic";
  const planName = PLAN_NAMES[plan] ?? "Basic";
  const planPrice = PLAN_PRICES[plan] ?? "12,99";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [dsgvoConsent, setDsgvoConsent] = useState(false);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !dsgvoConsent) return;
    setLoading(true);
    // TODO: Connect to Supabase auth
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  }

  if (sent) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center space-y-4">
          <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mx-auto">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-text font-display">E-Mail versendet</h1>
          <p className="text-sm text-text-light">
            Wir haben dir einen Anmeldelink an <strong>{email}</strong> geschickt. Klick auf den Link um dein Konto zu erstellen.
          </p>
          <p className="text-xs text-text-muted">Kein E-Mail erhalten? Pruefe deinen Spam-Ordner.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-primary-100 mb-4">
            {planName} — {planPrice} &euro;/Mo
          </div>
          <h1 className="text-xl font-bold text-text font-display">Konto erstellen</h1>
          <p className="text-sm text-text-light mt-1">Registriere dich um loszulegen.</p>
        </div>

        <div className="bg-white rounded-2xl border border-steel-200 p-6 space-y-4">
          {/* OAuth buttons */}
          <button
            className="w-full flex items-center justify-center gap-3 border border-steel-200 rounded-xl py-3 text-sm font-medium text-text hover:bg-steel-50 transition-colors"
            onClick={() => {/* TODO: Supabase Google OAuth */}}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Mit Google anmelden
          </button>

          <button
            className="w-full flex items-center justify-center gap-3 border border-steel-200 rounded-xl py-3 text-sm font-medium text-text hover:bg-steel-50 transition-colors"
            onClick={() => {/* TODO: Supabase Apple OAuth */}}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            Mit Apple anmelden
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-steel-200" />
            <span className="text-xs text-text-muted">oder</span>
            <div className="flex-1 h-px bg-steel-200" />
          </div>

          {/* Email */}
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-text-light mb-1.5">E-Mail-Adresse</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  className="w-full border border-steel-200 rounded-xl pl-10 pr-4 py-2.5 text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
                />
              </div>
            </div>

            {/* DSGVO consent */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dsgvoConsent}
                onChange={(e) => setDsgvoConsent(e.target.checked)}
                className="mt-0.5 rounded border-steel-300 text-primary focus:ring-primary/30"
              />
              <span className="text-xs text-text-muted leading-relaxed">
                Ich stimme den{" "}
                <Link href="/agb" className="text-primary hover:underline">AGB</Link>{" "}
                und{" "}
                <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzhinweisen</Link>{" "}
                zu. Meine Daten werden DSGVO-konform verarbeitet.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !email || !dsgvoConsent}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? "Wird gesendet ..." : (
                <>
                  Anmeldelink senden
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-text-muted mt-4">
          Kein Passwort noetig — wir senden dir einen sicheren Anmeldelink per E-Mail.
        </p>
      </div>
    </div>
  );
}
