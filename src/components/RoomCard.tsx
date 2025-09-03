import React from 'react';
import { Link } from 'react-router-dom';
import type { Room } from '../models/Room';
import { fmtPrice } from '../api';

interface Props {
  room: Room;
}

const RoomCard: React.FC<Props> = ({ room }) => {
  return (
    <article className="room-card">
      <Link to={`/rooms/${room.id}`} className="room-card-link" aria-label={`Detalji sobe ${room.name}`}>
        <img src={room.imageUrl} alt={room.name} className="room-image" />
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <p>Max gostiju: {room.guests}</p>
        <p>Cena: {fmtPrice(room.price)}</p>
      </Link>
    </article>
  );
};

export default RoomCard;