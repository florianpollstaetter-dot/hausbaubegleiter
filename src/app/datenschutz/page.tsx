import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <div className="bg-surface min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto prose prose-sm prose-slate">
        <h1 className="text-2xl font-bold text-text font-display mb-6">Datenschutzerklaerung</h1>
        <p className="text-xs text-text-muted mb-8">Stand: April 2026</p>

        <h2>1. Verantwortlicher</h2>
        <p>Florian Pollstaetter<br />[Strasse Hausnummer]<br />[PLZ Ort], Deutschland<br />E-Mail: florian.pollstaetter@gmail.com</p>

        <h2>2. Rechtsgrundlage</h2>
        <p>Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage der DSGVO, insbesondere:</p>
        <ul>
          <li>Art. 6 Abs. 1 lit. a (Einwilligung)</li>
          <li>Art. 6 Abs. 1 lit. b (Vertragserfullung)</li>
          <li>Art. 6 Abs. 1 lit. f (berechtigtes Interesse)</li>
        </ul>

        <h2>3. Welche Daten wir erheben</h2>
        <h3>Kostenlose Testberatung (ohne Registrierung)</h3>
        <ul>
          <li>IP-Adresse (gehasht, zur Missbrauchserkennung)</li>
          <li>Projektbeschreibung und gestellte Fragen</li>
          <li>Hochgeladene Fotos (nur fuer die Dauer der Analyse)</li>
        </ul>

        <h3>Bei Registrierung</h3>
        <ul>
          <li>E-Mail-Adresse oder OAuth-Daten (Google/Apple)</li>
          <li>Gewaehlter Zahlungsplan</li>
        </ul>

        <h3>Bei Nutzung (registrierte Nutzer)</h3>
        <ul>
          <li>Bauberatungs-Verlauf (Fragen und Antworten)</li>
          <li>Hochgeladene Fotos und Analyse-Ergebnisse</li>
          <li>Gespeicherte Projekte und Materiallisten</li>
        </ul>

        <h3>Zahlungsdaten</h3>
        <ul>
          <li>Zahlungsabwicklung erfolgt ueber Stripe. Wir speichern keine Kreditkartendaten, nur die Stripe-Kunden-ID.</li>
        </ul>

        <h3>Technische Daten</h3>
        <ul>
          <li>IP-Adresse, Zeitstempel, Browser, Betriebssystem, Referrer-URL</li>
        </ul>

        <h2>4. KI-Verarbeitung</h2>
        <p>Hausbaubegleiter nutzt Anthropic Claude zur Generierung von Bauberatungen. Ihre Fragen werden an die Anthropic API uebermittelt. Dies stellt keine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO dar.</p>
        <p>Hochgeladene Fotos werden zur Analyse an die Anthropic Vision API gesendet. Fotos werden nicht dauerhaft gespeichert, sofern Sie kein registrierter Nutzer mit Projektspeicherung sind.</p>

        <h2>5. Auftragsverarbeiter</h2>
        <table>
          <thead>
            <tr><th>Dienst</th><th>Zweck</th><th>Standort</th></tr>
          </thead>
          <tbody>
            <tr><td>Vercel</td><td>Hosting</td><td>USA (EU-SCC)</td></tr>
            <tr><td>Supabase</td><td>Datenbank, Auth</td><td>USA (EU-SCC)</td></tr>
            <tr><td>Anthropic</td><td>KI-API</td><td>USA (EU-SCC)</td></tr>
            <tr><td>Stripe</td><td>Zahlungen</td><td>USA (EU-SCC)</td></tr>
            <tr><td>Google/Apple</td><td>OAuth</td><td>USA (EU-SCC)</td></tr>
          </tbody>
        </table>
        <p>Alle Drittanbieter unterliegen den EU-Standardvertragsklauseln (SCC).</p>

        <h2>6. Speicherdauer</h2>
        <ul>
          <li>IP-Hash: max. 30 Tage</li>
          <li>Beratungsverlauf: bis zur Kontoloeschung</li>
          <li>Fotos (nicht-registriert): werden nicht gespeichert</li>
          <li>Zahlungsdaten: 6-10 Jahre (steuerrechtliche Aufbewahrungspflicht)</li>
          <li>Server-Logs: 30 Tage</li>
        </ul>

        <h2>7. Cookies</h2>
        <p>Hausbaubegleiter verwendet ausschliesslich technisch notwendige Cookies fuer Anmeldung und Sitzungsverwaltung. Es werden keine Tracking- oder Werbe-Cookies eingesetzt.</p>

        <h2>8. Ihre Rechte (DSGVO)</h2>
        <p>Sie haben das Recht auf:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Loeschung (Art. 17 DSGVO)</li>
          <li>Einschraenkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenuebertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
          <li>Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>Kontakt: florian.pollstaetter@gmail.com</p>

        <h2>9. Aufsichtsbehoerde</h2>
        <p>Bayerisches Landesamt fuer Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.</p>

        <h2>10. Sicherheit</h2>
        <p>Wir schuetzen Ihre Daten durch HTTPS/TLS-Verschluesselung, Zugriffsbeschraenkungen, regelmaessige Updates und Row-Level Security auf Datenbankebene.</p>
      </div>
    </div>
  );
}
