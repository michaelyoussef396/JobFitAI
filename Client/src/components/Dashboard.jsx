import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';  // Import the UserContext
import SkillsSection from '../sections/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProfileSection from '../sections/ProfileSection';  // Import the ProfileSection

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);  // Job listings
  const { user } = useContext(UserContext);  // Get the logged-in user

  const userEmail = user?.email;  // Use the logged-in user's email
  const userName = user?.name;    // Get the logged-in user's name

  useEffect(() => {
    if (userEmail) {
      fetchJobMatches();
    }
  }, [userEmail]);

  // Fetch job matches
  const fetchJobMatches = async () => {
    try {
      const response = await fetch('http://localhost:5555/job-matches');
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching job matches:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl mb-6">Dashboard</h1>

      {/* Display User's Name and Email */}
      {user ? (
        <div className="mb-8 bg-s1 p-4 rounded-lg shadow-md">
          <h2 className="text-xl mb-2"><strong>Welcome, {userName}!</strong></h2>
          <p><strong>Email:</strong> {userEmail}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      {/* User Profile Section */}
      <ProfileSection />  {/* Use the ProfileSection */}

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Job Matches Section */}
      <div>
        <h2 className="text-2xl mb-4">Job Matches</h2>
        <ul className="list-disc list-inside bg-s2 p-4 rounded-lg shadow-md">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <li key={index}>
                <p><strong>{job.title}</strong></p>
                <p>{job.company}</p>
                <p>{job.location}</p>
              </li>
            ))
          ) : (
            <li>No job matches available yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
