"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
      }

      // Store token (or handle according to your auth logic)
      if (data.data?.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
      }
      
      // Redirect to home or dashboard
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-bg">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-primary-200)] opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-accent-200)] opacity-20 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="card p-8 md:p-10 backdrop-blur-xl bg-surface/80 border border-white/20 dark:border-white/5 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="text-primary-600" size={28} />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-text-secondary text-sm">Enter your credentials to access your account</p>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="label !mb-0" htmlFor="password">Password</label>
                <Link href="/forgot-password" className="text-xs text-[var(--color-primary-600)] hover:text-[var(--color-primary-800)] transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  className="input pl-10 px-4 w-full bg-surface-muted/50 focus:bg-surface transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className={`btn btn-primary w-full group mt-2 shadow-lg shadow-accent-400/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </motion.button>
          </form>

          <div className="mt-8 flex items-center gap-4 before:h-[1px] before:flex-1 before:bg-border after:h-[1px] after:flex-1 after:bg-border">
            <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Or continue with</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-secondary w-full justify-center text-text-primary border-border hover:bg-surface-muted bg-surface/50"
            >
              <FcGoogle size={20} />
              <span className="text-sm">Google</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-secondary w-full justify-center text-text-primary border-border hover:bg-surface-muted bg-surface/50"
            >
              <FaGithub size={20} className="text-text-primary" />
              <span className="text-sm">GitHub</span>
            </motion.button>
          </div>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-800)] font-medium transition-colors">
              Join Us
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
