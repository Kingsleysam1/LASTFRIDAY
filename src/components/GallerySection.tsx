import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_ITEMS } from "../data";
import { globalAudio } from "./AudioEngine";
import { X, Image as ImageIcon, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export default function GallerySection() {
  const [filter, setFilter] = useState<"all" | "poster" | "still" | "bts">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filter === "all" || item.type === filter
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      const prevIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
      setLightboxIndex(prevIndex);
      globalAudio.playClick();
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      const nextIndex = (lightboxIndex + 1) % filteredItems.length;
      setLightboxIndex(nextIndex);
      globalAudio.playClick();
    }
  };

  return (
    <section 
      id="gallery-section"
      className="relative py-24 md:py-32 bg-brand-bg px-6 md:px-16 overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(181,18,27,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="text-left">
            <div className="flex items-center gap-4 mb-3">
              <span className="w-12 h-[1px] bg-brand-red" />
              <span className="text-xs font-mono tracking-[0.4em] text-brand-red font-bold uppercase">
                Visual Assets
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
              CINEMA GALLERY
            </h2>
          </div>

          {/* Filter Tab buttons */}
          <div className="flex flex-wrap gap-2 md:gap-3 bg-brand-surface/60 p-1.5 border border-white/5 rounded-none">
            {(["all", "still", "poster", "bts"] as const).map((tab) => (
              <button
                key={tab}
                id={`gallery-filter-btn-${tab}`}
                onClick={() => {
                  setFilter(tab);
                  globalAudio.playClick();
                }}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 cursor-hover-enter ${
                  filter === tab
                    ? "bg-brand-red text-white font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab === "bts" ? "BEHIND SCENES" : `${tab}S`}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-Style Animated Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-hover-explore"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Map overall filtered list to local index for slider tracking
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    setLightboxIndex(index);
                    globalAudio.playClick();
                  }}
                  onMouseEnter={() => globalAudio.playHoverSweep()}
                  className="group relative overflow-hidden bg-brand-surface aspect-[4/3] border border-white/5 group hover:border-brand-red/30 transition-all duration-500 cursor-none"
                >
                  {/* Photo Asset */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms]"
                  />

                  {/* Dark hover masking */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Visual Category tag */}
                  <div className="absolute top-4 left-4 bg-black/75 px-3 py-1 text-[8px] font-mono font-bold tracking-widest text-brand-red border border-brand-red/20 uppercase">
                    {item.type}
                  </div>

                  {/* Hover indicator icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-brand-bg/80 backdrop-blur-md flex items-center justify-center text-white">
                      <Eye className="w-4 h-4 text-brand-red" />
                    </div>
                  </div>

                  {/* Caption banner details */}
                  <div className="absolute bottom-5 left-5 right-5 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[9px] font-mono text-brand-gold font-bold tracking-widest uppercase mb-1">
                      THE LAST FRIDAY
                    </p>
                    <h3 className="text-sm md:text-md font-display font-bold text-white tracking-wider uppercase">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* DETAILED INTERACTIVE CAROUSEL LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 z-50 flex flex-col items-center justify-center p-4"
            onClick={() => {
              setLightboxIndex(null);
              globalAudio.playClick();
            }}
          >
            {/* Header info */}
            <div className="w-full max-w-5xl flex justify-between items-center mb-6 z-10">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-brand-red" />
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                  ASSET {lightboxIndex + 1} OF {filteredItems.length} &bull; {filteredItems[lightboxIndex].type}
                </span>
              </div>
              <button
                id="gallery-lightbox-close-btn"
                onClick={() => {
                  setLightboxIndex(null);
                  globalAudio.playClick();
                }}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className="w-10 h-10 rounded-full bg-brand-surface border border-white/10 hover:border-brand-red text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-hover-enter"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle slider block */}
            <div className="w-full max-w-5xl flex items-center justify-between gap-4 relative">
              
              {/* Previous slide arrow */}
              <button
                id="gallery-lightbox-prev-btn"
                onClick={handlePrev}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className="absolute -left-4 md:-left-16 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 hover:border-brand-red bg-brand-surface/80 backdrop-blur-md text-white flex items-center justify-center transition-colors z-10 cursor-hover-enter"
                title="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central Main image */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-auto aspect-[4/3] md:max-h-[70vh] bg-black border border-white/5 shadow-2xl relative flex items-center justify-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </motion.div>

              {/* Next slide arrow */}
              <button
                id="gallery-lightbox-next-btn"
                onClick={handleNext}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className="absolute -right-4 md:-right-16 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 hover:border-brand-red bg-brand-surface/80 backdrop-blur-md text-white flex items-center justify-center transition-colors z-10 cursor-hover-enter"
                title="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Bottom Caption detail */}
            <div className="mt-8 text-center max-w-md z-10" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-wider mb-2">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-brand-gold font-mono tracking-widest uppercase font-semibold">
                THE LAST FRIDAY &bull; EXCLUSIVE ACCESS
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
