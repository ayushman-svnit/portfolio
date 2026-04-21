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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex gap-5"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center pt-1">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <Briefcase size={14} className="text-primary" />
        </div>
        <div className="w-px flex-1 bg-gradient-to-b from-primary/30 to-transparent mt-3" />
      </div>

      {/* Card */}
      <div className="flex-1 pb-10">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-primary/20 transition-all duration-300 group">

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:gradient-text transition-all">{exp.role}</h3>
              <p className="text-primary text-sm font-semibold mt-0.5">{exp.company}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {exp.duration && (
                <div className="flex items-center gap-1.5 text-slate-300 text-xs font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                  <Calendar size={11} className="text-primary" />{exp.duration}
                </div>
              )}
              {exp.location && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <MapPin size={11} className="text-slate-400" />{exp.location}
                </div>
              )}
            </div>
          </div>

          {exp.description && (
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{exp.description}</p>
          )}

          {responsibilities.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Target size={13} className="text-primary" />
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Key Responsibilities</p>
              </div>
              <ul className="flex flex-col gap-2">
                {responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {exp.skills?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {exp.skills.map((s, i) => <span key={i} className="tag">{s}</span>)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
