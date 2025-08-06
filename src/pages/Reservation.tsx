import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Room } from '../models/Room';

const Reservation: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        guests: 1,
        checkIn: '',
        checkOut: '',
    });

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await fetch(`http://localhost:5001/rooms/${roomId}`);
                if (!res.ok) {
                    throw new Error('Room not found');
                }
                const data = await res.json();
                setRoom(data);
            } catch (err) {
                console.error('Greška prilikom učitavanja sobe:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (roomId) {
            fetchRoom();
        }
    }, [roomId]);

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

    if (loading) return <p>Učitavanje...</p>;
    if (error || !room) return <p>Soba nije pronađena.</p>;

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

                <button type="submit" disabled={!formData.name || !formData.checkIn || !formData.checkOut}>
                    Potvrdi rezervaciju
                </button>
            </form>

            {success && <p className="reservation-success">✅ Rezervacija uspešna!</p>}
        </div>
    );
};

export default Reservation;