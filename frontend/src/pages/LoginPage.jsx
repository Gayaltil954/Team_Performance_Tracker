import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ email: searchParams.get('email') || '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError('Email and password are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await loginUser({ email: form.email.trim(), password: form.password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#212121]">Manager Login</h1>
        <p className="mt-1 text-sm text-[#666666]">Access your team dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-[#666666]">
          No account yet?{' '}
          <Link to="/register" className="font-medium text-[#333333] hover:text-[#212121]">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;