import React, { useState } from 'react';
import { Search as SearchIcon, Play, Download, Youtube, Link as LinkIcon } from 'lucide-react';
import { Track } from '../types';

interface SearchTabProps {
  tracks: Track[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSearch: (q: string) => void;
  onPlay: (track: Track) => void;
  onOpenDownload: (track: Track) => void;
}

export const SearchTab: React.FC<SearchTabProps> = ({
  tracks,
  searchQuery,
  setSearchQuery,
  onSearch,
  onPlay,
  onOpenDownload
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [urlSubmitted, setUrlSubmitted] = useState(false);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setUrlSubmitted(true);
    try {
      const res = await fetch(`/api/resolve-url?url=${encodeURIComponent(urlInput)}`);
      const data = await res.json();
      if (data.track) {
        onOpenDownload(data.track);
        setUrlInput('');
      }
    } catch (err) {
      if (tracks[0]) {
        onOpenDownload(tracks[0]);
      }
      setUrlInput('');
    } finally {
      setUrlSubmitted(false);
    }
  };

  return (
    <div style={{ paddingTop: '16px' }}>
      <div className="section-title" style={{ marginBottom: '16px' }}>
        <span>Buscador y Enlace YouTube</span>
      </div>

      <form onSubmit={handleUrlSubmit} style={{ marginBottom: '20px' }}>
        <div className="search-input-wrap" style={{ marginBottom: '8px' }}>
          <LinkIcon className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Pega enlace de YouTube (https://youtu.be/...)"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="hero-btn"
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
        >
          <Youtube size={18} />
          <span>Analizar y Descargar URL</span>
        </button>
      </form>

      <div className="search-input-wrap">
        <SearchIcon className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar artista, canción o género..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      <div className="section-title" style={{ marginTop: '20px' }}>
        <span>Resultados ({tracks.length})</span>
      </div>

      <div>
        {tracks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            No se encontraron canciones. Intenta otra búsqueda.
          </div>
        ) : (
          tracks.map(track => (
            <div key={track.id} className="track-card" onClick={() => onPlay(track)}>
              <div className="track-thumb-wrap">
                <img src={track.thumbnail} alt={track.title} className="track-thumb" />
              </div>
              <div className="track-info">
                <div className="track-name">{track.title}</div>
                <div className="track-artist">{track.channel}</div>
                <div className="track-meta">{track.duration} • {track.genre}</div>
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
          ))
        )}
      </div>

      <div className="creator-badge">
        Desarrollado por <span>OSCAR GARCIA</span>
      </div>
    </div>
  );
};
