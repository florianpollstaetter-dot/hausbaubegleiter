import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 24 * 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const KATEGORIEN: Record<string, string> = {
  mauerwerk: "Mauerwerk und Wände (Ziegel, Porenbeton, Kalksandstein)",
  dach: "Dacharbeiten (Dachstuhl, Eindeckung, Dämmung)",
  fliesen: "Fliesen und Bodenbeläge (Verlegen, Verfugen, Materialwahl)",
  sanitaer: "Sanitär und Badplanung (Rohre, Armaturen, Badgestaltung)",
  garten: "Garten und Terrasse (Pflaster, Holzterrasse, Bepflanzung)",
  garage: "Garage und Carport (Planung, Bau, Genehmigung)",
  daemmung: "Dämmung und Energieeffizienz (Wärmedämmung, KfW-Förderung)",
  trockenbau: "Trockenbau (Rigips, Ständerwerk, Abhangdecken)",
  fundament: "Fundament und Bodenplatte (Aushub, Bewehrung, Betonieren)",
  beton: "Beton und Estrich (Mischverhältnisse, Trocknung, Risse)",
  tueren_fenster: "Türen und Fenster (Einbau, Austausch, Dichtung)",
  malern: "Malern und Tapezieren (Grundierung, Techniken, Materialien)",
  heizung: "Heizung und Klima (Wärmepumpe, Fußbodenheizung, Heizkörper)",
  elektro: "Elektroinstallation (Leitungen, Steckdosen, Sicherungen)",
  fassade: "Fassade und Außenwand (WDVS, Putz, Verkleidung)",
  sanierung: "Altbausanierung (Entkernen, Aufwertung, Substanzerhalt)",
  schimmel: "Feuchte und Schimmel (Ursachen, Beseitigung, Prävention)",
};

function buildSystemPrompt(kategorie: string, flaeche?: number, question?: string): string {
  const kategorieLabel = KATEGORIEN[kategorie] ?? kategorie;

  const flaecheContext = flaeche
    ? `\n- Fläche/Umfang: ca. ${flaeche} m²`
    : "";
  const questionContext = question
    ? `\n- Konkrete Frage: "${question}"`
    : "";

  return `Du bist Hausbaubegleiter — ein erfahrener Bauberater für Heimwerker und Hausbauer im deutschsprachigen Raum. Du gibst praxisnahe, direkt umsetzbare Empfehlungen basierend auf jahrzehntelanger Handwerks- und Bauerfahrung.

Dein Stil: Direkt, sachlich, kompetent. Du-Form. Kurze Sätze. Keine Floskeln. Konkrete Zahlen und Mengen. Trockener Handwerker-Humor ist erlaubt.

Aktueller Kontext:
- Kategorie: ${kategorieLabel}${flaecheContext}${questionContext}

Strukturiere deine Antwort in genau diese Abschnitte mit Markdown-Überschriften (###):

### Überblick
Kurze Einschätzung: Schwierigkeitsgrad (1-5), geschätzter Zeitaufwand, ob ein Profi nötig ist.

### Materialliste
Konkrete Materialien mit geschätzten Mengen. Bei Flächenangabe: berechne die Mengen.

### Geschätzte Kosten
Realistischer Preisrahmen für den DACH-Raum (Material + ggf. Handwerker). Gib eine Spanne an.

### Schritt für Schritt
Praktische Anleitung in nummerierten Schritten. Max 6 Schritte.

### Profi-Tipp
Ein konkreter Tipp, den nur erfahrene Handwerker kennen.

### Sicherheitshinweis
(Nur wenn relevant) Was beachtet werden muss. Bei Elektro, Gas, Statik: immer den Hinweis auf Fachmann geben.

WICHTIG: Keine statischen Berechnungen. Bei tragenden Konstruktionen, Elektrik und Gas immer auf Fachmann verweisen. Preise sind Richtwerte — keine Garantie.

Schreib auf Deutsch. Max 500 Wörter.`;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        error:
          "Tageslimit erreicht. Du hast heute bereits 3 kostenlose Beratungen erhalten. Registrier dich fuer unbegrenzte Nutzung.",
      },
      { status: 429 }
    );
  }

  let body: { kategorie?: string; flaeche?: number; question?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungueltige Anfrage." }, { status: 400 });
  }

  const { kategorie, flaeche, question } = body;

  if (!kategorie || !KATEGORIEN[kategorie]) {
    return NextResponse.json(
      { error: "Bitte waehle eine Kategorie aus." },
      { status: 400 }
    );
  }

  if (flaeche !== undefined && (flaeche < 0.1 || flaeche > 10000)) {
    return NextResponse.json(
      { error: "Flaeche muss zwischen 0.1 und 10.000 m² liegen." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API nicht konfiguriert." },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const kategorieLabel = KATEGORIEN[kategorie];
    const flaecheText = flaeche ? ` Die Fläche beträgt ca. ${flaeche} m².` : "";
    const userMessage = question
      ? `Kategorie: ${kategorieLabel}.${flaecheText} Meine Frage: ${question}`
      : `Bitte gib mir eine vollständige Bauberatung für: ${kategorieLabel}.${flaecheText}`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1200,
      system: buildSystemPrompt(kategorie, flaeche, question),
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const text =
      message.content[0]?.type === "text" ? message.content[0].text : "";

    return NextResponse.json({ advice: text });
  } catch (err) {
    console.error("Claude API error:", err);
    return NextResponse.json(
      { error: "Service voruebergehend nicht verfuegbar. Bitte versuch es nochmal." },
      { status: 502 }
    );
  }
}
