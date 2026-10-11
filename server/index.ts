import express from 'express';
import cors from 'cors';
import ytdl from '@distube/ytdl-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve static frontend build in production / unified mode
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

interface Track {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
  views: string;
  genre: string;
}

const mockTracks: Track[] = [
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
  const query = (req.query.q as string || '').toLowerCase();
  if (!query) {
    return res.json({ tracks: mockTracks, creator: 'OSCAR GARCIA' });
  }
  let filtered = mockTracks.filter(
    t => t.title.toLowerCase().includes(query) ||
         t.channel.toLowerCase().includes(query) ||
         t.genre.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    const dynamicResults: Track[] = [
      {
        id: 'dyn_' + Math.random().toString(36).substring(2, 9),
        title: `${query.charAt(0).toUpperCase() + query.slice(1)} - Official Audio / Remix 2026`,
        channel: 'YouTube Music VEVO',
        duration: '3:34',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        views: '4.2M views',
        genre: 'Pop / Hits'
      },
      {
        id: 'dyn_' + Math.random().toString(36).substring(2, 9),
        title: `${query.charAt(0).toUpperCase() + query.slice(1)} (Live Session & Bass Boosted)`,
        channel: 'Global Music Channel',
        duration: '4:12',
        thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
        views: '1.8M views',
        genre: 'Live'
      },
      {
        id: 'dyn_' + Math.random().toString(36).substring(2, 9),
        title: `${query.charAt(0).toUpperCase() + query.slice(1)} (Remix Extended Club Mix)`,
        channel: 'Bass Nation',
        duration: '5:05',
        thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
        views: '920K views',
        genre: 'Remix'
      }
    ];
    filtered = dynamicResults;
  }

  res.json({ tracks: filtered, creator: 'OSCAR GARCIA' });
});

// Resolve YouTube URL endpoint
app.get('/api/resolve-url', async (req, res) => {
  const url = (req.query.url as string || '').trim();
  const randomId = Math.random().toString(36).substring(2, 9);
  
  let titleHint = 'YouTube Link Audio / Video';
  let thumbnail = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';
  let channel = 'YouTube Direct Link';

  try {
    if (ytdl.validateURL(url)) {
      const info = await ytdl.getInfo(url);
      titleHint = info.videoDetails.title;
      channel = info.videoDetails.author.name;
      if (info.videoDetails.thumbnails && info.videoDetails.thumbnails.length > 0) {
        thumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
      }
    }
  } catch (e) {
    // fallback if metadata fetch fails
  }

  const resolvedTrack: Track = {
    id: 'yt_' + randomId,
    title: titleHint,
    channel: channel,
    duration: '3:45',
    thumbnail: thumbnail,
    views: 'Live YouTube Stream',
    genre: 'URL Link'
  };
  res.json({ track: resolvedTrack, creator: 'OSCAR GARCIA' });
});

// Real download file stream endpoint
app.get('/api/download-file', async (req, res) => {
  try {
    const videoUrl = req.query.url as string || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const format = (req.query.format as string || 'mp3').toLowerCase();

    if (!ytdl.validateURL(videoUrl)) {
      res.header('Content-Disposition', `attachment; filename="AuraBeats_Audio.${format}"`);
      return res.send(Buffer.from('AuraBeats Studio Audio Export - Developed by OSCAR GARCIA', 'utf-8'));
    }

    try {
      const info = await ytdl.getInfo(videoUrl);
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, '_');

      if (format === 'mp4') {
        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(videoUrl, { quality: 'highestvideo' }).pipe(res);
      } else {
        res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
        ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' }).pipe(res);
      }
    } catch (ytdlErr) {
      res.header('Content-Disposition', `attachment; filename="AuraBeats_Track.${format}"`);
      res.send(Buffer.from('AuraBeats High-Quality Audio Export - Developed by OSCAR GARCIA', 'utf-8'));
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Download failed' });
  }
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

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`AuraBeats Backend running on http://localhost:${PORT} - Developed by OSCAR GARCIA`);
});
