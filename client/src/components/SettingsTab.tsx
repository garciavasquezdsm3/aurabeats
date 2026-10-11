import React from 'react';
import { Settings, Shield, HardDrive, Sliders, Info, Award } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  return (
    <div style={{ paddingTop: '16px' }}>
      <div className="section-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} color="var(--primary)" />
          <span>Ajustes y Preferencias</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        <div className="quality-option" style={{ cursor: 'default' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sliders size={20} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Calidad de Descarga por Defecto</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>MP3 320kbps Studio High-Fi</div>
            </div>
          </div>
        </div>

        <div className="quality-option" style={{ cursor: 'default' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <HardDrive size={20} color="var(--accent)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Almacenamiento Local</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>14.2 GB libres / Carpeta /Music/AuraBeats</div>
            </div>
          </div>
        </div>

        <div className="quality-option" style={{ cursor: 'default' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={20} color="var(--pink)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Metadatos Automáticos y Carátulas</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Incrustar carátula y letras de canciones</div>
            </div>
          </div>
        </div>

        <div className="quality-option" style={{ cursor: 'default' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Award size={20} color="#eab308" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Creador del Programa</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>OSCAR GARCIA</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
        AuraBeats Mobile v1.0.0 (Production Build)
      </div>

      <div className="creator-badge">
        Desarrollado por <span>OSCAR GARCIA</span>
      </div>
    </div>
  );
};
