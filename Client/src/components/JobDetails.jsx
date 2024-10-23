import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

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

  const handleGenerateDocuments = () => {
    // Placeholder for generating resume and cover letter
    alert(`Generating resume and cover letter for job: ${job.title} at ${job.company}`);
    // Integrate with resume/cover letter generation logic here
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-details max-w-4xl mx-auto p-8  shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{job?.title}</h1>

      <div className="job-info grid grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Company:</strong> {job?.company}</p>
          <p><strong>Location:</strong> {job?.location}</p>
          <p><strong>Job Type:</strong> {job?.job_type}</p>
          <p><strong>Salary:</strong> {job?.salary_min ? `${job.salary_min} - ${job.salary_max}` : 'Not available'}</p>
        </div>
        <div>
          <p><strong>Why Choose Us:</strong> {job?.why_choose_us || 'N/A'}</p>
          <p><strong>Benefits:</strong> {job?.benefits || 'N/A'}</p>
          <p><strong>About Company:</strong> {job?.about_company || 'N/A'}</p>
        </div>
      </div>

      <div className="job-description mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Job Description</h2>
        <p>{job?.description}</p>
      </div>

      <div className="responsibilities mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Role Responsibilities</h2>
        <p>{job?.role_responsibilities || 'N/A'}</p>
      </div>

      <div className="about-you mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">About You</h2>
        <p>{job?.about_you || 'N/A'}</p>
      </div>

      <div className="employer-questions mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Employer Questions</h2>
        <p>{job?.employer_questions || 'N/A'}</p>
      </div>

      <button
        onClick={handleGenerateDocuments}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
      >
        Generate Resume & Cover Letter
      </button>
    </div>
  );
};

export default JobDetails;
