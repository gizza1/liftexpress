import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t, COMPANY } from "../lib/content";

export const Footer = () => {
  const { lang } = useLang();
  const tr = t[lang].footer;
  const nav = t[lang].nav;
  const year = new Date().getFullYear();

  return (
    <footer data-testid="site-footer" className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <img src="/liftexpress.png" alt="Lift Express" className="h-12 w-12 object-contain bg-white rounded-full p-1" />
              <span className="font-display text-2xl tracking-tight">
                LIFT<span className="text-brick">EXPRESS</span>
              </span>
            </div>
            <p className="text-white/60 max-w-md text-lg leading-relaxed">{tr.tagline}</p>
            <a
              href={COMPANY.phoneHref}
              data-testid="footer-phone-big"
              className="mt-8 inline-block font-display text-3xl md:text-5xl tracking-tight hover:text-brick transition-colors"
            >
              {COMPANY.phone}
            </a>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">{tr.nav}</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: nav.home },
                { to: "/sherbimet", label: nav.services },
                { to: "/rreth-nesh", label: nav.about },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    data-testid={`footer-link-${l.to === "/" ? "home" : l.to.slice(1)}`}
                    className="group inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors"
                  >
                    {l.label}
                    <ArrowUpRight size={16} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">{tr.contact}</h4>
            <ul className="space-y-4 text-white/80">
              <li className="flex gap-3"><Phone size={18} className="text-brick shrink-0 mt-0.5" /><span>{COMPANY.phone}</span></li>
              <li className="flex gap-3"><MapPin size={18} className="text-brick shrink-0 mt-0.5" /><span>{COMPANY.address}</span></li>
              <li className="flex gap-3"><Clock size={18} className="text-brick shrink-0 mt-0.5" /><span>{COMPANY.hoursShort[lang]}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-sm text-white/40">
          <span>© {year} {COMPANY.name}. {tr.rights}</span>
          <span>Prishtinë · Kosovë</span>
        </div>
      </div>
    </footer>
  );
};
