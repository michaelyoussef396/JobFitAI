import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Pricing from './sections/Pricing';
import Faq from './sections/Faq';
import Testimonials from './sections/Testimonials';
import Footer from './sections/Footer';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './components/Dashboard';
import { UserProvider } from './UserContext';  // Import the UserProvider
import JobListings from './components/JobListings';

const App = () => {
  return (
    <UserProvider>  {/* Wrap the app with UserProvider */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <main className="overflow-hidden">
                <Header />
                <Hero />
                <Features />
                <Pricing />
                <Faq />
                <Testimonials />
                <Footer />
              </main>
            }
          />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/home" element={<Dashboard />} />  {/* Add the dashboard route */}
          <Route path="/job-listings" element={<JobListings />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
