"use client";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Star, BookOpen, ChevronRight } from "lucide-react";

const statusColors = {
  "Currently Pursuing": "bg-primary/10 border-primary/30 text-primary",
  "Completed":          "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
};

export default function EducationCard({ edu, index }) {
  const highlights = edu.highlights
    ? (typeof edu.highlights === "string" ? edu.highlights.split("\n").filter(Boolean) : edu.highlights)
    : [];
  const courses = edu.courses
    ? (typeof edu.courses === "string" ? edu.courses.split(",").map(c => c.trim()).filter(Boolean) : edu.courses)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-primary/20 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <GraduationCap size={16} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white group-hover:gradient-text transition-all leading-tight">{edu.degree}</h3>
          {edu.specialization && <p className="text-slate-200 text-sm font-semibold mt-0.5">{edu.specialization}</p>}
          <p className="text-slate-400 text-sm mt-0.5">{edu.institution}</p>
          <div className="flex flex-wrap gap-3 mt-2.5">
            {edu.duration && (
              <div className="flex items-center gap-1.5 text-slate-300 text-xs font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                <Calendar size={11} className="text-primary" />{edu.duration}
              </div>
            )}
            {edu.location && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <MapPin size={11} className="text-slate-400" />{edu.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {edu.description && (
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{edu.description}</p>
      )}

      {/* Key Highlights */}
      {highlights.length > 0 && (
        <div className="mb-5 rounded-xl bg-primary/5 border border-primary/15 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star size={13} className="text-primary" />
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Key Highlights</p>
          </div>
          <ul className="flex flex-col gap-2">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                <ChevronRight size={13} className="text-primary mt-0.5 flex-shrink-0" />{h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Relevant Courses */}
      {courses.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={13} className="text-primary" />
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Relevant Courses</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {courses.map((c, i) => <span key={i} className="tag">{c}</span>)}
          </div>
        </div>
      )}

      {edu.status && (
        <span className={"inline-block px-3 py-1 rounded-full border text-xs font-semibold " + (statusColors[edu.status] || statusColors["Completed"])}>
          {edu.status}
        </span>
      )}
    </motion.div>
  );
}
