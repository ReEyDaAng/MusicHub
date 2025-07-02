import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);

  return (
    <>
      <nav className="h-16 flex items-center px-6 bg-gray-800 relative z-20">
        <Link to="/" className="text-2xl font-bold text-white">
          MusicHub
        </Link>
        <div className="ml-auto flex items-center space-x-4 text-white">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'underline' : '')}
          >
            Home
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? 'underline' : '')}
          >
            Search
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? 'underline' : '')}
          >
            Favorites
          </NavLink>

          {user ? (
            <>
              <span className="px-3 py-1 bg-gray-600 shadow-inner rounded">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => setShowReg(true)}
                className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showReg && <RegisterModal onClose={() => setShowReg(false)} />}
    </>
  );
}
