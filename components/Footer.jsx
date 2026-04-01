"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, BookOpen, Code } from "lucide-react";
import Link from "next/link";

const socials = [
  { href: "https://github.com/ayushman-svnit", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/ayushmansingh27", icon: Linkedin, label: "LinkedIn" },
  { href: "https://codeforces.com/profile/ayushman-svnit", icon: Code2, label: "Codeforces" },
  { href: "https://leetcode.com/u/ayushman-svnit/", icon: BookOpen, label: "LeetCode" },
  { href: "mailto:singhayushman291@gmail.com", icon: Mail, label: "Email" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Background glow blobs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-black gradient-text mb-2">Ayushman Singh</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Building beautiful, performant web experiences. Open to opportunities.
            </p>
            <a href="mailto:singhayushman291@gmail.com" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-primary transition-colors font-mono">
              <Mail size={12} />
              singhayushman291@gmail.com
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <Link key={label} href={href} className="text-slate-500 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block duration-200">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Connect</h4>
            <div className="grid grid-cols-5 gap-2">
              {socials.map(({ href, icon: Icon, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  className="aspect-square rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 transition-all duration-300 group"
                >
                  <Icon size={17} className="group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="relative mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full bg-dark border border-primary/40 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Ayushman Singh. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
