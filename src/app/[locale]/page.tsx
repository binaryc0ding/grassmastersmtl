import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";
import { HomeContent } from "./home-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      ...baseOpenGraph(locale),
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/assets/hero-lawn.jpg"],
      url: getPathname({ locale, href: "/" }),
    },
    alternates: localizedAlternates(locale, "/"),
  };
}

export default function Home() {
  return <HomeContent />;
}
