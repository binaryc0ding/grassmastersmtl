"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Leaf,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Sprout,
  Shovel,
  Blocks,
  Gem,
  Waves,
  Wand2,
  ShieldCheck,
  Users,
  Truck,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AREAS, SITE, SERVICES, areaSlug, serviceSlug } from "@/lib/site";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { FaqJsonLd } from "@/components/site/JsonLd";
import { useState } from "react";

const heroImg = "/assets/hero-lawn.jpg";
const sodImg = "/assets/service-sod.jpg";
const sodRemovalImg = "/assets/service-sod-removal.jpg";
const hardscapeImg = "/assets/service-hardscape.jpg";
const mulchImg = "/assets/service-mulch.jpg";
const stoneImg = "/assets/service-stone.jpg";
const transformImg = "/assets/service-lawn-transform.jpg";
const beforeImg = "/assets/before-1.jpg";
const afterImg = "/assets/after-1.jpg";
const gallery1 = "/assets/gallery-1.jpg";
const gallery2 = "/assets/gallery-2.jpg";
const gallery3 = "/assets/gallery-3.jpg";

const iconMap = { Sprout, Shovel, Blocks, Leaf, Gem, Waves, Wand2 } as const;
const imgMap: Record<string, string> = {
  sod: sodImg,
  removal: sodRemovalImg,
  hardscape: hardscapeImg,
  mulch: mulchImg,
  stone: stoneImg,
  transform: transformImg,
};

const WHY_US_ICONS: LucideIcon[] = [
  Users,
  Sprout,
  Ruler,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Star,
  Truck,
];

export function HomeContent() {
  const t = useTranslations("home.faq");
  const faqItems = t.raw("items") as { q: string; a: string }[];

  return (
    <>
      <FaqJsonLd items={faqItems} />
      <Hero />
      <TrustStrip />
      <Services />
      <WhyUs />
      <Transformation />
      <Process />
      <Seasonal />
      <Testimonials />
      <Areas />
      <Faq />
      <CtaSection />
    </>
  );
}

