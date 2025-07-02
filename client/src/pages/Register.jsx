import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', form);
    alert('Registered!');
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-8 p-4 bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl mb-4 font-bold">Register</h2>
      <input type="text" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full mb-3 p-2 rounded bg-gray-700" required />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full mb-3 p-2 rounded bg-gray-700" required />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full mb-3 p-2 rounded bg-gray-700" required />
      <button className="w-full p-2 bg-green-600 hover:bg-green-700 rounded">Register</button>
    </form>
  );
}