import React, { useState } from "react";
import { motion } from "motion/react";
import { TIMELINE_EVENTS } from "../data";
import { globalAudio } from "./AudioEngine";
import { Calendar, CheckCircle2, Milestone, Hourglass, HelpCircle } from "lucide-react";

export default function TimelineSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getStatusIcon = (status: "completed" | "current" | "upcoming") => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-brand-red" />;
      case "current":
        return <Milestone className="w-5 h-5 text-brand-gold animate-bounce" />;
      case "upcoming":
        return <Hourglass className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusClass = (status: "completed" | "current" | "upcoming") => {
    switch (status) {
      case "completed":
        return "border-brand-red/30 bg-brand-red/5";
      case "current":
        return "border-brand-gold bg-brand-gold/5 shadow-lg shadow-brand-gold/10";
      case "upcoming":
        return "border-white/5 bg-brand-surface/40 opacity-50 hover:opacity-90";
    }
  };

  return (
    <section 
      id="timeline-section"
      className="relative py-24 md:py-32 bg-brand-surface px-6 md:px-16 overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(181,18,27,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="w-8 h-[1px] bg-brand-red" />
            <span className="text-xs font-mono tracking-[0.4em] text-brand-red font-bold uppercase">THE PRODUCTION LINE</span>
            <span className="w-8 h-[1px] bg-brand-red" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
            FILM JOURNEY
          </h2>
          <p className="text-sm text-gray-400 font-light max-w-md mx-auto mt-4 uppercase tracking-widest font-mono text-[10px]">
            Interactive Production & Distribution Timeline
          </p>
        </div>

        {/* Chronological Steps Timeline Stack */}
        <div className="relative border-l border-white/10 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12 text-left cursor-hover-explore">
          {TIMELINE_EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                globalAudio.playHoverSweep();
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative border p-6 md:p-8 rounded-none transition-all duration-500 cursor-none ${getStatusClass(event.status)}`}
            >
              
              {/* Outer floating node circle */}
              <div 
                className={`absolute -left-[45px] md:-left-[85px] top-8 w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center z-10 bg-brand-bg transition-all duration-500 ${
                  event.status === "completed" 
                    ? "border-brand-red text-brand-red shadow-md shadow-brand-red/20" 
                    : event.status === "current"
                    ? "border-brand-gold text-brand-gold shadow-lg shadow-brand-gold/30"
                    : "border-white/10 text-gray-600"
                }`}
              >
                {getStatusIcon(event.status)}
              </div>

              {/* Connector horizontal line overlay */}
              <div 
                className={`absolute -left-8 md:-left-16 top-12 h-[1px] w-8 md:w-16 z-0 transition-colors duration-500 ${
                  hoveredIndex === index 
                    ? "bg-brand-red" 
                    : "bg-white/10"
                }`} 
              />

              {/* Milestone Details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-red font-bold uppercase">
                    {event.phase}
                  </span>
                  <h3 className="text-lg md:text-2xl font-display font-extrabold text-white tracking-wide uppercase mt-1">
                    {event.title}
                  </h3>
                </div>
                
                {/* Date stamp card */}
                <div className="flex items-center gap-2 self-start md:self-auto bg-black/40 px-3 py-1.5 border border-white/5 rounded-none">
                  <Calendar className="w-3.5 h-3.5 text-brand-red" />
                  <span className="text-[10px] font-mono tracking-widest text-gray-300 font-bold uppercase">
                    {event.date}
                  </span>
                </div>
              </div>

              {/* Event body description */}
              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-3xl">
                {event.description}
              </p>

              {/* Status footer labels */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono tracking-widest font-bold uppercase">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    event.status === "completed" ? "bg-brand-red" : event.status === "current" ? "bg-brand-gold" : "bg-gray-600"
                  }`} />
                  <span className={event.status === "current" ? "text-brand-gold animate-pulse" : "text-gray-400"}>
                    {event.status === "completed" ? "RELEASE PHASE CONCLUDED" : event.status === "current" ? "ACTIVE MILESTONE" : "PRE-RELEASE PIPELINE"}
                  </span>
                </div>
                <span className="text-gray-500">BACK TO LIFE ENTERTAINMENT</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
