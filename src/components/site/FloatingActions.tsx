"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const t = useTranslations("floatingActions");

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, p)));
      setShow(h.scrollTop > 600);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary to-primary-deep transition-transform"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 sm:hidden">
        <a
          href={SITE.phoneHref}
          className="glass-dark flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white"
        >
          <Phone className="h-4 w-4" /> {t("call")}
        </a>
        <Link href="/contact" className="btn-primary flex-1 !py-3">
          {t("getQuote")}
        </Link>
      </div>

      {/* Desktop floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 sm:flex">
        {show && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t("backToTopAria")}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-lg transition hover:-translate-y-0.5"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
        <a
          href={SITE.phoneHref}
          aria-label={t("callNowAria")}
          className="glass-dark flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-lift"
        >
          <Phone className="h-4 w-4 text-primary" /> {SITE.phone}
        </a>
        <Link href="/contact" className="btn-primary !py-3 !px-5 shadow-lift">
          {t("getQuote")}
        </Link>
      </div>
    </>
  );
}
