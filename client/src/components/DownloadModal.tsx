import React, { useState } from 'react';
import { X, Download, Music, Video, Check } from 'lucide-react';
import { Track } from '../types';

interface DownloadModalProps {
  track: Track;
  onClose: () => void;
  onStartDownload: (track: Track, format: string, quality: string) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  track,
  onClose,
  onStartDownload
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'mp3' | 'flac' | 'mp4'>('mp3');
  const [selectedQuality, setSelectedQuality] = useState<string>('320kbps');

  const qualities = {
    mp3: ['320kbps (Studio High-Fi)', '192kbps (Standard)', '128kbps (Compact)'],
    flac: ['Lossless 24-bit/96kHz', 'Lossless 16-bit/44.1kHz'],
    mp4: ['1080p Full HD Video', '720p HD Video', '480p Video']
  };

  const handleDownloadClick = () => {
    onStartDownload(track, selectedFormat, selectedQuality.split(' ')[0]);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Opciones de Descarga</div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
          <img src={track.thumbnail} alt={track.title} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{track.channel} • {track.duration}</div>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px', color: 'var(--text-muted)' }}>FORMATO DE SALIDA</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {[
            { id: 'mp3', label: 'MP3 Audio', icon: Music },
            { id: 'flac', label: 'FLAC Lossless', icon: Music },
            { id: 'mp4', label: 'MP4 Video', icon: Video }
          ].map(fmt => {
            const Icon = fmt.icon;
            const isSelected = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => {
                  setSelectedFormat(fmt.id as any);
                  setSelectedQuality(qualities[fmt.id as keyof typeof qualities][0]);
                }}
                style={{
                  background: isSelected ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-glass)'}`,
                  borderRadius: '12px',
                  padding: '12px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  color: isSelected ? 'var(--text-main)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 15px var(--primary-glow)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={20} color={isSelected ? 'var(--primary)' : 'currentColor'} />
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{fmt.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px', color: 'var(--text-muted)' }}>CALIDAD / BITRATE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {qualities[selectedFormat].map(q => {
            const isSelected = selectedQuality === q;
            return (
              <div
                key={q}
                className={`quality-option ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedQuality(q)}
              >
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{q}</span>
                {isSelected && <Check size={16} color="var(--primary)" />}
              </div>
            );
          })}
        </div>

        <button
          className="hero-btn"
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}
          onClick={handleDownloadClick}
        >
          <Download size={18} />
          <span>Iniciar Descarga Instantánea</span>
        </button>

        <div className="creator-badge">
          Desarrollado por <span>OSCAR GARCIA</span>
        </div>
      </div>
    </div>
  );
};
