import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Anything `Link`/`getPathname` accepts: a pathname key, or `{pathname, params}`. */
export type AppHref = Parameters<typeof getPathname>[0]["href"];

/**
 * Next.js does not deep-merge `openGraph` between a layout and a page — a page's
 * `openGraph` object fully replaces the layout's. Spread this into every page-level
 * `openGraph` object so siteName/type/locale stay present everywhere.
 */
export function baseOpenGraph(locale: string) {
  return {
    siteName: "Grassmasters MTL",
    type: "website" as const,
    locale: locale === "fr-CA" ? "fr_CA" : "en_CA",
  };
}

/**
 * Pass a function for dynamic routes: the slug itself differs per locale, so the
 * href has to be rebuilt for each alternate (e.g. `/services/installation-de-gazon`
 * vs `/en/services/sod-installation`).
 */
export function localizedAlternates(locale: string, href: AppHref | ((l: string) => AppHref)) {
  const hrefFor = (l: string) => (typeof href === "function" ? href(l) : href);

  return {
    canonical: getPathname({ locale, href: hrefFor(locale) }),
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, getPathname({ locale: l, href: hrefFor(l) })]),
    ),
  };
}
