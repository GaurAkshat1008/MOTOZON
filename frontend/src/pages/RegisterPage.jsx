import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border rounded" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;