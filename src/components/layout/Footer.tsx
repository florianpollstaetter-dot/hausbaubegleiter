import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-steel-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-xs font-bold">H</span>
              </div>
              <span className="text-sm font-bold text-text font-display text-base">Hausbaubegleiter</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Dein KI-Bauberater fuer Hausbau, Renovierung und Heimwerken im DACH-Raum.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <h3 className="text-xs font-semibold text-text uppercase tracking-wide mb-3">Produkt</h3>
              <ul className="space-y-2">
                {[
                  { href: "/#so-funktionierts", label: "So funktioniert's" },
                  { href: "/#preise", label: "Preise" },
                  { href: "/onboarding", label: "Kostenlos starten" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="text-xs text-text-muted hover:text-text transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-text uppercase tracking-wide mb-3">Rechtliches</h3>
              <ul className="space-y-2">
                {[
                  { href: "/datenschutz", label: "Datenschutz" },
                  { href: "/impressum", label: "Impressum" },
                  { href: "/agb", label: "AGB" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="text-xs text-text-muted hover:text-text transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-steel-200 text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Hausbaubegleiter. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
