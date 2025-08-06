import React from 'react';

interface PaginationProps {
  totalRooms: number;
  roomsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRooms,
  roomsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={paginationStyle}>
        {pageNumbers.map(number => (
          <li
            key={number}
            style={{
            ...pageItemStyle,
            fontWeight: number === currentPage ? 'bold' : 'normal',
            }}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const paginationStyle: React.CSSProperties = {
  display: 'flex',
  listStyle: 'none',
  gap: '0.5rem',
  cursor: 'pointer',
};

const pageItemStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  userSelect: 'none',
};

export default Pagination;