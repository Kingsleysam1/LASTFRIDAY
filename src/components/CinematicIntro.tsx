import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { globalAudio } from "./AudioEngine";
import { Sparkles, Play } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [step, setStep] = useState<"presents" | "title" | "ready">("presents");
  const [audioPrompt, setAudioPrompt] = useState(true);

  useEffect(() => {
    // Stage 1: "BACK TO LIFE ENTERTAINMENT PRESENTS" fades in and out
    const t1 = setTimeout(() => {
      setStep("title");
    }, 4500);

    // Stage 2: "THE LAST FRIDAY" title cards
    const t2 = setTimeout(() => {
      setStep("ready");
    }, 8500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnter = (enableAudio: boolean) => {
    if (enableAudio) {
      globalAudio.setVolume(0.8);
      globalAudio.playClick();
    }
    onComplete();
  };

  return (
    <div 
      className="fixed inset-0 bg-brand-bg z-50 flex flex-col items-center justify-center select-none overflow-hidden"
      id="cinematic-intro-container"
    >
      {/* Background embers/fog layer for cinematic feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,18,27,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Floating ember particles (CSS animated) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-brand-red"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
              animation: `pulse ${Math.random() * 3 + 2}s infinite, translateY ${Math.random() * 10 + 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "presents" && (
          <motion.div
            key="presents-card"
            initial={{ opacity: 0, letterSpacing: "0.25em" }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              letterSpacing: ["0.25em", "0.4em", "0.4em", "0.45em"] 
            }}
            transition={{ duration: 4, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
            className="text-center px-6"
          >
            <p className="text-xs font-mono tracking-[0.4em] text-brand-red font-semibold uppercase mb-2">
              Production Studio
            </p>
            <h2 className="text-sm md:text-md tracking-[0.3em] text-gray-300 font-light uppercase">
              Back To Life Entertainment
            </h2>
            <p className="text-xs text-gray-500 font-mono tracking-[0.2em] mt-4 uppercase">
              Presents
            </p>
          </motion.div>
        )}

        {step === "title" && (
          <motion.div
            key="title-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="text-center px-4"
          >
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-brand-red font-mono tracking-[0.5em] text-xs uppercase mb-4"
            >
              A NIGERIAN ACTION THRILLER FILM
            </motion.p>
            
            <motion.h1 
              initial={{ filter: "blur(8px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ delay: 0.2, duration: 1.8 }}
              className="text-5xl md:text-8xl font-display font-extrabold tracking-[0.15em] text-white glow-text-red uppercase"
            >
              THE LAST
              <br />
              <span className="text-brand-red">FRIDAY</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-sm md:text-md italic text-gray-300 tracking-wider mt-6 font-light font-sans"
            >
              &ldquo;She Took The Pain. Now She&rsquo;s Bringing The War.&rdquo;
            </motion.p>
          </motion.div>
        )}

        {step === "ready" && (
          <motion.div
            key="enter-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center max-w-md px-6"
          >
            <div className="w-16 h-16 rounded-full border border-brand-red/30 flex items-center justify-center mb-8 relative animate-pulse-slow">
              <div className="absolute inset-0 rounded-full bg-brand-red/10 blur-md" />
              <Sparkles className="w-6 h-6 text-brand-red relative z-10" />
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-wider text-white uppercase mb-2">
              EXPERIENCE IS READY
            </h1>
            <p className="text-gray-400 text-sm mb-8 font-light leading-relaxed">
              For full cinematic immersion, we recommend enabling soundtrack audio. Start with audio?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                id="intro-enter-audio-btn"
                onClick={() => handleEnter(true)}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className="flex-1 py-4 px-6 bg-brand-red hover:bg-red-700 text-white font-display text-sm font-semibold tracking-wider uppercase rounded-none border border-transparent hover:border-white/20 shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 transition-all flex items-center justify-center gap-2 group cursor-none"
              >
                <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                ENTER WITH AUDIO
              </button>
              
              <button
                id="intro-enter-mute-btn"
                onClick={() => handleEnter(false)}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className="flex-1 py-4 px-6 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white font-display text-sm font-semibold tracking-wider uppercase rounded-none border border-white/20 hover:border-white transition-all cursor-none"
              >
                ENTER MUTED
              </button>
            </div>

            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-8">
              BACK TO LIFE ENTERTAINMENT © 2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
