/**
 * 音频播放器配置接口
 */
export interface AudioPlayerConfig {
  volume?: number
  loop?: boolean
  muted?: boolean
  playbackRate?: number
  preload?: 'auto' | 'metadata' | 'none'
  // 新增：是否允许跨域（可视化必需）
  crossOrigin?: 'anonymous' | 'use-credentials' | null
}

export type AudioSource = string | Blob | MediaStream

export type AudioEventType =
  | 'play' | 'pause' | 'ended' | 'timeupdate'
  | 'volumechange' | 'error' | 'loadedmetadata' | 'canplay'

type AudioEventHandler = (event: Event) => void

export default class AudioPlayer {
  public audio: HTMLAudioElement
  private isInternalElement: boolean = false
  private currentBlobUrl: string | null = null
  private eventHandlers: Map<AudioEventType, AudioEventHandler[]> = new Map()

  // --- 可视化相关属性 ---
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private sourceNode: MediaElementAudioSourceNode | null = null
  private isVisualizerInited: boolean = false

  constructor(config: AudioPlayerConfig = {}, target?: string | HTMLAudioElement) {
    this.audio = this.initAudioElement(target)
    this.applyConfig(config)
  }

  private initAudioElement(target?: string | HTMLAudioElement): HTMLAudioElement {
    let el: HTMLAudioElement | null = null
    if (typeof target === 'string') {
      el = document.getElementById(target) as HTMLAudioElement
    }
    else if (target instanceof HTMLAudioElement) {
      el = target
    }

    if (!el) {
      el = document.createElement('audio')
      el.style.display = 'none'
      document.body.appendChild(el)
      this.isInternalElement = true
    }
    return el
  }

  private applyConfig(config: AudioPlayerConfig) {
    // 关键：为了支持可视化，默认开启跨域支持，除非显式设为 null
    const crossOrigin = config.crossOrigin !== undefined ? config.crossOrigin : 'anonymous'
    if (crossOrigin)
      this.audio.crossOrigin = crossOrigin

    if (config.volume !== undefined)
      this.audio.volume = Math.max(0, Math.min(1, config.volume))
    if (config.loop !== undefined)
      this.audio.loop = config.loop
    if (config.muted !== undefined)
      this.audio.muted = config.muted
    if (config.playbackRate !== undefined)
      this.audio.playbackRate = config.playbackRate
    if (config.preload !== undefined)
      this.audio.preload = config.preload
  }

  // ==========================================
  // 可视化核心方法
  // ==========================================

  /**
   * 初始化可视化器
   * 必须在用户发生交互（如点击播放）后调用，否则浏览器可能阻止 AudioContext 启动
   * @param fftSize FFT 大小，决定了数据的精细度 (32 - 32768，必须是2的幂)，默认 2048
   */
  public initVisualizer(fftSize: number = 2048): void {
    if (this.isVisualizerInited)
      return

    // 1. 创建 AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) {
      console.error('Web Audio API is not supported in this browser.')
      return
    }
    this.audioContext = new AudioContextClass()

    // 2. 创建分析器
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = fftSize

    // 3. 连接音频源 -> 分析器 -> 扬声器
    // 注意：createMediaElementSource 同一个 element 只能被调用一次，否则报错
    try {
      this.sourceNode = this.audioContext.createMediaElementSource(this.audio)
      this.sourceNode.connect(this.analyser)
      this.analyser.connect(this.audioContext.destination)
      this.isVisualizerInited = true
    }
    catch (e) {
      console.error('Failed to create MediaElementSource. It might have been connected already.', e)
    }
  }

  /**
   * 获取当前频谱数据（用于柱状图）
   * 返回一个 Uint8Array，数组长度为 fftSize / 2
   */
  public getFrequencyData(): Uint8Array | null {
    if (!this.analyser)
      return null
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteFrequencyData(dataArray)
    return dataArray
  }

  /**
   * 获取当前波形数据（用于示波器/波浪线）
   */
  public getWaveformData(): Uint8Array | null {
    if (!this.analyser)
      return null
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteTimeDomainData(dataArray)
    return dataArray
  }

  /**
   * 确保 AudioContext 处于运行状态
   * 浏览器策略通常要求在 resume() 之前有用户手势
   */
  public async resumeAudioContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }

  // ==========================================
  // 基础播放控制 (包含对 AudioContext 的处理)
  // ==========================================

  public load(source: AudioSource): void {
    this.revokeBlobUrl()
    this.pause()

    if (source instanceof MediaStream) {
      this.audio.srcObject = source
      this.audio.src = ''
    }
    else if (source instanceof Blob) {
      this.currentBlobUrl = URL.createObjectURL(source)
      this.audio.src = this.currentBlobUrl
      this.audio.srcObject = null
    }
    else {
      this.audio.src = source
      this.audio.srcObject = null
    }
    this.audio.load()
  }

  public async play(): Promise<void> {
    // 尝试唤醒 AudioContext (可视化需要)
    if (this.isVisualizerInited) {
      await this.resumeAudioContext()
    }
    return this.audio.play()
  }

  public pause(): void {
    if (!this.audio.paused)
      this.audio.pause()
  }

  public toggle(): void {
    if (this.audio.paused) {
      this.play()
    }
    else {
      this.pause()
    }
  }

  public stop(): void {
    this.pause()
    this.audio.currentTime = 0
  }

  // ... (Getters/Setters 和 Event方法保持不变，省略以节省篇幅) ...
  // ... on, off, removeAllListeners, getters ...

  public on(event: AudioEventType, handler: AudioEventHandler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, [])
    }
    const handlers = this.eventHandlers.get(event)!
    handlers.push(handler)
    this.audio.addEventListener(event, handler)
  }

  public off(event: AudioEventType, handler: AudioEventHandler): void {
    const handlers = this.eventHandlers.get(event)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
        this.audio.removeEventListener(event, handler)
      }
    }
  }

  public removeAllListeners(): void {
    this.eventHandlers.forEach((handlers, event) => {
      handlers.forEach((handler) => {
        this.audio.removeEventListener(event, handler)
      })
    })
    this.eventHandlers.clear()
  }

  public download(fileName: string = 'audio-download'): void {
    const src = this.audio.src
    if (!src || this.audio.srcObject)
      return
    const link = document.createElement('a')
    link.href = src
    link.download = fileName
    link.target = '_blank'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // ==========================================
  // 销毁
  // ==========================================

  private revokeBlobUrl() {
    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl)
      this.currentBlobUrl = null
    }
  }

  public destroy(): void {
    this.stop()
    this.removeAllListeners()
    this.revokeBlobUrl()

    // 清理 Web Audio API 资源
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
      this.analyser = null
      this.sourceNode = null
      this.isVisualizerInited = false
    }

    this.audio.srcObject = null
    this.audio.src = ''

    if (this.isInternalElement && this.audio.parentNode) {
      this.audio.parentNode.removeChild(this.audio)
    }
  }
}
