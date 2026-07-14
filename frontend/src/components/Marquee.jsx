import React from "react";

export const Marquee = ({ text, stroke = true }) => {
  const items = Array.from({ length: 8 });
  return (
    <div
      data-testid="marquee-band"
      className="relative w-full overflow-hidden border-y border-black/10 py-6 md:py-10 select-none"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {items.map((_, i) => (
          <span
            key={i}
            className={`font-display text-[9vw] leading-none uppercase px-6 ${
              stroke ? (i % 2 ? "text-stroke-brick" : "text-stroke") : "text-ink"
            }`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
