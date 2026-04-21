"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, ChevronRight, Calendar } from "lucide-react";

const statusColors = {
  "Completed":    "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  "In Progress":  "bg-amber-500/10 border-amber-500/20 text-amber-400",
  "Planned":      "bg-slate-500/10 border-slate-500/20 text-slate-400",
};

export default function ProjectCard({ project, index }) {
  const features = project.keyFeatures
    ? (typeof project.keyFeatures === "string"
        ? project.keyFeatures.split("\n").filter(Boolean)
        : project.keyFeatures)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] hover:border-primary/20 transition-all duration-500 hover:-translate-y-1"
      style={{ backdropFilter: "blur(20px)" }}
    >
      {/* Image */}
      {project.image && (
        <div className="relative h-44 overflow-hidden">
          <img src={project.image} alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      )}

      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
              {project.featured && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-medium">
                  <Star size={9} fill="currentColor" />Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {project.status && (
                <span className={"px-2.5 py-0.5 rounded-full border text-[10px] font-semibold " + (statusColors[project.status] || statusColors["Completed"])}>
                  {project.status}
                </span>
              )}
              {project.duration && (
                <div className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                  <Calendar size={11} className="text-slate-400" />{project.duration}
                </div>
              )}
            </div>
          </div>
          <span className="text-3xl font-black text-white/20 flex-shrink-0 leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Subtitle */}
        {project.subtitle && (
          <p className="text-slate-300 text-sm font-medium leading-snug">{project.subtitle}</p>
        )}

        {/* Description */}
        {project.description && (
          <p className="text-slate-500 text-sm leading-relaxed">{project.description}</p>
        )}

        {/* Key Features */}
        {features.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2.5">Key Features</p>
            <ul className="flex flex-col gap-1.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-500 text-sm">
                  <ChevronRight size={12} className="text-primary/60 mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech tags */}
        {project.tech?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {project.tech.map((t, i) => (
              <span key={i} className="tag">{t}</span>
            ))}
          </div>
        )}

        {/* Buttons */}
        {(project.github || project.live) && (
          <div className="flex gap-2 pt-1">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-primary/30 text-xs font-medium transition-all duration-300">
                <Github size={13} />Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-primary/80 to-secondary/80 text-white text-xs font-medium hover:from-primary hover:to-secondary transition-all duration-300">
                <ExternalLink size={13} />Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
