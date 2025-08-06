import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import type { Room } from '../models/Room';

const featuredRooms: Room[] = [
  {
    id: 1,
    name: 'Luksuzna soba',
    price: 120,
    guests: 2,
    description: 'Elegantna soba sa prelepim pogledom na grad',
    imageUrl: '/images/luxury-room.jpg',
  },
  {
    id: 2,
    name: 'Porodična soba',
    price: 90,
    guests: 4,
    description: 'Prostrana soba za porodice i veće grupe',
    imageUrl: '/images/family-room.jpg',
  },
  {
    id: 3,
    name: 'Standard soba',
    price: 60,
    guests: 2,
    description: 'Udobna soba sa svim osnovnim sadržajima',
    imageUrl: '/images/standard-room.jpg',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero sekcija */}
      <section
        style={{
          backgroundImage: 'url(/images/hotel-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <h1>Dobrodošli u naš hotel!</h1>
        <p>Rezervišite sobu po najboljoj ceni i uživajte u boravku.</p>
        <button
          onClick={() => navigate('/rooms')}
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Pretraži sobe
        </button>
      </section>

      {/* Opis hotela */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Zašto izabrati nas?</h2>
        <p>
          Naš hotel nudi komforne sobe, izvrsnu uslugu i lokaciju blizu najvažnijih
          atrakcija u gradu. Posvećeni smo da vam boravak učinimo nezaboravnim.
        </p>
      </section>

      {/* Istaknute sobe */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Istaknute sobe</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {featuredRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* Prednosti hotela */}
      <section style={{marginBottom: 90}}>
        <h2>Naše prednosti</h2>
        <ul>
          <li>Besplatan WiFi</li>
          <li>Besplatan parking</li>
          <li>Doručak uključen u cenu</li>
          <li>24/7 recepcija</li>
          <li>Čistoća i sigurnost</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
