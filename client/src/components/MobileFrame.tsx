import React from 'react';
import { Home, Search, Download, Settings, Play, Pause, Disc } from 'lucide-react';
import { Track, DownloadItem } from '../types';

interface MobileFrameProps {
  activeTab: 'home' | 'search' | 'downloads' | 'settings';
  setActiveTab: (tab: 'home' | 'search' | 'downloads' | 'settings') => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenPlayer: () => void;
  downloadsCount: number;
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  activeTab,
  setActiveTab,
  currentTrack,
  isPlaying,
  onTogglePlay,
  onOpenPlayer,
  downloadsCount,
  children
}) => {
  return (
    <div className="desktop-wrapper">
      <div className="phone-shell">
        <div className="phone-status-bar">
          <div className="status-notch"></div>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px' }}>5G</span>
            <div style={{ width: '20px', height: '10px', border: '1.5px solid var(--text-muted)', borderRadius: '3px', padding: '1px' }}>
              <div style={{ width: '100%', height: '100%', background: 'var(--primary)', borderRadius: '1px' }}></div>
            </div>
          </div>
        </div>

        <div className="app-content">
          {children}
        </div>

        {currentTrack && (
          <div className="mini-player" onClick={onOpenPlayer}>
            <img src={currentTrack.thumbnail} alt={currentTrack.title} className="mini-thumb" />
            <div className="mini-info">
              <div className="mini-title">{currentTrack.title}</div>
              <div className="mini-channel">{currentTrack.channel}</div>
            </div>
            <div className="mini-controls" onClick={e => e.stopPropagation()}>
              <button className="icon-btn play-circle-btn" onClick={onTogglePlay}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '1px' }} />}
              </button>
            </div>
          </div>
        )}

        <nav className="bottom-nav">
          <button
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Home size={20} />
            <span>Inicio</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <Search size={20} />
            <span>Buscar</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'downloads' ? 'active' : ''}`}
            onClick={() => setActiveTab('downloads')}
          >
            <div style={{ position: 'relative' }}>
              <Download size={20} />
              {downloadsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -4,
                  right: -8,
                  background: 'var(--pink)',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 8px var(--pink)'
                }}>
                  {downloadsCount}
                </span>
              )}
            </div>
            <span>Descargas</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            <span>Ajustes</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
