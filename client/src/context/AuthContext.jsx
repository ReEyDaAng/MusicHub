import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // При монтуванні тягнемо токен і ім'я з localStorage
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (token && name) {
      setUser({ name, token });
    }
  }, []);

  const login = ({ name, token }) => {
    // Зберігаємо у localStorage і в стані
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    setUser({ name, token });
  };

  const logout = () => {
    // Видаляємо з локалки і з стану
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
