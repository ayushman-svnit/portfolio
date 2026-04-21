"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

// Custom SVG icons for platforms not in lucide
const CodeforcesIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9A1.5 1.5 0 0 1 1.5 7.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5A1.5 1.5 0 0 1 22.5 21h-3A1.5 1.5 0 0 1 18 19.5V12a1.5 1.5 0 0 1 1.5-1.5h3z"/>
  </svg>
);

const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const socials = [
  { href: "https://github.com/ayushman-svnit", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/ayushmansingh27", icon: Linkedin, label: "LinkedIn" },
  { href: "https://codeforces.com/profile/ayushman-svnit", icon: CodeforcesIcon, label: "Codeforces" },
  { href: "https://leetcode.com/u/ayushman-svnit/", icon: LeetCodeIcon, label: "LeetCode" },
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
