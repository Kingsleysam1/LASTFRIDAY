import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VIDEO_MOMENTS, MOVIE_INFO } from "../data";
import { globalAudio } from "./AudioEngine";
import { Play, Film, Sparkles, X, Clapperboard, Clock } from "lucide-react";

export default function VideoMoments() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState("");

  const handleOpenMoment = (title: string) => {
    // Standardize YouTube clip embeds using the main trailer with offset start times to simulate distinct moments
    // e.g. Beginning start=5, Betrayal start=25, Fire start=45, etc.
    let startSecs = 0;
    if (title.includes("Beginning")) startSecs = 5;
    else if (title.includes("Betrayal")) startSecs = 30;
    else if (title.includes("Fire")) startSecs = 55;
    else if (title.includes("Revenge")) startSecs = 85;
    else if (title.includes("Last Friday")) startSecs = 100;

    const embedUrl = `${MOVIE_INFO.trailerEmbedUrl}?autoplay=1&start=${startSecs}&mute=0&rel=0`;
    setActiveVideoUrl(embedUrl);
    setActiveTitle(title);
    
    globalAudio.playClick();
    globalAudio.setVolume(0.1); // Mute background score
  };

  const handleCloseMoment = () => {
    setActiveVideoUrl(null);
    setActiveTitle("");
    globalAudio.playClick();
    globalAudio.setVolume(0.8); // Restore background score
  };

  return (
    <section 
      id="moments-section"
      className="relative py-24 md:py-32 bg-brand-surface px-6 md:px-16 overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(181,18,27,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <div className="flex items-center gap-4 mb-3">
            <span className="w-12 h-[1px] bg-brand-red" />
            <span className="text-xs font-mono tracking-[0.4em] text-brand-red font-bold uppercase">
              Exclusive Cuts
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
            VIDEO MOMENTS
          </h2>
        </div>

        {/* Moments Horizontal/Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 cursor-hover-watch">
          {VIDEO_MOMENTS.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => handleOpenMoment(moment.title)}
              onMouseEnter={() => globalAudio.playHoverSweep()}
              className="group relative aspect-[16/10] bg-black border border-white/5 overflow-hidden transition-all duration-500 red-glow-hover rounded-none flex flex-col justify-end p-5"
            >
              {/* Cover Image Backdrop */}
              <img
                src={moment.thumbnailUrl}
                alt={moment.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-65 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700"
              />
              
              {/* Dynamic Gradient Mask overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-brand-red/10 transition-colors duration-500" />
              
              {/* Netflix-style Simulated Looping Progress Line on Hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10 overflow-hidden">
                <div className="h-full w-0 bg-brand-red group-hover:w-full transition-all duration-[3000ms] ease-out" />
              </div>

              {/* Glowing play icon appears centered on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                <div className="w-14 h-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg shadow-brand-red/40 border border-white/15">
                  <Play className="w-5 h-5 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Cinematic Scanlines Layer (Film grain simulator on hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none transition-all duration-500" />

              {/* Text metadata content */}
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <Clapperboard className="w-3.5 h-3.5 text-brand-red" />
                  <span className="text-[9px] font-mono tracking-widest text-brand-red font-bold uppercase">PREVIEW</span>
                  <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase ml-auto">{moment.duration}</span>
                </div>
                <h3 className="text-md font-display font-extrabold text-white tracking-wider uppercase mb-1.5">
                  {moment.title}
                </h3>
                <p className="text-[11px] text-gray-400 font-light leading-relaxed h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500">
                  {moment.description}
                </p>
              </div>

              {/* Accent corner brackets */}
              <div className="absolute top-3 left-3 border-t border-l border-white/0 group-hover:border-white/20 w-3 h-3 transition-colors duration-500" />
              <div className="absolute bottom-3 right-3 border-b border-r border-white/0 group-hover:border-white/20 w-3 h-3 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX VIDEOS THEATER COMPONENT */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
            onClick={handleCloseMoment}
          >
            {/* Header info */}
            <div className="w-full max-w-5xl flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-brand-red" />
                <h4 className="text-lg md:text-xl font-display font-extrabold tracking-widest text-white uppercase">
                  THE LAST FRIDAY &bull; <span className="text-brand-red">{activeTitle}</span>
                </h4>
              </div>
              <button
                id="lightbox-close-btn"
                onClick={handleCloseMoment}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className="w-10 h-10 rounded-full bg-brand-surface border border-white/10 hover:border-brand-red text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-hover-enter"
                title="Close Theater"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-5xl aspect-video bg-black border border-white/10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} // Stop clicking video from closing the lightbox
            >
              <iframe
                src={activeVideoUrl}
                title={activeTitle}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            {/* Cinema Tip */}
            <p className="mt-4 text-[10px] font-mono tracking-widest text-gray-500 uppercase">
              CLICK ANYWHERE ON THE OUTSIDE CANVAS TO EXIT THEATER
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
