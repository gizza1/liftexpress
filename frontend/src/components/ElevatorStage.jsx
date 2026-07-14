import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t } from "../lib/content";

/*
 * Signature moment: a full-screen elevator whose doors slide open as the
 * user scrolls, revealing the hero content behind them.
 */
export const ElevatorStage = ({ children }) => {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const stageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.75], ["0%", "-101%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.75], ["0%", "101%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1.18, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [0.25, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const seamOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  if (reduce) {
    return <div className="relative min-h-screen">{children}</div>;
  }

  return (
    <section ref={stageRef} data-testid="elevator-stage" className="relative h-[240vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Hero behind the doors */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          {children}
        </motion.div>

        {/* LEFT DOOR */}
        <motion.div
          style={{ x: leftX }}
          className="door-metal absolute left-0 top-0 h-full w-1/2 z-40 shadow-[inset_-40px_0_60px_-30px_rgba(0,0,0,0.35)]"
        >
          <DoorFace side="left" lang={lang} />
        </motion.div>

        {/* RIGHT DOOR */}
        <motion.div
          style={{ x: rightX }}
          className="door-metal absolute right-0 top-0 h-full w-1/2 z-40 shadow-[inset_40px_0_60px_-30px_rgba(0,0,0,0.35)]"
        >
          <DoorFace side="right" lang={lang} />
        </motion.div>

        {/* Center seam */}
        <motion.div
          style={{ opacity: seamOpacity }}
          className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-gradient-to-b from-brick/0 via-brick to-brick/0 z-50 pointer-events-none"
        />

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-ink/70 font-semibold">
            {t[lang].doorHint}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown size={22} className="text-brick" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const DoorFace = ({ side, lang }) => (
  <div className="relative h-full w-full overflow-hidden">
    {/* vertical brushed grooves */}
    <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(90deg,transparent,transparent_38px,rgba(0,0,0,0.06)_39px,transparent_40px)]" />

    {/* Floor indicator near top-center (edge that meets seam) */}
    <div className={`absolute top-[14%] ${side === "left" ? "right-8" : "left-8"} flex flex-col items-center gap-3`}>
      <div className="bg-ink text-brick font-display text-2xl md:text-4xl tracking-widest px-4 py-2 md:px-6 md:py-3 border border-white/10 shadow-lg">
        {side === "left" ? "▲" : "L E"}
      </div>
    </div>

    {/* Etched logo centered on each panel */}
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-4 px-6">
      <img
        src="/liftexpress.png"
        alt=""
        className="h-16 w-16 md:h-24 md:w-24 object-contain opacity-90"
      />
      {side === "left" ? (
        <span className="font-display text-3xl md:text-5xl tracking-tighter text-ink/80">LIFT</span>
      ) : (
        <span className="font-display text-3xl md:text-5xl tracking-tighter text-brick/80">EXPRESS</span>
      )}
    </div>

    {/* subtle top light strip */}
    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-70" />
  </div>
);
