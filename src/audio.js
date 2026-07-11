import { config } from './config.js'

export class AudioManager {
  constructor() {
    this.context = null
  }

  playLanding() {
    this.playTone({ startFrequency: 220, endFrequency: 150, duration: 0.12, type: 'triangle' })
  }

  playCollapse() {
    this.playTone({ startFrequency: 180, endFrequency: 45, duration: 0.7, type: 'sawtooth' })
  }

  playTone({ startFrequency, endFrequency, duration, type }) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return

    this.context ??= new AudioContext()
    if (this.context.state === 'suspended') this.context.resume()

    const oscillator = this.context.createOscillator()
    const gain = this.context.createGain()
    const volume = config.masterVolume * config.sfxVolume * 0.16

    oscillator.type = type
    oscillator.frequency.setValueAtTime(startFrequency, this.context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(
      endFrequency,
      this.context.currentTime + duration,
    )
    gain.gain.setValueAtTime(volume, this.context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration)
    oscillator.connect(gain).connect(this.context.destination)
    oscillator.start()
    oscillator.stop(this.context.currentTime + duration)
  }
}
