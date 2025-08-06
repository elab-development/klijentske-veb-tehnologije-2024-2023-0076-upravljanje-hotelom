import React, { useState } from 'react';
import type { Room } from '../models/Room';

interface FiltersProps {
  rooms: Room[];
  setFilteredRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const Filters: React.FC<FiltersProps> = ({ rooms, setFilteredRooms }) => {
  const [guestFilter, setGuestFilter] = useState<number | ''>('');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | ''>('');

  const handleFilter = () => {
    let filtered = rooms;

    if (guestFilter !== '') {
      filtered = filtered.filter(room => room.guests >= Number(guestFilter));
    }

    if (maxPriceFilter !== '') {
      filtered = filtered.filter(room => room.price <= Number(maxPriceFilter));
    }

    setFilteredRooms(filtered);
  };

  return (
    <div style={filterContainerStyle}>
      <label>
        Broj gostiju:
        <input
          type="number"
          min="1"
          value={guestFilter}
          onChange={(e) => setGuestFilter(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </label>
      <label>
        Maksimalna cena:
        <input
          type="number"
          min="0"
          value={maxPriceFilter}
          onChange={(e) => setMaxPriceFilter(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </label>
      <button onClick={handleFilter}>Filtriraj</button>
    </div>
  );
};

const filterContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '1rem',
  alignItems: 'center',
};

export default Filters;
