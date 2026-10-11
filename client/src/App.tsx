import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { HomeTab } from './components/HomeTab';
import { SearchTab } from './components/SearchTab';
import { DownloadsTab } from './components/DownloadsTab';
import { SettingsTab } from './components/SettingsTab';
import { PlayerModal } from './components/PlayerModal';
import { DownloadModal } from './components/DownloadModal';
import { Track, DownloadItem } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'downloads' | 'settings'>('home');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [selectedTrackForDownload, setSelectedTrackForDownload] = useState<Track | null>(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const fallbackTracks: Track[] = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Neon Cyberpunk Chill - Synthwave Radio 2026',
      channel: 'AuraWave Official',
      duration: '3:45',
      thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
      views: '2.4M views',
      genre: 'Synthwave'
    },
    {
      id: 'L_LUpnjgPso',
      title: 'Midnight Rain & Lo-Fi Beats To Code / Relax To',
      channel: 'LoFi Dreamer',
      duration: '2:50',
      thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80',
      views: '5.1M views',
      genre: 'Lo-Fi'
    },
    {
      id: '9bZkp7q19f0',
      title: 'Future Bass Anthem (Remix 2026)',
      channel: 'PulseGlow',
      duration: '3:15',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      views: '890K views',
      genre: 'Future Bass'
    },
    {
      id: 'kJQP7kiw5Fk',
      title: 'Epic Orchestral Cinematic Soundscape',
      channel: 'SoundSphere',
      duration: '4:20',
      thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
      views: '1.2M views',
      genre: 'Cinematic'
    },
    {
      id: '5qap5aO4i9A',
      title: 'Deep House & Tropical Sunset Mix',
      channel: 'SummerVibes',
      duration: '3:30',
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      views: '3.8M views',
      genre: 'Deep House'
    },
    {
      id: 'fJ9rUzIMcZQ',
      title: 'Cybernetic Trance & Progressive Beats',
      channel: 'NeonPulse',
      duration: '5:02',
      thumbnail: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=600&auto=format&fit=crop&q=80',
      views: '950K views',
      genre: 'Trance'
    }
  ];

  useEffect(() => {
    fetch('/api/trending')
      .then(res => res.json())
      .then(data => {
        if (data.tracks) {
          setTracks(data.tracks);
          setCurrentTrack(data.tracks[0]);
        }
      })
      .catch(() => {
        setTracks(fallbackTracks);
        setCurrentTrack(fallbackTracks[0]);
      });
  }, []);

  const handleSearch = (q: string) => {
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(data => {
        if (data.tracks) setTracks(data.tracks);
      })
      .catch(() => {
        const query = q.toLowerCase().trim();
        if (!query) {
          setTracks(fallbackTracks);
          return;
        }
        const filtered = fallbackTracks.filter(
          t => t.title.toLowerCase().includes(query) ||
               t.channel.toLowerCase().includes(query) ||
               t.genre.toLowerCase().includes(query)
        );
        if (filtered.length > 0) {
          setTracks(filtered);
        } else {
          setTracks([
            {
              id: 'local_' + Math.random().toString(36).substring(2, 9),
              title: `${q.charAt(0).toUpperCase() + q.slice(1)} - Official Audio / Remix`,
              channel: 'YouTube Music VEVO',
              duration: '3:34',
              thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
              views: '4.2M views',
              genre: 'Search Result'
            }
          ]);
        }
      });
  };

  const handleStartDownload = (track: Track, format: string, quality: string) => {
    // Trigger real server-side download stream
    const videoUrl = track.id.length === 11 
      ? `https://www.youtube.com/watch?v=${track.id}` 
      : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    
    const downloadUrl = `/api/download-file?url=${encodeURIComponent(videoUrl)}&format=${format}`;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${track.title}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    const newDownload: DownloadItem = {
      id: 'dl_' + Math.random().toString(36).substring(2, 9),
      track,
      format,
      quality,
      progress: 0,
      status: 'downloading',
      speed: '4.8 MB/s',
      size: format === 'mp4' ? '45.2 MB' : '9.8 MB'
    };

    setDownloads(prev => [newDownload, ...prev]);
    setActiveTab('downloads');

    // Simulate progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += 25;
      if (prog >= 100) {
        clearInterval(interval);
        setDownloads(prev =>
          prev.map(d => (d.id === newDownload.id ? { ...d, progress: 100, status: 'completed' } : d))
        );
      } else {
        setDownloads(prev =>
          prev.map(d => (d.id === newDownload.id ? { ...d, progress: prog } : d))
        );
      }
    }, 400);
  };

  const activeDownloadsCount = downloads.filter(d => d.status === 'downloading').length;

  return (
    <MobileFrame
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      currentTrack={currentTrack}
      isPlaying={isPlaying}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onOpenPlayer={() => setShowPlayerModal(true)}
      downloadsCount={activeDownloadsCount}
    >
      {activeTab === 'home' && (
        <HomeTab
          tracks={tracks}
          onPlay={t => { setCurrentTrack(t); setIsPlaying(true); }}
          onOpenDownload={t => setSelectedTrackForDownload(t)}
          onSelectGenre={genre => handleSearch(genre)}
        />
      )}

      {activeTab === 'search' && (
        <SearchTab
          tracks={tracks}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onPlay={t => { setCurrentTrack(t); setIsPlaying(true); }}
          onOpenDownload={t => setSelectedTrackForDownload(t)}
        />
      )}

      {activeTab === 'downloads' && (
        <DownloadsTab
          downloads={downloads}
          onPlay={t => { setCurrentTrack(t); setIsPlaying(true); setShowPlayerModal(true); }}
          onClearDownloads={() => setDownloads([])}
        />
      )}

      {activeTab === 'settings' && <SettingsTab />}

      {showPlayerModal && currentTrack && (
        <PlayerModal
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onClose={() => setShowPlayerModal(false)}
          onOpenDownload={t => setSelectedTrackForDownload(t)}
        />
      )}

      {selectedTrackForDownload && (
        <DownloadModal
          track={selectedTrackForDownload}
          onClose={() => setSelectedTrackForDownload(null)}
          onStartDownload={handleStartDownload}
        />
      )}
    </MobileFrame>
  );
}

export default App;
