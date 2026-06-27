import React from "react";
import { motion } from "motion/react";
import { NOMINATIONS } from "../data";
import { globalAudio } from "./AudioEngine";
import { Award, Trophy, Star, Sparkles } from "lucide-react";

export default function FestivalNominations() {
  return (
    <section 
      id="nominations-section"
      className="relative py-24 md:py-36 bg-brand-bg px-6 md:px-16 overflow-hidden border-b border-white/5"
    >
      {/* Background radial gold glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* LAUREL PRESTIGE SHOWCASE (Festival Section) */}
        <div className="flex flex-col items-center text-center mb-24 relative">
          
          {/* Subtle gold particles background */}
          <div className="absolute -top-12 inset-x-0 h-40 pointer-events-none opacity-40">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-brand-gold rounded-full"
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 100}%`,
                  filter: "blur(1px)",
                  animation: `pulse ${Math.random() * 2 + 2}s infinite, translateY ${Math.random() * 10 + 10}s infinite linear`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Majestic Animated Laurel SVGs */}
          {/* Majestic Laurel Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex items-center justify-center mb-8"
          >
            <div className="relative group">
              <img 
                src="/images/tinff_laurel.png" 
                alt="TINFF Official Selection" 
                className="w-56 h-56 md:w-72 md:h-72 object-contain invert brightness-150 contrast-125 transition-transform duration-700 group-hover:scale-105"
                style={{ mixBlendMode: 'screen' }}
              />
              {/* Subtle gold glow behind the logo */}
              <div className="absolute inset-0 bg-brand-gold/10 blur-3xl rounded-full -z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </motion.div>
        </div>

        {/* NOMINATIONS GRID */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-3"
          >
            <span className="w-8 h-[1px] bg-brand-gold" />
            <span className="text-xs font-mono tracking-[0.3em] text-brand-gold uppercase font-bold">PRESTIGE ACCLAIM</span>
            <span className="w-8 h-[1px] bg-brand-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase"
          >
            {NOMINATIONS.length} OFFICIAL NOMINATIONS
          </motion.h2>
        </div>

        {/* Responsive Staggered Nominations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left cursor-hover-view">
          {NOMINATIONS.map((nom, index) => (
            <motion.div
              key={nom.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              onMouseEnter={() => globalAudio.playHoverSweep()}
              className="group relative bg-gradient-to-br from-brand-surface to-black/90 border border-white/5 p-6 rounded-none gold-glow-hover transition-all duration-500 overflow-hidden flex flex-col justify-between aspect-video md:aspect-[4/3]"
            >
              {/* Background Glass Sparkle Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Card Header (Awards Icon & Star badge) */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-none border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold/10 transition-all duration-500">
                  <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </div>
                <Star className="w-4 h-4 text-brand-gold/30 group-hover:text-brand-gold animate-pulse" />
              </div>

              {/* Card Body */}
              <div className="flex-grow flex flex-col justify-end">
                {/* Nominee details if applicable */}
                {nom.nominee && (
                  <p className="text-[9px] font-mono text-brand-gold font-bold tracking-widest uppercase mb-1">
                    NOMINEE: {nom.nominee}
                  </p>
                )}
                
                <h3 className="text-lg md:text-xl font-display font-extrabold text-white tracking-wide uppercase leading-tight group-hover:text-brand-gold transition-colors duration-300">
                  {nom.category}
                </h3>
                
                <p className="text-xs text-gray-400 font-light leading-relaxed mt-3 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                  {nom.description}
                </p>
              </div>

              {/* Gold Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-gold group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
