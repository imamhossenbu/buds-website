"use client";

import { useState, useEffect } from "react";
import { fetchCommittees } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function CommitteesPage() {
  const [committees, setCommittees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommittees().then((data) => {
      setCommittees(data);
      setLoading(false);
    });
  }, []);

  const currentExecutive = committees.find(c => c.type === 'executive' && c.isCurrent);
  const alumniAssoc = committees.find(c => c.type === 'alumni');

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
            Leadership
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Meet the dedicated individuals driving the society forward and our esteemed alumni network.
          </motion.p>
        </div>
      </div>

      <div className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-24">
        
        {loading ? (
          <div className="space-y-12">
            <div className="h-8 bg-surface-muted w-64 rounded animate-pulse mx-auto" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-surface rounded-2xl h-72 border border-border" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Executive Committee */}
            {currentExecutive && (
              <section>
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 mb-6 shadow-sm border border-primary-100/50">
                    <Users size={28} />
                  </div>
                  <h2 className="text-sm font-bold text-primary-600 tracking-widest uppercase mb-2">Current</h2>
                  <h3 className="text-3xl font-display font-bold text-text-primary">
                    {currentExecutive.name}
                  </h3>
                  <p className="text-text-secondary mt-2 font-medium">Tenure: {currentExecutive.tenureYear}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {currentExecutive.members.sort((a: any, b: any) => a.order - b.order).map((member: any, i: number) => (
                    <motion.div
                      key={member._id || i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all text-center group"
                    >
                      <div className="aspect-square bg-navy-100 overflow-hidden relative">
                        {member.image ? (
                          <img src={member.image} alt={member.designation} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-navy-50 text-navy-200">
                            <Users size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-6">
                        <h4 className="text-lg font-bold text-text-primary mb-1">
                          {/* We don't have user name populated in the simple endpoint yet, fallback to a generic or fetched name if available */}
                          {member.userId?.name || "Committee Member"}
                        </h4>
                        <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                          {member.designation}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Alumni Association */}
            {alumniAssoc && (
              <section>
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-50 text-accent-600 mb-6 shadow-sm border border-accent-100/50">
                    <Award size={28} />
                  </div>
                  <h2 className="text-sm font-bold text-accent-600 tracking-widest uppercase mb-2">Legacy</h2>
                  <h3 className="text-3xl font-display font-bold text-text-primary">
                    {alumniAssoc.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {alumniAssoc.members.sort((a: any, b: any) => a.order - b.order).map((member: any, i: number) => (
                    <motion.div
                      key={member._id || i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:border-accent-200 hover:shadow-md transition-all text-center group"
                    >
                      <div className="aspect-square bg-navy-100 overflow-hidden relative p-4 flex items-end justify-center">
                         {member.image ? (
                          <img src={member.image} alt={member.designation} className="w-full h-full object-cover rounded-xl shadow-sm" />
                        ) : (
                          <div className="w-full h-full rounded-xl flex items-center justify-center bg-accent-50 text-accent-200">
                            <Users size={48} />
                          </div>
                        )}
                      </div>
                      <div className="p-5 pt-2">
                        <h4 className="text-lg font-bold text-text-primary mb-1">
                          {member.userId?.name || "Alumni Member"}
                        </h4>
                        <p className="text-xs font-semibold text-accent-600 uppercase tracking-wide">
                          {member.designation}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
