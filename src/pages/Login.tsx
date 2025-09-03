import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await login(email, password);
      const to = params.get('redirectTo') || '/profile';
      navigate(to, { replace: true });
    } catch (error: any) {
      setErr(error.message || 'Greška pri prijavi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <h2>Prijava</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}

      <form className="reservation-form" onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lozinka"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Prijavljivanje...' : 'Prijavi se'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Nemaš nalog? <Link to="/register">Registruj se</Link>
      </p>
    </div>
  );
};

export default Login;