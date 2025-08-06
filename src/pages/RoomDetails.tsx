import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Room } from '../models/Room';
import { RoomModel } from '../models/RoomModel';
import type { Review } from '../models/Review';

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

const dummyReviews: Review[] = [
  { id: 1, roomId: 1, author: 'Marko', rating: 5, comment: 'Fenomenalna soba, čist i udoban smeštaj!', date: '2025-08-01' },
  { id: 2, roomId: 1, author: 'Jelena', rating: 4, comment: 'Soba je bila udobna, ali buka spolja je malo smetala.', date: '2025-07-25' },
  { id: 3, roomId: 2, author: 'Ivan', rating: 5, comment: 'Porodična soba je bila prostrana i savršena za naš odmor.', date: '2025-07-30' },
  { id: 4, roomId: 4, author: 'Petar', rating: 5, comment: 'Veoma lepa soba, luksuzna i prostrana', date: '2025-06-20' },
  { id: 5, roomId: 3, author: 'Uros', rating: 3, comment: 'Mala soba, kolko para tolko muzike', date: '2025-06-30' },
];


const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  const foundRoom = dummyRooms.find(r => r.id === Number(id));
  const roomModel = foundRoom ? new RoomModel(foundRoom) : null;

  if (!roomModel) {
    return <div className="room-details"><h2>Soba nije pronađena</h2></div>;
  }
  const roomReviews = dummyReviews
  .filter(review => review.roomId === roomModel.id)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
  .slice(0, 3);  

  return (
    <div className="room-details">
      <button className="back-button" onClick={() => navigate('/rooms')}>← Nazad na sobe</button>
      <img src={roomModel.imageUrl} alt={roomModel.name} className="details-image" />
      <h2>{roomModel.name}</h2>
      <p>{roomModel.description}</p>
      <p><strong>Max gostiju:</strong> {roomModel.guests}</p>
      <p><strong>Cena:</strong> ${roomModel.price} po noćenju</p>
      <div className="reviews-section">
            <h3>Recenzije</h3>
            {roomReviews.length === 0 ? (
            <p>Nema još recenzija za ovu sobu.</p>
            ) : (
            roomReviews.map(review => (
            <div key={review.id} className="review-card">
            <p><strong>{review.author}</strong> - {review.rating} / 5</p>
            <p>{review.comment}</p>
            <small>{new Date(review.date).toLocaleDateString()}</small>
            </div>
            ))
            )}
        </div>

      <button onClick={() => navigate(`/rooms/${roomModel.id}/reserve`)}>Rezerviši</button>
    </div>
  );
};

export default RoomDetails;