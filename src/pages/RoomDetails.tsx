import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = dummyRooms.find(r => r.id === Number(id));

  if (!room) {
    return <div className="room-details"><h2>Soba nije pronađena</h2></div>;
  }

  return (
    <div className="room-details">
      <button className="back-button" onClick={() => navigate('/rooms')}>← Nazad na sobe</button>
      <img src={room.imageUrl} alt={room.name} className="details-image" />
      <h2>{room.name}</h2>
      <p>{room.description}</p>
      <p><strong>Max gostiju:</strong> {room.guests}</p>
      <p><strong>Cena:</strong> ${room.price} po noćenju</p>
    </div>
  );
};

export default RoomDetails;
