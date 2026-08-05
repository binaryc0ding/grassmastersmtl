"use client";

import { useRef, useState } from "react";
import { GripVertical } from "lucide-react";

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  };

  return (
    <div
      ref={wrap}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lift select-none"
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      <img
        src={after}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img src={before} alt={beforeAlt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
        Before
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
        After
      </div>
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${pos}%` }}
      >
        <button
          aria-label="Drag to compare"
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 cursor-ew-resize place-items-center rounded-full bg-white text-ink shadow-lift ring-4 ring-white/40"
        >
          <GripVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
