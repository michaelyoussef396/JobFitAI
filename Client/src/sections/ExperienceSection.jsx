import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';

const ExperienceSection = () => {
  const { user } = useContext(UserContext);  // Get the logged-in user
  const [experiences, setExperiences] = useState([]);  // State for experiences

  useEffect(() => {
    if (user) {
      fetchExperiences();
    }
  }, [user]);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/experiences`, {
        params: { email: user.email },
      });
      setExperiences(response.data.experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  return (
    <div className="experience-section bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-p5">Experience</h2>
      {experiences.length > 0 ? (
        <ul>
          {experiences.map((exp) => (
            <li key={exp.id} className="mb-4">
              <h3 className="text-xl">{exp.title}</h3>
              <p><strong>Company:</strong> {exp.company}</p>
              <p><strong>Start Date:</strong> {exp.startDate || 'N/A'}</p>
              <p><strong>End Date:</strong> {exp.endDate || 'Present'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No experiences available yet.</p>
      )}
    </div>
  );
};

export default ExperienceSection;
