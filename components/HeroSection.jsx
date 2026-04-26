"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import HeroBg from "./HeroBg";
import HollowCollision from "./HollowCollision";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function HeroSection({ profile }) {
  const name = profile?.name || "Your Name";
  const title = profile?.title || "Full Stack Developer";
  const bio = profile?.bio || "Passionate about building beautiful, performant web experiences.";
  const github = profile?.github || "#";
  const linkedin = profile?.linkedin || "#";
  const email = profile?.email || "#";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full hero background — vortex + roses */}
      <HeroBg />
      {/* Subtle grid on top */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      {/* Yuji Syuku watermark — decorative */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 text-[120px] leading-none pointer-events-none select-none z-0 opacity-[0.04]"
        style={{ fontFamily: "'Yuji Syuku', serif", color: "#a78bfa", writingMode: "vertical-rl" }}>
        無限
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16">

        {/* Left — text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div {...fadeUp(0.1)} className="mb-6">
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.2)} className="font-black tracking-tight mb-4">
            <span className="text-white text-5xl lg:text-6xl block" style={{ fontFamily: "'Blacker Display', serif" }}>
              Hi, I&apos;m
            </span>
            <span className="gradient-text text-5xl lg:text-7xl block pb-3" style={{ fontFamily: "'Another Danger', cursive", lineHeight: "1.2" }}>
              {name}
            </span>
          </motion.h1>

          <motion.div {...fadeUp(0.3)} className="flex items-center gap-3 justify-center lg:justify-start mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-primary/60 to-transparent" />
            <span className="text-slate-400 text-base font-mono">{title}</span>
            <div className="h-px w-8 bg-gradient-to-l from-primary/60 to-transparent" />
          </motion.div>

          <motion.p {...fadeUp(0.4)} className="text-slate-400 text-base leading-relaxed max-w-lg mb-10">
            {bio}
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group relative px-7 py-3 rounded-xl text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}>
              <span className="relative z-10 flex items-center gap-2">View Projects <ExternalLink size={14} /></span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href={`mailto:${email}`}
              className="px-7 py-3 rounded-xl glass border border-white/10 text-slate-300 font-semibold text-sm hover:border-primary/40 hover:text-white transition-all duration-300 hover:scale-105">
              Get in touch
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.6)} className="flex gap-3 justify-center lg:justify-start">
            {[
              { href: github, icon: Github, label: "GitHub" },
              { href: linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-primary/40 transition-all duration-300 hover:scale-110">
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex-shrink-0 w-72 h-72 lg:w-80 lg:h-80"
        >
          {/* Hollow collision behind avatar */}
          <div className="absolute -inset-16 pointer-events-none z-0">
            <HollowCollision />
          </div>

          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full border border-purple-700/20 animate-pulse-ring z-10" />
          <div className="absolute inset-4 rounded-full border border-blue-700/15 animate-pulse-ring z-10" style={{ animationDelay: "1.2s" }} />

          {/* Avatar circle */}
          <div className="absolute inset-8 rounded-full p-[2px] animate-float z-10"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb, #dc2626, #9333ea)",
              boxShadow: "0 0 50px rgba(124,58,237,0.5), 0 0 100px rgba(124,58,237,0.2)"
            }}>
            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
              style={{ background: "#06060f" }}>
              {profile?.avatar ? (
                <img src={profile.avatar} alt={name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-5xl font-black gradient-text">{name.charAt(0)}</span>
              )}
            </div>
          </div>

          {/* Chips */}
          <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-4 rounded-lg px-3 py-1.5 text-xs font-mono whitespace-nowrap z-20"
            style={{ background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.35)", color: "#c4b5fd" }}>
            ✦ infinite code
          </motion.div>
          <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-4 rounded-lg px-3 py-1.5 text-xs font-mono whitespace-nowrap z-20"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", color: "#93c5fd" }}>
            ∞ void.build()
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
