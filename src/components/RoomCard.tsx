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
      style={cardStyle} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}
    >
      <img src={room.imageUrl} alt={room.name} style={imageStyle} />
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <p>Max gostiju: {room.guests}</p>
      <p>Cena: ${room.price}</p>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '1rem',
  margin: '1rem 0',
  cursor: 'pointer',
  maxWidth: '300px',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: '8px',
  objectFit: 'cover',
  height: '200px',
};

export default RoomCard;
