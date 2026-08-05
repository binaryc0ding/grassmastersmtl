import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Leaf, MapPin, ShieldCheck, Sparkles, Users, type LucideIcon } from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";

const heroImg = "/assets/hero-lawn.jpg";
const gallery1 = "/assets/gallery-1.jpg";
const gallery3 = "/assets/gallery-3.jpg";

const VALUE_ICONS: LucideIcon[] = [ShieldCheck, Sparkles, Users, Leaf];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      ...baseOpenGraph(locale),
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [heroImg],
      url: getPathname({ locale, href: "/about" }),
    },
    twitter: {
      images: [heroImg],
    },
    alternates: localizedAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const stats = t.raw("stats") as { value: string; label: string }[];
  const values = t.raw("values") as { title: string; desc: string }[];

  return (
    <>
      <section className="relative overflow-hidden bg-[#0b0b0c] pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black"
        />
        <div className="container-x relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow !text-primary">{t("eyebrow")}</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-6xl">
              {t("heading")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75">{t("intro")}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="font-display text-3xl font-extrabold text-white">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-3xl shadow-lift">
              <img
                src={gallery1}
                alt="Aerial view of Grassmasters project"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-3xl shadow-soft">
                <img
                  src={gallery3}
                  alt="Front yard transformation"
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-black/5 bg-surface p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary-deep">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-bold text-ink">{t("basedIn")}</p>
                  <p className="text-xs text-ink-soft">{t("servingAreas")}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow">{t("storyEyebrow")}</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink text-balance md:text-5xl">
              {t("storyHeading")}
            </h2>
            <div className="mt-6 space-y-4 text-lg text-ink-soft">
              <p>{t("storyP1")}</p>
              <p>{t("storyP2")}</p>
              <p>{t("storyP3")}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                {t("startProject")}
              </Link>
              <Link href="/gallery" className="btn-outline-dark">
                {t("seeWork")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t("valuesEyebrow")}</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink text-balance md:text-5xl">
              {t("valuesHeading")}
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, idx) => {
              const Icon = VALUE_ICONS[idx];
              return (
                <div
                  key={v.title}
                  className="group rounded-3xl border border-black/5 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary-deep transition group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
