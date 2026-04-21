"use client";
import { motion } from "framer-motion";
import { Trophy, MapPin, Calendar, Users, Award, Zap } from "lucide-react";

const positionConfig = {
  "Winner":         { color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/30",   glow: "rgba(245,158,11,0.2)" },
  "1st Runner Up":  { color: "text-slate-300",  bg: "bg-slate-500/10 border-slate-500/30",   glow: "rgba(148,163,184,0.15)" },
  "2nd Runner Up":  { color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30", glow: "rgba(249,115,22,0.15)" },
  "Finalist":       { color: "text-primary",    bg: "bg-primary/10 border-primary/30",       glow: "rgba(99,102,241,0.2)" },
  "Participant":    { color: "text-slate-400",  bg: "bg-white/5 border-white/10",            glow: "none" },
};

function getPositionStyle(position) {
  if (!position) return positionConfig["Participant"];
  const key = Object.keys(positionConfig).find(k => position.toLowerCase().includes(k.toLowerCase()));
  return positionConfig[key] || positionConfig["Participant"];
}

export default function HackathonsSection({ hackathons }) {
  if (!hackathons?.length) return null;

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex mb-5">
            <span className="section-label"><Trophy size={11} />Hackathons</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
            Hackathons &amp; <span className="gradient-text">Competitions</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto text-sm">
            Building under pressure, competing with the best.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hackathons.map((h, i) => {
            const style = getPositionStyle(h.position);
            return (
              <motion.div
                key={h.id || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 flex flex-col gap-4 hover:border-primary/20 transition-all duration-300 overflow-hidden group"
                style={{ boxShadow: style.glow !== "none" ? `0 0 40px ${style.glow}` : "none" }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Zap size={16} className="text-primary" />
                  </div>
                  {h.position && (
                    <span className={"px-3 py-1 rounded-full border text-xs font-bold " + style.bg + " " + style.color}>
                      {h.position}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-base font-bold text-white leading-tight group-hover:gradient-text transition-all">
                    {h.name}
                  </h3>
                  {h.organizer && (
                    <p className="text-slate-400 text-xs mt-0.5">{h.organizer}</p>
                  )}
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1.5">
                  {h.date && (
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 w-fit">
                      <Calendar size={10} className="text-primary" />{h.date}
                    </div>
                  )}
                  {h.location && (
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <MapPin size={10} />{h.location}
                    </div>
                  )}
                  {h.teamSize && (
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <Users size={10} />Team of {h.teamSize}
                    </div>
                  )}
                </div>

                {/* Description */}
                {h.description && (
                  <p className="text-slate-500 text-xs leading-relaxed">{h.description}</p>
                )}

                {/* Tags */}
                {h.tags && h.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {h.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
                  </div>
                )}

                {/* Subtle corner glow for winners */}
                {(h.position?.toLowerCase().includes("1st") || h.position?.toLowerCase().includes("winner")) && (
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
