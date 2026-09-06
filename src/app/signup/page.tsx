"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Phone, BadgeInfo, Building, Calendar, MessageSquare, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    session: '',
    whyJoin: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5001/api/v1/join-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application.');
      }

      setSuccess(true);
      // Optional: redirect to a success/status page
      // router.push('/application-success');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-bg">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-8 md:p-10 max-w-md text-center bg-surface"
        >
          <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-success" size={28} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
          <p className="text-text-secondary mb-6">
            Thank you for applying to join the Buds Debating Society. We will review your application and get back to you soon.
          </p>
          <Link href="/" className="btn btn-primary w-full">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-bg">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-primary-200)] opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-navy-400)] opacity-20 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl relative z-10 my-8"
      >
        <div className="card p-8 md:p-10 backdrop-blur-xl bg-surface/80 border border-white/20 dark:border-white/5 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <User className="text-accent-600" size={28} />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Join Our Society</h1>
            <p className="text-text-secondary text-sm">Submit your application to become a member</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 mb-5 rounded-md bg-[var(--color-danger-bg)] text-[var(--color-danger)] text-sm border border-[var(--color-danger)]/20"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="label" htmlFor="name">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <User size={18} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    className="input pl-10 px-4 w-full bg-surface-muted/50 focus:bg-surface transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="email">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="input pl-10 px-4 w-full bg-surface-muted/50 focus:bg-surface transition-colors"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="phone">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <Phone size={18} />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    className="input pl-10 px-4 w-full bg-surface-muted/50 focus:bg-surface transition-colors"
                    placeholder="+880 1..."
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="studentId">Student ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <BadgeInfo size={18} />
                  </div>
                  <input
                    id="studentId"
                    type="text"
                    className="input pl-10 px-4 w-full bg-surface-muted/50 focus:bg-surface transition-colors"
                    placeholder="Your Student ID"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="department">Department</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <Building size={18} />
                  </div>
                  <input
                    id="department"
                    type="text"
                    className="input pl-10 px-4 w-full bg-surface-muted/50 focus:bg-surface transition-colors"
                    placeholder="E.g. Computer Science"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="session">Session</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <Calendar size={18} />
                  </div>
                  <input
                    id="session"
                    type="text"
                    className="input pl-10 px-4 w-full bg-surface-muted/50 focus:bg-surface transition-colors"
                    placeholder="E.g. 2021-2022"
                    value={formData.session}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="label" htmlFor="whyJoin">Why do you want to join?</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none text-text-muted">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  id="whyJoin"
                  className="input pl-10 px-4 py-3 w-full min-h-[100px] resize-y bg-surface-muted/50 focus:bg-surface transition-colors"
                  placeholder="Tell us a little bit about why you want to join..."
                  value={formData.whyJoin}
                  onChange={handleChange}
                  required
                  minLength={10}
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className={`btn btn-primary w-full group mt-4 shadow-lg shadow-accent-400/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Already a member?{' '}
            <Link href="/login" className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-800)] font-medium transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
