import React, { useRef } from "react";
import { motion } from "motion/react";
import { CAST_MEMBERS } from "../data";
import { globalAudio } from "./AudioEngine";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

export default function CastSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
      globalAudio.playClick();
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
      globalAudio.playClick();
    }
  };

  return (
    <section 
      id="cast-section"
      className="relative py-24 md:py-32 bg-brand-bg px-6 md:px-16 overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,18,27,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Scroll Controls */}
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <div className="text-left">
            <div className="flex items-center gap-4 mb-3">
              <span className="w-12 h-[1px] bg-brand-red" />
              <span className="text-xs font-mono tracking-[0.4em] text-brand-red font-bold uppercase">
                The Ensemble
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
              MEET THE CAST
            </h2>
          </div>

          {/* Scrolling Arrow buttons */}
          <div className="flex gap-3">
            <button
              id="cast-scroll-left-btn"
              onClick={scrollLeft}
              onMouseEnter={() => globalAudio.playHoverSweep()}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-brand-red bg-brand-surface text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-hover-enter"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="cast-scroll-right-btn"
              onClick={scrollRight}
              onMouseEnter={() => globalAudio.playHoverSweep()}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-brand-red bg-brand-surface text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-hover-enter"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Netflix-Style Horizontal Scroll Roster */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar cursor-hover-explore scroll-smooth"
        >
          {CAST_MEMBERS.map((actor, index) => (
            <motion.div
              key={actor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start bg-[#111111] border-l border-r border-b border-white/5 border-t-2 border-t-transparent hover:border-t-brand-red hover:bg-[#1a0000] transition-all duration-500 rounded-none relative overflow-hidden group"
              onMouseEnter={() => globalAudio.playHoverSweep()}
            >
              {/* Headshot with crop-zoom effect */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={actor.imageUrl}
                  alt={actor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale contrast-[115%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30 opacity-80" />

                {/* Festival Nomination Laurel Badge */}
                {actor.nomination && (
                  <div className="absolute top-4 right-4 bg-brand-gold/90 text-black px-2.5 py-1 flex items-center gap-1.5 shadow-lg">
                    <Award className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-mono tracking-wider font-bold">NOMINEE</span>
                  </div>
                )}
              </div>

              {/* Roster Information Card */}
              <div className="p-6 text-left relative">
                <p className="text-[10px] font-mono tracking-widest text-brand-red font-bold uppercase mb-1">
                  {actor.role.includes("Protagonist") ? "LEAD ACTRESS" : "CAST MEMBER"}
                </p>
                <h3 className="text-lg md:text-xl font-display font-extrabold text-white tracking-wide uppercase mb-1 group-hover:text-brand-red transition-colors duration-300">
                  {actor.name}
                </h3>
                <p className="text-sm text-gray-400 font-light">
                  as {actor.role}
                </p>

                {/* Nomination info if applicable */}
                {actor.nomination && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2 text-brand-gold">
                    <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-mono font-medium tracking-wide">
                      {actor.nomination} (TINFF)
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
