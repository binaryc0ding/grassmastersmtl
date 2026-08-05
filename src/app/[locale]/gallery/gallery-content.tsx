"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { X } from "lucide-react";

const gallery1 = "/assets/gallery-1.jpg";
const gallery2 = "/assets/gallery-2.jpg";
const gallery3 = "/assets/gallery-3.jpg";
const hardscapeImg = "/assets/service-hardscape.jpg";
const mulchImg = "/assets/service-mulch.jpg";
const stoneImg = "/assets/service-stone.jpg";
const sodImg = "/assets/service-sod.jpg";
const beforeImg = "/assets/before-1.jpg";
const afterImg = "/assets/after-1.jpg";
const heroImg = "/assets/hero-lawn.jpg";

const IMAGES: { src: string; cat: "before" | "after" | "drone" | "finished"; span?: string }[] = [
  { src: gallery1, cat: "drone", span: "md:col-span-2 md:row-span-2" },
  { src: afterImg, cat: "after" },
  { src: beforeImg, cat: "before" },
  { src: hardscapeImg, cat: "finished" },
  { src: gallery2, cat: "finished", span: "md:row-span-2" },
  { src: mulchImg, cat: "finished" },
  { src: gallery3, cat: "finished" },
  { src: stoneImg, cat: "finished" },
  { src: sodImg, cat: "after" },
  { src: heroImg, cat: "drone" },
];

const CATEGORY_KEYS = ["all", "before", "after", "drone", "finished"] as const;

export function GalleryContent() {
  const t = useTranslations("gallery");
  const alts = t.raw("alts") as string[];
  const [cat, setCat] = useState<(typeof CATEGORY_KEYS)[number]>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const items = IMAGES.map((i, idx) => ({ ...i, alt: alts[idx] })).filter((i) =>
    cat === "all" ? true : i.cat === cat,
  );

  return (
    <>
      <section className="relative overflow-hidden bg-[#0b0b0c] pt-32 pb-16 text-white md:pt-40 md:pb-20">
        <div aria-hidden className="absolute inset-0 grid-mask opacity-25" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[600px] rounded-full bg-primary/25 blur-[140px]"
        />
        <div className="container-x relative">
          <span className="eyebrow !text-primary">{t("eyebrow")}</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">{t("paragraph")}</p>
        </div>
      </section>

      <div className="container-x py-14 md:py-20">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORY_KEYS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                cat === c
                  ? "border-primary bg-primary text-white shadow-lg"
                  : "border-black/10 bg-white text-ink hover:border-primary hover:text-primary-deep",
              ].join(" ")}
            >
              {t(`categories.${c}`)}
            </button>
          ))}
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {items.map((i, idx) => (
            <button
              key={idx}
              onClick={() => setLightbox(i.src)}
              className={[
                "group relative overflow-hidden rounded-2xl shadow-soft",
                i.span ?? "",
              ].join(" ")}
            >
              <img
                src={i.src}
                alt={i.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink opacity-0 transition group-hover:opacity-100">
                {t(`categories.${i.cat}`)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label={t("closeAria")}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-[92vw] rounded-2xl shadow-2xl" />
        </div>
      )}
    </>
  );
}
