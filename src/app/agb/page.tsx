import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "AGB" };

export default function AGBPage() {
  return (
    <div className="bg-surface min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto prose prose-sm prose-slate">
        <h1 className="text-2xl font-bold text-text font-display mb-6">Allgemeine Geschaeftsbedingungen (AGB)</h1>
        <p className="text-xs text-text-muted mb-8">Stand: April 2026</p>

        <h2>1. Geltungsbereich</h2>
        <p>Diese AGB gelten fuer die Nutzung der Plattform hausbaubegleiter.de (nachfolgend &quot;Hausbaubegleiter&quot;), betrieben von Florian Pollstaetter, [Strasse Hausnummer], [PLZ Ort], Deutschland.</p>

        <h2>2. Leistungsbeschreibung</h2>
        <p>Hausbaubegleiter ist ein KI-gestuetzter Bauberater, der Heimwerkern und Hausbauern praxisnahe Empfehlungen zu Materialmengen, Kosten und Vorgehensweisen gibt. Die Inhalte werden durch Anthropic Claude generiert und stellen <strong>keine professionelle Bauberatung</strong> dar.</p>
        <p><strong>Wichtig:</strong> Fuer tragende Konstruktionen, Elektrik, Gas und Statik ist immer ein zugelassener Fachmann hinzuzuziehen. Alle Kostenangaben sind unverbindliche Richtwerte.</p>

        <h2>3. Vertragsschluss</h2>
        <p>Der Vertrag kommt durch Registrierung und Auswahl eines Zahlungsplans zustande. Nutzer muessen mindestens 18 Jahre alt sein.</p>

        <h2>4. Kostenlose Testberatung</h2>
        <p>Jeder Nutzer erhaelt eine kostenlose Bauberatung ohne Registrierung. Die Nutzung wird per IP-Hash ueberwacht, um Missbrauch zu verhindern. Nach der kostenlosen Beratung ist eine Registrierung und Planauswahl erforderlich.</p>

        <h2>5. Preise und Zahlungsplaene</h2>
        <h3>Monatliche Plaene:</h3>
        <ul>
          <li><strong>Basic:</strong> 12,99 &euro;/Monat — unbegrenzte Bauberatungen, alle Kategorien, Materiallisten</li>
          <li><strong>Pro:</strong> 19,99 &euro;/Monat — alles aus Basic plus unbegrenzte Foto-Analysen, Projektspeicherung, Materiallisten-Export</li>
          <li><strong>Baumeister:</strong> 29,99 &euro;/Monat — alles aus Pro plus mehrere Projekte, Bild-Generierung, Prioritaets-Support</li>
        </ul>
        <h3>Jahresplaene (17% Ersparnis):</h3>
        <ul>
          <li><strong>Basic:</strong> 129 &euro;/Jahr</li>
          <li><strong>Pro:</strong> 199 &euro;/Jahr</li>
          <li><strong>Baumeister:</strong> 299 &euro;/Jahr</li>
        </ul>

        <h2>6. Registrierung</h2>
        <p>Die Registrierung erfolgt per E-Mail (Magic Link), Google oder Apple. Pro Person ist ein Konto zulaessig. Der Nutzer ist fuer die Sicherheit seines Kontos verantwortlich.</p>

        <h2>7. Abonnement und Kuendigung</h2>
        <p>Abonnements verlaengern sich automatisch (monatlich bzw. jaehrlich). Eine Kuendigung ist jederzeit ueber die Einstellungen oder per E-Mail moeglich und wird zum Ende der laufenden Abrechnungsperiode wirksam. Bereits gezahlte Beitraege werden nicht erstattet.</p>

        <h2>8. Widerrufsrecht</h2>
        <p>Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gruenden diesen Vertrag zu widerrufen. Die Widerrufsfrist betraegt 14 Tage ab dem Tag des Vertragsschlusses. Um Ihr Widerrufsrecht auszuueben, muessen Sie uns mittels einer eindeutigen Erklaerung (z.B. per E-Mail) informieren.</p>
        <p>Wenn Sie verlangt haben, dass die Dienstleistung waehrend der Widerrufsfrist beginnen soll, zahlen Sie uns einen angemessenen Betrag fuer die bis zum Widerruf erbrachten Leistungen.</p>

        <h2>9. Datenschutz</h2>
        <p>Es gelten unsere <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzhinweise</Link>. Die Verarbeitung personenbezogener Daten erfolgt DSGVO-konform.</p>

        <h2>10. Haftung</h2>
        <ul>
          <li>Unbeschraenkte Haftung bei Vorsatz, grober Fahrlaessigkeit sowie fuer Schaeden an Leben, Koerper und Gesundheit.</li>
          <li>Bei leichter Fahrlaessigkeit: Haftung nur bei Verletzung wesentlicher Vertragspflichten, begrenzt auf vorhersehbare, vertragstypische Schaeden.</li>
          <li><strong>Keine Gewaehr fuer die Richtigkeit der KI-generierten Inhalte.</strong> Alle Angaben zu Materialmengen, Kosten und Vorgehensweisen sind Richtwerte und ersetzen keine Fachberatung.</li>
        </ul>

        <h2>11. Nutzungsregeln</h2>
        <ul>
          <li>Nur fuer persoenliche, nicht-kommerzielle Nutzung.</li>
          <li>Kein Kopieren, Weiterverkaufen oder automatisiertes Abfragen der Inhalte.</li>
          <li>Keine Bots, Scraper oder aehnliche Werkzeuge.</li>
        </ul>

        <h2>12. Aenderungen der AGB</h2>
        <p>Aenderungen werden 30 Tage vor Inkrafttreten per E-Mail angekuendigt. Schweigen gilt als Zustimmung, sofern nicht widersprochen wird.</p>

        <h2>13. Schlussbestimmungen</h2>
        <p>Es gilt deutsches Recht. Die Teilnahme an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle ist nicht vorgesehen.</p>
      </div>
    </div>
  );
}
