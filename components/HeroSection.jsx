"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Code2, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.15),transparent)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-20">

        {/* Left — text */}
        <div className="flex-1 text-center lg:text-left">

          <motion.div {...fadeUp(0.1)} className="mb-6">
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.2)} className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-4">
            Hi, I&apos;m<br />
            <span className="gradient-text">{name}</span>
          </motion.h1>

          <motion.div {...fadeUp(0.3)} className="flex items-center gap-3 justify-center lg:justify-start mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-primary/60 to-transparent" />
            <span className="text-slate-400 text-base font-mono">{title}</span>
          </motion.div>

          <motion.p {...fadeUp(0.4)} className="text-slate-500 text-lg leading-relaxed max-w-lg mb-10">
            {bio}
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
            <Link href="/projects"
              className="group relative px-7 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ boxShadow: "0 0 30px rgba(99,102,241,0.3)" }}>
              <span className="relative z-10 flex items-center gap-2">View Projects <ExternalLink size={14} /></span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <a href={`mailto:${email}`}
              className="px-7 py-3 rounded-xl glass border border-white/10 text-slate-300 font-semibold text-sm hover:border-primary/40 hover:text-white transition-all duration-300 hover:scale-105">
              Get in touch
            </a>
          </motion.div>

          {/* Socials */}
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

        {/* Right — visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-64 h-64 lg:w-72 lg:h-72">
            {/* Rings */}
            <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-ring" />
            <div className="absolute inset-6 rounded-full border border-secondary/10 animate-pulse-ring" style={{ animationDelay: "1s" }} />

            {/* Avatar */}
            <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-[2px] animate-float"
              style={{ boxShadow: "0 0 60px rgba(99,102,241,0.3), 0 0 120px rgba(99,102,241,0.1)" }}>
              <div className="w-full h-full rounded-full bg-[#080810] flex items-center justify-center overflow-hidden">
                {profile?.avatar ? (
                  <img src={profile.avatar} alt={name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-5xl font-black gradient-text" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Floating chips */}
            <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-6 glass border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-primary/80 whitespace-nowrap">
              &lt;code /&gt;
            </motion.div>
            <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -left-6 glass border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-secondary/80 whitespace-nowrap">
              build()
            </motion.div>
          </div>
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
