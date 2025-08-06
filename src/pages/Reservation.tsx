import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Room } from '../models/Room';

const dummyRooms: Room[] = [
  {
    id: 1,
    name: 'Standard soba',
    price: 50,
    guests: 2,
    description: 'Udobna standard soba za dva gosta',
    imageUrl: '/images/standard-room.jpg',
  },
  {
    id: 2,
    name: 'Porodična soba',
    price: 80,
    guests: 4,
    description: 'Prostrana soba za celu porodicu',
    imageUrl: '/images/family-room.jpg',
  },
  {
    id: 3,
    name: 'Mala soba',
    price: 30,
    guests: 1,
    description: 'Mala soba za jednu osobu',
    imageUrl: '/images/small-room.jpg',
  },
  {
    id: 4,
    name: 'Luksuzna soba',
    price: 100,
    guests: 4,
    description: 'Luksuzna soba za do 4 osobe',
    imageUrl: '/images/luxury-room.jpg',
  }
];

const Reservation: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const room = dummyRooms.find(r => r.id === Number(roomId));

  const [formData, setFormData] = useState({
    name: '',
    guests: 1,
    checkIn: '',
    checkOut: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.checkIn || !formData.checkOut) {
    return;
  }

  setSuccess(true);
};


  if (!room) return <p>Soba nije pronađena.</p>;

  return (
    <div className="reservation-container">
      <h2>Rezerviši: {room.name}</h2>
      <img src={room.imageUrl} alt={room.name} className="reservation-image" />

      <form onSubmit={handleSubmit} className="reservation-form">
        <label>
          Ime i prezime:
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Vaše ime"
          />
        </label>

        <label>
          Broj gostiju:
          <input
            type="number"
            name="guests"
            min="1"
            max={room.guests}
            value={formData.guests}
            onChange={handleChange}
          />
        </label>

        <label>
          Datum dolaska:
          <input
            type="date"
            name="checkIn"
            required
            value={formData.checkIn}
            onChange={handleChange}
          />
        </label>

        <label>
          Datum odlaska:
          <input
            type="date"
            name="checkOut"
            required
            value={formData.checkOut}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={!formData.name || !formData.checkIn || !formData.checkOut}>Potvrdi rezervaciju</button>

      </form>

      {success && <p className="reservation-success">✅ Rezervacija uspešna!</p>}
    </div>
  );
};

export default Reservation;
