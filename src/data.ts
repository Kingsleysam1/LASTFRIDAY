import { CastMember, Nomination, GalleryItem, VideoMoment, TimelineEvent, MovieQuote } from "./types";

export const MOVIE_INFO = {
  title: "THE LAST FRIDAY",
  tagline: "She Took The Pain. Now She's Bringing The War.",
  synopsis: "Inspired by true events, The Last Friday follows a desperate young woman whose search for help leads her into a night of unspeakable brutality. As powerful political figures move swiftly to bury the crime beneath corruption and influence, one determined detective risks everything to uncover the truth. When silence becomes the weapon of the powerful, survival becomes an act of war — and justice becomes a matter of life and death.",
  shortSynopsis: "A single night changes everything. When a young woman becomes the victim of a brutal crime connected to powerful political figures, the truth is buried beneath fear, corruption, and silence. As the conspiracy grows deeper, a relentless detective uncovers a trail of lies that threatens the very people determined to keep the past hidden.",
  genre: "Action Thriller",
  runtime: "124 Mins",
  language: "English, Yoruba, Pidgin",
  country: "Nigeria",
  director: "Back To Life Directors",
  productionStudio: "Back To Life Entertainment",
  releaseInfo: "Fall 2026 (Theatrical & Streaming)",
  rating: "R (Intense Violence, Language)",
  bannerImage: "/src/assets/images/hero_banner_background_1782315440066.jpg",
  posterImage: "/src/assets/images/movie_poster_1782315458025.jpg",
  trailerEmbedUrl: "https://www.youtube.com/embed/OW6pIvqxELE", // Official YouTube URL from user request
  themes: ["Justice", "Survival", "Corruption", "Resilience", "Truth"],
};

