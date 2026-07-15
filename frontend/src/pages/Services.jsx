import React from "react";
import { Phone } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { offerPage, liftTypes, partsList, workExamples, COMPANY, t } from "../lib/content";
import { Reveal, MaskedLines } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { InteractiveShowcase } from "../components/InteractiveShowcase";

export default function Offer() {
  const { lang } = useLang();
  const p = offerPage[lang];

  return (
    <div data-testid="page-offer" className="pt-32 md:pt-40">
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

      {/* Lift types — interactive */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-black/10">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{p.typesTitle.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight mt-4 mb-12">{p.typesTitle.title}</h2>
        </Reveal>
        <InteractiveShowcase items={liftTypes[lang]} buttonLabel={p.selectBtn} testidPrefix="lift" lang={lang} />
      </section>

      {/* Parts — interactive */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-black/10">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{p.partsTitle.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight mt-4 mb-12">{p.partsTitle.title}</h2>
        </Reveal>
        <InteractiveShowcase items={partsList[lang]} buttonLabel={p.selectPart} testidPrefix="part" lang={lang} />
      </section>

      <div className="mt-8">
        <Marquee text={t[lang].marquee} />
      </div>

      {/* Work gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{p.workTitle.label}</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-4 max-w-2xl">{p.workTitle.title}</h2>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workExamples.map((w, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div data-testid={`work-${i}`} className="group relative overflow-hidden aspect-[3/4]">
                <img src={w.image} alt={w[lang]} className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 text-white font-display text-xl tracking-tight">{w[lang]}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
            {lang === "sq" ? "Gjete atë që kërkoje? Na kontakto." : "Found what you were looking for? Contact us."}
          </h2>
          <a
            href={COMPANY.phoneHref}
            data-testid="offer-cta-call"
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
