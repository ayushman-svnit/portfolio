"use client";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Star, BookOpen, ChevronRight } from "lucide-react";

const statusColors = {
  "Currently Pursuing": "bg-primary/20 border-primary/30 text-primary",
  "Completed": "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass border border-white/10 rounded-2xl p-6 flex flex-col gap-5 hover:border-primary/40 transition-all duration-500 group"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <GraduationCap size={22} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">{edu.degree}</h3>
          {edu.specialization && <p className="text-slate-200 font-semibold text-sm mt-0.5">{edu.specialization}</p>}
          <p className="text-slate-400 text-sm mt-0.5">{edu.institution}</p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            {edu.duration && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Calendar size={12} />{edu.duration}
              </div>
            )}
            {edu.location && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <MapPin size={12} />{edu.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {edu.description && <p className="text-slate-400 text-sm leading-relaxed">{edu.description}</p>}

      {/* Key Highlights */}
      {highlights.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Star size={14} className="text-primary" />
            <p className="text-primary font-bold text-sm">Key Highlights</p>
          </div>
          <ul className="flex flex-col gap-2">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <ChevronRight size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Relevant Courses */}
      {courses.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} className="text-primary" />
            <p className="text-primary font-bold text-sm">Relevant Courses</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {courses.map((c, i) => (
              <span key={i} className="px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-mono">{c}</span>
            ))}
          </div>
        </div>
      )}

      {/* Status badge */}
      {edu.status && (
        <div>
          <span className={"inline-block px-4 py-1.5 rounded-full border text-xs font-bold " + (statusColors[edu.status] || statusColors["Completed"])}>
            {edu.status}
          </span>
        </div>
      )}
    </motion.div>
  );
}
