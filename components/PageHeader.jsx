"use client";
import { motion } from "framer-motion";

export default function PageHeader({ badge, title, highlight, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center mb-16"
    >
      {badge && (
        <div className="inline-flex mb-5">
          <span className="section-label">{badge}</span>
        </div>
      )}
      <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight font-display">
        {title}{" "}
        <span className="gradient-text">{highlight}</span>
      </h1>
      {description && (
        <p className="text-slate-500 mt-4 max-w-lg mx-auto text-base leading-relaxed">{description}</p>
      )}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
      </div>
    </motion.div>
  );
}
