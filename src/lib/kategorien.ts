export interface Kategorie {
  value: string;
  label: string;
  description: string;
}

export const KATEGORIEN: Kategorie[] = [
  { value: "hausbau", label: "Hausbau / Neubau", description: "Kompletter Hausbau von Fundament bis Dach — Planung, Ablauf, Kosten" },
  { value: "wohnungsbau", label: "Wohnungsbau / Umbau", description: "Wohnung ausbauen, umbauen oder neu gestalten" },
  { value: "haussanierung", label: "Haussanierung", description: "Altbau sanieren, modernisieren, energetisch aufwerten" },
  { value: "wohnungssanierung", label: "Wohnungssanierung", description: "Wohnung renovieren, Badsanierung, Kuechensanierung" },
  { value: "gartengestaltung", label: "Gartengestaltung", description: "Gartenplanung, Terrasse, Wege, Bepflanzung, Zaun, Pool" },
  { value: "innenausbau", label: "Innenausbau", description: "Trockenbau, Boden, Fliesen, Tueren, Fenster, Malern" },
  { value: "dach_fassade", label: "Dach & Fassade", description: "Dachsanierung, Eindeckung, Fassadendaemmung, Putz" },
  { value: "sanitaer_bad", label: "Sanitaer & Bad", description: "Badplanung, Rohre, Armaturen, Dusche, WC" },
  { value: "heizung_energie", label: "Heizung & Energie", description: "Waermepumpe, Fussbodenheizung, Solar, Daemmung" },
  { value: "elektro", label: "Elektro & Smart Home", description: "Leitungen, Steckdosen, Beleuchtung, Smarthome" },
  { value: "garage_carport", label: "Garage & Carport", description: "Garage bauen, Carport, Stellplatz, Genehmigung" },
  { value: "keller", label: "Keller & Fundament", description: "Kellerausbau, Abdichtung, Fundament, Drainage" },
];

export const FLAT_KATEGORIEN: Record<string, string> = KATEGORIEN.reduce(
  (acc, k) => ({ ...acc, [k.value]: k.label }),
  {} as Record<string, string>
);
