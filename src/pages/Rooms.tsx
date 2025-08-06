import React, { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

import type { Room } from '../models/Room';

const roomListStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1.5rem',
  marginTop: '1rem',
};

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

const Rooms: React.FC = () => {
  const [rooms] = useState<Room[]>(dummyRooms);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(dummyRooms);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const roomsPerPage = 5;

  const [guestFilter, setGuestFilter] = useState<number | ''>('');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | ''>('');

  useEffect(() => {
    let filtered = rooms;

    if (guestFilter !== '') {
      filtered = filtered.filter(room => room.guests >= guestFilter);
    }

    if (maxPriceFilter !== '') {
      filtered = filtered.filter(room => room.price <= maxPriceFilter);
    }

    setFilteredRooms(filtered);
    setCurrentPage(1);
  }, [guestFilter, maxPriceFilter, rooms]);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <div>
      <h1>Lista soba</h1>
      <Filters
        rooms={rooms}
        setGuestFilter={setGuestFilter}
        setMaxPriceFilter={setMaxPriceFilter}
      />
      <div style={roomListStyle}>
  {currentRooms.map(room => (
    <RoomCard key={room.id} room={room} />
  ))}
</div>
      <Pagination
        totalRooms={filteredRooms.length}
        roomsPerPage={roomsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Rooms;