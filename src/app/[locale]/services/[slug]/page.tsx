import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";
import { AREAS, SITE, SERVICES, serviceFromSlug, serviceSlug } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/site/JsonLd";

const sodImg = "/assets/service-sod.jpg";
const sodRemovalImg = "/assets/service-sod-removal.jpg";
const hardscapeImg = "/assets/service-hardscape.jpg";
const mulchImg = "/assets/service-mulch.jpg";
const stoneImg = "/assets/service-stone.jpg";
const transformImg = "/assets/service-lawn-transform.jpg";

const imgMap: Record<string, string> = {
  sod: sodImg,
  removal: sodRemovalImg,
  hardscape: hardscapeImg,
  mulch: mulchImg,
  stone: stoneImg,
  transform: transformImg,
};

type ServiceItem = {
  tag: string;
  title: string;
  desc: string;
  longDesc: string;
  benefits: string[];
  faq: { q: string; a: string }[];
};

/** `slug` in the URL is the locale's slug, not the canonical one. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locales = params?.locale ? [params.locale] : [...routing.locales];
  return locales.flatMap((locale) => SERVICES.map((s) => ({ slug: serviceSlug(s.slug, locale) })));
}

/** Href builder for the alternates/canonical of this service in any locale. */
const hrefFor = (canonical: string) => (l: string) =>
  ({ pathname: "/services/[slug]", params: { slug: serviceSlug(canonical, l) } }) as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug: localizedSlug } = await params;
  const service = serviceFromSlug(localizedSlug, locale);
  if (!service) return {};
  const slug = service.slug;

  const t = await getTranslations({ locale, namespace: "metadata.serviceDetail" });

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.description`),
    openGraph: {
      ...baseOpenGraph(locale),
      title: t(`${slug}.title`),
      description: t(`${slug}.description`),
      images: [imgMap[service.img]],
      url: getPathname({ locale, href: hrefFor(slug)(locale) }),
    },
    alternates: localizedAlternates(locale, hrefFor(slug)),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug: localizedSlug } = await params;
  const service = serviceFromSlug(localizedSlug, locale);
  if (!service) notFound();
  const slug = service.slug;

  const t = await getTranslations({ locale, namespace: "services" });
  const item = t.raw(`items.${slug}`) as ServiceItem;
  const tAreas = await getTranslations({ locale, namespace: "areas.items" });
  const areaNames = AREAS.map((a) => tAreas(`${a.slug}.name`));

  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);
  const relatedItems = Object.fromEntries(
    related.map((s) => [s.slug, t.raw(`items.${s.slug}`) as ServiceItem]),
  );

  return (
    <>
      <ServiceJsonLd
        name={item.title}
        description={item.desc}
        url={getPathname({ locale, href: hrefFor(slug)(locale) })}
        areaServed={areaNames}
      />
      <BreadcrumbJsonLd
        items={[
          { name: t("breadcrumbHome"), url: getPathname({ locale, href: "/" }) },
          { name: t("breadcrumbServices"), url: getPathname({ locale, href: "/services" }) },
          { name: item.title, url: getPathname({ locale, href: hrefFor(slug)(locale) }) },
        ]}
      />
      <FaqJsonLd items={item.faq} />

      <section className="relative overflow-hidden bg-[#0b0b0c] pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <img
          src={imgMap[service.img]}
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
              { name: t("breadcrumbServices"), href: "/services" },
              { name: item.title },
            ]}
          />
          <span className="eyebrow !text-primary">{item.tag}</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-6xl">
            {item.title}
          </h1>
          <p className="mt-5 text-lg text-white/75">{item.desc}</p>
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
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-ink-soft">{item.longDesc}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {item.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 rounded-2xl border border-black/5 bg-surface px-4 py-3 text-sm font-medium text-ink"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {b}
                </li>
              ))}
            </ul>

            {item.faq.length > 0 && (
              <div className="mt-10 space-y-3">
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
            )}
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-lift">
            <img
              src={imgMap[service.img]}
              alt={item.title}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        {related.length > 0 && (
          <div className="container-x mt-20 border-t border-black/5 pt-14">
            <h2 className="font-display text-2xl font-bold text-ink">{t("relatedHeading")}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={{
                    pathname: "/services/[slug]",
                    params: { slug: serviceSlug(s.slug, locale) },
                  }}
                  className="group rounded-3xl border border-black/5 bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <p className="eyebrow">{relatedItems[s.slug].tag}</p>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">
                    {relatedItems[s.slug].title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep">
                    {t("learnMore")}{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
