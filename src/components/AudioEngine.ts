import { gsap } from "gsap";

export class AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  public currentVolume: number = 0;

  constructor() {
    // Lazily initialised on first user gesture
  }

  private init() {
    if (this.audio) return;

    // Create the HTML audio element with the real score
    this.audio = new Audio("/audio/background_score.mp3");
    this.audio.loop = true;
    this.audio.preload = "auto";

    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();

    // Master gain — starts silent, fades in with scroll
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Wire the audio element into the Web Audio graph
    this.sourceNode = this.ctx.createMediaElementSource(this.audio);
    this.sourceNode.connect(this.masterGain);

    // Start playback immediately (will be silent until volume is set)
    this.audio.play().catch(() => {
      // Browser may block autoplay — volume ramp on user interaction handles this
    });
  }

  public setVolume(volume: number) {
    this.init();
    if (!this.ctx || !this.masterGain || !this.audio) return;

    // Resume audio context if browser suspended it
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    // Ensure playback is started on first user gesture
    if (volume > 0 && !this.isPlaying) {
      this.isPlaying = true;
      this.audio.play().catch(() => {});
    }

    // Map 0–1 scroll value to 0–0.85 gain (loud but not clipping)
    const targetGain = volume * 0.85;

    gsap.killTweensOf(this);
    gsap.to(this, {
      currentVolume: targetGain,
      duration: 1.8,
      ease: "power1.inOut",
      onUpdate: () => {
        if (this.ctx && this.masterGain) {
          this.masterGain.gain.setValueAtTime(
            this.currentVolume,
            this.ctx.currentTime
          );
        }
      },
      onComplete: () => {
        if (volume === 0) {
          this.isPlaying = false;
        }
      },
    });
  }

  // Subtle pitch/volume accent on hover — keeps it cinematic
  public playHoverSweep() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    if (this.ctx.state === "suspended") return;

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
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  public playClick() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    if (this.ctx.state === "suspended") return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(50, now + 0.08);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.08);
  }
}

export const globalAudio = new AudioEngine();
