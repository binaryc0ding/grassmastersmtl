export const BASE_URL = "https://grassmastersmtl.ca";

export const SITE = {
  name: "Grassmasters MTL",
  phone: "+1 438-483-6077",
  phoneHref: "tel:+14384836077",
  email: "Grassmastersmtl@outlook.com",
  emailHref: "mailto:Grassmastersmtl@outlook.com",
  instagram: "https://instagram.com/GrassmastersMTL",
  facebook: "https://facebook.com/GrassmastersMTL",
  city: "Montreal",
  region: "Quebec",
  country: "Canada",
  hours: [
    { day: "Monday", open: "07:00", close: "19:00" },
    { day: "Tuesday", open: "07:00", close: "19:00" },
    { day: "Wednesday", open: "07:00", close: "19:00" },
    { day: "Thursday", open: "07:00", close: "19:00" },
    { day: "Friday", open: "07:00", close: "19:00" },
    { day: "Saturday", open: "08:00", close: "17:00" },
  ],
} as const;

export const NAV = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "gallery", href: "/gallery" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

/**
 * `slug` is the canonical, internal id — it keys the translation messages
 * (`services.items.<slug>`), the image map and `generateStaticParams`.
 * `slugs` holds the public URL segment per locale. Never key data off `slugs`.
 */
export const SERVICES = [
  {
    slug: "sod-installation",
    icon: "Sprout",
    img: "sod",
    slugs: { "fr-CA": "installation-de-gazon", "en-CA": "sod-installation" },
  },
  {
    slug: "sod-removal",
    icon: "Shovel",
    img: "sod",
    slugs: { "fr-CA": "enlevement-de-gazon", "en-CA": "sod-removal" },
  },
  {
    slug: "hardscaping",
    icon: "Blocks",
    img: "hardscape",
    slugs: { "fr-CA": "amenagement-paysager", "en-CA": "hardscaping" },
  },
  {
    slug: "mulch-installation",
    icon: "Leaf",
    img: "mulch",
    slugs: { "fr-CA": "installation-de-paillis", "en-CA": "mulch-installation" },
  },
  {
    slug: "decorative-stone",
    icon: "Gem",
    img: "stone",
    slugs: { "fr-CA": "pierre-decorative", "en-CA": "decorative-stone" },
  },
  {
    slug: "river-stone",
    icon: "Waves",
    img: "stone",
    slugs: { "fr-CA": "pierre-de-riviere", "en-CA": "river-stone" },
  },
  {
    slug: "lawn-transformations",
    icon: "Wand2",
    img: "sod",
    slugs: { "fr-CA": "transformation-de-pelouse", "en-CA": "lawn-transformations" },
  },
] as const;

export const AREAS = [
  { slug: "montreal", slugs: { "fr-CA": "montreal", "en-CA": "montreal" } },
  { slug: "laval", slugs: { "fr-CA": "laval", "en-CA": "laval" } },
  { slug: "west-island", slugs: { "fr-CA": "rive-ouest", "en-CA": "west-island" } },
  { slug: "south-shore", slugs: { "fr-CA": "rive-sud", "en-CA": "south-shore" } },
  { slug: "north-shore", slugs: { "fr-CA": "rive-nord", "en-CA": "north-shore" } },
] as const;

type SlugEntry = { readonly slug: string; readonly slugs: Readonly<Record<string, string>> };

function toLocalized(entries: readonly SlugEntry[], slug: string, locale: string) {
  return entries.find((e) => e.slug === slug)?.slugs[locale] ?? slug;
}

function fromLocalized(entries: readonly SlugEntry[], localized: string, locale: string) {
  return entries.find((e) => e.slugs[locale] === localized);
}

/** Canonical slug -> public URL segment for `locale`. */
export function serviceSlug(slug: string, locale: string) {
  return toLocalized(SERVICES, slug, locale);
}

/** Public URL segment -> service entry. `undefined` when it isn't valid for `locale`. */
export function serviceFromSlug(localized: string, locale: string) {
  return fromLocalized(SERVICES, localized, locale) as (typeof SERVICES)[number] | undefined;
}

/** Canonical slug -> public URL segment for `locale`. */
export function areaSlug(slug: string, locale: string) {
  return toLocalized(AREAS, slug, locale);
}

/** Public URL segment -> area entry. `undefined` when it isn't valid for `locale`. */
export function areaFromSlug(localized: string, locale: string) {
  return fromLocalized(AREAS, localized, locale) as (typeof AREAS)[number] | undefined;
}

const STATIC_ROUTES = [
  "/services",
  "/areas",
  "/gallery",
  "/about",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/thank-you",
] as const;

/**
 * Builds the href of the current page in another locale, from the segments of
 * the *internal* route (`useSelectedLayoutSegments()`), e.g. `["areas","rive-sud"]`.
 *
 * Deliberately not built on `usePathname()`: for the unprefixed default locale
 * that hook resolves differently during SSR than after hydration, which would
 * ship a wrong href in the static HTML. Dynamic slugs are re-mapped to the
 * target locale, so FR `/secteurs/rive-sud` toggles to `/en/areas/south-shore`.
 * Unknown routes (e.g. not-found) fall back to the home page.
 */
export function localeSwitchHref(segments: string[], from: string, to: string) {
  const [first, second] = segments;

  if (first === "services" && second) {
    const service = serviceFromSlug(second, from);
    return service
      ? ({ pathname: "/services/[slug]", params: { slug: serviceSlug(service.slug, to) } } as const)
      : ("/services" as const);
  }
  if (first === "areas" && second) {
    const area = areaFromSlug(second, from);
    return area
      ? ({ pathname: "/areas/[city]", params: { city: areaSlug(area.slug, to) } } as const)
      : ("/areas" as const);
  }

  const route = STATIC_ROUTES.find((r) => r === `/${first}`);
  return route ?? ("/" as const);
}