function Hero() {
  const t = useTranslations("home.hero");
  const badges = t.raw("badges") as string[];
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0b0c] text-white">
      <img
        src={heroImg}
        alt="Freshly installed emerald green sod lawn at a premium Montreal home at golden hour"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        fetchPriority="high"
        width={1920}
        height={1280}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/55 to-black/85"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-mask opacity-40" />

      <div className="container-x flex min-h-[100svh] flex-col justify-center pt-28 pb-24 md:pt-32">
        <div className="max-w-3xl">
          <span className="eyebrow !text-primary/90">
            <Sparkles className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-5 font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
            {t("headingPart1")}{" "}
            <span className="bg-gradient-to-br from-primary to-[color:oklch(0.9_0.2_130)] bg-clip-text text-transparent">
              {t("headingPart2")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 text-balance sm:text-xl">
            {t("paragraph")}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary">
              {t("ctaQuote")} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={SITE.phoneHref} className="btn-ghost-light">
              <Phone className="h-4 w-4" /> {t("ctaCall", { phone: SITE.phone })}
            </a>
          </div>

          <ul className="mt-10 grid max-w-2xl grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {badges.map((b) => (
              <li key={b} className="flex items-center gap-2 text-white/80">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          {t("scrollLabel")}
        </span>
        <div className="relative h-8 w-4 rounded-full border border-white/40">
          <div className="absolute left-1/2 top-1 h-1.5 w-1 -translate-x-1/2 rounded-full bg-white animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const t = useTranslations("home");
  const items = t.raw("trustStrip") as { value: string; label: string }[];
  const icons = [Star, Users, MapPin, Award];
  return (
    <section className="border-b border-black/5 bg-white">
      <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4 md:py-12">
        {items.map((i, idx) => {
          const Icon = icons[idx];
          return (
            <div key={i.label} className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary-deep">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold text-ink">{i.value}</p>
                <p className="text-xs text-ink-soft">{i.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Services() {
  const locale = useLocale();
  const t = useTranslations("home.services");
  return (
    <section id="services" className="relative bg-surface py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink text-balance md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-lg text-ink-soft text-balance">{t("paragraph")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = iconMap[s.icon];
            const title = t(`items.${s.slug}.title`);
            return (
              <Link
                key={s.slug}
                href={{
                  pathname: "/services/[slug]",
                  params: { slug: serviceSlug(s.slug, locale) },
                }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={imgMap[s.img]}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {t(`items.${s.slug}.short`)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep">
                    {t("learnMore")}{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const t = useTranslations("home.whyUs");
  const benefits = t.raw("benefits") as { title: string; desc: string }[];
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-lift">
            <img
              src={gallery1}
              alt="Aerial view of a professionally landscaped Montreal backyard"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden w-64 rounded-2xl bg-white p-4 shadow-lift sm:block lg:-right-8">
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-2 text-sm font-medium text-ink">&ldquo;{t("quote")}&rdquo;</p>
            <p className="mt-1 text-xs text-ink-soft">{t("quoteAuthor")}</p>
          </div>
        </div>

        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink text-balance md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-lg text-ink-soft">{t("paragraph")}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((b, idx) => {
              const Icon = WHY_US_ICONS[idx];
              return (
                <div
                  key={b.title}
                  className="group flex gap-3 rounded-2xl border border-black/5 bg-surface p-4 transition hover:border-primary/30 hover:bg-white hover:shadow-soft"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-deep">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{b.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Transformation() {
  const t = useTranslations("home.transformation");
  return (
    <section className="relative overflow-hidden bg-[#0b0b0c] py-24 text-white md:py-32">
      <div aria-hidden className="absolute inset-0 grid-mask opacity-25" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/4 h-[420px] w-[720px] rounded-full bg-primary/20 blur-[140px]"
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow !text-primary">{t("eyebrow")}</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-lg text-white/70 text-balance">{t("paragraph")}</p>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-6">
          <BeforeAfter
            before={beforeImg}
            after={afterImg}
            beforeAlt={t("beforeAlt")}
            afterAlt={t("afterAlt")}
          />
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div>
              <p className="font-display text-lg font-bold">{t("caption")}</p>
              <p className="text-sm text-white/60">{t("meta")}</p>
            </div>
            <Link href="/gallery" className="btn-ghost-light">
              {t("cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as { title: string; desc: string }[];
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink text-balance md:text-5xl">
            {t("heading")}
          </h2>
        </div>
        <ol className="relative mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
          <div
            aria-hidden
            className="pointer-events-none absolute left-8 top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent md:block md:left-1/2"
          />
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={[
                "relative rounded-2xl border border-black/5 bg-white p-6 shadow-soft",
                i % 2 ? "md:mt-16" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-deep text-sm font-bold text-white shadow-lg">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Seasonal() {
  const t = useTranslations("home.seasonal");
  return (
    <section className="py-16 md:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary via-primary-deep to-[color:oklch(0.4_0.12_150)] p-10 text-white shadow-lift md:p-16">
          <div aria-hidden className="absolute inset-0 grid-mask opacity-20" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {t("badge")}
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold text-balance md:text-4xl">
                {t("heading")}
              </h2>
              <p className="mt-3 max-w-xl text-white/85">{t("paragraph")}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary-deep shadow-lg transition hover:-translate-y-0.5"
              >
                {t("cta")} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE.phoneHref} className="btn-ghost-light">
                <Phone className="h-4 w-4" /> {t("callNow")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as { name: string; loc: string; quote: string }[];
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink text-balance md:text-5xl">
              {t("heading")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
            ))}
            <span className="ml-1 text-sm text-ink-soft">{t("basedOn")}</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-3xl border border-black/5 bg-surface p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lift"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-black/5 pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary-deep">
                  {item.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-ink-soft">{item.loc}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Areas() {
  const locale = useLocale();
  const t = useTranslations("home.areas");
  const tAreas = useTranslations("areas.items");
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink text-balance md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{t("paragraph")}</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AREAS.map((a) => (
              <li key={a.slug}>
                <Link
                  href={{ pathname: "/areas/[city]", params: { city: areaSlug(a.slug, locale) } }}
                  className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm font-medium text-ink shadow-soft transition hover:border-primary/30 hover:text-primary-deep"
                >
                  <MapPin className="h-4 w-4 text-primary" /> {tAreas(`${a.slug}.name`)}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm font-medium text-ink shadow-soft">
              <MapPin className="h-4 w-4 text-primary" /> {t("surroundingAreas")}
            </li>
          </ul>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <MiniImg src={gallery2} alt="Sod edge detail" />
            <MiniImg src={gallery3} alt="Front yard curb appeal" />
            <MiniImg src={afterImg} alt="Completed lawn transformation" />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-lift">
          <iframe
            title="Grassmasters MTL service area map"
            src="https://www.google.com/maps?q=Montreal%2C+QC&output=embed"
            className="h-[460px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function MiniImg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-square overflow-hidden rounded-xl">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 hover:scale-110"
      />
    </div>
  );
}

function Faq() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink text-balance md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            {t("callPrefix")}{" "}
            <a
              href={SITE.phoneHref}
              className="font-semibold text-primary-deep underline underline-offset-4"
            >
              {SITE.phone}
            </a>{" "}
            {t("callSuffix")}
          </p>
        </div>
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
      </div>
    </section>
  );
}

function CtaSection() {
  const t = useTranslations("home.cta");
  return (
    <section className="relative overflow-hidden bg-[#0b0b0c] py-24 text-white md:py-32">
      <div aria-hidden className="absolute inset-0 grid-mask opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px]"
      />
      <div className="container-x relative text-center">
        <span className="eyebrow !text-primary">{t("eyebrow")}</span>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-white text-balance md:text-6xl">
          {t("heading")}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{t("paragraph")}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary">
            {t("ctaQuote")} <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={SITE.phoneHref} className="btn-ghost-light">
            <Phone className="h-4 w-4" /> {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
