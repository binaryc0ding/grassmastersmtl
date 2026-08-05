"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { SITE } from "@/lib/site";

function buildSchema(t: ReturnType<typeof useTranslations<"contact.validation">>) {
  return z.object({
    name: z.string().trim().min(2, t("name")).max(80),
    phone: z.string().trim().min(7, t("phone")).max(30),
    email: z.string().trim().email(t("email")).max(120),
    city: z.string().trim().min(2, t("city")).max(60),
    address: z.string().trim().max(160).optional().or(z.literal("")),
    service: z.string().min(1, t("service")),
    message: z.string().trim().max(1200).optional().or(z.literal("")),
  });
}

export function ContactContent() {
  const router = useRouter();
  const t = useTranslations("contact");
  const tValidation = useTranslations("contact.validation");
  const tServices = useTranslations("footer.serviceLinks");
  const tFooter = useTranslations("footer");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const serviceOptions: { value: string; label: string }[] = [
    { value: "sod-installation", label: tServices("sod-installation") },
    { value: "sod-removal", label: tServices("sod-removal") },
    { value: "hardscaping", label: tServices("hardscaping") },
    { value: "mulch-installation", label: tServices("mulch-installation") },
    { value: "decorative-stone", label: tServices("decorative-stone") },
    { value: "river-stone", label: tServices("river-stone") },
    { value: "lawn-transformations", label: tServices("lawn-transformations") },
    { value: "unsure", label: t("serviceUnsure") },
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form) as Record<string, string>;
    const parsed = buildSchema(tValidation).safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    router.push("/thank-you");
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#0b0b0c] pt-32 pb-16 text-white md:pt-40 md:pb-20">
        <div aria-hidden className="absolute inset-0 grid-mask opacity-25" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 h-[380px] w-[720px] rounded-full bg-primary/20 blur-[140px]"
        />
        <div className="container-x relative max-w-3xl">
          <span className="eyebrow !text-primary">{t("eyebrow")}</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white text-balance md:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-5 text-lg text-white/70">{t("subheading")}</p>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft md:p-10"
          >
            <h2 className="font-display text-2xl font-bold text-ink">{t("formTitle")}</h2>
            <p className="mt-1 text-sm text-ink-soft">{t("requiredNote")}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label={t("fieldName")} name="name" error={errors.name} />
              <Field label={t("fieldPhone")} name="phone" type="tel" error={errors.phone} />
              <Field label={t("fieldEmail")} name="email" type="email" error={errors.email} />
              <Field label={t("fieldCity")} name="city" error={errors.city} />
              <Field
                className="sm:col-span-2"
                label={t("fieldAddress")}
                name="address"
                error={errors.address}
              />
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  {t("fieldService")}
                </label>
                <select
                  name="service"
                  defaultValue=""
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="" disabled>
                    {t("fieldServicePlaceholder")}
                  </option>
                  {serviceOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1.5 text-xs font-medium text-destructive">{errors.service}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-ink">
                  {t("fieldMessage")}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={1200}
                  placeholder={t("fieldMessagePlaceholder")}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="submit" disabled={loading} className="btn-primary disabled:opacity-70">
                <Send className="h-4 w-4" /> {loading ? t("sending") : t("submit")}
              </button>
              <a href={SITE.phoneHref} className="btn-outline-dark">
                <Phone className="h-4 w-4" /> {t("callLabel", { phone: SITE.phone })}
              </a>
            </div>
          </form>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
                {t("directContact")}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <a href={SITE.phoneHref} className="font-medium text-ink hover:text-primary-deep">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <a
                    href={SITE.emailHref}
                    className="font-medium text-ink hover:text-primary-deep break-all"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span className="text-ink">{t("servingArea")}</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
                {t("hours")}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {(tFooter.raw("hoursItems") as { day: string; range: string }[]).map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-ink-soft">{h.day}</span>
                    <span className="font-medium text-ink">{h.range}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
              <iframe
                title="Grassmasters MTL Montreal service area"
                src="https://www.google.com/maps?q=Montreal%2C+QC&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <Link
              href="/faq"
              className="block rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-6 text-white shadow-lift"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                {t("faqEyebrow")}
              </p>
              <p className="mt-2 font-display text-lg font-bold">{t("faqTitle")}</p>
              <p className="mt-1 text-sm text-white/80">{t("faqBody")}</p>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
