import React from "react";
import { motion } from "motion/react";
import { MOVIE_INFO } from "../data";
import { globalAudio } from "./AudioEngine";
import { Quote } from "lucide-react";

export default function StorySection() {
  return (
    <section 
      id="story-section"
      className="relative py-24 md:py-36 bg-brand-bg px-6 md:px-16 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(181,18,27,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="w-12 h-[1px] bg-brand-red" />
            <span className="text-xs font-mono tracking-[0.4em] text-brand-red font-bold uppercase">
              The Premise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-3xl md:text-6xl font-display font-extrabold tracking-tight text-white uppercase"
          >
            THE STORY
          </motion.h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Oversized Dramatic Quote & Detailed Text */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Massive Dramatic Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative pl-6 md:pl-10 border-l-2 border-brand-red mb-8 md:mb-12"
            >
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-brand-red/10 rotate-180 pointer-events-none" />
              <h3 className="text-2xl md:text-4xl font-display font-bold tracking-wide text-white leading-tight uppercase">
                A single night of brutality. A conspiracy that reaches the very top. <span className="text-brand-red">Some secrets refuse to stay buried.</span>
              </h3>
            </motion.div>

            {/* Detailed Synopsis Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="space-y-6 text-gray-300 font-light leading-relaxed text-md max-w-2xl"
            >
              <p>
                <strong className="text-white font-medium">Inspired by true events.</strong> A desperate young woman&rsquo;s 
                search for help leads her into a night of unspeakable brutality. But when powerful political figures 
                mobilize to silence every witness and bury every trace of the crime, the system itself becomes 
                the weapon used against her.
              </p>
              <p>
                Set against the volatile streets of Nigeria, 
                <strong className="text-white font-medium"> THE LAST FRIDAY</strong> follows Detective Tony — 
                an uncompromising investigator who refuses to look away. As the conspiracy deepens and threats 
                escalate, he and the survivor forge a dangerous alliance, racing to expose the truth before 
                those in power can permanently seal it in silence.
              </p>
              <p>
                A film about justice, survival, resilience, and the devastating cost of exposing the truth 
                in a world designed to protect the guilty.
              </p>
              <p className="text-brand-gold font-mono text-xs tracking-widest uppercase font-semibold">
                ★ INSPIRED BY TRUE EVENTS · JUSTICE · SURVIVAL · RESILIENCE · TRUTH ★
              </p>
            </motion.div>
          </div>

          {/* Right: Dramatic Portrait Imagery with Hover Interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div 
              className="group relative border border-white/5 bg-brand-surface shadow-2xl overflow-hidden cursor-hover-explore"
              onMouseEnter={() => globalAudio.playHoverSweep()}
            >
              {/* Closeup Portrait */}
              <motion.img
                src="/src/assets/images/zara_portrait.jpg"
                alt="Jamilaah Ibrahim as Zara"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-square object-cover object-center grayscale contrast-[120%] brightness-[90%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms]"
              />
              
              {/* Outer Vignette Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 border border-brand-red/0 group-hover:border-brand-red/40 transition-colors duration-700 pointer-events-none" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-brand-red font-bold uppercase mb-1">CHARACTER PORTRAIT</p>
                  <p className="text-lg font-display font-bold text-white tracking-wide uppercase">ZARA</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase mb-1">PORTRAYED BY</p>
                  <p className="text-sm font-sans font-medium text-gray-300">Jamilaah Ibrahim</p>
                </div>
              </div>
            </div>

            {/* Aesthetic Accent Frame */}
            <div className="absolute -inset-4 border border-brand-red/10 -z-1 pointer-events-none group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
