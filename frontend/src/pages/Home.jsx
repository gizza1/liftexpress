import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Wrench, ShoppingCart, LifeBuoy, ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t, COMPANY, IMAGES } from "../lib/content";
import { ElevatorStage } from "../components/ElevatorStage";
import { Reveal, MaskedLines } from "../components/Reveal";
import { Marquee } from "../components/Marquee";

const HeroContent = () => {
  const { lang } = useLang();
  const tr = t[lang].hero;
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <img src={IMAGES.heroShaft} alt="" className="h-full w-full object-cover grayscale opacity-[0.10]" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-brick mb-6"
        >
          <span className="h-2 w-2 bg-brick rounded-full animate-pulse" />
          {tr.tag}
        </motion.span>

        <h1 className="font-display text-[15vw] sm:text-[13vw] lg:text-[9.5vw] leading-[0.88] tracking-tighter">
          <MaskedLines lines={[tr.line1, tr.line2, tr.line3]} accentIndex={1} delay={0.2} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 max-w-xl text-base md:text-lg text-ash leading-relaxed"
        >
          {tr.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/sherbimet"
            data-testid="hero-cta-services"
            className="group relative overflow-hidden bg-ink text-white px-8 py-4 uppercase tracking-[0.15em] text-sm font-semibold inline-flex items-center gap-3"
          >
            <span className="absolute inset-0 bg-brick translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
            <span className="relative z-10">{tr.cta1}</span>
            <ArrowRight size={17} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={COMPANY.phoneHref}
            data-testid="hero-cta-call"
            className="group border border-ink/20 px-8 py-4 uppercase tracking-[0.15em] text-sm font-semibold inline-flex items-center gap-3 hover:border-brick hover:text-brick transition-colors"
          >
            <Phone size={17} />
            {tr.cta2}
          </a>
        </motion.div>
      </div>
    </div>
  );
};

const Stats = () => {
  const { lang } = useLang();
  const stats = t[lang].stats;
  return (
    <section className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div data-testid={`stat-${i}`}>
              <div className="font-display text-4xl md:text-6xl tracking-tighter text-brick">{s.n}</div>
              <div className="mt-2 text-sm text-white/60 uppercase tracking-wider">{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const icons = [Wrench, ShoppingCart, LifeBuoy];

const ServicesSummary = () => {
  const { lang } = useLang();
  const s = t[lang].servicesHome;
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{s.label}</span>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-4 max-w-2xl leading-[1.02]">
          {s.title}
        </h2>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {s.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={i} delay={i * 0.1}>
              <Link
                to="/sherbimet"
                data-testid={`service-card-${i}`}
                className="group block h-full border border-black/10 p-8 md:p-10 hover:border-brick hover:-translate-y-2 transition-all duration-400 bg-white hover:shadow-[0_30px_60px_-25px_rgba(165,38,43,0.4)]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl text-black/10 group-hover:text-brick/20 transition-colors">{item.n}</span>
                  <Icon size={28} className="text-ink group-hover:text-brick transition-colors" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl tracking-tight mt-10">{item.title}</h3>
                <p className="text-ash mt-4 leading-relaxed">{item.desc}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold group-hover:text-brick transition-colors">
                  {s.more}
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

const Manifesto = () => {
  const { lang } = useLang();
  const m = t[lang].manifesto;
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{m.label}</span>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight mt-4 leading-tight">{m.title}</h2>
            <div className="mt-8 aspect-[3/4] overflow-hidden">
              <img src={IMAGES.cabin} alt="" className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-8 md:pl-12">
          {m.chapters.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div data-testid={`manifesto-${i}`} className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-t border-black/10 hover:border-brick transition-colors">
                <span className="font-display text-3xl text-brick shrink-0 w-16">{c.n}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-4xl tracking-tight">{c.title}</h3>
                  <p className="text-ash mt-4 text-lg leading-relaxed max-w-xl">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaBand = () => {
  const { lang } = useLang();
  const c = t[lang].ctaBand;
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundImage: `url(${IMAGES.installers})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-brick/95" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 text-white">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-3xl leading-[1.02]">{c.title}</h2>
          <p className="mt-6 text-lg text-white/80 max-w-xl">{c.sub}</p>
          <a
            href={COMPANY.phoneHref}
            data-testid="cta-band-call"
            className="group mt-10 inline-flex items-center gap-3 bg-white text-ink px-8 py-4 uppercase tracking-[0.15em] text-sm font-bold hover:bg-ink hover:text-white transition-colors"
          >
            <Phone size={18} />
            {c.btn}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default function Home() {
  const { lang } = useLang();
  return (
    <div data-testid="page-home">
      <ElevatorStage>
        <HeroContent />
      </ElevatorStage>
      <Stats />
      <ServicesSummary />
      <Marquee text={t[lang].marquee} />
      <Manifesto />
      <CtaBand />
    </div>
  );
}
