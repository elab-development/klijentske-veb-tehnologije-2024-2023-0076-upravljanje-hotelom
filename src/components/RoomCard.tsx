import React from 'react';
import type { Room } from '../models/Room';
import { useNavigate } from 'react-router-dom';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <div 
      className="room-card" 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}
    >
      <img src={room.imageUrl} alt={room.name} className="room-image" />
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <p>Max gostiju: {room.guests}</p>
      <p>Cena: ${room.price}</p>
    </div>
  );
};

export default RoomCard;
