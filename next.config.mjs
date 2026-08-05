import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * The French (default, unprefixed) URLs were renamed when localized pathnames
 * landed. These 308s keep the previously indexed English-slug URLs alive.
 * `/en/*` is unchanged and needs no redirects.
 */
const LEGACY_FR_REDIRECTS = [
  ["/about", "/a-propos"],
  ["/gallery", "/galerie"],
  ["/areas", "/secteurs"],
  ["/privacy", "/confidentialite"],
  ["/terms", "/conditions"],
  ["/thank-you", "/merci"],
  ["/services/sod-installation", "/services/installation-de-gazon"],
  ["/services/sod-removal", "/services/enlevement-de-gazon"],
  ["/services/hardscaping", "/services/amenagement-paysager"],
  ["/services/mulch-installation", "/services/installation-de-paillis"],
  ["/services/decorative-stone", "/services/pierre-decorative"],
  ["/services/river-stone", "/services/pierre-de-riviere"],
  ["/services/lawn-transformations", "/services/transformation-de-pelouse"],
  ["/areas/montreal", "/secteurs/montreal"],
  ["/areas/laval", "/secteurs/laval"],
  ["/areas/west-island", "/secteurs/rive-ouest"],
  ["/areas/south-shore", "/secteurs/rive-sud"],
  ["/areas/north-shore", "/secteurs/rive-nord"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return LEGACY_FR_REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);
