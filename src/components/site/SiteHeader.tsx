"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV, SITE, localeSwitchHref } from "@/lib/site";

const OTHER_LOCALE: Record<string, { code: "fr-CA" | "en-CA"; label: string }> = {
  "fr-CA": { code: "en-CA", label: "EN" },
  "en-CA": { code: "fr-CA", label: "FR" },
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const locale = useLocale();
  const t = useTranslations("header");
  const tNav = useTranslations("nav");
  const onHome = pathname === "/";
  const otherLocale = OTHER_LOCALE[locale];
  // Same page, other locale — including a re-mapped slug on detail pages.
  const otherLocaleHref = localeSwitchHref(segments, locale, otherLocale.code);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !onHome || open;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-white/85 backdrop-blur-xl border-b border-black/5 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.15)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            className={[
              "grid h-9 w-9 place-items-center rounded-xl transition",
              solid ? "bg-primary text-white" : "bg-white/15 text-white backdrop-blur",
            ].join(" ")}
            aria-hidden
          >
            <LeafMark />
          </span>
          <span
            className={[
              "font-display text-[15px] font-extrabold tracking-tight sm:text-base",
              solid ? "text-ink" : "text-white",
            ].join(" ")}
          >
            Grassmasters<span className="text-primary-deep"> MTL</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("primaryNav")}>
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  solid
                    ? active
                      ? "bg-primary/10 text-primary-deep"
                      : "text-ink-soft hover:text-ink hover:bg-black/[0.04]"
                    : active
                      ? "bg-white/15 text-white"
                      : "text-white/85 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                {tNav(n.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={otherLocaleHref}
            locale={otherLocale.code}
            aria-label={t("switchLanguageAria")}
            className={[
              "hidden items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition sm:inline-flex",
              solid ? "text-ink hover:bg-black/[0.05]" : "text-white/90 hover:bg-white/10",
            ].join(" ")}
          >
            {otherLocale.label}
          </Link>
          <a
            href={SITE.phoneHref}
            aria-label={t("callAria", { phone: SITE.phone })}
            className={[
              "hidden items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition sm:inline-flex",
              solid ? "text-ink hover:bg-black/[0.05]" : "text-white/90 hover:bg-white/10",
            ].join(" ")}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">{SITE.phone}</span>
          </a>
          <Link href="/contact" className="btn-primary hidden sm:inline-flex !py-2.5 !px-5 text-sm">
            {t("getQuote")}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t("toggleMenu")}
            aria-expanded={open}
            className={[
              "grid h-10 w-10 place-items-center rounded-full lg:hidden",
              solid ? "text-ink hover:bg-black/5" : "text-white hover:bg-white/10",
            ].join(" ")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-black/5 bg-white">
          <div className="container-x py-4">
            <nav className="grid gap-1" aria-label={t("mobileNav")}>
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-black/[0.04]"
                >
                  {tNav(n.key)}
                </Link>
              ))}
            </nav>
            <div className="mt-3 grid gap-2">
              <Link
                href={otherLocaleHref}
                locale={otherLocale.code}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-black/[0.04]"
              >
                {otherLocale.label}
              </Link>
              <Link href="/contact" className="btn-primary w-full">
                {t("getQuote")}
              </Link>
              <a href={SITE.phoneHref} className="btn-outline-dark w-full">
                <Phone className="h-4 w-4" /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LeafMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path d="M4 20C4 12 10 5 20 4c-.5 10-7.5 16-16 16Z" fill="currentColor" />
      <path
        d="M4 20C8 16 12 12 20 4"
        stroke="white"
        strokeOpacity=".55"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
