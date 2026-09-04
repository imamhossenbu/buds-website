"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api";

export function RecentEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents(3).then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-24 bg-surface-muted border-y border-border relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-sm font-bold text-primary-600 tracking-widest uppercase mb-2">Join Us</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Upcoming Events</h3>
          </div>
          <Link href="/events" className="group flex items-center gap-2 text-primary-600 font-medium hover:text-primary-800 transition-colors">
            View All Events
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-[400px] shadow-sm border border-border" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <Calendar size={48} className="mx-auto text-text-muted mb-4 opacity-50" />
            <p className="text-lg text-text-secondary font-medium">No upcoming events right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={event._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
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
    </section>
  );
}
