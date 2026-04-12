"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function handleLogoClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.location.href = "/";
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-steel-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white text-sm font-bold">H</span>
            </div>
            <span className="text-base font-bold text-text font-display text-lg">
              Hausbaubegleiter
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/#so-funktionierts"
              className="text-text-light hover:text-text transition-colors text-sm font-medium px-3 py-2 rounded-xl hover:bg-steel-50"
            >
              So funktioniert&apos;s
            </Link>
            <Link
              href="/#preise"
              className="text-text-light hover:text-text transition-colors text-sm font-medium px-3 py-2 rounded-xl hover:bg-steel-50"
            >
              Preise
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/onboarding"
              className="text-sm font-medium text-text-light hover:text-text transition-colors px-3 py-2"
            >
              Anmelden
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl text-text-light hover:bg-steel-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu oeffnen"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-steel-200 bg-white px-4 py-4 space-y-1">
          <Link
            href="/#so-funktionierts"
            className="block text-sm font-medium text-text-light hover:text-text px-3 py-2 rounded-xl hover:bg-steel-50"
            onClick={() => setMobileOpen(false)}
          >
            So funktioniert&apos;s
          </Link>
          <Link
            href="/#preise"
            className="block text-sm font-medium text-text-light hover:text-text px-3 py-2 rounded-xl hover:bg-steel-50"
            onClick={() => setMobileOpen(false)}
          >
            Preise
          </Link>
          <Link
            href="/onboarding"
            className="block text-sm font-medium text-text-light hover:text-text px-3 py-2 rounded-xl hover:bg-steel-50"
            onClick={() => setMobileOpen(false)}
          >
            Anmelden
          </Link>
        </div>
      )}
    </header>
  );
}
