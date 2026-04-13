import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Free trial: 1 free photo analysis per IP, then paywall
const trialUsedMap = new Map<string, boolean>();

function checkFreeTrial(ip: string): boolean {
  if (trialUsedMap.get(ip)) return false;
  trialUsedMap.set(ip, true);
  return true;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkFreeTrial(ip)) {
    return NextResponse.json(
      { error: "trial_expired", message: "Du hast deine kostenlose Foto-Analyse bereits erhalten. Waehle einen Plan fuer unbegrenzten Zugang." },
      { status: 429 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API nicht konfiguriert." }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Ungueltige Anfrage." }, { status: 400 });
  }

  const file = formData.get("photo") as File | null;
  const question = (formData.get("question") as string) ?? "";

  if (!file) {
    return NextResponse.json({ error: "Bitte lade ein Foto hoch." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Datei zu gross. Maximal 10 MB." }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Nur JPG, PNG, WebP und GIF erlaubt." },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  const mediaType = file.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif";

  const client = new Anthropic({ apiKey });

  const systemPrompt = `Du bist Hausbaubegleiter — ein erfahrener Bauberater. Du analysierst Fotos von Bauprojekten, Raeumen, Gaerten und Gebaeuden.

Dein Stil: Direkt, sachlich, kompetent. Du-Form. Konkrete Empfehlungen.

Aufgabe: Analysiere das hochgeladene Foto und gib eine praxisnahe Beratung.

Strukturiere deine Antwort so:

### Was ich sehe
Beschreibe kurz, was auf dem Foto zu erkennen ist (Raum, Material, Zustand, Maße soweit erkennbar).

### Analyse
Bewerte den aktuellen Zustand. Was faellt auf? Was ist gut, was sollte verbessert werden?

### Empfehlung
Konkrete, umsetzbare Vorschlaege. Was wuerde ein erfahrener Handwerker hier empfehlen?

### Geschaetzte Kosten
Grobe Kostenschaetzung fuer die empfohlenen Massnahmen (DACH-Region).

WICHTIG: Bei tragenden Konstruktionen, Elektrik und Gas immer auf Fachmann verweisen. Preise sind Richtwerte.

Schreib auf Deutsch. Max 400 Woerter.`;

  const userContent: Anthropic.MessageCreateParams["messages"][0]["content"] = [
    {
      type: "image",
      source: {
        type: "base64",
        media_type: mediaType,
        data: base64,
      },
    },
    {
      type: "text",
      text: question
        ? `Bitte analysiere dieses Foto. Meine Frage: ${question}`
        : "Bitte analysiere dieses Foto und gib mir eine Bauberatung dazu.",
    },
  ];

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1200,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const text = message.content[0]?.type === "text" ? message.content[0].text : "";

    return NextResponse.json({ analysis: text });
  } catch (err) {
    console.error("Claude Vision API error:", err);
    return NextResponse.json(
      { error: "Foto-Analyse fehlgeschlagen. Bitte versuch es nochmal." },
      { status: 502 }
    );
  }
}
