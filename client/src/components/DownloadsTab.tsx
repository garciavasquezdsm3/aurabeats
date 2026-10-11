import React from 'react';
import { Download, CheckCircle, Play, Folder, Trash2 } from 'lucide-react';
import { DownloadItem, Track } from '../types';

interface DownloadsTabProps {
  downloads: DownloadItem[];
  onPlay: (track: Track) => void;
  onClearDownloads: () => void;
}

export const DownloadsTab: React.FC<DownloadsTabProps> = ({
  downloads,
  onPlay,
  onClearDownloads
}) => {
  return (
    <div style={{ paddingTop: '16px' }}>
      <div className="section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={18} color="var(--primary)" />
          <span>Cola y Biblioteca de Descargas</span>
        </div>
        {downloads.length > 0 && (
          <button
            onClick={onClearDownloads}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px'
            }}
          >
            <Trash2 size={14} /> Limpiar
          </button>
        )}
      </div>

      {downloads.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(168, 85, 247, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <Folder size={32} />
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>No hay descargas activas ni guardadas</div>
          <p style={{ fontSize: '13px' }}>Explora la música y descarga tus canciones favoritas en MP3 o FLAC.</p>
        </div>
      ) : (
        <div>
          {downloads.map(item => (
            <div key={item.id} className="track-card">
              <div className="track-thumb-wrap">
                <img src={item.track.thumbnail} alt={item.track.title} className="track-thumb" />
              </div>
              <div className="track-info">
                <div className="track-name">{item.track.title}</div>
                <div className="track-artist">{item.track.channel}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '6px',
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: 'var(--accent)'
                  }}>
                    {item.format.toUpperCase()} ({item.quality})
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.size}</span>
                </div>

                {item.status === 'downloading' && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                      <span>Descargando... {item.progress}%</span>
                      <span>{item.speed}</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))', transition: 'width 0.3s' }}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="track-actions">
                {item.status === 'completed' ? (
                  <button
                    className="action-pill-btn download-pill-btn"
                    title="Reproducir local"
                    onClick={() => onPlay(item.track)}
                  >
                    <Play size={16} />
                  </button>
                ) : (
                  <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>
                    <CheckCircle size={18} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="creator-badge">
        Desarrollado por <span>OSCAR GARCIA</span>
      </div>
    </div>
  );
};
