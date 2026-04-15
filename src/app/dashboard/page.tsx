import type { Metadata } from "next";
import Link from "next/link";
import { Hammer, Camera, FolderOpen, ArrowRight, Clock, Zap } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="bg-surface min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text font-display">Willkommen zurueck</h1>
          <p className="text-sm text-text-light mt-1">Was moechtest du heute bauen?</p>
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <Link
            href="/berater"
            className="flex items-center gap-4 bg-white rounded-2xl border border-steel-200 p-5 hover:shadow-card transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Hammer className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text text-sm">Neue Bauberatung</h3>
              <p className="text-xs text-text-muted mt-0.5">Frage stellen, Antwort erhalten</p>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
          </Link>

          <Link
            href="/berater?tab=foto"
            className="flex items-center gap-4 bg-white rounded-2xl border border-steel-200 p-5 hover:shadow-card transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0">
              <Camera className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text text-sm">Foto analysieren</h3>
              <p className="text-xs text-text-muted mt-0.5">Bild hochladen, Empfehlung erhalten</p>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
          </Link>
        </div>

        {/* Recent activity */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text font-display">Letzte Beratungen</h2>
            <Link href="/berater" className="text-xs text-primary hover:underline">Alle ansehen</Link>
          </div>
          <div className="bg-white rounded-2xl border border-steel-200 p-8 text-center">
            <Clock className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-light">Noch keine Beratungen.</p>
            <p className="text-xs text-text-muted mt-1">Starte deine erste Bauberatung — es dauert nur Sekunden.</p>
            <Link
              href="/berater"
              className="mt-4 inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-colors"
            >
              Erste Beratung starten
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Projects (Premium/Baumeister) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text font-display">Projekte</h2>
          </div>
          <div className="bg-white rounded-2xl border border-steel-200 p-8 text-center">
            <FolderOpen className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-light">Projekte sind in Premium und Baumeister verfuegbar.</p>
            <p className="text-xs text-text-muted mt-1">Organisiere deine Bauprojekte und behalte den Ueberblick.</p>
          </div>
        </div>

        {/* Plan info */}
        <div className="mt-10 bg-white rounded-2xl border border-steel-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-text">Dein Plan: <span className="text-primary">Basic</span></p>
              <p className="text-xs text-text-muted">Unbegrenzte Beratungen, alle Kategorien</p>
            </div>
          </div>
          <Link
            href="/einstellungen"
            className="text-xs text-primary hover:underline font-medium"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}
