"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100 rounded-full blur-[100px] opacity-30 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-[120px] leading-none md:text-[180px] font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-navy-800 via-primary-600 to-accent-400 drop-shadow-sm">
              404
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              Point of Information denied.
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
              We couldn't find the page you're looking for. It might have been moved, 
              deleted, or perhaps it simply lost the debate.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-600 text-white font-medium text-base transition-transform hover:scale-105 active:scale-95 shadow-md shadow-primary-600/20 flex items-center justify-center gap-2 group"
              >
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                Return to Base
              </Link>
              <Link
                href="/events"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-navy-800 font-medium text-base border border-border transition-all hover:bg-surface-muted hover:border-navy-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <Search size={18} />
                Find Events
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
