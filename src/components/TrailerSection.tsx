import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MOVIE_INFO } from "../data";
import { globalAudio } from "./AudioEngine";
import { Play, Film, Clock, Globe, Shield, Calendar, FilmIcon } from "lucide-react";

export default function TrailerSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTrailer = () => {
    setIsPlaying(true);
    globalAudio.playClick();
    // Temporarily reduce background score volume while trailer plays
    globalAudio.setVolume(0.15);
  };

  return (
    <section 
      id="trailer-section"
      className="relative py-24 md:py-32 bg-brand-surface border-y border-white/5 px-6 md:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(181,18,27,0.06)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.5em] text-brand-red font-bold uppercase mb-3"
          >
            EXPERIENCE THE THRILL
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase"
          >
            OFFICIAL TRAILER
          </motion.h2>
        </div>

        {/* Theater Player Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative aspect-video w-full bg-black border border-white/10 shadow-2xl shadow-brand-red/5 rounded-none overflow-hidden group mb-16"
        >
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              // Cinematic Video Cover Card
              <motion.div
                key="video-cover"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="absolute inset-0 flex flex-col items-center justify-center cursor-hover-watch"
                onClick={handlePlayTrailer}
                onMouseEnter={() => globalAudio.playHoverSweep()}
              >
                {/* Background Poster Cover Image */}
                <img
                  src="/src/assets/images/action_scene_still_1782315520243.jpg"
                  alt="Trailer Cover Still"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-[1.03] transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />

                {/* Massive Glowing Play Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-brand-red text-white flex items-center justify-center shadow-2xl shadow-brand-red/50 border border-white/10 relative z-10 transition-shadow duration-500 hover:shadow-brand-red/80 cursor-none"
                >
                  <Play className="w-8 h-8 md:w-12 md:h-12 fill-white translate-x-1" />
                  {/* Ripple pulse effects */}
                  <div className="absolute -inset-4 rounded-full border border-brand-red/30 animate-ping pointer-events-none" />
                </motion.button>

                <p className="mt-6 md:mt-8 font-display font-bold text-sm md:text-md tracking-[0.3em] text-white uppercase relative z-10">
                  PLAY TRAILER
                </p>
                <p className="mt-1 font-mono text-xs text-gray-400 relative z-10 uppercase tracking-widest">
                  Stereo 5.1 Surround Sound
                </p>
              </motion.div>
            ) : (
              // Active Embedded YouTube Player (High Quality)
              <motion.div
                key="video-player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <iframe
                  src={`${MOVIE_INFO.trailerEmbedUrl}?autoplay=1&mute=0&rel=0&showinfo=0`}
                  title="THE LAST FRIDAY Official Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 pt-6 border-t border-white/5 text-left">
          
          {/* Specification 1: Genre */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2 text-brand-red">
              <Film className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">GENRE</span>
            </div>
            <span className="text-sm md:text-md font-display font-bold text-white tracking-wide uppercase">
              {MOVIE_INFO.genre}
            </span>
          </motion.div>

          {/* Specification 2: Runtime */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2 text-brand-red">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">RUNTIME</span>
            </div>
            <span className="text-sm md:text-md font-display font-bold text-white tracking-wide uppercase">
              {MOVIE_INFO.runtime}
            </span>
          </motion.div>

          {/* Specification 3: Language */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2 text-brand-red">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">LANGUAGE</span>
            </div>
            <span className="text-sm md:text-md font-display font-bold text-white tracking-wide uppercase">
              {MOVIE_INFO.language.split(", ")[0]}
            </span>
          </motion.div>

          {/* Specification 4: Country */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2 text-brand-red">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">ORIGIN</span>
            </div>
            <span className="text-sm md:text-md font-display font-bold text-white tracking-wide uppercase">
              {MOVIE_INFO.country}
            </span>
          </motion.div>

          {/* Specification 5: Studio */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2 text-brand-red">
              <FilmIcon className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">STUDIO</span>
            </div>
            <span className="text-sm md:text-md font-display font-bold text-white tracking-wide uppercase">
              Back To Life
            </span>
          </motion.div>

          {/* Specification 6: Release */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2 text-brand-gold font-bold">
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">RELEASE</span>
            </div>
            <span className="text-sm md:text-md font-display font-bold text-brand-gold tracking-wide uppercase">
              Fall 2026
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
