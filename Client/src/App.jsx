import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Pricing from './sections/Pricing';
import Faq from './sections/Faq';
import Testimonials from './sections/Testimonials';
import Footer from './sections/Footer';
import LoginSignup from './pages/LoginSignup'; // Import LoginSignup page

const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <>
      {/* Conditionally render the Header only on the home page (/) */}
      {location.pathname === '/' && <Header />}
      
      <Routes>
        {/* Define the main pages */}
        <Route path="/" element={
          <main className="overflow-hidden">
            <Hero />
            <Features />
            <Pricing />
            <Faq />
            <Testimonials />
            <Footer />
          </main>
        } />

        {/* Define the route for Login/Signup */}
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </>
  );
};

// Wrap the App component in Router to access the useLocation hook
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
