# 🏨 Hotel Booking App

Aplikacija za rezervaciju hotelskih soba napravljena u **React + TypeScript** sa **JSON Server** backendom.  
Omogućava pregled soba, rezervaciju, pregled i dodavanje recenzija.

---

## Funkcionalnosti

- Pregled svih soba
- Detaljan prikaz sobe
- Rezervacija sobe
- Pregled recenzija za svaku sobu
- Dodavanje novih recenzija
- Prikaz samo poslednje 3 recenzije (po datumu)
- Responsive dizajn

---

## Tehnologije

- **React 18** + **TypeScript**
- **React Router DOM** za navigaciju
- **JSON Server** kao mock API
- **CSS** za stilizaciju

---

## Instalacija i pokretanje

1. **Kloniraj repozitorijum**
   ```bash
   git clone https://github.com/elab-development/klijentske-veb-tehnologije-2024-2023-0076-upravljanje-hotelom.git
   cd hotel-booking

2. **Instaliraj zavisnosti**
   npm install

3. **Pokreni backend**
   npx json-server --watch db.json --port 5001

4. **Pokreni frontend**
   npm run dev

5. **Otvori aplikaciju u browseru**
   http://localhost:5173

---

## Navigacija kroz aplikaciju
  🏠 Početna (/)
    Kratki opis hotela i uvod u ponudu soba.
  🛏 Sobe (/rooms)
    Lista svih dostupnih soba sa osnovnim informacijama i slikama.
  ℹ️ Detalji sobe (/rooms/:id)
    Detaljan prikaz pojedinačne sobe, recenzije i forma za dodavanje recenzije.
    Dugme za rezervaciju vodi na formu za unos podataka.
  📅 Rezervacija (/rooms/:id/reserve)
    Forma za rezervaciju sobe.
  👥 O nama (/about)
    Informacije o hotelu.
  📩 Kontakt (/contact)
    Forma za kontaktiranje hotela.

---

## Struktura projekta

hotel-booking/
├── public/
│   └── images/          # Slike
├── src/
│   ├── components/      # Reusable React komponente (Navbar, RoomCard...)
│   ├── pages/           # Stranice aplikacije (Home, Rooms, RoomDetails...)
│   ├── models/          # TypeScript interfejsi i modeli
│   ├── App.tsx          # Root komponenta aplikacije
│   └── main.tsx         # Ulazna tačka aplikacije
├── db.json              # Mock baza podataka za JSON Server
└── README.md            # Dokumentacija projekta

---

## API rute (JSON Server)

Sobe
  GET /rooms — lista svih soba
  GET /rooms/:id — detalji sobe po ID-u
Recenzije
  GET /reviews?roomId=1 — sve recenzije za sobu sa ID 1
  POST /reviews — dodavanje nove recenzije