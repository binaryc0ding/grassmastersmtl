"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { FaqJsonLd } from "@/components/site/JsonLd";
import { SITE } from "@/lib/site";
import { Phone } from "lucide-react";

export function FaqContent() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <FaqJsonLd items={items} />
      <section className="relative overflow-hidden bg-[#0b0b0c] pt-32 pb-16 text-white md:pt-40 md:pb-24">
        <div aria-hidden className="absolute inset-0 grid-mask opacity-25" />
        <div className="container-x relative max-w-3xl">
          <span className="eyebrow !text-primary">{t("eyebrow")}</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-5 text-lg text-white/70">
            {t("cantFind")}{" "}
            <a
              href={SITE.phoneHref}
              className="font-semibold text-primary underline underline-offset-4"
            >
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-x max-w-3xl">
          <div className="divide-y divide-black/5 rounded-3xl border border-black/5 bg-surface">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-bold text-ink md:text-lg">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={[
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10 bg-white transition",
                        isOpen ? "rotate-45 border-primary text-primary" : "text-ink-soft",
                      ].join(" ")}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-[15px] leading-relaxed text-ink-soft">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-8 text-white shadow-lift">
            <div>
              <p className="font-display text-xl font-bold">{t("ctaHeading")}</p>
              <p className="text-sm text-white/80">{t("ctaBody")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={SITE.phoneHref} className="btn-ghost-light">
                <Phone className="h-4 w-4" /> {t("callNow")}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-deep"
              >
                {t("getQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
