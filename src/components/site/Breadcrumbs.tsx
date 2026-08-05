import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppHref } from "@/lib/metadata";

export function Breadcrumbs({ items }: { items: { name: string; href?: AppHref }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, index) => (
        <span key={item.name} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30" aria-hidden />}
          {item.href ? (
            <Link href={item.href} className="text-white/60 transition hover:text-white">
              {item.name}
            </Link>
          ) : (
            <span className="text-white/90">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
