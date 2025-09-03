import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Room } from '../models/Room';
import { apiGet, fmtPrice } from '../api';

interface FormState {
  name: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  notes?: string;
}

const Reservation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<FormState>({
    name: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    notes: '',
  });

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setError('Nedostaje ID sobe');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await apiGet<Room>(`/rooms/${id}`);
        setRoom(data);
      } catch (e: any) {
        setError(e.message || 'Greška pri učitavanju sobe');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, checkIn, checkOut, guests } = formData;

    if (!name.trim() || !checkIn || !checkOut) {
      alert('Molimo popunite sva obavezna polja.');
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      alert('Datum odlaska mora biti posle datuma dolaska.');
      return;
    }

    if (room && guests > room.guests) {
      alert(`Maksimalno dozvoljeno gostiju za ovu sobu je ${room.guests}.`);
      return;
    }

    
    setSuccess(true);

    setTimeout(() => navigate(`/rooms/${id}`), 1200);
  };

  if (loading) return <div className="reservation"><p>Učitavanje...</p></div>;
  if (error) return <div className="reservation"><p style={{ color: 'red' }}>{error}</p></div>;
  if (!room) return <div className="reservation"><p>Soba nije pronađena.</p></div>;

  return (
    <div className="reservation">
      <button className="back-button" onClick={() => navigate(`/rooms/${id}`)}>
        ← Nazad na detalje
      </button>

      <h2>Rezervacija: {room.name}</h2>
      <p><strong>Max gostiju:</strong> {room.guests}</p>
      <p><strong>Cena:</strong> {fmtPrice(room.price)} / noć</p>

      <form className="reservation-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ime i prezime"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>
          Datum dolaska:
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Datum odlaska:
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Broj gostiju:
          <select name="guests" value={formData.guests} onChange={handleChange}>
            {Array.from({ length: room.guests }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <textarea
          name="notes"
          placeholder="Napomena (opciono)"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit">Potvrdi rezervaciju</button>
      </form>

      {success && <p style={{ color: 'limegreen', marginTop: '1rem' }}>Rezervacija uspešna!</p>}
    </div>
  );
};

export default Reservation;