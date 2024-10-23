import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [resume, setResume] = useState(null); // State for storing resume
  const [coverLetter, setCoverLetter] = useState(null); // State for storing cover letter

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

  const handleGenerateDocuments = async () => {
    try {
      const response = await axios.post('http://localhost:5555/generate-documents', {
        email: 'michaelyoussef396@gmail.com', // Replace this with dynamic logged-in user email
        job_id: job.id,
      });
  
      if (response.data.generated_documents) {
        const documents = response.data.generated_documents.split('Cover Letter:'); // Split based on "Cover Letter:"
        
        // Check if the split operation succeeded
        if (documents.length > 1) {
          setResume(documents[0].trim()); // First part is the resume
          setCoverLetter(`Cover Letter:${documents[1].trim()}`); // Second part is the cover letter
        } else {
          setResume(response.data.generated_documents.trim()); // Only resume found, no cover letter
          setCoverLetter(null); // No cover letter available
        }
      }
    } catch (error) {
      console.error('Error generating documents:', error);
      alert('Failed to generate resume and cover letter');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-details max-w-4xl mx-auto p-8 shadow-lg rounded-lg">
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
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 mb-6"
      >
        Generate Resume & Cover Letter
      </button>

      {/* Display resume and cover letter side by side */}
      {resume && (
        <div className="documents flex flex-wrap gap-6 mt-6">
          <div className="resume w-full md:w-1/2 p-4 border rounded-lg bg-gray-100 shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Generated Resume</h2>
            <pre className="whitespace-pre-wrap">{resume}</pre>
          </div>
          {coverLetter && (
            <div className="cover-letter w-full md:w-1/2 p-4 border rounded-lg bg-gray-100 shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Generated Cover Letter</h2>
              <pre className="whitespace-pre-wrap">{coverLetter}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetails;
