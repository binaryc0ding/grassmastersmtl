import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";
import { SERVICES, serviceSlug } from "@/lib/site";

const sodImg = "/assets/service-sod.jpg";
const sodRemovalImg = "/assets/service-sod-removal.jpg";
const hardscapeImg = "/assets/service-hardscape.jpg";
const mulchImg = "/assets/service-mulch.jpg";
const stoneImg = "/assets/service-stone.jpg";
const transformImg = "/assets/service-lawn-transform.jpg";
const gallery1 = "/assets/gallery-1.jpg";

const imgMap: Record<string, string> = {
  sod: sodImg,
  removal: sodRemovalImg,
  hardscape: hardscapeImg,
  mulch: mulchImg,
  stone: stoneImg,
  transform: transformImg,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      ...baseOpenGraph(locale),
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/assets/gallery-1.jpg"],
      url: getPathname({ locale, href: "/services" }),
    },
    alternates: localizedAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const items = t.raw("items") as Record<string, { tag: string; title: string; desc: string }>;

  return (
    <>
      <section className="relative overflow-hidden bg-[#0b0b0c] pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <img
          src={gallery1}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"
        />
        <div className="container-x relative">
          <span className="eyebrow !text-primary">{t("eyebrow")}</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{t("paragraph")}</p>
        </div>
      </section>

      <div className="container-x py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const item = items[s.slug];
            return (
              <Link
                key={s.slug}
                href={{
                  pathname: "/services/[slug]",
                  params: { slug: serviceSlug(s.slug, locale) },
                }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={imgMap[s.img]}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="eyebrow">{item.tag}</span>
                  <h2 className="mt-3 font-display text-2xl font-bold text-ink">{item.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{item.desc}</p>
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
    </>
  );
}
