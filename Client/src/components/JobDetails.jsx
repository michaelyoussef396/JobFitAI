import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardHeader from '../sections/DashboardHeader';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [aiAnswers, setAiAnswers] = useState([]);
  const [showComment, setShowComment] = useState(false);

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

  const handleGenerateResume = async () => {
    try {
      const response = await axios.post('http://localhost:5555/generate-resume', {
        email: 'michaelyoussef396@gmail.com', // Replace this with dynamic logged-in user email
        job_id: job.id,
      });

      if (response.data.generated_document) {
        setResume(response.data.generated_document);
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Failed to generate resume');
    }
  };

  const handleGenerateCoverLetter = async () => {
    try {
      const response = await axios.post('http://localhost:5555/generate-cover-letter', {
        email: 'michaelyoussef396@gmail.com', // Replace this with dynamic logged-in user email
        job_id: job.id,
      });

      if (response.data.generated_document) {
        setCoverLetter(response.data.generated_document);
      }
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert('Failed to generate cover letter');
    }
  };

  const handlePrepareInterview = async () => {
    try {
      setShowComment(true);
      const response = await axios.post('http://localhost:5555/prepare-interview', {
        email: 'michaelyoussef396@gmail.com',
        job_id: job.id,
      });

      if (response.data.questions) {
        setInterviewQuestions(response.data.questions);
        setAiAnswers([]); // Reset AI answers when loading new questions
      }
    } catch (error) {
      console.error('Error preparing for interview:', error);
      alert('Failed to prepare for interview');
    }
  };

  const handleGenerateAiAnswers = async () => {
    try {
      const response = await axios.post('http://localhost:5555/answer-interview-questions', {
        email: 'michaelyoussef396@gmail.com',
        job_id: job.id,
        questions: interviewQuestions,
      });

      if (response.data.answers) {
        setAiAnswers(response.data.answers);
      }
    } catch (error) {
      console.error('Error generating AI answers:', error);
      alert('Failed to generate AI answers');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!job) return <p>Loading job details...</p>;

  return (
    <>
      <DashboardHeader />
      <div className="job-details max-w-4xl mx-auto p-8 shadow-lg rounded-lg mt-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{job?.title}</h1>

        {/* Job information */}
        <div className="job-info grid grid-cols-2 gap-6 mb-6">
          <div>
            <p><strong>Company:</strong> {job?.company}</p>
            <p><strong>Location:</strong> {job?.location}</p>
            <p><strong>Job Type:</strong> {job?.job_type}</p>
            <p><strong>Salary:</strong> {job?.salary_min ? `$${job.salary_min} - $${job.salary_max}` : 'Not available'}</p>
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
          onClick={handleGenerateResume}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 mb-6"
        >
          Generate Resume
        </button>
        <button
          onClick={handleGenerateCoverLetter}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-6"
        >
          Generate Cover Letter
        </button>

        {/* Display resume and cover letter side by side */}
        <div className="documents flex flex-wrap gap-6 mt-6">
          {resume && (
            <div className="resume w-full md:w-1/2 p-4 border rounded-lg bg-gray-100 shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Generated Resume</h2>
              <pre className="whitespace-pre-wrap">{resume}</pre>
            </div>
          )}
          {coverLetter && (
            <div className="cover-letter w-full md:w-1/2 p-4 border rounded-lg bg-gray-100 shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Generated Cover Letter</h2>
              <pre className="whitespace-pre-wrap">{coverLetter}</pre>
            </div>
          )}
        </div>

        {(resume || coverLetter) && (
          <>
            <button
              onClick={handlePrepareInterview}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300 mt-6"
            >
              Prepare for My Interview
            </button>
            {showComment && <p className="mt-4 text-gray-600">Here are some prep interview questions. Try to answer them and ensure you have the best responses.</p>}
          </>
        )}

        {/* Display interview questions and AI answers */}
        {interviewQuestions.length > 0 && (
          <div className="interview-questions mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Interview Questions</h2>
            <ul className="list-disc pl-6">
              {interviewQuestions.map((question, index) => (
                <li key={index} className="mb-2">
                  {question}
                  {aiAnswers[index] && <p className="mt-2 text-blue-600">AI Answer: {aiAnswers[index]}</p>}
                </li>
              ))}
            </ul>
            <button
              onClick={handleGenerateAiAnswers}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300 mt-6"
            >
              Generate AI Answers
            </button>
            <button
              onClick={handlePrepareInterview}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 mt-6"
            >
              Load 5 New Questions
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default JobDetails;
