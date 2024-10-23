import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';  // Import the UserContext

const TechStackSection = () => {
  const { user } = useContext(UserContext);  // Get the logged-in user
  const [techStack, setTechStack] = useState([]);  // User's tech stack
  const [newTech, setNewTech] = useState('');  // New tech state
  const [editingTech, setEditingTech] = useState(null);  // Track which tech is being edited

  const userEmail = user?.email;  // Use the logged-in user's email

  useEffect(() => {
    if (userEmail) {
      fetchUserTechStack();
    }
  }, [userEmail]);

  // Fetch user tech stack
  const fetchUserTechStack = async () => {
    try {
      const response = await fetch(`http://localhost:5555/techstack?email=${userEmail}`);
      const data = await response.json();
      setTechStack(data.tech_stack || []); // Ensure tech_stack is an array, or set it to empty
    } catch (error) {
      console.error('Error fetching tech stack:', error);
    }
  };

  // Handle tech input change
  const handleTechChange = (e) => setNewTech(e.target.value);

  // Add tech to the backend
  const addTech = async () => {
    try {
      const response = await fetch(`http://localhost:5555/techstack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, tech: newTech }),
      });
      const data = await response.json();
      if (response.ok) {
        setTechStack([...techStack, { id: data.id, name: newTech }]);
        setNewTech('');  // Clear input
      }
    } catch (error) {
      console.error('Error adding tech stack:', error);
    }
  };

  // Edit an existing tech
  const editTech = (tech) => {
    setNewTech(tech.name);
    setEditingTech(tech.id);
  };

  // Update tech in the backend
  const updateTech = async () => {
    try {
      const response = await fetch(`http://localhost:5555/techstack/${editingTech}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, tech: newTech }),
      });
      if (response.ok) {
        setTechStack(techStack.map(tech => (tech.id === editingTech ? { id: tech.id, name: newTech } : tech)));
        setNewTech('');
        setEditingTech(null);  // Reset editing state
      }
    } catch (error) {
      console.error('Error updating tech stack:', error);
    }
  };

  // Delete tech
  const deleteTech = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/techstack/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      if (response.ok) {
        setTechStack(techStack.filter(tech => tech.id !== id));
      }
    } catch (error) {
      console.error('Error deleting tech stack:', error);
    }
  };

  return (
    <div className="techstack-section bg-s2 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-p5">Tech Stack</h2>
      <ul className="list-none space-y-4">
        {techStack.length > 0 ? (
          techStack.map(tech => (
            <li key={tech.id} className="bg-s1 p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-p5 font-bold">{tech.name}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => editTech(tech)} className="bg-p3 text-s1 px-3 py-1 rounded-lg">Edit</button>
                <button onClick={() => deleteTech(tech.id)} className="bg-red-500 text-s1 px-3 py-1 rounded-lg">Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No tech stack added yet.</p>
        )}
      </ul>

      <form className="mt-6 space-y-4">
        <input
          type="text"
          value={newTech}
          onChange={handleTechChange}
          placeholder="Add or update tech stack"
          className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
        />
        {editingTech ? (
          <button type="button" onClick={updateTech} className="bg-p3 text-s1 py-2 px-6 rounded-lg hover:bg-p2">Update Tech</button>
        ) : (
          <button type="button" onClick={addTech} className="bg-p3 text-s1 py-2 px-6 rounded-lg hover:bg-p2">Add Tech</button>
        )}
      </form>
    </div>
  );
};

export default TechStackSection;
