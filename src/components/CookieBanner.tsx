"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("hausbaubegleiter_cookie_consent");
    if (!consent) setShow(true);
  }, []);

  function accept() {
    localStorage.setItem("hausbaubegleiter_cookie_consent", "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-float border border-steel-200 p-4 flex flex-col sm:flex-row items-center gap-3">
        <p className="text-xs text-text-light leading-relaxed flex-1">
          Diese Website verwendet ausschliesslich technisch notwendige Cookies fuer Anmeldung und Sitzungsverwaltung. Es werden keine Tracking- oder Werbe-Cookies eingesetzt.{" "}
          <Link href="/datenschutz" className="text-primary hover:underline">Mehr erfahren</Link>
        </p>
        <button
          onClick={accept}
          className="bg-primary text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-primary-600 transition-colors whitespace-nowrap"
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
