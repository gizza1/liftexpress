import React from "react";
import { motion } from "framer-motion";
import { Check, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { servicesPage, COMPANY, IMAGES, t } from "../lib/content";
import { Reveal, MaskedLines } from "../components/Reveal";
import { Marquee } from "../components/Marquee";

const serviceImages = [IMAGES.technician, IMAGES.installers, IMAGES.cabin];

export default function Services() {
  const { lang } = useLang();
  const p = servicesPage[lang];

  return (
    <div data-testid="page-services" className="pt-32 md:pt-40">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{p.hero.label}</span>
        </Reveal>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tighter mt-6 max-w-4xl leading-[0.95]">
          <MaskedLines lines={p.hero.title.split(" ").reduce((acc, w, i) => {
            const line = Math.floor(i / 3);
            acc[line] = (acc[line] ? acc[line] + " " : "") + w;
            return acc;
          }, [])} />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-8 text-lg text-ash max-w-2xl leading-relaxed">{p.hero.sub}</p>
        </Reveal>
      </section>

      {/* Service blocks */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        {p.list.map((s, i) => (
          <div
            key={i}
            data-testid={`service-block-${i}`}
            className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center py-20 border-t border-black/10 ${
              i % 2 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal>
              <div className="relative overflow-hidden group">
                <img
                  src={serviceImages[i]}
                  alt={s.title}
                  className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 font-display text-2xl text-brick">
                  {s.n}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-brick">{s.tagline}</span>
                <h2 className="font-display text-4xl md:text-5xl tracking-tight mt-4">{s.title}</h2>
                <p className="text-ash mt-6 text-lg leading-relaxed">{s.desc}</p>
                <ul className="mt-8 grid sm:grid-cols-2 gap-4">
                  {s.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3">
                      <span className="mt-0.5 h-6 w-6 shrink-0 bg-brick/10 flex items-center justify-center">
                        <Check size={14} className="text-brick" />
                      </span>
                      <span className="text-ink">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        ))}
      </section>

      <div className="mt-16">
        <Marquee text={t[lang].marquee} />
      </div>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{p.process.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-4 max-w-2xl">{p.process.title}</h2>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.process.steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div data-testid={`process-step-${i}`} className="group border border-black/10 p-8 h-full hover:bg-ink hover:text-white transition-colors duration-400">
                <span className="font-display text-4xl text-brick">{step.n}</span>
                <h3 className="font-display text-2xl tracking-tight mt-6">{step.t}</h3>
                <p className="text-ash group-hover:text-white/60 mt-3 transition-colors">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
            {lang === "sq" ? "Gati për ashensor pa shqetësime?" : "Ready for a worry-free elevator?"}
          </h2>
          <a
            href={COMPANY.phoneHref}
            data-testid="services-cta-call"
            className="group shrink-0 bg-brick text-white px-8 py-4 uppercase tracking-[0.15em] text-sm font-bold inline-flex items-center gap-3 hover:bg-white hover:text-ink transition-colors"
          >
            <Phone size={18} />
            {COMPANY.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
