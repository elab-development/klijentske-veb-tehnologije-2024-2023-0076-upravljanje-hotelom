import React from 'react';
import type { Room } from '../models/Room';

interface FiltersProps {
  rooms: Room[];
  setGuestFilter: React.Dispatch<React.SetStateAction<number | ''>>;
  setMaxPriceFilter: React.Dispatch<React.SetStateAction<number | ''>>;
}

const Filters: React.FC<FiltersProps> = ({ setGuestFilter, setMaxPriceFilter }) => {

  return (
    <div style={filterContainerStyle}>
      <label>
        Broj gostiju:
        <input
          type="number"
          min="1"
          onChange={(e) => setGuestFilter(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </label>
      <label>
        Maksimalna cena:
        <input
          type="number"
          min="0"
          onChange={(e) => setMaxPriceFilter(e.target.value === '' ? '' : Number(e.target.value))}
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
