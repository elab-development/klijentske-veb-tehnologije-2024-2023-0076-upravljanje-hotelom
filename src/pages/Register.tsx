import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');

    if (pwd.length < 6) {
      setErr('Lozinka mora imati najmanje 6 karaktera.');
      return;
    }
    if (pwd !== pwd2) {
      setErr('Lozinka i potvrda se ne poklapaju.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, pwd); // auto-login
      navigate('/profile', { replace: true });
    } catch (error: any) {
      setErr(error.message || 'Greška pri registraciji.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <h2>Registracija</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}

      <form className="reservation-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Ime i prezime"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lozinka (min 6)"
          required
          value={pwd}
          onChange={e => setPwd(e.target.value)}
        />
        <input
          type="password"
          placeholder="Potvrda lozinke"
          required
          value={pwd2}
          onChange={e => setPwd2(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Kreiranje...' : 'Kreiraj nalog'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Već imaš nalog? <Link to="/login">Prijavi se</Link>
      </p>
    </div>
  );
};

export default Register;