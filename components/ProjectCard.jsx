"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, ChevronRight } from "lucide-react";

const statusColors = {
  Completed: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
  "In Progress": "bg-amber-500/20 border-amber-500/30 text-amber-400",
  Planned: "bg-slate-500/20 border-slate-500/30 text-slate-400",
};

export default function ProjectCard({ project, index }) {
  const features = project.keyFeatures
    ? (typeof project.keyFeatures === "string"
        ? project.keyFeatures.split("\n").filter(Boolean)
        : project.keyFeatures)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass border border-white/10 rounded-2xl overflow-hidden flex flex-col gap-0 hover:border-primary/40 transition-all duration-500 group"
    >
      {/* Project image */}
      {project.image && (
        <div className="w-full h-48 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      )}

      <div className="p-6 flex flex-col gap-5">
      {/* Header: number + title + status */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-black gradient-text">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
              {project.title}
            </h3>
            {project.featured && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium">
                <Star size={10} fill="currentColor" />Featured
              </span>
            )}
          </div>
          {project.status && (
            <span className={"inline-block mt-1.5 px-3 py-0.5 rounded-full border text-xs font-semibold " + (statusColors[project.status] || statusColors["Completed"])}>
              {project.status}
            </span>
          )}
        </div>
      </div>

      {/* Subtitle */}
      {project.subtitle && (
        <p className="text-white font-semibold text-sm leading-snug">{project.subtitle}</p>
      )}

      {/* Description */}
      {project.description && (
        <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
      )}

      {/* Key Features */}
      {features.length > 0 && (
        <div>
          <p className="text-primary font-bold text-sm mb-3">Key Features:</p>
          <ul className="flex flex-col gap-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <ChevronRight size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech tags */}
      {project.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <span key={i} className="px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-mono">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/40 text-primary font-bold text-sm hover:bg-primary/10 transition-all duration-300"
          >
            <Github size={16} />
            View Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm hover:opacity-90 transition-all duration-300 glow-purple"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>
      </div>
    </motion.div>
  );
}
