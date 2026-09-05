"use client";

import { useState, useEffect } from "react";
import { fetchGallery } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchGallery(100).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
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
            Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Moments, achievements, and memories captured from our debates and events.
          </motion.p>
        </div>
      </div>

      <div className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Filters */}
        <div className="flex justify-center mb-12 flex-wrap gap-2">
          {["all", "event", "workshop", "tour", "achievement", "competition"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all border ${
                filter === tab 
                ? "bg-primary-600 text-white border-primary-600 shadow" 
                : "bg-surface text-text-secondary border-border hover:border-primary-200 hover:text-primary-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`animate-pulse bg-surface rounded-2xl border border-border w-full ${i % 2 === 0 ? 'h-64' : 'h-96'}`} />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-border border-dashed">
            <ImageIcon size={48} className="mx-auto text-text-muted mb-4 opacity-50" />
            <p className="text-lg text-text-secondary font-medium">No media found for {filter !== "all" ? filter : "this gallery"}.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item._id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden border border-border bg-navy-900 break-inside-avoid shadow-sm hover:shadow-xl transition-all"
              >
                {item.mediaType === 'video' ? (
                  <video src={item.mediaUrl} className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" controls />
                ) : (
                  <img src={item.mediaUrl} alt={item.title} className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-300 mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-white font-bold text-lg leading-tight">
                    {item.title}
                  </h4>
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
