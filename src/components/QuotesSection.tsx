import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MOVIE_QUOTES } from "../data";
import { globalAudio } from "./AudioEngine";
import { Quote, MessageSquareDashed } from "lucide-react";

export default function QuotesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Timed rotation for automatic sliding (8 seconds per dramatic line)
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOVIE_QUOTES.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectQuote = (index: number) => {
    setActiveIndex(index);
    globalAudio.playClick();
  };

  return (
    <section 
      id="quotes-section"
      className="relative py-28 md:py-40 bg-brand-bg px-6 md:px-16 overflow-hidden border-b border-white/5"
    >
      {/* Heavy vignette shadow layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,18,27,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
        
        {/* Quote category mark */}
        <div className="flex items-center gap-4 mb-10">
          <MessageSquareDashed className="w-5 h-5 text-brand-red animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.5em] text-brand-red font-bold uppercase">
            VOICES OF WAR
          </span>
        </div>

        {/* Big quote carousel container */}
        <div className="min-h-[220px] md:min-h-[260px] flex items-center justify-center relative w-full mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative px-4"
            >
              {/* Giant background quotes logo */}
              <Quote className="absolute -top-12 -left-4 md:-top-16 md:-left-8 w-24 h-24 md:w-32 md:h-32 text-white/[0.02] rotate-180 pointer-events-none" />
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-serif italic tracking-wide text-white leading-relaxed select-none">
                &ldquo;{MOVIE_QUOTES[activeIndex].text}&rdquo;
              </h3>

              {/* Speaker Metadata */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="w-6 h-[1px] bg-brand-red" />
                <span className="text-sm font-display tracking-widest text-brand-red font-bold uppercase">
                  {MOVIE_QUOTES[activeIndex].speaker}
                </span>
                {MOVIE_QUOTES[activeIndex].context && (
                  <span className="text-xs text-gray-500 font-mono tracking-wider">
                    &bull; {MOVIE_QUOTES[activeIndex].context}
                  </span>
                )}
                <span className="w-6 h-[1px] bg-brand-red" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sliding Dot Controllers */}
        <div className="flex gap-4 cursor-hover-enter">
          {MOVIE_QUOTES.map((_, idx) => (
            <button
              key={idx}
              id={`quote-slide-dot-${idx}`}
              onClick={() => handleSelectQuote(idx)}
              onMouseEnter={() => globalAudio.playHoverSweep()}
              className="relative p-2 focus:outline-none cursor-none group"
              title={`View Quote ${idx + 1}`}
            >
              {/* Outer line wrap */}
              <div 
                className={`h-1.5 transition-all duration-500 bg-white ${
                  activeIndex === idx ? "w-8 bg-brand-red" : "w-2 opacity-30 group-hover:opacity-75"
                }`} 
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
