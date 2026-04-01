"use client";
import { motion } from "framer-motion";
import { Terminal, Globe, Binary, Wrench, BookOpen, Brain, Zap } from "lucide-react";

const categoryConfig = {
  "Programming Languages":        { icon: Terminal,  gradient: "from-blue-500 to-cyan-500" },
  "Web Development":              { icon: Globe,     gradient: "from-violet-500 to-purple-500" },
  "Data Structures & Algorithms": { icon: Binary,    gradient: "from-orange-500 to-amber-500" },
  "Tools & Technologies":         { icon: Wrench,    gradient: "from-green-500 to-emerald-500" },
  "Core Subjects":                { icon: BookOpen,  gradient: "from-pink-500 to-rose-500" },
  "ML Frameworks & Libraries":    { icon: Brain,     gradient: "from-indigo-500 to-blue-500" },
};

export default function SkillsSection({ skills }) {
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || "Tools & Technologies";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  // Sort categories in defined order
  const orderedCats = Object.keys(categoryConfig).filter(c => grouped[c]);
  const extraCats = Object.keys(grouped).filter(c => !categoryConfig[c]);
  const allCats = [...orderedCats, ...extraCats];

  if (skills.length === 0) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center text-slate-500">No skills added yet.</div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-medium mb-4">
            <Zap size={14} />Technical Skills
          </div>
          <h2 className="text-4xl lg:text-5xl font-black">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCats.map((category, catIdx) => {
            const config = categoryConfig[category] || { icon: Zap, gradient: "from-primary to-secondary" };
            const Icon = config.icon;
            const items = grouped[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                className="glass border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                {/* Category header */}
                <div className="flex items-start gap-3 mb-6">
                  <div className={"w-10 h-10 rounded-xl bg-gradient-to-br " + config.gradient + " flex items-center justify-center flex-shrink-0 opacity-90"}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-primary font-bold text-base leading-tight">{category}</h3>
                </div>

                {/* Skills list */}
                <div className="flex flex-col gap-4">
                  {items.map((skill, i) => (
                    <motion.div
                      key={skill.id || i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: catIdx * 0.08 + i * 0.05 }}
                    >
                      <p className="text-slate-300 text-sm mb-1.5">{skill.name}</p>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: ((skill.level || 5) / 10) * 100 + "%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: catIdx * 0.08 + i * 0.05, ease: "easeOut" }}
                          className={"h-full rounded-full bg-gradient-to-r " + config.gradient}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
