import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, Phone } from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.thankYou" });

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false },
    openGraph: {
      ...baseOpenGraph(locale),
      title: t("ogTitle"),
      images: ["/assets/hero-lawn.jpg"],
      url: getPathname({ locale, href: "/thank-you" }),
    },
    alternates: localizedAlternates(locale, "/thank-you"),
  };
}

export default async function ThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "thankYou" });

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#0b0b0c] pt-32 pb-20 text-white">
      <div aria-hidden className="absolute inset-0 grid-mask opacity-25" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px]"
      />
      <div className="container-x relative mx-auto max-w-2xl text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-white shadow-lift">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-6xl">
          {t("heading")}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/70">{t("paragraph")}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={SITE.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" /> {t("callLabel", { phone: SITE.phone })}
          </a>
          <Link href="/gallery" className="btn-ghost-light">
            {t("browseGallery")}
          </Link>
        </div>
      </div>
    </section>
  );
}
