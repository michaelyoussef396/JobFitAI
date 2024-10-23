import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [userEmail, setUserEmail] = useState('user@example.com'); // Set to a test email or user email

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobListings();
  }, []);

  const fetchJobListings = async (searchTerm = '', location = '') => {
    try {
      const response = await axios.get('http://localhost:5555/job-listings', {
        params: { searchTerm, location },
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  const handleViewJob = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobListings(searchTerm, location);
  };

  return (
    <div className="job-listings-container p-8">
      <h1 className="text-3xl mb-6 text-center">Job Listings</h1>

      <form onSubmit={handleSearch} className="search-form grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Job Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="col-span-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Search
        </button>
      </form>

      <ul className="job-list bg-white p-6 rounded-lg shadow-md">
        {jobs.map((job) => (
          <li key={job.id} className="job-item mb-4">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-700">{job.company || 'Company not provided'}</p>
            <p className="text-gray-500">{job.location || 'Location not provided'}</p>
            <button
              onClick={() => handleViewJob(job.id)}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600"
            >
              View Job
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListings;
