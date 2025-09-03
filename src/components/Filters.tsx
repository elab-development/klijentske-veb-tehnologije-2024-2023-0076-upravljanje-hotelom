import React from 'react';

interface FiltersProps {
  guestFilter: number | '';
  maxPriceFilter: number | '';
  setGuestFilter: React.Dispatch<React.SetStateAction<number | ''>>;
  setMaxPriceFilter: React.Dispatch<React.SetStateAction<number | ''>>;
  onReset?: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  guestFilter,
  maxPriceFilter,
  setGuestFilter,
  setMaxPriceFilter,
  onReset
}) => {
  return (
    <div role="region" aria-label="Filteri soba" style={{ display:'flex', gap:'1rem', marginBottom:'1rem', alignItems:'center' }}>
      <label>
        Broj gostiju:
        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={guestFilter}
          onChange={(e) => setGuestFilter(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="npr. 2"
        />
      </label>
      <label>
        Maksimalna cena:
        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={maxPriceFilter}
          onChange={(e) => setMaxPriceFilter(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="npr. 80"
        />
      </label>
      <button type="button" onClick={onReset}>Reset</button>
    </div>
  );
};

export default Filters;