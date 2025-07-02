import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Logged in successfully!');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-8 p-4 bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-3 p-2 rounded bg-gray-700" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-3 p-2 rounded bg-gray-700" required />
      <button className="w-full p-2 bg-indigo-600 hover:bg-indigo-700 rounded">Login</button>
    </form>
  );
}