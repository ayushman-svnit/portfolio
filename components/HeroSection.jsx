'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react';
import Link from 'next/link';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

export default function HeroSection({ profile }) {
  const name = profile?.name || 'Your Name';
  const title = profile?.title || 'Full Stack Developer';
  const bio = profile?.bio || 'Passionate about building beautiful, performant web experiences.';
  const github = profile?.github || '#';
  const linkedin = profile?.linkedin || '#';
  const email = profile?.email || '#';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-medium mb-6">
            <Sparkles size={14} />
            Available for opportunities
          </motion.div>

          <motion.h1 {...fadeUp(0.2)} className="text-5xl lg:text-7xl font-black mb-4 leading-tight">
            Hi, I&apos;m{' '}
            <span className="gradient-text">{name}</span>
          </motion.h1>

          <motion.div {...fadeUp(0.3)} className="flex items-center gap-3 justify-center lg:justify-start mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
            <span className="text-xl text-slate-300 font-mono">{title}</span>
          </motion.div>

          <motion.p {...fadeUp(0.4)} className="text-slate-400 text-lg leading-relaxed max-w-xl mb-10">
            {bio}
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/projects"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-all duration-300 glow-purple hover:scale-105"
            >
              View Projects
            </Link>
            <a
              href={`mailto:${email}`}
              className="px-8 py-3 rounded-xl glass border border-white/20 text-white font-semibold hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.6)} className="flex gap-4 mt-8 justify-center lg:justify-start">
            {[
              { href: github, icon: Github, label: 'GitHub' },
              { href: linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 hover:glow-purple transition-all duration-300 hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Avatar / Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-72 h-72 lg:w-80 lg:h-80">
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-ring" />
            <div className="absolute inset-4 rounded-full border border-secondary/20 animate-pulse-ring" style={{ animationDelay: '1s' }} />

            {/* Avatar circle */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 glow-purple animate-float">
              <div className="w-full h-full rounded-full bg-dark flex items-center justify-center overflow-hidden">
                {profile?.avatar ? (
                  <img src={profile.avatar} alt={name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-6xl font-black gradient-text">
                    {name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-accent"
            >
              &lt;code /&gt;
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 glass border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-secondary"
            >
              {'{ build }'}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-mono">scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
