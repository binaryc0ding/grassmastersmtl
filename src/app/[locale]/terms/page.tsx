import type { Metadata } from "next";
import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.terms" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      ...baseOpenGraph(locale),
      title: t("title"),
      images: ["/assets/hero-lawn.jpg"],
      url: getPathname({ locale, href: "/terms" }),
    },
    alternates: localizedAlternates(locale, "/terms"),
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  const sections = t.raw("sections") as { heading: string; body: string }[];

  return (
    <section className="bg-white pt-32 pb-20 md:pt-40">
      <div className="container-x mx-auto max-w-3xl">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
          {t("title")}
        </h1>
        <div className="mt-8 space-y-6 text-ink-soft">
          <p>{t("intro")}</p>
          {sections.map((s) => (
            <Fragment key={s.heading}>
              <h2 className="font-display text-2xl font-bold text-ink">{s.heading}</h2>
              <p>{s.body}</p>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
