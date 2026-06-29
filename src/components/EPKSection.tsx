import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MOVIE_INFO, EPK_INFO } from "../data";
import { globalAudio } from "./AudioEngine";
import { FileText, BookOpen, User, Film, Award, Phone, Mail, MapPin, Printer, Instagram } from "lucide-react";

type TabType = "cover" | "story" | "director" | "cast-crew" | "festivals";

export default function EPKSection() {
  const [activeTab, setActiveTab] = useState<TabType>("cover");

  const tabs = [
    { id: "cover", label: "Cover Page", icon: FileText },
    { id: "story", label: "Story & Specs", icon: BookOpen },
    { id: "director", label: "Director", icon: User },
    { id: "cast-crew", label: "Full Cast & Crew", icon: Film },
    { id: "festivals", label: "Festivals & Thanks", icon: Award },
  ];

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    globalAudio.playClick();
  };

  const printEPK = () => {
    window.print();
  };

  return (
    <section 
      id="epk-section"
      className="relative py-24 md:py-36 bg-black px-6 md:px-16 border-b border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(181,18,27,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <div className="flex items-center gap-4 mb-3">
              <span className="w-12 h-[1px] bg-brand-red" />
              <span className="text-xs font-mono tracking-[0.4em] text-brand-red font-bold uppercase">
                Media Center
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
              OFFICIAL PRESS KIT (EPK)
            </h2>
          </div>

          <button
            onClick={printEPK}
            onMouseEnter={() => globalAudio.playHoverSweep()}
            className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-brand-red hover:bg-brand-red/10 text-xs font-mono tracking-widest text-gray-300 hover:text-white uppercase transition-all duration-300 cursor-hover-enter"
          >
            <Printer className="w-4 h-4" />
            Print / PDF Press Kit
          </button>
        </div>

        {/* EPK Navigation Tabs */}
        <div className="flex flex-wrap border-b border-white/10 mb-12 gap-2 md:gap-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as TabType)}
                onMouseEnter={() => globalAudio.playHoverSweep()}
                className={`flex items-center gap-2 px-6 py-4 text-xs font-mono tracking-widest uppercase transition-all duration-300 border-b-2 -mb-[2px] cursor-hover-enter ${
                  isActive 
                    ? "border-brand-red text-white bg-white/5" 
                    : "border-transparent text-gray-500 hover:text-gray-300 hover:border-white/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-brand-red" : ""}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full text-left"
            >
              
              {/* COVER TAB */}
              {activeTab === "cover" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-4 flex justify-center">
                    <img 
                      src={MOVIE_INFO.posterImage} 
                      alt="The Last Friday Poster" 
                      className="w-full max-w-[280px] object-cover border border-white/10 shadow-2xl"
                    />
                  </div>
                  <div className="lg:col-span-8 space-y-6">
                    <div className="inline-block px-3 py-1 bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] font-mono tracking-widest uppercase">
                      Official Press Asset
                    </div>
                    <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight">
                      THE LAST <span className="text-brand-red">FRIDAY</span>
                    </h3>
                    <p className="text-xl md:text-2xl font-serif italic text-brand-muted">
                      &ldquo;In a system built on silence, truth is a death sentence.&rdquo;
                    </p>
                    <p className="text-sm font-mono tracking-widest text-gray-400">
                      Action Thriller | Nigeria | 2026 | 89 Minutes
                    </p>
                    
                    <div className="h-[1px] bg-white/10 w-full my-6" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300 font-light">
                      <div>
                        <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-2">Production Company</h4>
                        <p>{MOVIE_INFO.productionStudio}</p>
                        
                        <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase mt-4 mb-2">Filming Locations</h4>
                        <ul className="space-y-1">
                          <li>Los Angeles, California, USA</li>
                          <li>Federal Capital Territory, Abuja, Nigeria</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-2">Contact Representative</h4>
                        <p className="font-medium text-white">{EPK_INFO.contact.contactPerson}</p>
                        <p className="text-gray-400 text-xs mb-3">{EPK_INFO.contact.role}</p>
                        <ul className="space-y-1 text-xs font-mono">
                          <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brand-red" /> {EPK_INFO.contact.phone}</li>
                          <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-brand-red" /> {EPK_INFO.contact.email}</li>
                          <li className="flex items-center gap-2"><Instagram className="w-3.5 h-3.5 text-brand-red" /> <a href={EPK_INFO.contact.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-red transition-colors">@thelastfriday2026</a></li>
                          <li className="flex items-center gap-2 text-gray-400"><MapPin className="w-3.5 h-3.5" /> {EPK_INFO.contact.address}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STORY & SPECS TAB */}
              {activeTab === "story" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase mb-3">Logline</h4>
                      <p className="text-lg text-white font-light leading-relaxed font-serif italic border-l-2 border-brand-red pl-4">
                        &ldquo;{EPK_INFO.logline}&rdquo;
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase mb-3">Short Synopsis</h4>
                      <p className="text-gray-300 font-light leading-relaxed">
                        {MOVIE_INFO.shortSynopsis}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase mb-3">Full Synopsis</h4>
                      <p className="text-gray-300 font-light leading-relaxed whitespace-pre-line">
                        {MOVIE_INFO.synopsis}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-5 bg-brand-surface border border-white/5 p-8 rounded-none">
                    <h4 className="text-sm font-display font-bold tracking-widest text-white uppercase mb-6 pb-3 border-b border-white/10 flex items-center gap-2">
                      <Film className="w-4 h-4 text-brand-red" />
                      Technical Specifications
                    </h4>
                    <div className="divide-y divide-white/5 text-xs font-mono">
                      {Object.entries(EPK_INFO.technicalSpecs).map(([key, val]) => (
                        <div key={key} className="py-3 flex justify-between">
                          <span className="text-gray-500 uppercase">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-white text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* DIRECTOR TAB */}
              {activeTab === "director" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase">Director's Statement</h4>
                    <p className="text-gray-300 font-light leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {EPK_INFO.directorsStatement}
                    </p>
                  </div>
                  <div className="lg:col-span-5 bg-brand-surface border border-white/5 p-8 space-y-4">
                    <h4 className="text-sm font-display font-bold tracking-widest text-white uppercase pb-3 border-b border-white/10">
                      Gedion Spice Obiajunwa
                    </h4>
                    <p className="text-xs font-mono text-brand-red font-bold uppercase tracking-wider">
                      DIRECTOR / SCREENPLAY WRITER
                    </p>
                    <p className="text-xs text-gray-300 font-light leading-relaxed whitespace-pre-line">
                      {EPK_INFO.directorBio}
                    </p>
                  </div>
                </div>
              )}

              {/* CAST & CREW TAB */}
              {activeTab === "cast-crew" && (
                <div className="space-y-12">
                  {/* Cast lists */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase mb-4 pb-1 border-b border-white/10">Main Cast</h4>
                      <ul className="space-y-2 text-xs font-mono">
                        <li><span className="text-white font-bold">Promise Binang Eyare</span> as Joan</li>
                        <li><span className="text-white font-bold">Hoomsuk Alex Jibrin</span> as Detective Tony</li>
                        <li><span className="text-white font-bold">Temple Ikechukwu</span> as Ona</li>
                        <li><span className="text-white font-bold">Jide Bolarinwa</span> as Senator</li>
                        <li><span className="text-white font-bold">Jamila Y Ibrahim</span> as Tricia</li>
                        <li><span className="text-white font-bold">Iyoyin Fradia</span> as Anita</li>
                        <li><span className="text-white font-bold">Apel Orduen</span> as Oko</li>
                        <li><span className="text-white font-bold">Mickey Odey</span> as Paulo</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase mb-4 pb-1 border-b border-white/10">Supporting Cast</h4>
                      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-1.5 text-xs text-gray-400 font-mono">
                        {EPK_INFO.supportingCast.map((c, i) => (
                          <div key={i}>{c}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase mb-4 pb-1 border-b border-white/10">Extras & Special Roles</h4>
                      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 text-xs text-gray-400 font-mono">
                        <div>
                          <p className="text-[10px] text-white font-bold uppercase mb-1">Police Officers</p>
                          {EPK_INFO.specialRoles.policeOfficers.map((o, i) => <div key={i}>{o}</div>)}
                        </div>
                        <div>
                          <p className="text-[10px] text-white font-bold uppercase mb-1">Assassins</p>
                          {EPK_INFO.specialRoles.assassins.map((a, i) => <div key={i}>{a}</div>)}
                        </div>
                        <div>
                          <p className="text-[10px] text-white font-bold uppercase mb-1">Hospital Extras</p>
                          {EPK_INFO.specialRoles.hospitalExtras.map((h, i) => <div key={i}>{h}</div>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Crew list */}
                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase mb-6 pb-1 border-b border-white/10">Key Crew Members</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 text-xs font-mono">
                      {Object.entries(EPK_INFO.keyCrew).map(([role, name]) => (
                        <div key={role} className="border-l border-brand-red/35 pl-3 py-1">
                          <p className="text-[10px] text-gray-500 uppercase">{role}</p>
                          <p className="text-white font-bold mt-0.5">{name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FESTIVALS & THANKS TAB */}
              {activeTab === "festivals" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase mb-6 pb-1 border-b border-white/10">Festival Submissions</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-gray-300">
                      {EPK_INFO.festivals.map((fest, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                          <span>{fest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-brand-red uppercase mb-4 pb-1 border-b border-white/10">Special Thanks</h4>
                      <ul className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-300">
                        {EPK_INFO.specialThanks.map((thanks, idx) => (
                          <li key={idx}>&bull; {thanks}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-4">Official Distributor & EPK Contact</h4>
                      <p className="text-xs font-mono text-gray-400 leading-relaxed">
                        For press materials, screening link requests, interview arrangements, and high-resolution marketing assets, please contact Back to Life Entertainment LLC.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
