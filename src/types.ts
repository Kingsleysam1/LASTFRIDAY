export interface CastMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  nomination?: string;
}

export interface Nomination {
  id: string;
  category: string;
  nominee?: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: "still" | "poster" | "bts";
  imageUrl: string;
}

export interface VideoMoment {
  id: string;
  title: string;
  clipKey: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
}

export interface TimelineEvent {
  id: string;
  phase: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "current" | "upcoming";
}

export interface MovieQuote {
  id: string;
  text: string;
  speaker?: string;
  context?: string;
}
