import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false); // Start with sign-up by default
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);  // Store the logged-in user

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit for Sign-Up or Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? "http://localhost:5555/login"  // Backend route for login
      : "http://localhost:5555/signup";  // Backend route for sign-up

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
        console.log(`${isLogin ? "Login" : "Sign-up"} success:`, data);
        if (isLogin) {
          // If login is successful, store the user data
          setUser(data.user);
          // You can also redirect to a protected page here or handle login success
        } else {
          // If sign-up is successful, switch to login form
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`${isLogin ? "Login" : "Sign-up"} failed`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-s1 text-p5">
      <div className="login-signup-container bg-s2 p-10 rounded-7xl shadow-500 w-full max-w-md">
        <h2 className="h3 mb-8 text-center text-p3">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && ( // Show name field only on Sign-Up
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

        {/* Show logged-in user info */}
        {user && (
          <div className="mt-4 text-center">
            <h4>Welcome, {user.name}!</h4>
            <p>Your email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
