import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
    const { jobId } = useParams();  // Get the jobId from the URL
    const [job, setJob] = useState(null);  // State for storing job details
    const [error, setError] = useState(null); // State for any error
  
    useEffect(() => {
        fetchJobDetails();
    }, [jobId]);
  
    const fetchJobDetails = async () => {
        try {
            console.log("Fetching details for job ID:", jobId);  // Log the job ID for debugging
            const response = await axios.get(`http://localhost:5555/job/${jobId}`);
            if (response.status === 404) {
                setError('Job not found or no longer available.');
            } else if (response.data.error) {
                setError(response.data.error);
            } else {
                setJob(response.data);
            }
        } catch (error) {
            setError('Error fetching job details');
            console.error('Error fetching job details:', error);
        }
    };
  
    if (error) {
        return <p>{error}</p>;
    }
  
    if (!job) return <p>Loading job details...</p>;
  
    return (
        <div className="job-details p-8">
            <h1 className="text-3xl font-semibold mb-4">{job?.title}</h1>
            <p><strong>Company:</strong> {job?.company || 'Company not provided'}</p>
            <p><strong>Location:</strong> {job?.location || 'Location not provided'}</p>
            <p><strong>Salary:</strong> {job?.salary_min ? `${job.salary_min} - ${job.salary_max}` : 'Not available'}</p>
            <p className="my-4">{job?.description || 'No description available'}</p>
      
            {/* Button to navigate to the job URL */}
            {job?.redirect_url ? (
                <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Apply for Job
                </a>
            ) : null}
        </div>
    );
};

export default JobDetails;
