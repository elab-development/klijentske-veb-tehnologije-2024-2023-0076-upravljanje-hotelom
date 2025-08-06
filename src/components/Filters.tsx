import React from 'react';
import type { Room } from '../models/Room';

interface FiltersProps {
  rooms: Room[];
  setGuestFilter: React.Dispatch<React.SetStateAction<number | null>>;
  setMaxPriceFilter: React.Dispatch<React.SetStateAction<number | null>>;
}

const Filters: React.FC<FiltersProps> = ({ rooms, setGuestFilter, setMaxPriceFilter }) => {
  
  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGuestFilter(value === '' ? null : Number(value));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPriceFilter(value === '' ? null : Number(value));
  };

  return (
    <div style={filterContainerStyle}>
      <label>
        Broj gostiju:
        <input
          type="number"
          min="1"
          onChange={handleGuestChange}
          placeholder="npr. 2"
        />
      </label>
      <label>
        Maksimalna cena:
        <input
          type="number"
          min="0"
          onChange={handlePriceChange}
          placeholder="npr. 100"
        />
      </label>
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
