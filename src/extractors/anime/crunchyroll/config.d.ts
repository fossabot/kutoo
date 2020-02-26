export interface Config {
  metadata: Metadata
  thumbnail: ConfigThumbnail
  streams: Stream[]
  ad_breaks: AdBreak[]
  subtitles: Subtitle[]
}

export interface AdBreak {
  type: string
  offset: number
}

export interface Metadata {
  id: string
  series_id: string
  type: string
  channel_id: null
  title: string
  description: string
  episode_number: string
  display_episode_number: string
  is_mature: boolean
  up_next: UpNext
  duration: number
}

export interface UpNext {
  title: string
  id: string
  channel_id: null
  channel_name: null
  description: string
  display_episode_number: string
  duration: number
  episode_number: string
  episode_title: string
  extra_title: null
  is_mature: boolean
  is_premium_only: boolean
  media_title: string
  release_date: Date
  season_title: string
  series_id: string
  series_title: string
  type: string
  thumbnails: ThumbnailElement[]
}

export interface ThumbnailElement {
  url: string
  width: number
  height: number
}

export interface Stream {
  format: Format
  audio_lang: AudioLang
  hardsub_lang: null | string
  url: string
  resolution: Resolution
}

export enum AudioLang {
  JaJp = 'jaJP',
}

export enum Format {
  AdaptiveDash = 'adaptive_dash',
  AdaptiveHls = 'adaptive_hls',
  DrmAdaptiveDash = 'drm_adaptive_dash',
  DrmMultitrackAdaptiveHlsV2 = 'drm_multitrack_adaptive_hls_v2',
  MultitrackAdaptiveHlsV2 = 'multitrack_adaptive_hls_v2',
  VoAdaptiveDash = 'vo_adaptive_dash',
  VoAdaptiveHls = 'vo_adaptive_hls',
  VoDrmAdaptiveDash = 'vo_drm_adaptive_dash',
  VoDrmAdaptiveHls = 'vo_drm_adaptive_hls',
}

export enum Resolution {
  Adaptive = 'adaptive',
}

export interface Subtitle {
  language: string
  url: string
  title: string
  format: string
}

export interface ConfigThumbnail {
  url: string
}
