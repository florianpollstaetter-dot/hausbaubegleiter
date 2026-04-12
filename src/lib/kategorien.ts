export interface Kategorie {
  value: string;
  label: string;
  description: string;
}

export const KATEGORIEN: Record<string, Kategorie[]> = {
  "Rohbau & Struktur": [
    { value: "fundament", label: "Fundament & Bodenplatte", description: "Aushub, Bewehrung, Betonieren" },
    { value: "mauerwerk", label: "Mauerwerk & Wände", description: "Ziegel, Porenbeton, Kalksandstein" },
    { value: "dach", label: "Dacharbeiten", description: "Dachstuhl, Eindeckung, Dämmung" },
    { value: "beton", label: "Beton & Estrich", description: "Mischverhältnisse, Trocknung, Risse" },
  ],
  "Innenausbau": [
    { value: "trockenbau", label: "Trockenbau", description: "Rigips, Ständerwerk, Abhangdecken" },
    { value: "fliesen", label: "Fliesen & Boden", description: "Verlegen, Verfugen, Materialwahl" },
    { value: "tueren_fenster", label: "Türen & Fenster", description: "Einbau, Austausch, Dichtung" },
    { value: "malern", label: "Malern & Tapezieren", description: "Grundierung, Techniken, Materialien" },
  ],
  "Haustechnik": [
    { value: "sanitaer", label: "Sanitär & Bad", description: "Rohre, Armaturen, Badplanung" },
    { value: "heizung", label: "Heizung & Klima", description: "Wärmepumpe, Fußbodenheizung, Heizkörper" },
    { value: "elektro", label: "Elektro", description: "Leitungen, Steckdosen, Sicherungen" },
  ],
  "Außenbereich": [
    { value: "garten", label: "Garten & Terrasse", description: "Pflaster, Holzterrasse, Bepflanzung" },
    { value: "fassade", label: "Fassade & Außenwand", description: "WDVS, Putz, Verkleidung" },
    { value: "garage", label: "Garage & Carport", description: "Planung, Bau, Genehmigung" },
  ],
  "Renovierung": [
    { value: "sanierung", label: "Altbausanierung", description: "Entkernen, Aufwertung, Substanzerhalt" },
    { value: "daemmung", label: "Dämmung & Energie", description: "Wärmedämmung, KfW, Fördermittel" },
    { value: "schimmel", label: "Feuchte & Schimmel", description: "Ursachen, Beseitigung, Prävention" },
  ],
};

export const FLAT_KATEGORIEN: Record<string, string> = Object.values(KATEGORIEN)
  .flat()
  .reduce((acc, k) => ({ ...acc, [k.value]: k.label }), {} as Record<string, string>);
