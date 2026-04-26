"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { text: "Initializing limitless protocol...", delay: 0 },
  { text: "Rendering infinite space...", delay: 0.4 },
  { text: "Connecting to infinite code...", delay: 0.8 },
  { text: "Executing domain.sh ...", delay: 1.2 },
  { text: "Deploying domain expansion...", delay: 1.6 },
  { text: "✦ Unlimited Void active ✓", delay: 2.0, done: true },
];

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const targets = [15, 35, 55, 70, 85, 100];
    targets.forEach((t, i) => setTimeout(() => setProgress(t), 300 + i * 380));
    LINES.forEach((_, i) => setTimeout(() => setVisibleLines(i + 1), 200 + i * 400));
    setTimeout(() => setExiting(true), 3200);
    setTimeout(() => setLoading(false), 3800);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#06060f" }}
        >
          {/* Domain expansion bg */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(37,99,235,0.1) 40%, transparent 70%)" }}
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)" }}
          />
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md mx-6"
          >
            <div className="rounded-2xl overflow-hidden border border-purple-900/40"
              style={{ background: "rgba(124,58,237,0.05)", backdropFilter: "blur(24px)", boxShadow: "0 0 80px rgba(124,58,237,0.15), 0 0 160px rgba(124,58,237,0.05)" }}>

              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-purple-900/30"
                style={{ background: "rgba(124,58,237,0.08)" }}>
                <div className="w-3 h-3 rounded-full bg-red-600/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-purple-500/70" />
                <span className="ml-3 text-xs text-purple-400/60 font-mono">domain_expansion.exe</span>
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-sm min-h-[180px]">
                {LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }} className="flex items-start gap-2 mb-2">
                    <span className={line.done ? "text-purple-400" : "text-blue-400"}>
                      {line.done ? "✦" : "›"}
                    </span>
                    <span className={line.done ? "text-purple-300" : "text-slate-300"}>{line.text}</span>
                  </motion.div>
                ))}
                {!exiting && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 ml-1 align-middle"
                    style={{ background: "#7c3aed" }} />
                )}
              </div>

              {/* Progress */}
              <div className="px-6 pb-6">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-purple-500/60">limitless_output</span>
                  <span className={progress === 100 ? "text-purple-400" : "text-slate-600"}>{progress}%</span>
                </div>
                <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(124,58,237,0.15)" }}>
                  <motion.div animate={{ width: progress + "%" }} transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #7c3aed, #2563eb, #9333ea)", boxShadow: "0 0 10px rgba(124,58,237,0.8)" }} />
                </div>
              </div>
            </div>

            <p className="text-center mt-5 text-purple-900/60 text-xs font-mono tracking-widest">
              AYUSHMAN SINGH · PORTFOLIO
            </p>
          </motion.div>

          {/* Exit wipe */}
          <AnimatePresence>
            {exiting && (
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                style={{ originX: 0, background: "#06060f" }}
                className="absolute inset-0 z-10" />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
