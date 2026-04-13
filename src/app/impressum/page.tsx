import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <div className="bg-surface min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto prose prose-sm prose-slate">
        <h1 className="text-2xl font-bold text-text font-display mb-6">Impressum</h1>

        <h2>Angaben gemaess &sect; 5 TMG</h2>
        <p>
          Florian Pollstaetter<br />
          [Strasse Hausnummer]<br />
          [PLZ Ort]<br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: florian.pollstaetter@gmail.com<br />
          Telefon: [Telefonnummer]
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>[USt-IdNr. gemaess &sect; 27a UStG] oder: Kleinunternehmer gemaess &sect; 19 UStG — keine Umsatzsteuer-ID erforderlich.</p>

        <h2>Verantwortlich fuer den Inhalt nach &sect; 18 Abs. 2 MStV</h2>
        <p>Florian Pollstaetter (Anschrift wie oben)</p>

        <h2>Streitbeilegung</h2>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

        <h2>Haftung fuer Inhalte</h2>
        <p>Die Inhalte dieser Seite wurden mit groesster Sorgfalt erstellt. Fuer die Richtigkeit, Vollstaendigkeit und Aktualitaet uebernehmen wir keine Gewaehr.</p>

        <h2>Haftung fuer Links</h2>
        <p>Fuer die Inhalte externer Links uebernehmen wir keine Haftung. Fuer die Inhalte der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich.</p>

        <h2>Hinweis zur Plattform</h2>
        <p>Hausbaubegleiter nutzt kuenstliche Intelligenz (Anthropic Claude) zur Generierung von Bauberatungen. Die Empfehlungen stellen keine professionelle Bauberatung dar. Fuer tragende Konstruktionen, Elektrik und Gas ist immer ein zugelassener Fachmann hinzuzuziehen.</p>
      </div>
    </div>
  );
}
