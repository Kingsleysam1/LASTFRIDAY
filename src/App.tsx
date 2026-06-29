import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { globalAudio } from "./components/AudioEngine";
import CinematicIntro from "./components/CinematicIntro";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import TrailerSection from "./components/TrailerSection";
import CastSection from "./components/CastSection";
import FestivalNominations from "./components/FestivalNominations";
import VideoMoments from "./components/VideoMoments";
import GallerySection from "./components/GallerySection";
import QuotesSection from "./components/QuotesSection";
import TimelineSection from "./components/TimelineSection";
import EPKSection from "./components/EPKSection";
import { MOVIE_INFO, NOMINATIONS } from "./data";
import { Film, Award, Heart, Globe, Play, ChevronUp, Radio, Instagram } from "lucide-react";

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scrolling to toggle the "Scroll to Top" indicator and calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync state with global audio synthesizer volume
  const handleToggleAudio = () => {
    const nextMute = !audioMuted;
    setAudioMuted(nextMute);
    globalAudio.setVolume(nextMute ? 0 : 0.8);
    globalAudio.playClick();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      globalAudio.playClick();
    }
  };

  const handleStartFromIntro = () => {
    setIntroCompleted(true);
    // If user accepted audio in intro, turn soundtrack active
    setAudioMuted(false);
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-white selection:bg-brand-red selection:text-white antialiased overflow-x-hidden">
      
      {/* Artistic Flair Vignette and Noise Layers */}
      <div className="vignette" />
      <div className="noise" />

      {/* Cinematic Scroll Progress Bar at the absolute top */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100] pointer-events-none">
        <div 
          className="h-full bg-brand-red shadow-[0_0_10px_#B5121B] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Cinematic Custom Mouse Cursor */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!introCompleted ? (
          // Opening Film Credits Cards Sequence
          <CinematicIntro onComplete={handleStartFromIntro} />
        ) : (
          // Active Full Microsite Experience
          <motion.div
            key="microsite-content"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col min-h-screen"
          >
            
            {/* Ambient Soundtrack Equalizer Badge (Floating on Header) */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-white/5 py-4 px-6 md:px-16 flex justify-between items-center select-none">
              <div 
                className="flex items-center gap-2 cursor-hover-explore"
                onClick={() => scrollToSection("hero-section")}
              >
                <Film className="w-5 h-5 text-brand-red" />
                <span className="font-display font-extrabold tracking-[0.2em] text-md text-white uppercase">
                  THE LAST <span className="text-brand-red">FRIDAY</span>
                </span>
              </div>

              {/* Quick links header */}
              <nav className="hidden md:flex items-center gap-6 text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase cursor-hover-enter">
                <button onClick={() => scrollToSection("story-section")} className="hover:text-brand-red transition-colors cursor-none">THE STORY</button>
                <button onClick={() => scrollToSection("trailer-section")} className="hover:text-brand-red transition-colors cursor-none">TRAILER</button>
                <button onClick={() => scrollToSection("cast-section")} className="hover:text-brand-red transition-colors cursor-none">THE CAST</button>
                <button onClick={() => scrollToSection("nominations-section")} className="hover:text-brand-gold transition-colors cursor-none">NOMINATIONS</button>
                <button onClick={() => scrollToSection("moments-section")} className="hover:text-brand-red transition-colors cursor-none">MOMENTS</button>
                <button onClick={() => scrollToSection("gallery-section")} className="hover:text-brand-red transition-colors cursor-none">GALLERY</button>
                <button onClick={() => scrollToSection("timeline-section")} className="hover:text-brand-red transition-colors cursor-none">TIMELINE</button>
                <button onClick={() => scrollToSection("epk-section")} className="hover:text-brand-red transition-colors cursor-none">PRESS KIT</button>
              </nav>

              {/* Status active score equalizers */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className={`w-1 h-3 bg-brand-red inline-block transition-transform duration-300 ${!audioMuted ? "animate-pulse scale-y-110" : ""}`} />
                  <span className={`w-1 h-4 bg-brand-red inline-block transition-transform duration-500 delay-75 ${!audioMuted ? "animate-pulse scale-y-125" : ""}`} />
                  <span className={`w-1 h-2 bg-brand-red inline-block transition-transform duration-300 delay-150 ${!audioMuted ? "animate-pulse scale-y-110" : ""}`} />
                </div>
                <span className="hidden sm:inline text-[9px] font-mono tracking-widest text-brand-red uppercase font-semibold">
                  {!audioMuted ? "ATMOSPHERE: 5.1 STEREO" : "SOUND MUTED"}
                </span>
              </div>
            </header>

            {/* Main Sections Body */}
            <main className="flex-grow">
              
              {/* 1. Hero Section */}
              <HeroSection
                onWatchTrailer={() => scrollToSection("trailer-section")}
                onScrollToNominations={() => scrollToSection("nominations-section")}
                onScrollToExplore={() => scrollToSection("story-section")}
                audioMuted={audioMuted}
                onToggleAudio={handleToggleAudio}
              />

              {/* 2. Story Section */}
              <StorySection />

              {/* 3. Trailer Widescreen Section */}
              <TrailerSection />

              {/* 4. Netflix-Style Cast Section */}
              <CastSection />

              {/* 5. Festival Credentials & Nominations Section */}
              <FestivalNominations />

              {/* 6. Video Moments Interactive Loop Cards */}
              <VideoMoments />

              {/* 7. Gallery Section with lightbox slider */}
              <GallerySection />

              {/* 8. Dramatic Quotes Typographic slideshow */}
              <QuotesSection />

              {/* 9. Chronological Film Journey Timeline */}
              <TimelineSection />

              {/* 10. Official Press Kit (EPK) Section */}
              <EPKSection />

            </main>

            {/* PREMIUM CINEMA FOOTER CREDITS ROLL */}
            <footer className="relative bg-brand-bg text-center py-20 px-6 md:px-16 border-t border-white/5 select-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
              
              <div className="max-w-4xl mx-auto relative z-10">
                
                {/* Official Laurel graphics in footer */}
                <div className="flex items-center justify-center gap-6 mb-12 opacity-50">
                  <Award className="w-8 h-8 text-brand-gold" />
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase">
                    TINFF@10 • 10TH ANNIVERSARY EDITION • {NOMINATIONS.length} OFFICIAL NOMINATIONS
                  </span>
                  <Award className="w-8 h-8 text-brand-gold" />
                </div>

                {/* Simulated Movie Poster Billing Block (Ultra premium details) */}
                <div className="text-gray-400 font-sans tracking-widest uppercase text-[10px] leading-relaxed max-w-3xl mx-auto mb-12 text-center opacity-70">
                  <p className="mb-2">
                    BACK TO LIFE ENTERTAINMENT <span className="text-gray-600">PRESENTS A</span> BACK TO LIFE <span className="text-gray-600">PRODUCTION IN ASSOCIATION WITH</span> TINFF NOLLYWOOD DIRECTORS
                  </p>
                  <p className="mb-2">
                    STARING <span className="text-white">JAMILAAH IBRAHIM</span> &bull; <span className="text-white">TEMPLE IKECHUKWU</span> &bull; <span className="text-white">JIDE BOLARINWA</span> &bull; HOOM&rsquo;SUK ALEX JIBRIN &bull; MICKEY ODEY &bull; PROMISE BINANG EYARE
                  </p>
                  <p className="mb-2">
                    CASTING BY <span className="text-white">APEL ORDUEN</span> &bull; SOUND DESIGN <span className="text-white">IYOYIN FRADIA</span> &bull; ORIGINAL SCORE <span className="text-white">THE HOLLYWOOD BEATS SYNDICATE</span>
                  </p>
                  <p>
                    DIRECTOR OF PHOTOGRAPHY <span className="text-white">LAGOS FILM COLLECTIVE</span> &bull; EXECUTIVE PRODUCERS <span className="text-white">BACK TO LIFE ENTERTAINMENT</span> &bull; SCREENPLAY BY <span className="text-white">NOLLYWOOD ALL-STARS</span>
                  </p>
                </div>

                <div className="h-[1px] w-12 bg-brand-red mx-auto mb-8" />

                {/* Title and Credits */}
                <h4 className="text-xl md:text-2xl font-display font-extrabold tracking-[0.2em] text-white uppercase mb-3">
                  THE LAST <span className="text-brand-red">FRIDAY</span>
                </h4>
                <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-8">
                  &ldquo;She Took The Pain. Now She&rsquo;s Bringing The War.&rdquo;
                </p>

                {/* Legal and system info */}
                <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                  &copy; {new Date().getFullYear()} BACK TO LIFE ENTERTAINMENT. ALL RIGHTS RESERVED.
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <a href="https://www.instagram.com/thelastfriday2026?igsh=MzRlODBiNWFlZA==" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-brand-red transition-colors flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase">
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                </div>
                <div className="flex items-center justify-center gap-1 text-[9px] text-gray-600 font-mono tracking-widest uppercase mt-4">
                  <span>BUILT FOR FESTIVALS &bull; POWERED BY AI STUDIO APPS</span>
                </div>

              </div>

              {/* Floating Scroll to Top trigger */}
              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    id="scroll-to-top-btn"
                    onClick={() => scrollToSection("hero-section")}
                    onMouseEnter={() => globalAudio.playHoverSweep()}
                    className="fixed bottom-8 left-6 md:left-16 z-40 w-10 h-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-gray-400 hover:text-brand-red hover:border-brand-red/80 flex items-center justify-center transition-colors cursor-hover-enter"
                    title="Scroll to top"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>

            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
