import type { Metadata } from "next";
import Link from "next/link";
import { User, CreditCard, Bell, Shield, LogOut, ArrowRight, Star, Wrench, Award } from "lucide-react";

export const metadata: Metadata = { title: "Einstellungen" };

export default function EinstellungenPage() {
  return (
    <div className="bg-surface min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-text font-display mb-8">Einstellungen</h1>

        {/* Profile */}
        <div className="bg-white rounded-2xl border border-steel-200 p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-text-muted" />
            <h2 className="font-semibold text-text text-sm">Profil</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-steel-100">
              <span className="text-sm text-text-light">E-Mail</span>
              <span className="text-sm text-text">—</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-text-light">Mitglied seit</span>
              <span className="text-sm text-text">—</span>
            </div>
          </div>
        </div>

        {/* Plan */}
        <div className="bg-white rounded-2xl border border-steel-200 p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-text-muted" />
            <h2 className="font-semibold text-text text-sm">Dein Plan</h2>
          </div>
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-text text-sm">Basic</p>
                <p className="text-xs text-text-muted mt-0.5">12,99 &euro;/Monat</p>
              </div>
              <Star className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <Link
              href="/onboarding?plan=premium"
              className="flex items-center justify-between bg-surface rounded-xl p-3 hover:bg-steel-100 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-text">Premium — 19,99 &euro;/Mo</span>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary" />
            </Link>
            <Link
              href="/onboarding?plan=baumeister"
              className="flex items-center justify-between bg-surface rounded-xl p-3 hover:bg-steel-100 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-text">Baumeister — 59,99 &euro;/Mo</span>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent" />
            </Link>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl border border-steel-200 p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-text-muted" />
            <h2 className="font-semibold text-text text-sm">Datenschutz</h2>
          </div>
          <div className="space-y-3">
            <Link href="/datenschutz" className="flex items-center justify-between py-2 border-b border-steel-100 hover:text-primary transition-colors">
              <span className="text-sm text-text-light">Datenschutzerklaerung</span>
              <ArrowRight className="w-4 h-4 text-text-muted" />
            </Link>
            <Link href="/agb" className="flex items-center justify-between py-2 border-b border-steel-100 hover:text-primary transition-colors">
              <span className="text-sm text-text-light">AGB</span>
              <ArrowRight className="w-4 h-4 text-text-muted" />
            </Link>
            <button className="flex items-center justify-between py-2 w-full text-left hover:text-red-500 transition-colors">
              <span className="text-sm text-text-light">Alle Daten loeschen</span>
              <span className="text-xs text-text-muted">Unwiderruflich</span>
            </button>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 bg-white rounded-2xl border border-steel-200 p-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
          <LogOut className="w-4 h-4" />
          Abmelden
        </button>
      </div>
    </div>
  );
}
