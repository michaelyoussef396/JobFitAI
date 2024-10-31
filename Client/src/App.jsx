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
import { UserProvider } from './UserContext'; 
import JobListings from './components/JobListings';
import JobDetails from './components/JobDetails'; 

const App = () => {
  return (
    <UserProvider>  
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
          <Route path="/job/:jobId" element={<JobDetails />} />  {/* Add the job details route */}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
