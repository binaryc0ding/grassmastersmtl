import { defineRouting } from "next-intl/routing";

/**
 * Keys are the internal (file-system) routes — always English. Values are the
 * public URL per locale. Dynamic segments are localized separately: the static
 * part comes from here, the slug value from `SERVICES`/`AREAS` in `@/lib/site`.
 *
 * French slugs stay ASCII-only (no accents) so URLs never need percent-encoding.
 */
export const pathnames = {
  "/": "/",
  "/services": "/services",
  "/services/[slug]": "/services/[slug]",
  "/areas": {
    "fr-CA": "/secteurs",
    "en-CA": "/areas",
  },
  "/areas/[city]": {
    "fr-CA": "/secteurs/[city]",
    "en-CA": "/areas/[city]",
  },
  "/gallery": {
    "fr-CA": "/galerie",
    "en-CA": "/gallery",
  },
  "/about": {
    "fr-CA": "/a-propos",
    "en-CA": "/about",
  },
  "/faq": "/faq",
  "/contact": "/contact",
  "/privacy": {
    "fr-CA": "/confidentialite",
    "en-CA": "/privacy",
  },
  "/terms": {
    "fr-CA": "/conditions",
    "en-CA": "/terms",
  },
  "/thank-you": {
    "fr-CA": "/merci",
    "en-CA": "/thank-you",
  },
} as const;

export const routing = defineRouting({
  locales: ["fr-CA", "en-CA"],
  defaultLocale: "fr-CA",
  localeDetection: false,
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "en-CA": "/en",
    },
  },
  pathnames,
});

export type Locale = (typeof routing.locales)[number];
