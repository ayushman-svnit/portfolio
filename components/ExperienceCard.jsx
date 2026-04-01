"use client";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Target } from "lucide-react";

export default function ExperienceCard({ exp, index }) {
  const responsibilities = exp.responsibilities
    ? (typeof exp.responsibilities === "string"
        ? exp.responsibilities.split("\n").filter(Boolean)
        : exp.responsibilities)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass border border-white/10 rounded-2xl p-6 flex flex-col gap-5 hover:border-primary/40 transition-all duration-500 group"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Briefcase size={22} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
            {exp.role}
          </h3>
          <p className="text-slate-200 font-semibold text-sm mt-0.5">{exp.company}</p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            {exp.duration && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Calendar size={12} />
                {exp.duration}
              </div>
            )}
            {exp.location && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <MapPin size={12} />
                {exp.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {exp.description && (
        <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
      )}

      {/* Key Responsibilities */}
      {responsibilities.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target size={15} className="text-primary" />
            <p className="text-primary font-bold text-sm">Key Responsibilities</p>
          </div>
          <ul className="flex flex-col gap-2">
            {responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {exp.skills && exp.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {exp.skills.map((s, i) => (
            <span key={i} className="px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-mono">
              {s}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
