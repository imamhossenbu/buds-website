"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      <div className="flex-1 flex items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-accent-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-danger-bg text-danger mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-danger/20">
              <span className="text-5xl font-bold font-display">!</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              Objection! Something went wrong.
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              We encountered an unexpected error while processing your request.
              Please try refreshing or return to the main stage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => reset()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-600 text-white font-medium text-base transition-transform hover:scale-105 active:scale-95 shadow-md shadow-primary-600/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <RefreshCcw size={18} className="transition-transform group-hover:rotate-180 duration-500" />
                Try Again
              </button>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-navy-800 font-medium text-base border border-border transition-all hover:bg-surface-muted hover:border-navy-200 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Home size={18} className="transition-transform group-hover:-translate-y-0.5" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
