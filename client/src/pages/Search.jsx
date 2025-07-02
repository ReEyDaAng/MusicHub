import { useState, useRef, useEffect } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);

  const search = async () => {
    if (!query.trim()) {
      setError('Введіть запит для пошуку');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/tracks/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP помилка: ${response.status}`);
      }

      const tracksData = await response.json();
      setTracks(tracksData);
    } catch (err) {
      console.error('Помилка пошуку:', err);
      setError('Помилка при пошуку треків. Спробуйте ще раз.');
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (track) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Увійдіть в систему для додавання в обране');
        return;
      }

      await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          trackId: track.id,
          title: track.name,
          artist: track.artists[0]?.name,
          previewUrl: track.preview_url,
          albumName: track.album?.name,
        }),
      });

      alert('Додано в обране!');
    } catch (err) {
      console.error('Помилка додавання в обране:', err);
      alert('Помилка при додаванні в обране');
    }
  };

  const playTrack = (track) => {
    if (!track.preview_url) {
      alert('Превʼю недоступне для цього треку');
      return;
    }

    if (currentlyPlaying === track.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (currentlyPlaying === track.id && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      setCurrentlyPlaying(track.id);
      audioRef.current.src = track.preview_url;
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopTrack = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentlyPlaying(null);
    setCurrentTime(0);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const getCurrentTrack = () =>
    tracks.find((track) => track.id === currentlyPlaying);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener(
        'loadedmetadata',
        handleLoadedMetadata
      );
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentlyPlaying]);

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      {/* Search bar */}
      <div className="flex items-center mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          placeholder="Пошук пісень..."
        />
        <button
          onClick={search}
          disabled={loading}
          className="ml-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg text-white font-medium"
        >
          {loading ? 'Пошук...' : 'Знайти'}
        </button>
      </div>

      {/* Player */}
      {currentlyPlaying && (
        <div className="bg-black/50 backdrop-blur-md p-4 rounded-lg mb-6 border border-blue-500">
          <h3 className="text-white text-lg font-semibold mb-3">
            Зараз грає
          </h3>

          {getCurrentTrack() && (
            <div className="mb-4">
              <p className="text-white font-medium">
                {getCurrentTrack().name} —{' '}
                {getCurrentTrack().artists[0]?.name}
              </p>
              {getCurrentTrack().album && (
                <p className="text-gray-300 text-sm">
                  Альбом: {getCurrentTrack().album.name}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => playTrack(track)}
            disabled={!track.preview_url}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-white ${
              !track.preview_url
                ? 'bg-gray-600 cursor-not-allowed'
                : currentlyPlaying === track.id && isPlaying
                ? 'bg-orange-600 hover:bg-orange-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {currentlyPlaying === track.id && isPlaying ? '⏸️' : '▶️'}
          </button>
            <button
              onClick={stopTrack}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              ⏹️ Стоп
            </button>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Volume */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-300 text-sm">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      <audio ref={audioRef} />

      {error && (
        <div className="mb-6 p-4 bg-red-600 text-white rounded-lg">
          {error}
        </div>
      )}

      {/* Track list */}
      <ul>
        {tracks.map((track) => (
          <li
            key={track.id}
            className={`flex items-center p-4 mb-4 rounded-lg transition ${
              currentlyPlaying === track.id
                ? 'bg-blue-800 border-2 border-blue-500'
                : 'bg-black/50 backdrop-blur-md hover:bg-black/60'
            }`}
          >
            {track.album?.images[0]?.url && (
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="w-16 h-16 object-cover rounded-lg mr-4 flex-shrink-0"
              />
            )}

            <div className="flex-1">
              <p className="font-semibold text-white">
                {track.name} — {track.artists[0]?.name}
              </p>
              {track.album && (
                <p className="text-gray-300 text-sm">
                  Альбом: {track.album.name}
                </p>
              )}
              {!track.preview_url && (
                <p className="text-yellow-400 text-sm mt-1">
                  ⚠️ Превʼю недоступне
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => playTrack(track)}
                disabled={!track.preview_url}
                className={`p-2 rounded-lg text-white ${
                  !track.preview_url
                    ? 'bg-gray-600 cursor-not-allowed'
                    : currentlyPlaying === track.id && isPlaying
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {currentlyPlaying === track.id && isPlaying
                  ? '⏸️'
                  : '▶️'}
              </button>

              <button
                onClick={() => addToFavorites(track)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-pink-600 hover:bg-pink-700 text-white"
              >
                💖
              </button>
            </div>
          </li>
        ))}
      </ul>

      {tracks.length === 0 && !loading && !error && (
        <div className="text-center text-gray-400 mt-8">
          Введіть запит для пошуку музики
        </div>
      )}

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
