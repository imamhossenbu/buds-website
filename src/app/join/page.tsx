"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, submit to backend /api/v1/join-us
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <Navbar />

      <div className="pt-32 pb-16 bg-navy-900 border-b border-navy-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/50 to-transparent mix-blend-screen pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Join The Society
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Take the first step towards mastering eloquence. Apply now to become a member of the Buds Debating Society.
          </motion.p>
        </div>
      </div>

      <div className="flex-1 py-16 px-4 sm:px-6 lg:px-8 w-full flex justify-center">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-border rounded-3xl p-10 max-w-md w-full text-center shadow-lg"
          >
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3 font-display">Application Received!</h3>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Thank you for your interest in joining us. We have received your application and will contact you regarding the upcoming orientation and interview sessions.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 rounded-full bg-surface-muted text-text-primary font-semibold hover:bg-border transition-colors w-full"
            >
              Submit Another
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-border rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-lg"
          >
            <div className="mb-10 text-center">
              <h3 className="text-2xl font-bold text-text-primary mb-2 font-display">Application Form</h3>
              <p className="text-sm text-text-secondary">Please fill out all required fields accurately.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">First Name *</label>
                  <input type="text" required className="input px-4" placeholder="John" />
                </div>
                <div>
                  <label className="label">Last Name *</label>
                  <input type="text" required className="input px-4" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Email Address *</label>
                  <input type="email" required className="input px-4" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="label">Phone Number *</label>
                  <input type="tel" required className="input px-4" placeholder="+880 1..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Student ID *</label>
                  <input type="text" required className="input px-4" placeholder="e.g. 202412345" />
                </div>
                <div>
                  <label className="label">Department / Major *</label>
                  <input type="text" required className="input px-4" placeholder="Computer Science" />
                </div>
              </div>

              <div>
                <label className="label">Why do you want to join the society? *</label>
                <textarea 
                  required 
                  rows={4} 
                  className="input px-4 py-3 resize-none" 
                  placeholder="Tell us a bit about your motivation and prior experience..." 
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary-600 text-white font-bold text-lg hover:bg-primary-700 active:scale-95 transition-all shadow-md shadow-primary-600/20"
                >
                  Submit Application
                  <Send size={18} />
                </button>
                <p className="text-xs text-text-muted text-center mt-4">
                  By submitting this form, you agree to abide by the society's constitution and rules.
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}
