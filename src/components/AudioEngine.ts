import { gsap } from "gsap";

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private droneGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  public currentVolume: number = 0; // Track volume for GSAP interpolation

  constructor() {
    // Audio context is created lazily on user gesture
  }

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    
    // Master gain controls overall volume
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Create a low-frequency rumble filter (lowpass)
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = "lowpass";
    this.droneFilter.frequency.setValueAtTime(100, this.ctx.currentTime);
    this.droneFilter.Q.setValueAtTime(2.0, this.ctx.currentTime);
    this.droneFilter.connect(this.masterGain);

    // Drone Oscillators
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.20, this.ctx.currentTime);
    this.droneGain.connect(this.droneFilter);

    // Osc 1: Deep C1 bass (approx 32.7Hz) sawtooth for gritty tension
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = "sawtooth";
    this.droneOsc1.frequency.setValueAtTime(32.7, this.ctx.currentTime);
    
    // Osc 2: Deep detuned bass (approx 33.2Hz) sawtooth for intense phasing rumble
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = "sawtooth";
    this.droneOsc2.frequency.setValueAtTime(33.2, this.ctx.currentTime);

    this.droneOsc1.connect(this.droneGain);
    this.droneOsc2.connect(this.droneGain);

    this.droneOsc1.start();
    this.droneOsc2.start();

    // Rhythmic Tense Heartbeat Pulse
    const pulseOsc = this.ctx.createOscillator();
    pulseOsc.type = "triangle";
    pulseOsc.frequency.setValueAtTime(45, this.ctx.currentTime); // Sub-bass heartbeat thud

    const pulseGain = this.ctx.createGain();
    pulseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(1.5, this.ctx.currentTime); // 90 BPM tense pulse

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(pulseGain.gain);
    
    pulseOsc.connect(pulseGain);
    pulseGain.connect(this.masterGain);

    pulseOsc.start();
    lfo.start();
    
    // Ambient modulation loop (gently sweeps filter cutoff for organic feeling)
    this.sweepFilter();
  }

  private sweepFilter() {
    if (!this.ctx || !this.droneFilter || !this.isPlaying) return;
    
    const now = this.ctx.currentTime;
    // Sweep lowpass between 80Hz and 180Hz over 8 seconds
    const targetFreq = 80 + Math.random() * 100;
    this.droneFilter.frequency.exponentialRampToValueAtTime(targetFreq, now + 8);
    
    setTimeout(() => {
      this.sweepFilter();
    }, 8000);
  }

  public setVolume(volume: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    
    // Resume context if suspended (browser security)
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const targetGain = volume * 0.4; // Max volume limit for safety
    
    if (volume > 0 && !this.isPlaying) {
      this.isPlaying = true;
      this.sweepFilter();
    }

    // Smooth GSAP-based volume interpolation over 1.5 seconds
    gsap.killTweensOf(this);
    gsap.to(this, {
      currentVolume: targetGain,
      duration: 1.5,
      ease: "power1.inOut",
      onUpdate: () => {
        if (this.ctx && this.masterGain) {
          this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
        }
      },
      onComplete: () => {
        if (volume === 0) {
          this.isPlaying = false;
        }
      }
    });
  }

  // Play a premium sci-fi/thriller reverse swell sound on hover
  public playHoverSweep() {
    this.init();
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    if (this.ctx.state === "suspended") return;

    const now = this.ctx.currentTime;
    
    // Inception-style "Braam" / riser hybrid sound
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(55, now); // A1 bass note
    osc1.frequency.exponentialRampToValueAtTime(110, now + 0.6);

    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(55.4, now); // Detuned second sawtooth for growl
    osc2.frequency.exponentialRampToValueAtTime(110.8, now + 0.6);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.exponentialRampToValueAtTime(380, now + 0.6);
    filter.Q.setValueAtTime(4.0, now); // high resonance for gritty sweep

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }

  // Play a metallic click when entering a section
  public playClick() {
    this.init();
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    if (this.ctx.state === "suspended") return;

    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(50, now + 0.08);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }
}

export const globalAudio = new AudioEngine();
