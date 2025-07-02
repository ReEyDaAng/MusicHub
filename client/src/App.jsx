import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import bg from './assets/bg.jpg';

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <img
        src={bg}
        alt="фон"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="relative z-10 bg-black/60 min-h-screen text-white">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}