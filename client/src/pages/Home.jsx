import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('🏠 Home mounted');
      const fetchLatest = async () => {
      try {
        const res = await axios.get('/api/tracks/latest');
        setTracks(res.data);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити треки');
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading) return <p className="text-center mt-8">Завантажуємо треки…</p>;
  if (error)   return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4">
      <h1 className="text-3xl font-bold mb-6">Останні треки</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map(track => (
          <div
            key={track.id}
            className="bg-black/50 backdrop-blur-md p-4 rounded-lg shadow-lg flex flex-col items-center"
          >
            {/* обкладинка */}
            {track.album?.images[0]?.url && (
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            <h2 className="text-xl font-semibold text-white text-center">
              {track.name}
            </h2>
            <p className="text-gray-300 mb-2 text-center">
              {track.artists.map(a => a.name).join(', ')}
            </p>
            {track.preview_url ? (
              <audio controls src={track.preview_url} className="w-full mt-2" />
            ) : (
              <p className="text-sm text-gray-400">Прев’ю недоступне</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
