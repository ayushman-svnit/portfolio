"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";

const statusColors = {
  "Completed":    "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  "In Progress":  "bg-amber-500/10 border-amber-500/20 text-amber-400",
  "Planned":      "bg-slate-500/10 border-slate-500/20 text-slate-400",
};

export default function ProjectCard({ project, index }) {
  const [showAllTech, setShowAllTech] = useState(false);
  
  const features = project.keyFeatures
    ? (typeof project.keyFeatures === "string"
        ? project.keyFeatures.split("\n").filter(Boolean)
        : project.keyFeatures)
    : [];

  const techToShow = showAllTech ? project.tech : project.tech?.slice(0, 8);
  const hasMoreTech = project.tech?.length > 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative flex flex-col md:flex-row rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 shadow-xl ${
        project.featured 
          ? 'border-primary/30 bg-slate-900/70 backdrop-blur-xl hover:border-primary/50 shadow-primary/20' 
          : 'border-white/[0.12] bg-slate-900/60 backdrop-blur-xl hover:border-primary/30 shadow-black/50'
      }`}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/90 to-orange-500/90 border border-amber-400/50 backdrop-blur-md shadow-lg shadow-amber-500/20">
          <Sparkles size={12} className="text-white" fill="currentColor" />
          <span className="text-white text-xs font-bold tracking-wide">FEATURED</span>
        </div>
      )}

      {/* LEFT SIDE - Image + Title/Subtitle (30% width on desktop, full width on mobile) */}
      <div className="w-full md:w-[30%] flex flex-col">
        {/* Image - Top portion with padding */}
        {project.image && (
          <div className="relative h-48 md:h-[40%] p-3 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        )}
        
        {/* Title + Subtitle - Bottom portion */}
        <div className="flex-1 flex flex-col justify-center p-5 sm:p-6 md:p-5 bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="mb-2 sm:mb-3">
            <span className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent leading-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-2">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-slate-300 text-sm md:text-base font-medium leading-snug">{project.subtitle}</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - All Details (70% width on desktop, full width on mobile) */}
      <div className="w-full md:w-[70%] flex flex-col gap-4 sm:gap-5 p-5 sm:p-6 md:p-8">
        {/* Status & Duration at top */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {project.status && (
            <span className={"px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-xs font-bold " + (statusColors[project.status] || statusColors["Completed"])}>
              {project.status}
            </span>
          )}
          {project.duration && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400 text-xs font-mono bg-white/5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10">
              <Calendar size={12} className="text-primary/70 sm:w-3.5 sm:h-3.5" />
              {project.duration}
            </div>
          )}
        </div>
        
        {/* Description */}
        {project.description && (
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">{project.description}</p>
        )}

        {/* Key Features */}
        {features.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2">
              <span className="w-6 sm:w-8 h-px bg-gradient-to-r from-primary/60 to-transparent" />
              Key Features
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-400 text-xs sm:text-sm">
                  <ChevronRight size={12} className="text-primary/70 mt-0.5 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack & Buttons */}
        <div className="flex flex-col gap-4 mt-auto">
          {/* Tech tags */}
          {project.tech?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {techToShow?.map((t, i) => (
                <span key={i} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs font-medium hover:border-primary/30 hover:text-primary/80 transition-colors">
                  {t}
                </span>
              ))}
              {hasMoreTech && !showAllTech && (
                <button
                  onClick={() => setShowAllTech(true)}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-medium hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  +{project.tech.length - 8} more
                </button>
              )}
              {showAllTech && (
                <button
                  onClick={() => setShowAllTech(false)}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-500/10 border border-slate-500/30 text-slate-400 text-xs font-medium hover:bg-slate-500/20 transition-colors cursor-pointer"
                >
                  Show less
                </button>
              )}
            </div>
          )}

          {/* Buttons */}
          {(project.github || project.live) && (
            <div className="flex gap-2 sm:gap-3">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-primary/40 hover:bg-white/[0.02] text-xs sm:text-sm font-semibold transition-all duration-300"
                >
                  <Github size={14} className="sm:w-4 sm:h-4" />
                  Code
                </a>
              )}
              {project.live && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm font-bold hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                >
                  <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
