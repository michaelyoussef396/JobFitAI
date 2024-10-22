import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';

const ProfileSection = () => {
  const { user } = useContext(UserContext);  // Get the logged-in user
  const [profileData, setProfileData] = useState({
    bio: '',
    location: '',
    website: ''
  });

  const userEmail = user?.email;  // Use the logged-in user's email

  useEffect(() => {
    if (userEmail) {
      fetchUserProfile();
    }
  }, [userEmail]);

  // Fetch user profile data from backend
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5555/profile?email=${userEmail}`);
      const data = await response.json();
      
      if (response.ok) {
        setProfileData({
          bio: data.bio || '',
          location: data.location || '',
          website: data.website || ''
        });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async () => {
    try {
      const response = await fetch('http://localhost:5555/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...profileData, email: userEmail })
      });

      if (!response.ok) {
        console.error('Error updating profile:', await response.json());
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-section bg-s2 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-p5">Profile</h2>
      <form className="space-y-4">
        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg"
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg"
          />
        </div>
        <div>
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={profileData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-lg"
          />
        </div>
        <button
          type="button"
          onClick={updateProfile}
          className="bg-p3 text-s1 py-2 px-6 rounded-lg hover:bg-p2"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSection;
