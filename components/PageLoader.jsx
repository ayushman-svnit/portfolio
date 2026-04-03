"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { text: "Initializing portfolio...", delay: 0 },
  { text: "Loading projects & experience...", delay: 0.4 },
  { text: "Connecting to database...", delay: 0.8 },
  { text: "Rendering components...", delay: 1.2 },
  { text: "All systems ready ✓", delay: 1.6, done: true },
];

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Progress bar
    const targets = [20, 45, 65, 85, 100];
    targets.forEach((t, i) => {
      setTimeout(() => setProgress(t), 300 + i * 380);
    });

    // Terminal lines
    LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), 200 + i * 400);
    });

    // Exit
    setTimeout(() => setExiting(true), 2600);
    setTimeout(() => setLoading(false), 3200);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark overflow-hidden"
        >
          {/* Animated bg blobs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-accent/15 rounded-full blur-3xl pointer-events-none"
          />
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md mx-6"
          >
            {/* Terminal window */}
            <div className="glass border border-white/10 rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 0 60px rgba(99,102,241,0.15), 0 0 120px rgba(99,102,241,0.05)" }}>

              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-xs text-slate-500 font-mono">portfolio.exe</span>
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-sm min-h-[180px]">
                {LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className={line.done ? "text-emerald-400" : "text-primary"}>
                      {line.done ? "✓" : "›"}
                    </span>
                    <span className={line.done ? "text-emerald-400" : "text-slate-300"}>
                      {line.text}
                    </span>
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                {!exiting && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
                  />
                )}
              </div>

              {/* Progress bar */}
              <div className="px-6 pb-6">
                <div className="flex justify-between text-xs text-slate-600 font-mono mb-2">
                  <span>Loading</span>
                  <span className={progress === 100 ? "text-emerald-400" : "text-slate-500"}>
                    {progress}%
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: progress + "%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                    style={{ boxShadow: "0 0 8px rgba(99,102,241,0.8)" }}
                  />
                </div>
              </div>
            </div>

            {/* Name below card */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-5 text-slate-600 text-xs font-mono tracking-widest"
            >
              AYUSHMAN SINGH · PORTFOLIO
            </motion.p>
          </motion.div>

          {/* Exit wipe */}
          <AnimatePresence>
            {exiting && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                style={{ originX: 0 }}
                className="absolute inset-0 bg-dark z-10"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
