import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Favorites() {
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/favorites', { headers: { Authorization: `Bearer ${token}` } });
      setFavs(res.data);
    })();
  }, []);

  return (
    <ul className="max-w-xl mx-auto space-y-2">
      {favs.map(f => (
        <li key={f._id} className="p-3 bg-gray-800 rounded">
          <div className="font-semibold">{f.title}</div>
          <div className="text-sm text-gray-400">{f.artist}</div>
        </li>
      ))}
    </ul>
  );
}