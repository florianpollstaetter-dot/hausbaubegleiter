import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Free trial: 1 free consultation per IP, then permanent paywall
const trialUsedMap = new Map<string, boolean>();

function checkFreeTrial(ip: string): boolean {
  if (trialUsedMap.get(ip)) return false;
  trialUsedMap.set(ip, true);
  return true;
}

const KATEGORIEN: Record<string, string> = {
  hausbau: "Kompletter Hausbau / Neubau (Planung, Ablauf, Kosten)",
  wohnungsbau: "Wohnungsbau / Wohnungsumbau",
  haussanierung: "Haussanierung (Altbau modernisieren, energetisch aufwerten)",
  wohnungssanierung: "Wohnungssanierung (Badsanierung, Kuechensanierung, Renovierung)",
  gartengestaltung: "Gartengestaltung (Gartenplanung, Terrasse, Wege, Bepflanzung, Zaun, Pool)",
  innenausbau: "Innenausbau (Trockenbau, Boden, Fliesen, Tueren, Fenster, Malern)",
  dach_fassade: "Dach und Fassade (Dachsanierung, Eindeckung, Fassadendaemmung, Putz)",
  sanitaer_bad: "Sanitaer und Bad (Badplanung, Rohre, Armaturen, Dusche, WC)",
  heizung_energie: "Heizung und Energie (Waermepumpe, Fussbodenheizung, Solar, Daemmung)",
  elektro: "Elektro und Smart Home (Leitungen, Steckdosen, Beleuchtung, Smarthome)",
  garage_carport: "Garage und Carport (Planung, Bau, Genehmigung)",
  keller: "Keller und Fundament (Kellerausbau, Abdichtung, Drainage)",
};

function buildSystemPrompt(kategorie: string, question: string): string {
  const kategorieLabel = KATEGORIEN[kategorie] ?? kategorie;

  return `Du bist Hausbaubegleiter — ein erfahrener Bauberater fuer Heimwerker und Hausbauer im deutschsprachigen Raum. Du gibst praxisnahe, direkt umsetzbare Empfehlungen basierend auf jahrzehntelanger Handwerks- und Bauerfahrung.

Dein Stil: Direkt, sachlich, kompetent. Du-Form. Kurze Saetze. Keine Floskeln. Konkrete Zahlen und Mengen. Trockener Handwerker-Humor ist erlaubt. Erwaehne niemals KI, AI oder kuenstliche Intelligenz.

Kontext:
- Kategorie: ${kategorieLabel}
- Konkrete Frage: "${question}"

WICHTIG: Beantworte die konkrete Frage direkt und spezifisch. Gib keine allgemeinen Ratschlaege.

Strukturiere deine Antwort in genau diese Abschnitte mit Markdown-Ueberschriften (###):

### Ueberblick
Kurze Einschaetzung: Schwierigkeitsgrad (1-5), geschaetzter Zeitaufwand, ob ein Profi noetig ist.

### Materialliste
Konkrete Materialien mit geschaetzten Mengen. Bei Flaechenangabe: berechne die Mengen.

### Geschaetzte Kosten
Realistischer Preisrahmen fuer den DACH-Raum (Material + ggf. Handwerker). Gib eine Spanne an.

### Schritt fuer Schritt
Praktische Anleitung in nummerierten Schritten. Max 6 Schritte.

### Profi-Tipp
Ein konkreter Tipp, den nur erfahrene Handwerker kennen.

### Sicherheitshinweis
(Nur wenn relevant) Was beachtet werden muss. Bei Elektro, Gas, Statik: immer den Hinweis auf Fachmann geben.

WICHTIG: Keine statischen Berechnungen. Bei tragenden Konstruktionen, Elektrik und Gas immer auf Fachmann verweisen. Preise sind Richtwerte.

Schreib auf Deutsch. Max 500 Woerter.`;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkFreeTrial(ip)) {
    return NextResponse.json(
      {
        error: "trial_expired",
        message: "Du hast deine kostenlose Beratung bereits erhalten. Waehle einen Plan fuer unbegrenzten Zugang.",
      },
      { status: 429 }
    );
  }

  let body: { kategorie?: string; question?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungueltige Anfrage." }, { status: 400 });
  }

  const { kategorie, question } = body;

  if (!kategorie || !KATEGORIEN[kategorie]) {
    return NextResponse.json(
      { error: "Bitte waehle eine Kategorie aus." },
      { status: 400 }
    );
  }

  if (!question?.trim()) {
    return NextResponse.json(
      { error: "Bitte stelle eine konkrete Frage." },
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
    const userMessage = `Kategorie: ${kategorieLabel}. Meine Frage: ${question}`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1200,
      system: buildSystemPrompt(kategorie, question!),
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
