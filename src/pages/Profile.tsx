import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout, changePassword } = useAuth();
  const navigate = useNavigate();

  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newPwd2, setNewPwd2] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return null; // rutu štiti RequireAuth

  async function onChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setMsg('');

    if (newPwd.length < 6) {
      setErr('Nova lozinka mora imati najmanje 6 karaktera.');
      return;
    }
    if (newPwd !== newPwd2) {
      setErr('Nova lozinka i potvrda se ne poklapaju.');
      return;
    }

    setLoading(true);
    try {
      await changePassword(oldPwd, newPwd);
      setMsg('Lozinka uspešno promenjena.');
      setOldPwd(''); setNewPwd(''); setNewPwd2('');
    } catch (error: any) {
      setErr(error.message || 'Greška pri promeni lozinke.');
    } finally {
      setLoading(false);
    }
  }

  function onLogout() {
    logout();
    navigate('/', { replace: true });
  }

  return (
    <div className="profile-page">
      <h2>Moj profil</h2>
      <p><strong>Ime:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <hr style={{ margin: '1rem 0' }} />

      <h3>Promena lozinke</h3>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      {msg && <p style={{ color: 'limegreen' }}>{msg}</p>}

      <form className="reservation-form" onSubmit={onChangePassword}>
        <input
          type="password"
          placeholder="Stara lozinka"
          value={oldPwd}
          onChange={e => setOldPwd(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nova lozinka (min 6)"
          value={newPwd}
          onChange={e => setNewPwd(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Potvrda nove lozinke"
          value={newPwd2}
          onChange={e => setNewPwd2(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Čuvanje...' : 'Sačuvaj'}
        </button>
      </form>

      <button className="back-button" style={{ marginTop: '1rem' }} onClick={onLogout}>
        Odjava
      </button>
    </div>
  );
};

export default Profile;