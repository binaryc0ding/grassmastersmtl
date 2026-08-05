import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight, MapPin } from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";
import { AREAS, areaSlug } from "@/lib/site";

const heroImg = "/assets/hero-lawn.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.areasIndex" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      ...baseOpenGraph(locale),
      title: t("title"),
      description: t("description"),
      images: [heroImg],
      url: getPathname({ locale, href: "/areas" }),
    },
    alternates: localizedAlternates(locale, "/areas"),
  };
}

export default async function AreasIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "areas" });
  const tIndex = await getTranslations({ locale, namespace: "areasIndex" });
  const items = t.raw("items") as Record<string, { name: string; intro: string }>;

  return (
    <>
      <section className="relative overflow-hidden bg-[#0b0b0c] pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"
        />
        <div className="container-x relative">
          <span className="eyebrow !text-primary">{tIndex("eyebrow")}</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-6xl">
            {tIndex("heading")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{tIndex("paragraph")}</p>
        </div>
      </section>

      <div className="container-x py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a) => {
            const item = items[a.slug];
            return (
              <Link
                key={a.slug}
                href={{ pathname: "/areas/[city]", params: { city: areaSlug(a.slug, locale) } }}
                className="group flex flex-col rounded-3xl border border-black/5 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary-deep">
                  <MapPin className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-bold text-ink">{item.name}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{item.intro}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep">
                  {tIndex("learnMore")}{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
