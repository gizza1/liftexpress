import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Navigation, ShieldCheck, Zap, Eye, Heart } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { aboutPage, COMPANY, IMAGES } from "../lib/content";
import { Reveal, MaskedLines } from "../components/Reveal";

const valueIcons = [ShieldCheck, Zap, Eye, Heart];

export default function AboutContact() {
  const { lang } = useLang();
  const p = aboutPage[lang];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${COMPANY.mapsQuery}`;

  return (
    <div data-testid="page-about" className="pt-32 md:pt-40">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{p.hero.label}</span>
        </Reveal>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tighter mt-6 max-w-4xl leading-[0.95]">
          <MaskedLines lines={p.hero.title.split(" ").reduce((acc, w, i) => {
            const line = Math.floor(i / 4);
            acc[line] = (acc[line] ? acc[line] + " " : "") + w;
            return acc;
          }, [])} />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-8 text-lg text-ash max-w-2xl leading-relaxed">{p.hero.sub}</p>
        </Reveal>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-12 md:gap-16 items-center border-t border-black/10">
        <Reveal>
          <div className="relative overflow-hidden">
            <img src={IMAGES.glassLobby} alt="" className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{p.story.label}</span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mt-4">{p.story.title}</h2>
            {p.story.body.map((para, i) => (
              <p key={i} className="text-ash mt-6 text-lg leading-relaxed">{para}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{p.values.label}</span>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.values.items.map((v, i) => {
            const Icon = valueIcons[i];
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div data-testid={`value-${i}`} className="group border border-black/10 p-8 h-full hover:border-brick hover:-translate-y-2 transition-all duration-400">
                  <Icon size={30} className="text-brick" />
                  <h3 className="font-display text-2xl tracking-tight mt-6">{v.t}</h3>
                  <p className="text-ash mt-3">{v.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className="bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-brick">{p.contact.label}</span>
                <h2 className="font-display text-5xl md:text-6xl tracking-tighter mt-4">{p.contact.title}</h2>
                <p className="mt-6 text-white/60 text-lg max-w-md">{p.contact.sub}</p>
                <a
                  href={COMPANY.phoneHref}
                  data-testid="about-phone-big"
                  className="mt-10 inline-block font-display text-3xl md:text-5xl tracking-tight hover:text-brick transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-2">
                <ContactRow icon={Phone} label={p.contact.phoneLabel} value={COMPANY.phone} href={COMPANY.phoneHref} testid="contact-phone" />
                <ContactRow icon={MapPin} label={p.contact.addressLabel} value={COMPANY.address} href={mapsUrl} testid="contact-address" external />
                <ContactRow icon={Clock} label={p.contact.hoursLabel} value={COMPANY.hoursShort[lang]} testid="contact-hours" />
                <ContactRow icon={Navigation} label={p.contact.areaLabel} value={p.contact.area} testid="contact-area" />

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-directions"
                  className="group mt-6 flex items-center justify-between bg-brick text-white px-6 py-5 uppercase tracking-[0.15em] text-sm font-bold hover:bg-white hover:text-ink transition-colors"
                >
                  {p.contact.directions}
                  <Navigation size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative">
        <iframe
          title="Lift Express Prishtinë"
          data-testid="contact-map"
          src="https://www.google.com/maps?q=Rruga+Ali+Kelmendi,+Prishtin%C3%AB+10000&output=embed"
          className="w-full h-[380px] md:h-[460px] grayscale contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}

const ContactRow = ({ icon: Icon, label, value, href, testid, external }) => {
  const inner = (
    <div className="group flex items-center gap-5 py-5 border-b border-white/10">
      <span className="h-12 w-12 shrink-0 border border-white/15 flex items-center justify-center group-hover:bg-brick group-hover:border-brick transition-colors">
        <Icon size={20} className="text-brick group-hover:text-white transition-colors" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</div>
        <div className="text-lg mt-1">{value}</div>
      </div>
    </div>
  );
  if (href)
    return (
      <a href={href} data-testid={testid} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {inner}
      </a>
    );
  return <div data-testid={testid}>{inner}</div>;
};
