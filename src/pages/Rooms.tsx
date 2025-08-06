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

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const roomsPerPage = 5;

  const [guestFilter, setGuestFilter] = useState<number | ''>('');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | ''>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch rooms from API on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5001/rooms');
        if (!response.ok) throw new Error('Greška pri učitavanju soba');
        const data: Room[] = await response.json();
        setRooms(data);
        setFilteredRooms(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Nepoznata greška');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

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

  if (loading) return <p>Učitavanje soba...</p>;
  if (error) return <p style={{ color: 'red' }}>Greška: {error}</p>;

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
