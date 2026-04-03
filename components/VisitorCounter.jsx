"use client";
import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

function useCountUp(target, duration = 2200) {
  const [count, setCount] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    if (!target) return;
    startRef.current = null;
    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(null);
  const animated = useCountUp(visitors, 2200);

  useEffect(() => {
    const track = async () => {
      try {
        const ref = doc(db, "stats", "visitors");
        // Use sessionStorage — clears on refresh/new tab, persists on SPA navigation
        const alreadyCounted = sessionStorage.getItem("visited");
        if (!alreadyCounted) {
          await setDoc(ref, { total: increment(1) }, { merge: true });
          sessionStorage.setItem("visited", "1");
        }

        const snap = await getDoc(ref);
        if (snap.exists()) setVisitors(snap.data().total || 0);
      } catch {
        // silently fail
      }
    };
    track();
  }, []);

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4, scale: 1.03 }}
          className="glass border border-white/10 rounded-2xl px-12 py-8 flex flex-col items-center gap-4 hover:border-primary/30 transition-all duration-300"
          style={{ boxShadow: visitors ? "0 0 40px rgba(99,102,241,0.2)" : "none" }}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            style={{ boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}>
            <Users size={20} className="text-white" />
          </div>

          <div className="text-center">
            <p className="text-5xl font-black gradient-text tabular-nums">
              {visitors === null ? (
                <span className="text-slate-600 text-3xl">...</span>
              ) : (
                animated.toLocaleString()
              )}
            </p>
            <p className="text-slate-400 text-sm mt-2 font-mono">Total Visitors</p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs text-slate-600 font-mono">live</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
