import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '../models/User';
import { apiGet, apiPost } from '../api';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // učitaj iz localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  // snimi u localStorage
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  async function login(email: string, password: string) {
    const emailLower = email.trim().toLowerCase();
    const found = await apiGet<User[]>(`/users?email=${encodeURIComponent(emailLower)}`);
    const match = found[0];
    if (!match || match.password !== password) {
      throw new Error('Pogrešan email ili lozinka.');
    }
    setUser(match);
  }

  async function register(name: string, email: string, password: string) {
    const emailLower = email.trim().toLowerCase();
    const exists = await apiGet<User[]>(`/users?email=${encodeURIComponent(emailLower)}`);
    if (exists.length > 0) throw new Error('Korisnik sa tim emailom već postoji.');

    const id = (globalThis.crypto?.randomUUID?.() ?? String(Date.now()));
    const newUser: User = { id, name: name.trim(), email: emailLower, password };
    const saved = await apiPost<User>('/users', newUser);

    // auto-login
    setUser(saved);
  }

  function logout() {
    setUser(null);
  }

  async function changePassword(oldPassword: string, newPassword: string) {
    if (!user) throw new Error('Nisi prijavljen.');
    const fresh = await apiGet<User>(`/users/${user.id}`);
    if (fresh.password !== oldPassword) throw new Error('Stara lozinka nije tačna.');

    const res = await fetch(`http://localhost:5001/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });
    if (!res.ok) throw new Error('Greška pri promeni lozinke.');

    const updated: User = await res.json();
    setUser(updated);
  }

  const value = useMemo(
    () => ({ user, login, register, logout, changePassword }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth mora biti korišćen unutar <AuthProvider>');
  return ctx;
}