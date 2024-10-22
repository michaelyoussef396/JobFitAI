import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';  // Import the UserContext

const Dashboard = () => {
  const [skills, setSkills] = useState([]);  // User's skills
  const [jobs, setJobs] = useState([]);  // Job listings
  const [newSkill, setNewSkill] = useState('');  // New skill state
  const { user } = useContext(UserContext);  // Get the logged-in user

  const userEmail = user?.email;  // Use the logged-in user's email

  // Handle skill input change
  const handleSkillChange = (e) => setNewSkill(e.target.value);

  // Add skill to the backend
  const addSkill = async () => {
    try {
      const response = await fetch(`http://localhost:5555/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, skill: newSkill }),  // Send email and skill
      });
      const data = await response.json();
      if (response.ok) {
        // Update skills in the state
        setSkills([...skills, newSkill]);
        setNewSkill('');  // Clear input
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      // Fetch user profile and skills from the backend
      fetchUserSkills();
      fetchJobMatches();
    }
  }, [userEmail]);

  // Fetch user skills
  const fetchUserSkills = async () => {
    try {
      const response = await fetch(`http://localhost:5555/skills?email=${userEmail}`);
      const data = await response.json();
      setSkills(data.skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  // Fetch job matches (same as before)
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

      {/* User Profile Section */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Profile</h2>
        {user ? (
          <div className="bg-s1 p-4 rounded-lg shadow-md">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Skills</h2>
        <ul className="list-disc list-inside bg-s2 p-4 rounded-lg shadow-md">
          {skills.length > 0 ? (
            skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills added yet.</li>
          )}
        </ul>

        {/* Add Skill Form */}
        <div className="mt-4">
          <input
            type="text"
            value={newSkill}
            onChange={handleSkillChange}
            placeholder="Add a new skill"
            className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
          />
          <button
            className="mt-2 py-2 px-4 bg-p3 text-s1 rounded-14 transition-all duration-500 hover:bg-p2 hover:shadow-200"
            onClick={addSkill}
          >
            Add Skill
          </button>
        </div>
      </div>

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
