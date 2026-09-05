"use client";

import { useState, useEffect } from "react";
import { fetchNotices } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Bell, FileText, Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchNotices(100).then((data) => {
      setNotices(data);
      setLoading(false);
    });
  }, []);

  const filteredNotices = notices.filter((n) => {
    if (filter === "all") return true;
    return n.category === filter;
  });

  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <Navbar />

      <div className="pt-32 pb-16 bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Notice Board
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Stay updated with the latest announcements, schedules, and important information.
          </motion.p>
        </div>
      </div>

      <div className="flex-1 py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Filters */}
        <div className="flex justify-center mb-12 flex-wrap gap-2">
          {["all", "general", "event", "membership", "urgent"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all border ${
                filter === tab 
                ? "bg-accent-600 text-white border-accent-600 shadow" 
                : "bg-surface text-text-secondary border-border hover:border-accent-200 hover:text-accent-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse bg-surface rounded-xl h-24 border border-border" />
            ))}
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-border border-dashed">
            <Bell size={48} className="mx-auto text-text-muted mb-4 opacity-50" />
            <p className="text-lg text-text-secondary font-medium">No {filter !== "all" ? filter : ""} notices found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((notice, i) => (
              <motion.div
                key={notice._id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-surface hover:border-accent-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${notice.category === 'urgent' ? 'bg-rose-50 text-rose-500' : 'bg-surface-muted text-text-muted group-hover:bg-accent-50 group-hover:text-accent-600'}`}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${notice.category === 'urgent' ? 'text-rose-600 bg-rose-50' : 'text-accent-600 bg-accent-50'}`}>
                        {notice.category}
                      </span>
                      <span className="text-xs font-medium text-text-muted">
                        {new Date(notice.publishedAt || new Date()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <h4 className={`text-base font-bold transition-colors line-clamp-2 ${notice.category === 'urgent' ? 'text-rose-600' : 'text-text-primary group-hover:text-accent-600'}`}>
                      {notice.title}
                    </h4>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pl-16 sm:pl-0 shrink-0 mt-4 sm:mt-0">
                  {notice.attachmentUrl && (
                    <a href={notice.attachmentUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-navy-900 hover:text-white transition-colors" title="Download Attachment">
                      <Download size={18} />
                    </a>
                  )}
                  <Link href={`/notices/${notice._id || ''}`} className="px-4 py-2 rounded-lg bg-surface border border-border text-sm font-semibold text-text-primary hover:bg-accent-600 hover:text-white hover:border-accent-600 transition-all shadow-sm flex items-center gap-1">
                    Read <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