export const CAST_MEMBERS: CastMember[] = [
  {
    id: "cast-1",
    name: "Jamilaah Ibrahim",
    role: "Zara (The Survivor)",
    imageUrl: "/src/assets/images/jamilaah_closeup_1782315502201.jpg",
    nomination: "Best Actress (Africa)",
  },
  {
    id: "cast-2",
    name: "Temple Ikechukwu",
    role: "Marcus (The Corrupt Official)",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    nomination: "Best Supporting Actor (Africa)",
  },
  {
    id: "cast-3",
    name: "Jide Bolarinwa",
    role: "Chief Adeyemi (The Power Broker)",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    nomination: "Best Supporting Actor (Africa)",
  },
  {
    id: "cast-4",
    name: "Hoom'Suk Alex Jibrin",
    role: "Detective Danjuma (The Truth Seeker)",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    nomination: "Best Actor (Africa)",
  },
  {
    id: "cast-5",
    name: "Mickey Odey",
    role: "Victor (The Fixer)",
    imageUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=600&auto=format&fit=crop",
    nomination: "Best Actor (Africa)",
  },
  {
    id: "cast-6",
    name: "Promise Binang Eyare",
    role: "Ngozi (The Witness)",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    nomination: "Best Actress (Nollywood)",
  },
  {
    id: "cast-7",
    name: "Apel Orduen",
    role: "Sani (The Informant)",
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "cast-8",
    name: "Iyoyin Fradia",
    role: "Dr. Alabi (The Examiner)",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
];

export const NOMINATIONS: Nomination[] = [
  {
    id: "nom-1",
    category: "Best African Film",
    description: "Honoring outstanding cinematic quality, narrative power, and production value on the African continent.",
  },
  {
    id: "nom-2",
    category: "Best African Drama",
    description: "Recognizing high emotional stakes, intense acting performances, and deep storytelling craft.",
  },
  {
    id: "nom-3",
    category: "Best Photography",
    description: "Acknowledging the stunning widescreen cinematography, rich lighting, and breathtaking visual identity of Nigeria.",
  },
  {
    id: "nom-4",
    category: "Best Actress (Africa)",
    nominee: "Jamilaah Ibrahim",
    description: "Applauding a powerhouse performance — the emotional core of a film built on survival, courage, and the fight for justice.",
  },
  {
    id: "nom-5",
    category: "Best Actress (Nollywood)",
    nominee: "Promise Binang Eyare",
    description: "A compelling Nollywood performance that grounds the film's themes of witness, truth-telling, and resilience.",
  },
  {
    id: "nom-6",
    category: "Best Supporting Actor (Africa)",
    nominee: "Temple Ikechukwu",
    description: "Capturing the complex layers of complicity and menace in a standout supporting performance.",
  },
  {
    id: "nom-7",
    category: "Best Supporting Actor (Africa)",
    nominee: "Jide Bolarinwa",
    description: "Establishing a chilling, larger-than-life political antagonist that defines the film's central conflict.",
  },
  {
    id: "nom-8",
    category: "Best Actor (Africa)",
    nominee: "Hoom'Suk Alex Jibrin",
    description: "A riveting portrayal of Detective Danjuma — the unrelenting investigator who refuses to let the truth stay buried.",
  },
  {
    id: "nom-9",
    category: "Best Actor (Africa)",
    nominee: "Mickey Odey",
    description: "A nuanced, powerful performance that brings depth and moral weight to one of the film's most pivotal roles.",
  },
  {
    id: "nom-10",
    category: "Best Producer",
    nominee: "Anthony A. Uzuakpunwa",
    description: "Recognizing the vision, tenacity, and craft behind producing one of TINFF 2026's most compelling Nigerian features.",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Official Movie Poster",
    type: "poster",
    imageUrl: "/src/assets/images/movie_poster_1782315458025.jpg",
  },
  {
    id: "gal-2",
    title: "The Climax Confrontation",
    type: "still",
    imageUrl: "/src/assets/images/hero_banner_background_1782315440066.jpg",
  },
  {
    id: "gal-3",
    title: "Lagos Street Patrol at Midnight",
    type: "still",
    imageUrl: "/src/assets/images/action_scene_still_1782315520243.jpg",
  },
  {
    id: "gal-4",
    title: "Zara in the Shadows",
    type: "still",
    imageUrl: "/src/assets/images/jamilaah_closeup_1782315502201.jpg",
  },
  {
    id: "gal-5",
    title: "Behind the Scenes - Directing Zara",
    type: "bts",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "gal-6",
    title: "Choreographing the Lagos Alley Fight",
    type: "bts",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
  },
];

export const VIDEO_MOMENTS: VideoMoment[] = [
  {
    id: "vid-1",
    title: "The Night It Began",
    clipKey: "beginning",
    description: "One desperate young woman's search for help spirals into an unforgettable night of brutal violence that will change everything.",
    duration: "0:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "vid-2",
    title: "The Cover-Up",
    clipKey: "betrayal",
    description: "Powerful political figures move swiftly. Phones ring. Favors are called in. The machinery of corruption silences every witness.",
    duration: "1:12",
    thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "vid-3",
    title: "The Detective",
    clipKey: "fire",
    description: "Detective Danjuma follows a trail of lies no one else dares to touch — and discovers a conspiracy that goes all the way to the top.",
    duration: "1:05",
    thumbnailUrl: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "vid-4",
    title: "The Truth Surfaces",
    clipKey: "revenge",
    description: "As the evidence mounts and threats escalate, a survivor and a detective forge an unbreakable alliance against impossible odds.",
    duration: "1:30",
    thumbnailUrl: "/src/assets/images/hero_banner_background_1782315440066.jpg",
  },
  {
    id: "vid-5",
    title: "The Last Friday",
    clipKey: "last-friday",
    description: "Revenge has a deadline. Every secret has a cost. Every betrayal has consequences. It all ends on The Last Friday.",
    duration: "2:00",
    thumbnailUrl: "/src/assets/images/action_scene_still_1782315520243.jpg",
  },
];

export const MOVIE_QUOTES: MovieQuote[] = [
  {
    id: "quote-1",
    text: "They said nobody would believe me. They were right. Until he did.",
    speaker: "Zara",
    context: "On finding Detective Danjuma",
  },
  {
    id: "quote-2",
    text: "The most dangerous thing a powerful man can do is underestimate a desperate woman.",
    speaker: "Detective Danjuma",
    context: "To his superior during the investigation",
  },
  {
    id: "quote-3",
    text: "Silence is not peace. Silence is just another word for control.",
    speaker: "Zara",
    context: "Testifying against the cover-up",
  },
  {
    id: "quote-4",
    text: "You buried the truth. But the truth has a way of clawing its way back to the surface. Every. Single. Time.",
    speaker: "Detective Danjuma",
    context: "Confronting Chief Adeyemi",
  },
  {
    id: "quote-5",
    text: "Revenge has a deadline. And mine... is this Friday.",
    speaker: "Zara",
    context: "The final act",
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "time-1",
    phase: "Phase 01",
    title: "Movie Development & Scripting",
    description: "Script created by award-winning screenwriters capturing the heartbeat of Lagos, blending grit and intense character-driven drama.",
    date: "Late 2024",
    status: "completed",
  },
  {
    id: "time-2",
    phase: "Phase 02",
    title: "Principal Photography in Lagos",
    description: "High-octane filming on location in Lagos, Nigeria. Groundbreaking choreography, practical stunts, and hyper-stylized lighting.",
    date: "Mid 2025",
    status: "completed",
  },
  {
    id: "time-3",
    phase: "Phase 03",
    title: "Official Selection – TINFF",
    description: "Honored with the prestigious laurel of Official Selection at the Toronto International Nollywood Film Festival.",
    date: "May 2026",
    status: "completed",
  },
  {
    id: "time-4",
    phase: "Phase 04",
    title: "10 Official TINFF@10 Nominations",
    description: "The Last Friday earns 10 official nominations at TINFF's historic 10th Anniversary Edition — including Best African Film, Best African Drama, Best Photography, Best Actress (Africa), Best Actress (Nollywood), Best Supporting Actor (Africa) x2, Best Actor (Africa) x2, and Best Producer.",
    date: "June 2026",
    status: "current",
  },
  {
    id: "time-5",
    phase: "Phase 05",
    title: "TINFF World Premiere",
    description: "The official first screening of The Last Friday to international festival crowds, judges, and press in Toronto, Canada.",
    date: "September 2026",
    status: "upcoming",
  },
  {
    id: "time-6",
    phase: "Phase 06",
    title: "Global Theatrical & Streaming Release",
    description: "Bringing the war to the global stage. Released in theatres nationwide and premium international streaming networks.",
    date: "November 2026",
    status: "upcoming",
  },
];
