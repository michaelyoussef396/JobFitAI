import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';

const ExperienceSection = () => {
  const { user } = useContext(UserContext);
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: ''
  });
  const [editingExperience, setEditingExperience] = useState(null);

  useEffect(() => {
    if (user) {
      fetchExperiences();
    }
  }, [user]);

  const fetchExperiences = async () => {
    try {
      const response = await fetch(`http://localhost:5555/experiences?email=${user.email}`);
      const data = await response.json();
      setExperiences(data.experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewExperience({
      ...newExperience,
      [e.target.name]: e.target.value
    });
  };

  const addExperience = async () => {
    try {
      const response = await fetch(`http://localhost:5555/experiences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newExperience, email: user.email })
      });
      const data = await response.json();
      setExperiences([...experiences, data]);
      setNewExperience({ title: '', company: '', startDate: '', endDate: '' });
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  const editExperience = (exp) => {
    setNewExperience(exp);
    setEditingExperience(exp.id);
  };

  const updateExperience = async () => {
    try {
      const response = await fetch(`http://localhost:5555/experiences/${editingExperience}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExperience)
      });
      const updatedExp = await response.json();
      setExperiences(experiences.map(exp => (exp.id === editingExperience ? updatedExp : exp)));
      setNewExperience({ title: '', company: '', startDate: '', endDate: '' });
      setEditingExperience(null);
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const deleteExperience = async (id) => {
    try {
      await fetch(`http://localhost:5555/experiences/${id}`, {
        method: 'DELETE',
      });
      setExperiences(experiences.filter(exp => exp.id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  return (
    <div className="bg-s2 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-p5">Experience</h2>
      <ul className="list-none space-y-4">
        {experiences.map(exp => (
          <li key={exp.id} className="bg-s1 p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="text-p5 font-bold">{exp.title}</p>
              <p className="text-p4">{exp.company}</p>
              <p className="text-p5">{exp.startDate} - {exp.endDate}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => editExperience(exp)} className="bg-p3 text-s1 px-3 py-1 rounded-lg">Edit</button>
              <button onClick={() => deleteExperience(exp.id)} className="bg-red-500 text-s1 px-3 py-1 rounded-lg">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <form className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={newExperience.title}
            onChange={handleInputChange}
            placeholder="Job Title"
            className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
          />
          <input
            type="text"
            name="company"
            value={newExperience.company}
            onChange={handleInputChange}
            placeholder="Company"
            className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={newExperience.startDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
          />
          <input
            type="date"
            name="endDate"
            value={newExperience.endDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg focus:outline-none focus:ring-2 focus:ring-p1"
          />
        </div>
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
