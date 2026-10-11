export interface Track {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
  views: string;
  genre: string;
}

export interface DownloadItem {
  id: string;
  track: Track;
  format: string;
  quality: string;
  progress: number;
  status: 'downloading' | 'completed' | 'paused';
  speed: string;
  size: string;
}
