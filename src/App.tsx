import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Reservation from './pages/Reservation';
import Contact from './pages/Contact';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import './App.css'; 
import About from './pages/About';


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar/>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
