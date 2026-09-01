import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t, COMPANY } from "../lib/content";

const Logo = () => (
  <Link to="/" data-testid="nav-logo" className="flex items-center group">
    <img
      src="/liftexpress-showroom-logo.png"
      alt="LiftExpress Showroom"
      className="h-14 w-20 md:h-16 md:w-24 object-contain object-left transition-transform duration-500 group-hover:scale-[1.03]"
    />
  </Link>
);

export const Navbar = () => {
  const { lang, toggle } = useLang();
  const tr = t[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  const links = [
    { to: "/", label: tr.home },
    { to: "/sherbimet", label: tr.services },
    { to: "/rreth-nesh", label: tr.about },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        scrolled ? "bg-white/85 backdrop-blur-xl border-b border-black/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.to === "/" ? "home" : l.to.slice(1)}`}
              className="relative text-sm uppercase tracking-[0.15em] font-medium group"
            >
              <span className={loc.pathname === l.to ? "text-brick" : "text-ink"}>{l.label}</span>
              <span
                className={`absolute -bottom-1.5 left-0 h-[2px] bg-brick transition-all duration-300 ${
                  loc.pathname === l.to ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          <button
            onClick={toggle}
            data-testid="lang-toggle"
            className="text-xs font-bold uppercase tracking-widest border border-black/15 rounded-full px-3 py-1.5 hover:border-brick hover:text-brick transition-colors"
          >
            {lang === "sq" ? "SQ / EN" : "EN / SQ"}
          </button>

          <a
            href={COMPANY.phoneHref}
            data-testid="nav-cta"
            className="group relative overflow-hidden bg-ink text-white text-sm uppercase tracking-[0.15em] font-semibold px-6 py-3 rounded-none inline-flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-brick translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
            <Phone size={15} className="relative z-10" />
            <span className="relative z-10">{tr.cta}</span>
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            data-testid="lang-toggle-mobile"
            className="text-xs font-bold uppercase tracking-widest border border-black/15 rounded-full px-2.5 py-1"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setOpen((p) => !p)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
            className="p-2"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white border-b border-black/10"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  data-testid={`mobile-link-${l.to === "/" ? "home" : l.to.slice(1)}`}
                  className="font-display text-3xl tracking-tight"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={COMPANY.phoneHref}
                className="mt-2 bg-brick text-white text-center py-4 uppercase tracking-widest font-semibold"
                data-testid="mobile-cta"
              >
                {tr.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
