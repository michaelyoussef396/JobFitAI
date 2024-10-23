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
        <p><strong>Company:</strong> {job?.company}</p>
        <p><strong>Location:</strong> {job?.location}</p>
        <p><strong>Job Type:</strong> {job?.job_type}</p>
        <p><strong>Salary:</strong> {job?.salary_min ? `${job.salary_min} - ${job.salary_max}` : 'Not available'}</p>
        <p className="my-4"><strong>Description:</strong> {job?.description}</p>
        
        <h2 className="text-2xl font-semibold">Why Choose Us</h2>
        <p>{job?.why_choose_us || 'No information available'}</p>
        
        <h2 className="text-2xl font-semibold">Your Role</h2>
        <p>{job?.role_responsibilities || 'No information available'}</p>
        
        <h2 className="text-2xl font-semibold">Benefits</h2>
        <p>{job?.benefits || 'No benefits specified'}</p>
        
        <h2 className="text-2xl font-semibold">About You</h2>
        <p>{job?.about_you || 'No information available'}</p>
        
        <h2 className="text-2xl font-semibold">About the Company</h2>
        <p>{job?.about_company || 'No information available'}</p>
        
        <h2 className="text-2xl font-semibold">Employer Questions</h2>
        <p>{job?.employer_questions || 'No questions specified'}</p>
      </div>
    );
};

export default JobDetails;
