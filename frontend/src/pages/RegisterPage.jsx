import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Name, email, and password are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate('/login?email=' + encodeURIComponent(form.email.trim()));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#212121]">Manager Registration</h1>
        <p className="mt-1 text-sm text-[#666666]">Create your manager account.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-[#212121] focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-[#212121] focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-[#212121] focus:outline-none"
          />

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#212121] px-4 py-2 text-sm font-semibold text-[#F5F5F5] hover:bg-[#333333] disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-sm text-[#666666]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#333333] hover:text-[#212121]">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default RegisterPage;