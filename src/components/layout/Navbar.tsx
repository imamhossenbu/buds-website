"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Notices", href: "/notices" },
    { name: "Gallery", href: "/gallery" },
    { name: "Committees", href: "/committees" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surface/80 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-lg group-hover:bg-primary-500 transition-colors">
                B
              </div>
              <span className={`font-display font-bold text-lg hidden sm:block ${scrolled ? "text-navy-900" : "text-white"}`}>
                Buds Society
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                  scrolled ? "text-text-secondary" : "text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className={`text-sm font-medium transition-colors hover:text-primary-400 ${scrolled ? "text-text-primary" : "text-white"}`}>
              Log in
            </Link>
            <Link href="/join" className={`px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95 flex items-center gap-1 ${
              scrolled ? "bg-primary-600 text-white hover:bg-primary-700" : "bg-white text-primary-600 hover:bg-gray-100"
            }`}>
              Join Us
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? "text-text-primary" : "text-white"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-surface border-b border-border shadow-lg absolute w-full"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-text-primary hover:text-primary-600 hover:bg-primary-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2 px-3">
              <Link
                href="/login"
                className="block text-center py-2 text-base font-medium text-text-primary border border-border rounded-lg"
              >
                Log in
              </Link>
              <Link
                href="/join"
                className="block text-center py-2 text-base font-medium text-white bg-primary-600 rounded-lg"
              >
                Join Us
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
