import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false); // Start with sign-up
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit for Sign Up
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = "http://localhost:5555/signup";  // Ensure Flask backend is running on port 5555

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        console.log("Sign-up success:", data);
        // Optional: Redirect or handle post-sign-up success
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Sign-up failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-s1 text-p5">
      <div className="login-signup-container bg-s2 p-10 rounded-7xl shadow-500 w-full max-w-md">
        <h2 className="h3 mb-8 text-center text-p3">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-base-bold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
            />
          </div>
          <div>
            <label className="block mb-2 text-base-bold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
            />
          </div>
          <div>
            <label className="block mb-2 text-base-bold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-p3 text-s1 rounded-14 transition-all duration-500 hover:bg-p2 hover:shadow-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">{message}</p>
      </div>
    </div>
  );
};

export default LoginSignup;
