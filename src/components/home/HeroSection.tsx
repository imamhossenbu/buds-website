"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-navy-900/70 mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-900/80 via-transparent to-navy-900/80" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <Sparkles size={16} className="text-primary-200" />
          <span className="text-sm font-medium text-white tracking-wide uppercase">
            Empowering Voices Since 2024
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-6 max-w-4xl leading-tight"
        >
          Speak With Clarity. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-accent-200">
            Argue With Purpose.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 font-medium leading-relaxed"
        >
          Join the premier debating society dedicated to fostering critical thinking, 
          eloquence, and intellectual discourse. Discover your voice with us.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link 
            href="/join" 
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary-600 text-white font-semibold text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2 group"
          >
            Become a Member
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="/events" 
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg transition-all hover:bg-white/20 active:scale-95 flex items-center justify-center"
          >
            Explore Events
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/50 uppercase tracking-widest font-medium">Scroll down</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
