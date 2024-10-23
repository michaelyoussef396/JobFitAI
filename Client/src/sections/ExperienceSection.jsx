import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';  // Import the UserContext

const ExperienceSection = () => {
  const { user } = useContext(UserContext);  // Get the logged-in user
  const [experiences, setExperiences] = useState([]);  // User's experiences
  const [newExperience, setNewExperience] = useState({ title: '', company: '', startDate: '', endDate: '' });
  const [editingExperience, setEditingExperience] = useState(null);  // Track which experience is being edited

  const userEmail = user?.email;  // Use the logged-in user's email

  useEffect(() => {
    if (userEmail) {
      fetchUserExperiences();
    }
  }, [userEmail]);

  // Fetch user experiences
  const fetchUserExperiences = async () => {
    try {
      const response = await fetch(`http://localhost:5555/experiences?email=${userEmail}`);
      const data = await response.json();
      setExperiences(data.experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  // Handle experience input change
  const handleExperienceChange = (e) => setNewExperience({ ...newExperience, [e.target.name]: e.target.value });

  // Add experience to the backend
  const addExperience = async () => {
    try {
      const response = await fetch(`http://localhost:5555/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: userEmail, 
          title: newExperience.title, 
          company: newExperience.company, 
          startDate: newExperience.startDate, 
          endDate: newExperience.endDate 
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Update experiences in the state
        setExperiences([...experiences, data.experience]);
        setNewExperience({ title: '', company: '', startDate: '', endDate: '' });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error adding experience:', error);
    }
};

  // Edit an existing experience
  const editExperience = (experience) => {
    setNewExperience(experience);
    setEditingExperience(experience.id);
  };

  // Update experience in the backend
  const updateExperience = async () => {
    try {
      const response = await fetch(`http://localhost:5555/experiences/${editingExperience}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, ...newExperience }),
      });
      if (response.ok) {
        // Update experiences in the state
        setExperiences(experiences.map(exp => (exp.id === editingExperience ? newExperience : exp)));
        setNewExperience({ title: '', company: '', startDate: '', endDate: '' });
        setEditingExperience(null);  // Reset editing state
      }
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  // Delete an experience
  const deleteExperience = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/experiences/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      if (response.ok) {
        // Remove experience from the state
        setExperiences(experiences.filter(exp => exp.id !== id));
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  return (
    <div className="experiences-section bg-s2 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-p5">Experience</h2>
      <ul className="list-none space-y-4">
        {experiences.map(exp => (
          <li key={exp.id} className="bg-s1 p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="text-p5 font-bold">{exp.title} at {exp.company}</p>
              <p className="text-gray-700">From: {exp.startDate} To: {exp.endDate}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => editExperience(exp)} className="bg-p3 text-s1 px-3 py-1 rounded-lg">Edit</button>
              <button onClick={() => deleteExperience(exp.id)} className="bg-red-500 text-s1 px-3 py-1 rounded-lg">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <form className="mt-6 space-y-4">
        <input
          type="text"
          name="title"
          value={newExperience.title}
          onChange={handleExperienceChange}
          placeholder="Experience Title"
          className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
        />
        <input
          type="text"
          name="company"
          value={newExperience.company}
          onChange={handleExperienceChange}
          placeholder="Company"
          className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
        />
        <input
          type="date"
          name="startDate"
          value={newExperience.startDate}
          onChange={handleExperienceChange}
          className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
        />
        <input
          type="date"
          name="endDate"
          value={newExperience.endDate}
          onChange={handleExperienceChange}
          className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
        />
        {editingExperience ? (
          <button type="button" onClick={updateExperience} className="bg-p3 text-s1 py-2 px-6 rounded-lg hover:bg-p2">Update Experience</button>
        ) : (
          <button type="button" onClick={addExperience} className="bg-p3 text-s1 py-2 px-6 rounded-lg hover:bg-p2">Add Experience</button>
        )}
      </form>
    </div>
  );
};

export default ExperienceSection;
