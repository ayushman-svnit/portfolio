"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

const links = [
  { href: "#home",       label: "Home" },
  { href: "#education",  label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects" },
  { href: "#hackathons", label: "Hackathons" },
  { href: "#skills",     label: "Skills" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section based on scroll position
  useEffect(() => {
    const sectionIds = links.map(l => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(href);
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-display ${
        scrolled ? "py-3 glass border-b border-white/[0.06]" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => scrollTo(e, "#home")} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-sm"
            style={{ boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}>
            A
          </div>
          <span className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors">
            ayushman<span className="text-primary">.</span>dev
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)}
              className={`relative px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                active === link.href ? "text-white" : "text-slate-500 hover:text-slate-200"
              }`}>
              {active === link.href && (
                <motion.span layoutId="nav-pill"
                  className="absolute inset-0 bg-white/[0.07] rounded-lg border border-white/[0.08]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Resume */}
        <div className="hidden lg:flex">
          <a href="/resume.pdf" download
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 glass border border-white/10 hover:border-primary/40 hover:text-white transition-all duration-300">
            <Download size={13} />Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/[0.06] px-6 py-4 flex flex-col gap-1"
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)}
                className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  active === link.href ? "bg-white/[0.07] text-white" : "text-slate-500 hover:text-white"
                }`}>
                {link.label}
              </a>
            ))}
            <a href="/resume.pdf" download
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white transition-colors mt-1">
              <Download size={13} />Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
