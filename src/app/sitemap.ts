import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AREAS, BASE_URL, SERVICES, areaSlug, serviceSlug } from "@/lib/site";
import type { AppHref } from "@/lib/metadata";

/**
 * `href` is a function because dynamic slugs differ per locale —
 * `/services/installation-de-gazon` vs `/en/services/sod-installation`.
 */
const ROUTES: {
  href: (locale: string) => AppHref;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { href: () => "/", changeFrequency: "weekly", priority: 1.0 },
  { href: () => "/services", changeFrequency: "monthly", priority: 0.9 },
  ...SERVICES.map((s) => ({
    href: (locale: string) =>
      ({ pathname: "/services/[slug]", params: { slug: serviceSlug(s.slug, locale) } }) as const,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  { href: () => "/areas", changeFrequency: "monthly", priority: 0.8 },
  ...AREAS.map((a) => ({
    href: (locale: string) =>
      ({ pathname: "/areas/[city]", params: { city: areaSlug(a.slug, locale) } }) as const,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  { href: () => "/gallery", changeFrequency: "monthly", priority: 0.8 },
  { href: () => "/about", changeFrequency: "monthly", priority: 0.7 },
  { href: () => "/faq", changeFrequency: "monthly", priority: 0.7 },
  { href: () => "/contact", changeFrequency: "monthly", priority: 0.9 },
  { href: () => "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { href: () => "/terms", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE_URL}${getPathname({ locale, href: route.href(locale) })}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `${BASE_URL}${getPathname({ locale: l, href: route.href(l) })}`,
          ]),
        ),
      },
    })),
  );
}
