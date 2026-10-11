import React from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Disc, Download, Heart, Share2 } from 'lucide-react';
import { Track } from '../types';

interface PlayerModalProps {
  track: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onOpenDownload: (track: Track) => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  track,
  isPlaying,
  onTogglePlay,
  onClose,
  onOpenDownload
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="modal-header">
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>REPRODUCTOR INMERSIVO</div>
          <button className="icon-btn" onClick={() => onOpenDownload(track)}>
            <Download size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
          <div style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 0 40px var(--primary-glow), 0 20px 40px rgba(0,0,0,0.6)',
            border: '3px solid rgba(168, 85, 247, 0.4)',
            position: 'relative',
            animation: isPlaying ? 'spin 12s linear infinite' : 'none'
          }}>
            <img src={track.thumbnail} alt={track.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#07070c',
              border: '2px solid var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Disc size={20} color="var(--primary)" />
            </div>
          </div>
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>{track.title}</div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{track.channel}</div>
        </div>

        {/* Audio Visualizer Waves Simulation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', height: '40px', marginBottom: '24px' }}>
          {[40, 70, 30, 90, 60, 100, 45, 80, 50, 65, 35, 85, 95, 55, 75, 40].map((h, i) => (
            <div key={i} style={{
              width: '4px',
              height: isPlaying ? `${Math.max(15, h * (Math.random() * 0.5 + 0.7))}px` : '10px',
              background: 'linear-gradient(180deg, var(--primary), var(--accent))',
              borderRadius: '2px',
              transition: 'height 0.2s ease'
            }}></div>
          ))}
        </div>

        {/* Playback Progress */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative', cursor: 'pointer' }}>
            <div style={{ width: '35%', height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--pink))', borderRadius: '3px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
            <span>1:15</span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '30px' }}>
          <button className="icon-btn" style={{ width: '44px', height: '44px' }}>
            <SkipBack size={22} />
          </button>
          <button
            className="icon-btn play-circle-btn"
            style={{ width: '64px', height: '64px' }}
            onClick={onTogglePlay}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '2px' }} />}
          </button>
          <button className="icon-btn" style={{ width: '44px', height: '44px' }}>
            <SkipForward size={22} />
          </button>
        </div>

        <div className="creator-badge">
          Desarrollado por <span>OSCAR GARCIA</span>
        </div>
      </div>
    </div>
  );
};
