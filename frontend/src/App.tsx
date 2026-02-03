import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventDetails from './components/EventDetails';
import Registration from './components/Registration';
import Success from './components/Success';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
