import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import type { Room } from '../models/Room';

const featuredRooms: Room[] = [
    {
        id: 4,
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
        id: 1,
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
            <section className="hero-section">
                <h1>Dobrodošli u naš hotel!</h1>
                <p>Rezervišite sobu po najboljoj ceni i uživajte u boravku.</p>
                <button onClick={() => navigate('/rooms')}
                className="hero-button">
                Pretraži sobe
                </button>
            </section>
            <div className="centered-container">
                {/* Opis hotela */}
                <section className="section-margin">
                    <h2>Zašto izabrati nas?</h2>
                    <p>
                    Naš hotel nudi komforne sobe, izvrsnu uslugu i lokaciju blizu najvažnijih
                    atrakcija u gradu. Posvećeni smo da vam boravak učinimo nezaboravnim.
                    </p>
                </section>

                {/* Istaknute sobe */}

                <section className="section-margin">
                    <h2>Istaknute sobe</h2>
                    <div className="featured-rooms">
                        {featuredRooms.map(room => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                </section>

                {/* Prednosti hotela */}
                <section className="advantages-section">
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
        </div>
    );
};

export default Home;
