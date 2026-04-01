'use client';
import { motion } from 'framer-motion';

export default function PageHeader({ badge, title, highlight, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-medium mb-4">
        {badge}
      </div>
      <h1 className="text-4xl lg:text-6xl font-black">
        {title} <span className="gradient-text">{highlight}</span>
      </h1>
      {description && (
        <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">{description}</p>
      )}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
      </div>
    </motion.div>
  );
}
