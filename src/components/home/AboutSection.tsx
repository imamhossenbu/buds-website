"use client";

import { motion } from "framer-motion";
import { Mic2, Users, Trophy, Lightbulb } from "lucide-react";

export function AboutSection() {
  const features = [
    { icon: Mic2, title: "Public Speaking", desc: "Master the art of eloquent and persuasive communication." },
    { icon: Lightbulb, title: "Critical Thinking", desc: "Analyze complex issues and construct logical arguments." },
    { icon: Users, title: "Community", desc: "Join a diverse network of passionate individuals and leaders." },
    { icon: Trophy, title: "Excellence", desc: "Compete and excel in national and international tournaments." },
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary-600 tracking-widest uppercase mb-3">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6 leading-tight">
              Shaping the leaders and thinkers of tomorrow.
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              The Buds Debating Society is a premier student organization dedicated to the 
              promotion of free speech, rational inquiry, and respectful discourse. We believe 
              that the ability to debate is not just a competitive skill, but a fundamental 
              tool for democratic engagement and personal growth.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <feat.icon size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">{feat.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-accent-100 rounded-[2rem] transform rotate-3 scale-[1.02]" />
            <div className="relative aspect-[4/5] md:aspect-square bg-navy-900 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm mb-4">
                  <Trophy size={16} className="text-accent-200" />
                  National Champions 2023
                </div>
                <h4 className="text-2xl font-display font-bold text-white leading-tight">
                  "Debate teaches you to see every issue from at least two sides."
                </h4>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
