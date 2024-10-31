import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';  // Import UserContext
import Header from "../sections/Header";
const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const { loginUser } = useContext(UserContext);  // Use the loginUser function from context
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit for login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? "http://localhost:5555/login"
      : "http://localhost:5555/signup";

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

      if (response.ok && isLogin) {
        loginUser(data.user);  // Save the user to context
        navigate("/home");  // Redirect to dashboard after successful login
      } else if (!isLogin && response.ok) {
        setIsLogin(true);  // Switch to login after successful sign-up
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-s1 text-p5 pt-32">
        <div className="login-signup-container bg-s2 p-10 rounded-7xl shadow-500 w-full max-w-md">
          <h2 className="h3 mb-8 text-center text-p3">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
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
            )}
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
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
                />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-p3 text-s1 rounded-14 transition-all duration-500 hover:bg-p2 hover:shadow-200"
              >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="mt-6 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="cursor-pointer text-p1 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
              >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
          <p className="mt-4 text-center">{message}</p>
        </div>
      </div>
    </>  
  );
};

export default LoginSignup;
