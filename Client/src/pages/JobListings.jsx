import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';  // Assuming you're using UserContext

const JobListings = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiMatchedJobs, setAiMatchedJobs] = useState([]);

  useEffect(() => {
    fetchJobListings();
  }, []);

  // Fetch job listings from Adzuna API
  const fetchJobListings = async () => {
    try {
      const response = await axios.get('http://localhost:5555/job-listings'); // Backend route to fetch job listings
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  // Search job listings by title or location
  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic here (can be implemented in the backend)
    console.log('Search:', searchQuery);
  };

  // Call OpenAI API for job matching
  const handleAiMatch = async () => {
    try {
      const response = await axios.post('http://localhost:5555/ai-match', { email: user.email });
      setAiMatchedJobs(response.data.matchedJobs);
    } catch (error) {
      console.error('Error with AI matching:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl mb-6">Job Listings</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for jobs..."
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Search
        </button>
      </form>

      {/* AI Match Button */}
      <button onClick={handleAiMatch} className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg">
        Use AI to Match Jobs
      </button>

      {/* Job Listings */}
      <h2 className="text-2xl mb-4">All Jobs</h2>
      <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <li key={index}>
              <p><strong>{job.title}</strong></p>
              <p>{job.company}</p>
              <p>{job.location}</p>
            </li>
          ))
        ) : (
          <li>No job listings available.</li>
        )}
      </ul>

      {/* AI Matched Jobs */}
      {aiMatchedJobs.length > 0 && (
        <>
          <h2 className="text-2xl mt-8 mb-4">AI Matched Jobs</h2>
          <ul className="list-disc list-inside bg-gray-200 p-4 rounded-lg">
            {aiMatchedJobs.map((job, index) => (
              <li key={index}>
                <p><strong>{job.title}</strong></p>
                <p>{job.company}</p>
                <p>{job.location}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default JobListings;
