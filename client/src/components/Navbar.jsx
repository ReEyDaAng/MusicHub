import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center bg-gray-950 px-4 py-3 shadow-md">
      <div className="text-xl font-bold">MusicHub</div>
      <div className="flex space-x-4 mt-2 sm:mt-0">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/search" className="hover:underline">Search</Link>
        <Link to="/favorites" className="hover:underline">Favorites</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
}