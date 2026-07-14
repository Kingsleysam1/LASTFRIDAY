import React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Ticket, ExternalLink, Mail, ArrowRight } from "lucide-react";
import { globalAudio } from "./AudioEngine";

export default function ScreeningSection() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=York+Woods+Library+Theatre+1785+Finch+Ave+W+North+York+ON+M3N+1M6+Canada";
  const emailUrl = "mailto:TheLastFridaymovie@gmail.com?subject=TINFF%20Screening%20Accreditation%20Request";
  const calendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Last+Friday+World+Premiere+at+TINFF&dates=20260908T170200Z/20260908T183400Z&details=Come+watch+the+world+premiere+of+The+Last+Friday+at+TINFF+2026.+Featuring+a+special+3-min+Q%26A+after+the+screening.&location=York+Woods+Library+Theatre,+1785+Finch+Ave+W,+North+York,+ON+M3N+1M6,+Canada";

  return (
    <section 
      id="screening-section"
      className="relative py-24 md:py-36 bg-brand-bg px-6 md:px-16 overflow-hidden border-b border-white/5"
    >
      {/* Background ambient red vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,18,27,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-3"
          >
            <span className="w-8 h-[1px] bg-brand-red" />
            <span className="text-xs font-mono tracking-[0.3em] text-brand-red uppercase font-bold">World Premiere</span>
            <span className="w-8 h-[1px] bg-brand-red" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase"
          >
            CANADA SCREENING & VENUE
          </motion.h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* Left Side: Fliers Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Flier 1 (emma1.jpg) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              onMouseEnter={() => globalAudio.playHoverSweep()}
              className="group relative bg-brand-surface border border-white/10 overflow-hidden shadow-2xl shadow-black/80 hover:border-brand-red/50 red-glow-hover transition-all duration-500 cursor-hover-explore"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src="/images/emma1.jpg" 
                  alt="The Last Friday Canada Screening Flier" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-widest text-brand-red font-bold uppercase bg-black/85 px-2.5 py-1 border border-brand-red/35">
                  OFFICIAL INVITATION
                </span>
              </div>
            </motion.div>

            {/* Flier 2 (emma.jpg) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onMouseEnter={() => globalAudio.playHoverSweep()}
              className="group relative bg-brand-surface border border-white/10 overflow-hidden shadow-2xl shadow-black/80 hover:border-brand-gold/50 gold-glow-hover transition-all duration-500 cursor-hover-explore"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src="/images/emma.jpg" 
                  alt="The Last Friday TINFF Nominations Flyer" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase bg-black/85 px-2.5 py-1 border border-brand-gold/35">
                  FESTIVAL ACCLAIM
                </span>
              </div>
            </motion.div>

          </div>

          {/* Right Side: Screening Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-gradient-to-br from-brand-surface/90 to-black border border-white/5 p-8 md:p-10 relative overflow-hidden"
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-red via-brand-gold to-transparent" />
            
            {/* Laurel badge inside details card */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold bg-brand-gold/5">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-brand-gold tracking-[0.2em] uppercase font-bold">TINFF @ 10 Nominee</p>
                <h3 className="text-xl font-display font-extrabold uppercase tracking-wide text-white">WORLD PREMIERE</h3>
              </div>
            </div>

            {/* Details List */}
            <div className="space-y-6 mb-10">
              
              {/* Date */}
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold block">DATE</span>
                  <span className="text-md font-sans text-gray-200 font-medium">Tuesday, September 08, 2026</span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold block">TIME</span>
                  <span className="text-md font-sans text-gray-200 font-medium">1:02 PM – 2:34 PM</span>
                  <span className="text-xs text-brand-muted block mt-0.5">89 min Runtime + 3 min Q&A Session</span>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold block">VENUE</span>
                  <span className="text-md font-sans text-white font-bold block">York Woods Library Theatre</span>
                  <span className="text-xs text-gray-400 leading-relaxed block mt-1">
                    1785 Finch Ave W, North York, ON M3N 1M6, Canada
                  </span>
                </div>
              </div>

            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Get Directions Link */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => globalAudio.playClick()}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className="flex-1 py-4 px-6 bg-brand-red hover:bg-red-700 text-white text-center font-display text-[11px] font-bold tracking-[2px] uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-red/10 cursor-hover-watch"
              >
                <MapPin className="w-4 h-4" />
                GET DIRECTIONS
              </a>

              {/* Request Accreditation / Tickets */}
              <a
                href={emailUrl}
                onClick={() => globalAudio.playClick()}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className="flex-1 py-4 px-6 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white text-white text-center font-display text-[11px] font-bold tracking-[2px] uppercase transition-all flex items-center justify-center gap-2 cursor-hover-enter"
              >
                <Mail className="w-4 h-4" />
                ACCREDITATION
              </a>

            </div>

            {/* Add to Calendar Link */}
            <div className="mt-6 text-center">
              <a 
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => globalAudio.playClick()}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-400 hover:text-brand-gold transition-colors tracking-widest uppercase cursor-hover-enter"
              >
                <span>Add to Google Calendar</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
