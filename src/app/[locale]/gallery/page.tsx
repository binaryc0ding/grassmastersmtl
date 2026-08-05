import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { baseOpenGraph, localizedAlternates } from "@/lib/metadata";
import { GalleryContent } from "./gallery-content";

const heroImg = "/assets/hero-lawn.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.gallery" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      ...baseOpenGraph(locale),
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [heroImg],
      url: getPathname({ locale, href: "/gallery" }),
    },
    twitter: {
      images: [heroImg],
    },
    alternates: localizedAlternates(locale, "/gallery"),
  };
}

export default function GalleryPage() {
  return <GalleryContent />;
}
