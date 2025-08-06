import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Room } from '../models/Room';
import { RoomModel } from '../models/RoomModel';
import type { Review } from '../models/Review';

const API_URL = 'http://localhost:5001';

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`${API_URL}/rooms/${id}`);
        if (!res.ok) throw new Error('Soba nije pronađena');
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        setRoom(null);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/reviews?roomId=${id}`);
        const data = await res.json();
        setReviews(
          data
            .sort((a: Review, b: Review) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
        );
      } catch (err) {
        console.error('Greška pri učitavanju recenzija:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
    fetchReviews();
  }, [id]);

  if (!room && !loading) {
    return <div className="room-details"><h2>Soba nije pronađena</h2></div>;
  }

  const roomModel = room ? new RoomModel(room) : null;

  return (
    <div className="room-details">
      <button className="back-button" onClick={() => navigate('/rooms')}>← Nazad na sobe</button>

      {roomModel && (
        <>
          <img src={roomModel.imageUrl} alt={roomModel.name} className="details-image" />
          <h2>{roomModel.name}</h2>
          <p>{roomModel.description}</p>
          <p><strong>Max gostiju:</strong> {roomModel.guests}</p>
          <p><strong>Cena:</strong> ${roomModel.price} po noćenju</p>

          <div className="reviews-section">
            <h3>Recenzije</h3>
            {loading ? (
              <p>Učitavanje recenzija...</p>
            ) : reviews.length === 0 ? (
              <p>Nema još recenzija za ovu sobu.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <p><strong>{review.author}</strong> - {review.rating} / 5</p>
                  <p>{review.comment}</p>
                  <small>{new Date(review.date).toLocaleDateString()}</small>
                </div>
              ))
            )}
          </div>

          <button onClick={() => navigate(`/rooms/${roomModel.id}/reserve`)}>Rezerviši</button>
        </>
      )}
    </div>
  );
};

export default RoomDetails;
