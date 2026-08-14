import React, { useState } from "react";
import { Phone, Play, X } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { offerPage, liftTypes, partsList, workExamples, COMPANY, t } from "../lib/content";
import { Reveal, MaskedLines } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { InteractiveShowcase } from "../components/InteractiveShowcase";

export default function Offer() {
  const { lang } = useLang();
  const p = offerPage[lang];
  const [selectedProject, setSelectedProject] = useState(null);

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
              <button
                type="button"
                data-testid={`work-${i}`}
                onClick={() => setSelectedProject(w)}
                className="group relative overflow-hidden aspect-[3/4] w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brick"
                aria-label={`${w[lang]} — ${lang === "sq" ? "hape" : "open"}`}
              >
                {w.type === "video" ? (
                  <video src={w.image} muted preload="metadata" className="h-full w-full object-contain bg-black grayscale group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <img src={w.image} alt="" className="h-full w-full object-contain bg-black/5 grayscale group-hover:grayscale-0 transition-all duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                {w.type === "video" && <span className="absolute top-4 right-4 rounded-full bg-white/90 p-2 text-ink"><Play size={16} fill="currentColor" /></span>}
                <span className="absolute bottom-4 left-4 right-4 text-white font-display text-xl tracking-tight">{w[lang]}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject[lang]}
          onClick={() => setSelectedProject(null)}
        >
          <div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute -top-12 right-0 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-brick"
            >
              {lang === "sq" ? "Mbyll" : "Close"} <X size={20} />
            </button>
            {selectedProject.type === "video" ? (
              <video src={selectedProject.image} controls autoPlay className="max-h-[80vh] max-w-full bg-black" />
            ) : (
              <img src={selectedProject.image} alt={selectedProject[lang]} className="max-h-[80vh] max-w-full object-contain" />
            )}
          </div>
        </div>
      )}

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
