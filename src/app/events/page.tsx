"use client";

import { useState, useEffect } from "react";
import { fetchEvents } from "@/lib/api";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEvents(100).then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const filteredEvents = events.filter((e) => {
    if (filter === "all") return true;
    return e.status === filter;
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
            Events & Activities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Join our debates, workshops, and tournaments. 
            Engage with the best minds and sharpen your skills.
          </motion.p>
        </div>
      </div>

      <div className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-surface border border-border rounded-lg p-1 shadow-sm">
            {["all", "upcoming", "ongoing", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                  filter === tab 
                  ? "bg-primary-600 text-white shadow" 
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-surface rounded-2xl h-[400px] shadow-sm border border-border" />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-border">
            <Calendar size={48} className="mx-auto text-text-muted mb-4 opacity-50" />
            <p className="text-lg text-text-secondary font-medium">No {filter !== "all" ? filter : ""} events found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event._id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-navy-900">
                  {event.banner ? (
                    <img src={event.banner} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-800 to-navy-900 flex items-center justify-center">
                      <span className="text-white/20 font-display font-bold text-4xl">BUDS</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary-600 shadow-sm uppercase tracking-wide">
                    {event.status}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs font-medium text-text-muted mb-3">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary-500" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5 truncate"><MapPin size={14} className="text-primary-500" /> {event.venue}</span>
                  </div>
                  <h4 className="text-xl font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-sm text-text-secondary line-clamp-3 mb-6 flex-1">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <span className="flex items-center gap-1.5 text-xs font-medium bg-surface-muted px-2.5 py-1 rounded-md text-text-secondary capitalize">
                      <Tag size={12} className="text-accent-400" />
                      {event.type === 'other' ? event.customType : event.type}
                    </span>
                    <Link href={`/events/${event._id || ''}`} className="text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1">
                      Details <ArrowRight size={14} />
                    </Link>
                  </div>
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
