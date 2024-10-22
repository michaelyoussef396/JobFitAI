import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';  // Import the UserContext

const SkillsSection = () => {
  const { user } = useContext(UserContext);  // Get the logged-in user
  const [skills, setSkills] = useState([]);  // User's skills
  const [newSkill, setNewSkill] = useState('');  // New skill state
  const [editingSkill, setEditingSkill] = useState(null);  // Track which skill is being edited

  const userEmail = user?.email;  // Use the logged-in user's email

  useEffect(() => {
    if (userEmail) {
      fetchUserSkills();
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
        body: JSON.stringify({ email: userEmail, skill: newSkill }),
      });
      const data = await response.json();
      if (response.ok) {
        // Update skills in the state
        setSkills([...skills, { id: data.id, name: newSkill }]);
        setNewSkill('');  // Clear input
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  // Edit an existing skill
  const editSkill = (skill) => {
    setNewSkill(skill.name);
    setEditingSkill(skill.id);
  };

  // Update skill in the backend
  const updateSkill = async () => {
    try {
      const response = await fetch(`http://localhost:5555/skills/${editingSkill}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, skill: newSkill }),
      });
      if (response.ok) {
        // Update skill in the state
        setSkills(skills.map(skill => (skill.id === editingSkill ? { id: skill.id, name: newSkill } : skill)));
        setNewSkill('');
        setEditingSkill(null);  // Reset editing state
      }
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  // Delete a skill
  const deleteSkill = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      if (response.ok) {
        // Remove skill from the state
        setSkills(skills.filter(skill => skill.id !== id));
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <div className="skills-section bg-s2 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-p5">Skills</h2>
      <ul className="list-none space-y-4">
        {skills.map(skill => (
          <li key={skill.id} className="bg-s1 p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="text-p5 font-bold">{skill.name}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => editSkill(skill)} className="bg-p3 text-s1 px-3 py-1 rounded-lg">Edit</button>
              <button onClick={() => deleteSkill(skill.id)} className="bg-red-500 text-s1 px-3 py-1 rounded-lg">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <form className="mt-6 space-y-4">
        <input
          type="text"
          value={newSkill}
          onChange={handleSkillChange}
          placeholder="Add or update skill"
          className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
        />
        {editingSkill ? (
          <button type="button" onClick={updateSkill} className="bg-p3 text-s1 py-2 px-6 rounded-lg hover:bg-p2">Update Skill</button>
        ) : (
          <button type="button" onClick={addSkill} className="bg-p3 text-s1 py-2 px-6 rounded-lg hover:bg-p2">Add Skill</button>
        )}
      </form>
    </div>
  );
};

export default SkillsSection;
