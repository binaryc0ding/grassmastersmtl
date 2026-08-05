import { useLocale, useTranslations } from "next-intl";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AREAS, NAV, SERVICES, SITE, areaSlug, serviceSlug } from "@/lib/site";

export function SiteFooter() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tAreas = useTranslations("areas.items");
  const hoursItems = t.raw("hoursItems") as { day: string; range: string }[];
  const serviceLinks = t.raw("serviceLinks") as Record<string, string>;

  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0b0b0c] text-white/80">
      <div aria-hidden className="absolute inset-0 grid-mask opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
      />

      <div className="container-x relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d="M4 20C4 12 10 5 20 4c-.5 10-7.5 16-16 16Z" fill="currentColor" />
                </svg>
              </span>
              <span className="font-display text-base font-extrabold text-white">
                Grassmasters<span className="text-primary"> MTL</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{t("tagline")}</p>
            <div className="mt-6 flex gap-2">
              <a
                href={SITE.instagram}
                aria-label={t("instagramAria")}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.facebook}
                aria-label={t("facebookAria")}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition hover:border-primary hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {t("navigate")}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/70 transition hover:text-primary">
                    {tNav(n.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {t("services")}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={{
                      pathname: "/services/[slug]",
                      params: { slug: serviceSlug(s.slug, locale) },
                    }}
                    className="text-white/70 transition hover:text-primary"
                  >
                    {serviceLinks[s.slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {t("areas")}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {AREAS.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={{
                      pathname: "/areas/[city]",
                      params: { city: areaSlug(a.slug, locale) },
                    }}
                    className="text-white/70 transition hover:text-primary"
                  >
                    {tAreas(`${a.slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {t("contact")}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-start gap-2.5 text-white/80 hover:text-primary"
                >
                  <Phone className="mt-0.5 h-4 w-4 text-primary" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.emailHref}
                  className="flex items-start gap-2.5 text-white/80 hover:text-primary break-all"
                >
                  <Mail className="mt-0.5 h-4 w-4 text-primary" /> {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" /> {t("servingArea")}
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                {t("hours")}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-white/60">
                {hoursItems.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="text-white/80">{h.range}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
