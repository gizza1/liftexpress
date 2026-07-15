import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";

/*
 * Interactive selector: a button reveals the list of options; picking one
 * animates in its photo + descriptive text. Used for lift types and parts.
 */
export const InteractiveShowcase = ({ items, buttonLabel, testidPrefix, lang }) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const current = items[active];

  return (
    <div data-testid={`${testidPrefix}-showcase`} className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
      {/* Selector column */}
      <div>
        <button
          onClick={() => setOpen((p) => !p)}
          data-testid={`${testidPrefix}-toggle`}
          className="group w-full flex items-center justify-between gap-4 bg-ink text-white px-6 py-5 uppercase tracking-[0.12em] text-sm font-bold"
        >
          <span className="truncate">{open ? buttonLabel : current.title}</span>
          <ChevronDown size={20} className={`shrink-0 text-brick transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-x border-b border-black/10"
            >
              {items.map((item, i) => (
                <li key={item.key}>
                  <button
                    onClick={() => { setActive(i); setOpen(false); }}
                    data-testid={`${testidPrefix}-option-${item.key}`}
                    className={`group w-full text-left flex items-center gap-4 px-6 py-4 border-b border-black/5 last:border-0 transition-colors ${
                      i === active ? "bg-brick/5 text-brick" : "hover:bg-black/[0.03]"
                    }`}
                  >
                    <Plus size={16} className="text-brick shrink-0" />
                    <span className="font-medium">{item.title}</span>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Quick pills (always visible for fast switching) */}
        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <button
              key={item.key}
              onClick={() => setActive(i)}
              data-testid={`${testidPrefix}-pill-${item.key}`}
              className={`text-xs uppercase tracking-wider px-4 py-2 border rounded-full transition-all ${
                i === active ? "bg-brick border-brick text-white" : "border-black/15 hover:border-brick hover:text-brick"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Detail column */}
      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`${testidPrefix}-detail`}
          >
            <div className="relative overflow-hidden">
              <img src={current.image} alt={current.title} className="w-full aspect-[4/3] object-cover" />
              {current.tag && (
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 text-xs uppercase tracking-[0.15em] font-bold text-brick">
                  {current.tag}
                </span>
              )}
            </div>
            <h3 className="font-display text-3xl md:text-4xl tracking-tight mt-6">{current.title}</h3>
            <p className="text-ash mt-4 text-lg leading-relaxed">{current.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
