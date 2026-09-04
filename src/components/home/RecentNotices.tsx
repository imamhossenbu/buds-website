"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bell, FileText, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchNotices } from "@/lib/api";

export function RecentNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices(4).then((data) => {
      setNotices(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-50 text-accent-600 mb-6 shadow-sm border border-accent-100/50">
            <Bell size={28} />
          </div>
          <h2 className="text-sm font-bold text-accent-600 tracking-widest uppercase mb-2">Announcements</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Recent Notices</h3>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-surface-muted rounded-xl h-24 border border-border" />
              ))}
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-12 bg-surface-muted rounded-2xl border border-border border-dashed">
              <p className="text-text-secondary font-medium">No recent notices available.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice, i) => (
                <motion.div
                  key={notice._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-white hover:border-accent-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-surface-muted flex items-center justify-center shrink-0 group-hover:bg-accent-50 transition-colors">
                      <FileText size={20} className="text-text-muted group-hover:text-accent-600 transition-colors" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full">
                          {notice.category}
                        </span>
                        <span className="text-xs font-medium text-text-muted">
                          {new Date(notice.publishedAt || new Date()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-text-primary group-hover:text-accent-600 transition-colors line-clamp-1">
                        {notice.title}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 pl-16 sm:pl-0 shrink-0">
                    {notice.attachmentUrl && (
                      <a href={notice.attachmentUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-navy-900 hover:text-white transition-colors" title="Download Attachment">
                        <Download size={18} />
                      </a>
                    )}
                    <Link href={`/notices/${notice._id || ''}`} className="px-4 py-2 rounded-lg bg-white border border-border text-sm font-semibold text-text-primary hover:bg-accent-600 hover:text-white hover:border-accent-600 transition-all shadow-sm">
                      Read
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/notices" className="inline-flex items-center gap-2 text-text-secondary font-medium hover:text-accent-600 transition-colors group">
              View Notice Board
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
