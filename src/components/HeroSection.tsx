import React from "react";
import { motion } from "motion/react";
import { MOVIE_INFO } from "../data";
import { Play, Award, ChevronDown, Music, Volume2, VolumeX } from "lucide-react";
import { globalAudio } from "./AudioEngine";

interface HeroSectionProps {
  onWatchTrailer: () => void;
  onScrollToNominations: () => void;
  onScrollToExplore: () => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
}

export default function HeroSection({
  onWatchTrailer,
  onScrollToNominations,
  onScrollToExplore,
  audioMuted,
  onToggleAudio,
}: HeroSectionProps) {
  return (
    <section 
      id="hero-section"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-bg px-6 md:px-16"
    >
      {/* Background Cinematic Image with Ken Burns zoom effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1.02, 1.08, 1.02] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-cover bg-center bg-visual-artistic select-none pointer-events-none"
          style={{ backgroundImage: `url(${MOVIE_INFO.bannerImage})` }}
        />
        {/* Deep vignettes to keep focus centered and aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-brand-bg/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg to-transparent opacity-80 md:opacity-50" />
      </div>

      {/* Floating Sparkles and Ember particles (Aesthetic smoke effect) */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-40">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-brand-red rounded-full"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1.5px)",
              animation: `pulse ${Math.random() * 2 + 1}s infinite, translateY ${Math.random() * 15 + 15}s infinite linear`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
        
        {/* Left Side: Dramatic Movie Poster */}
        <motion.div 
          initial={{ opacity: 0, x: -60, rotate: -2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden lg:block lg:col-span-5 xl:col-span-4"
        >
          <div 
            className="group relative rounded-none overflow-hidden bg-brand-surface border border-white/10 shadow-2xl shadow-brand-red/10 cursor-hover-explore"
            onMouseEnter={() => globalAudio.playHoverSweep()}
          >
            {/* Poster image with subtle hover zoom */}
            <motion.img
              src={MOVIE_INFO.posterImage}
              alt="The Last Friday Official Poster"
              referrerPolicy="no-referrer"
              className="w-full aspect-[3/4] object-cover object-center group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Edge red glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 border border-brand-red/0 group-hover:border-brand-red/30 transition-colors duration-500 pointer-events-none" />
            
            {/* Selection badge embedded in poster */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-brand-gold/40 flex items-center gap-1.5">
              <span className="text-[9px] font-mono text-brand-gold tracking-widest font-semibold">TINFF SELECTION</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Movie Title & Premium CTA */}
        <div className="col-span-1 lg:col-span-7 xl:col-span-8 flex flex-col justify-center text-left">
          
          {/* Production Studio Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-[1px] w-8 bg-brand-red" />
            <span className="text-xs font-mono tracking-[0.3em] text-brand-red font-bold uppercase">
              {MOVIE_INFO.productionStudio}
            </span>
            <span className="h-[1px] w-8 bg-brand-red" />
          </motion.div>

          {/* Huge Title Text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-display font-black tracking-[-0.04em] text-white leading-[0.9] uppercase mb-4"
          >
            THE LAST
            <br />
            <span className="text-brand-red glow-text-red">FRIDAY</span>
          </motion.h1>

          {/* Tagline / Slogan in Georgia Serif italic */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl sm:text-3xl font-serif italic text-brand-muted max-w-xl tracking-wide mb-6"
          >
            &ldquo;{MOVIE_INFO.tagline}&rdquo;
          </motion.p>

          {/* Short dynamic description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-sm sm:text-md text-gray-300 font-light leading-relaxed max-w-xl mb-8"
          >
            {MOVIE_INFO.synopsis.slice(0, 180)}...
          </motion.p>

          {/* Core CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-wrap gap-4 items-center"
          >
            {/* Watch Trailer */}
            <button
              id="hero-watch-trailer-btn"
              onClick={onWatchTrailer}
              onMouseEnter={() => globalAudio.playHoverSweep()}
              className="py-[18px] px-10 bg-brand-red hover:bg-red-700 text-white font-display text-[12px] font-bold tracking-[2px] uppercase border border-transparent hover:border-white/20 transition-all flex items-center gap-2.5 shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 cursor-hover-watch rounded-none"
            >
              <Play className="w-4 h-4 fill-white" />
              WATCH TRAILER
            </button>

            {/* View Nominations */}
            <button
              id="hero-view-nominations-btn"
              onClick={onScrollToNominations}
              onMouseEnter={() => globalAudio.playHoverSweep()}
              className="py-[18px] px-10 bg-transparent hover:bg-white/5 text-white font-display text-[12px] font-bold tracking-[2px] uppercase border border-white/20 hover:border-white transition-all flex items-center gap-2 cursor-hover-view rounded-none"
            >
              <Award className="w-4 h-4 text-brand-gold" />
              VIEW NOMINATIONS
            </button>
          </motion.div>

          {/* Meta specs row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-12 text-xs font-mono tracking-widest text-gray-400"
          >
            <div>GENRE: <span className="text-white">{MOVIE_INFO.genre}</span></div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <div>RATING: <span className="text-white">{MOVIE_INFO.rating}</span></div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <div>RUNTIME: <span className="text-white">{MOVIE_INFO.runtime}</span></div>
          </motion.div>
        </div>
      </div>

      {/* Floating Soundtrack Mute/Unmute Indicator */}
      <div className="absolute bottom-8 right-6 md:right-16 z-20 flex items-center gap-3">
        <motion.button
          id="hero-soundtrack-btn"
          onClick={onToggleAudio}
          onMouseEnter={() => globalAudio.playHoverSweep()}
          className="w-10 h-10 rounded-full border border-white/20 hover:border-brand-red/80 bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-hover-enter"
          title={audioMuted ? "Unmute Ambient Score" : "Mute Ambient Score"}
        >
          {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-red animate-pulse" />}
        </motion.button>
        <span className="hidden sm:inline text-[9px] font-mono tracking-[0.2em] text-gray-400 uppercase">
          {audioMuted ? "Score Muted" : "Score Active"}
        </span>
      </div>

      {/* Scroll Down Explorable Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.button
          id="hero-scroll-explore-btn"
          onClick={onScrollToExplore}
          onMouseEnter={() => globalAudio.playHoverSweep()}
          className="flex flex-col items-center text-gray-500 hover:text-brand-red transition-colors cursor-hover-explore"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase mb-2">SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}
