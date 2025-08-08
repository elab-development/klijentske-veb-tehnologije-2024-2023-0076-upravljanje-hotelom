import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Room } from '../models/Room';
import type { Review } from '../models/Review';

const RoomDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [room, setRoom] = useState<Room | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const roomRes = await fetch(`http://localhost:5001/rooms/${id}`);
                if (!roomRes.ok) throw new Error('Greška pri učitavanju sobe');
                const roomData = await roomRes.json();
                setRoom(roomData);

                const reviewsRes = await fetch(`http://localhost:5001/reviews?roomId=${id}`);
                if (!reviewsRes.ok) throw new Error('Greška pri učitavanju recenzija');
                const reviewsData = await reviewsRes.json();
                setReviews(reviewsData);

            } catch (err: any) {
                setError(err.message || 'Došlo je do greške');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();

        const newReview: Omit<Review, 'id'> = {
            roomId: Number(id),
            author: author.trim(),
            rating,
            comment: comment.trim(),
            date: new Date().toISOString().split('T')[0],
        };

        try {
            const res = await fetch(`http://localhost:5001/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview),
            });

            if (!res.ok) throw new Error('Greška pri slanju recenzije');

            const savedReview = await res.json();
            setReviews(prev => [savedReview, ...prev]);
            setAuthor('');
            setRating(5);
            setComment('');
        } catch (err: any) {
            alert(err.message || 'Došlo je do greške prilikom slanja');
        }
    };

    if (loading) {
        return <div className="room-details"><p>Učitavanje...</p></div>;
    }

    if (error) {
        return <div className="room-details"><p style={{ color: 'red' }}>{error}</p></div>;
    }

    if (!room) {
        return <div className="room-details"><h2>Soba nije pronađena</h2></div>;
    }

    return (
        <div className="room-details">
            <button className="back-button" onClick={() => navigate('/rooms')}>
            ← Nazad na sobe
            </button>

            <img src={room.imageUrl} alt={room.name} className="details-image" />
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            <p><strong>Max gostiju:</strong> {room.guests}</p>
            <p><strong>Cena:</strong> ${room.price} po noćenju</p>

            <div className="reviews-section">
                <h3>Recenzije</h3>
                {reviews.length === 0 ? (
                    <p>Nema još recenzija za ovu sobu.</p>
                ) : (
                    [...reviews]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
                    .slice(0, 3)
                    .map(review => (
                        <div key={review.id} className="review-card">
                        <p><strong>{review.author}</strong> - {review.rating} / 5</p>
                        <p>{review.comment}</p>
                        <small>{new Date(review.date).toLocaleDateString()}</small>
                        </div>
                    ))
                )}

                <h4>Ostavi svoju recenziju</h4>
                <form onSubmit={handleAddReview} className="reservation-form">
                <input
                    type="text"
                    placeholder="Vaše ime"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    required
                />
                <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                {[5,4,3,2,1].map(num => (
                    <option key={num} value={num}>{num}</option>
                ))}
                </select>
                <textarea
                    placeholder="Vaš komentar"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    required
                    rows={4}
                />
                <button type="submit">Pošalji</button>
                </form>
            </div>

            <button 
                onClick={() => navigate(`/rooms/${room.id}/reserve`)}
                className="back-button"
                style={{ marginTop: '1rem', backgroundColor: '#2c3e50' }}
            >Rezerviši</button>
        </div>
    );
};

export default RoomDetails;