"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const mockTracks = [
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
// Search endpoint
app.get('/api/search', (req, res) => {
    const query = (req.query.q || '').toLowerCase();
    if (!query) {
        return res.json({ tracks: mockTracks, creator: 'OSCAR GARCIA' });
    }
    const filtered = mockTracks.filter(t => t.title.toLowerCase().includes(query) ||
        t.channel.toLowerCase().includes(query) ||
        t.genre.toLowerCase().includes(query));
    res.json({ tracks: filtered.length ? filtered : mockTracks, creator: 'OSCAR GARCIA' });
});
// Trending endpoint
app.get('/api/trending', (req, res) => {
    res.json({ tracks: mockTracks, creator: 'OSCAR GARCIA' });
});
// Download simulation endpoint
app.post('/api/download', (req, res) => {
    const { trackId, format, quality } = req.body;
    const track = mockTracks.find(t => t.id === trackId) || mockTracks[0];
    const downloadId = 'dl_' + Math.random().toString(36).substring(2, 9);
    res.json({
        success: true,
        downloadId,
        message: `Download started for "${track.title}" in ${format.toUpperCase()} (${quality})`,
        track,
        format,
        quality,
        creator: 'OSCAR GARCIA'
    });
});
app.get('/api/info', (req, res) => {
    res.json({
        appName: 'AuraBeats Mobile',
        version: '1.0.0',
        developer: 'OSCAR GARCIA',
        status: 'Operational'
    });
});
app.listen(PORT, () => {
    console.log(`AuraBeats Backend running on http://localhost:${PORT} - Developed by OSCAR GARCIA`);
});
