import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2, Phone, Star } from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";
import { AREAS, SITE, SERVICES, areaFromSlug, areaSlug, serviceSlug } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/site/JsonLd";

const heroImg = "/assets/hero-lawn.jpg";

type AreaItem = {
  name: string;
  heading: string;
  intro: string;
  highlights: string[];
  testimonial?: { name: string; quote: string };
  faq: { q: string; a: string }[];
};

/** `city` in the URL is the locale's slug, not the canonical one. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locales = params?.locale ? [params.locale] : [...routing.locales];
  return locales.flatMap((locale) => AREAS.map((a) => ({ city: areaSlug(a.slug, locale) })));
}

/** Href builder for the alternates/canonical of this area in any locale. */
const hrefFor = (canonical: string) => (l: string) =>
  ({ pathname: "/areas/[city]", params: { city: areaSlug(canonical, l) } }) as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city: localizedCity } = await params;
  const area = areaFromSlug(localizedCity, locale);
  if (!area) return {};
  const city = area.slug;

  const t = await getTranslations({ locale, namespace: "metadata.areas" });

  return {
    title: t(`${city}.title`),
    description: t(`${city}.description`),
    openGraph: {
      ...baseOpenGraph(locale),
      title: t(`${city}.title`),
      description: t(`${city}.description`),
      images: [heroImg],
      url: getPathname({ locale, href: hrefFor(city)(locale) }),
    },
    alternates: localizedAlternates(locale, hrefFor(city)),
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city: localizedCity } = await params;
  const area = areaFromSlug(localizedCity, locale);
  if (!area) notFound();
  const city = area.slug;

  const t = await getTranslations({ locale, namespace: "areas" });
  const item = t.raw(`items.${city}`) as AreaItem;
  const tServices = await getTranslations({ locale, namespace: "services" });
  const serviceItems = Object.fromEntries(
    SERVICES.map((s) => [
      s.slug,
      tServices.raw(`items.${s.slug}`) as { tag: string; title: string },
    ]),
  );

  return (
    <>
      <ServiceJsonLd
        name={item.heading}
        description={item.intro}
        url={getPathname({ locale, href: hrefFor(city)(locale) })}
        areaServed={[item.name]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: t("breadcrumbHome"), url: getPathname({ locale, href: "/" }) },
          { name: t("breadcrumbAreas"), url: getPathname({ locale, href: "/areas" }) },
          { name: item.name, url: getPathname({ locale, href: hrefFor(city)(locale) }) },
        ]}
      />
      <FaqJsonLd items={item.faq} />

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
        <div className="container-x relative max-w-3xl">
          <Breadcrumbs
            items={[
              { name: t("breadcrumbHome"), href: "/" },
              { name: t("breadcrumbAreas"), href: "/areas" },
              { name: item.name },
            ]}
          />
          <span className="eyebrow !text-primary">{t("eyebrow")}</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-6xl">
            {item.heading}
          </h1>
          <p className="mt-5 text-lg text-white/75">{item.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              {t("getQuote")} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={SITE.phoneHref} className="btn-outline-dark">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-6 sm:grid-cols-3">
          {item.highlights.map((h) => (
            <div
              key={h}
              className="flex items-start gap-2.5 rounded-2xl border border-black/5 bg-surface p-5 text-sm font-medium text-ink"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {h}
            </div>
          ))}
        </div>

        <div className="container-x mt-16">
          <h2 className="font-display text-2xl font-bold text-ink">{t("servicesHeading")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={{
                  pathname: "/services/[slug]",
                  params: { slug: serviceSlug(s.slug, locale) },
                }}
                className="group rounded-2xl border border-black/5 bg-surface p-5 transition hover:border-primary/30 hover:bg-white hover:shadow-soft"
              >
                <p className="eyebrow">{serviceItems[s.slug]?.tag}</p>
                <h3 className="mt-1.5 font-display text-base font-bold text-ink">
                  {serviceItems[s.slug]?.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {item.testimonial && (
          <div className="container-x mt-16">
            <p className="eyebrow">{t("testimonialEyebrow")}</p>
            <figure className="mt-4 max-w-2xl rounded-3xl border border-black/5 bg-surface p-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">
                &ldquo;{item.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-ink-soft">
                {item.testimonial.name}, {item.name}
              </figcaption>
            </figure>
          </div>
        )}

        {item.faq.length > 0 && (
          <div className="container-x mt-16">
            <h2 className="font-display text-2xl font-bold text-ink">{t("faqHeading")}</h2>
            <div className="mt-6 max-w-2xl space-y-3">
              {item.faq.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-black/5 bg-surface p-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-ink">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
