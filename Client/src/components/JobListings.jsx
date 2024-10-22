import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListings = () => {
  const [jobs, setJobs] = useState([]); // State for job listings
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch job listings when component mounts
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5555/job-listings');
        setJobs(response.data); // Store job listings in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err.message); // Handle error if fetch fails
        setLoading(false);
      }
    };

    fetchJobs(); // Call the fetch function
  }, []); // Empty array to ensure fetch only runs once

  // Loading and error states
  if (loading) return <p>Loading job listings...</p>;
  if (error) return <p>Error loading jobs: {error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl mb-6">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.company.display_name}</p>
            <p>{job.location.display_name}</p>
            <p>Salary: {job.salary_min ? `$${job.salary_min}` : 'Not available'}</p>
            <a
              href={job.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2"
            >
              View Job
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
