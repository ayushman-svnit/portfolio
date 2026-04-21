"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass border-b border-white/[0.06]" : "py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-sm"
            style={{ boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}>
            A
          </div>
          <span className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors">
            ayushman<span className="text-primary">.</span>dev
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}
              className={`relative px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                pathname === link.href ? "text-white" : "text-slate-500 hover:text-slate-200"
              }`}>
              {pathname === link.href && (
                <motion.span layoutId="nav-pill"
                  className="absolute inset-0 bg-white/[0.07] rounded-lg border border-white/[0.08]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Resume */}
        <div className="hidden md:flex">
          <a href="/resume.pdf" download
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 glass border border-white/10 hover:border-primary/40 hover:text-white transition-all duration-300">
            <Download size={13} />
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400 hover:text-white transition-colors">
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
            className="md:hidden glass border-t border-white/[0.06] px-6 py-4 flex flex-col gap-1"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  pathname === link.href ? "bg-white/[0.07] text-white" : "text-slate-500 hover:text-white"
                }`}>
                {link.label}
              </Link>
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
