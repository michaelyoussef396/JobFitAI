import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import SkillsSection from '../sections/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProfileSection from '../sections/ProfileSection';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const { user } = useContext(UserContext); // Logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5555/saved-jobs', {
        params: { email: user.email },
      });
      setSavedJobs(response.data.saved_jobs);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const handleViewJobListings = () => {
    navigate('/job-listings'); // Navigate to job listings page
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl mb-6">Dashboard</h1>

      {/* Display logged-in user info */}
      {user ? (
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl mb-2">Welcome, {user.name}!</h2>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      {/* Button to go to Job Listings */}
      <div className="mt-4">
        <button
          onClick={handleViewJobListings}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          View Job Listings
        </button>
      </div>

      {/* User Profile Section */}
      <ProfileSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Saved Jobs Section */}
      <div className="saved-jobs-section mt-8">
        <h2 className="text-2xl mb-4">Saved Jobs</h2>
        <ul className="saved-jobs-list bg-white p-4 rounded-lg shadow-md">
          {savedJobs.length > 0 ? (
            savedJobs.map((job) => (
              <li key={job.id} className="saved-job-item mb-4">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-700">{job.company}</p>
                <a
                  href={job.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Job
                </a>
              </li>
            ))
          ) : (
            <p>No saved jobs yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
