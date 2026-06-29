import { gsap } from "gsap";

export class AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  public currentVolume: number = 0;

  constructor() {
    // Lazily initialized on first user gesture
  }

  private init() {
    if (this.audio) return;

    // Create the HTML audio element directly
    this.audio = new Audio("/audio/background_score.mp3");
    this.audio.loop = true;
    this.audio.preload = "auto";
    this.audio.volume = 0;

    // Initialize AudioContext for sound effects only
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      try {
        this.ctx = new AudioContextClass();
      } catch (e) {
        console.warn("Web Audio API not supported", e);
      }
    }
  }

  public setVolume(volume: number) {
    this.init();
    if (!this.audio) return;

    // Resume AudioContext if suspended
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    // Play the audio if volume is requested and it isn't playing yet
    if (volume > 0) {
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.audio.play().catch((err) => {
          console.error("Playback failed or blocked:", err);
          this.isPlaying = false;
        });
      }
    }

    const targetVolume = volume * 0.85;

    // Smoothly animate the HTML5 audio volume directly using GSAP
    gsap.killTweensOf(this.audio);
    gsap.to(this.audio, {
      volume: targetVolume,
      duration: 1.8,
      ease: "power1.inOut",
      onComplete: () => {
        if (volume === 0 && this.audio) {
          this.audio.pause();
          this.isPlaying = false;
        }
      },
    });
  }

  // Pitch/volume accent for hover
  public playHoverSweep() {
    if (!this.ctx || !this.isPlaying) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.3);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn("SFX sweep failed:", e);
    }
  }

  // Click sound
  public playClick() {
    if (!this.ctx || !this.isPlaying) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(50, now + 0.08);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn("SFX click failed:", e);
    }
  }
}

export const globalAudio = new AudioEngine();
