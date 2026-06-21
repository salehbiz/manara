import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <Router>
      <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Header onOpenBooking={() => setBookingOpen(true)} />
        
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/*" element={<Home onOpenBooking={() => setBookingOpen(true)} />} />
          </Routes>
        </main>

        <Footer />

        <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
