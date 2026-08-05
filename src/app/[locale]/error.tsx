"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { reportLovableError } from "@/lib/lovable-error-reporting";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "next_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("heading")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("description")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => reset()} className="btn-primary">
            {t("retry")}
          </button>
          <Link href="/" className="btn-outline-dark">
            {t("home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
