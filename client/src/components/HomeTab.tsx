import React from 'react';
import { Play, Download, Sparkles, TrendingUp, Music } from 'lucide-react';
import { Track } from '../types';

interface HomeTabProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
  onOpenDownload: (track: Track) => void;
  onSelectGenre: (genre: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  tracks,
  onPlay,
  onOpenDownload,
  onSelectGenre
}) => {
  const genres = ['Todos', 'Synthwave', 'Lo-Fi', 'Future Bass', 'Cinematic', 'Deep House', 'Trance'];

  return (
    <div>
      <div style={{ padding: '16px 0 8px 0' }}>
        <div className="app-logo">
          <div className="logo-icon-box">
            <Music size={20} />
          </div>
          <span>AuraBeats</span>
        </div>
      </div>

      <div className="hero-banner">
        <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.15, pointerEvents: 'none' }}>
          <Sparkles size={140} color="var(--primary)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>DESCARGADOR YOUTUBE MUSIC 2026</span>
        </div>
        <h2>Música sin límites en Alta Fidelidad</h2>
        <p>Descarga tus pistas favoritas de YouTube en MP3 320kbps, FLAC o Video al instante.</p>
        <button className="hero-btn" onClick={() => onPlay(tracks[0])}>
          Reproducir Mix Aura
        </button>
      </div>

      <div className="genre-scroller">
        {genres.map(g => (
          <button
            key={g}
            className={`genre-chip ${g === 'Todos' ? 'active' : ''}`}
            onClick={() => onSelectGenre(g === 'Todos' ? '' : g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="section-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} color="var(--primary)" />
          <span>Tendencias y Descargas Populares</span>
        </div>
      </div>

      <div>
        {tracks.map(track => (
          <div key={track.id} className="track-card" onClick={() => onPlay(track)}>
            <div className="track-thumb-wrap">
              <img src={track.thumbnail} alt={track.title} className="track-thumb" />
            </div>
            <div className="track-info">
              <div className="track-name">{track.title}</div>
              <div className="track-artist">{track.channel}</div>
              <div className="track-meta">{track.duration} • {track.views} • {track.genre}</div>
            </div>
            <div className="track-actions" onClick={e => e.stopPropagation()}>
              <button
                className="action-pill-btn"
                title="Reproducir"
                onClick={() => onPlay(track)}
              >
                <Play size={16} />
              </button>
              <button
                className="action-pill-btn download-pill-btn"
                title="Descargar"
                onClick={() => onOpenDownload(track)}
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="creator-badge">
        Desarrollado por <span>OSCAR GARCIA</span>
      </div>
    </div>
  );
};
