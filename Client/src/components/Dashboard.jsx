import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import SkillsSection from '../sections/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection';
import TechStackSection from '../sections/TechStackSection'; // Import TechStackSection
import ProfileSection from '../sections/ProfileSection';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../sections/DashboardHeader';

const Dashboard = () => {
  const { user } = useContext(UserContext); // Logged-in user
  const navigate = useNavigate();


  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl mb-6">Dashboard</h1>

        {user ? (
          <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl mb-2">Welcome, {user.name}!</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Desired Job Title:</strong> {user.desired_job_title}</p> {/* Display desired job title */}
          </div>
        ) : (
          <p>Loading user information...</p>
        )}

        <ProfileSection />
        <SkillsSection />
        <TechStackSection />
        <ExperienceSection />
      </div>
    </>
  );
};

export default Dashboard;
