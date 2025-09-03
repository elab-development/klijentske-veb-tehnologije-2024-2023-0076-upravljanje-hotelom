import React, { useEffect, useMemo, useState } from 'react';
import type { Room } from '../models/Room';
import { apiGet } from '../api';
import RoomCard from '../components/RoomCard';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // kontrolisani filteri
  const [guestFilter, setGuestFilter] = useState<number | ''>('');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | ''>('');

  // paginacija
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 8;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await apiGet<Room[]>('/rooms');
        setRooms(data);
      } catch (e: any) {
        setError(e.message || 'Greška pri učitavanju soba');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // filtriranje
  const filtered = useMemo(() => {
    return rooms.filter(r => {
      if (guestFilter !== '' && r.guests < guestFilter) return false;
      if (maxPriceFilter !== '' && r.price > maxPriceFilter) return false;
      return true;
    });
  }, [rooms, guestFilter, maxPriceFilter]);

  // reset paginacije kad se filteri promene
  useEffect(() => {
    setCurrentPage(1);
  }, [guestFilter, maxPriceFilter]);

  // slice za trenutnu stranu
  const indexOfLast = currentPage * roomsPerPage;
  const indexOfFirst = indexOfLast - roomsPerPage;
  const current = filtered.slice(indexOfFirst, indexOfLast);

  if (loading) return <div className="room-list"><p>Učitavanje...</p></div>;
  if (error) return <div className="room-list"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="room-list">
      <h2>Dostupne sobe</h2>

      <Filters
        guestFilter={guestFilter}
        maxPriceFilter={maxPriceFilter}
        setGuestFilter={setGuestFilter}
        setMaxPriceFilter={setMaxPriceFilter}
        onReset={() => { setGuestFilter(''); setMaxPriceFilter(''); }}
      />

      {filtered.length === 0 ? (
        <p>Nema soba za zadate filtere.</p>
      ) : (
        <>
          <div className="rooms-grid">
            {current.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <Pagination
            roomsPerPage={roomsPerPage}
            totalRooms={filtered.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Rooms;